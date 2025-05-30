/*
  Warnings:

  - The primary key for the `Nilai` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Nilai` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `siswaId` on the `Nilai` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Nilai" DROP CONSTRAINT "Nilai_siswaId_fkey";

-- AlterTable
ALTER TABLE "Nilai" DROP CONSTRAINT "Nilai_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "siswaId",
ADD COLUMN     "siswaId" INTEGER NOT NULL,
ADD CONSTRAINT "Nilai_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Nilai" ADD CONSTRAINT "Nilai_siswaId_fkey" FOREIGN KEY ("siswaId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
