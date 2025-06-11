'use client';

import * as React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import { Tusers } from '@/types';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const columns: ColumnDef<Tusers>[] = [
  {
    accessorKey: 'nis',
    header: 'NIS',
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div>
          <span>{user.siswa?.nis}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'name',
    header: 'Nama Siswa',
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div>
          <span>{user.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: 'kelas',
    header: 'Kelas',
    accessorFn: (row) => row.siswa?.kelas ?? '',
    cell: ({ row }) => row.original.siswa?.kelas,
    enableColumnFilter: true,
  },
  {
    id: 'actions',
    header: 'Aksi',
    cell: ({ row }) => {
      const userSiswa = row.original;
      return (
        <Button size="sm" asChild>
          <Link href={`/dashboard/teachers/input-nilai/input/${userSiswa.id}`}>
            Input Nilai
          </Link>
        </Button>
      );
    },
  },
];
