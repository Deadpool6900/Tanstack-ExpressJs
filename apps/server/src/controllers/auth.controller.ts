import crypto from "node:crypto";
import {
	forgotPwdSchema,
	type forgotPwdType,
	loginSchema,
	type loginType,
	resetPasswordSchema,
	type resetPasswordType,
	resetPwdWithToken,
	type resetPwdWithTokenType,
	signupSchema,
	type signupTypes,
} from "@repo/types/auth";
import type { Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { sendForgotPwdMail } from "../utils/emailHandler";
import {
	baseClientUrl,
	generateAuthToken,
	getUserDataFromCookies,
	hashMe,
	verifyPwd,
} from "../utils/helper";
import prisma from "../utils/prisma";

//---------------------------------------------------------------------------------------------------
export const signupfn = async (
	req: Request<{}, {}, signupTypes>,
	res: Response
) => {
	const parsedData = signupSchema.safeParse(req.body);
	if (!parsedData.success) {
		throw new ApiError(
			400,
			"Validation failed",
			"VALIDATION_ERROR",
			parsedData.error.issues
		);
	}
	// check user exits
	const existing = await prisma.user.findUnique({
		where: { email: parsedData.data.email },
	});
	if (existing) {
		throw new ApiError(409, "Email already in use", "EMAIL_TAKEN");
	}

	const hashPWD = await hashMe(parsedData.data.password);
	const user: signupTypes = {
		username: parsedData.data.username,
		email: parsedData.data.email,
		password: hashPWD,
	};
	// db 👇
	const createdUser = await prisma.user.create({
		data: { ...user, authProviders: ["LOCAL"] },
	});
	//jwt shit 👇
	const t = generateAuthToken(user, res);
	return res.status(200).json({
		user: createdUser,
		token: t.token,
	});
};
//---------------------------------------------------------------------------------------------------
export const loginfn = async (
	req: Request<{}, {}, loginType>,
	res: Response
) => {
	const parsedData = loginSchema.safeParse(req.body);
	if (!parsedData.success) {
		throw new ApiError(
			400,
			"Validation failed",
			"VALIDATION_ERROR",
			parsedData.error.issues
		);
	}
	// if user exits :
	const user = await prisma.user.findUnique({
		where: { email: parsedData.data.email },
	});
	if (!user) {
		throw new ApiError(404, "User not found", "USER_NOT_FOUND");
	}

	//check password :
	const isvalid = await verifyPwd(
		parsedData.data.password,
		user.password as string
	);
	if (!isvalid) {
		throw new ApiError(401, "Password is incorect try again", "INCORRECT_PWD");
	}

	//jwt shit 👇
	const {token} = generateAuthToken(user, res);
	return res.status(200).json({
		user: user,
		token: token,
	});
};
//---------------------------------------------------------------------------------------------------

export const logout = async (req: Request, res: Response) => {
	// If Passport (OAuth) session exists
	if (req.isAuthenticated && req.isAuthenticated()) {
		req.logOut((err) => {
			if (err) {
				res
					.status(500)
					.json({ success: false, message: "OAuth logout failed" });
			}

			req.session.destroy((sessionErr) => {
				if (sessionErr) {
					res
						.status(500)
						.json({ success: false, message: "Session logout failed" });
				}

				res.clearCookie("connect.sid");
				res.clearCookie("accessToken", {
					httpOnly: true,
					secure: process.env.NODE_ENV === "production",
					path: "/",
				});

				res.json({
					success: true,
					message: "Logged out (OAuth) successfully",
				});
			});
		});
	} else {
		// JWT logout (stateless)
		res.clearCookie("accessToken", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			path: "/",
		});

		// Optional: If using refresh tokens, clear them too
		res.clearCookie("refreshToken", {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			path: "/",
		});

		res.json({
			success: true,
			message: "Logged out (JWT) successfully",
		});
	}
};

