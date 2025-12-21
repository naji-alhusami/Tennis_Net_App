// "use client"

// import { useRouter, useSearchParams } from "next/navigation"
// import { Button } from "@/components/ui/button"
// import { cn } from "@/lib/utils"

// type Props = {
//     to: string                 // e.g. "/booking/time"
//     require?: string[]         // e.g. ["courtType", "date"]
//     label?: string             // default "NEXT"
// }

// export default function BookingNextButton({
//     to,
//     require = [],
//     label = "NEXT",
// }: Props) {
//     const router = useRouter()
//     const sp = useSearchParams()

//     const isReady = require.every((key) => {
//         const v = sp.get(key)
//         return typeof v === "string" && v.length > 0
//     })

//     const onNext = () => {
//         if (!isReady) return
//         router.push(`${to}?${sp.toString()}`)
//     }

//     return (
//         <Button
//             type="button"
//             onClick={onNext}
//             disabled={!isReady}
//             className={cn(
//                 "w-full bg-green-600 hover:bg-green-700 font-bold",
//                 !isReady && "opacity-70 cursor-not-allowed"
//             )}
//         >
//             {label}
//         </Button>
//     )
// }
// //  TODO: <BookingNextButton to="/booking/time" require={["courtType", "date"]} />
// //  TODO: <BookingNextButton to="/booking/players" require={["courtType", "date", "time"]} />
// //  TODO: <BookingNextButton to="/booking/confirm" require={["courtType", "date", "time", "players"]} />

"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function BookingNavButton({
    to,
    require = [],
    label,
    variant = "next",
    className,
}: {
    to: string
    require?: string[]
    label: string
    variant?: "next" | "back"
    className?: string
}) {
    const router = useRouter()
    const sp = useSearchParams()

    const ok = require.every((k) => !!sp.get(k))

    const onGo = () => {
        if (!ok && variant === "next") return
        router.push(`${to}?${sp.toString()}`)
    }

    return (
        <Button
            type="button"
            onClick={onGo}
            disabled={variant === "next" ? !ok : false}
            className={cn(
                "font-bold rounded-xl", // 👈 removed w-full
                variant === "next" && "bg-green-600 hover:bg-green-700 text-white",
                variant === "back" && "bg-white border text-gray-800 hover:bg-gray-50",
                variant === "next" && !ok && "opacity-70 cursor-not-allowed",
                className
            )}
        >
            {label}
        </Button>
    )
}