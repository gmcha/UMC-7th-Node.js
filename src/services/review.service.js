import { responseFromReview } from "../dtos/review.dto.js";
import { addReview, checkStoreExists } from "../repositories/review.repository.js";

export const submitReview = async (data) => {
  const storeExists = await checkStoreExists(data.storeId);
  
  if (!storeExists) {
    throw new Error("존재하지 않는 가게입니다.");
  }

  const review = await addReview(data);
  return responseFromReview(review);
};
