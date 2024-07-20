/*
  Warnings:

  - You are about to drop the `AppUsers` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "AppUsers" DROP CONSTRAINT "AppUsers_role_id_fkey";

-- DropForeignKey
ALTER TABLE "Email_Confirmations" DROP CONSTRAINT "Email_Confirmations_app_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Phone_Confirmations" DROP CONSTRAINT "Phone_Confirmations_app_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Service_Name" DROP CONSTRAINT "Service_Name_owner_id_fkey";

-- DropTable
DROP TABLE "AppUsers";

-- CreateTable
CREATE TABLE "App_Users" (
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

    CONSTRAINT "App_Users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "App_Users_username_key" ON "App_Users"("username");

-- CreateIndex
CREATE UNIQUE INDEX "App_Users_email_key" ON "App_Users"("email");

-- AddForeignKey
ALTER TABLE "App_Users" ADD CONSTRAINT "App_Users_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Email_Confirmations" ADD CONSTRAINT "Email_Confirmations_app_user_id_fkey" FOREIGN KEY ("app_user_id") REFERENCES "App_Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Phone_Confirmations" ADD CONSTRAINT "Phone_Confirmations_app_user_id_fkey" FOREIGN KEY ("app_user_id") REFERENCES "App_Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Service_Name" ADD CONSTRAINT "Service_Name_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "App_Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
