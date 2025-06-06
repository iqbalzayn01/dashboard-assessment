/*
  Warnings:

  - You are about to drop the column `imgUrl` on the `Guru` table. All the data in the column will be lost.
  - You are about to drop the column `imgUrl` on the `Siswa` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Guru" DROP COLUMN "imgUrl";

-- AlterTable
ALTER TABLE "Siswa" DROP COLUMN "imgUrl";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "imgUrl" TEXT;
