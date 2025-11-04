import Link from "next/link";
import { LogIn } from "lucide-react";
import { type NavItems } from "@/types/NavItem";
import MobileSidebar from "./MobileSidebar";

type GuestNavbarProps = {
    navItems: NavItems;
};


const GuestNavbar = ({ navItems }: GuestNavbarProps) => {
    console.log(navItems)
    return (
        <div>
            <div className="flex items-center gap-1">
                <Link href="/login" aria-label="Log in" className="mx-5">
                    <LogIn className="h-5 w-5 text-gray-400 hover:text-green-600" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Log in</span>
                </Link>
                <MobileSidebar navItems={navItems} />
            </div>
        </div>
    )
}

export default GuestNavbar;