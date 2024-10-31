import {
  addMissionChallenge,
  checkMissionInProgress,
} from "../repositories/missionChallenge.repository.js";
import { responseFromMissionChallenge } from "../dtos/mission.dto.js"; // 응답 DTO 추가

export const challengeMission = async ({ memberId, missionId }) => {
  // 이미 도전 중인지 확인
  const isInProgress = await checkMissionInProgress(memberId, missionId);
  if (isInProgress) {
    throw new Error("이미 도전 중인 미션입니다.");
  }

  // 도전하기
  const challengeId = await addMissionChallenge({ memberId, missionId });
  return responseFromMissionChallenge(challengeId);
};
