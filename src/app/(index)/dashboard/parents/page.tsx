import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getDataOrangTua, getNilaiSiswaById } from './lib/data';
import { DataTableNilai } from '../_components/data-table-nilai';
import { columns } from './columns';
import React from 'react';
import Link from 'next/link';

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

export default async function ParentsPage() {
  const session = await auth();

  if (!session || !session.user) {
    return redirect('/sign-in');
  }

  const data = await getDataOrangTua(Number(session.user.id));

  if (!data || !data.siswa.id) {
    return <CAlert />;
  }

  const siswaId = data.siswa.id;
  const nilaiSiswaById = siswaId ? await getNilaiSiswaById(siswaId) : [];

  return (
    <div className="flex flex-col gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Selamat datang, {data.user.name}</CardTitle>
          <CardDescription>
            Berikut adalah daftar nilai anak Anda, {data.siswa.nis} -{' '}
            {data.siswa.user.name}.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataTableNilai columns={columns} data={nilaiSiswaById} />
        </CardContent>
      </Card>
    </div>
  );
}
