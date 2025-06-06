import { Tusers } from '@/types';
import prisma from '../../../../../../../lib/prisma';

export async function getDataSiswa(): Promise<Tusers[]> {
  try {
    const data = await prisma.user.findMany({
      where: {
        role: 'siswa',
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        siswa: {
          select: {
            id: true,
            nis: true,
            kelas: true,
            nilai: {
              select: {
                id: true,
                mataPelajaran: true,
                nilai: true,
                semester: true,
                jenisNilai: true,
                tahunAjaran: true,
              },
            },
          },
        },
      },
    });

    return data as Tusers[];
  } catch (error) {
    console.error('Error fetching data siswa:', error);
    return [];
  }
}

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
      user: { select: { name: true } },
    },
    orderBy: { nis: 'asc' },
  });
}
