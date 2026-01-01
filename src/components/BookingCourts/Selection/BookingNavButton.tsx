"use client"
import { use } from 'react'
import { useRouter, useSearchParams } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

type BookingNavButtonProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
  to: string
  requiredSearchParams?: string[]
  label: string
  variant?: "next" | "back" | "book"
  className?: string
  step: string
  currentStep: number
}

export function BookingNavButton({
  searchParams,
  to,
  requiredSearchParams = [],
  label,
  variant = "next",
  className,
  step,
  currentStep,
}: BookingNavButtonProps) {
  const router = useRouter()
  const filters = use(searchParams)
  const spHook = useSearchParams()

  const hasRequiredParams = requiredSearchParams.every((key) => !!spHook.get(key))

  const isDisabled = (variant === "back" && currentStep === 0) ||
    ((variant === "next" || variant === "book") && !hasRequiredParams)

  const onGo = () => {
    if (isDisabled) return

    const sp = new URLSearchParams(spHook.toString())
    sp.set("__dir", variant === "next" || variant === "book" ? "1" : "-1")

    if (variant === "back") {
      if (step === "date" && filters.date) sp.delete("date")
      if (step === "time" && filters.time) sp.delete("time")
      if (step === "players" && filters.players) sp.delete("players")
    }

    router.push(`${to}?${sp.toString()}`)

    if (variant === "book") {
      console.log("Here we should push data")
    }
  }

  return (
    <Button
      type="button"
      onClick={onGo}
      disabled={isDisabled}
      className={cn(
        "w-full font-bold rounded-xl",
        (variant === "next" || variant === "book") &&
        "bg-green-600 hover:bg-green-700 text-white cursor-pointer",
        variant === "back" &&
        "bg-gray-600 hover:bg-gray-900 text-white cursor-pointer",
        isDisabled && "opacity-70 cursor-not-allowed",
        className
      )}
    >
      {label}
    </Button>
  )
}