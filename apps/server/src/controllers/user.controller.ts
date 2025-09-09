import type { Request, Response } from "express";
import z from "zod";
import { ApiError } from "../utils/ApiError";
import prisma from "../utils/prisma";
//-----------------------------------------------------------------------------------------
export const getUserData = async (req: Request, res: Response) => {
	const user = req.user;
	if (!user) {
		throw new ApiError(401, "Unauthorized", "UNAUTHORIZED");
	}
	const userfromDb = await prisma.user.findUnique({
		where: {
			id: user.id,
		},
	});
	if (!userfromDb) {
		throw new ApiError(404, "User not found", "USER_NOT_FOUND");
	}
	return res.status(200).json({ success: true, user: userfromDb });
};
//-----------------------------------------------------------------------------------------
export const UpdateUsername = async (
	req: Request<{}, {}, { username: string }>,
	res: Response
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
