-- CreateEnum
CREATE TYPE "ClientType" AS ENUM ('INDIVIDUAL', 'BUSINESS');

-- AlterTable
ALTER TABLE "ClientProfile" ADD COLUMN     "businessAddress" TEXT,
ADD COLUMN     "businessEmail" TEXT,
ADD COLUMN     "businessName" TEXT,
ADD COLUMN     "businessPhone" TEXT,
ADD COLUMN     "clientType" "ClientType" NOT NULL DEFAULT 'INDIVIDUAL',
ADD COLUMN     "representativeName" TEXT,
ADD COLUMN     "representativeRole" TEXT;

-- CreateIndex
CREATE INDEX "ClientProfile_clientType_idx" ON "ClientProfile"("clientType");
