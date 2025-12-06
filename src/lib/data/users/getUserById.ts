import prisma from "@/lib/prisma/prisma";
import AuthError from "next-auth"

export const getUserById = async (id: string) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });

        return user;
    } catch (error) {
        if (error instanceof AuthError) {
            return null
        }
    }
}