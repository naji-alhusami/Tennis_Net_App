"use client"

import { useMemo, useEffect, useCallback } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { addDaysToDate, formatDateToYYYMMDD, getEndOfDay, getStartOfToday, parseLocalDate } from "@/lib/utils/date"

export default function DateSelection({ reservedDates }: { reservedDates: string[] }) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const selectedDate = parseLocalDate(searchParams.get("date"))

    const today = getStartOfToday()
    const maxDate = getEndOfDay(addDaysToDate(today, 7))

    // Using new Set better to use obejct than array
    // Memoize a Set of reserved date strings to keep a stable reference inside useCallback and useEffect
    const bookedDateSet = useMemo(() => new Set(reservedDates), [reservedDates])

    // Memoize the callback so its reference stays stable and doesn't retrigger useEffect unnecessarily
    const isDisabled = useCallback(
        (date: Date) => {
            // using new day because the date value could be at 12:34, we need it 00:00
            const day = new Date(date)
            day.setHours(0, 0, 0, 0)

            if (day < today) return true
            if (day > maxDate) return true
            if (bookedDateSet.has(formatDateToYYYMMDD(day))) return true

            return false
        },
        [today, maxDate, bookedDateSet]
    )

    // Updates the current URL query params without reload or scroll
    // Also useCallback bacuse we are using it inside useEffect
    const replaceQuery = useCallback(
        (params: URLSearchParams) => {
            const url = params.toString() ? `${pathname}?${params.toString()}` : pathname
            router.replace(url, { scroll: false })
        },
        [router, pathname]
    )

    const selectDateHandler = (date?: Date) => {
        // to delete the blur around the date (better user experience)
        ; (document.activeElement as HTMLElement | null)?.blur()

        const params = new URLSearchParams(searchParams.toString())
        if (date && !isDisabled(date)) params.set("date", formatDateToYYYMMDD(date))
        else params.delete("date")

        replaceQuery(params)
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
            replaceQuery(params)
        }
    }, [searchParams, isDisabled, replaceQuery])

    return (
        <Card className="rounded-2xl">
            <CardHeader className="space-y-1">
                <div className="text-amber-600 text-center text-sm font-bold">
                    * You Can Choose a Day Within One Week
                </div>
            </CardHeader>

            <CardContent className="flex flex-col items-center">
                <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={selectDateHandler}
                    disabled={isDisabled}
                    className="rounded-xl bg-white p-3"
                    buttonVariant="outline"
                    modifiers={{
                        booked: (date) => bookedDateSet.has(formatDateToYYYMMDD(date)),
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
