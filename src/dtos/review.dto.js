// review.dto.js
export const bodyToReview = (body) => {
  return {
    memberId: body.memberId,
    storeId: body.storeId,
    body: body.body,
    score: body.score,
    createdAt: new Date(),
  };
};

export const responseFromReview = (review) => {
  return {
    id: review.id,
    memberId: review.member_id,
    storeId: review.store_id,
    body: review.body,
    score: review.score,
    createdAt: review.created_at,
  };
};
