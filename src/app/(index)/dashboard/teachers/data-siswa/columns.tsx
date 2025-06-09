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
    accessorFn: (row) => row.siswa?.nis ?? '',
    cell: ({ row }) => <span>{row.original.siswa?.nis}</span>,
    enableColumnFilter: true,
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
    enableColumnFilter: true,
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => {
      const user = row.original;
      return <div className="lowercase">{user.email}</div>;
    },
    enableColumnFilter: true,
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
      const user = row.original;

      return (
        <div className="space-x-4 inline-flex">
          <Button size="sm" asChild>
            <Link
              href={`/dashboard/teachers/data-siswa/detail-siswa/${user.id}`}
            >
              Detail
            </Link>
          </Button>
          <Button size="sm" variant={'outline'} asChild>
            <Link href={`/dashboard/teachers/data-siswa/edit-siswa/${user.id}`}>
              Edit
            </Link>
          </Button>
        </div>
      );
    },
  },
];
