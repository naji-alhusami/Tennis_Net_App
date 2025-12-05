import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserById } from "../../../data/getUserById";

async function UserPage() {
    const session = await auth();

    // Not logged in: go to login
    if (!session?.user) {
        redirect("/auth/login");
    }

    const dbUser = await getUserById(session.user.id)

    // Logged in but no role in DB: force go to role page
    if (!dbUser?.role) {
        redirect("/role");
    }

    return <div>Hello {dbUser.email}</div>;
}

export default UserPage;
