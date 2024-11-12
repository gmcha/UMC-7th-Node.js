import { prisma } from "../db.config.js";

export const getAllStoreReviews = async (storeId, cursor = 0) => {
  const reviews = await prisma.review.findMany({
    select: {
      id: true,
      score: true,
      body: true,
      storeId: true,
      memberId: true,
      store: true,
      member: true,
    },
    where: { storeId: storeId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 2,
  });

  return reviews;
};