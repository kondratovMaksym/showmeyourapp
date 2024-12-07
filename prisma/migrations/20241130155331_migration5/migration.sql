/*
  Warnings:

  - Added the required column `user_description` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_instagram` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_linkedin` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_telegram` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_x` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_youtube` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "user_description" TEXT NOT NULL,
ADD COLUMN     "user_instagram" TEXT NOT NULL,
ADD COLUMN     "user_linkedin" TEXT NOT NULL,
ADD COLUMN     "user_telegram" TEXT NOT NULL,
ADD COLUMN     "user_x" TEXT NOT NULL,
ADD COLUMN     "user_youtube" TEXT NOT NULL;
