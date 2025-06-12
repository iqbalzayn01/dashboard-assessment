import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { getDataOrangTua, getNilaiSiswaById } from './lib/data';
import { DataTableNilai } from '../_components/data-table-nilai';
import { DataTableRekapNilai } from '../_components/data-table-rekap';
import { columns, rekapColumns } from './columns';
import { ExportNilaiRow } from '@/types';
import { groupAndRekapNilai } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import ExportButtons from '../_components/ExportButtons';
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

  const transformedData: ExportNilaiRow[] = nilaiSiswaById.map((n) => ({
    nama: n.nama,
    nis: n.nis,
    mataPelajaran: n.mataPelajaran.replace(/_/g, ' '),
    jenisNilai: n.jenisNilai,
    nilai: n.nilai,
    semester: n.semester,
    tahunAjaran: n.tahunAjaran,
  }));

  const rekapData = groupAndRekapNilai(nilaiSiswaById);

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
          <Card>
            <CardHeader>
              <CardTitle>Daftar Nilai Per Mata Pelajaran</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTableNilai columns={columns} data={nilaiSiswaById} />
            </CardContent>
          </Card>
          <Separator className="my-5" />
          <Card>
            <CardHeader>
              <CardTitle>Daftar Rekap Nilai Per Semester</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTableRekapNilai columns={rekapColumns} data={rekapData} />
            </CardContent>
          </Card>
        </CardContent>
        <CardFooter className="flex flex-col md:flex-row gap-4 justify-between">
          <ExportButtons nilai={transformedData} rekap={rekapData} />
        </CardFooter>
      </Card>
    </div>
  );
}
