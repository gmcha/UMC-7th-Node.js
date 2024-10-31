import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { submitReview } from "../services/review.service.js";

export const handleAddReview = async (req, res) => {
    const reviewData = bodyToReview(req.body);
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

    const review = await submitReview(reviewData);
    res.status(StatusCodes.OK).json({ result: review });
};
