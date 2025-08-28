import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import logo from "@/templet logo.svg";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { useAuth } from "@/auth";
import { loginResSchema } from "./login";

export const Route = createFileRoute("/auth/signup")({
	component: SignupComponent,
	beforeLoad: ({ context }) => {
		if (context.auth.isAuthenticated) {
			throw redirect({ to: "/home", replace: true });
		}
	},
});
// ---------------------------------------------------------------------------------

const FormSchema = z.object({
	username: z.string().min(3).max(50),
	email: z.email(),
	password: z.string().min(5).max(20),
});
type FormType = z.infer<typeof FormSchema>;
// ---------------------------------------------------------------------------------

function SignupComponent() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormType>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
	});
	const {login} = useAuth();

	// ---------------------------------------------------------------------------------
	const onSubmit: SubmitHandler<FormType> = async (data) => {
		try {
			const res = await axiosInstance.post("/auth/signup", data);
			const parsed = loginResSchema.safeParse(res.data);
			console.log(parsed);
			if (!parsed.success) {
				toast.error("Invalid response from server.");
				return;
			}
			console.log(parsed.data);
			login(parsed.data.user, parsed.data.token);
			toast.success("signup successful!");
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
	// ---------------------------------------------------------------------------------

	return (
		<div className="grid min-h-svh lg:grid-cols-2">
			<div className="flex flex-col gap-4 p-6 md:p-10">
				<div className="flex justify-center gap-2 md:justify-start">
					<a href="#" className="flex items-center gap-2 font-medium">
						<div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
							<img src={logo} alt="logo" className="h-12 w-12 bg-white" />
						</div>
						Form Weaver
					</a>
				</div>
				<div className="flex flex-1 items-center justify-center">
					<div className="w-full max-w-xs">
						<form
							className={"flex flex-col gap-6"}
							onSubmit={handleSubmit(onSubmit)}
						>
							<div className="flex flex-col items-center gap-2 text-center">
								<h1 className="text-2xl font-bold">
									Create your free account to get started.
								</h1>
								<p className="text-muted-foreground text-sm text-">
									Enter your email ,name below to sign up for a new account.
								</p>
							</div>
							<div className="grid gap-6">
								<div className="grid gap-3">
									<Label htmlFor="name">Username</Label>
									<Input
										placeholder="luffy"
										{...register("username", { required: true })}
									/>
									{errors.username?.message && (
										<span className="text-sm text-red-600">
											{errors.username.message}
										</span>
									)}
								</div>
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
								<Button variant="outline" className="w-full">
									<img
										src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
										alt="Google logo"
									/>
									Login with Google
								</Button>
							</div>
							<div className="text-center text-sm">
								Already have an Account ?
								<a href="/auth/login" className="underline underline-offset-4">
									login
								</a>
							</div>
						</form>
					</div>
				</div>
			</div>
			<div className=" relative hidden lg:block  inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>
		</div>
	);
}
