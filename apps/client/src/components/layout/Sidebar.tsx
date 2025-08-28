import { Home, LineChart, Settings, UserRound } from "lucide-react";
import { useMemo } from "react";
import { Button } from "../ui/button";
import logo from "@/templet logo.svg";
import { Avatar, AvatarImage } from "../ui/avatar";
export const Sidebar = () => {
	const items = useMemo(
		() => [
			{ icon: Home, label: "Home" },
			{ icon: UserRound, label: "Profile" },
			{ icon: LineChart, label: "Analytics" },
			{ icon: Settings, label: "Settings" },
		],
		[]
	);

	return (
		<aside className="sticky top-14 hidden h-screen w-12 shrink-0 flex-col items-center  border-r border-sidebar-border sm:flex">
			<div className="h-12 w-12  border border-sidebar-border flex items-center justify-center">
				<div className=" border border-sidebar-border rounded-sm ">
					<img src={logo} alt="Logo" className="h-5 w-5 m-1.5 " />
				</div>
			</div>
			<div className="flex flex-col space-y-4 pt-3">
				{items.map(({ icon: Icon, label }) => (
					<button
						key={label}
						className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
						aria-label={label}
					>
						<Icon className="h-5 w-5 text-foreground/80" strokeWidth={1.5} />
					</button>
				))}
			</div>
			<div className="mt-auto mb-4 cursor-pointer">
				<Avatar className="h-10 w-10 border border-sidebar-border">
					<AvatarImage
						src="https://i.redd.it/za03nj1evsc61.jpg"
						className="object-cover"
					/>
				</Avatar>
			</div>
		</aside>
	);
};
