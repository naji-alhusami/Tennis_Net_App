import { type UserRole } from "@prisma/client";

export type IncomingRequest = {
  id: string;
  requestDate: string;
  name: string;
  image: string | null;
  role: UserRole;
  fromUserId: string;
  toUserId: string;
};
