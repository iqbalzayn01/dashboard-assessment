/*
  Warnings:

  - Added the required column `tahunAjaran` to the `Nilai` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `semester` on the `Nilai` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Semester" AS ENUM ('genap', 'ganjil');

-- AlterTable
ALTER TABLE "Nilai" ADD COLUMN     "tahunAjaran" TEXT NOT NULL,
DROP COLUMN "semester",
ADD COLUMN     "semester" "Semester" NOT NULL;
