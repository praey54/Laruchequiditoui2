/*
  Warnings:

  - Added the required column `image` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "products" ADD COLUMN     "distance" TEXT,
ADD COLUMN     "image" TEXT NOT NULL DEFAULT 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop',
ADD COLUMN     "isFresh" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "originalPrice" DOUBLE PRECISION,
ALTER COLUMN "status" SET DEFAULT 'ACTIVE';

-- AlterTable  
ALTER TABLE "users" ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'Unknown User',
ADD COLUMN     "rating" DOUBLE PRECISION DEFAULT 4.5,
ADD COLUMN     "reviewCount" INTEGER NOT NULL DEFAULT 0;

-- Update existing users to set name from firstName and lastName
UPDATE "users" SET "name" = CONCAT("firstName", ' ', "lastName") WHERE "firstName" IS NOT NULL AND "lastName" IS NOT NULL;
