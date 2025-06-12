'use server';

import { revalidatePath } from 'next/cache';
import { ActionResult } from '@/types';
import { uploadFile, deleteFile, getImageUrl } from '@/lib/supabase';
import prisma from '../../../../../../lib/prisma';

export async function updateDataGuru(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const userId = Number(formData.get('userId'));
  const guruId = Number(formData.get('guruId'));

  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const notelp = formData.get('notelp') as string;

  const guruData = {
    nip: formData.get('nip') as string,
    alamat: formData.get('alamat') as string,
    jenisKelamin: formData.get('jenisKelamin') as string,
    tanggalLahir: new Date(formData.get('tanggalLahir') as string),
    tempatLahir: formData.get('tempatLahir') as string,
    agama: formData.get('agama') as string,
    bidangStudi: formData.get('bidangStudi') as string,
  };

  try {
    const file = formData.get('imgUrl') as File | null;
    let imgUrl: string | null = null;

    if (file && file.size > 0) {
      const filename = await uploadFile(file, 'student-assessment');
      imgUrl = getImageUrl(filename, 'student-assessment');

      const oldUser = await prisma.user.findUnique({ where: { id: userId } });
      const oldUrl = oldUser?.imgUrl;

      if (oldUrl && oldUrl !== imgUrl) {
        const oldFilename = oldUrl.split('/').pop();
        if (oldFilename) {
          await deleteFile(oldFilename, 'student-assessment');
        }
      }
    }

    await prisma.guru.update({
      where: { id: guruId },
      data: guruData,
    });

    await prisma.user.update({
      where: { id: userId },
      data: {
        name,
        email,
        notelp,
        ...(imgUrl && { imgUrl }),
      },
    });

    const path = `/dashboard/teachers/detail-guru/${userId}`;
    revalidatePath(path);

    return {
      success: 'Data guru berhasil diperbarui.',
      error: null,
      redirectTo: path,
    };
  } catch (err) {
    console.error('Gagal update data guru:', err);
    return {
      error: 'Gagal memperbarui data guru.',
    };
  }
}
