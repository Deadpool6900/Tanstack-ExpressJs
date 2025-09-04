import { Navbar } from "@/components/layout/Navbar";
import { AppSidebar } from "@/components/layout/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import type { authResponse } from "@repo/types/responses";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/home/")({
	component: RouteComponent,
	beforeLoad: ({ context }) => {
		if (!context.auth.isAuthenticated) {
			throw redirect({ to: "/auth/login", replace: true });
		}
		return { ...context.auth.user };
	},
});

function RouteComponent() {
	const user = Route.useRouteContext() as authResponse["user"];
	return (
		<div className="flex">
			<SidebarProvider className="hidden sm:flex w-12 transition-all duration-300 sticky top-0 left-0">
				<AppSidebar userdata={user} />
			</SidebarProvider>
			<div className="flex-1">
				<Navbar />
				<div className="flex items-center justify-center w-full h-full">
					<h5 className="text-4xl font-mono">Edit ./src/routes/index.tsx</h5>
				</div>
			</div>
		</div>
	);
}
