import { redirect } from "next/navigation";
import { authorizeUser } from "@/lib/auth/authorizeUser";

export default async function UserRouterPage() {
    const user = await authorizeUser();

    if (user.role === "PLAYER") {
        redirect("/player");
    }

    if (user.role === "COACH") {
        redirect("/coach");
    }

    // Fallback if somehow role is something else
    redirect("/auth/profile");
}
