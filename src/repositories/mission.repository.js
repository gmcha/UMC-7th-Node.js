import { prisma } from "../db.config.js";

// 미션 추가
export const addMissionToStore = async (data) => {
  try {
    const mission = await prisma.mission.create({
      data: {
        storeId: data.storeId,
        reward: data.reward,
        deadline: data.deadline,
        missionSpec: data.missionSpec,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });

    return mission;  // Prisma는 객체 형식으로 결과를 반환하므로 insertId와 같은 필드는 따로 반환하지 않아도 됩니다.
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err.message})`);
  }
};
