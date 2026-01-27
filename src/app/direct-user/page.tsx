import { auth } from "@/auth"
import { redirect } from "next/navigation"

export default async function DirectUserPage() {
  const session = await auth()

  // Not logged in → home (or /auth/login)
  if (!session?.user) redirect("/")

  // Logged in but no role → go fill profile
  if (!session.user.role) redirect("/auth/profile")

  // Has role → dashboard
  redirect("/dashboard")
}