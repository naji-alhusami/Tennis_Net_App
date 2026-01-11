"use client"

import { useMemo, useEffect, useCallback } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { addDaysToDate, getEndOfDay, getStartOfToday } from "@/lib/utils/date"

function parseLocalDate(iso: string | null) {
    if (!iso) return undefined
    const [y, m, d] = iso.split("-").map(Number)
    if (!y || !m || !d) return undefined
    return new Date(y, m - 1, d)
}
function toISODate(d: Date) {
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")
    return `${y}-${m}-${day}`
}

export default function DateSelection({ busyDates }: { busyDates: string[] }) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const selectedDate = useMemo(
        () => parseLocalDate(searchParams.get("date")),
        [searchParams]
    )

    const today = useMemo(() => getStartOfToday(), [])
    const maxDate = useMemo(() => getEndOfDay(addDaysToDate(today, 7)), [today])

    const busySet = useMemo(() => new Set(busyDates), [busyDates])

    const isDisabled = useCallback(
        (date: Date) => {
            const day = new Date(date)
            day.setHours(0, 0, 0, 0)

            if (day < today) return true
            if (day > maxDate) return true
            return busySet.has(toISODate(day))
        },
        [today, maxDate, busySet]
    )

    const safeReplace = useCallback(
        (params: URLSearchParams) => {
            const url = params.toString() ? `${pathname}?${params.toString()}` : pathname
            router.replace(url, { scroll: false })
        },
        [router, pathname]
    )

    const onSelect = (date?: Date) => {
        ; (document.activeElement as HTMLElement | null)?.blur()

        const params = new URLSearchParams(searchParams.toString())
        if (date && !isDisabled(date)) params.set("date", toISODate(date))
        else params.delete("date")

        safeReplace(params)
    }

    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString())
        const dateParam = params.get("date")
        if (!dateParam) return

        const parsed = parseLocalDate(dateParam)
        if (!parsed) return

        parsed.setHours(0, 0, 0, 0)
        if (isDisabled(parsed)) {
            params.delete("date")
            safeReplace(params)
        }
    }, [searchParams, isDisabled, safeReplace])

    return (
        <Card className="rounded-2xl">
            <CardHeader className="space-y-1">
                <div className="text-amber-600 text-center text-sm font-bold">
                    * Choose a day within one week
                </div>
                {/* <div className="text-amber-600 text-center text-xs font-bold">
                    * Days with existing reservations are disabled
                </div> */}
            </CardHeader>

            <CardContent className="flex flex-col items-center">
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={onSelect}
                    disabled={isDisabled}
                    className="rounded-xl bg-white p-3"
                    buttonVariant="outline"
                    modifiers={{
                        booked: (date) => busySet.has(toISODate(date)),
                    }}
                />

                <div className="pt-8 flex flex-wrap justify-center gap-3 text-xs">
                    <span className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded border border-gray-400 bg-white" />
                        Available
                    </span>

                    <span className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded bg-red-300" /> Booked
                    </span>

                    <span className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded bg-gray-400" /> Today
                    </span>

                    <span className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded bg-green-800" /> Selected
                    </span>

                    <span className="flex items-center gap-2">
                        <span className="h-3 w-3 rounded bg-gray-200 border border-gray-300" />
                        Not open
                    </span>
                </div>
            </CardContent>
        </Card>
    )
}
