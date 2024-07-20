/*
  Warnings:

  - Changed the type of `name` on the `Roles` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "RoleName" AS ENUM ('APP_OWNER', 'ADMINISTRATOR', 'USERS');

-- AlterTable
ALTER TABLE "Roles" ADD COLUMN     "app_name" TEXT,
DROP COLUMN "name",
ADD COLUMN     "name" "RoleName" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Roles_name_key" ON "Roles"("name");
