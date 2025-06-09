import { Tusers } from '@/types';
import prisma from '../../../../../../../lib/prisma';

export async function getDataUserSiswa(): Promise<Tusers[]> {
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
        notelp: true,
        imgUrl: true,
        siswa: {
          select: {
            id: true,
            nis: true,
            kelas: true,
            alamat: true,
            jenisKelamin: true,
            tanggalLahir: true,
            tempatLahir: true,
            agama: true,
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

export async function getDataSiswaById(id: number): Promise<Tusers | null> {
  try {
    const data = await prisma.user.findFirst({
      where: { id, role: 'siswa' },
      select: {
        id: true,
        name: true,
        email: true,
        notelp: true,
        role: true,
        imgUrl: true,
        siswa: {
          select: {
            id: true,
            nis: true,
            kelas: true,
            alamat: true,
            jenisKelamin: true,
            tanggalLahir: true,
            tempatLahir: true,
            agama: true,
          },
        },
      },
    });

    return data as Tusers | null;
  } catch (error) {
    console.error('Error fetching data siswa by ID:', error);
    return null;
  }
}
