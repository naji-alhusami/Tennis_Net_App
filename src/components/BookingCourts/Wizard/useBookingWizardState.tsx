// URL state, date, time
"use client"

import { useMemo } from "react"
import { useRouter, useSearchParams } from "next/navigation"

function parseLocalDate(iso: string | null) {
  if (!iso) return null
  const [y, m, d] = iso.split("-").map(Number)
  return new Date(y, m - 1, d)
}

export function useBookingWizardState() {
  const router = useRouter()
  const sp = useSearchParams()

  const selectedDate = useMemo(() => parseLocalDate(sp.get("date")) ?? new Date(), [sp])

  const selectedTime = sp.get("time") // string | null

  const setTime = (time: string) => {
    const params = new URLSearchParams(sp.toString())
    params.set("time", time)

    router.replace(`?${params.toString()}`)
  }

  return { sp, selectedDate, selectedTime, setTime }
}