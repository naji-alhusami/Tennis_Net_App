"use client"
import { useRouter, useSearchParams } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export function BookingNavButton({
    to,
    requiredSearchParams = [],
    label,
    variant = "next",
    className,
    disabled = false,
}: {
    to: string
    requiredSearchParams?: string[]
    label: string
    variant?: "next" | "back"
    className?: string
    disabled?: boolean
}) {
    const router = useRouter()
    const searchParams = useSearchParams()

    const canProceed = requiredSearchParams.every((key) => !!searchParams.get(key))
    const isDisabled = disabled || (variant === "next" && !canProceed)

    const onGo = () => {
        if (isDisabled) return
        router.push(`${to}?${searchParams.toString()}`)
    }

    return (
        <Button
            type="button"
            onClick={onGo}
            disabled={isDisabled}
            className={cn(
                "w-full font-bold rounded-xl",
                variant === "next" && "bg-green-600 hover:bg-green-700 text-white cursor-pointer",
                variant === "back" && "bg-white border text-gray-800 hover:bg-gray-50 cursor-pointer",
                isDisabled && "opacity-70 cursor-not-allowed",
                className
            )}
        >
            {label}
        </Button>
    )
}
