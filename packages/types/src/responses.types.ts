import { z } from "zod";
// this fucking file defines how express api responses should look like
export const authResponseSchema = z.object({
	success: z.boolean(),
	user: z
		.object({
			id: z.string(),
			email: z.email(),
			password: z.string().nullable(),
			username: z.string(),
			pfpUrl: z.string().nullable().optional(),
			createdAt: z.string().optional(),
			updatedAt: z.string().optional(),
			authProviders: z.array(z.enum(["LOCAL", "GOOGLE", "GITHUB"])),
		})
		.optional(),
});

export type authResponse = z.infer<typeof authResponseSchema>;

export const loginResSchema = z.object({
	user: authResponseSchema.shape.user,
	token: z.string(),
});
export type loginResType = z.infer<typeof loginResSchema>;
