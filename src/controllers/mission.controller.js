import { StatusCodes } from "http-status-codes";
import { bodyToMission, bodyToMissionChallenge } from "../dtos/mission.dto.js";
import { addMission, listStoreMissions, listUserMissions } from "../services/mission.service.js";
import { challengeMission } from "../services/missionChallenge.service.js";

export const handleAddMission = async (req, res, next) => {
  console.log("미션 추가를 요청했습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
    
  const mission = await addMission(bodyToMission(req.body));
  res.status(StatusCodes.OK).json({ result: mission });
};

export const handleChallengeMission = async (req, res, next) => {
  console.log("미션 도전 요청을 받았습니다!");
  console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
  
  const result = await challengeMission(bodyToMissionChallenge(req.body));
  res.status(StatusCodes.OK).json({ result });
};

export const handleListStoreMissions = async (req, res, next) => {
  const reviews = await listStoreMissions(
    parseInt(req.params.storeId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).json(reviews);
};

export const handleListUserMissions = async (req, res, next) => {
  const reviews = await listUserMissions(
    parseInt(req.params.userId),
    typeof req.query.cursor === "string" ? parseInt(req.query.cursor) : 0
  );
  res.status(StatusCodes.OK).json(reviews);
};