import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { addMission } from "../services/mission.service.js";
import { challengeMission } from "../services/missionChallenge.service.js";

export const handleAddMission = async (req, res, next) => {
    console.log("미션 추가를 요청했습니다!");
    console.log("body:", req.body); // 값이 잘 들어오나 확인하기 위한 테스트용
    
    const mission = await addMission(bodyToMission(req.body));
    res.status(StatusCodes.OK).json({ result: mission });
};

export const handleChallengeMission = async (req, res, next) => {
    const { memberId, missionId } = req.body;
  
    try {
      const result = await challengeMission(memberId, missionId);
      res.status(StatusCodes.CREATED).json({ result });
    } catch (error) {
      console.error(error);
      res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
    }
  };