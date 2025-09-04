import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/auth";
import { useEffect } from "react";
import { toast } from "sonner";
import axiosInstance from "@/lib/axios";
import { authResponseSchema } from "@repo/types/responses";

export const Route = createFileRoute("/auth/oauthCallback")({
	component: OAuthCallback,
	validateSearch: (search: Record<string, unknown>): { token: string } => {
		// Validate that the token is a string
		if (typeof search.token === "string") {
			return { token: search.token };
		}
		return { token: "" };
	},
});

function OAuthCallback() {
	const navigate = useNavigate();
	const { Oauthlogin } = useAuth();
	const { token } = Route.useSearch();

	useEffect(() => {
		const handleOAuthLogin = async () => {
			if (!token) {
				toast.error("OAuth failed: No token provided.");
				navigate({ to: "/auth/login", replace: true });
				return;
			}

			try {
				// Use the token to fetch user data from a protected route
				// This verifies the token is valid
				const res = await axiosInstance.get("/user/getUserData", {
					headers: {
						Authorization: `Bearer ${token}`,
					},
				});

				console.log(res.data);

				const parsed = authResponseSchema.safeParse(res.data);

				console.log(parsed.error?.message);

				if (!parsed.success) {
					toast.error("Invalid user data from server.");
					navigate({ to: "/auth/login", replace: true });
					return;
				}

				// If successful, complete the login
				Oauthlogin(parsed.data.user, token);
				navigate({ to: "/home", replace: true });
			} catch (error) {
				toast.error("OAuth login failed. Please try again.");
				navigate({ to: "/auth/login", replace: true });
			}
		};

		handleOAuthLogin();
	}, [token, Oauthlogin, navigate]);

	return (
		<div className="flex h-screen items-center justify-center">
			<p>Completing login...</p>
		</div>
	);
}
