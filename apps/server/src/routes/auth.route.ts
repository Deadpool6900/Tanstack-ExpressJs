import { Router } from "express";
import passport from "passport";
import {
	deleteAccount,
	ForgotPassword,
	googleCallback,
	loginfn,
	logout,
	ResetPassword,
	resetPasswordWithToken,
	signupfn,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { asyncHandler } from "../utils/helper";
import { authRateLimiter } from "../utils/RateLimiter";

const r = Router();
export { r as authRouter };

r.use(authRateLimiter);

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
	asyncHandler(resetPasswordWithToken),
);

r.get(
	"/google",
	passport.authenticate("google", { scope: ["profile", "email"] }),
);
r.get(
	"/google/callback",
	passport.authenticate("google", {
		failureRedirect: "http://localhost:3000/auth/login",
		session: false,
	}),
	googleCallback,
);
