"use client"
import { use, useState } from 'react'
import { useRouter, useSearchParams } from "next/navigation"
import axios from 'axios'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Spinner } from '@/components/ui/spinner'

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

  // In each step we check :Does this parameter exist and have a value? using this, !! convert the const to boolean
  const hasRequiredParams = requiredSearchParams.every((key) => !!spHook.get(key))

  const isDisabled = isLoading || (variant === "back" && currentStep === 0) ||
    ((variant === "next" || variant === "book") && !hasRequiredParams)


  const onGo = async () => {
    if (isDisabled) return

    const sp = new URLSearchParams(spHook.toString())
    sp.set("__dir", variant === "next" ? "1" : "-1")

    if (variant === "back") {
      if (step === "date" && filters.date) sp.delete("date")
      if (step === "time" && filters.time) sp.delete("time")
      if (step === "players" && filters.players) sp.delete("players")

      router.push(`${to}?${sp.toString()}`)
      return
    }

    if (variant === "next") {
      router.push(`${to}?${sp.toString()}`)
      return
    }

    if (variant === "book") {
      try {
        setIsLoading(true)

        await axios.post("/api/reservations", {
          courtType: spHook.get("courtType"),
          courtLocation: spHook.get("courtLocation"),
          date: spHook.get("date"),
          time: spHook.get("time"),
          players: spHook.getAll("players"),
          durationMinutes: 60,
        })

        router.push("/booking/success")
      } catch (error) {
        let message = "Something went wrong. Please try again."

        if (axios.isAxiosError(error)) {
          message = error.response?.data?.error ?? message
        }

        alert(message)
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <Button
      type="button"
      onClick={onGo}
      disabled={isDisabled || isLoading}
      className={cn(
        "w-full font-bold rounded-xl transition",
        (variant === "next" || variant === "book") &&
        "bg-green-600 hover:bg-green-700 text-white cursor-pointer",
        variant === "back" &&
        "bg-gray-600 hover:bg-gray-900 text-white cursor-pointer",
        (isDisabled || isLoading) && "opacity-70 cursor-not-allowed",
        className
      )}
    >
      {isLoading ? (
        <span className="flex items-center justify-center gap-2">
          <Spinner />
          <span>Please wait...</span>
        </span>
      ) : (
        label
      )}
    </Button>
  )
}