// import ConversationsLeftSide from "@/components/Chat/ConversationsLeftSide";
// import ChatRightSide from "@/components/Chat/ChatRightSide";

// export default function ConversationsPage() {
//     return (
//         <div className="flex h-full">
//             {/* LEFT: always visible */}
//             <aside className="w-full md:w-[380px] md:shrink-0 md:border-r md:border-border/60 md:pr-4 md:overflow-y-auto">
//                 <ConversationsLeftSide />
//             </aside>

//             {/* RIGHT: desktop only */}
//             <section className="hidden md:block flex-1 min-w-0 md:pl-6 md:overflow-y-auto">
//                 <ChatRightSide />
//             </section>
//         </div>
//     );
// }

"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import ConversationsLeftSide from "@/components/Chat/ConversationsLeftSide";
import { cn } from "@/lib/utils";

export default function ConversationsLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname();
    const isDetail = pathname.startsWith("/chat/conversations/"); // /chat/conversations/[id]

    return (
        <div className="h-full md:flex">
            {/* LEFT: Always visible on desktop. Visible on mobile only on index route. */}
            <aside
                className={cn(
                    "md:block md:w-[380px] md:shrink-0 md:border-r md:border-border/60 md:pr-4 md:overflow-y-auto",
                    isDetail ? "hidden md:block" : "block" // mobile: hide left on detail, show on index
                )}
            >
                <ConversationsLeftSide />
            </aside>

            {/* RIGHT: Desktop split pane. Mobile full screen for detail route only */}
            <section
                className={cn(
                    "flex-1 min-w-0",
                    "md:block md:pl-6 md:overflow-y-auto",
                    isDetail ? "block" : "hidden md:block" // mobile: hide right on index, show on detail
                )}
            >
                {children}
            </section>
        </div>
    );
}
