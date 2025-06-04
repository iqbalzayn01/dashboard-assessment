'use client';

import {
  ArrowUpCircleIcon,
  LayoutDashboardIcon,
  ListIcon,
  UsersIcon,
} from 'lucide-react';

import { NavMain } from './nav-main';
import { NavUser } from './nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import { TuserSession } from '@/types';
import * as React from 'react';

const data = {
  navMain: [
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
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  dataUser: TuserSession['user'];
}

export function AppSidebar({ dataUser, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={dataUser} />
      </SidebarFooter>
    </Sidebar>
  );
}
