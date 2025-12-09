// import { auth } from "@/auth";
// import { redirect } from "next/navigation";
// import { getUserById } from "@/lib/data/users/getUserById";

// async function UserPage() {
//     const session = await auth();

//     // Not logged in: go to login
//     if (!session?.user) {
//         redirect("/auth/login");
//     }

//     const dbUser = await getUserById(session.user.id)

//     // Logged in but no role in DB: force go to role page
//     if (!dbUser?.role) {
//         redirect("/auth/role");
//     }

//     return <div>Hello {dbUser.email}</div>;
// }

// export default UserPage;

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
    redirect("/auth/role");
}
