// app/auth/google-redirect/page.tsx
import { auth } from "@/auth";       // your NextAuth helper
import { redirect } from "next/navigation";

export default async function GoogleRedirectPage() {
  const session = await auth();

  // No session
  if (!session?.user) {
    redirect("/auth/login");
  }

  const role = session.user.role;

  // no role yet
  if (!role) {
    redirect("/auth/role");
  }

  // role exists:
  redirect("/user");
}
