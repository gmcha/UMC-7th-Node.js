export const bodyToUser = (body) => {
    const birth = new Date(body.birth);

    return {
      email: body.email,
      name: body.name,
      gender: body.gender,
      address: body.address || "",
      phoneNumber: body.phoneNumber,
      preferences: body.preferences,
    };
};

export const responseFromUser = ({ user, preferences }) => {
  const preferFoods = preferences.map(
    (preference) => preference.foodCategory.name
  );

  return {
    email: user.email,
    name: user.name,
    preferCategory: preferFoods,
  };
};

export const userInfoFromUser = (body) => {
  return {
    gender: body.gender,
    address: body.address,
    phoneNum: body.phoneNum,
  }
}