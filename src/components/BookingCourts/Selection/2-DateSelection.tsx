"use client"

import { useMemo } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Calendar } from "@/components/ui/calendar"

function startOfToday() {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
}

function parseLocalDate(iso: string | null) {
    if (!iso) return undefined
    const [y, m, d] = iso.split("-").map(Number)
    if (!y || !m || !d) return undefined
    return new Date(y, m - 1, d) // local date (no timezone shift)
}

function toISODate(d: Date) {
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")
    return `${y}-${m}-${day}`
}

export default function DateSelection() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    // ✅ current date comes from URL
    const selectedDate = useMemo(() => parseLocalDate(searchParams.get("date")), [searchParams])

    const onSelect = (d?: Date) => {
        const params = new URLSearchParams(searchParams.toString())
        if (d) params.set("date", toISODate(d))
        else params.delete("date")

        router.replace(`${pathname}?${params.toString()}`)
    }

    return (
        <div className="flex justify-center">
            <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={onSelect}
                disabled={{ before: startOfToday() }}
                className="rounded-xl bg-white p-3"
                buttonVariant="outline"
            />
        </div>
    )
}
