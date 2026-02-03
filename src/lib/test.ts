// TODO: Replace with Prisma query:

import { Conversation, Prisma } from "@prisma/client";

export const CURRENT_USER_ID = "69792fa77a8660caa0d26c08"; // Naji

// This matches what you'll later query via:
// prisma.conversation.findMany({ include: { participants: { include: { user: true }}}})
export type ConversationWithParticipants = Prisma.ConversationGetPayload<{
  include: {
    participants: {
      include: {
        user: true;
      };
    };
  };
}>;

export const conversationsMock: Conversation[] = [
  // ===== 1:1 (Naji + Test Player A) =====
  {
    id: "66a200000000000000000201",
    name: null,
    isGroup: false,
    ownerId: CURRENT_USER_ID,
    participants: [
      {
        id: "77c300000000000000000301",
        conversationId: "66a200000000000000000201",
        userId: CURRENT_USER_ID,
        lastSeenAt: "2026-02-03T08:59:00.000Z",
        joinedAt: "2026-02-01T10:00:00.000Z",
        user: {
          id: CURRENT_USER_ID,
          name: "Naji Alhusami",
          image:
            "https://z4auuzwwqqtqky9.public.blob.vercel-storage.com/profile/69792f…",
        },
      },
      {
        id: "77c300000000000000000302",
        conversationId: "66a200000000000000000201",
        userId: "6968164928646c4936123943",
        lastSeenAt: "2026-02-03T07:00:00.000Z",
        joinedAt: "2026-02-01T10:00:00.000Z",
        user: {
          id: "6968164928646c4936123943",
          name: "Test Player A",
          image: null,
        },
      },
    ],
  },

  // ===== 1:1 (Naji + Test Player B) =====
  {
    id: "66a200000000000000000202",
    name: null,
    isGroup: false,
    ownerId: CURRENT_USER_ID,
    participants: [
      {
        id: "77c300000000000000000303",
        conversationId: "66a200000000000000000202",
        userId: CURRENT_USER_ID,
        lastSeenAt: "2026-02-02T20:30:00.000Z",
        joinedAt: "2026-02-01T11:00:00.000Z",
        user: {
          id: CURRENT_USER_ID,
          name: "Naji Alhusami",
          image:
            "https://z4auuzwwqqtqky9.public.blob.vercel-storage.com/profile/69792f…",
        },
      },
      {
        id: "77c300000000000000000304",
        conversationId: "66a200000000000000000202",
        userId: "6968164928646c4936123944",
        lastSeenAt: "2026-02-02T19:00:00.000Z",
        joinedAt: "2026-02-01T11:00:00.000Z",
        user: {
          id: "6968164928646c4936123944",
          name: "Test Player B",
          image: null,
        },
      },
    ],
  },

  // ===== Group (Naji + A + C) =====
  {
    id: "66a200000000000000000203",
    name: "Weekend Doubles",
    isGroup: true,
    ownerId: CURRENT_USER_ID,
    participants: [
      {
        id: "77c300000000000000000305",
        conversationId: "66a200000000000000000203",
        userId: CURRENT_USER_ID,
        lastSeenAt: "2026-02-01T17:50:00.000Z",
        joinedAt: "2026-01-30T18:00:00.000Z",
        user: {
          id: CURRENT_USER_ID,
          name: "Naji Alhusami",
          image:
            "https://z4auuzwwqqtqky9.public.blob.vercel-storage.com/profile/69792f…",
        },
      },
      {
        id: "77c300000000000000000306",
        conversationId: "66a200000000000000000203",
        userId: "6968164928646c4936123943",
        lastSeenAt: "2026-02-01T16:00:00.000Z",
        joinedAt: "2026-01-30T18:00:00.000Z",
        user: {
          id: "6968164928646c4936123943",
          name: "Test Player A",
          image: null,
        },
      },
      {
        id: "77c300000000000000000307",
        conversationId: "66a200000000000000000203",
        userId: "6968164928646c4936123945",
        lastSeenAt: "2026-02-01T18:00:00.000Z",
        joinedAt: "2026-01-30T18:00:00.000Z",
        user: {
          id: "6968164928646c4936123945",
          name: "Test Player C",
          image: null,
        },
      },
    ],
  },
];
