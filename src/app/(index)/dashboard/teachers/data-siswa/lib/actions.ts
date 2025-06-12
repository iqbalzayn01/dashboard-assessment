'use server';

import { revalidatePath } from 'next/cache';
import { ActionResult } from '@/types';
import { uploadFile, deleteFile, getImageUrl } from '@/lib/supabase';
import bcrypt from 'bcryptjs';
import prisma from '../../../../../../../lib/prisma';

export async function createSiswa(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const notelp = formData.get('notelp') as string;

  const siswaData = {
    nis: formData.get('nis') as string,
    kelas: formData.get('kelas') as string,
    alamat: formData.get('alamat') as string,
    jenisKelamin: formData.get('jenisKelamin') as string,
    tanggalLahir: new Date(formData.get('tanggalLahir') as string),
    tempatLahir: formData.get('tempatLahir') as string,
    agama: formData.get('agama') as string,
  };

  let imgUrl = null;
  let uploadedFilename = null;

  try {
    const file = formData.get('imgUrl') as File | null;
    if (file && file.size > 0) {
      uploadedFilename = await uploadFile(file, 'student-assessment');
      imgUrl = getImageUrl(uploadedFilename, 'student-assessment');
    }
  } catch (uploadErr) {
    console.warn('Upload gagal, lanjutkan tanpa gambar:', uploadErr);
  }

  try {
    const hashedPassword = await bcrypt.hash(siswaData.nis, 10);

    const createdUser = await prisma.user.create({
      data: {
        name,
        email,
        notelp,
        role: 'siswa',
        imgUrl: imgUrl || undefined,
        password: hashedPassword,
      },
    });

    await prisma.siswa.create({
      data: {
        ...siswaData,
        userId: createdUser.id,
      },
    });

    revalidatePath('/dashboard/teachers/data-siswa');
    return {
      success: 'Data siswa berhasil ditambahkan.',
      error: null,
      redirectTo: `/dashboard/teachers/data-siswa`,
    };
  } catch (err: any) {
    console.error('Gagal menambahkan data siswa:', err);

    if (uploadedFilename) {
      try {
        await deleteFile(uploadedFilename, 'student-assessment');
      } catch (deleteErr) {
        console.warn('Gagal menghapus file rollback:', deleteErr);
      }
    }

    let message = 'Gagal menambahkan data siswa.';
    if (err.code === 'P2002') {
      message = 'Data user dengan email atau nomor telepon tersebut sudah ada.';
    }

    return {
      error: message,
    };
  }
}

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
      const oldUrl = oldUser?.imgUrl;

      if (oldUrl && oldUrl !== imgUrl) {
        const oldFilename = oldUrl.split('/').pop();
        if (oldFilename) {
          await deleteFile(oldFilename, 'student-assessment');
        }
      }
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
      redirectTo: `/dashboard/teachers/data-siswa`,
    };
  } catch (err) {
    console.error('Gagal update data siswa:', err);
    return {
      error: 'Gagal memperbarui data siswa.',
    };
  }
}

export async function deleteDataSiswa(id: number): Promise<ActionResult> {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        siswa: true,
      },
    });

    if (!user || !user.siswa) {
      return { error: 'Data siswa tidak ditemukan.' };
    }

    if (user.imgUrl) {
      const filename = user.imgUrl.split('/').pop();
      if (filename) {
        try {
          await deleteFile(filename, 'student-assessment');
        } catch (err) {
          console.warn('Gagal menghapus file gambar:', err);
        }
      }
    }

    await prisma.siswa.delete({
      where: {
        id: user.siswa.id,
      },
    });

    await prisma.user.delete({
      where: {
        id: user.id,
      },
    });

    revalidatePath('/dashboard/teachers/data-siswa');
    return {
      success: 'Data siswa berhasil dihapus.',
      error: null,
    };
  } catch (error) {
    console.error('Gagal menghapus data siswa:', error);
    return {
      error: 'Terjadi kesalahan saat menghapus data siswa.',
    };
  }
}
