"use client"

import { useMemo } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Calendar } from "@/components/ui/calendar"

// =========
//  HELPERS
// =========

// Returns today’s date without time
function startOfToday() {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
}

// Takes a date and Adds days to it
function addDays(date: Date, days: number) {
    const d = new Date(date)
    d.setDate(d.getDate() + days)
    return d
}

// Makes the date inclusive until the very last millisecond
function endOfDay(date: Date) {
    const d = new Date(date)
    d.setHours(23, 59, 59, 999)
    return d
}

// Converts "YYYY-MM-DD" (from URL) → Date
function parseLocalDate(iso: string | null) {
    if (!iso) return undefined
    const [y, m, d] = iso.split("-").map(Number)
    if (!y || !m || !d) return undefined
    return new Date(y, m - 1, d)
}

// Converts Date → "YYYY-MM-DD"
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

    const selectedDate = useMemo(
        () => parseLocalDate(searchParams.get("date")),
        [searchParams]
    )

    // Stores today at midnight
    const today = useMemo(() => startOfToday(), [])

    // Takes today, Adds 7 days and sets time to end of that day
    const maxDate = useMemo(() => endOfDay(addDays(today, 7)), [today])

    // This function runs when we click a day
    const onSelect = (date?: Date) => {
        const params = new URLSearchParams(searchParams.toString())

        if (date) params.set("date", toISODate(date))
        else params.delete("date")
    
        router.replace(`${pathname}?${params.toString()}`)
    }

    return (
        <div className="flex justify-center">
            <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={onSelect}
                disabled={(date) => date < today || date > maxDate}
                className="rounded-xl bg-white p-3"
                buttonVariant="outline"
            />
        </div>
    )
}
