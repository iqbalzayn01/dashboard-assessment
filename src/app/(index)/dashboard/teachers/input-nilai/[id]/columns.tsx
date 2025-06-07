'use client';

import { ColumnDef } from '@tanstack/react-table';
import { JenisNilai, MataPelajaran } from '@prisma/client';
import { TNilaiRow } from '@/types';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export const columns: ColumnDef<TNilaiRow>[] = [
  {
    accessorKey: 'mataPelajaran',
    header: 'Mata Pelajaran',
    cell: ({ row }) => (
      <span className="capitalize">
        {row.original.mataPelajaran
          .replace(/_/g, ' ')
          .replace(/\b\w/g, (c) => c.toUpperCase())}
      </span>
    ),
    enableColumnFilter: true,
  },
  {
    accessorKey: 'jenisNilai',
    header: 'Jenis Nilai',
    cell: ({ row }) => (
      <span className="uppercase">{row.original.jenisNilai}</span>
    ),
    enableColumnFilter: true,
  },
  {
    accessorKey: 'semester',
    header: 'Semester',
    cell: ({ row }) => <span>{row.original.semester}</span>,
    enableColumnFilter: true,
    filterFn: (row, _, value) =>
      value === '__all__' || row.original.semester.toString() === value,
  },
  {
    accessorKey: 'tahunAjaran',
    header: 'Tahun Ajaran',
    cell: ({ row }) => <span>{row.original.tahunAjaran}</span>,
    enableColumnFilter: true,
  },
  {
    accessorKey: 'nilai',
    header: 'Nilai',
    cell: ({ row }) => <span>{row.original.nilai}</span>,
  },
];
