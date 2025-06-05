'use client';

import * as React from 'react';
import { ColumnDef } from '@tanstack/react-table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tusers } from '@/types';
import { Button } from '@/components/ui/button';
import { ArrowUpDown } from 'lucide-react';

export const columns: ColumnDef<Tusers>[] = [
  {
    id: 'number',
    header: 'No.',
    cell: ({ row }) => {
      return (
        <div>
          <span>{row.index + 1}</span>
        </div>
      );
    },
    enableSorting: false,
    enableColumnFilter: false,
  },
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
          className="cursor-pointer"
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
    header: ({ column }) => {
      const uniqueKelas = new Set<string>();

      column.getFacetedRowModel().rows.forEach((row) => {
        const user = row.original;
        const kelas = user.siswa?.kelas;
        if (kelas) uniqueKelas.add(kelas);
      });

      return (
        <div className="flex items-center gap-1">
          <span className="text-sm font-medium">Kelas</span>
          <Select
            onValueChange={(value) => column.setFilterValue(value)}
            value={(column.getFilterValue() as string) ?? ''}
          >
            <SelectTrigger className="h-8 w-[160px] cursor-pointer">
              <SelectValue placeholder="Pilih kelas" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__all__" className="cursor-pointer">
                Semua
              </SelectItem>
              {[...uniqueKelas].map((kelas) => (
                <SelectItem
                  key={kelas}
                  value={kelas}
                  className="cursor-pointer"
                >
                  {kelas}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      );
    },
    cell: ({ row }) => {
      return <span>{row.original.siswa?.kelas}</span>;
    },
    enableColumnFilter: true,
    filterFn: (row, _columnId, filterValue) => {
      if (filterValue === '__all__') return true;
      return row.original.siswa?.kelas === filterValue;
    },
  },
];
