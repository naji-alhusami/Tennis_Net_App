import { BookingNavButton } from "@/components/BookingCourts/Selection/BookingNavButton"
import CourtSelection from "@/components/BookingCourts/Selection/CourtSelection"

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function BooktingCourtStep(props: { searchParams: SearchParams }) {
    const searchParams = await props.searchParams
    const courtType = typeof searchParams.courtType === "string" ? searchParams.courtType : undefined

    return <div className="w-full h-[35rem] flex flex-col justify-between items-center">
        <div>
            Test
            <CourtSelection initialCourtType={courtType} />
        </div>
        {/* <div className="w-full grid grid-cols-2 gap-3">
            <BookingNavButton variant="back" to="/booking/date" requiredSearchParams={["courtType"]} label="BACK" />
            <BookingNavButton variant="next" to="/booking/date" requiredSearchParams={["courtType"]} label="NEXT" />
        </div> */}
    </div>
}