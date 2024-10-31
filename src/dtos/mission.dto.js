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
    storeId: body.storeId ,
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

export const responseFromMissionChallenge = (challengeId) => {
  return {
    message: "미션에 도전하였습니다.",
    challengeId,
  };
};
