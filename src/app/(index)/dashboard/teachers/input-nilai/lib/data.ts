import { Tusers, Tsiswa, TNilaiRow } from '@/types';
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

export async function getDataUserSiswaById(id: number): Promise<Tusers | null> {
  try {
    const data = await prisma.user.findFirst({
      where: { id },
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

export async function getDataSiswaById(id: number): Promise<Tsiswa | null> {
  try {
    const data = await prisma.siswa.findFirst({
      where: { id },
      select: {
        id: true,
        nis: true,
        kelas: true,
        alamat: true,
        jenisKelamin: true,
        tanggalLahir: true,
        tempatLahir: true,
        agama: true,
        nilai: {
          select: {
            id: true,
            mataPelajaran: true,
            nilai: true,
            semester: true,
            jenisNilai: true,
            tahunAjaran: true,
          },
          orderBy: { semester: 'asc' },
        },
      },
    });

    return data as Tsiswa | null;
  } catch (error) {
    console.error('Error fetching data siswa by ID:', error);
    return null;
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

export async function getSubNilaiSiswaById(
  id: number
): Promise<TNilaiRow | null> {
  try {
    const nilai = await prisma.nilai.findUnique({
      where: { id },
      include: {
        siswa: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!nilai) return null;

    return {
      id: nilai.id,
      userId: nilai.siswa.user.id,
      siswaId: nilai.siswa.id,
      nis: nilai.siswa.nis,
      nama: nilai.siswa.user.name,
      mataPelajaran: nilai.mataPelajaran,
      jenisNilai: nilai.jenisNilai,
      nilai: nilai.nilai,
      semester: nilai.semester,
      tahunAjaran: nilai.tahunAjaran,
    };
  } catch (error) {
    console.error('Gagal mengambil data nilai siswa by ID:', error);
    return null;
  }
}
