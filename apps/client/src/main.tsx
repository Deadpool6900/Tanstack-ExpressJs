// filepath: d:\TempletsRepos\vite-express-ts\apps\client\src\main.tsx
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx"; // Import the App component
import reportWebVitals from "./reportWebVitals.ts";
import "./styles.css";
import type { router } from "./router";

// Render the app
const rootElement = document.getElementById("app");
if (rootElement && !rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<StrictMode>
			<App />
		</StrictMode>,
	);
}

declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
