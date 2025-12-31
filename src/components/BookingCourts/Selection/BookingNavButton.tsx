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
  step
}: {
  to: string
  requiredSearchParams?: string[]
  label: string
  variant?: "next" | "back"
  className?: string
  disabled?: boolean
  step?: string
}) {
  console.log("step:", step)

  const router = useRouter()
  const spHook = useSearchParams()
  const canProceed = requiredSearchParams.every((key) => !!spHook.get(key))
  const isDisabled = disabled || (variant === "next" && !canProceed)

  const onGo = () => {
    if (isDisabled) return
    if (step === "confirm") {

    }
    const sp = new URLSearchParams(spHook.toString())
    sp.set("__dir", variant === "next" ? "1" : "-1")

    router.push(`${to}?${sp.toString()}`)
  }

  return (
    <Button
      type="button"
      onClick={onGo}
      disabled={isDisabled}
      className={cn(
        "w-full font-bold rounded-xl",
        variant === "next" && "bg-green-600 hover:bg-green-700 text-white cursor-pointer",
        variant === "back" && "bg-gray-600 border border-black border-1 text-white hover:bg-gray-900 cursor-pointer",
        isDisabled && "opacity-70 cursor-not-allowed",
        className
      )}
    >
      {label}
    </Button>
  )
}