"use client"

import { useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Calendar } from "@/components/ui/calendar"

type Props = { initialDate?: string }

function startOfToday() {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
}

export default function DateSelection({ initialDate }: Props) {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const [date, setDate] = useState<Date | undefined>(
        initialDate ? new Date(initialDate) : undefined
    )

    const onSelect = (d?: Date) => {
        setDate(d)

        const params = new URLSearchParams(searchParams.toString())
        if (d) {
            const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
                d.getDate()
            ).padStart(2, "0")}`

            params.set("date", iso)
        } else {
            params.delete("date")
        }

        router.replace(`${pathname}?${params.toString()}`)
    }

    return (
        <div className="flex justify-center">
            <Calendar
                mode="single"
                selected={date}
                onSelect={onSelect}
                disabled={{ before: startOfToday() }}
                className="rounded-xl  bg-white p-3"
                buttonVariant="outline"
            />
        </div>
    )
}

