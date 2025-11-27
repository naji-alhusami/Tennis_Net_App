import prisma from "../../../lib/prisma";

export const getUserByEmail = async (email: string) => {
    try {
        const lowerCaseEmail = email.toLowerCase();
        const user = prisma.user.findUnique({
            where: {
                email: lowerCaseEmail
            }
        })

        return user;
    } catch (error) {
        console.log(error)
    }
}