import { responseFromMission } from "../dtos/mission.dto.js";
import { addMissionToStore } from "../repositories/mission.repository.js";

export const addMission = async (data) => {
  const mission = await addMissionToStore(data);
  return responseFromMission(mission);
};
