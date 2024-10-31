import {
    getMemberMission,
    addMemberMission,
  } from "../repositories/missionChallenge.repository.js";
  
  export const challengeMission = async (memberId, missionId) => {
    // 이미 도전 중인 미션인지 확인
    const existingMission = await getMemberMission(memberId, missionId);
    if (existingMission) {
      throw new Error("이미 도전 중인 미션입니다.");
    }
  
    // 미션 도전 추가
    const newMissionId = await addMemberMission(memberId, missionId);
    return newMissionId;
  };
  