import type { Request, Response } from "express";
import z from "zod";
import {
	generateAuthToken,
	getUserDataFromCookies,
	hashMe,
	verifyPwd,
} from "../utils/helper";
import { ApiError } from "../utils/ApiError";
import prisma from "../utils/prisma";
import { sendForgotPwdMail } from "../utils/emailHandler";
import crypto from "node:crypto";

const signupSchema = z.object({
	username: z.string().trim().min(3, "Username must be at least 3 characters"),
	email: z.email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});
type SignupTypes = z.infer<typeof signupSchema>;

export const sigupfn = async (
	req: Request<{}, {}, SignupTypes>,
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
	const user: SignupTypes = {
		username: parsedData.data.username,
		email: parsedData.data.email,
		password: hashPWD,
	};
	// db 👇
	const createdUser = await prisma.user.create({
		data: user,
	});
	//jwt shit 👇
	const t = generateAuthToken(user, res);
	return res.status(200).json({
		user: createdUser,
		token: t.token,
	});
};
//---------------------------------------------------------------------------------------------------
const loginSchema = z.object({
	email: z.email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});
type loginType = z.infer<typeof loginSchema>;

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
	const isvalid = await verifyPwd(parsedData.data.password, user.password);
	if (!isvalid) {
		throw new ApiError(401, "Password is incorect try again", "INCORRECT_PWD");
	}

	//jwt shit 👇
	const t = generateAuthToken(user, res);
	return res.status(200).json({
		user: user,
		token: t.token,
	});
};
//---------------------------------------------------------------------------------------------------
export const logout = async (req: Request, res: Response) => {
	res.clearCookie("accessToken", {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		path: "/",
	});
	res.json({ success: true, message: "Logged out successfully" });
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
const resetPasswordSchema = z.object({
	currentPwd: z.string().min(6, "Password must be at least 6 characters"),
	newPwd: z.string().min(6, "Password must be at least 6 characters"),
});
type resetPasswordType = z.infer<typeof resetPasswordSchema>;

export const ResetPassword = async (
	req: Request<{}, {}, resetPasswordType>,
	res: Response
) => {
	const decodedUser = await getUserDataFromCookies(req);
	const usr = await prisma.user.findUnique({
		where: { email: decodedUser.email },
	});
	if (!usr) {
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
	const isValid = await verifyPwd(parsedData.data.currentPwd, usr.password);
	if (!isValid) {
		throw new ApiError(
			401,
			"Current password is incorrect",
			"INVALID_CREDENTIALS"
		);
	}

	const hashedPwd = await hashMe(parsedData.data.newPwd);
	await prisma.user.update({
		where: { email: usr.email },
		data: {
			password: hashedPwd,
		},
	});

	return res.json({
		success: true,
		message: "password reset successfully",
		usr,
	});
};
//---------------------------------------------------------------------------------------------------
const forgotPwdSchema = z.object({
	email: z.email(),
});
type forgotPwdType = z.infer<typeof forgotPwdSchema>;

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
	const usr = await prisma.user.findUnique({
		where: {
			email: parsedData.data.email,
		},
	});
	if (!usr) {
		throw new ApiError(404, "User not found", "USER_NOT_FOUND");
	}
	const resetToken = crypto.randomBytes(32).toString("hex");
	const tokenExpiry = new Date(Date.now() + 1000 * 60 * 15); // 15 mins
	await prisma.pwdResetToken.deleteMany({
		where: { userId: usr.id },
	});
	await prisma.pwdResetToken.create({
		data: {
			token: resetToken,
			expiresAt: tokenExpiry,
			userId: usr.id,
		},
	});
	const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;
	await sendForgotPwdMail(usr.email, resetLink);
	return res.json({
		success: true,
		message: "password reset link has been sent on the Email.",
	});
};
//---------------------------------------------------------------------------------------------------
const resetPwdWithToken = z.object({
	token: z.string().min(1, "Reset token is required"),
	newPassword: z.string().min(6, "Password must be at least 6 characters"),
});
type ResetPwdWithTokenType = z.infer<typeof resetPwdWithToken>;

export const resetPasswordWithToken = async (
	req: Request<{}, {}, ResetPwdWithTokenType>,
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
		resetRecord.Isused ||
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
		data: { Isused: true },
	});

	return res.json({
		success: true,
		message: "Password has been reset successfully",
	});
};
//---------------------------------------------------------------------------------------------------
