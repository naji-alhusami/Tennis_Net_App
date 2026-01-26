// import { redirect } from "next/navigation";
// import { authorizeUser } from "@/lib/auth/authorizeUser";
// import { auth } from "@/auth";

// export default async function UserRouterPage() {
//     const session = await auth()
//     const user = session?.user

//     if (user.role === "PLAYER") {
//         redirect("/player");
//     }

//     if (user.role === "COACH") {
//         redirect("/coach");
//     }

//     // Fallback if somehow role is something else
//     redirect("/auth/profile");
// }
