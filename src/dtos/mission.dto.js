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