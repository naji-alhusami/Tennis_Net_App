import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function BookingSuccessPage() {
    return (
        <div className="flex flex-col items-center justify-center px-4 py-35">
            <div className="w-full max-w-lg rounded-2xl bg-white border shadow-sm overflow-hidden">
                <h1 className="font-bold uppercase py-5 text-lg text-center border-b">
                    Booking confirmed
                </h1>

                <div className="flex flex-col items-center justify-center gap-4 px-6 py-10 text-center">
                    <h2 className="text-2xl font-bold text-green-600">
                        🎾 Court booked successfully!
                    </h2>
                </div>

                <div className="border-t px-4 py-4">
                    <Button
                        asChild
                        className="w-full bg-green-600 hover:bg-green-700 font-bold"
                    >
                        <Link href="/player">
                            Go to Dashboard
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
