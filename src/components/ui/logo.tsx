import Link from "next/link"

import { cn } from "@/lib/utils"
import { pacifico } from "@/app/fonts"

const Logo = () => {
    return <div><Link href="/" className="text-center">
        <h1
            className={cn(
                " text-green-700 text-xl text-center md:text-2xl",
                pacifico.className
            )}
        >
            TENNIS NET
        </h1>
    </Link>
    </div>
}

export default Logo