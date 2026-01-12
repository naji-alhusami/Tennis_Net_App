import { notFound, redirect } from "next/navigation"
import { auth } from "@/auth"

import { isValidMongoObjectId } from "@/lib/utils/isValidMongoObjectId"

import BookingSteps from "@/components/BookingCourts/Steps/BookingSteps"
import { BookingNavButton } from "@/components/BookingCourts/Selection/BookingNavButton"
import BookingWizardFrame from "@/components/BookingCourts/Wizard/BookingWizardFrame"
import { CourtLocation, CourtType } from "@/generated/prisma"
import { getMyFriends } from "@/lib/data/getMyFriends"
import { getPlayersNamesByIds } from "@/lib/data/getPlayerNameById"
import { getAllBookedTimesByCourtsGroup } from "@/lib/data/getAllBookedTimesByCourtsGroup"
import { getCourtGroupsIds } from "@/lib/data/getCourtGroupsIds"
import { getBusyDatesForUsers } from "@/lib/data/getBusyDatesForUsers"
import { getBusyPlayerIdsAtSlot } from "@/lib/data/getBusyPlayerIdsAtSlot"
import { addDaysToDate, getEndOfDay, getStartOfToday } from "@/lib/utils/date"

// Defines all the Steps and as const for making the values fixed
const Steps = ["court", "date", "time", "players", "confirm"] as const
type StepKey = (typeof Steps)[number]

type BookingSearchParams = Promise<{
    _dir?: string
    courtType?: CourtType | string
    courtLocation?: CourtLocation | string
    date?: string
    time?: string
    players?: string | string[]
}>

type BookingParams = Promise<{ step: StepKey }>

function sanitizeIds(raw: string[], max = 3) {
    const out: string[] = []
    const seen = new Set<string>()

    for (const id of raw) {
        if (!isValidMongoObjectId(id)) continue
        if (seen.has(id)) continue
        seen.add(id)
        out.push(id)
        if (out.length >= max) break
    }

    return out
}

export default async function BookingPage({
    params,
    searchParams,
}: {
    params: BookingParams
    searchParams: BookingSearchParams
}) {
    // if user not logged in -> redirect to /login page
    const session = await auth()
    if (!session?.user?.id) redirect("/login")
    const userId = session.user.id

    // get the param (step)
    const { step } = await params
    // get 404 if the param not of the array Steps
    if (!Steps.includes(step)) notFound()

    // get the searchParams values
    const searchParam = await searchParams
    const courtTypeParam = searchParam.courtType
    const courtLocationParam = searchParam.courtLocation
    const dateParam = searchParam.date

    // Get
    // const courtGroupsIds = await getCourtGroupsIds(courtTypeParam as CourtType, courtLocationParam as CourtLocation)

    // let fullyBookedTimes: string[] = []
    // if (typeof dateParam === "string") {
    //     fullyBookedTimes = await getFullyBookedTimesByCourtGroup(courtGroupsIds, dateParam)
    //     console.log("fullyBookedTimes:", fullyBookedTimes)
    // }

    // Get All the Booked Times By Grouping the Courts
    function isCourtType(value: unknown): value is CourtType {
        return Object.values(CourtType).includes(value as CourtType)
    }

    function isCourtLocation(value: unknown): value is CourtLocation {
        return Object.values(CourtLocation).includes(value as CourtLocation)
    }

    let bookedTimes: string[] = []

    if (
        isCourtType(courtTypeParam) &&
        isCourtLocation(courtLocationParam) &&
        typeof dateParam === "string"
    ) {
        bookedTimes = await getAllBookedTimesByCourtsGroup({
            courtTypeParam,
            courtLocationParam,
            dateParam,
        })
    }



    const rawPlayerIds =
        typeof searchParam.players === "string"
            ? [searchParam.players]
            : Array.isArray(searchParam.players)
                ? searchParam.players
                : []

    //  sanitize BEFORE prisma
    const playerIds = sanitizeIds(rawPlayerIds, 3)

    const players = await getPlayersNamesByIds(playerIds)

    const from = getStartOfToday()
    const to = getEndOfDay(addDaysToDate(from, 7))

    const busyDates = await getBusyDatesForUsers([userId, ...playerIds], from, to)


    const dateISO = typeof searchParam.date === "string" ? searchParam.date : undefined
    const timeHHmm = typeof searchParam.time === "string" ? searchParam.time : undefined

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

    // Gets the step number
    const currentStep = Steps.indexOf(step as StepKey)

    const backTo = `/booking/${Steps[Math.max(0, currentStep - 1)]}`
    const nextTo = `/booking/${Steps[Math.min(Steps.length - 1, currentStep + 1)]}`

    // Defines which query parameters are required before going next.
    const requiredForNext: Record<StepKey, string[]> = {
        court: ["courtType","courtLocation"],
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
                    bookedTimes={bookedTimes}
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