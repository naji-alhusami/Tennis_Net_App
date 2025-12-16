"use client"
import { useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Calendar } from "@/components/ui/calendar"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"

function startOfToday() {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
}

type Props = {
    initialDate?: string // "YYYY-MM-DD"
}

export function Calendar18({ initialDate }: Props) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [date, setDate] = useState<Date | undefined>(
        initialDate ? new Date(initialDate) : undefined
    )

    const today = new Date()
    today.setHours(0, 0, 0, 0)

    const onSelect = (d?: Date) => {
        setDate(d)

        const params = new URLSearchParams(searchParams.toString())
        if (d) {
            const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
                d.getDate()
            ).padStart(2, "0")}`

            params.set("date", iso)
            router.replace(`${pathname}?${params.toString()}`)
        } else {
            console.log("insied else")
            params.delete("date")
            router.replace(`${pathname}?${params.toString()}`)
        }
    }

    const onNext = () => {
        if (!date) return

        const iso = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
            date.getDate()
        ).padStart(2, "0")}`

        router.push(`/booking/time?date=${iso}`)
    }

    return (
        <div className="py-20 flex flex-col gap-y-10">
            <Calendar
                mode="single"
                selected={date}
                onSelect={onSelect}
                disabled={{ before: startOfToday() }}
                className="w-full border [--cell-size:--spacing(11)] md:[--cell-size:--spacing(12)]"
                buttonVariant="outline"
            />
            <div className="flex flex-row justify-center items-center">
                <Button
                    type="button"
                    onClick={onNext}
                    disabled={!date}
                    className={cn(
                        "w-full bg-green-600 hover:bg-green-700 font-bold",
                        !date && "opacity-70 cursor-not-allowed"
                    )}
                >
                    NEXT
                </Button>
            </div>
        </div >
    )
}

