'use server';

import { ActionResult } from '@/types';
import { signOut, auth } from '@/lib/auth';

export async function signOutActions(): Promise<ActionResult> {
  const session = await auth();
  const role = session?.user?.role;

  let redirectTo = '/';

  if (role === 'guru') {
    redirectTo = '/login-guru';
  }

  await signOut({ redirectTo });

  return { error: null };
}
