'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Sign In', href: '/sign-in' },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="w-full px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 bg-white z-50">
      <h1 className="text-2xl font-bold text-blue-600">StudentScore</h1>

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
            className="hover:text-blue-600 transition-colors"
          >
            {label}
          </Link>
        ))}
        {/* <Button size="sm" asChild>
          <Link href="/sign-up">Sign Up</Link>
        </Button> */}
      </nav>

      {menuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-t shadow-md flex flex-col items-center py-4 space-y-4 md:hidden">
          {navItems.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={closeMenu}
              className="hover:text-blue-600 transition-colors"
            >
              {label}
            </Link>
          ))}
          {/* <Link href="/signup" onClick={closeMenu}>
            <Button size="sm">Sign Up</Button>
          </Link> */}
        </div>
      )}
    </header>
  );
}
