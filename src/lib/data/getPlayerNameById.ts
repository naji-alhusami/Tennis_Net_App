// import prisma from "../prisma/prisma"

// export const getPlayersNamesByIds = async (ids: string[]) => {
//   if (ids.length === 0) return []

//   return prisma.user.findMany({
//     where: {
//       id: { in: ids },
//     },
//     select: {
//       id: true,
//       name: true,
//     },
//   })
// }

import prisma from "../prisma/prisma";

function isMongoObjectId(v: string) {
  return /^[0-9a-fA-F]{24}$/.test(v);
}

export async function getPlayersNamesByIds(ids: string[]) {
  const safeIds = ids.filter(isMongoObjectId);
  if (safeIds.length === 0) return [];

  return prisma.user.findMany({
    where: { id: { in: safeIds } },
    select: { id: true, name: true, image: true, email: true },
  });
}
