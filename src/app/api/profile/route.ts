import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma/prisma";
import { auth } from "@/auth";
import { UserRole } from "@/generated/prisma";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/jpg"];

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const formData = await request.formData();

    const name = String(formData.get("name") ?? "").trim();
    const roleRaw = String(formData.get("role") ?? "").trim();
    const image = formData.get("image"); // File | null

    if (!name) {
      return NextResponse.json({ error: "Missing Ful Name" }, { status: 400 });
    }

    // Prisma enum validation
    if (!Object.values(UserRole).includes(roleRaw as UserRole)) {
      return NextResponse.json({ error: "Invalid Role" }, { status: 400 });
    }
    const role = roleRaw as UserRole;

    if (!(image instanceof File)) {
      return NextResponse.json({ error: "Missing Image" }, { status: 400 });
    }

    if (image.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "Image must be smaller than 5MB" },
        { status: 400 },
      );
    }

    if (!ALLOWED_TYPES.includes(image.type)) {
      return NextResponse.json(
        { error: "Only JPG and PNG images are allowed" },
        { status: 400 },
      );
    }

    // const existingUser = await getUserById(userId);
    // console.log("existingUser:", existingUser);

    // if (!existingUser) {
    //   return NextResponse.json({ error: "User not found" }, { status: 404 });
    // }

    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        role: userRole,
        image,
      },
    });

    return NextResponse.json({ success: true, user });
  } catch (error) {
    console.error("Profile Update ERROR:", error);
    return NextResponse.json(
      { error: "Error Updating Profile" },
      { status: 500 },
    );
  }
}
