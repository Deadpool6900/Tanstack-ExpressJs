import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
	Sparkles,
	Layout,
	Plug,
	BarChart3,
	Check,
	ArrowRight,
	Quote,
} from "lucide-react";

// ---- Utility: basic container & section wrappers ----
import { type ReactNode } from "react";
import { Link } from "@tanstack/react-router";

type ContainerProps = {
	className?: string;
	children?: ReactNode;
};

export const Container: React.FC<ContainerProps> = ({
	className = "",
	children,
}) => (
	<div className={`mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
		{children}
	</div>
);

export const SectionHeader: React.FC<{
	eyebrow?: string;
	title: string;
	subtitle?: string;
}> = ({ eyebrow, title, subtitle }) => (
	<div className="mx-auto max-w-2xl text-center">
		{eyebrow && (
			<motion.p
				initial={{ opacity: 0, y: 8 }}
				whileInView={{ opacity: 1, y: 0 }}
				viewport={{ once: true, amount: 0.3 }}
				className="mb-2 text-sm font-semibold tracking-wider text-indigo-600"
			>
				{eyebrow}
			</motion.p>
		)}
		<motion.h2
			initial={{ opacity: 0, y: 12 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.3 }}
			className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl"
		>
			{title}
		</motion.h2>
		{subtitle && (
			<motion.p
				initial={{ opacity: 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true, amount: 0.3 }}
				className="mt-3 text-base text-gray-600"
			>
				{subtitle}
			</motion.p>
		)}
	</div>
);

// ---- Navbar ----
export const Navbar: React.FC = () => (
	<header className="sticky top-0 z-40 w-full border-b border-gray-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
		<Container className="flex h-16 items-center justify-between">
			<div className="flex items-center gap-2">
				<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-blue-500 text-white shadow">
					<Sparkles size={20} />
				</div>
				<span className="text-lg font-semibold tracking-tight text-gray-900">
					Form Weaver
				</span>
			</div>
			<nav className="hidden items-center gap-6 text-sm text-gray-700 md:flex">
				<a href="#features" className="hover:text-gray-900">
					Features
				</a>
				<a href="#testimonials" className="hover:text-gray-900">
					Customers
				</a>
				<a href="#pricing" className="hover:text-gray-900">
					Pricing
				</a>
				<a href="#docs" className="hover:text-gray-900">
					Docs
				</a>
			</nav>
			<div className="flex items-center gap-3">
				<Link to="/auth/login"
					href="#login"
					className="hidden rounded-xl px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 md:block"
				>
					Sign in
				</Link>
				<a
					href="#get-started"
					className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-gray-800"
				>
					Get Started
				</a>
			</div>
		</Container>
	</header>
);

// ---- Hero ----
export const Hero: React.FC = () => (
	<section className="relative overflow-hidden bg-white">
		<Container className="grid items-center gap-12 py-20 md:grid-cols-2 md:py-28">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="order-2 md:order-1"
			>
				<div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 shadow-sm">
					<Sparkles size={14} className="text-indigo-600" /> AI-Powered Form
					Generator
				</div>
				<h1 className="mt-4 text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
					Generate Smart Forms in Seconds with AI
				</h1>
				<p className="mt-4 text-base leading-relaxed text-gray-600">
					Form Weaver turns plain-language prompts into production-ready,
					accessible forms. Customize, integrate, and analyze — all in one
					place.
				</p>
				<div className="mt-8 flex flex-wrap items-center gap-3">
					<Link to="/home"
						className="group inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-200/40 hover:brightness-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
					>
						Get Started Free
						<ArrowRight
							className="ml-2 transition-transform group-hover:translate-x-0.5"
							size={18}
						/>
					</Link>
					<a
						href="#demo"
						className="inline-flex items-center justify-center rounded-xl border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
					>
						Request a Demo
					</a>
				</div>
				<div className="mt-6 text-xs text-gray-500">
					Free trial • No credit card required • Cancel anytime
				</div>
			</motion.div>

			{/* Hero Graphic Placeholder */}
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.1, duration: 0.6 }}
				className="order-1 md:order-2"
			>
				<div className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-3xl border border-gray-200 bg-gradient-to-br from-indigo-50 via-white to-blue-50 shadow-xl">
					<div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-gradient-to-br from-indigo-300/40 via-purple-300/40 to-blue-300/40 blur-3xl" />
					<div className="absolute inset-0 flex items-center justify-center">
						<div className="w-full max-w-xs rounded-2xl bg-white/70 p-4 shadow backdrop-blur">
							<div className="mb-3 h-3 w-24 rounded bg-gray-200" />
							<div className="mb-2 h-9 w-full rounded bg-gray-100" />
							<div className="mb-2 h-9 w-full rounded bg-gray-100" />
							<div className="mb-4 h-9 w-2/3 rounded bg-gray-100" />
							<div className="flex gap-2">
								<div className="h-9 w-24 rounded bg-indigo-600/90" />
								<div className="h-9 w-24 rounded border border-gray-300 bg-white" />
							</div>
						</div>
					</div>
				</div>
			</motion.div>
		</Container>
	</section>
);

// ---- Feature Card ----
export const FeatureCard: React.FC<{
	icon: React.ReactNode;
	title: string;
	desc: string;
}> = ({ icon, title, desc }) => (
	<motion.div
		initial={{ opacity: 0, y: 16 }}
		whileInView={{ opacity: 1, y: 0 }}
		viewport={{ once: true, amount: 0.35 }}
		className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
	>
		<div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-600 via-violet-600 to-blue-600 text-white shadow">
			{icon}
		</div>
		<h3 className="text-lg font-semibold text-gray-900">{title}</h3>
		<p className="mt-2 text-sm text-gray-600">{desc}</p>
	</motion.div>
);

// ---- Features ----
export const Features: React.FC = () => (
	<section id="features" className="bg-white py-16 sm:py-24">
		<Container>
			<SectionHeader
				eyebrow="Why Form Weaver"
				title="Build, customize, and ship forms—10x faster"
				subtitle="From prompt to production, Form Weaver streamlines every step of form creation."
			/>
			<div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
				<FeatureCard
					icon={<Sparkles size={22} />}
					title="AI Customization"
					desc="Describe your form in plain English. Our AI generates fields, validations, and logic instantly."
				/>
				<FeatureCard
					icon={<Layout size={22} />}
					title="Drag & Drop Builder"
					desc="Fine-tune with an intuitive builder. Reorder fields, add sections, and set conditional logic."
				/>
				<FeatureCard
					icon={<Plug size={22} />}
					title="Integrations"
					desc="Connect to CRMs, Slack, Zapier, and webhooks. Export data or trigger workflows in minutes."
				/>
				<FeatureCard
					icon={<BarChart3 size={22} />}
					title="Analytics"
					desc="Track completion rates, drop-offs, and conversions with privacy-first insights."
				/>
			</div>
		</Container>
	</section>
);

// ---- Testimonials ----
export const testimonials = [
	{
		quote:
			"Form Weaver cut our form build time from days to minutes. The AI suggestions are on point.",
		name: "Aarav Shah",
		role: "Product Lead, FinGuild",
	},
	{
		quote:
			"The drag-and-drop builder with conditional logic is the best I've used. Our team ships faster.",
		name: "Maya Kapoor",
		role: "Head of Operations, Zento Retail",
	},
	{
		quote:
			"Insights helped us improve completion by 22%. Integration with Slack keeps everyone aligned.",
		name: "Rahul Mehta",
		role: "Growth Manager, NovaStack",
	},
];

export const Testimonials: React.FC = () => {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const id = setInterval(
			() => setIndex((i) => (i + 1) % testimonials.length),
			5000
		);
		return () => clearInterval(id);
	}, []);

	return (
		<section id="testimonials" className="bg-gray-50 py-16 sm:py-24">
			<Container>
				<SectionHeader
					eyebrow="Loved by teams"
					title="What our customers say"
					subtitle="Social proof from teams shipping forms that convert."
				/>

				<div className="relative mx-auto mt-10 max-w-3xl">
					<div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
						<motion.div
							key={index}
							initial={{ opacity: 0, x: 30 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ type: "spring", stiffness: 70, damping: 15 }}
							className="p-8 sm:p-10"
						>
							<Quote className="mb-4 text-indigo-600" />
							<p className="text-lg leading-relaxed text-gray-800">
								“{testimonials[index].quote}”
							</p>
							<div className="mt-6 text-sm font-medium text-gray-900">
								{testimonials[index].name}
							</div>
							<div className="text-sm text-gray-600">
								{testimonials[index].role}
							</div>
						</motion.div>
						<div className="flex items-center justify-center gap-2 pb-5">
							{testimonials.map((_, i) => (
								<button
									key={i}
									aria-label={`Go to slide ${i + 1}`}
									onClick={() => setIndex(i)}
									className={`h-2.5 w-2.5 rounded-full transition ${
										i === index
											? "bg-indigo-600"
											: "bg-gray-300 hover:bg-gray-400"
									}`}
								/>
							))}
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
};

// ---- Pricing ----
export const Pricing: React.FC = () => {
	const plans = [
		{
			name: "Starter",
			price: "$0",
			tag: "Free",
			desc: "For individuals exploring AI forms",
			features: [
				"AI form generation",
				"Basic drag & drop",
				"100 submissions / mo",
				"Email support",
			],
			cta: "Start for Free",
			highlighted: false,
		},
		{
			name: "Pro",
			price: "$29",
			tag: "Most Popular",
			desc: "For teams ready to scale",
			features: [
				"Advanced logic & validations",
				"Branding & custom domains",
				"3,000 submissions / mo",
				"Priority support",
			],
			cta: "Choose Pro",
			highlighted: true,
		},
		{
			name: "Enterprise",
			price: "Custom",
			tag: "",
			desc: "For organizations with requirements",
			features: [
				"SSO & role-based access",
				"On-prem or VPC deployment",
				"Unlimited submissions",
				"Dedicated success manager",
			],
			cta: "Contact Sales",
			highlighted: false,
		},
	];

	return (
		<section id="pricing" className="bg-white py-16 sm:py-24">
			<Container>
				<SectionHeader
					eyebrow="Flexible Pricing"
					title="Simple plans for every stage"
					subtitle="Start free, upgrade when you're ready."
				/>

				<div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{plans.map((p) => (
						<motion.div
							key={p.name}
							initial={{ opacity: 0, y: 16 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.35 }}
							className={`relative rounded-2xl border ${
								p.highlighted
									? "border-indigo-500 bg-gradient-to-b from-indigo-50/60 to-white"
									: "border-gray-200 bg-white"
							} p-6 shadow-sm`}
						>
							{p.tag && (
								<span
									className={`absolute right-4 top-4 rounded-full px-2.5 py-1 text-xs font-semibold ${
										p.highlighted
											? "bg-indigo-600 text-white"
											: "bg-gray-900 text-white"
									}`}
								>
									{p.tag}
								</span>
							)}
							<h3 className="text-lg font-semibold text-gray-900">{p.name}</h3>
							<div className="mt-2 text-3xl font-extrabold tracking-tight text-gray-900">
								{p.price}
								<span className="align-baseline text-sm font-medium text-gray-500">
									{p.price !== "Custom" ? "/mo" : ""}
								</span>
							</div>
							<p className="mt-2 text-sm text-gray-600">{p.desc}</p>
							<ul className="mt-6 space-y-2">
								{p.features.map((f) => (
									<li
										key={f}
										className="flex items-start gap-2 text-sm text-gray-700"
									>
										<Check size={16} className="mt-0.5 text-indigo-600" />
										<span>{f}</span>
									</li>
								))}
							</ul>
							<a
								href="#checkout"
								className={`mt-6 inline-flex w-full items-center justify-center rounded-xl px-4 py-2.5 text-sm font-semibold shadow ${
									p.highlighted
										? "bg-indigo-600 text-white hover:bg-indigo-700"
										: "bg-gray-900 text-white hover:bg-gray-800"
								}`}
							>
								{p.cta}
							</a>
						</motion.div>
					))}
				</div>

				<p className="mt-6 text-center text-xs text-gray-500">
					All prices in USD. Taxes may apply.
				</p>
			</Container>
		</section>
	);
};

// ---- Footer ----
export const Footer: React.FC = () => (
	<footer className="border-t border-gray-200 bg-white py-12">
		<Container className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
			<div>
				<div className="flex items-center gap-2">
					<div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-violet-500 to-blue-500 text-white">
						<Sparkles size={20} />
					</div>
					<span className="text-lg font-semibold text-gray-900">
						Form Weaver
					</span>
				</div>
				<p className="mt-3 text-sm text-gray-600">
					AI-native form generator for modern teams. Create, integrate, and
					analyze forms at warp speed.
				</p>
			</div>

			<div>
				<h4 className="text-sm font-semibold text-gray-900">Product</h4>
				<ul className="mt-3 space-y-2 text-sm text-gray-600">
					<li>
						<a href="#features" className="hover:text-gray-900">
							Features
						</a>
					</li>
					<li>
						<a href="#pricing" className="hover:text-gray-900">
							Pricing
						</a>
					</li>
					<li>
						<a id="docs" href="#docs" className="hover:text-gray-900">
							Docs
						</a>
					</li>
				</ul>
			</div>

			<div>
				<h4 className="text-sm font-semibold text-gray-900">Company</h4>
				<ul className="mt-3 space-y-2 text-sm text-gray-600">
					<li>
						<a href="#about" className="hover:text-gray-900">
							About
						</a>
					</li>
					<li>
						<a href="#careers" className="hover:text-gray-900">
							Careers
						</a>
					</li>
					<li>
						<a href="#contact" className="hover:text-gray-900">
							Contact
						</a>
					</li>
				</ul>
			</div>

			<div>
				<h4 className="text-sm font-semibold text-gray-900">Legal</h4>
				<ul className="mt-3 space-y-2 text-sm text-gray-600">
					<li>
						<a href="#privacy" className="hover:text-gray-900">
							Privacy
						</a>
					</li>
					<li>
						<a href="#terms" className="hover:text-gray-900">
							Terms
						</a>
					</li>
					<li>
						<a href="#security" className="hover:text-gray-900">
							Security
						</a>
					</li>
				</ul>
			</div>
		</Container>
		<Container className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-gray-200 pt-6 text-xs text-gray-500 sm:flex-row">
			<p>
				© {new Date().getFullYear()} Form Weaver, Inc. All rights reserved.
			</p>
			<div className="flex items-center gap-4">
				<a href="#privacy" className="hover:text-gray-700">
					Privacy
				</a>
				<span>•</span>
				<a href="#contact" className="hover:text-gray-700">
					Contact
				</a>
			</div>
		</Container>
	</footer>
);
