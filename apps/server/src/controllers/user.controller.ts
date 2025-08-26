import type { Request, Response } from "express";
import z from "zod";
import { getUserDataFromCookies } from "../utils/helper";
import prisma from "../utils/prisma";
import { ApiError } from "../utils/ApiError";
//-----------------------------------------------------------------------------------------
export const getUserData = async (req: Request, res: Response) => {
	const user = req.user;
	if (!user) {
		throw new ApiError(401, "Unauthorized", "UNAUTHORIZED");
	}
	const usr = await prisma.user.findUnique({
		where: {
			id: user.id,
		},
	});
	if (!usr) {
		throw new ApiError(404, "User not found", "USER_NOT_FOUND");
	}
	return res.status(200).json({ success: true, user: usr });
};
//-----------------------------------------------------------------------------------------
export const UpdateUsername = async (
	req: Request<{}, {}, { username: string }>,
	res: Response,
) => {
	const user = req.user;
	if (!user) {
		throw new ApiError(401, "Unauthorized", "UNAUTHORIZED");
	}

	const { username } = req.body;
	if (!username) {
		throw new ApiError(400, "Bad Request", "BAD_REQUEST");
	}

	const updatedUser = await prisma.user.update({
		where: { id: user.id },
		data: { username },
	});

	return res.status(200).json({
		success: true,
		message: "Username updated successfully",
		user: updatedUser,
	});
};
