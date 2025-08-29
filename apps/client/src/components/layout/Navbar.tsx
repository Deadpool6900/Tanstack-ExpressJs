import { Button } from "../ui/button";
import { Share } from "lucide-react";
import { ModeToggle } from "../blocks/theme-provider";

export const Navbar = () => {
	return (
		<div className="flex items-center justify-between p-4 bg-sidebar text-foreground-muted border-b border-border h-12 top-0 right-0 w-full">
			<div className="text-md font-semibold ">TanStack templet</div>
			<div className="space-x-4">
				<Button variant={"outline"} className="h-8">
                    <Share/>
                    share
                </Button>
                <ModeToggle/>
			</div>
		</div>
	);
};
