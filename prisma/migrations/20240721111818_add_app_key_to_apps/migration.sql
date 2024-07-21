/*
  Warnings:

  - A unique constraint covering the columns `[app_key]` on the table `Apps` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `app_key` to the `Apps` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Apps" ADD COLUMN     "app_key" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Apps_app_key_key" ON "Apps"("app_key");
