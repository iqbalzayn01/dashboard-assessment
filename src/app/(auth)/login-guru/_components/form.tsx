'use client';

import { cn } from '@/lib/utils';
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
import { ActionResult } from '@/types';
import React, { useActionState } from 'react';
import { Loader2 } from 'lucide-react';
import { useFormStatus } from 'react-dom';
import { signInAction } from '../../lib/actions';
import { BorderBeam } from '@/components/magicui/border-beam';
import Link from 'next/link';

const initialState: ActionResult = {
  error: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit" className="w-full">
      {pending ? (
        <>
          <Loader2 className="animate-spin" />
          Mohon tunggu
        </>
      ) : (
        'Masuk'
      )}
    </Button>
  );
}

export default function SignInForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'div'>) {
  const [state, formAction] = useActionState(signInAction, initialState);

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card className="relative overflow-hidden">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Masuk Sebagai <span className="text-blue-500">Guru</span>
          </CardTitle>
          <CardDescription className="text-center">
            Masukkan email Anda di bawah ini untuk masuk ke akun Anda
          </CardDescription>
        </CardHeader>
        <CardContent>
          {state.error && (
            <p className="text-sm text-center text-red-500 pb-6">
              {state.error}
            </p>
          )}
          <form action={formAction}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="********"
                  required
                />
              </div>
              <SubmitButton />
            </div>
            <div className="mt-4 text-center text-sm">
              Daftar sebagai{' '}
              <span className="text-blue-500 font-semibold">Guru</span>?{' '}
              <Link
                href="/register-guru"
                className="underline underline-offset-4 hover:text-blue-500"
              >
                Daftar di sini
              </Link>
            </div>
            {/* <div className="mt-4 text-center text-sm">
              <Link
                href="/"
                className="text-sm text-center text-muted-foreground hover:text-primary hover:underline underline-offset-4"
              >
                Masuk ke Halaman Utama
              </Link>
            </div> */}
          </form>
        </CardContent>
        <BorderBeam duration={8} size={100} />
      </Card>
    </div>
  );
}
