-- CreateEnum
CREATE TYPE "Role" AS ENUM ('guru', 'siswa', 'orangtua');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Siswa" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "nama" TEXT NOT NULL,

    CONSTRAINT "Siswa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Ortu" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Ortu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nilai" (
    "id" TEXT NOT NULL,
    "siswaId" TEXT NOT NULL,
    "mataPelajaran" TEXT NOT NULL,
    "nilai" INTEGER NOT NULL,
    "semester" TEXT NOT NULL,
    "tahunAjaran" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Nilai_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_AnakOrtu" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_AnakOrtu_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Siswa_userId_key" ON "Siswa"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Ortu_userId_key" ON "Ortu"("userId");

-- CreateIndex
CREATE INDEX "_AnakOrtu_B_index" ON "_AnakOrtu"("B");

-- AddForeignKey
ALTER TABLE "Siswa" ADD CONSTRAINT "Siswa_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Ortu" ADD CONSTRAINT "Ortu_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nilai" ADD CONSTRAINT "Nilai_siswaId_fkey" FOREIGN KEY ("siswaId") REFERENCES "Siswa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnakOrtu" ADD CONSTRAINT "_AnakOrtu_A_fkey" FOREIGN KEY ("A") REFERENCES "Ortu"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AnakOrtu" ADD CONSTRAINT "_AnakOrtu_B_fkey" FOREIGN KEY ("B") REFERENCES "Siswa"("id") ON DELETE CASCADE ON UPDATE CASCADE;
