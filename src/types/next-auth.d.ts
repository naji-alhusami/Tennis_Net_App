// types/next-auth.d.ts
import { DefaultSession } from "next-auth";
import type { JWT as DefaultJWT } from "@auth/core/jwt";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: "PLAYER" | "COACH";
    };
  }

  // either delete this completely:
  // interface User {
  //   role: "PLAYER" | "COACH";
  //   id: string;
  // }

  // OR, if you really want it, make `role` optional to avoid adapter conflicts:
  // interface User {
  //   id: string;
  //   role?: "PLAYER" | "COACH";
  // }
}

declare module "@auth/core/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: "PLAYER" | "COACH";
  }
}

export {};
