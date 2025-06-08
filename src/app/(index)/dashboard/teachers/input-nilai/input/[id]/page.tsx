import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertTitle } from '@/components/ui/alert';
import {
  getDataUserSiswaById,
  getDataSiswaById,
  getNilaiSiswaById,
} from '../../lib/data';
import { TypeParams } from '@/types';
import { DataTable } from './_components/data-table';
import { columns } from './columns';
import NilaiForm from '../../_components/nilai-form';
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

export default async function InputNilaiSiswa({ params }: TypeParams) {
  const getParams = await params;
  const dataUserById = await getDataUserSiswaById(
    Number.parseInt(getParams.id)
  );

  if (!dataUserById) {
    return <CAlert />;
  }

  const siswaId = dataUserById?.siswa?.id;
  const dataSiswaById = siswaId ? await getDataSiswaById(siswaId) : null;
  const nilaiSiswaById = siswaId ? await getNilaiSiswaById(siswaId) : [];

  return (
    <div className="flex flex-col gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Input Nilai Siswa</CardTitle>
          <CardDescription>
            Input nilai siswa berdasarkan mata pelajaran.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NilaiForm
            type="ADD"
            dataUser={dataUserById}
            dataSiswa={dataSiswaById}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Daftar Nilai Siswa</CardTitle>
          <CardDescription>
            Daftar nilai siswa berdasarkan mata pelajaran.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={nilaiSiswaById} />
        </CardContent>
      </Card>
    </div>
  );
}
