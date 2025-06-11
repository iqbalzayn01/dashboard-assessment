import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { TypeParams } from '@/types';
import { getDataUserSiswaById, getNilaiSiswaById } from '../../lib/data';
import { DataTableNilai } from '../../../_components/data-table-nilai';
import { columns } from './columns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

function CAlert() {
  return (
    <Alert variant="destructive">
      <AlertTitle>Data siswa tidak ditemukan.</AlertTitle>
      <Link href={'/dashboard/teachers/input-nilai'} className="underline">
        Kembali
      </Link>
    </Alert>
  );
}

export default async function DataNilai({ params }: TypeParams) {
  const getParams = await params;
  const data = await getDataUserSiswaById(Number.parseInt(getParams.id));

  if (!data || !data.siswa) {
    return <CAlert />;
  }

  const siswaId = data.siswa.id;
  const nilaiSiswaById = siswaId ? await getNilaiSiswaById(siswaId) : [];

  return (
    <div className="flex flex-col gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Daftar Nilai Siswa {data.name}</CardTitle>
          <CardDescription>
            Daftar nilai siswa berdasarkan mata pelajaran.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTableNilai columns={columns} data={nilaiSiswaById} />
        </CardContent>
        <CardFooter>
          <Button asChild>
            <Link href={`/dashboard/students/`}>Kembali</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
