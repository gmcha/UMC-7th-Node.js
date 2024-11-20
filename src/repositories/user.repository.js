import { prisma } from "../db.config.js";

// User 데이터 삽입
export const addUser = async (data) => {
  const user = await prisma.member.findFirst({ where: { email: data.email } });
  if (user) {
    return null;
  }

  const created = await prisma.member.create({ data: data });
  return created.id;
};

// 사용자 정보 얻기
export const getUser = async (userId) => {
  const user = await prisma.member.findFirstOrThrow({ where: { id: userId } });
  return user;
};

// 음식 선호 카테고리 매핑
export const setPreference = async (userId, foodCategoryId) => {
  try {
    await prisma.MemberPrefer.create({
      data: {
        memberId: userId,
        categoryId: foodCategoryId,
      },
    });
  } catch (error) {
    // 'foreign key constraint failed' 에러를 무시하고 넘어감
    if (error.code === 'P2003') {  // Prisma에서 foreign key constraint 에러 코드가 'P2003'임
      console.warn("Foreign key constraint violation ignored");
    } else {
      console.error("Error setting preference:", error);
      throw error; // 다른 에러는 다시 throw하여 상위에서 처리 가능하도록 함
    }
  }
};

// 사용자 선호 카테고리 반환
export const getUserPreferencesByUserId = async (userId) => {
  const preferences = await prisma.MemberPrefer.findMany({
    select: {
      id: true,
      memberId: true,
      categoryId: true,
      category: true,
    },
    where: { memberId: userId },
    orderBy: { categoryId: "asc" },
  });

  return preferences;
};

export const getAllUserReviews = async (userId, cursor = 0) => {
  const reviews = await prisma.review.findMany({
    select: {
      id: true,
      body: true,
      score: true,
      storeId: true,
      memberId: true,
      store: true,
      member: true,
    },
    where: { memberId: userId, id: { gt: cursor }},
    orderBy: { id: "asc" },
    take: 2,
  });

  return reviews;
};

export const checkMemberExists = async (userId) => {
  const member = await prisma.member.findUnique({
    where: {
      id: userId,
    },
  });

  return member !== null;  // store가 존재하면 true 반환
};