import bcrypt from "bcrypt";
import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";
import { getUserByEmail } from "../../../../data/getUserByEmail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    if (!email || !name || !password) {
      return new NextResponse("Missing Info", { status: 400 });
    }

    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        { error: "This Email Is Already Registered" },
        { status: 400 }
      );
    }

    const lowerCaseEmail = email.toLowerCase();
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email: lowerCaseEmail,
        hashedPassword,
      },
    });

    // Generate a Verification Token
    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(email, verificationToken.token);

    return NextResponse.json({ success: true, user });
  } catch {
    return NextResponse.json(
      { error: "Error registering user" },
      { status: 500 }
    );
  }
}
