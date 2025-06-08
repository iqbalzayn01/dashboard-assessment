'use client';

import { useFormStatus } from 'react-dom';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useRef, useState } from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AlertCircle, Loader2, CheckCircle } from 'lucide-react';
import { submitNilai, updateNilai } from '../lib/actions';
import { JenisNilai, MataPelajaran } from '@prisma/client';
import { ActionResult, Tusers, Tsiswa, TNilaiRow } from '@/types';
import { motion, AnimatePresence } from 'motion/react';
import Link from 'next/link';

interface NilaiFormProps {
  type?: 'ADD' | 'EDIT';
  dataUser?: Tusers | null;
  dataSiswa?: Tsiswa | null;
  nilaiId?: number;
  nilaiData?: TNilaiRow | null;
}

const initialState: ActionResult = {
  error: '',
  success: '',
};

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
          Mohon tunggu
        </>
      ) : (
        'Simpan'
      )}
    </Button>
  );
};

export default function NilaiForm({
  type = 'ADD',
  dataUser,
  dataSiswa,
  nilaiId,
  nilaiData,
}: NilaiFormProps) {
  const [state, formAction] = useActionState(
    type === 'ADD' ? submitNilai : updateNilai,
    initialState
  );
  const formRef = useRef<HTMLFormElement>(null);
  const router = useRouter();

  const [mataPelajaran, setMataPelajaran] = useState('');
  const [jenisNilai, setJenisNilai] = useState('');

  useEffect(() => {
    if (state.success && type === 'ADD') {
      formRef.current?.reset();
      setMataPelajaran('');
      setJenisNilai('');
    }
  }, [state.success, type]);

  useEffect(() => {
    if (type === 'EDIT' && state.success) {
      const timeout = setTimeout(() => {
        router.push(`/dashboard/teachers/input-nilai/input/${dataUser?.id}`);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [state.success, type, dataUser?.id, router]);

  if (!dataUser || !dataSiswa) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Data siswa tidak ditemukan.</AlertTitle>
        <Link href="/dashboard/teachers/input-nilai" className="underline">
          Kembali
        </Link>
      </Alert>
    );
  }

  return (
    <form action={formAction} ref={formRef} className="grid gap-4">
      <AnimatePresence>
        {state.success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Alert variant="default">
              <AlertTitle className="text-xl text-emerald-400">
                <CheckCircle className="inline mr-2" />
                Berhasil
              </AlertTitle>
              <AlertDescription>
                {state.success}
                {type === 'EDIT' && (
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Loader2 className="animate-spin" />
                    <p className="text-sm text-muted-foreground mt-1">
                      Mengalihkan ke daftar nilai dalam beberapa saat...
                    </p>
                  </div>
                )}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {state.error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{state.error}</AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <Input type="hidden" name="siswaId" value={dataSiswa.id} />
      {type === 'EDIT' && nilaiId && (
        <Input type="hidden" name="nilaiId" value={nilaiId} />
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-1">
          <Label htmlFor="name">Nama Siswa</Label>
          <Input name="name" disabled defaultValue={dataUser.name} />
        </div>

        <div className="space-y-1">
          <Label htmlFor="kelas">Kelas</Label>
          <Input name="kelas" disabled defaultValue={dataSiswa.kelas} />
        </div>

        <div className="space-y-1">
          <Label htmlFor="mataPelajaran">Mata Pelajaran</Label>
          <Select
            name="mataPelajaran"
            required
            {...(type === 'ADD'
              ? {
                  value: mataPelajaran,
                  onValueChange: setMataPelajaran,
                }
              : {
                  defaultValue: nilaiData?.mataPelajaran ?? '',
                })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih pelajaran" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(MataPelajaran).map((mp) => (
                <SelectItem key={mp} value={mp}>
                  {mp
                    .replace(/_/g, ' ')
                    .replace(/\b\w/g, (c) => c.toUpperCase())}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-1">
          <Label htmlFor="nilai">Nilai</Label>
          <Input
            type="number"
            name="nilai"
            placeholder="100"
            required
            defaultValue={type === 'EDIT' && nilaiData ? nilaiData.nilai : ''}
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="semester">Semester</Label>
          <Input
            type="number"
            name="semester"
            placeholder="1"
            required
            defaultValue={
              type === 'EDIT' && nilaiData ? nilaiData.semester : ''
            }
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="tahunAjaran">Tahun Ajaran</Label>
          <Input
            name="tahunAjaran"
            placeholder="2024/2025"
            required
            defaultValue={
              type === 'EDIT' && nilaiData ? nilaiData.tahunAjaran : ''
            }
          />
        </div>

        <div className="space-y-1">
          <Label htmlFor="jenisNilai">Jenis Nilai</Label>
          <Select
            name="jenisNilai"
            required
            {...(type === 'ADD'
              ? {
                  value: jenisNilai,
                  onValueChange: setJenisNilai,
                }
              : {
                  defaultValue: nilaiData?.jenisNilai ?? '',
                })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Pilih jenis" />
            </SelectTrigger>
            <SelectContent>
              {Object.values(JenisNilai).map((j) => (
                <SelectItem key={j} value={j}>
                  {j.toUpperCase()}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-4">
        <Button variant="outline" asChild>
          <Link
            href={
              type === 'ADD'
                ? '/dashboard/teachers/input-nilai'
                : `/dashboard/teachers/input-nilai/input/${dataUser.id}`
            }
          >
            Kembali
          </Link>
        </Button>
        <SubmitButton />
      </div>
    </form>
  );
}
