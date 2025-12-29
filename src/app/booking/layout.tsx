import Image from "next/image";
import { ReactNode } from "react";


export default function BookingLayout({ children }: { children: ReactNode }) {
    return <div className="relative min-h-dvh overflow-hidden">
        <Image
            src="/courses.jpg"
            alt="background"
            fill
            priority
            className="object-cover opacity-90 pointer-events-none -z-10"
        />
        {/* <section className="relative z-10 mx-auto h-screen w-full max-w-none px-4 pt-4 space-y-6 md:px-13 xl:px-32">
            {children}
        </section> */}
        <section className="relative z-10 mx-auto min-h-dvh w-full max-w-none px-4 pt-4 pb-28 space-y-6 md:px-13 xl:px-32">
            {children}
        </section>
    </div>
}