import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as NaverStrategy } from "passport-naver";
import { prisma } from "./db.config.js";

dotenv.config();

const googleVerify = async (profile) => {
  const email = profile.emails?.[0]?.value;
  if (!email) {
    throw new Error(`profile.email was not found: ${profile}`);
  }

  const user = await prisma.member.findFirst({ where: { email } });
  if (user !== null) {
    return { id: user.id, email: user.email, name: user.name };
  }

  const created = await prisma.member.create({
    data: {
      email,
      name: profile.displayName,
      gender: "추후 수정",
      address: "추후 수정",
      phoneNum: "추후 수정",
    },
  });

  return { id: created.id, email: created.email, name: created.name };
};

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/callback/google",
    scope: ["email", "profile"],
    state: true,
  },
  (accessToken, refreshToken, profile, cb) => {
    return googleVerify(profile)
      .then((user) => cb(null, user))
      .catch((err) => cb(err));
  }
);

const naverVerify = async (profile) => {
  console.log("Naver Profile:", JSON.stringify(profile, null, 2));

  let email = profile.emails?.[0]?.value; //?.=> 존재하지 않아도 에러를 방지함
  if (!email) {
    email = "추후 수정 (네이버)";
  }

  const user = await prisma.member.findFirst({
    where: {
      AND: [
        { email: { not: "추후 수정 (네이버)" } }, // "추후 수정"이 아닌 이메일
        { email: email },                // email 변수의 값과 일치
      ],
    },
  });  
  if (user !== null) {
    return { id: user.id, email: user.email, name: user.name };
  }

  const created = await prisma.member.create({ // 사용자가 없을 경우 새 사용자 생성
    data: {
      email,
      name: "추후 수정",
      gender: "추후 수정",
      address: "추후 수정",
      phoneNum: "추후 수정",
    },
  });

  return { id: created.id, email: created.email, name: created.name };
};

export const naverStrategy = new NaverStrategy(
  {
    clientID: process.env.PASSPORT_NAVER_CLIENT_ID,
    clientSecret: process.env.PASSPORT_NAVER_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/oauth2/callback/naver",
  },
  (accessToken, refreshToken, profile, done) => {
    return naverVerify(profile) //profile 데이터를 넘겨 사용자 인증 과정 처리
      .then((user) => done(null, user)) //Passport에 인증 성공을 알림
      .catch((err) => done(err)); //오류 처리
  }
);

