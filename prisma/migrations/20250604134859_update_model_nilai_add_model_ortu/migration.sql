/*
  Warnings:

  - You are about to drop the column `tahunAjaran` on the `Nilai` table. All the data in the column will be lost.
  - Added the required column `jenisNilai` to the `Nilai` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "JenisNilai" AS ENUM ('tugas', 'ulangan', 'uts', 'uas');

-- AlterTable
ALTER TABLE "Nilai" DROP COLUMN "tahunAjaran",
ADD COLUMN     "jenisNilai" "JenisNilai" NOT NULL;

-- CreateTable
CREATE TABLE "OrangTua" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "nissiswa" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OrangTua_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "OrangTua_userId_key" ON "OrangTua"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "OrangTua_nissiswa_key" ON "OrangTua"("nissiswa");

-- AddForeignKey
ALTER TABLE "OrangTua" ADD CONSTRAINT "OrangTua_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrangTua" ADD CONSTRAINT "OrangTua_nissiswa_fkey" FOREIGN KEY ("nissiswa") REFERENCES "Siswa"("nis") ON DELETE RESTRICT ON UPDATE CASCADE;
