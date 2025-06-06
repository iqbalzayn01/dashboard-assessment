/*
  Warnings:

  - You are about to drop the column `phone` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[notelp]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `agama` to the `Guru` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alamat` to the `Guru` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bidangStudi` to the `Guru` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imgUrl` to the `Guru` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jenisKelamin` to the `Guru` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggalLahir` to the `Guru` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tempatLahir` to the `Guru` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nilaiKeseluruhan` to the `Nilai` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `semester` on the `Nilai` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `agama` to the `Siswa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `alamat` to the `Siswa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imgUrl` to the `Siswa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `jenisKelamin` to the `Siswa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tanggalLahir` to the `Siswa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tempatLahir` to the `Siswa` table without a default value. This is not possible if the table is not empty.
  - Added the required column `notelp` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "JenisNilai" ADD VALUE 'pr';

-- AlterEnum
ALTER TYPE "MataPelajaran" ADD VALUE 'bahasa_inggris';

-- DropIndex
DROP INDEX "User_phone_key";

-- AlterTable
ALTER TABLE "Guru" ADD COLUMN     "agama" TEXT NOT NULL,
ADD COLUMN     "alamat" TEXT NOT NULL,
ADD COLUMN     "bidangStudi" TEXT NOT NULL,
ADD COLUMN     "imgUrl" TEXT NOT NULL,
ADD COLUMN     "jenisKelamin" TEXT NOT NULL,
ADD COLUMN     "tanggalLahir" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "tempatLahir" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Nilai" ADD COLUMN     "nilaiKeseluruhan" INTEGER NOT NULL,
DROP COLUMN "semester",
ADD COLUMN     "semester" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Siswa" ADD COLUMN     "agama" TEXT NOT NULL,
ADD COLUMN     "alamat" TEXT NOT NULL,
ADD COLUMN     "imgUrl" TEXT NOT NULL,
ADD COLUMN     "jenisKelamin" TEXT NOT NULL,
ADD COLUMN     "tanggalLahir" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "tempatLahir" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "phone",
ADD COLUMN     "notelp" VARCHAR(20) NOT NULL;

-- DropEnum
DROP TYPE "Semester";

-- CreateIndex
CREATE UNIQUE INDEX "User_notelp_key" ON "User"("notelp");
