/*
  Warnings:

  - The values [APP_OWNER] on the enum `RoleName` will be removed. If these variants are still used in the database, this will fail.
  - Changed the type of `billingCycle` on the `SubscriptionPlan` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "BillingCycle" AS ENUM ('MONTHLY', 'YEARLY');

-- AlterEnum
BEGIN;
CREATE TYPE "RoleName_new" AS ENUM ('USER', 'ADMINISTRATOR');
ALTER TABLE "Role" ALTER COLUMN "name" TYPE "RoleName_new" USING ("name"::text::"RoleName_new");
ALTER TYPE "RoleName" RENAME TO "RoleName_old";
ALTER TYPE "RoleName_new" RENAME TO "RoleName";
DROP TYPE "RoleName_old";
COMMIT;

-- AlterTable
ALTER TABLE "SubscriptionPlan" DROP COLUMN "billingCycle",
ADD COLUMN     "billingCycle" "BillingCycle" NOT NULL;
