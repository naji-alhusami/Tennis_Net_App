"use client"
import { use, useState } from 'react'
import { useRouter, useSearchParams } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import axios from 'axios'

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
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const hasRequiredParams = requiredSearchParams.every((key) => !!spHook.get(key))

  const isDisabled = (variant === "back" && currentStep === 0) ||
    ((variant === "next" || variant === "book") && !hasRequiredParams)

  const onGo = async () => {
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
      console.log("Click Book")
      try {
        setIsLoading(true)

        const courtType = spHook.get("courtType")
        const courtLocation = spHook.get("courtLocation")
        const date = spHook.get("date")
        const time = spHook.get("time")
        const players = spHook.getAll("players")

        const response = await axios.post("/api/reservations", {
          courtType,
          courtLocation,
          date,
          time,
          players,
          durationMinutes: 60,
        })

      } catch (error) {
        let message = "Something went wrong. Please try again.";

        if (axios.isAxiosError(error)) {
          const data = error.response?.data as { error?: string };
          if (data?.error) {
            message = data.error;
          }
        }
      } finally {
        setIsLoading(false);
      }
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