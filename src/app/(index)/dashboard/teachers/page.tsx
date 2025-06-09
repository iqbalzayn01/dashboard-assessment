import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gauge, Users, NotebookPen } from 'lucide-react';
import {
  getAllDataUserSiswa,
  getAllDataUserGuru,
  getAllDataUserOrtu,
  getAllNilaiSiswa,
} from './lib/data';
import Link from 'next/link';
import React from 'react';

export default async function DashboarTeachers() {
  const dataUserSiswa = await getAllDataUserSiswa();
  const dataUserGuru = await getAllDataUserGuru();
  const dataUserOrtu = await getAllDataUserOrtu();
  const dataAllNilai = await getAllNilaiSiswa();

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Halo 👋, Selamat datang di Dashboard Penilaian
          </CardTitle>
          <CardDescription>
            SDN KARADENAN 01 • Tahun Ajaran 2025/2026
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Siswa Terdaftar</CardTitle>
            <Users className="h-6 w-6 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{dataUserSiswa.length}</p>
            <p className="text-sm text-muted-foreground">siswa aktif</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Data Nilai</CardTitle>
            <Gauge className="h-6 w-6 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{dataAllNilai.length}</p>
            <p className="text-sm text-muted-foreground">entri nilai</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Guru Aktif</CardTitle>
            <NotebookPen className="h-6 w-6 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{dataUserGuru.length}</p>
            <p className="text-sm text-muted-foreground">pengguna guru</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Orang Tua Terdaftar</CardTitle>
            <Users className="h-6 w-6 text-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{dataUserOrtu.length}</p>
            <p className="text-sm text-muted-foreground">pengguna orang tua</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-wrap gap-4 pt-2">
        <Button asChild>
          <Link href="/dashboard/teachers/input-nilai">+ Input Nilai Baru</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/dashboard/teachers/data-siswa">Lihat Data Siswa</Link>
        </Button>
      </div>
    </div>
  );
}
