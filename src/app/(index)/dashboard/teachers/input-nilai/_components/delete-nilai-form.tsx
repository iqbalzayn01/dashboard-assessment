'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Trash2, Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { deleteSubNilaiSiswa } from '../lib/actions';
import { useActionState, useState } from 'react';
import { ActionResult } from '@/types';
import { useRouter } from 'next/navigation';

const initialState: ActionResult = {
  error: '',
  success: '',
};

interface FormDeleteProps {
  id: number;
}

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" variant="destructive" size="sm" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="animate-spin mr-2 h-4 w-4" />
          Menghapus...
        </>
      ) : (
        <>
          <Trash2 className="h-4 w-4 mr-2" />
          Hapus
        </>
      )}
    </Button>
  );
};

export default function FormDelete({ id }: FormDeleteProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleDelete(): Promise<ActionResult> {
    const result = await deleteSubNilaiSiswa(id);
    if (result.success) {
      router.refresh();
      setOpen(false);
    }
    return result;
  }

  const [state, formAction] = useActionState(handleDelete, initialState);

  console.log(state.error);

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size="sm">
          <Trash2 className="h-4 w-4 mr-2" />
          Hapus
        </Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <form action={formAction}>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Yakin ingin menghapus nilai ini?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Tindakan ini tidak dapat dibatalkan. Data nilai akan dihapus
              secara permanen dari sistem.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Batal</AlertDialogCancel>
            <AlertDialogAction asChild>
              <SubmitButton />
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
}
