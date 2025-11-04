// "use client";
// import { cn } from "@/lib/utils";
// import Link from "next/link";
// import { pacifico } from "@/app/fonts";
// import { buttonVariants } from "../ui/button";
// import MessagesSidebar from "./MessagesSidebar";
// import { usePathname, useRouter } from "next/navigation";
// import Wrapper from "../ui/wrapper";
// import MobileSidebar from "./MobileSidebar";

// // interface Props {}

// const Navbar = () => {
//     const router = useRouter();
//     const path = usePathname();

//     const isActiveLink = (href: string) => path === href;

//     const links = [
//         { href: "/", text: "Home" },
//         { href: "/contact", text: "Contact" },
//     ];

//     return (
//         <div className="bg-white sticky z-50 h-16">
//             <header className="relative bg-white">
//                 <div className="border-b border-gray-200">
//                     <Wrapper>
//                         <div className="flex h-16 items-center justify-center">
//                             {/* mobile style */}
//                             <div className="w-full flex flex-row justify-start items-center">
//                                 {/* <div className="flex flex-row justify-center items-center md:hidden">
//                                     <MobileSidebar />
//                                 </div> */}
//                                 <div>
//                                     <Link href="/" className="text-center">
//                                         <h1
//                                             className={cn(
//                                                 " text-green-700 text-xl text-center md:text-2xl",
//                                                 pacifico.className
//                                             )}
//                                         >
//                                             TENNIS-NET
//                                         </h1>
//                                     </Link>
//                                 </div>
//                             </div>
//                             <div className="md:w-full md:flex md:flex-row md:justify-end md:items-center md:mx-10 hidden">
//                                 {links.map((link, index) => (
//                                     <div
//                                         key={index}
//                                         className={`w-20 mx-2 text-center cursor-pointer hover:bg-green-200 hover:rounded-md hover:font-bold ${isActiveLink(link.href)
//                                             ? "bg-green-200 rounded-md p-2 font-bold"
//                                             : "text-black p-2"
//                                             }`}
//                                         onClick={() => router.push(link.href)}
//                                     >
//                                         {link.text}
//                                     </div>
//                                 ))}
//                             </div>
//                             {/* <div>
//               <UserNavbar />
//             </div> */}
//                             <div className="flex flex-row justify-center items-center">
//                                 <div className="hidden md:flex md:justify-center md:items-center">
//                                     <Link
//                                         href="/authentication/login"
//                                         className={cn(
//                                             "flex text-2xl mr-4",
//                                             buttonVariants()
//                                         )}
//                                     >
//                                         Login
//                                     </Link>
//                                     <span
//                                         className="hidden md:flex h-6 w-px bg-gray-200"
//                                         aria-hidden="true"
//                                     />
//                                 </div>
//                                 <MessagesSidebar />
//                                 <MobileSidebar />
//                             </div>
//                         </div>
//                     </Wrapper>
//                 </div>
//             </header>
//         </div>
//     );
// };

// export default Navbar;
// "use client"
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Menu, LogIn, Home, Calendar, MapPin, Info, DollarSign } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
// import { Separator } from "@/components/ui/separator";
// import { cn } from "@/lib/utils";
// import { pacifico } from "@/app/fonts";
// import Wrapper from "../ui/wrapper";

/**
 * Mobile-first navbar for NOT-LOGGED-IN users.
 *
 * Design goals
 * - Logo on the left
 * - On the right: a subtle "Log in" and a hamburger that opens a drawer
 * - Drawer lists main navigation + strong CTA "Create account"
 * - No Messages/Notifications shown for guests
 */

// export default function MobileNavbarGuest() {
//     const pathname = usePathname();

//     const nav = [
//         { href: "/", label: "Home", icon: Home },
//         { href: "/courts", label: "Courts", icon: MapPin },
//         { href: "/events", label: "Events", icon: Calendar },
//         { href: "/pricing", label: "Pricing", icon: DollarSign },
//         { href: "/about", label: "About", icon: Info },
//     ];

//     return (
//         <header className="bg-white sticky z-50 h-16 fixed top-0 inset-x-0 z-50 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//             <div className="mx-auto max-w-screen-xl px-3 sm:px-4">
//                 <Wrapper>
//                     <div className="flex h-14 items-center justify-between">
//                         <Link href="/" className="text-center">
//                             <h1
//                                 className={cn(
//                                     " text-green-700 text-xl text-center md:text-2xl",
//                                     pacifico.className
//                                 )}
//                             >
//                                 TENNIS NET
//                             </h1>
//                         </Link>

//                         {/* Right: Log in + Hamburger */}
//                         <div className="flex flex-row items-center  gap-1">
//                             <div>
//                                 <Button asChild variant="ghost" size="lg" className="px-2">
//                                     <Link href="/login" aria-label="Log in">
//                                         <LogIn className="h-4 w-4" />
//                                         <span className="sr-only sm:not-sr-only sm:whitespace-nowrap sm:text-md">Log in</span>
//                                     </Link>
//                                 </Button>
//                             </div>
//                             <div className="mx-1 bg-black text-black">
//                                 <Separator orientation="vertical" />
//                             </div>
//                             <Sheet>
//                                 <SheetTrigger asChild>
//                                     <Button variant="ghost" size="icon" aria-label="Open navigation menu">
//                                         <Menu className="h-8 w-20" />
//                                     </Button>
//                                 </SheetTrigger>
//                                 <SheetContent side="right" className="w-[88vw] sm:w-96">
//                                     <SheetHeader>
//                                         <SheetTitle className="text-left">Menu</SheetTitle>
//                                     </SheetHeader>

