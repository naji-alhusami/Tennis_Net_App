import { NextResponse } from "next/server";
import prisma from "@/lib/prisma/prisma";
import { auth } from "@/auth";
import { UserRole } from "@/generated/prisma";
import { put } from "@vercel/blob";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/jpg"]);

export async function POST(request: Request) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();

    const name = String(formData.get("name") ?? "").trim();
    const roleRaw = String(formData.get("role") ?? "").trim();
    const image = formData.get("image");

    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    if (!Object.values(UserRole).includes(roleRaw as UserRole)) {
      return NextResponse.json({ error: "Invalid role" }, { status: 400 });
    }
    const role = roleRaw as UserRole;

    let blob: { url: string } | null = null;
    if (image instanceof File && image.size > 0) {
      if (image.size > MAX_SIZE) {
        return NextResponse.json(
          { error: "Image must be smaller than 5MB" },
          { status: 400 },
        );
      }

      if (!ALLOWED_TYPES.has(image.type)) {
        return NextResponse.json(
          { error: "Only JPG and PNG images are allowed" },
          { status: 400 },
        );
      }

      const ext = image.type === "image/png" ? "png" : "jpg";
      const fileName = `profile/${session.user.id}/${Date.now()}.${ext}`;

      blob = await put(fileName, image, {
        access: "public",
        contentType: image.type,
      });
    } else if (image != null && !(image instanceof File)) {
      return NextResponse.json(
        { error: "Invalid image value" },
        { status: 400 },
      );
    }

    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: {
        name,
        role,
        image: blob?.url,
      },
      select: { id: true, name: true, role: true, image: true },
    });

    return NextResponse.json({ success: true, user: updatedUser });
  } catch (error) {
    console.error("Profile Update ERROR:", error);
    return NextResponse.json(
      { error: "Error Updating Profile" },
      { status: 500 },
    );
  }
}
