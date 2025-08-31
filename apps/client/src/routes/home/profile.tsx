import { useAuth } from "@/auth";
import { Navbar } from "@/components/layout/Navbar";
import { AppSidebar } from "@/components/layout/Sidebar";
import { Button } from "@/components/ui/button";
import { SidebarProvider } from "@/components/ui/sidebar";
import axiosInstance from "@/lib/axios";
import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import type { AxiosResponse } from "axios";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Pencil, LogOut, LockKeyholeOpen, Trash2 } from "lucide-react";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {resetPasswordSchema,type resetPasswordType} from '@repo/types/auth';

export const Route = createFileRoute("/home/profile")({
	component: RouteComponent,
	beforeLoad: ({ context }) => {
		if (!context.auth.isAuthenticated) {
			throw redirect({ to: "/auth/login", replace: true });
		}
	},
});


function RouteComponent() {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<resetPasswordType>({
		resolver: zodResolver(resetPasswordSchema),
		defaultValues: {
			currentPwd: "",
			newPwd: "",
		},
	});

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

	const onSubmit: SubmitHandler<resetPasswordType> = async (data) => {
		try {
			const res: AxiosResponse = await axiosInstance.post(
				"auth/resetPassword",
				{
					currentPwd: data.currentPwd,
					newPwd: data.newPwd,
				}
			);

			if (res.status == 200) {
				toast.success("Password reset successfully.");
			} else {
				toast.error(res.statusText);
			}
		} catch (error) {
			toast.error("Server error. Please try again later.");
			console.error("Password reset failed:", error);
		}
	};

	const [confirmText, setConfirmText] = useState("");

	const handleDeleteAccount = async () => {
		try {
			const res: AxiosResponse = await axiosInstance.delete(
				"/auth/deleteAccount"
			);

			if (res.status == 200) {
				toast.success("Account deleted successfully.");
				logout();
			} else {
				toast.error(res.statusText);
			}
		} catch (error) {
			toast.error("Server error. Please try again later.");
			console.error("Account deletion failed:", error);
		}
	};

	return (
		<div className="flex ">
			<SidebarProvider className="hidden sm:flex w-12 transition-all duration-300 sticky top-0 left-0">
				<AppSidebar />
			</SidebarProvider>
			<div className="flex-1">
				<Navbar />
				<div className="h-full w-full  ">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-">
						<div className="lg:col-span-full">
							<div className="rounded-2xl bg-gradient-to-b p-6 ">
								<div className="flex items-start justify-between gap-6">
									<div className="flex items-center gap-4">
										<Avatar className="h-24 w-24 ring-2 ring-ring">
											<AvatarImage src="/avatar.png" alt="avatar" />
											<AvatarFallback>KK</AvatarFallback>
										</Avatar>
										<div>
											<h2 className="text-2xl font-semibold">Kedar_</h2>
											<p className="text-sm text-slate-600">kedar123@test.io</p>
										</div>
									</div>

									<div className="ml-auto">
										<Button
											variant="outline"
											size="sm"
											className="flex items-center gap-2"
										>
											<Pencil className="h-4 w-4" />
											Edit
										</Button>
									</div>
								</div>

								<Separator className="my-6" />
								<div className="">
									<h5 className="text-2xl font-bold">Account</h5>
									<p className="text-sm text-slate-500">
										Manage your account settings and preferences.
									</p>
{/* -------------------------------------------------------------------------------------------------- */}
									<div className="mt-2 space-y-2 ">
										<p className="">Logout from this device </p>
										<Dialog>
											<DialogTrigger asChild>
												<Button
													variant="destructive"
													size="sm"
													className="flex items-center gap-2"
												>
													<LogOut className="h-4 w-4" />
													logout
												</Button>
											</DialogTrigger>
											<DialogContent>
												<DialogHeader>
													<DialogTitle>Are you absolutely sure?</DialogTitle>
													<DialogDescription>
														This action cannot be undone. This will permanently
														delete your account and remove your data from our
														servers.
													</DialogDescription>
												</DialogHeader>
												<DialogClose>
													<Button onClick={handleLogout}>Confirm</Button>
												</DialogClose>
											</DialogContent>
										</Dialog>
									</div>
{/* -------------------------------------------------------------------------------------------------------- */}

									<div className="mt-2 space-y-2 ">
										<p className="">Reset password</p>
										<Dialog>
											<DialogTrigger asChild>
												<Button
													variant="outline"
													size="sm"
													className="flex items-center gap-2"
												>
													Reset
												</Button>
											</DialogTrigger>

											<DialogContent>
												<DialogHeader>
													<DialogTitle className="flex items-center gap-2">
														<LockKeyholeOpen size={16} />
														Reset your password
													</DialogTitle>

													<DialogDescription>
														Please enter your old and new password.
													</DialogDescription>
												</DialogHeader>

												<form onSubmit={handleSubmit(onSubmit)} className="">
													<div className="flex flex-col gap-4">
														<Label>Old Password</Label>
														<Input
															type="password"
															placeholder="*******"
															{...register("currentPwd")}
														/>
														{errors.currentPwd && (
															<p className="text-red-500">
																{errors.currentPwd.message}
															</p>
														)}

														<Label>New Password</Label>
														<Input
															type="password"
															placeholder="*******"
															{...register("newPwd")}
														/>
														{errors.newPwd && (
															<p className="text-red-500">
																{errors.newPwd.message}
															</p>
														)}
													</div>

													<Button type="submit" className="mt-4">
														Confirm
													</Button>
												</form>
											</DialogContent>
										</Dialog>
									</div>
{/* -------------------------------------------------------------------------------------------------------- */}
									<div className="mt-2 space-y-2">
										<p className="">Delete your account</p>
										<Dialog>
											<DialogTrigger asChild>
												<Button
													variant="destructive"
													size="sm"
													className="flex items-center gap-2"
												>
													<Trash2 className="h-4 w-4" />
													Delete Account
												</Button>
											</DialogTrigger>
											<DialogContent>
												<DialogHeader>
													<DialogTitle>Are you absolutely sure?</DialogTitle>
													<DialogDescription>
														This action cannot be undone. Please type{" "}
														<span className="font-semibold">CONFIRM</span> below
														to proceed with deleting your account and erasing
														all your data.
													</DialogDescription>
												</DialogHeader>

												<div className="space-y-4">
													<Input
														placeholder="Type CONFIRM to continue"
														value={confirmText}
														onChange={(e) => setConfirmText(e.target.value)}
													/>

													<DialogClose asChild>
														<Button
															variant="destructive"
															disabled={confirmText !== "CONFIRM"}
															onClick={handleDeleteAccount}
														>
															Confirm
														</Button>
													</DialogClose>
												</div>
											</DialogContent>
										</Dialog>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
