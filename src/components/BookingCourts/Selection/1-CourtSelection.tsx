"use client"

import { useMemo } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type CourtType = "CLAY" | "HARD"

type CourtLocation = "INDOOR" | "OUTDOOR"

export default function CourtSelection() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    console.log("pathname:", pathname)
    console.log("searchParams:", searchParams.get("courtType"))
    const courtTypeParams = searchParams.get("courtType") as CourtType

    // const courtType = useMemo(() => {
    //     console.log("searchParams:", courtTypeValue)

    //     if (courtTypeValue === null) {

    //     }
    //     // return v === "CLAY" || v === "HARD" ? v : ""
    // }, [searchParams])

    const onCourtTypeChange = (courtTypeValue: string) => {
        console.log("courtTypeValue:", courtTypeValue)

        // const next = v === "CLAY" || v === "HARD" ? (v as CourtType) : undefined

        // const params = new URLSearchParams(searchParams.toString())
        // if (next) params.set("courtType", next)
        // else params.delete("courtType")

        // router.replace(`${pathname}?${params.toString()}`)
    }

    // const courtLocation = useMemo(() => {
    //     const v = searchParams.get("courtType")
    //     return v === "CLAY" || v === "HARD" ? v : ""
    // }, [searchParams])

    // const onCourtLocationChange = (v: string) => {
    //     const next = v === "CLAY" || v === "HARD" ? (v as CourtType) : undefined

    //     const params = new URLSearchParams(searchParams.toString())
    //     if (next) params.set("courtType", next)
    //     else params.delete("courtType")

    //     router.replace(`${pathname}?${params.toString()}`)
    // }


    return (
        <div className="relative z-10 grid place-items-center w-full">
            <div className="w-full max-w-lg bg-white p-8 sm:p-10">
                <Select value={courtTypeParams} onValueChange={onCourtTypeChange}>
                    <SelectTrigger className="w-full mb-10">
                        <SelectValue placeholder="Select Court Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="CLAY">CLAY</SelectItem>
                        <SelectItem value="HARD">HARD</SelectItem>
                    </SelectContent>
                </Select>
                {/* <Select value={courtLocation} onValueChange={onCourtLocationChange}>
                    <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select Court Location" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="INDOOR">INDOOR</SelectItem>
                        <SelectItem value="OUTDOOR">OUTDOOR</SelectItem>
                    </SelectContent>
                </Select> */}
            </div>
        </div>
    )
}
