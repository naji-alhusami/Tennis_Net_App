import prisma from "../prisma/prisma";
import { isValidMongoObjectId } from "../utils/isValidMongoObjectId";

export async function getMyFriends(userId: string) {
  // To prevent sending invalid ids to Prisma
  if (!isValidMongoObjectId(userId)) return [];

  const friendships = await prisma.friendship.findMany({
    where: {
      OR: [{ userOneId: userId }, { userTwoId: userId }],
    },
    select: {
      userOneId: true,
      userTwoId: true,
      userOne: { select: { id: true, name: true, image: true, email: true } },
      userTwo: { select: { id: true, name: true, image: true, email: true } },
    },
  });

  const friends = friendships.map((friend) =>
    friend.userOneId === userId ? friend.userTwo : friend.userOne
  );

  // return new Map(friends.map((friend) => [friend.id, friend])).values();
  return friends;
}
