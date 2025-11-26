import bcrypt from "bcrypt";
import prisma from "../../../../lib/prisma";
import { NextResponse } from "next/server";
import { generateVerificationToken } from "@/lib/token";
import { sendVerificationEmail } from "@/lib/mail";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name, password } = body;

    if (!email || !name || !password) {
      return new NextResponse("Missing Info", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
      },
    });

    // Generate a Verification Token
    const verificationToken = await generateVerificationToken(email);

    await sendVerificationEmail(email, verificationToken.token);

    return NextResponse.json(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(error);
    }

    return NextResponse.json("Error registering user", { status: 500 });
  }
}
