import { TNilaiRow } from '@/types';
import prisma from '../../../../../../lib/prisma';

export async function getDataOrangTua(userId: number) {
  try {
    const orangTua = await prisma.orangTua.findUnique({
      where: { userId },
      include: {
        user: true,
        siswa: {
          include: {
            user: true,
            nilai: {
              orderBy: {
                semester: 'asc',
              },
            },
          },
        },
      },
    });

    if (!orangTua) {
      return null;
    }

    return orangTua;
  } catch (error) {
    console.error('Gagal mengambil data orang tua:', error);
    return null;
  }
}

export async function getNilaiSiswaById(id: number): Promise<TNilaiRow[]> {
  try {
    const data = await prisma.nilai.findMany({
      where: { siswaId: id },
      include: {
        siswa: {
          include: {
            user: true,
          },
        },
      },
      orderBy: [
        { tahunAjaran: 'desc' },
        { semester: 'desc' },
        { mataPelajaran: 'asc' },
      ],
    });

    return data.map((n) => ({
      id: n.id,
      userId: n.siswa.user.id,
      siswaId: n.siswa.id,
      nis: n.siswa.nis,
      nama: n.siswa.user.name,
      mataPelajaran: n.mataPelajaran,
      jenisNilai: n.jenisNilai,
      nilai: n.nilai,
      semester: n.semester,
      tahunAjaran: n.tahunAjaran,
    }));
  } catch (error) {
    console.error('Gagal mengambil data nilai siswa by ID:', error);
    return [];
  }
}
