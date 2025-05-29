import { Header } from './_components/header';
import HeroSection from './_components/hero';
import Footer from './_components/footer';
import React from 'react';

export default function Home() {
  return (
    <main className="flex flex-col flex-1">
      <Header />
      <HeroSection />
      <Footer />
    </main>
  );
}
