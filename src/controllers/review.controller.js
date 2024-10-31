import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { submitReview } from "../services/review.service.js";

export const handleAddReview = async (req, res) => {
    console.log("리뷰 추가를 요청했습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용

    const review = await submitReview(bodyToReview(req.body));
    res.status(StatusCodes.OK).json({ result: review });
};
