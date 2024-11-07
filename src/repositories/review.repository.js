import { prisma } from "../db.config.js";

// 리뷰 추가
export const addReview = async (data) => {
  try {
    const review = await prisma.userStoreReview.create({
      data: {
        storeId: data.storeId,
        userId: data.memberId,
        content: data.body,
        // 다른 필드들도 추가할 수 있습니다.
      },
    });

    return review;  // Prisma는 객체 형식으로 결과를 반환하므로 insertId와 같은 필드는 따로 반환하지 않아도 됩니다.
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err.message})`);
  }
};

// 매장 존재 여부 체크
export const checkStoreExists = async (storeId) => {
  try {
    const store = await prisma.store.findUnique({
      where: {
        id: storeId,
      },
    });

    return store !== null;  // store가 존재하면 true 반환
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err.message})`);
  }
};
