import { Router } from "express";
import {
	deleteAccount,
	ForgotPassword,
	loginfn,
	logout,
	ResetPassword,
	resetPasswordWithToken,
	signupfn,
} from "../controllers/auth.controller";
import { asyncHandler } from "../utils/helper";
import { authMiddleware } from "../middleware/auth.middleware";
const r = Router();
export { r as authRouter };

// signup login logout change password forgot password

r.post("/signup", asyncHandler(signupfn));
r.post("/login", asyncHandler(loginfn));
r.post("/logout", authMiddleware, asyncHandler(logout));
r.delete("/deleteAccount", authMiddleware, asyncHandler(deleteAccount));
r.post("/resetPassword", authMiddleware, asyncHandler(ResetPassword));
r.post("/forgotPassword", authMiddleware, asyncHandler(ForgotPassword));
r.post(
	"/resetPasswordWithToken",
	authMiddleware,
	asyncHandler(resetPasswordWithToken)
);
