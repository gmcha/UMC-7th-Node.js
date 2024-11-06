import { prisma } from "../db.config.js";

export const getAllStoreReviews = async (storeId, cursor = 0) => {
  const reviews = await prisma.userStoreReview.findMany({
    select: {
      id: true,
      content: true,
      storeId: true,
      userId: true,
      store: true,
      user: true,
    },
    where: { storeId: storeId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 5,
  });

  return reviews;
};