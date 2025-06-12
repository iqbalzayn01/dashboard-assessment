import { Tusers, TNilaiRow, TusersGuru } from '@/types';
import prisma from '../../../../../../lib/prisma';

export async function getAllDataUserSiswa(): Promise<Tusers[]> {
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
      },
    });

    return data as Tusers[];
  } catch (error) {
    console.error('Error fetching data siswa:', error);
    return [];
  }
}

export async function getAllDataUserGuru(): Promise<Tusers[]> {
  try {
    const data = await prisma.user.findMany({
      where: {
        role: 'guru',
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return data as Tusers[];
  } catch (error) {
    console.error('Error fetching data siswa:', error);
    return [];
  }
}

export async function getDataUserGuruById(
  id: number
): Promise<TusersGuru | null> {
  try {
    const data = await prisma.user.findFirst({
      where: { id, role: 'guru' },
      select: {
        id: true,
        name: true,
        email: true,
        notelp: true,
        role: true,
        imgUrl: true,
        guru: {
          select: {
            id: true,
            nip: true,
            alamat: true,
            jenisKelamin: true,
            tanggalLahir: true,
            tempatLahir: true,
            agama: true,
            bidangStudi: true,
          },
        },
      },
    });

    return data as TusersGuru | null;
  } catch (error) {
    console.error('Error fetching data guru by ID:', error);
    return null;
  }
}

export async function getAllDataUserOrtu(): Promise<Tusers[]> {
  try {
    const data = await prisma.user.findMany({
      where: {
        role: 'orangtua',
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return data as Tusers[];
  } catch (error) {
    console.error('Error fetching data siswa:', error);
    return [];
  }
}

export async function getAllNilaiSiswa(): Promise<TNilaiRow[]> {
  try {
    const data = await prisma.nilai.findMany({
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
      userId: n.siswa.userId,
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
    console.error('Gagal mengambil semua data nilai siswa:', error);
    return [];
  }
}
