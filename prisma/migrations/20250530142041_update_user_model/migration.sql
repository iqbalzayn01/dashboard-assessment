/*
  Warnings:

  - You are about to drop the `Ortu` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Siswa` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_AnakOrtu` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Nilai" DROP CONSTRAINT "Nilai_siswaId_fkey";

-- DropForeignKey
ALTER TABLE "Ortu" DROP CONSTRAINT "Ortu_userId_fkey";

-- DropForeignKey
ALTER TABLE "Siswa" DROP CONSTRAINT "Siswa_userId_fkey";

-- DropForeignKey
ALTER TABLE "_AnakOrtu" DROP CONSTRAINT "_AnakOrtu_A_fkey";

-- DropForeignKey
ALTER TABLE "_AnakOrtu" DROP CONSTRAINT "_AnakOrtu_B_fkey";

-- DropTable
DROP TABLE "Ortu";

-- DropTable
DROP TABLE "Siswa";

-- DropTable
DROP TABLE "_AnakOrtu";

-- AddForeignKey
ALTER TABLE "Nilai" ADD CONSTRAINT "Nilai_siswaId_fkey" FOREIGN KEY ("siswaId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
