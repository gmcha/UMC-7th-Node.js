/*
  Warnings:

  - You are about to drop the column `createdAt` on the `store` table. All the data in the column will be lost.
  - You are about to drop the column `score` on the `store` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `store` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `store` DROP COLUMN `createdAt`,
    DROP COLUMN `score`,
    DROP COLUMN `updatedAt`;
