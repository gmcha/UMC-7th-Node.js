import { responseFromReview } from "../dtos/review.dto.js";
import { NonExistingStoreError } from "../errors.js";
import { addReview } from "../repositories/review.repository.js";
import { checkStoreExists } from "../repositories/store.repository.js";

export const submitReview = async (data) => {
  const storeExists = await checkStoreExists(data.storeId);
  
  if (!storeExists) {
    throw new NonExistingStoreError("존재하지 않는 가게입니다.", data);
  }

  const review = await addReview(data);
  return responseFromReview(review);
};
