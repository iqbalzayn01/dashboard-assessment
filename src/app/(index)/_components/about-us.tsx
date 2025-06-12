import Image from 'next/image';
import React from 'react';

export default function AboutUsSection() {
  return (
    <section className="container mx-auto flex flex-col w-full h-[900px] items-center justify-center px-5 py-20">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-10">
        <Image
          src={'/img-aboutus.png'}
          alt="img about us"
          width={300}
          height={300}
          priority={true}
          className="object-cover"
        />
        <div className="w-[60%]">
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
