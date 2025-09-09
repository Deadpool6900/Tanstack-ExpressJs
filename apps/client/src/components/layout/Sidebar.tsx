import { ArchiveX, File, Inbox, Send, Trash2 } from "lucide-react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "@/components/ui/sidebar";
import logo from "@/templet logo.svg";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import type { authResponse } from "@repo/types/responses";

const data = {
	navMain: [
		{
			title: "Inbox",
			url: "#",
			icon: Inbox,
			isActive: true,
		},
		{
			title: "Drafts",
			url: "#",
			icon: File,
			isActive: false,
		},
		{
			title: "Sent",
			url: "#",
			icon: Send,
			isActive: false,
		},
		{
			title: "Junk",
			url: "#",
			icon: ArchiveX,
			isActive: false,
		},
		{
			title: "Trash",
			url: "#",
			icon: Trash2,
			isActive: false,
		},
	],
};

export function AppSidebar({ userdata }: { userdata: authResponse["user"] }) {
	const user = userdata;

	// Note: I'm using state to show active item.
	// IRL you should use the url/router.
	const [activeItem, setActiveItem] = useState(data.navMain[0]);
	const { setOpen } = useSidebar();

	return (
		<Sidebar collapsible="none" className="w-12 border border-r-border  ">
			<SidebarHeader className="w-full h-12 border-b border-b-border">
				<SidebarMenu>
					<SidebarMenuButton
						size="lg"
						asChild
						className="h-8 p-0 flex items-center justify-center "
					>
						<Link to="/home">
							<div className=" flex aspect-square size-6 items-center justify-center  ">
								<img src={logo} alt="logo" />
							</div>
						</Link>
					</SidebarMenuButton>
				</SidebarMenu>
			</SidebarHeader>
			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupContent>
						<SidebarMenu>
							{data.navMain.map((item) => (
								<SidebarMenuItem key={item.title}>
									<SidebarMenuButton
										tooltip={{
											children: item.title,
											hidden: false,
										}}
										onClick={() => {
											setActiveItem(item);
											setOpen(true);
										}}
										isActive={activeItem?.title === item.title}
										className="px-2"
									>
										<item.icon />
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>
			<SidebarFooter className="mb-4 hover:bg-foreground/10 rounded-full flex items-center justify-center transition ">
				<Link to="/home/profile">
					<Avatar className="cursor-pointer ">
						{user?.pfpUrl ? (
							<AvatarImage src={user.pfpUrl} alt={user.username} />
						) : (
							<AvatarFallback className="bg-foreground/15">
								{user?.username && user?.username
									.split(" ")
									.map((n) => n[0])
									.join("")
									.toUpperCase()}
							</AvatarFallback>
						)}
					</Avatar>
				</Link>
			</SidebarFooter>
		</Sidebar>
	);
}
