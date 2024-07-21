/*
  Warnings:

  - You are about to drop the `Service_Name` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Customers" DROP CONSTRAINT "Customers_app_id_fkey";

-- DropForeignKey
ALTER TABLE "Revenue_Share" DROP CONSTRAINT "Revenue_Share_service_id_fkey";

-- DropForeignKey
ALTER TABLE "Service_Name" DROP CONSTRAINT "Service_Name_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "Subscription_Plans" DROP CONSTRAINT "Subscription_Plans_service_id_fkey";

-- DropTable
DROP TABLE "Service_Name";

-- CreateTable
CREATE TABLE "Apps" (
    "id" TEXT NOT NULL,
    "owner_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "endpoint" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Apps_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Apps_name_key" ON "Apps"("name");

-- AddForeignKey
ALTER TABLE "Apps" ADD CONSTRAINT "Apps_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "App_Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription_Plans" ADD CONSTRAINT "Subscription_Plans_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Apps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Customers" ADD CONSTRAINT "Customers_app_id_fkey" FOREIGN KEY ("app_id") REFERENCES "Apps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Revenue_Share" ADD CONSTRAINT "Revenue_Share_service_id_fkey" FOREIGN KEY ("service_id") REFERENCES "Apps"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
