// import React, { useMemo, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
// 	Dialog,
// 	DialogContent,
// 	DialogDescription,
// 	DialogFooter,
// 	DialogHeader,
// 	DialogTitle,
// 	DialogTrigger,
// } from "@/components/ui/dialog";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";
// import { Card, CardContent } from "@/components/ui/card";
// import {
// 	Sheet,
// 	SheetContent,
// 	SheetHeader,
// 	SheetTitle,
// 	SheetTrigger,
// } from "@/components/ui/sheet";
// import {
// 	Home,
// 	LineChart,
// 	Settings,
// 	Menu,
// 	LogOut,
// 	UserRound,
// 	Share2,
// } from "lucide-react";

// // ---------- Types ----------
// interface User {
// 	id: string;
// 	username: string;
// 	email: string;
// 	avatarUrl?: string;
// }

// // ---------- Navbar ----------
// function Navbar({ onOpenSidebar }: { onOpenSidebar: () => void }) {
// 	return (
// 		<header className="sticky top-0 z-30 w-full border-b border-slate-200 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
// 			<div className="mx-auto flex h-14 w-full max-w-7xl items-center gap-3 px-3 sm:px-4">
// 				{/* Mobile sidebar trigger */}
// 				<div className="sm:hidden">
// 					<Button
// 						variant="ghost"
// 						size="icon"
// 						aria-label="Open menu"
// 						onClick={onOpenSidebar}
// 					>
// 						<Menu className="h-5 w-5" />
// 					</Button>
// 				</div>
// 				<div className="flex items-center gap-2">
// 					<div className="grid h-7 w-7 place-items-center rounded-md bg-slate-900 text-white">
// 						FW
// 					</div>
// 					<span className="text-sm font-medium text-slate-600">
// 						Form Weaver
// 					</span>
// 				</div>
// 				<div className="ml-auto">
// 					<Button variant="outline" size="sm" className="gap-2">
// 						<Share2 className="h-4 w-4" /> Share
// 					</Button>
// 				</div>
// 			</div>
// 		</header>
// 	);
// }



// // ---------- Profile Card ----------
// function ProfileCard({ user }: { user: User }) {
// 	return (
// 		<Card className="border-sky-100 bg-sky-50/80">
// 			<CardContent className="p-4 sm:p-6">
// 				<div className="flex items-center gap-4">
// 					<Avatar className="h-20 w-20">
// 						<AvatarImage src={user.avatarUrl} alt={user.username} />
// 						<AvatarFallback className="bg-slate-200">
// 							{user.username?.slice(0, 2)?.toUpperCase()}
// 						</AvatarFallback>
// 					</Avatar>
// 					<div>
// 						<h2 className="text-xl font-semibold text-slate-900 sm:text-2xl">
// 							{user.username}
// 						</h2>
// 						<p className="text-sm text-slate-600">{user.email}</p>
// 					</div>
// 				</div>

// 				<Separator className="my-6" />
// 				<p className="text-sm font-medium text-slate-700">Account</p>
// 			</CardContent>
// 		</Card>
// 	);
// }

// // ---------- Account Actions ----------
// function AccountActions({
// 	user,
// 	onUsernameChange,
// 	onResetPassword,
// 	onDeleteAccount,
// 	onLogout,
// }: {
// 	user: User;
// 	onUsernameChange: (newName: string) => void;
// 	onResetPassword: () => void;
// 	onDeleteAccount: () => void;
// 	onLogout: () => void;
// }) {
// 	const [nameDraft, setNameDraft] = useState(user.username);

// 	return (
// 		<div className="space-y-4">
// 			{/* Update Username */}
// 			<Card className="border-sky-100 bg-sky-50/70">
// 				<CardContent className="p-4 sm:p-6">
// 					<div className="flex items-center justify-between gap-4">
// 						<div>
// 							<h3 className="text-base font-semibold text-slate-900">
// 								Update username
// 							</h3>
// 							<p className="text-sm text-slate-600">Current: {user.username}</p>
// 						</div>
// 						<Dialog>
// 							<DialogTrigger asChild>
// 								<Button size="sm">Edit</Button>
// 							</DialogTrigger>
// 							<DialogContent className="sm:max-w-md">
// 								<DialogHeader>
// 									<DialogTitle>Update username</DialogTitle>
// 									<DialogDescription>
// 										Pick a new display name for your account.
// 									</DialogDescription>
// 								</DialogHeader>
// 								<div className="grid gap-4 py-2">
// 									<div className="grid gap-2">
// 										<Label htmlFor="username">Username</Label>
// 										<Input
// 											id="username"
// 											value={nameDraft}
// 											onChange={(e) => setNameDraft(e.target.value)}
// 											placeholder="New username"
// 										/>
// 									</div>
// 								</div>
// 								<DialogFooter>
// 									<Button
// 										onClick={() => onUsernameChange(nameDraft)}
// 										disabled={!nameDraft || nameDraft === user.username}
// 									>
// 										Save
// 									</Button>
// 								</DialogFooter>
// 							</DialogContent>
// 						</Dialog>
// 					</div>
// 				</CardContent>
// 			</Card>

