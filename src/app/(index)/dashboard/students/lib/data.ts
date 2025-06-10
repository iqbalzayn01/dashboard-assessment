import { TNilaiRow, Tusers } from '@/types';
import prisma from '../../../../../../lib/prisma';

export async function getDataUserSiswaById(id: number): Promise<Tusers | null> {
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
            userId: true,
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
