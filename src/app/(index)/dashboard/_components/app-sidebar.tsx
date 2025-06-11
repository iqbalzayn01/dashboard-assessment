'use client';

import {
  LayoutDashboardIcon,
  ListIcon,
  UsersIcon,
  UserIcon,
  BookOpen,
} from 'lucide-react';
import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { TuserSession } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import * as React from 'react';

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  dataUser: TuserSession['user'];
  role?: string;
}

export function AppSidebar({ dataUser, role, ...props }: AppSidebarProps) {
  const navMain =
    role === 'guru'
      ? [
          {
            title: 'Dashboard',
            url: '/dashboard/teachers',
            icon: LayoutDashboardIcon,
          },
          {
            title: 'Data Siswa',
            url: '/dashboard/teachers/data-siswa',
            icon: UsersIcon,
          },
          {
            title: 'Input Nilai',
            url: '/dashboard/teachers/input-nilai',
            icon: ListIcon,
          },
        ]
      : role === 'siswa'
      ? [
          {
            title: 'Dashboard',
            url: '/dashboard/students',
            icon: LayoutDashboardIcon,
          },
          {
            title: 'Data Diri',
            url: `/dashboard/students/data-diri/${dataUser?.id ?? ''}`,
            icon: UserIcon,
          },
          {
            title: 'Data Nilai',
            url: `/dashboard/students/data-nilai/${dataUser?.id ?? ''}`,
            icon: BookOpen,
          },
        ]
      : role === 'orangtua'
      ? [
          {
            title: 'Data Nilai Siswa',
            url: '/dashboard/parents',
            icon: BookOpen,
          },
        ]
      : [];

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link
              href="/"
              className="flex flex-col items-center justify-center gap-2"
            >
              <Image
                src="/logo-tutwurihandayani.png"
                alt="Logo"
                width={100}
                height={100}
                className="w-1/2 h-1/2 object-cover"
                priority={true}
              />
              <span className="text-lg text-center font-bold uppercase">
                Dashboard Penilaian SDN Karadenan 01
              </span>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={dataUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
