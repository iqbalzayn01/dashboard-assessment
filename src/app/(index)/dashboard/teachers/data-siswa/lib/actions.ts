'use server';

import { revalidatePath } from 'next/cache';
import { ActionResult } from '@/types';
import prisma from '../../../../../../../lib/prisma';
import { uploadFile, deleteFile, getImageUrl } from '@/lib/supabase';

// export async function updateDataSiswa(
//   _: unknown,
//   formData: FormData
// ): Promise<ActionResult> {
//   const siswaId = Number(formData.get('siswaId'));
//   const name = formData.get('name') as string;
//   const notelp = formData.get('notelp') as string;
//   const email = formData.get('email') as string;

//   const siswaData = {
//     nis: formData.get('nis') as string,
//     kelas: formData.get('kelas') as string,
//     alamat: formData.get('alamat') as string,
//     jenisKelamin: formData.get('jenisKelamin') as string,
//     tanggalLahir: new Date(formData.get('tanggalLahir') as string),
//     tempatLahir: formData.get('tempatLahir') as string,
//     agama: formData.get('agama') as string,
//   };

//   try {
//     const updatedSiswa = await prisma.siswa.update({
//       where: { id: siswaId },
//       data: siswaData,
//     });

//     await prisma.user.update({
//       where: { id: updatedSiswa.userId },
//       data: {
//         name,
//         email,
//         notelp,
//       },
//     });

//     revalidatePath('/dashboard/teachers/data-siswa');
//     return {
//       success: 'Data siswa berhasil diperbarui.',
//       error: null,
//     };
//   } catch (err) {
//     console.error('Gagal update data siswa:', err);
//     return {
//       error: 'Gagal memperbarui data siswa.',
//     };
//   }
// }

export async function updateDataSiswa(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const siswaId = Number(formData.get('siswaId'));
  const userId = Number(formData.get('userId'));
  const name = formData.get('name') as string;
  const notelp = formData.get('notelp') as string;
  const email = formData.get('email') as string;

  const siswaData = {
    nis: formData.get('nis') as string,
    kelas: formData.get('kelas') as string,
    alamat: formData.get('alamat') as string,
    jenisKelamin: formData.get('jenisKelamin') as string,
    tanggalLahir: new Date(formData.get('tanggalLahir') as string),
    tempatLahir: formData.get('tempatLahir') as string,
    agama: formData.get('agama') as string,
  };

  try {
    const file = formData.get('imgUrl') as File | null;
    let imgUrl = null;

    if (file && file.size > 0) {
      const filename = await uploadFile(file, 'student-assessment');
      imgUrl = getImageUrl(filename, 'student-assessment');

      const oldUser = await prisma.user.findUnique({ where: { id: userId } });
      const oldFilename = oldUser?.imgUrl?.split('/').pop();
      if (oldFilename) await deleteFile(oldFilename, 'student-assessment');
    }

    const updatedSiswa = await prisma.siswa.update({
      where: { id: siswaId },
      data: siswaData,
    });

    await prisma.user.update({
      where: { id: updatedSiswa.userId },
      data: {
        name,
        email,
        notelp,
        ...(imgUrl && { imgUrl }),
      },
    });

    revalidatePath('/dashboard/teachers/data-siswa');
    return {
      success: 'Data siswa berhasil diperbarui.',
      error: null,
    };
  } catch (err) {
    console.error('Gagal update data siswa:', err);
    return {
      error: 'Gagal memperbarui data siswa.',
    };
  }
}
