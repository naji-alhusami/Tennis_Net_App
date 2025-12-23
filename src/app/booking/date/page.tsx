// import CourtSelection from "@/components/BookingCourts/Selection/CourtSelection"
// import DateSelection from "@/components/BookingCourts/Selection/DateSelection"


// type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

// export default async function BookingPage(
//   props: {
//     searchParams: SearchParams
//   }
// ) {
//   const searchParams = await props.searchParams
//   const date =
//     typeof searchParams.date === "string"
//       ? searchParams.date
//       : undefined

//   return (
//     <>
//     <CourtSelection />
//     <DateSelection initialDate={date} />
//     </>
//   )
// }

import DateSelection from "@/components/BookingCourts/Selection/DateSelection"
import { BookingNavButton } from "@/components/BookingCourts/Selection/BookingNavButton"

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function BookingDateStep(props: { searchParams: SearchParams }) {
  const sp = await props.searchParams

  const date = typeof sp.date === "string" ? sp.date : undefined

  return (
    <div className="space-y-8">
      {/* Calendar card */}
      <div className="mx-auto w-full max-w-3xl rounded-2xl bg-white/90 backdrop-blur-md border shadow-xl p-6">
        <DateSelection initialDate={date} />
      </div>
    </div>
  )
}
