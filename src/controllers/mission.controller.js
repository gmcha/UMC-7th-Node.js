import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { addMission } from "../services/mission.service.js";
import { challengeMission } from "../services/missionChallenge.service.js";

export const handleAddMission = async (req, res, next) => {
  try {
    const mission = await addMission(bodyToMission(req.body));
    res.status(StatusCodes.CREATED).json({ result: mission });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
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