import { BookingNavButton } from "@/components/BookingCourts/Selection/BookingNextButton"
import CourtSelection from "@/components/BookingCourts/Selection/CourtSelection"

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function BooktingCourtStep(props: { searchParams: SearchParams }) {
    const searchParams = await props.searchParams
    const courtType = typeof searchParams.courtType === "string" ? searchParams.courtType : undefined

    return <div className="py-10">
        <CourtSelection initialCourtType={courtType} />
        <BookingNavButton variant="next" to="/booking/date" require={["courtType"]} label="NEXT" />
    </div>
}