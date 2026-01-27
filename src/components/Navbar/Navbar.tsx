"use client";
import { useSession } from "next-auth/react";
import { Home, Calendar, MapPin, Info, DollarSign, MessageSquare, Users, CalendarCheck, CircleGauge } from "lucide-react";

import Logo from "../ui/logo";
import Wrapper from "../ui/wrapper";
import GuestNavbar from "./GuestNavbar";
import UserNavbar from "./UserNavbar";
import { type NavItems } from "@/lib/types/NavItems";

export default function Navbar() {
    const { status, data: session } = useSession();

    const role = session?.user?.role as "PLAYER" | "COACH" | undefined;

    const publicNavItems: NavItems = [
        { href: "/", label: "Home", icon: Home },
        { href: "/courts", label: "Courts", icon: MapPin },
        { href: "/pricing", label: "Pricing", icon: DollarSign },
        { href: "/about", label: "About", icon: Info },
    ];

    const noRoleNavItems: NavItems = [
        { href: "/", label: "Home", icon: Home },
        { href: "/dashboard", label: "Dashboard", icon: CircleGauge },
        { href: "/profile", label: "Complete Profile", icon: Info },
    ];

    const playerNavItems: NavItems = [
        { href: "/", label: "Home", icon: Home },
        { href: "/dashboard", label: "Dashboard", icon: CircleGauge },
        { href: "/player/booking/court", label: "Book Court", icon: Calendar },
        { href: "/player/coaches", label: "Find Couch", icon: MapPin },
        { href: "/player/partners", label: "Find Partner", icon: Users },
        { href: "/player/messages", label: "Messages", icon: MessageSquare },
    ];

    const coachNavItems: NavItems = [
        { href: "/", label: "Dashboard", icon: Home },
        { href: "/dashboard", label: "Dashboard", icon: CircleGauge },
        { href: "/coach/schedule", label: "Schedule", icon: Calendar },
        { href: "/coach/bookings", label: "Bookings", icon: CalendarCheck },
        { href: "/coach/players", label: "Players", icon: Users },
        { href: "/coach/messages", label: "Messages", icon: MessageSquare },
    ];

    if (status === "loading") {
        return (
            <nav className="w-full bg-white sticky z-50">
                <Wrapper className="flex flex-row justify-between items-center h-18 border-b border-gray-300">
                    <Logo />
                    <div className="h-9 w-40" />
                </Wrapper>
            </nav>
        );
    }

    let content;

    if (!session) {
        content = <GuestNavbar navItems={publicNavItems} />;
    } else if (!role) {
        content = <UserNavbar navItems={noRoleNavItems} />;
    } else if (role === "PLAYER") {
        content = <UserNavbar navItems={playerNavItems} />;
    } else if (role === "COACH") {
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
