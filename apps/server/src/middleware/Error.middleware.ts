import type { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/ApiError";

export const errorMiddleware = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	const status = err instanceof ApiError ? err.statusCode : 500;

	res.status(status).json({
		success: false,
		error: {
			message: err.message || "Internal Server Error",
			code: err.errorCode || "SERVER_ERROR",
			stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
		},
	});
};
