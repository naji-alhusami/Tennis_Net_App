import { notFound, redirect } from "next/navigation"
import { auth } from "@/auth"
import BookingSteps from "@/components/BookingCourts/Steps/BookingSteps"
import { BookingNavButton } from "@/components/BookingCourts/Selection/BookingNavButton"
import BookingWizardFrame from "@/components/BookingCourts/Wizard/BookingWizardFrame"
import { getMyFriends } from "@/lib/data/getMyFriends"

export default async function Page({
    params,
}: {
    params: Promise<{ step: string }>
}) {
    const session = await auth()
    if (!session?.user?.id) redirect("/login")

    const userId = session.user.id
    // get all frineds
    const friends = await getMyFriends(userId)
    
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

    const backDisabled = currentStep === 0 // Disables the Back button on the first step.
    const nextDisabled = currentStep === STEPS.length - 1 // Disables the Next button on the last step.

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
                <BookingWizardFrame segment={step} friends={friends} />
            </div>
            <div className="absolute bottom-5 md:bottom-25 left-1/2 -translate-x-1/2 w-[min(28rem,calc(100vw-2rem))] max-w-lg">
                <div className="p-4 rounded-2xl bg-white border shadow-sm">
                    <div className="grid grid-cols-2 gap-3">
                        <BookingNavButton
                            variant="back"
                            to={backTo}
                            label="BACK"
                            disabled={backDisabled}
                        />
                        <BookingNavButton
                            variant="next"
                            to={nextTo}
                            label="NEXT"
                            disabled={nextDisabled}
                            requiredSearchParams={requiredForNext[step]}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}