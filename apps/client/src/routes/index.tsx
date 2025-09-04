import {
	Features,
	Footer,
	Hero,
	Navbar,
	Pricing,
	Testimonials,
} from "@/components/blocks/landingpage.blocks";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: App,
	loader: ({ context }) => {
		console.log(context.auth);
	},
});

function App() {
	return (
		<div className="min-h-screen bg-white text-gray-900">
			<Navbar />
			<Hero />
			<Features />
			<Testimonials />
			<Pricing />
			<Footer />
		</div>
	);
}
