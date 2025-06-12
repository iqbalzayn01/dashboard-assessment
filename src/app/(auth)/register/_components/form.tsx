'use client';

import { cn } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { registerGuru } from '../../lib/actions';
import { useActionState } from 'react';
import type { ActionResult } from '@/types';
import { BorderBeam } from '@/components/magicui/border-beam';

const initialState: ActionResult = {
  error: '',
  success: '',
  redirectTo: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit" className="w-full">
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Mohon tunggu
        </>
      ) : (
        'Daftar'
      )}
    </Button>
  );
}

export default function TeacherRegisterForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const [state, formAction] = useActionState(registerGuru, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.redirectTo) {
      router.push(state.redirectTo);
    }
  }, [state.redirectTo, router]);

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="relative overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Daftar Sebagai Guru
          </CardTitle>
          <CardDescription className="text-center">
            Masukkan data diri Anda untuk membuat akun sebagai guru
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Nama Lengkap</Label>
                <Input
                  name="name"
                  id="name"
                  type="text"
                  placeholder="Nama Anda"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="notelp">Nomor Telepon</Label>
                <Input
                  name="notelp"
                  id="notelp"
                  type="tel"
                  placeholder="081234567890"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Kata Sandi</Label>
                <Input
                  name="password"
                  id="password"
                  type="password"
                  placeholder="********"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Konfirmasi Kata Sandi</Label>
                <Input
                  name="confirmPassword"
                  id="confirmPassword"
                  type="password"
                  placeholder="********"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="nip">NIP</Label>
                <Input
                  name="nip"
                  id="nip"
                  type="text"
                  placeholder="Masukkan NIP"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="alamat">Alamat</Label>
                <Input
                  name="alamat"
                  id="alamat"
                  type="text"
                  placeholder="Alamat lengkap"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="jenisKelamin">Jenis Kelamin</Label>
                <Select name="jenisKelamin" required>
                  <SelectTrigger id="jenisKelamin" className="w-full">
                    <SelectValue placeholder="Pilih jenis kelamin" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Laki-Laki">Laki-Laki</SelectItem>
                    <SelectItem value="Perempuan">Perempuan</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="tanggalLahir">Tanggal Lahir</Label>
                <Input
                  name="tanggalLahir"
                  id="tanggalLahir"
                  type="date"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tempatLahir">Tempat Lahir</Label>
                <Input
                  name="tempatLahir"
                  id="tempatLahir"
                  type="text"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="agama">Agama</Label>
                <Select name="agama" required>
                  <SelectTrigger id="agama" className="w-full">
                    <SelectValue placeholder="Pilih agama" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Islam">Islam</SelectItem>
                    <SelectItem value="Kristen">Kristen</SelectItem>
                    <SelectItem value="Katolik">Katolik</SelectItem>
                    <SelectItem value="Hindu">Hindu</SelectItem>
                    <SelectItem value="Buddha">Buddha</SelectItem>
                    <SelectItem value="Konghucu">Konghucu</SelectItem>
                    <SelectItem value="Lainnya">Lainnya</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="bidangStudi">Bidang Studi</Label>
                <Input
                  name="bidangStudi"
                  id="bidangStudi"
                  type="text"
                  required
                />
              </div>

              {state.error && (
                <p className="text-sm text-red-600 text-center">
                  {state.error}
                </p>
              )}
              {state.success && (
                <p className="text-sm text-green-600 text-center">
                  {state.success}
                </p>
              )}

              <SubmitButton />
            </div>

            <div className="mt-4 text-center text-sm">
              Sudah punya akun?{' '}
              <Link href="/sign-in" className="underline underline-offset-4">
                Masuk
              </Link>
            </div>
            <div className="mt-4 text-center text-sm">
              <Link
                href="/"
                className="text-muted-foreground hover:text-primary hover:underline underline-offset-4"
              >
                Kembali ke beranda
              </Link>
            </div>
          </form>
        </CardContent>
        <BorderBeam duration={5} size={200} />
      </Card>
    </div>
  );
}
