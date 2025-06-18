import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import React from 'react';
import LoginOrangTuaForm from './_components/form';

export default async function SignInPage() {
  const session = await auth();

  if (session && session.user) {
    const role = session.user.role;
    const dashboardMap: Record<string, string> = {
      siswa: '/dashboard/students',
      guru: '/dashboard/teachers',
      orangtua: '/dashboard/parents',
    };

    const redirectToPath = dashboardMap[role as string] || '/';
    return redirect(redirectToPath);
  }

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginOrangTuaForm />
      </div>
    </div>
  );
}
