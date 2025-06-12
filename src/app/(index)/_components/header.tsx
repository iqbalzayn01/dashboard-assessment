'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  session:
    | {
        id: string;
        name?: string | null;
        email?: string | null;
        imgUrl?: string | null;
        role?: string | null;
        emailVerified?: Date | null;
      }
    | undefined;
}

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Tentang', href: '#' },
  { label: 'Kontak', href: '#' },
];

export function Header({ session }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const isAuthenticated = !!session;
  const authNav = isAuthenticated
    ? {
        label: 'Dashboard',
        href:
          session?.role === 'siswa'
            ? '/dashboard/students'
            : session?.role === 'guru'
            ? '/dashboard/teachers'
            : session?.role === 'orangtua'
            ? '/dashboard/parents'
            : '/',
      }
    : null;

  return (
    <header className="sticky top-0 z-50 w-full bg-white/70 backdrop-blur-lg border-b">
      <div className="container mx-auto flex items-center justify-between px-4 py-3 md:py-4">
        {/* Logo & Title */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/logo-tutwurihandayani.png"
            alt="Logo"
            width={50}
            height={50}
            className="w-10 h-10 object-contain"
            priority
          />
          <h1 className="text-sm font-bold text-blue-500 uppercase tracking-wide">
            SDN Karadenan 01
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-sm font-medium items-center">
          {navItems.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className="hover:text-blue-500 transition-colors"
            >
              {label}
            </Link>
          ))}

          {isAuthenticated && authNav ? (
            <Link href={authNav.href} className="text-blue-500 font-semibold">
              {authNav.label}
            </Link>
          ) : (
            <>
              <Link href="/sign-in" className="text-blue-500 font-semibold">
                Sign In
              </Link>
              <Link href="/register" className="text-blue-500 font-semibold">
                Ruang Guru
              </Link>
            </>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <Button
            onClick={toggleMenu}
            aria-label="Toggle Menu"
            variant="outline"
            size="icon"
            className="border-none"
          >
            {menuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden bg-white shadow-md ${
          menuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col items-center gap-4 py-4 text-sm font-medium">
          {navItems.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={closeMenu}
              className="hover:text-blue-500 transition-colors"
            >
              {label}
            </Link>
          ))}
          {isAuthenticated && authNav ? (
            <Link
              href={authNav.href}
              onClick={closeMenu}
              className="text-blue-500 font-semibold"
            >
              {authNav.label}
            </Link>
          ) : (
            <>
              <Link
                href="/sign-in"
                onClick={closeMenu}
                className="text-blue-500 font-semibold"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                onClick={closeMenu}
                className="text-blue-500 font-semibold"
              >
                Ruang Guru
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
