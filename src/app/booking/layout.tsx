export default function BookingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <section className="w-full max-w-none p-5 md:px-13 xl:px-32">{children}</section>
}