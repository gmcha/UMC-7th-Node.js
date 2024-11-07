import { prisma } from "../db.config.js";

// 미션 도전 추가
export const addMissionChallenge = async ({ memberId, missionId }) => {
  try {
    // Prisma를 사용하여 member_mission 테이블에 데이터 삽입
    const newChallenge = await prisma.memberMission.create({
      data: {
        memberId: memberId,
        missionId: missionId,
        status: '진행중',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return newChallenge.id; // 추가된 미션 도전 ID 반환
  } catch (err) {
    throw new Error(`오류가 발생했습니다. (${err})`);
  }
};

// 도전 중인 미션 체크
export const checkMissionInProgress = async (memberId, missionId) => {
  try {
    // Prisma를 사용하여 member_mission 테이블에서 도전 중인 미션 여부 확인
    const missionCount = await prisma.memberMission.count({
      where: {
        memberId: memberId,
        missionId: missionId,
        status: '진행중',
      },
    });

    return missionCount > 0; // 진행 중인 미션이 있으면 true, 없으면 false
  } catch (err) {
    throw new Error(`오류가 발생했습니다. (${err})`);
  }
};
