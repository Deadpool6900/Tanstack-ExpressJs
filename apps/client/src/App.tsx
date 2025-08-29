// filepath: d:\TempletsRepos\vite-express-ts\apps\client\src\App.tsx
import { RouterProvider } from "@tanstack/react-router";
import { AuthProvider, useAuth } from "./auth";
import { router } from "./router";
import { ThemeProvider } from "./components/blocks/theme-provider";

function InnerApp() {
	const auth = useAuth();
	return <RouterProvider router={router} context={{ auth }} />;
}

function App() {
	return (
		<AuthProvider>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<InnerApp />
			</ThemeProvider>
		</AuthProvider>
	);
}

export default App;
