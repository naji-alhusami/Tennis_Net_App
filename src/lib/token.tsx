import { v4 as uuidv4 } from 'uuid'
import { getVerificationTokenByEmail } from "../../data/getVerificationTokenByEmail";
import prisma from "../../lib/prisma";

export const generateVerificationToken = async (email: string) => {
    // Generate random token
    const token = uuidv4();
    const expires = new Date().getTime() + 1000 * 60 * 60 * 1; //1 hours

    // Check if a token already exists
    const existingToken = await getVerificationTokenByEmail(email);

    if (existingToken) {
        await prisma.verificationToken.delete({
            where: {
                id: existingToken.id
            }
        })
    }

    // Create the new Verification Token
    const verificationToken = await prisma.verificationToken.create({
        data: {
            email,
            token,
            expires: new Date(expires),
        }
    })

    return verificationToken
}