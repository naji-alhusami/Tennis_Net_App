import { notFound, redirect } from "next/navigation"
import { auth } from "@/auth"

// import { isValidMongoObjectId } from "@/lib/utils/isValidMongoObjectId"

import BookingSteps from "@/components/BookingCourts/Steps/BookingSteps"
import { BookingNavButton } from "@/components/BookingCourts/Selection/BookingNavButton"
import BookingWizardFrame from "@/components/BookingCourts/Wizard/BookingWizardFrame"
import { CourtLocation, CourtType } from "@/generated/prisma"
import { getMyFriends } from "@/lib/data/getMyFriends"
import { getSelectedPlayersNamesByIds } from "@/lib/data/getSelectedPlayersNamesByIds"
import { getAllBookedTimesByCourtsGroup } from "@/lib/data/getAllBookedTimesByCourtsGroup"
import { getReservedDatesByUserId } from "@/lib/data/getReservedDatesByUserId"
import { getBusyPlayerIdsAtSlot } from "@/lib/data/getBusyPlayerIdsAtSlot"

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
    console.log("userId:", userId);

    // get the param (step)
    const { step } = await params
    // get 404 if the param not of the array Steps
    if (!Steps.includes(step)) notFound()

    // get the searchParams values
    const searchParam = await searchParams
    const courtTypeParam = searchParam.courtType
    const courtLocationParam = searchParam.courtLocation
    const playersParamIds =
        typeof searchParam.players === "string"
            ? [searchParam.players]
            : Array.isArray(searchParam.players)
                ? searchParam.players
                : []
    const dateParam = typeof searchParam.date === "string" ? searchParam.date : undefined
    const timeParam = typeof searchParam.time === "string" ? searchParam.time : undefined


    // ----------------------
    // Calendar Days availability: disable calendar days where the current user or selected players already have ANY reservation
    // ----------------------

    const reservedDates = await getReservedDatesByUserId(userId)

    // ----------------------
    // Court capacity availability: for the selected court group (type + location) on this date, 
    // return time slots that are FULLY booked (e.g., both Clay Outdoor courts taken)
    // ----------------------

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

    // ----------------------
    // Players availability
    // ----------------------

    // To get all the friends in the list
    const allFriends = await getMyFriends(userId)

    // To get all the selected friends for booking using searchParams in the list
    const selectedPlayers = await getSelectedPlayersNamesByIds(playersParamIds)

    // get busy ids for that slot
    const busyPlayerIds = await getBusyPlayerIdsAtSlot({
        dateParam,
        timeParam,
        durationMinutes: 60,
    })


    // ----------------------
    // Next and Back buttons
    // ----------------------

    // Gets the step number
    const currentStep = Steps.indexOf(step as StepKey)

    const backTo = `/booking/${Steps[Math.max(0, currentStep - 1)]}`
    const nextTo = `/booking/${Steps[Math.min(Steps.length - 1, currentStep + 1)]}`

    // Defines which query parameters are required before going next
    const requiredForNext: Record<StepKey, string[]> = {
        court: ["courtType", "courtLocation"],
        date: ["courtType", "courtLocation", "date"],
        time: ["courtType", "courtLocation", "date", "time"],
        players: ["courtType", "courtLocation", "date", "time", "players"],
        confirm: ["courtType", "courtLocation", "date", "time", "players"],
    }

    return (
        <div>
            <BookingSteps currentStep={currentStep} />

            {/*  wizard */}
            <div className="mt-6">
                <BookingWizardFrame
                    step={step}
                    allFriends={allFriends}
                    reservedDates={reservedDates}
                    bookedTimes={bookedTimes}
                    selectedPlayers={selectedPlayers}
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