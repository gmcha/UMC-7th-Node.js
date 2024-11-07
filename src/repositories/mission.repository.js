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

    return mission.id;  // Prisma는 생성된 객체를 반환하므로, id 값을 반환
  } catch (err) {
    throw new Error(`오류가 발생했어요. 요청 파라미터를 확인해주세요. (${err.message})`);
  }
};
