import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // 더미 사용자 생성
  const user1 = await prisma.user.create({
    data: {
      email: "user1@example.com",
      name: "User One",
      gender: "Male",
      birth: new Date('1990-01-01'),
      address: "123 Main Street",
      phoneNumber: "010-1234-5678"
    }
  });

  const user2 = await prisma.user.create({
    data: {
      email: "user2@example.com",
      name: "User Two",
      gender: "Female",
      birth: new Date('1992-02-02'),
      address: "456 Elm Street",
      phoneNumber: "010-9876-5432"
    }
  });

  // 더미 음식 카테고리 생성
  const foodCategory1 = await prisma.foodCategory.create({
    data: {
      name: "Italian"
    }
  });

  const foodCategory2 = await prisma.foodCategory.create({
    data: {
      name: "Korean"
    }
  });

  // 더미 매장 생성
  const store1 = await prisma.store.create({
    data: {
      name: "Pizza Place"
    }
  });

  const store2 = await prisma.store.create({
    data: {
      name: "Korean BBQ"
    }
  });

  // 더미 리뷰 생성
  await prisma.userStoreReview.create({
    data: {
      content: "Great pizza, will visit again!",
      storeId: store1.id,
      userId: user1.id
    }
  });

  await prisma.userStoreReview.create({
    data: {
      content: "Loved the BBQ, the best I’ve had!",
      storeId: store2.id,
      userId: user2.id
    }
  });

  console.log("Seeding completed");
}

main()
  .catch(e => {
    throw e
  })
  .finally(async () => {
    await prisma.$disconnect()
  });
