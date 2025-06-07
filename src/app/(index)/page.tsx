import { Header } from './_components/header';
import { auth } from '@/lib/auth';
import HeroSection from './_components/hero';
import Footer from './_components/footer';
import React from 'react';

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex flex-col flex-1">
      <Header session={session?.user} />
      <HeroSection />
      <Footer />
    </main>
  );
}
