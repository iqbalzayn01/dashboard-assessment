/*
  Warnings:

  - Changed the type of `mataPelajaran` on the `Nilai` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "MataPelajaran" AS ENUM ('matematika', 'bahasa_indonesia', 'ipa', 'ips', 'pjok', 'agama', 'seni_budaya', 'tik');

-- AlterTable
ALTER TABLE "Nilai" DROP COLUMN "mataPelajaran",
ADD COLUMN     "mataPelajaran" "MataPelajaran" NOT NULL;
