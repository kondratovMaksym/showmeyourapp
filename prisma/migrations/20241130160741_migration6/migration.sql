-- AlterTable
ALTER TABLE "User" ALTER COLUMN "user_picture" DROP NOT NULL,
ALTER COLUMN "user_description" DROP NOT NULL,
ALTER COLUMN "user_instagram" DROP NOT NULL,
ALTER COLUMN "user_linkedin" DROP NOT NULL,
ALTER COLUMN "user_telegram" DROP NOT NULL,
ALTER COLUMN "user_x" DROP NOT NULL,
ALTER COLUMN "user_youtube" DROP NOT NULL;
