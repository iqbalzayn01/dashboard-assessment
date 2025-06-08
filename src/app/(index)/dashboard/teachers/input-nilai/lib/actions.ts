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
    revalidatePath(`/dashboard/teachers/input-nilai/${parsed.data.siswaId}`);
    return { success: 'Nilai berhasil disimpan.', error: null };
  } catch (error) {
    console.error('Gagal menyimpan nilai.:', error);
    return { error: 'Gagal menyimpan nilai.' };
  }
}

export async function updateNilai(
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

  const nilaiId = Number(formData.get('nilaiId'));
  const userId = Number(formData.get('userId'));

  if (!parsed.success) {
    return { error: parsed.error.errors[0].message };
  }

  try {
    await prisma.nilai.update({
      where: { id: nilaiId },
      data: parsed.data,
    });

    revalidatePath(`/dashboard/teachers/input-nilai/input/${userId}`);

    return {
      success: 'Nilai berhasil diperbarui.',
      error: null,
      redirectTo: `/dashboard/teachers/input-nilai/input/${userId}`,
    };
  } catch (error) {
    console.error('Gagal memperbarui nilai:', error);
    return { error: 'Gagal memperbarui nilai.' };
  }
}
