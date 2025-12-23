import CourtSelection from "@/components/BookingCourts/Selection/CourtSelection"

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function BooktingCourtStep(props: { searchParams: SearchParams }) {
    const searchParams = await props.searchParams
    const courtType = typeof searchParams.courtType === "string" ? searchParams.courtType : undefined

    return (<div className="w-full flex flex-col justify-between items-center">
        <CourtSelection initialCourtType={courtType} />
    </div>)
}