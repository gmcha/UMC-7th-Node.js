import { prisma } from "../db.config.js";

// 리뷰 추가
export const addReview = async (data) => {
    const review = await prisma.Review.create({
      data: {
        memberId: data.memberId,
        storeId: data.storeId,
        body: data.body,
        score: data.score,
      },
    });

    return review;  // Prisma는 객체 형식으로 결과를 반환하므로 insertId와 같은 필드는 따로 반환하지 않아도 됩니다.
};

// 매장 존재 여부 체크
export const checkStoreExists = async (storeId) => {
    const store = await prisma.store.findUnique({
      where: {
        id: storeId,
      },
    });

    return store !== null;  // store가 존재하면 true 반환
};
