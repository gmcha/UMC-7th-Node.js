/*
  Warnings:

  - You are about to drop the `food_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `store` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_favor_category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_store_review` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `user_favor_category` DROP FOREIGN KEY `user_favor_category_food_category_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_favor_category` DROP FOREIGN KEY `user_favor_category_user_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_store_review` DROP FOREIGN KEY `user_store_review_store_id_fkey`;

-- DropForeignKey
ALTER TABLE `user_store_review` DROP FOREIGN KEY `user_store_review_user_id_fkey`;

-- DropTable
DROP TABLE `food_category`;

-- DropTable
DROP TABLE `store`;

-- DropTable
DROP TABLE `user`;

-- DropTable
DROP TABLE `user_favor_category`;

-- DropTable
DROP TABLE `user_store_review`;

-- CreateTable
CREATE TABLE `Member` (
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
CREATE TABLE `Region` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(20) NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Store` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `regionId` BIGINT NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `address` VARCHAR(50) NOT NULL,
    `score` DOUBLE NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Terms` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(20) NOT NULL,
    `body` TEXT NOT NULL,
    `optional` BOOLEAN NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FoodCategory` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(15) NOT NULL,
    `column4` VARCHAR(15) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MemberPrefer` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `memberId` BIGINT NOT NULL,
    `categoryId` BIGINT NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Mission` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `storeId` BIGINT NOT NULL,
    `reward` INTEGER NOT NULL,
    `deadline` DATETIME(3) NOT NULL,
    `missionSpec` TEXT NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MemberMission` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `memberId` BIGINT NOT NULL,
    `missionId` BIGINT NOT NULL,
    `status` VARCHAR(15) NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Review` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `memberId` BIGINT NOT NULL,
    `storeId` BIGINT NOT NULL,
    `body` TEXT NOT NULL,
    `score` DOUBLE NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ReviewImage` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `reviewId` BIGINT NOT NULL,
    `storeId` BIGINT NOT NULL,
    `imageUrl` TEXT NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MemberAgree` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `memberId` BIGINT NOT NULL,
    `termsId` BIGINT NOT NULL,
    `createdAt` DATETIME(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),
    `updatedAt` DATETIME(6) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Store` ADD CONSTRAINT `Store_regionId_fkey` FOREIGN KEY (`regionId`) REFERENCES `Region`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MemberPrefer` ADD CONSTRAINT `MemberPrefer_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MemberPrefer` ADD CONSTRAINT `MemberPrefer_categoryId_fkey` FOREIGN KEY (`categoryId`) REFERENCES `FoodCategory`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Mission` ADD CONSTRAINT `Mission_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MemberMission` ADD CONSTRAINT `MemberMission_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MemberMission` ADD CONSTRAINT `MemberMission_missionId_fkey` FOREIGN KEY (`missionId`) REFERENCES `Mission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Review` ADD CONSTRAINT `Review_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReviewImage` ADD CONSTRAINT `ReviewImage_reviewId_fkey` FOREIGN KEY (`reviewId`) REFERENCES `Review`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReviewImage` ADD CONSTRAINT `ReviewImage_storeId_fkey` FOREIGN KEY (`storeId`) REFERENCES `Store`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MemberAgree` ADD CONSTRAINT `MemberAgree_memberId_fkey` FOREIGN KEY (`memberId`) REFERENCES `Member`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MemberAgree` ADD CONSTRAINT `MemberAgree_termsId_fkey` FOREIGN KEY (`termsId`) REFERENCES `Terms`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
