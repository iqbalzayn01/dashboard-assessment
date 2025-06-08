import { Button } from '@/components/ui/button';
import React from 'react';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="relative w-full h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
      <div className="relative z-10 max-w-4xl text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-4">
          Mewujudkan Generasi Unggul Berkarakter Pancasila
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Pantau dan kelola nilai siswa secara efisien, cepat, dan akurat
          menggunakan dashboard modern kami.
        </p>
        <Link href="/sign-in">
          <Button className="cursor-pointer text-white bg-blue-400 hover:bg-blue-500 transition-colors">
            Mulai Sekarang
          </Button>
        </Link>
      </div>
    </section>
  );
}
