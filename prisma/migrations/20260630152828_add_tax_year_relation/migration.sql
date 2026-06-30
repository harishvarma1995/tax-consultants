-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "taxYearId" TEXT;

-- CreateTable
CREATE TABLE "TaxYear" (
    "id" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'OPEN',

    CONSTRAINT "TaxYear_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TaxYear_year_key" ON "TaxYear"("year");

-- CreateIndex
CREATE INDEX "Document_taxYearId_idx" ON "Document"("taxYearId");

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_taxYearId_fkey" FOREIGN KEY ("taxYearId") REFERENCES "TaxYear"("id") ON DELETE SET NULL ON UPDATE CASCADE;
