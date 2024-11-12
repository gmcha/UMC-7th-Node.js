/*
  Warnings:

  - You are about to drop the column `createdAt` on the `review` table. All the data in the column will be lost.
  - You are about to drop the column `region_id` on the `store` table. All the data in the column will be lost.
  - You are about to drop the `region` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `store` DROP FOREIGN KEY `store_region_id_fkey`;

-- AlterTable
ALTER TABLE `review` DROP COLUMN `createdAt`;

-- AlterTable
ALTER TABLE `store` DROP COLUMN `region_id`;

-- DropTable
DROP TABLE `region`;
