import { responseFromReviews } from "../dtos/store.dto.js";
import { getAllStoreReviews } from "../repositories/store.repository.js"
import { checkStoreExists } from "../repositories/store.repository.js";
import { NonExistingStoreError } from "../errors.js";

export const listStoreReviews = async (storeId, cursor) => {
    const storeExists = await checkStoreExists(storeId);

    if (!storeExists) {
        throw new NonExistingStoreError("존재하지 않는 가게입니다.");
    }

    const reviews = await getAllStoreReviews(storeId, cursor);
    return responseFromReviews(reviews);
};