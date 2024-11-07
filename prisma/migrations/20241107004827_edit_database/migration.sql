/*
  Warnings:

  - You are about to drop the `FoodCategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Member` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MemberAgree` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MemberMission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `MemberPrefer` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Mission` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Region` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Review` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ReviewImage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Store` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Terms` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `MemberAgree` DROP FOREIGN KEY `MemberAgree_memberId_fkey`;

-- DropForeignKey
ALTER TABLE `MemberAgree` DROP FOREIGN KEY `MemberAgree_termsId_fkey`;

-- DropForeignKey
ALTER TABLE `MemberMission` DROP FOREIGN KEY `MemberMission_memberId_fkey`;

-- DropForeignKey
ALTER TABLE `MemberMission` DROP FOREIGN KEY `MemberMission_missionId_fkey`;

-- DropForeignKey
ALTER TABLE `MemberPrefer` DROP FOREIGN KEY `MemberPrefer_categoryId_fkey`;

-- DropForeignKey
ALTER TABLE `MemberPrefer` DROP FOREIGN KEY `MemberPrefer_memberId_fkey`;

-- DropForeignKey
ALTER TABLE `Mission` DROP FOREIGN KEY `Mission_storeId_fkey`;

-- DropForeignKey
ALTER TABLE `Review` DROP FOREIGN KEY `Review_memberId_fkey`;

-- DropForeignKey
ALTER TABLE `Review` DROP FOREIGN KEY `Review_storeId_fkey`;

-- DropForeignKey
ALTER TABLE `ReviewImage` DROP FOREIGN KEY `ReviewImage_reviewId_fkey`;

-- DropForeignKey
ALTER TABLE `ReviewImage` DROP FOREIGN KEY `ReviewImage_storeId_fkey`;

-- DropForeignKey
ALTER TABLE `Store` DROP FOREIGN KEY `Store_regionId_fkey`;

-- DropTable
DROP TABLE `FoodCategory`;

-- DropTable
DROP TABLE `Member`;

-- DropTable
DROP TABLE `MemberAgree`;

-- DropTable
DROP TABLE `MemberMission`;

-- DropTable
DROP TABLE `MemberPrefer`;

-- DropTable
DROP TABLE `Mission`;

-- DropTable
DROP TABLE `Region`;

-- DropTable
DROP TABLE `Review`;

-- DropTable
DROP TABLE `ReviewImage`;

-- DropTable
DROP TABLE `Store`;

-- DropTable
DROP TABLE `Terms`;

-- CreateTable
CREATE TABLE `member` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `gender` VARCHAR(10) NOT NULL,
    `age` INTEGER NOT NULL,
    `address` VARCHAR(40) NOT NULL,
    `specAddress` VARCHAR(40) NOT NULL,
    `phoneNum` VARCHAR(13) NOT NULL,
    `status` VARCHAR(15) NOT NULL,
    `inactiveDate` DATETIME(6) NOT NULL,
    `socialType` VARCHAR(10) NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `point` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `region` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `store` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `region_id` BIGINT NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `address` VARCHAR(50) NOT NULL,
    `score` DOUBLE NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `terms` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(20) NOT NULL,
    `body` TEXT NOT NULL,
    `optional` BOOLEAN NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `food_category` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(15) NOT NULL,
    `column4` VARCHAR(15) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `member_prefer` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `member_id` BIGINT NOT NULL,
    `category_id` BIGINT NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `mission` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `store_id` BIGINT NOT NULL,
    `reward` INTEGER NOT NULL,
    `deadline` DATETIME(3) NOT NULL,
    `missionSpec` TEXT NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `member_mission` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `member_id` BIGINT NOT NULL,
    `mission_id` BIGINT NOT NULL,
    `status` VARCHAR(15) NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `member_id` BIGINT NOT NULL,
    `store_id` BIGINT NOT NULL,
    `body` TEXT NOT NULL,
    `score` DOUBLE NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review_image` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `review_id` BIGINT NOT NULL,
    `store_id` BIGINT NOT NULL,
    `imageUrl` TEXT NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `member_agree` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `member_id` BIGINT NOT NULL,
    `terms_id` BIGINT NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `store` ADD CONSTRAINT `store_region_id_fkey` FOREIGN KEY (`region_id`) REFERENCES `region`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `member_prefer` ADD CONSTRAINT `member_prefer_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `member_prefer` ADD CONSTRAINT `member_prefer_category_id_fkey` FOREIGN KEY (`category_id`) REFERENCES `food_category`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `mission` ADD CONSTRAINT `mission_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `member_mission` ADD CONSTRAINT `member_mission_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `member_mission` ADD CONSTRAINT `member_mission_mission_id_fkey` FOREIGN KEY (`mission_id`) REFERENCES `mission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review_image` ADD CONSTRAINT `review_image_review_id_fkey` FOREIGN KEY (`review_id`) REFERENCES `review`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `review_image` ADD CONSTRAINT `review_image_store_id_fkey` FOREIGN KEY (`store_id`) REFERENCES `store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `member_agree` ADD CONSTRAINT `member_agree_member_id_fkey` FOREIGN KEY (`member_id`) REFERENCES `member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `member_agree` ADD CONSTRAINT `member_agree_terms_id_fkey` FOREIGN KEY (`terms_id`) REFERENCES `terms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
