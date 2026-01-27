// import { NextResponse } from "next/server"
// import { auth } from "@/auth"
// import prisma from "@/lib/prisma/prisma"

// export async function POST(req: Request) {
//   const session = await auth()
//   if (!session?.user?.id) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
//   }

//   const { requestId } = await req.json()

//   const request = await prisma.friendRequest.findUnique({
//     where: { id: requestId },
//   })

//   if (!request || request.toUserId !== session.user.id) {
//     return NextResponse.json({ error: "Invalid request" }, { status: 400 })
//   }

//   await prisma.$transaction([
//     prisma.friendship.create({
//       data: {
//         userOneId: request.fromUserId,
//         userTwoId: request.toUserId,
//       },
//     }),
//     prisma.friendship.create({
//       data: {
//         userOneId: request.toUserId,
//         userTwoId: request.fromUserId,
//       },
//     }),
//     prisma.friendRequest.delete({
//       where: { id: requestId },
//     }),
//   ])

//   return NextResponse.json({ success: true })
// }

import { NextResponse } from "next/server";
import { auth } from "@/auth";
import prisma from "@/lib/prisma/prisma";
import { type Prisma } from "@prisma/client";

export async function POST(req: Request) {
  const session = await auth();
  const me = session?.user?.id;
  if (!me) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json().catch(() => null);
  const requestId = body?.requestId as string | undefined;
  if (!requestId)
    return NextResponse.json({ error: "Missing requestId" }, { status: 400 });

  const request = await prisma.friendRequest.findUnique({
    where: { id: requestId },
    select: { id: true, fromUserId: true, toUserId: true },
  });

  if (!request || request.toUserId !== me) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  // normalize pair so A-B and B-A become the same stored row
  const [userOneId, userTwoId] = [request.fromUserId, request.toUserId].sort();

  try {
    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      // Create friendship if it doesn't exist
      await tx.friendship.create({
        data: { userOneId, userTwoId },
      });

      // Delete request (or mark accepted if you prefer)
      await tx.friendRequest.delete({
        where: { id: requestId },
      });
    });

    return NextResponse.json({ success: true });
  } catch (e) {
    if (
      typeof e === "object" &&
      e !== null &&
      "code" in e &&
      e.code === "P2002"
    ) {
      await prisma.friendRequest
        .delete({ where: { id: requestId } })
        .catch(() => {});
      return NextResponse.json({ success: true });
    }

    console.error("ACCEPT FRIEND REQUEST ERROR:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
