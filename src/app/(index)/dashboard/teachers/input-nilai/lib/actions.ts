'use server';

import { nilaiSchema } from '@/lib/schema';
import { ActionResult } from '@/types';
import { revalidatePath } from 'next/cache';
import prisma from '../../../../../../../lib/prisma';

export async function submitNilai(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const parsed = nilaiSchema.safeParse({
    siswaId: Number(formData.get('siswaId')),
    mataPelajaran: formData.get('mataPelajaran'),
    nilai: Number(formData.get('nilai')),
    semester: Number(formData.get('semester')),
    jenisNilai: formData.get('jenisNilai'),
    tahunAjaran: formData.get('tahunAjaran'),
  });

  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  try {
    await prisma.nilai.create({ data: parsed.data });
    revalidatePath('/dashboard/teachers/input-nilai');
  } catch (error) {
    console.error('Gagal menyimpan nilai.:', error);
    return { error: 'Gagal menyimpan nilai.' };
  }
  return { success: 'Nilai berhasil disimpan.', error: null };
}

// export async function updateNilai(
//   _: unknown,
//   formData: FormData,
//   id: number
// ): Promise<ActionResult> {
//   const session = await auth();
//   const userId = session?.user?.id;

//   if (!userId) {
//     return { error: 'Guru tidak ditemukan (unauthenticated).' };
//   }

//   const guru = await prisma.guru.findUnique({
//     where: { userId: Number(userId) },
//   });

//   if (!guru) {
//     return { error: 'Akun guru tidak valid atau belum terdaftar.' };
//   }

//   const parsed = nilaiSchema.safeParse({
//     siswaId: Number(formData.get('siswaId')),
//     guruId: guru.id,
//     mataPelajaran: formData.get('mataPelajaran')?.toString(),
//     nilai: Number(formData.get('nilai')),
//     semester: formData.get('semester')?.toString(),
//     jenisNilai: formData.get('jenisNilai')?.toString(),
//     tahunAjaran: formData.get('tahunAjaran')?.toString(),
//   });

//   if (!parsed.success) {
//     return { error: parsed.error.errors[0].message };
//   }

//   try {
//     await prisma.nilai.update({
//       where: { id },
//       data: parsed.data,
//     });
//     revalidatePath('/dashboard/teachers/input-nilai');
//   } catch (error) {
//     console.log(error);
//     return { error: 'Gagal memperbarui nilai.' };
//   }
//   return redirect('/dashboard/teachers/data-siswa');
// }
