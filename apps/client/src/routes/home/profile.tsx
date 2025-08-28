import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/home/profile")({
	component: RouteComponent,
	beforeLoad: ({ context }) => {
		if (!context.auth.isAuthenticated) {
			throw redirect({ to: "/auth/login", replace: true });
		}
	},
});

function RouteComponent() {
	return <div>Hello "/home/profile"!</div>;
}
