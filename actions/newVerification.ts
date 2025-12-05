"use server";

import prisma from "../lib/prisma";
import { getUserByEmail } from "../data/getUserByEmail";

export const newVerification = async (token: string) => {
  const existingToken = await prisma.verificationToken.findFirst({
    where: {
      token: token,
    },
  });

  if (!existingToken) {
    return { error: " " };
  }

  const hasExpired = new Date(existingToken.expires) < new Date();

  if (hasExpired) {
    return { error: "Token Has Expired" };
  }

  const existingUser = await getUserByEmail(existingToken.email);

  if (!existingUser) {
    return { error: "User Not Found!" };
  }

  await prisma.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await prisma.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return { success: " " };
};