// 			{/* Reset Password */}
// 			<Card className="border-sky-100 bg-sky-50/70">
// 				<CardContent className="p-4 sm:p-6">
// 					<div className="flex items-center justify-between gap-4">
// 						<div>
// 							<h3 className="text-base font-semibold text-slate-900">
// 								Reset password
// 							</h3>
// 							<p className="text-sm text-slate-600">
// 								Send a reset link to your email.
// 							</p>
// 						</div>
// 						<Dialog>
// 							<DialogTrigger asChild>
// 								<Button size="sm" variant="outline">
// 									Reset
// 								</Button>
// 							</DialogTrigger>
// 							<DialogContent>
// 								<DialogHeader>
// 									<DialogTitle>Send password reset link?</DialogTitle>
// 									<DialogDescription>
// 										A secure link will be emailed to {user.email} to reset your
// 										password.
// 									</DialogDescription>
// 								</DialogHeader>
// 								<DialogFooter>
// 									<Button onClick={onResetPassword}>Send link</Button>
// 								</DialogFooter>
// 							</DialogContent>
// 						</Dialog>
// 					</div>
// 				</CardContent>
// 			</Card>

// 			{/* Delete Account */}
// 			<Card className="border-red-200 bg-red-50/80">
// 				<CardContent className="p-4 sm:p-6">
// 					<div className="flex items-center justify-between gap-4">
// 						<div>
// 							<h3 className="text-base font-semibold text-red-900">
// 								Delete account
// 							</h3>
// 							<p className="text-sm text-red-700">
// 								This action is permanent and cannot be undone.
// 							</p>
// 						</div>
// 						<Dialog>
// 							<DialogTrigger asChild>
// 								<Button size="sm" variant="destructive">
// 									Delete
// 								</Button>
// 							</DialogTrigger>
// 							<DialogContent>
// 								<DialogHeader>
// 									<DialogTitle>Confirm delete account</DialogTitle>
// 									<DialogDescription>
// 										Type <span className="font-mono font-semibold">DELETE</span>{" "}
// 										to confirm.
// 									</DialogDescription>
// 								</DialogHeader>
// 								<DeleteConfirm onConfirm={onDeleteAccount} />
// 							</DialogContent>
// 						</Dialog>
// 					</div>
// 				</CardContent>
// 			</Card>

// 			{/* Logout */}
// 			<Card className="border-sky-100 bg-sky-50/70">
// 				<CardContent className="p-4 sm:p-6">
// 					<div className="flex items-center justify-between gap-4">
// 						<div>
// 							<h3 className="text-base font-semibold text-slate-900">Logout</h3>
// 							<p className="text-sm text-slate-600">
// 								Sign out from this device.
// 							</p>
// 						</div>
// 						<Dialog>
// 							<DialogTrigger asChild>
// 								<Button size="sm" variant="secondary" className="gap-2">
// 									<LogOut className="h-4 w-4" /> Logout
// 								</Button>
// 							</DialogTrigger>
// 							<DialogContent>
// 								<DialogHeader>
// 									<DialogTitle>Sign out?</DialogTitle>
// 									<DialogDescription>
// 										You can sign back in anytime.
// 									</DialogDescription>
// 								</DialogHeader>
// 								<DialogFooter>
// 									<Button onClick={onLogout}>Sign out</Button>
// 								</DialogFooter>
// 							</DialogContent>
// 						</Dialog>
// 					</div>
// 				</CardContent>
// 			</Card>
// 		</div>
// 	);
// }

// function DeleteConfirm({ onConfirm }: { onConfirm: () => void }) {
// 	const [text, setText] = useState("");
// 	const canDelete = text.trim().toUpperCase() === "DELETE";
// 	return (
// 		<div className="space-y-4">
// 			<Input
// 				value={text}
// 				onChange={(e) => setText(e.target.value)}
// 				placeholder="Type DELETE"
// 			/>
// 			<DialogFooter>
// 				<Button variant="destructive" disabled={!canDelete} onClick={onConfirm}>
// 					Permanently delete
// 				</Button>
// 			</DialogFooter>
// 		</div>
// 	);
// }

// // ---------- Page ----------
// export default function ProfilePage() {
// 	// Mock user; replace with real data from your API/state
// 	const [user, setUser] = useState<User>({
// 		id: "u_123",
// 		username: "Kedar_",
// 		email: "kedar123@test.io",
// 		avatarUrl: "/avatars/placeholder.svg",
// 	});

// 	const [openSheet, setOpenSheet] = useState(false);

// 	return (
// 		<div className="min-h-dvh bg-slate-50">
// 			{/* Top bar */}
// 			<Navbar onOpenSidebar={() => setOpenSheet(true)} />

// 			{/* Mobile sidebar via Sheet */}
// 			<Sheet open={openSheet} onOpenChange={setOpenSheet}>
// 				<SheetContent side="left" className="p-0">
// 					<SheetHeader className="p-4">
// 						<SheetTitle>Menu</SheetTitle>
// 					</SheetHeader>
// 					<div className="px-2 pb-4">
// 						<Sidebar />
// 					</div>
// 				</SheetContent>
// 			</Sheet>

// 			{/* Body */}
// 			<div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-4 px-3 pb-8 pt-4 sm:px-4 sm:pt-6 md:grid-cols-[56px_1fr]">
// 				{/* Static sidebar for >= sm */}
// 				<Sidebar />

// 				<main className="space-y-4 sm:space-y-6">
// 					<ProfileCard user={user} />
// 					<AccountActions
// 						user={user}
// 						onUsernameChange={(newName) =>
// 							setUser((u) => ({ ...u, username: newName }))
// 						}
// 						onResetPassword={() => console.log("reset password ->", user.email)}
// 						onDeleteAccount={() => console.log("delete account ->", user.id)}
// 						onLogout={() => console.log("logout clicked")}
// 					/>
// 				</main>
// 			</div>
// 		</div>
// 	);
// }
