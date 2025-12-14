import { NextResponse } from "next/server"
import { auth } from "@/auth"
import prisma from "@/lib/prisma/prisma"

export async function POST(req: Request) {
  const session = await auth()
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { requestId } = await req.json()

  const request = await prisma.friendRequest.findUnique({
    where: { id: requestId },
  })

  if (!request || request.toUserId !== session.user.id) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }

  await prisma.friendRequest.delete({
    where: { id: requestId },
  })

  return NextResponse.json({ success: true })
}
