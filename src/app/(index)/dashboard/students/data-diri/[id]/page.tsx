import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { getDataUserSiswaById } from '../../lib/data';
import { TypeParams } from '@/types';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

type CAlertProps = {
  userId?: number;
};

function CAlert(props: CAlertProps) {
  return (
    <Alert variant="destructive">
      <AlertTitle>Data siswa {props.userId} tidak ditemukan.</AlertTitle>
      <Link href={'/dashboard/students'} className="underline">
        Kembali
      </Link>
    </Alert>
  );
}

export default async function DataDiri({ params }: TypeParams) {
  const getParams = await params;
  const data = await getDataUserSiswaById(Number.parseInt(getParams.id));

  if (!data) {
    return <CAlert />;
  }

  if (data.id !== data.siswa?.userId) {
    return <CAlert userId={data.siswa?.userId} />;
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
              src={data.imgUrl ?? '/placeholder.png'}
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
              <Link href={'/dashboard/students'}>Kembali</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href={`/dashboard/students/data-nilai/${data.id}`}>
                Lihat Data Nilai
              </Link>
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