//                                     <nav className="mt-4 flex flex-col gap-1">
//                                         {nav.map(({ href, label, icon: Icon }) => {
//                                             const active = pathname === href;
//                                             return (
//                                                 <Button
//                                                     key={href}
//                                                     asChild
//                                                     variant={active ? "secondary" : "ghost"}
//                                                     className="justify-start"
//                                                 >
//                                                     <Link href={href} aria-current={active ? "page" : undefined}>
//                                                         <Icon className="mr-3 h-4 w-4" />
//                                                         {label}
//                                                     </Link>
//                                                 </Button>
//                                             );
//                                         })}
//                                     </nav>


//                                     {/* Auth actions for guests */}
//                                     {/* <div className="grid gap-2">
//                                     <Button asChild size="lg">
//                                         <Link href="/signup">Create account</Link>
//                                     </Button>
//                                     <Button asChild variant="outline" size="lg">
//                                         <Link href="/login">Log in</Link>
//                                     </Button>
//                                 </div> */}
//                                 </SheetContent>
//                             </Sheet>
//                         </div>
//                     </div>
//                 </Wrapper>
//             </div>
//         </header>
//     );
// }
// "use client"
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { Menu, LogIn, Home, Calendar, MapPin, Info, DollarSign, MessageSquare } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
// import { Separator } from "@/components/ui/separator";

/**
 * Mobile-first navbar for NOT-LOGGED-IN users.
 * Now with a Messages icon that shows a badge count (e.g., 0) and routes to login.
 *
 * Behavior (guest): tapping Messages takes the user to /login?next=/messages
 */

// export default function MobileNavbarGuest({ msgCount = 0 }: { msgCount?: number }) {
//   const pathname = usePathname();

//   const nav = [
//     { href: "/", label: "Home", icon: Home },
//     { href: "/courts", label: "Courts", icon: MapPin },
//     { href: "/events", label: "Events", icon: Calendar },
//     { href: "/pricing", label: "Pricing", icon: DollarSign },
//     { href: "/about", label: "About", icon: Info },
//   ];

//   return (
//     <header className="fixed top-0 inset-x-0 z-50 h-16 border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//       <div className="mx-auto max-w-screen-xl px-3 sm:px-4">
//         <div className="flex h-14 items-center justify-between">
//           {/* Left: Logo */}
//           <Link href="/" className="flex items-center gap-2" aria-label="Tennis Net Club home">
//             <div className="h-7 w-7 rounded-full bg-primary" />
//             <span className="font-semibold tracking-tight">TENNIS NET</span>
//           </Link>

//           {/* Right: Log in + Messages + Hamburger */}
//           <div className="flex items-center gap-1">
//             {/* Log in */}
//             <Button asChild variant="ghost" size="sm" className="px-2">
//               <Link href="/login" aria-label="Log in">
//                 <LogIn className="h-4 w-4" />
//                 <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Log in</span>
//               </Link>
//             </Button>

//             <div className="mx-1">
//               <Separator orientation="vertical" />
//             </div>

//             {/* Messages (guest-visible, routes to login with redirect) */}
//             <Button asChild variant="ghost" size="icon" className="relative" aria-label="Open messages (login required)">
//               <Link href={{ pathname: "/login", query: { next: "/messages" } }}>
//                 <MessageSquare className="h-5 w-5" />
//                 <span
//                   aria-hidden
//                   className="absolute -top-1 -right-1 grid h-4 min-w-4 place-items-center rounded-full border bg-primary px-1 text-[10px] font-medium text-primary-foreground"
//                 >
//                   {msgCount}
//                 </span>
//               </Link>
//             </Button>

//             {/* Hamburger / Drawer */}
//             <Sheet>
//               <SheetTrigger asChild>
//                 <Button variant="ghost" size="icon" aria-label="Open navigation menu">
//                   <Menu className="h-5 w-5" />
//                 </Button>
//               </SheetTrigger>
//               <SheetContent side="right" className="w-[88vw] sm:w-96">
//                 <SheetHeader>
//                   <SheetTitle className="text-left">Menu</SheetTitle>
//                 </SheetHeader>

//                 <nav className="mt-4 flex flex-col gap-1">
//                   {nav.map(({ href, label, icon: Icon }) => {
//                     const active = pathname === href;
//                     return (
//                       <Button
//                         key={href}
//                         asChild
//                         variant={active ? "secondary" : "ghost"}
//                         className="justify-start"
//                       >
//                         <Link href={href} aria-current={active ? "page" : undefined}>
//                           <Icon className="mr-3 h-4 w-4" />
//                           {label}
//                         </Link>
//                       </Button>
//                     );
//                   })}
//                 </nav>
//               </SheetContent>
//             </Sheet>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// }
"use client";
import { usePathname } from "next/navigation";
import { Menu, LogIn, Home, Calendar, MapPin, Info, DollarSign, MessageSquare } from "lucide-react";
import Logo from "../ui/logo";
import Wrapper from "../ui/wrapper";
import GuestNavbar from "./GuestNavbar";
import UserNavbar from "./UserNavbar";
import { NavItems } from "@/types/NavItem";

export default function ClientNavbar() {

    const navItems: NavItems = [
        { href: "/", label: "Home", icon: Home },
        { href: "/courts", label: "Courts", icon: MapPin },
        { href: "/pricing", label: "Pricing", icon: DollarSign },
        { href: "/events", label: "Events", icon: Calendar },
        { href: "/about", label: "About", icon: Info },
    ];

    const pathname = usePathname();

    const isLoggedin = pathname === "/user";

    return <nav className="w-full bg-white sticky z-50 h-16">
        <Wrapper className="px-5 flex flex-row justify-between items-center h-14 border-b border-gray-300">
            <div>
                <Logo />
            </div>
            <div>
                {!isLoggedin ? <GuestNavbar navItems={navItems} /> : <UserNavbar />}
            </div>
        </Wrapper>
    </nav>;
}