import { Button } from '@/components/ui/button';
import React from 'react';
import Link from 'next/link';

export default function HeroSection() {
  const currentYear = new Date().getFullYear();

  return (
    <section className="relative w-full h-screen flex items-center justify-center px-6 py-20 overflow-hidden">
      <div className="relative z-10 max-w-4xl text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-4">
          Dashboard Penilaian Siswa {currentYear}
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Pantau dan kelola nilai siswa secara efisien, cepat, dan akurat
          menggunakan dashboard modern kami.
        </p>
        <Link href="/sign-in">
          <Button className="text-white bg-blue-600 hover:bg-blue-700 transition-colors">
            Mulai Sekarang
          </Button>
        </Link>
      </div>
    </section>
  );
}
