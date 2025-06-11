import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { TypeParams } from '@/types';
import { getDataUserSiswaById } from '../../lib/data';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
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

export default async function DetailSiswa({ params }: TypeParams) {
  const getParams = await params;
  const data = await getDataUserSiswaById(Number(getParams.id));

  if (!data) {
    return <CAlert />;
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Data Siswa {data.name}</CardTitle>
          <CardDescription>
            Data diri siswa SD Negeri Karadenan 01
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent>
          <div className="flex flex-col md:flex-row items-start gap-4">
            <Image
              src={data.imgUrl ?? '/shadcn-avatar.png'}
              alt={data.name}
              width={400}
              height={400}
              priority={true}
              className="aspect-auto w-1/4 h-1/4 object-cover"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label>Nama</Label>
                <span>{data.name}</span>
              </div>
              <div className="space-y-1">
                <Label>Email</Label>
                <span>{data.email}</span>
              </div>
              <div className="space-y-1">
                <Label>Nomor Telepon</Label>
                <span>{data.notelp}</span>
              </div>
              <div className="space-y-1">
                <Label>NIS</Label>
                <span>{data.siswa?.nis}</span>
              </div>
              <div className="space-y-1">
                <Label>Kelas</Label>
                <span>{data.siswa?.kelas}</span>
              </div>
              <div className="space-y-1">
                <Label>Alamat</Label>
                <span>{data.siswa?.alamat}</span>
              </div>
              <div className="space-y-1">
                <Label>Jenis Kelamin</Label>
                <span>{data.siswa?.jenisKelamin}</span>
              </div>
              <div className="space-y-1">
                <Label>Tanggal Lahir</Label>
                <span>
                  {data.siswa?.tanggalLahir.toISOString().split('T')[0]}
                </span>
              </div>
              <div className="space-y-1">
                <Label>Tempat Lahir</Label>
                <span>{data.siswa?.tempatLahir}</span>
              </div>
              <div className="space-y-1">
                <Label>Agama</Label>
                <span>{data.siswa?.agama}</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex justify-end gap-4 mt-4">
            <Button variant="outline" asChild>
              <Link href={'/dashboard/teachers/data-siswa'}>Kembali</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link
                href={`/dashboard/teachers/data-siswa/edit-siswa/${data.id}`}
              >
                Edit
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
