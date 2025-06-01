import { AppSidebar } from '../_components/app-sidebar';
import { SectionCards } from '../_components/section-cards';
import { SiteHeader } from '../_components/site-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { auth } from '@/lib/auth';
import { mapSessionToUser } from '@/lib/session-helper';
import { redirect } from 'next/navigation';
import React from 'react';

export default async function Dashboard() {
  const session = await auth();

  if (!session || !session.user) {
    return redirect('/sign-in');
  }

  if (session.user.role !== 'guru') {
    const roleRedirect: Record<string, string> = {
      siswa: '/dashboard/students',
      orangtua: '/dashboard/parents',
    };

    return redirect(
      roleRedirect[session.user.role as keyof typeof roleRedirect] || '/'
    );
  }

  const { user } = session || {};

  const dataUser = mapSessionToUser({
    user,
    expires: '',
  });

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" dataUser={dataUser} />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
