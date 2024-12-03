import { prisma } from "../db.config.js";

// 매장 존재 여부 체크
export const checkStoreExists = async (storeId) => {
  const store = await prisma.store.findUnique({
    where: {
      id: storeId,
    },
  });

  return store !== null;  // store가 존재하면 true 반환
};

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