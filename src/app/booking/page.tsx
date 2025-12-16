import { Calendar18 } from "@/components/BookingCourts/Calendar"

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function BookingPage(
  props: {
    searchParams: SearchParams
  }
) {
  const searchParams = await props.searchParams
  const date =
    typeof searchParams.date === "string"
      ? searchParams.date
      : undefined

  return (
    <Calendar18 initialDate={date} />
  )
}
