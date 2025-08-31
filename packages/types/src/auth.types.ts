import { z } from "zod";

export const signupSchema = z.object({
	username: z.string().trim().min(3, "Username must be at least 3 characters"),
	email: z.email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

export const loginSchema = z.object({
    email: z.email("Invalid email address"),
	password: z.string().min(6, "Password must be at least 6 characters"),
});

export const resetPasswordSchema = z.object({
    currentPwd: z.string().min(6, "Password must be at least 6 characters"),
	newPwd: z.string().min(6, "Password must be at least 6 characters"),
});

export const forgotPwdSchema = z.object({
    email: z.email(),
});

export const resetPwdWithToken = z.object({
    token: z.string().min(1, "Reset token is required"),
	newPassword: z.string().min(6, "Password must be at least 6 characters"),
});
//------------------------------------------------------------------------------------------
export type signupTypes = z.infer<typeof signupSchema>;
export type loginType = z.infer<typeof loginSchema>;
export type resetPasswordType = z.infer<typeof resetPasswordSchema>;
export type forgotPwdType = z.infer<typeof forgotPwdSchema>;
export type resetPwdWithTokenType = z.infer<typeof resetPwdWithToken>;