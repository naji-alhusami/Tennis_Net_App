import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
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
    Google({
      clientId: process.env.AUTH_GOOGLE_ID as string,
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
      allowDangerousEmailAccountLinking: true,
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
    async signIn({ user, account, profile }) {
      // 1) Credentials: check my emailVerified
      if (account?.provider === "credentials") {
        const existingUser = await getUserById(user?.id ?? "");

        if (!existingUser?.emailVerified) {
          return false; // ?error=AccessDenied
        }
        return true;
      }

      // 2) Google: trust email_verified from Google
      if (account?.provider === "google") {
        const googleEmailVerified = profile?.email_verified;

        // Block only if Google explicitly says false
        if (!googleEmailVerified) {
          return false; // ?error=AccessDenied
        }

        // No DB writes here!
        return true;
      }

      // Other providers
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

  events: {
    async signIn({ user, account }) {
      // Only for Google users
      if (account?.provider === "google") {
        await prisma.user.update({
          where: { id: user.id as string },
          data: { emailVerified: new Date() },
        });
      }
    },
  },
});
