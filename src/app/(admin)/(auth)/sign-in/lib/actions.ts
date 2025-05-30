'use server';

import { signInSchema } from '@/lib/schema';
import { ActionResult } from '@/types';
import { signIn } from '@/lib/auth';
import bcrypt from 'bcryptjs';
import prisma from '../../../../../../lib/prisma';

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

  let redirectTo = '/dashboard';
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
  }

  await signIn('credentials', { email, password }, { redirectTo });

  return { error: null, success: 'Login berhasil.' };
}
