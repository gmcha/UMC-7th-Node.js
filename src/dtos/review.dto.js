export const bodyToReview = (body) => {
  return {
    memberId: body.memberId || "",
    storeId: body.storeId || "",
    body: body.body,
    score: body.score || "",
  };
};

export const responseFromReview = (review) => {
  return {
    id: review.id,
    memberId: review.memberId,
    storeId: review.storeId,
    body: review.body,
    score: review.score,
  };
};
