import { responseFromMission, responseFromMissionList } from "../dtos/mission.dto.js";
import { addMissionToStore, getAllStoreMissions } from "../repositories/mission.repository.js";

export const addMission = async (data) => {
  const mission = await addMissionToStore(data);
  return responseFromMission(mission);
};

export const listStoreMissions = async (storeId, cursor) => {
  const missions = await getAllStoreMissions(storeId, cursor);
  return responseFromMissionList(missions);
};