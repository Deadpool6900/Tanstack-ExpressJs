import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import axiosInstance from "./axios";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const authResponseSchema = z.object({
	success: z.boolean(),
	user: z
		.object({
			id: z.string(),
			email: z.email(),
			password: z.string(),
			username: z.string(),
			pfpUrl: z.string().nullable().optional(),
			createdAt: z.string().optional(),
			updatedAt: z.string().optional()
		})
		.optional(),
});

// Inferred TypeScript type if needed
export type AuthResponse = z.infer<typeof authResponseSchema>;

export const fetchUser = async () => {
	try {
		const res = await axiosInstance.get("/user/getUserData");
		const parsed = authResponseSchema.safeParse(res.data);

		if (!parsed.success) {
			return { success: false, user: null };
		}
		return parsed.data;
	} catch (error) {
		return { success: false, user: null };
	}
};
