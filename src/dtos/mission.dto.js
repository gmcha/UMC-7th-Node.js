export const bodyToMission = (body) => {
    return {
      storeId: body.storeId,
      reward: body.reward,
      deadline: new Date(body.deadline),
      missionSpec: body.missionSpec,
    };
  };
  