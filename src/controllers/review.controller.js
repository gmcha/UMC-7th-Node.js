// review.controller.js
import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { submitReview } from "../services/review.service.js";

export const handleAddReview = async (req, res) => {
  try {
    const reviewData = bodyToReview(req.body);
    const review = await submitReview(reviewData);
    res.status(StatusCodes.CREATED).json({ result: review });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};
