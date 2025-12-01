import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Instagram from "next-auth/providers/instagram";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import prisma from "./lib/prisma";
import { getUserById } from "./data/getUserById";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "jwt",
  },

  debug: process.env.NODE_ENV === "development",

  pages: {
    signIn: "/",
  },

  providers: [
    // TODO: I should go back to verfiy email function for google and instagram
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),

    Instagram({
      clientId: process.env.AUTH_INSTAGRAM_ID as string,
      clientSecret: process.env.AUTH_INSTAGRAM_SECRET as string,
    }),

    Credentials({
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(rawCredentials) {
        const { email, password } = rawCredentials as {
          email: string;
          password: string;
        };

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user || !user.hashedPassword) {
          return null;
        }

        const isCorrectPassword = await bcrypt.compare(
          password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          role: user.role,
          name: user.name,
        };
      },
    }),
  ],

  callbacks: {
    // Optional: block OAuth (Google/Instagram) if email not verified
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        return true;
      }

      const existingUser = await getUserById(user?.id ?? "");

      // user logged in with Google/Instagram but email not verified in DB
      if (!existingUser?.emailVerified) {
        return false; // Auth.js will redirect back with ?error=AccessDenied
      }

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.name = token.name;
      }
      return session;
    },
  },
});
