import { StatusCodes } from "http-status-codes";
import { bodyToMission } from "../dtos/mission.dto.js";
import { addMission } from "../services/mission.service.js";

export const handleAddMission = async (req, res, next) => {
  try {
    const mission = await addMission(bodyToMission(req.body));
    res.status(StatusCodes.CREATED).json({ result: mission });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};
