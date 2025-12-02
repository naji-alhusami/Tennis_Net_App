import { auth } from '@/auth'

async function UserPage() {
    const session = await auth()
    console.log(session)
    return <div>Hello {session?.user.email}</div>
}

export default UserPage