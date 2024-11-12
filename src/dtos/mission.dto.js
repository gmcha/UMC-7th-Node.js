export const bodyToMission = (body) => {
  return {
    storeId: body.storeId || "",
    reward: body.reward || "",
    deadline: new Date(body.deadline),
    missionSpec: body.missionSpec || "",
  };
};

export const responseFromMission = (body) => {
  return {
    storeId: body.storeId,
    reward: body.reward,
    deadline: body.deadline,
    missionSpec: body.missionSpec,
  };
};

export const bodyToMissionChallenge = (body) => {
  return {
    memberId: body.memberId || "",
    missionId: body.missionId || "",
  };
};

export const responseFromMissionChallenge = (challenge) => {
  return {
    missionId: challenge.missionId,
    status: challenge.status,
  };
};

export const responseFromMissionList = (missions) => {
  return {
    data: missions,
    pagination: {
      cursor: missions.length ? missions[missions.length - 1].id : null,
    },
  };
};
