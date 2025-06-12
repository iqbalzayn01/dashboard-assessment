'use server';

import { signInSchema, parentSchema, registerGuruSchema } from '@/lib/schema';
import { ActionResult } from '@/types';
import { signIn } from '@/lib/auth';
import bcrypt from 'bcryptjs';
import prisma from '../../../../lib/prisma';

export async function signInAction(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const validate = signInSchema.safeParse(Object.fromEntries(formData));

  if (!validate.success) {
    return {
      error: validate.error.errors[0].message,
    };
  }

  const { email, password } = validate.data;

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!existingUser) {
    return {
      error: 'Email atau password salah.',
    };
  }

  const isPasswordCorrect = await bcrypt.compare(
    password,
    existingUser.password
  );

  if (!isPasswordCorrect) {
    return {
      error: 'Email atau password salah.',
    };
  }

  let redirectTo = '/';
  switch (existingUser.role) {
    case 'guru':
      redirectTo = '/dashboard/teachers';
      break;
    case 'siswa':
      redirectTo = '/dashboard/students';
      break;
    case 'orangtua':
      redirectTo = '/dashboard/parents';
      break;
    default:
      redirectTo = '/';
      break;
  }

  await signIn('credentials', { email, password }, { redirectTo });

  return { error: null, success: 'Login berhasil.' };
}

export async function registerGuru(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = registerGuruSchema.safeParse(raw);

  if (!parsed.success) {
    const firstError = parsed.error.errors[0]?.message || 'Data tidak valid';
    return { error: firstError };
  }

  const {
    name,
    email,
    notelp,
    password,
    confirmPassword,
    nip,
    alamat,
    jenisKelamin,
    tanggalLahir,
    tempatLahir,
    agama,
    bidangStudi,
  } = parsed.data;

  if (password !== confirmPassword) {
    return { error: 'Konfirmasi password tidak cocok' };
  }

  try {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { notelp }],
      },
    });

    if (existingUser) {
      return { error: 'Email atau Nomor Telepon sudah digunakan' };
    }

    const existingGuru = await prisma.guru.findUnique({
      where: { nip },
    });

    if (existingGuru) {
      return { error: 'Data guru sudah ada' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        notelp,
        password: hashedPassword,
        role: 'guru',
        guru: {
          create: {
            nip,
            alamat,
            jenisKelamin,
            tanggalLahir: new Date(tanggalLahir),
            tempatLahir,
            agama,
            bidangStudi,
          },
        },
      },
    });

    return {
      success: 'Akun guru berhasil dibuat. Silakan masuk.',
      error: null,
      redirectTo: '/sign-in',
    };
  } catch (error) {
    console.error('Gagal daftar guru:', error);
    return {
      error: 'Terjadi kesalahan saat mendaftar. Coba lagi nanti.',
    };
  }
}

export async function registerOrangTua(
  _: unknown,
  formData: FormData
): Promise<ActionResult> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = parentSchema.safeParse(raw);

  if (!parsed.success) {
    const firstError = parsed.error.errors[0]?.message || 'Data tidak valid';
    return { error: firstError };
  }

  const { name, email, notelp, password, confirmPassword, nis } = parsed.data;

  if (password !== confirmPassword) {
    return { error: 'Konfirmasi password tidak cocok' };
  }

  try {
    const siswa = await prisma.siswa.findUnique({
      where: { nis },
    });

    if (!siswa) {
      return { error: 'NIS anak tidak ditemukan' };
    }

    const existing = await prisma.user.findFirst({
      where: {
        OR: [{ email }, { notelp }],
      },
    });

    if (existing) {
      return { error: 'Email atau no. telepon sudah digunakan' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        name,
        email,
        notelp,
        password: hashedPassword,
        role: 'orangtua',
        orangTua: {
          create: {
            nissiswa: nis,
          },
        },
      },
    });

    return {
      error: null,
      success: 'Akun berhasil dibuat. Silakan masuk.',
      redirectTo: '/sign-in',
    };
  } catch (error) {
    console.error('Gagal daftar orang tua:', error);
    return {
      error: 'Terjadi kesalahan saat mendaftar. Coba lagi nanti.',
    };
  }
}
