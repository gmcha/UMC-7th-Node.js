import { StatusCodes } from "http-status-codes";
import { bodyToMission, bodyToMissionChallenge } from "../dtos/mission.dto.js";
import { addMission, listStoreMissions, listUserMissions } from "../services/mission.service.js";
import { challengeMission } from "../services/missionChallenge.service.js";

export const handleAddMission = async (req, res, next) => {
    /*
    #swagger.summary = '가게 미션 추가 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              storeId: { type: "number" },
              reward: { type: "number" },
              deadline: { type: "string" },
              missionSpec: { type: "string" },
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "가게 미션 추가 성공 응답",
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
                  storeId: { type: "number" },
                  reward: { type: "number" },
                  deadline: { type: "string" },
                  missionSpec: { type: "string" },
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "가게 미션 추가 실패 응답",
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
                      storeId: { type: "number" },
                      reward: { type: "number" },
                      deadline: { type: "string" },
                      missionSpec: { type: "string" },
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
  
  console.log("미션 추가를 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
    
  const mission = await addMission(bodyToMission(req.body));
  res.status(StatusCodes.OK).success( mission );
};

export const handleChallengeMission = async (req, res, next) => {
  /*
    #swagger.summary = '미션 도전 API';
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              memberId: { type: "number" },
              missionId: { type: "number" },
            }
          }
        }
      }
    };
    #swagger.responses[200] = {
      description: "미션 도전 성공 응답",
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
                  missionId: { type: "number" },
                  status: { type: "string", example: "진행중" },
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "미션 도전 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "MM001" },
                  reason: { type: "string" },
                  data: { 
                    type: "object",
                    properties: {
                      memberId: { type: "number" },
                      missionId: { type: "number" },
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
  console.log("미션 도전 요청을 받았습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
  
  const result = await challengeMission(bodyToMissionChallenge(req.body));
  res.status(StatusCodes.OK).success( result );
};

export const handleListStoreMissions = async (req, res, next) => {
  /*
    #swagger.summary = '가게 미션 목록 조회 API';
    #swagger.responses[200] = {
      description: "가게 미션 목록 조회 성공 응답",
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
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: { 
                        id: { type: "number" },
                        reward: { type: "number" },
                        deadline: { type: "string" },
                        storeId: { type: "number" },
                        store: { type: "object", properties: { id: { type: "number" }, name: { type: "string" } } },
                        missionSpec: { type: "string" },
                      }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "가게 미션 목록 조회 실패 응답",
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
                  data: { type: "object", nullable: true, example: null },
                }
              },
              success: { type: "object", nullable: true, example: null },
            }
          }
        }
      }
    };
  */
  
  const reviews = await listStoreMissions(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
};

export const handleListUserMissions = async (req, res, next) => {
  /*
    #swagger.summary = '진행 중인 미션 목록 조회 API';
    #swagger.responses[200] = {
      description: "진행 중인 미션 목록 조회 성공 응답",
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
                  data: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: { 
                        id: { type: "number" },
                        memberId: { type: "number" },
                        missionId: { type: "number" },
                        member: { type: "object", properties: { id: { type: "number" }, email: { type: "string" }, name: { type: "string" } } },
                        mission: { type: "object", properties: { id: { type: "number" }, storeId: { type: "number" }, reward: { type: "number" } } },
                        status: { type: "string" },
                        createdAt: { type: "string" },
                        updatedAt: { type: "string" },
                        }
                    }
                  },
                  pagination: { type: "object", properties: { cursor: { type: "number", nullable: true } }}
                }
              }
            }
          }
        }
      }
    };
    #swagger.responses[400] = {
      description: "진행 중인 미션 목록 조회 실패 응답",
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              resultType: { type: "string", example: "FAIL" },
              error: {
                type: "object",
                properties: {
                  errorCode: { type: "string", example: "M001" },
                  reason: { type: "string" },
                  data: { type: "object", nullable: true, example: null },
                }
              },
              success: { type: "object", nullable: true, example: null },
            }
          }
        }
      }
    };
  */
  
  const reviews = await listUserMissions(
    parseInt(req.params.userId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).success(reviews);
};