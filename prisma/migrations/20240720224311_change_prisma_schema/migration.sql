/*
  Warnings:

  - The values [USERS] on the enum `RoleName` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `user_id` on the `Email_Confirmations` table. All the data in the column will be lost.
  - You are about to drop the column `user_subscription_id` on the `Payments` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Phone_Confirmations` table. All the data in the column will be lost.
  - You are about to drop the column `app_name` on the `Roles` table. All the data in the column will be lost.
  - You are about to drop the column `api_id` on the `Subscription_Plans` table. All the data in the column will be lost.
  - You are about to drop the `User_Subscriptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `app_user_id` to the `Email_Confirmations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customer_subscription_id` to the `Payments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `app_user_id` to the `Phone_Confirmations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_id` to the `Service_Name` table without a default value. This is not possible if the table is not empty.
  - Added the required column `service_id` to the `Subscription_Plans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RoleName_new" AS ENUM ('APP_OWNER', 'ADMINISTRATOR', 'USER');
ALTER TABLE "Roles" ALTER COLUMN "name" TYPE "RoleName_new" USING ("name"::text::"RoleName_new");
ALTER TYPE "RoleName" RENAME TO "RoleName_old";
ALTER TYPE "RoleName_new" RENAME TO "RoleName";
DROP TYPE "RoleName_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Email_Confirmations" DROP CONSTRAINT "Email_Confirmations_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Payments" DROP CONSTRAINT "Payments_user_subscription_id_fkey";

-- DropForeignKey
ALTER TABLE "Phone_Confirmations" DROP CONSTRAINT "Phone_Confirmations_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Subscription_Plans" DROP CONSTRAINT "Subscription_Plans_api_id_fkey";

-- DropForeignKey
ALTER TABLE "User_Subscriptions" DROP CONSTRAINT "User_Subscriptions_subscription_plan_id_fkey";

-- DropForeignKey
ALTER TABLE "User_Subscriptions" DROP CONSTRAINT "User_Subscriptions_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Users" DROP CONSTRAINT "Users_rolesId_fkey";

-- AlterTable
ALTER TABLE "Email_Confirmations" DROP COLUMN "user_id",
ADD COLUMN     "app_user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Payments" DROP COLUMN "user_subscription_id",
ADD COLUMN     "customer_subscription_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Phone_Confirmations" DROP COLUMN "user_id",
ADD COLUMN     "app_user_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Roles" DROP COLUMN "app_name";

-- AlterTable
ALTER TABLE "Service_Name" ADD COLUMN     "owner_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Subscription_Plans" DROP COLUMN "api_id",
ADD COLUMN     "service_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "User_Subscriptions";

-- DropTable
DROP TABLE "Users";

-- CreateTable
CREATE TABLE "AppUsers" (
    "id" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "phone" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role_id" UUID NOT NULL,
    "birth_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "total_earnings" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "allowance_balance" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "AppUsers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer_Subscriptions" (
    "id" TEXT NOT NULL,
    "customer_id" TEXT NOT NULL,
    "subscription_plan_id" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'active',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customer_Subscriptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customers" (
    "id" TEXT NOT NULL,
    "app_id" TEXT NOT NULL,
    "external_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Revenue_Share" (
    "id" TEXT NOT NULL,
    "service_id" TEXT NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "total_revenue" DOUBLE PRECISION NOT NULL,
    "owner_share" DOUBLE PRECISION NOT NULL,
    "provider_share" DOUBLE PRECISION NOT NULL,
    "collected" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Revenue_Share_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AppUsers_username_key" ON "AppUsers"("username");

-- CreateIndex
CREATE UNIQUE INDEX "AppUsers_email_key" ON "AppUsers"("email");

-- AddForeignKey
ALTER TABLE "AppUsers" ADD CONSTRAINT "AppUsers_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Email_Confirmations" ADD CONSTRAINT "Email_Confirmations_app_user_id_fkey" FOREIGN KEY ("app_user_id") REFERENCES "AppUsers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phone_Confirmations" ADD CONSTRAINT "Phone_Confirmations_app_user_id_fkey" FOREIGN KEY ("app_user_id") REFERENCES "AppUsers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service_Name" ADD CONSTRAINT "Service_Name_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "AppUsers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription_Plans" ADD CONSTRAINT "Subscription_Plans_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service_Name"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer_Subscriptions" ADD CONSTRAINT "Customer_Subscriptions_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "Customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customer_Subscriptions" ADD CONSTRAINT "Customer_Subscriptions_subscription_plan_id_fkey" FOREIGN KEY ("subscription_plan_id") REFERENCES "Subscription_Plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payments" ADD CONSTRAINT "Payments_customer_subscription_id_fkey" FOREIGN KEY ("customer_subscription_id") REFERENCES "Customer_Subscriptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customers" ADD CONSTRAINT "Customers_app_id_fkey" FOREIGN KEY ("app_id") REFERENCES "Service_Name"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Revenue_Share" ADD CONSTRAINT "Revenue_Share_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Service_Name"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
