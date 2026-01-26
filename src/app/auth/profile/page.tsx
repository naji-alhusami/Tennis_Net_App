import { auth } from "@/auth"
import ProfileForm from "@/components/Auth/ProfileForm"

export default async function ProfilePage() {
    const session = await auth()
    console.log(session)
    return <ProfileForm />
}