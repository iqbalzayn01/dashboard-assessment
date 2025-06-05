import prisma from '../../../../../../../lib/prisma';

export async function getAllKelas(): Promise<string[]> {
  const kelasList = await prisma.siswa.findMany({
    select: { kelas: true },
    distinct: ['kelas'],
    orderBy: { kelas: 'asc' },
  });
  return kelasList.map((k) => k.kelas);
}

export async function getSiswaByKelas(kelas: string) {
  return await prisma.siswa.findMany({
    where: { kelas },
    include: {
      user: {
        select: { name: true, email: true },
      },
    },
    orderBy: { nis: 'asc' },
  });
}

export async function getNilaiByGuru(guruId: number) {
  return await prisma.nilai.findMany({
    where: { guruId },
    include: {
      siswa: {
        include: {
          user: { select: { name: true } },
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getNilaiById(id: number) {
  return await prisma.nilai.findUnique({
    where: { id },
    include: {
      siswa: true,
      guru: true,
    },
  });
}
