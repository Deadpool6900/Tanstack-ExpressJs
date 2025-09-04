import type { User } from "@prisma/client";
import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";
import { getUserDataFromCookies } from "../utils/helper";
import prisma from "../utils/prisma";

interface AuthenticatedRequest extends Request {
	user?: User;
}
export const authMiddleware = async (
	req: AuthenticatedRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		const userCookies = await getUserDataFromCookies(req);

		if (!userCookies) {
			return next(new ApiError(401, "Unauthorized", "UNAUTHORIZED"));
		}

		const user = await prisma.user.findUnique({
			where: { email: userCookies.email },
		});

		if (!user) {
			return next(new ApiError(404, "User not found", "USER_NOT_FOUND"));
		}

		req.user = user;
		next();
	} catch (err) {
		next(err);
	}
};
