import bcrypt from "bcryptjs";
import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { ApiError } from "./ApiError";

//----------------------------------------------------------------------------
export const hashMe = async (pwd: string): Promise<string> => {
	const salt = await bcrypt.genSalt(10);
	const hashpwd = await bcrypt.hash(pwd, salt);

	return hashpwd;
};
//----------------------------------------------------------------------------
export const verifyPwd = async (
	pwd: string,
	hashedpwd: string,
): Promise<boolean> => {
	return bcrypt.compareSync(pwd, hashedpwd);
};
//----------------------------------------------------------------------------
interface usrPayload {
	username: string;
	email: string;
}
export const generateAuthToken = (
	user: usrPayload,
	res: Response,
): { token: string } => {
	const payload = {
		username: user.username,
		email: user.email,
	};

	const token: string = jwt.sign(
		payload,
		process.env.JWT_SECRATE_KEY as string,
		{
			expiresIn: "3d",
		},
	);

	res.cookie("accessToken", token, {
		maxAge: 1000 * 60 * 60 * 24 * 3,
		httpOnly: true,
		secure: true,
	});

	return {
		...payload,
		token,
	};
};
//----------------------------------------------------------------------------
export const asyncHandler = (
	fn: (req: Request, res: Response, next: NextFunction) => Promise<any>,
) => {
	return async (req: Request, res: Response, next: NextFunction) => {
		try {
			await fn(req, res, next);
		} catch (err) {
			next(err); // Forward error to Express centralized error middleware
		}
	};
};
//----------------------------------------------------------------------------
interface CustomJwtPayload extends JwtPayload {
	email: string;
	username: string;
}
export const getUserDataFromCookies = async (
	req: Request,
): Promise<CustomJwtPayload> => {
	const token = req.cookies?.accessToken;
	if (!token) {
		throw new ApiError(401, "access Token not found", "ACCESS_TOKEN_NOT_FOUND");
	}

	const decoded = jwt.verify(
		token,
		process.env.JWT_SECRATE_KEY as string,
	) as CustomJwtPayload;
	if (!decoded.email) {
		throw new ApiError(
			403,
			"Invalid or expired access token",
			"INVALID_ACCESS_TOKEN",
		);
	}
	return decoded;
};
