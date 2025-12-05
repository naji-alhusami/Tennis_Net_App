import { NextResponse } from "next/server";
import prisma from "../../../../lib/prisma";
import { auth } from "@/auth";
import { getUserById } from "../../../../data/getUserById";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const body = await request.json();
    const { role } = body;

    if (!role) {
      return NextResponse.json({ error: "Missing role" }, { status: 400 });
    }

    const allowedRoles = ["PLAYER", "COACH"];
    if (!allowedRoles.includes(role)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }

    const existingUser = await getUserById(userId);

    if (!existingUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    const user = await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("ROLE SETUP ERROR:", error);
    return NextResponse.json({ error: "Error updating role" }, { status: 500 });
  }
}
