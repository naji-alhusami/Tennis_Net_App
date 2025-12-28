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
  const selectedTimes = sp.getAll("time")

  const toggleTime = (time: string) => {
    const params = new URLSearchParams(sp.toString())
    const current = new Set(params.getAll("time"))

    if (current.has(time)) {
      const next = [...current].filter((t) => t !== time)
      params.delete("time")
      next.forEach((t) => params.append("time", t))
    } else {
      params.append("time", time)
    }

    router.replace(`?${params.toString()}`)
  }

  return { sp, selectedDate, selectedTimes, toggleTime }
}
