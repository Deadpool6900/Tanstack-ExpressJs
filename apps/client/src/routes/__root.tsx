import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanstackDevtools } from "@tanstack/react-devtools";
import { Toaster } from "@/components/ui/sonner";
import type { AuthResponse } from "@/lib/utils";



interface MyRouterContext {
	// The ReturnType of your useAuth hook or the value of your AuthContext
	auth: {
		isAuthenticated: boolean;
		user: AuthResponse["user"] | null;
	};
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
	component: () => (
		<>
			<Toaster position="top-left" />
			<Outlet />
			<TanstackDevtools
				config={{
					position: "bottom-left",
				}}
				plugins={[
					{
						name: "Tanstack Router",
						render: <TanStackRouterDevtoolsPanel />,
					},
				]}
			/>
		</>
	),
});


