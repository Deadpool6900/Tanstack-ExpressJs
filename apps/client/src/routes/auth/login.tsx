import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import logo from "@/templet logo.svg";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/auth";
import { loginResSchema } from "@repo/types/responses";
import { loginSchema, type loginType } from "@repo/types/auth";
import { ModeToggle } from "@/components/blocks/theme-provider";

import { cn } from "@/lib/utils";
export const Route = createFileRoute("/auth/login")({
	component: LoginComponent,
	beforeLoad: ({ context }) => {
		if (context.auth.isAuthenticated) {
			throw redirect({ to: "/home", replace: true });
		}
	},
});

// ---------------------------------------------------------------------------------
function LoginComponent() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<loginType>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const { login } = useAuth();

	const onSubmit: SubmitHandler<loginType> = async (data) => {
		try {
			const res = await axiosInstance.post("/auth/login", data);
			const parsed = loginResSchema.safeParse(res.data);
			// console.log(parsed);
			if (!parsed.success) {
				toast.error("Invalid response from server.");
				return;
			}
			// console.log(parsed.data);
			login(parsed.data.user, parsed.data.token);
			toast.success("Login successful!");
			navigate({ to: "/home", replace: true });
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err.message);
				err.status === 404
					? toast.error("User account not found.")
					: toast.error("Invalid email or password.");
			} else {
				toast.error("An unexpected error occurred.");
			}
		}
	};
	const handleGoogleLogin = () => {
		// Redirects to your backend OAuth route
		window.location.href = "http://localhost:5001/auth/google";
	};

	// ---------------------------------------------------------------------------------

	return (
		<div className="grid min-h-svh lg:grid-cols-2 relative">
			<div className="absolute top-4 right-4">
				<ModeToggle />
			</div>
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex justify-center gap-2 md:justify-start">
					<Link to="/" className="flex items-center gap-2 font-medium">
						<div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
							<img src={logo} alt="logo" className="h-12 w-12" />
						</div>
						Form Weaver
					</Link>
				</div>
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-xs">
						<form
							className={"flex flex-col gap-6 mb-4"}
							onSubmit={handleSubmit(onSubmit)}
						>
							<div className="flex flex-col items-center gap-2 text-center">
								<h1 className="text-2xl font-bold">Login to your account</h1>
								<p className="text-muted-foreground text-sm text-balance">
									Enter your email below to login to your account
								</p>
							</div>
							<div className="grid gap-6">
								<div className="grid gap-3">
									<Label htmlFor="email">Email</Label>
									<Input
										type="email"
										placeholder="m@example.com"
										{...register("email", { required: true })}
									/>
									{errors.email?.message && (
										<span className="text-sm text-red-600">
											{errors.email.message}
										</span>
									)}
								</div>
								<div className="grid gap-3">
									<div className="flex items-center">
										<Label htmlFor="password">Password</Label>
										<a
											href="#"
											className="ml-auto text-sm underline-offset-4 hover:underline"
										>
											Forgot your password?
										</a>
									</div>
									<Input
										type="password"
										{...register("password", { required: true })}
										placeholder="********"
									/>
									{errors.password?.message && (
										<span className="text-sm text-red-600">
											{errors.password.message}
										</span>
									)}
								</div>
								<Button type="submit" className="w-full">
									Login
								</Button>
								<div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
									<span className="bg-background text-muted-foreground relative z-10 px-2">
										Or continue with
									</span>
								</div>
							</div>
						</form>
						<Button
							variant="outline"
							className="w-full"
							onClick={handleGoogleLogin}
						>
							<img
								src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
								alt="Google logo"
							/>
							Login with Google
						</Button>
						<div className="text-center text-sm mt-2">
							Don&apos;t have an account?{" "}
							<Link to="/auth/signup" className="underline underline-offset-4">
								Sign up
							</Link>
						</div>
					</div>
				</div>
			</div>
			{/* right side  */}
			<div
				className={cn(
					"min-h-screen bg-[size:16px_16px]",
					"bg-[radial-gradient(var(--dots)_1px,transparent_1px)]",
					"hidden md:flex"
				)}
			></div>
		</div>
	);
}