//---------------------------------------------------------------------------------------------------
export const deleteAccount = async (req: Request, res: Response) => {
	const decoded = req.user;
	if (!decoded) {
		throw new ApiError(401, "Unauthorized", "UNAUTHORIZED");
	}

	const user = await prisma.user.findUnique({
		where: { email: decoded?.email },
	});
	if (!user) {
		throw new ApiError(404, "User not found", "USER_NOT_FOUND");
	}
	await prisma.user.delete({ where: { email: decoded.email } });

	return res.status(200).json({
		success: true,
		message: "Account deleted successfuly !",
	});
};
//---------------------------------------------------------------------------------------------------
export const ResetPassword = async (
	req: Request<{}, {}, resetPasswordType>,
	res: Response
) => {
	const decodedUser = await getUserDataFromCookies(req);
	const user = await prisma.user.findUnique({
		where: { email: decodedUser.email },
	});
	if (!user) {
		throw new ApiError(404, "User not found", "USER_NOT_FOUND");
	}
	const parsedData = resetPasswordSchema.safeParse(req.body);
	if (!parsedData.success) {
		throw new ApiError(
			400,
			"Validation failed",
			"VALIDATION_ERROR",
			parsedData.error.issues
		);
	}

	// check if old password = currect password 😑
	const isValid = await verifyPwd(
		parsedData.data.currentPwd,
		user.password as string
	);
	if (!isValid) {
		throw new ApiError(
			401,
			"Current password is incorrect",
			"INVALID_CREDENTIALS"
		);
	}

	const hashedPwd = await hashMe(parsedData.data.newPwd);
	await prisma.user.update({
		where: { email: user.email },
		data: {
			password: hashedPwd,
		},
	});

	return res.json({
		success: true,
		message: "password reset successfully",
		user,
	});
};
//---------------------------------------------------------------------------------------------------
export const ForgotPassword = async (
	req: Request<{}, {}, forgotPwdType>,
	res: Response
) => {
	const parsedData = forgotPwdSchema.safeParse(req.body);
	if (!parsedData.success) {
		throw new ApiError(
			400,
			"Validation failed",
			"VALIDATION_ERROR",
			parsedData.error.issues
		);
	}
	const user = await prisma.user.findUnique({
		where: {
			email: parsedData.data.email,
		},
	});
	if (!user) {
		throw new ApiError(404, "User not found", "USER_NOT_FOUND");
	}
	const resetToken = crypto.randomBytes(32).toString("hex");
	const tokenExpiry = new Date(Date.now() + 1000 * 60 * 15); // 15 mins
	await prisma.pwdResetToken.deleteMany({
		where: { userId: user.id },
	});
	await prisma.pwdResetToken.create({
		data: {
			token: resetToken,
			expiresAt: tokenExpiry,
			userId: user.id,
		},
	});
	const resetLink = `${baseClientUrl}/reset-password?token=${resetToken}`;
	await sendForgotPwdMail(user.email, resetLink);
	return res.json({
		success: true,
		message: "password reset link has been sent on the Email.",
	});
};
//---------------------------------------------------------------------------------------------------
export const resetPasswordWithToken = async (
	req: Request<{}, {}, resetPwdWithTokenType>,
	res: Response
) => {
	const parsedData = resetPwdWithToken.safeParse(req.body);
	if (!parsedData.success) {
		throw new ApiError(
			400,
			"Validation failed",
			"VALIDATION_ERROR",
			parsedData.error.issues
		);
	}
	const { token, newPassword } = parsedData.data;

	const resetRecord = await prisma.pwdResetToken.findUnique({
		where: { token },
		include: { user: true },
	});

	if (
		!resetRecord ||
		resetRecord.isUsed ||
		resetRecord.expiresAt < new Date()
	) {
		throw new ApiError(400, "Invalid or expired reset token", "UNAUTHORISED");
	}

	const hashedPwd = await hashMe(newPassword);
	await prisma.user.update({
		where: { id: resetRecord.userId },
		data: { password: hashedPwd },
	});

	// Make token expire by isUsed = true
	await prisma.pwdResetToken.update({
		where: { id: resetRecord.id },
		data: { isUsed: true },
	});

	return res.json({
		success: true,
		message: "Password has been reset successfully",
	});
};
//---------------------------------------------------------------------------------------------------
export const googleCallback = (req: Request, res: Response) => {
	if (!req.user) {
		return res.redirect(`${baseClientUrl}/auth/login`);
	}
	const { token } = generateAuthToken(
		{ username: req.user.username, email: req.user.email },
		res
	);
	res.redirect(`${baseClientUrl}/auth/oauthCallback?token=${token}`);
};
