import {
  addMissionChallenge,
  checkMissionInProgress,
} from "../repositories/missionChallenge.repository.js";
import { responseFromMissionChallenge } from "../dtos/mission.dto.js"; // 응답 DTO 추가
import { MissionAlreadyInProgress } from "../errors.js"

export const challengeMission = async (data) => {
  // 이미 도전 중인지 확인
  const isInProgress = await checkMissionInProgress(data);
  if (isInProgress) {
    throw new MissionAlreadyInProgress("이미 도전 중인 미션입니다.", data);
  }

  // 도전하기
  const challenge = await addMissionChallenge(data);
  return responseFromMissionChallenge(challenge);
};
