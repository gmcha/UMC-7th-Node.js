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

export const getAllStoreMissions = async (storeId, cursor = 0) => {
  const missions = await prisma.mission.findMany({
    select: {
      id: true,
      reward: true,
      deadline: true,
      storeId: true,
      store: true,
      missionSpec: true,
    },
    where: { storeId: storeId, id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 3,
  });

  return missions;
};

export const getAllUserMissions = async (memberId, cursor = 0) => {
  const missions = await prisma.memberMission.findMany({
    select: {
      id: true,
      memberId: true,
      missionId: true,
      member: true,
      mission: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
    where: { memberId: memberId, status: '진행중', id: { gt: cursor } },
    orderBy: { id: "asc" },
    take: 3,
  });

  return missions;
};