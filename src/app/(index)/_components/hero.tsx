'use client';

import { cn } from '@/lib/utils';
import { RainbowButton } from '@/components/magicui/rainbow-button';
import { DotPattern } from '@/components/magicui/dot-pattern';
import React from 'react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative w-full h-[900px] flex items-center justify-center px-5 md:px-10 py-20 overflow-hidden">
      <DotPattern
        className={cn(
          '[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]'
        )}
      />
      <div className="relative z-10 max-w-4xl text-center">
        <p className="text-xl mb-4">Selamat Datang di SD Negeri Karadenan 01</p>
        <h1 className="text-4xl md:text-6xl text-blue-500 font-bold mb-4">
          Membangun Generasi Cerdas, Berkarakter, dan Berdaya Saing
        </h1>
        <p className="text-lg mb-8">
          Sekolah Dasar Negeri yang berkomitmen pada pendidikan berkualitas
          dengan lingkungan belajar yang ramah, inklusif, dan inspiratif.
        </p>
        <Link href="/login-siswa">
          <RainbowButton className="cursor-pointer text-white bg-blue-400 hover:bg-blue-500 transition-colors">
            Mulai Sekarang
          </RainbowButton>
        </Link>
      </div>
    </section>
  );
}
