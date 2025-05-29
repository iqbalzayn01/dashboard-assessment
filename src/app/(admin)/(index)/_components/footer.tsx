import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full text-center text-sm py-6 border-t mt-auto bg-gray-50">
      <p>&copy; {currentYear} StudentScore. Semua Hak Dilindungi.</p>
    </footer>
  );
}
