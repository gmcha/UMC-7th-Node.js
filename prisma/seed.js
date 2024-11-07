import { prisma } from "../db.config.js"; // Prisma 클라이언트 가져오기

async function seedData() {
  try {
    // Terms 데이터 생성
    await prisma.terms.createMany({
      data: [
        { title: 'Privacy Policy', body: 'Details about privacy.', optional: true, createdAt: new Date(), updatedAt: new Date() },
        { title: 'Terms of Service', body: 'Details about service.', optional: false, createdAt: new Date(), updatedAt: new Date() },
      ],
    });

    // FoodCategory 데이터 생성
    await prisma.foodCategory.createMany({
      data: [
        { name: 'Pizza', Column4: 'Food' },
        { name: 'Burgers', Column4: 'Food' },
      ],
    });

    // Member 데이터 생성
    await prisma.member.createMany({
      data: [
        { name: 'John Doe', gender: 'Male', age: 28, address: '123 Main St', spec_address: 'Suite 100', status: 'active', inactive_date: null, social_type: 'type1', createdAt: new Date(), updatedAt: new Date(), email: 'john@example.com', point: 100, phone_num: '010-1111-1111' },
        { name: 'Jane Doe', gender: 'Female', age: 25, address: '456 Oak St', spec_address: 'Apt 200', status: 'active', inactive_date: null, social_type: 'type2', createdAt: new Date(), updatedAt: new Date(), email: 'jane@example.com', point: 200, phone_num: '010-1111-1111' },
      ],
    });

    // Region 데이터 생성
    await prisma.region.createMany({
      data: [
        { name: 'Seoul', createdAt: new Date(), updatedAt: new Date() },
        { name: 'Busan', createdAt: new Date(), updatedAt: new Date() },
      ],
    });

    // Store 데이터 생성
    await prisma.store.createMany({
      data: [
        { region_id: 1, name: 'Awesome Store', address: '789 Store Ave', score: 4.5, createdAt: new Date(), updatedAt: new Date() },
        { region_id: 2, name: 'Great Shop', address: '101 River Rd', score: 4.7, createdAt: new Date(), updatedAt: new Date() },
      ],
    });

    // Mission 데이터 생성
    await prisma.mission.createMany({
      data: [
        { store_id: 1, reward: 500, deadline: new Date('2024-12-31T23:59:59'), mission_spec: 'Complete 5 purchases', createdAt: new Date(), updatedAt: new Date() },
        { store_id: 2, reward: 300, deadline: new Date('2024-10-31T23:59:59'), mission_spec: 'Write 2 reviews', createdAt: new Date(), updatedAt: new Date() },
      ],
    });

    // MemberMission 데이터 생성
    await prisma.memberMission.createMany({
      data: [
        { member_id: 1, mission_id: 1, status: '진행중', createdAt: new Date(), updatedAt: new Date() },
        { member_id: 2, mission_id: 2, status: '진행완료', createdAt: new Date(), updatedAt: new Date() },
      ],
    });

    // Review 데이터 생성
    await prisma.review.createMany({
      data: [
        { member_id: 1, store_id: 1, body: 'Great experience!', score: 5.0, createdAt: new Date() },
        { member_id: 2, store_id: 2, body: 'Nice shop!', score: 4.8, createdAt: new Date() },
      ],
    });

    // ReviewImage 데이터 생성
    await prisma.reviewImage.createMany({
      data: [
        { review_id: 1, store_id: 1, image_url: 'http://example.com/image1.jpg', createdAt: new Date(), updatedAt: new Date() },
        { review_id: 2, store_id: 2, image_url: 'http://example.com/image2.jpg', createdAt: new Date(), updatedAt: new Date() },
      ],
    });

    // MemberAgree 데이터 생성
    await prisma.memberAgree.createMany({
      data: [
        { member_id: 1, terms_id: 1, createdAt: new Date(), updatedAt: new Date() },
        { member_id: 2, terms_id: 2, createdAt: new Date(), updatedAt: new Date() },
      ],
    });

    // MemberPrefer 데이터 생성
    await prisma.memberPrefer.createMany({
      data: [
        { member_id: 1, category_id: 1, createdAt: new Date(), updatedAt: new Date() },
        { member_id: 2, category_id: 2, createdAt: new Date(), updatedAt: new Date() },
      ],
    });

    // member_mission에서 member_id가 2이고 mission_id가 1인 항목 삭제
    await prisma.memberMission.deleteMany({
      where: {
        member_id: 2,
        mission_id: 1,
      },
    });

    console.log('데이터가 성공적으로 생성되었습니다.');
  } catch (error) {
    console.error(`데이터 생성 중 오류가 발생했습니다: ${error.message}`);
  } finally {
    await prisma.$disconnect();
  }
}

seedData();
