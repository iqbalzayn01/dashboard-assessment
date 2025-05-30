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
import { signInAction } from '../lib/actions';
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
          Please wait
        </>
      ) : (
        'Sign In'
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
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Sign In</CardTitle>
          <CardDescription className="text-center">
            Enter your email below to login to your account
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
              Don&apos;t have an account?{' '}
              <Link href="/sign-up" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
            <div className="mt-4 text-center text-sm">
              <Link
                href="/"
                className="text-sm text-center text-muted-foreground hover:text-primary hover:underline underline-offset-4"
              >
                Back
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
