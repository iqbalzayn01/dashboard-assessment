import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
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
import { DataTableRekapNilai } from '../../../../_components/data-table-rekap';
import { columns, rekapColumns } from './columns';
import { ExportNilaiRow } from '@/types';
import { groupAndRekapNilai } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';
import NilaiForm from '../../_components/nilai-form';
import ExportButtons from '../../../../_components/ExportButtons';
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
          <Card>
            <CardHeader>
              <CardTitle>Daftar Nilai Per Mata Pelajaran</CardTitle>
            </CardHeader>
            <CardContent>
              <DataTable columns={columns} data={nilaiSiswaById} />
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
