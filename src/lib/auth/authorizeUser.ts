import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { getUserById } from "@/lib/data/users/getUserById";

export async function authorizeUser(expectedRole?: "PLAYER" | "COACH") {
  const session = await auth();

  // 1) Not logged in: go to login
  if (!session?.user) {
    redirect("/auth/login");
  }

  const dbUser = await getUserById(session.user.id);

  // 2) Logged in but no role in DB: go to choose role
  if (!dbUser?.role) {
    redirect("/auth/profile");
  }

  // 3) Role mismatch: redirect to correct dashboard
  if (expectedRole && dbUser.role !== expectedRole) {
    if (dbUser.role === "PLAYER") redirect("/player");
    if (dbUser.role === "COACH") redirect("/coach");
  }

  return dbUser;
}
