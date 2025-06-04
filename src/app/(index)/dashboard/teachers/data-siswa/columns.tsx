'use client';

import * as React from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import { Tusers } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

export const columns: ColumnDef<Tusers>[] = [
  // {
  //   id: 'number',
  //   header: 'No.',
  //   cell: ({ row }) => {
  //     return (
  //       <div>
  //         <span>{row.index + 1}</span>
  //       </div>
  //     );
  //   },
  //   enableSorting: false,
  //   enableColumnFilter: false,
  // },
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
    accessorKey: 'email',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Email
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const user = row.original;
      return <div className="lowercase">{user.email}</div>;
    },
    enableColumnFilter: true,
  },
  {
    accessorKey: 'kelas',
    header: 'Kelas',
    cell: ({ row }) => {
      const user = row.original;
      return (
        <div>
          <span>{user.siswa?.kelas}</span>
        </div>
      );
    },
  },
];
