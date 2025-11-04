// "use client";
// import React from "react";
// import {
//   Sheet,
//   SheetContent,
//   // SheetDescription,
//   SheetHeader,
//   // SheetTitle,
//   SheetClose,
//   SheetTrigger,
//   // SheetFooter,
// } from "@/components/ui/sheet";
// import { MessageCircle } from "lucide-react";
// // import Link from "next/link";
// // import { buttonVariants } from "../ui/button";
// // import { cn } from "@/lib/utils";
// import { useRouter, usePathname } from "next/navigation";

// // interface Props {}

// const MobileSidebar = () => {
//   const router = useRouter();
//   const path = usePathname();

//   const links = [
//     { href: "/", text: "Home" },
//     { href: "/contact", text: "Contact" },
//   ];

//   const isActiveLink = (href: string) => path === href;

//   return (
//     <Sheet>
//       <SheetTrigger>
//         <div className="relative cursor-pointer p-2 rounded-lg group">
//           <div className="rounded-lg w-6 h-[0.10rem] bg-gray-400 group-hover:bg-gray-600 mb-1"></div>
//           <div className="rounded-lg w-6 h-[0.10rem] bg-gray-400 group-hover:bg-gray-600 mb-1"></div>
//           <div className="rounded-lg w-6 h-[0.10rem] bg-gray-400 group-hover:bg-gray-600"></div>
//         </div>
//       </SheetTrigger>
//       <SheetContent side="right">
//         <SheetHeader>
//           <SheetClose asChild>
//             <div className="space-y-4 mx-8 my-6 flex flex-col">
//               {links.map((link, index) => (
//                 <div
//                   key={index}
//                   className={`mx-2 cursor-pointer hover:bg-green-200 hover:rounded-md hover:font-bold ${
//                     isActiveLink(link.href)
//                       ? "bg-green-200 rounded-md p-2 font-bold "
//                       : "text-black p-2"
//                   }`}
//                   onClick={() => router.push(link.href)}
//                 >
//                   {link.text}
//                 </div>
//               ))}
//             </div>
//           </SheetClose>
//         </SheetHeader>
//       </SheetContent>
//     </Sheet>
//   );
// };

// export default MobileSidebar;
"use client"
import {
  Sheet,
  SheetContent,
  // SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetClose,
  SheetTrigger,
  SheetFooter,
  // SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";
import Link from "next/link";
import { type NavItems } from "@/types/NavItem";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

type MobileSidebarProps = {
  navItems: NavItems;
};


const MobileSidebar = ({ navItems }: MobileSidebarProps) => {
  const pathname = usePathname();

  return (
    <div className="md:hidden">
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Open navigation menu" className="cursor-pointer">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[88vw] sm:w-96">
        <SheetHeader>
          <SheetTitle className="text-left">Menu</SheetTitle>
        </SheetHeader>

        <nav className="mt-4 flex flex-col gap-1 px-2">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Button
                key={href}
                asChild
                variant={active ? "secondary" : "ghost"}
                className={cn(
                  "justify-start",
                  active && "bg-green-200 font-semibold hover:bg-green-300 font-bold"
                )}
              >
                <Link href={href} aria-current={active ? "page" : undefined}>
                  {Icon ? <Icon className="mr-3 h-4 w-4" /> : null}
                  {label}
                </Link>
              </Button>
            );
          })}
        </nav>
      </SheetContent>
    </Sheet>
    </div>
  )
}

export default MobileSidebar