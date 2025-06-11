import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SD Negeri Karadenan 01',
  description:
    'Platform digital yang dirancang khusus untuk mempermudah guru, siswa, dan orang tua dalam memantau proses pembelajaran dan penilaian secara transparan, cepat, dan akurat.',
  // 'Pantau dan kelola nilai siswa secara efisien, cepat, dan akurat menggunakan dashboard modern kami.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
