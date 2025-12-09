import { authorizeUser } from "@/lib/auth/authorizeUser";

export default async function CoachPage() {
  const user = await authorizeUser("COACH");

  return <div>Hello Coach {user.email} {user.role}</div>;
}
