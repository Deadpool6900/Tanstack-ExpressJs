import { useAuth } from "@/auth";
import { Sidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import axiosInstance from "@/lib/axios";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";

export const Route = createFileRoute("/home/")({
	component: RouteComponent,
	beforeLoad: ({ context }) => {
		if (!context.auth.isAuthenticated) {
			throw redirect({ to: "/auth/login", replace: true });
		}
	},
});

function RouteComponent() {
	const navigate = useNavigate();
	const { logout } = useAuth();
	const handleLogout = async () => {
		try {
			const res: AxiosResponse = await axiosInstance.post("/auth/logout");

			console.log(res);

			if (res.status == 200) {
				logout();
				navigate({ to: "/auth/login", replace: true });
			} else {
				toast.error(res.statusText);
			}
		} catch (error) {
			toast.error("Server error. Please try again later.");
			console.error("Logout failed:", error);
		}
	};
	return (
		<div className="flex">
			<Sidebar />
			<main  className="flex items-center justify-center p-4 flex-1 flex-col">
				<h1>Welcome to the Home Page</h1>

				<Button variant="destructive" onClick={handleLogout}>
					Logout
				</Button>
			</main>
		</div>
	);
}
