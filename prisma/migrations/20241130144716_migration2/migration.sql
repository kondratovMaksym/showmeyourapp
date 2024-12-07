/*
  Warnings:

  - You are about to drop the column `user_id` on the `Site` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[link]` on the table `Site` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `description` to the `Site` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icon` to the `Site` table without a default value. This is not possible if the table is not empty.
  - Added the required column `link` to the `Site` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Site` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Site` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Site" DROP COLUMN "user_id",
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "icon" TEXT NOT NULL,
ADD COLUMN     "link" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Site_link_key" ON "Site"("link");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_id_key" ON "User"("user_id");

-- AddForeignKey
ALTER TABLE "Site" ADD CONSTRAINT "Site_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
