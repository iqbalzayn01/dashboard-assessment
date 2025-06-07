import { Tusers, TNilaiRow } from '@/types';
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

export async function getDataSiswaById(id: number): Promise<Tusers | null> {
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
        },
      },
    });

    return data as Tusers | null;
  } catch (error) {
    console.error('Error fetching data siswa by ID:', error);
    return null;
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

export async function getNilaiSiswa(): Promise<TNilaiRow[]> {
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
      nis: n.siswa.nis,
      nama: n.siswa.user.name,
      mataPelajaran: n.mataPelajaran,
      jenisNilai: n.jenisNilai,
      nilai: n.nilai,
      semester: n.semester,
      tahunAjaran: n.tahunAjaran,
    }));
  } catch (error) {
    console.error('Gagal mengambil data nilai siswa:', error);
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
