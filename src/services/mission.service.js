import { addMissionToStore } from "../repositories/mission.repository.js";
import { getStoreById } from "../repositories/store.repository.js";

export const addMission = async (data) => {
  const store = await getStoreById(data.storeId);
  
  if (!store) {
    throw new Error("존재하지 않는 가게입니다.");
  }

  return await addMissionToStore(data);
};
