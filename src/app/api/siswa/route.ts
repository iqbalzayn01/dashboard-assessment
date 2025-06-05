import { NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const kelas = searchParams.get('kelas');

  if (!kelas) {
    return NextResponse.json([], { status: 200 });
  }

  try {
    const siswaList = await prisma.siswa.findMany({
      where: { kelas },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            siswa: {
              select: { nis: true },
            },
          },
        },
      },
    });

    const result = siswaList.map((siswa) => ({
      id: siswa.id,
      name: siswa.user.name,
      nis: siswa.user.siswa?.nis || '',
    }));

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat mengambil data siswa.' },
      { status: 500 }
    );
  }
}
