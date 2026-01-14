import prisma from "../prisma/prisma";
import { isValidMongoObjectId } from "../utils/isValidMongoObjectId";

export async function getPlayersNamesByIds(ids: string[]) {
  const checkIds = ids.filter(isValidMongoObjectId);
  if (checkIds.length === 0) return [];

  return prisma.user.findMany({
    where: { id: { in: checkIds } },
    select: { id: true, name: true, image: true, email: true },
  });
}
