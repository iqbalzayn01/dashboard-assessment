'use server';

import { ActionResult } from '@/types';
import { signOut } from '@/lib/auth';

export async function signOutActions(): Promise<ActionResult> {
  await signOut({ redirectTo: '/sign-in' });

  return { error: null };
}
