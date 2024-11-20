import { StatusCodes } from "http-status-codes";
import { bodyToReview } from "../dtos/review.dto.js";
import { submitReview } from "../services/review.service.js";

export const handleAddReview = async (req, res, next) => {
    /*
     #swagger.summary = '가게 리뷰 추가 API';
     #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        memberId: { type: "number" },
                        storeId: { type: "number" },
                        body: { type: "string" },
                        score: { type: "number" }
                    }
                }
            }
        }
     };
     #swagger.responses[200] = {
        description: "가게 리뷰 추가 성공 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string", example: "SUCCESS" },
                        error: { type: "object", nullable: true, example: null },
                        success: {
                            type: "object",
                            properties: {
                                id: { type: "number" },
                                memberId: { type: "number" },
                                storeId: { type: "number" },
                                body: { type: "string" },
                                score: { type: "number" },
                            }
                        }
                    }
                }
            }
        }
     };
     #swagger.responses[400] = {
        description: "가게 리뷰 추가 응답",
        content: {
            "application/json": {
                schema: {
                    type: "object",
                    properties: {
                        resultType: { type: "string", example: "FAIL" },
                        error: {
                            type: "object",
                            properties: {
                                errorCode: { type: "string", example: "S001" },
                                reason: { type: "string" },
                                data: { 
                                    type: "object",
                                    properties: {
                                        memberId: { type: "number" },
                                        storeId: { type: "number" },
                                        body: { type: "string" },
                                        score: { type: "number" }
                                    }
                                }
                            }
                        },
                        success: { type: "object", nullable: true, example: null }
                    }
                }
            }
        }
    };
    */
    
    console.log("리뷰 추가를 요청했습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용  

    const review = await submitReview(bodyToReview(req.body));
    res.status(StatusCodes.OK).success(review);
};
