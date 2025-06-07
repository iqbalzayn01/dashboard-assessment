'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import { TuserSession } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

interface HeaderProps {
  session: TuserSession['user'];
}

const navItems = [{ label: 'Home', href: '/' }];

export function Header({ session }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const isAuthenticated = !!session;

  return (
    <header className="w-full px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 bg-white z-50">
      <Link className="flex items-center gap-2" href={'/'}>
        <Image
          src="/logo-tutwurihandayani.png"
          alt="Logo"
          width={100}
          height={100}
          className="w-1/8 h-1/8 object-cover"
          priority={true}
        />
        <h1 className="text-2xl font-bold text-blue-400">
          SD Negeri Karadenan 01
        </h1>
      </Link>

      <div className="md:hidden">
        <Button
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          variant={'outline'}
          size="icon"
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      <nav className="hidden md:flex gap-6 text-sm font-medium items-center">
        {navItems.map(({ label, href }) => (
          <Link
            key={label}
            href={href}
            className="hover:text-blue-400 transition-colors"
          >
            {label}
          </Link>
        ))}
        {isAuthenticated ? (
          <Link href="/sign-in" className="text-blue-400">
            Dashboard
          </Link>
        ) : (
          <Link href="/sign-in" className="text-blue-400">
            Sign In
          </Link>
        )}
      </nav>

      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-t shadow-md flex flex-col items-center py-4 space-y-4 md:hidden">
          {navItems.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={closeMenu}
              className="hover:text-blue-400 transition-colors"
            >
              {label}
            </Link>
          ))}
          {isAuthenticated ? (
            <Link href="/sign-in" className="text-blue-400">
              Dashboard
            </Link>
          ) : (
            <Link href="/sign-in" className="text-blue-400">
              Sign In
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
