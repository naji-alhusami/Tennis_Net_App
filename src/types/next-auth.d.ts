import { DefaultSession } from "next-auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "PLAYER" | "COACH";
    } & DefaultSession["user"];
  }

  interface User {
    id: string;
    role: "PLAYER" | "COACH";
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string;
    role: "PLAYER" | "COACH";
  }
}
