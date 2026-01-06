import prisma from "../prisma/prisma"
import { CourtType, CourtLocation } from "@/generated/prisma"

export async function getCourtGroupsIds(
  courtTypeParams: CourtType,
  courtLocationParams: CourtLocation
) {
  const courts = await prisma.court.findMany({
    where: {
      type: courtTypeParams,
      location: courtLocationParams,
    },
    select: { id: true },
  })

  return courts.map((court) => court.id)
}
