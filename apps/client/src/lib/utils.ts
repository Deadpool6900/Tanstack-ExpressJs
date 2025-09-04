import { authResponseSchema } from "@repo/types/responses";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axiosInstance from "./axios";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

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
