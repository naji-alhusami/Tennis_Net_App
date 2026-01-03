// "use client";
// import { usePathname } from "next/navigation";
// import { Menu, LogIn, Home, Calendar, MapPin, Info, DollarSign, MessageSquare } from "lucide-react";

// import Logo from "../ui/logo";
// import Wrapper from "../ui/wrapper";
// import GuestNavbar from "./GuestNavbar";
// import UserNavbar from "./UserNavbar";
// import { type NavItems } from "@/lib/types/NavItems";

// export default function ClientNavbar() {

//     const navItems: NavItems = [
//         { href: "/", label: "Home", icon: Home },
//         { href: "/courts", label: "Courts", icon: MapPin },
//         { href: "/pricing", label: "Pricing", icon: DollarSign },
//         // { href: "/events", label: "Events", icon: Calendar },
//         { href: "/about", label: "About", icon: Info },
//     ];

//     const pathname = usePathname();

//     const isLoggedin = pathname === "/user" || pathname === "/auth/role" || pathname === '/player' || pathname === '/coach';

//     return <nav className="w-full bg-white sticky z-50">
//         <Wrapper className="flex flex-row justify-between items-center h-18 border-b border-gray-300">
//             <div>
//                 <Logo />
//             </div>
//             <div>
//                 {!isLoggedin ? <GuestNavbar navItems={navItems} /> : <UserNavbar navItems={navItems} />}
//             </div>
//         </Wrapper>
//     </nav>;
// }

"use client";

import { useSession } from "next-auth/react";
import { Home, Calendar, MapPin, Info, DollarSign, MessageSquare, Users, CalendarCheck } from "lucide-react";

import Logo from "../ui/logo";
import Wrapper from "../ui/wrapper";
import GuestNavbar from "./GuestNavbar";
import UserNavbar from "./UserNavbar";
import { type NavItems } from "@/lib/types/NavItems";

export default function Navbar() {
    const { data: session, status } = useSession();
    console.log("data:", session)

    const role = session?.user?.role as "PLAYER" | "COACH" | undefined;
    console.log("role:", role)
    const publicNavItems: NavItems = [
        { href: "/", label: "Home", icon: Home },
        { href: "/courts", label: "Courts", icon: MapPin },
        { href: "/pricing", label: "Pricing", icon: DollarSign },
        { href: "/about", label: "About", icon: Info },
    ];

    const playerNavItems: NavItems = [
        { href: "/player", label: "Dashboard", icon: Home },
        { href: "/booking/court", label: "Book Court", icon: Calendar },
        { href: "/player/coaches", label: "Find Couch", icon: MapPin },
        { href: "/player/partners", label: "Find Partner", icon: Users },
        // { href: "/player/messages", label: "Messages", icon: MessageSquare },
    ];

    const coachNavItems: NavItems = [
        { href: "/coach", label: "Dashboard", icon: Home },
        { href: "/coach/schedule", label: "Schedule", icon: Calendar },
        { href: "/coach/bookings", label: "Bookings", icon: CalendarCheck },
        { href: "/coach/players", label: "Players", icon: Users },
        { href: "/coach/messages", label: "Messages", icon: MessageSquare },
    ];

    let content;
    if (!session || !role) {
        content = <GuestNavbar navItems={publicNavItems} />;
    } else if (session && role === "PLAYER") {

        content = <UserNavbar navItems={playerNavItems} />;
    } else if (session && role === "COACH") {
        content = <UserNavbar navItems={coachNavItems} />;
    }

    return (
        <nav className="w-full bg-white sticky z-50">
            <Wrapper className="flex flex-row justify-between items-center h-18 border-b border-gray-300">
                <Logo />
                {content}
            </Wrapper>
        </nav>
    );
}
