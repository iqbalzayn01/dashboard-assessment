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
  getSubNilaiSiswaById,
} from '../../../../../lib/data';
import { TypeParams } from '@/types';
import NilaiForm from '../../../../../_components/nilai-form';
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

export default async function EditNilaiSiswa({ params }: TypeParams) {
  const resolvedParams = await params;
  const userId = Number(resolvedParams.id);
  const siswaId = Number(resolvedParams.siswaId);
  const nilaiId = Number(resolvedParams.nilaiId);

  const dataUser = await getDataUserSiswaById(userId);
  const dataSiswa = await getDataSiswaById(siswaId);
  const nilaiData = await getSubNilaiSiswaById(nilaiId);

  if (!dataUser || !dataSiswa || !nilaiData) {
    return <CAlert />;
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle className="capitalize">
            Edit Nilai {dataUser.role} {dataUser.name} - {dataUser?.siswa?.nis}
          </CardTitle>
          <CardDescription>
            Edit nilai siswa per mata pelajaran.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NilaiForm
            type="EDIT"
            dataUser={dataUser}
            dataSiswa={dataSiswa}
            nilaiId={nilaiId}
            nilaiData={nilaiData}
          />
        </CardContent>
      </Card>
    </div>
  );
}
