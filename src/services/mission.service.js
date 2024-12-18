import { responseFromMission, responseFromMissionList } from "../dtos/mission.dto.js";
import { addMissionToStore, getAllStoreMissions, getAllUserMissions } from "../repositories/mission.repository.js";
import { NonExistingStoreError, NonExistingMemberError } from "../errors.js";
import { checkStoreExists } from "../repositories/store.repository.js";
import { checkMemberExists } from '../repositories/user.repository.js';

export const addMission = async (data) => {
  const storeExists = await checkStoreExists(data.storeId);
  
  if (!storeExists) {
    throw new NonExistingStoreError("존재하지 않는 가게입니다.", data);
  }

  const mission = await addMissionToStore(data);
  return responseFromMission(mission);
};

export const listStoreMissions = async (storeId, cursor) => {
  const storeExists = await checkStoreExists(storeId);

  if (!storeExists) {
    throw new NonExistingStoreError("존재하지 않는 가게입니다.");
  }

  const missions = await getAllStoreMissions(storeId, cursor);
  return responseFromMissionList(missions);
};

export const listUserMissions = async (memberId, cursor) => {
  const memberExists = await checkMemberExists(memberId);

  if (!memberExists) {
    throw new NonExistingMemberError("존재하지 않는 사용자입니다.");
  }

  const missions = await getAllUserMissions(memberId, cursor);
  return responseFromMissionList(missions);
};