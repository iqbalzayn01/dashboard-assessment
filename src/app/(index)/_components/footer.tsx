'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-auto border-t bg-gray-50 py-20 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-600">
        <div className="text-center md:text-left">
          <p className="font-semibold text-gray-800">SD Negeri Karadenan 01</p>
          <p className="text-xs">Membangun Generasi Cerdas dan Berkarakter</p>
        </div>

        <div className="flex gap-6">
          <Link href="/" className="hover:text-blue-600 transition">
            Beranda
          </Link>
          <Link href="/about" className="hover:text-blue-600 transition">
            Tentang Kami
          </Link>
          <Link href="/kontak" className="hover:text-blue-600 transition">
            Kontak
          </Link>
        </div>

        <div className="text-center md:text-right">
          <p>&copy; {currentYear} SDN Karadenan 01. Semua hak dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
