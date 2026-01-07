import { notFound, redirect } from "next/navigation"
import { auth } from "@/auth"

import BookingSteps from "@/components/BookingCourts/Steps/BookingSteps"
import { BookingNavButton } from "@/components/BookingCourts/Selection/BookingNavButton"
import BookingWizardFrame from "@/components/BookingCourts/Wizard/BookingWizardFrame"
import { getMyFriends } from "@/lib/data/getMyFriends"
import { getPlayersNamesByIds } from "@/lib/data/getPlayerNameById"
import { getFullyBookedTimesByCourtGroup } from "@/lib/data/getReservedTimesByCourtId"
import { getCourtGroupsIds } from "@/lib/data/getCourtGroupsIds"
import { CourtLocation, CourtType } from "@/generated/prisma"
import { getBusyDatesForUsers } from "@/lib/data/getBusyDatesForUsers"
import { getBusyPlayerIdsAtSlot } from "@/lib/data/getBusyPlayerIdsAtSlot"


type StepKey = "court" | "date" | "time" | "players" | "confirm"

type SearchParams = Promise<{ players?: string | string[];[key: string]: string | string[] | undefined }>
type Params = Promise<{ step: StepKey | string }>

function isMongoObjectId(v: string) {
    return /^[0-9a-fA-F]{24}$/.test(v)
}

function sanitizeIds(raw: string[], max = 3) {
    const out: string[] = []
    const seen = new Set<string>()

    for (const id of raw) {
        if (!isMongoObjectId(id)) continue
        if (seen.has(id)) continue
        seen.add(id)
        out.push(id)
        if (out.length >= max) break
    }

    return out
}

// helpers (server-safe)
function startOfToday() {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
}
function addDays(date: Date, days: number) {
    const d = new Date(date)
    d.setDate(d.getDate() + days)
    return d
}
function endOfDay(date: Date) {
    const d = new Date(date)
    d.setHours(23, 59, 59, 999)
    return d
}

export default async function BookingPage({
    params,
    searchParams,
}: {
    params: Params
    searchParams: SearchParams
}) {
    const session = await auth()
    if (!session?.user?.id) redirect("/login")

    const userId = session.user.id

    const sp = await searchParams
    const courtTypeParams = sp.courtType
    const courtLocationParams = sp.courtLocation
    const dateParams = sp.date

    const courtGroupsIds = await getCourtGroupsIds(courtTypeParams as CourtType, courtLocationParams as CourtLocation)

    let fullyBookedTimes: string[] = []
    if (typeof dateParams === "string") {
        fullyBookedTimes = await getFullyBookedTimesByCourtGroup(courtGroupsIds, dateParams)
    }

    const rawPlayerIds =
        typeof sp.players === "string"
            ? [sp.players]
            : Array.isArray(sp.players)
                ? sp.players
                : []

    //  sanitize BEFORE prisma
    const playerIds = sanitizeIds(rawPlayerIds, 3)

    const players = await getPlayersNamesByIds(playerIds)

    const from = startOfToday()
    const to = endOfDay(addDays(from, 7))

    const busyDates = await getBusyDatesForUsers([userId, ...playerIds], from, to)


    const dateISO = typeof sp.date === "string" ? sp.date : undefined
    const timeHHmm = typeof sp.time === "string" ? sp.time : undefined

    // friends you show in the picker
    const friends = await getMyFriends(userId)
    const friendIds = friends.map((f) => f.id)

    // get busy ids for that slot (only among friends)
    const busyPlayerIds = await getBusyPlayerIdsAtSlot({
        dateISO,
        timeHHmm,
        durationMinutes: 60,
        candidates: friendIds,
    })


    // Defines all booking steps in order
    // as const makes each value fixed (not just a generic string)
    const STEPS = ["court", "date", "time", "players", "confirm"] as const

    // Creates a type that can be only one of these values: "court" | "date" | "time" | "players" | "confirm"
    type StepKey = (typeof STEPS)[number]

    const { step } = await params

    // Checks if a string is a valid step: Returns true if the value exists inside STEPS
    function isStepKey(v: string): v is StepKey {
        return (STEPS as readonly string[]).includes(v)
    }

    if (!isStepKey(step)) notFound()

    // Gets the step number
    const currentStep = STEPS.indexOf(step)

    const backTo = `/booking/${STEPS[Math.max(0, currentStep - 1)]}`
    const nextTo = `/booking/${STEPS[Math.min(STEPS.length - 1, currentStep + 1)]}`

    // Defines which query parameters are required before going next.
    const requiredForNext: Record<StepKey, string[]> = {
        court: ["courtType"],
        date: ["courtType", "date"],
        time: ["courtType", "date", "time"],
        players: ["courtType", "date", "time", "players"],
        confirm: ["courtType", "date", "time", "players"],
    }

    return (
        <div>
            <BookingSteps currentStep={currentStep} />

            {/*  wizard */}
            <div className="mt-6">
                <BookingWizardFrame
                    step={step}
                    friends={friends}
                    selectedPlayers={players}
                    fullyBookedTimes={fullyBookedTimes}
                    busyDates={busyDates}
                    busyPlayerIds={busyPlayerIds}
                />
            </div>
            <div className="absolute bottom-5 md:bottom-25 left-1/2 -translate-x-1/2 w-[min(28rem,calc(100vw-2rem))] max-w-lg">
                <div className="p-4 rounded-2xl bg-white border shadow-sm">
                    <div className="grid grid-cols-2 gap-3">
                        <BookingNavButton
                            searchParams={searchParams}
                            variant="back"
                            to={backTo}
                            label="BACK"
                            step={step}
                            currentStep={currentStep}
                        />
                        <BookingNavButton
                            searchParams={searchParams}
                            variant={step === "confirm" ? "book" : "next"}
                            to={nextTo}
                            label={step === "confirm" ? "BOOK" : "NEXT"}
                            requiredSearchParams={requiredForNext[step]}
                            step={step}
                            currentStep={currentStep}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}