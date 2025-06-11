import { Header } from './_components/header';
import { auth } from '@/lib/auth';
import HeroSection from './_components/hero';
import AboutUsSection from './_components/about-us';
import FasilitasSection from './_components/facilities-section';
import ProgramUnggulanSection from './_components/featured-program-section';
import Footer from './_components/footer';
import React from 'react';

export default async function Home() {
  const session = await auth();

  return (
    <main className="flex flex-col flex-1">
      <Header session={session?.user} />
      <HeroSection />
      <AboutUsSection />
      <FasilitasSection />
      <ProgramUnggulanSection />
      <Footer />
    </main>
  );
}
