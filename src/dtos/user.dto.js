export const bodyToUser = (body) => {
    const birth = new Date(body.birth);

    return {
      email: body.email,
      name: body.name,
      gender: body.gender,
      birth,
      address: body.address || "",
      detailAddress: body.detailAddress || "",
      phoneNumber: body.phoneNumber,
      preferences: body.preferences,
    };
};

export const responseFromUser = (body) => {
    console.log("정상적으로 회원가입되었습니다!");
    //console.log(`사용자 ${body.name}가 선호하는 음식 카테고리는 ${body.preferences}입니다.`)
};