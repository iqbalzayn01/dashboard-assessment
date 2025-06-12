import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { TypeParams } from '@/types';
import { getDataUserGuruById } from '../../lib/data';
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
      <AlertTitle>Data guru tidak ditemukan.</AlertTitle>
      <Link href={'/dashboard/teachers'} className="underline">
        Kembali
      </Link>
    </Alert>
  );
}

export default async function DetailGuru({ params }: TypeParams) {
  const getParams = await params;
  const data = await getDataUserGuruById(Number(getParams.id));

  if (!data) {
    return <CAlert />;
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      <Card>
        <CardHeader>
          <CardTitle>Data Diri {data.name}</CardTitle>
          <CardDescription>
            Data diri guru SD Negeri Karadenan 01
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
                <Label>Nama</Label>
                <span className="capitalize">{data.role}</span>
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
                <span>{data.guru?.nip}</span>
              </div>
              <div className="space-y-1">
                <Label>Kelas</Label>
                <span>{data.guru?.bidangStudi}</span>
              </div>
              <div className="space-y-1">
                <Label>Alamat</Label>
                <span>{data.guru?.alamat}</span>
              </div>
              <div className="space-y-1">
                <Label>Jenis Kelamin</Label>
                <span>{data.guru?.jenisKelamin}</span>
              </div>
              <div className="space-y-1">
                <Label>Tanggal Lahir</Label>
                <span>
                  {data.guru?.tanggalLahir.toISOString().split('T')[0]}
                </span>
              </div>
              <div className="space-y-1">
                <Label>Tempat Lahir</Label>
                <span>{data.guru?.tempatLahir}</span>
              </div>
              <div className="space-y-1">
                <Label>Agama</Label>
                <span>{data.guru?.agama}</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex justify-end gap-4 mt-4">
            <Button variant="outline" asChild>
              <Link href={'/dashboard/teachers'}>Kembali</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link
                href={`/dashboard/teachers/detail-guru/edit-guru/${data.id}`}
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
