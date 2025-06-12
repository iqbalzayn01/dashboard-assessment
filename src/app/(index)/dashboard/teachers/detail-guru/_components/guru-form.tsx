'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useFormStatus } from 'react-dom';
import { useActionState, useEffect, useRef } from 'react';
import { updateDataGuru } from '../../lib/actions';
import { TusersGuru, ActionResult } from '@/types';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import UploadImages from './upload-images';
import Link from 'next/link';

interface GuruFormProps {
  data: TusersGuru;
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
          <Loader2 className="animate-spin mr-2 h-4 w-4" /> Mohon tunggu
        </>
      ) : (
        'Simpan'
      )}
    </Button>
  );
};

export default function GuruForm({ data }: GuruFormProps) {
  const [state, formAction] = useActionState(updateDataGuru, initialState);
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success && state.redirectTo) {
      setTimeout(() => {
        router.push(state.redirectTo!);
      }, 3000);
    }
  }, [state.success, state.redirectTo, router]);

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
                <div className="flex items-center gap-2 text-emerald-400">
                  <Loader2 className="animate-spin" />
                  <p className="text-sm text-muted-foreground mt-1">
                    Mengalihkan ke detail guru dalam beberapa saat...
                  </p>
                </div>
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

      <Input type="hidden" name="userId" value={data.id} />
      <Input type="hidden" name="guruId" value={data?.guru?.id} />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <UploadImages initialImageUrl={data?.imgUrl ?? undefined} />

        <div className="space-y-1">
          <Label>Nama</Label>
          <Input name="name" defaultValue={data?.name} required />
        </div>
        <div className="space-y-1">
          <Label>Email</Label>
          <Input name="email" defaultValue={data?.email} required />
        </div>
        <div className="space-y-1">
          <Label>Nomor Telepon</Label>
          <Input name="notelp" defaultValue={data?.notelp} required />
        </div>
        <div className="space-y-1">
          <Label>NIP</Label>
          <Input name="nip" defaultValue={data?.guru?.nip} required />
        </div>
        <div className="space-y-1">
          <Label>Alamat</Label>
          <Input name="alamat" defaultValue={data?.guru?.alamat} required />
        </div>
        <div className="space-y-1">
          <Label>Jenis Kelamin</Label>
          <Select
            name="jenisKelamin"
            defaultValue={data?.guru?.jenisKelamin || ''}
            required
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih Jenis Kelamin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Laki-Laki">Laki-Laki</SelectItem>
              <SelectItem value="Perempuan">Perempuan</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1">
          <Label>Tanggal Lahir</Label>
          <Input
            type="date"
            name="tanggalLahir"
            defaultValue={data?.guru?.tanggalLahir?.toISOString().split('T')[0]}
            required
          />
        </div>
        <div className="space-y-1">
          <Label>Tempat Lahir</Label>
          <Input
            name="tempatLahir"
            defaultValue={data?.guru?.tempatLahir}
            required
          />
        </div>
        <div className="space-y-1">
          <Label>Agama</Label>
          <Select name="agama" defaultValue={data?.guru?.agama || ''} required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih Agama" />
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
        <div className="space-y-1">
          <Label>Bidang Studi</Label>
          <Input
            name="bidangStudi"
            defaultValue={data?.guru?.bidangStudi}
            required
          />
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-4">
        <Button variant="outline" asChild>
          <Link href={`/dashboard/teachers/detail-guru/${data.id}`}>
            Kembali
          </Link>
        </Button>
        <SubmitButton />
      </div>
    </form>
  );
}
