import prisma from "@/lib/prisma/prisma";

export const getAllUsers = async (userId: string) => {
  try {
    const users = await prisma.user.findMany({
      where: {
        id: { not: userId },
      },
      orderBy: {
        name: "asc",
      },
    });

    return users;
  } catch (error) {
    console.error("Error in getAllUsersExcept:", error);
    return [];
  }
};
