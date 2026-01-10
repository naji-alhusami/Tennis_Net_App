import prisma from "../prisma/prisma";
import { isValidMongoObjectId } from "../utils/isValidMongoObjectId";

export async function getPlayersNamesByIds(ids: string[]) {
  const safeIds = ids.filter(isValidMongoObjectId);
  if (safeIds.length === 0) return [];

  return prisma.user.findMany({
    where: { id: { in: safeIds } },
    select: { id: true, name: true, image: true, email: true },
  });
}
