import Image from 'next/image';
import React from 'react';

export default function AboutUsSection() {
  return (
    <section className="container mx-auto flex flex-col w-full items-center justify-center px-5 py-40">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-10">
        <Image
          src={'/lapangan.jpg'}
          alt="img about us"
          width={800}
          height={800}
          priority={true}
          className="object-cover w-full h-full"
        />
        <div className="w-full lg:w-[60%]">
          <h2 className="text-2xl md:text-4xl text-blue-500 font-bold mb-4">
            Tentang SD Negeri Karadenan 01
          </h2>
          <div className="space-y-4 text-muted-foreground text-base leading-relaxed">
            <p>
              SD Negeri Karadenan 01 adalah lembaga pendidikan dasar yang
              berdiri sejak 2005, berlokasi di Kecamatan Karadenan, Kabupaten
              Bogor. Kami melayani pendidikan siswa kelas 1 hingga 6 dengan
              pendekatan yang mengedepankan pembentukan karakter, pengembangan
              potensi, dan literasi digital dasar.
            </p>
            <p>
              Kami percaya bahwa setiap anak memiliki potensi unik yang perlu
              diasah melalui pendidikan yang holistik, partisipatif, dan
              menyenangkan.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
