import BookingSteps from "@/components/BookingCourts/BookingSteps"
// import { Calendar18 } from "@/components/BookingCourts/Calendar"

type Params = Promise<{ slug: string }>
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function BookingPage(props: {
  params: Params
  searchParams: SearchParams
}) {
  const params = await props.params
  const searchParams = await props.searchParams
  const slug = params.slug
  const date = searchParams.date

  console.log("slug:", slug)
  console.log("query:", date)

  return (
    <>
      <BookingSteps />
      {/* <Calendar18 /> */}
    </>
  )
}
