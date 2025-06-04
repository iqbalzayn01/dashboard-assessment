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
