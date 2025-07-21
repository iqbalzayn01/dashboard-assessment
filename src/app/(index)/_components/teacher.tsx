import Image from 'next/image';
import React from 'react';

export default function Teacher() {
  return (
    <section className="container mx-auto flex flex-col w-full items-center justify-center px-5 py-40">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-center gap-10">
        <Image
          src={'/kepsek.jpg'}
          alt="Kepala Sekolah"
          width={800}
          height={800}
          priority={true}
          className="object-cover w-full h-full"
        />
        <div className="w-full lg:w-[60%]">
          <h2 className="text-2xl md:text-4xl text-blue-500 font-bold mb-4">
            Kata Sambutan Kepala Sekolah
          </h2>
          <div className="space-y-4 text-muted-foreground text-base leading-relaxed">
            <p>Assalamu&apos;alaikum Warahmatullahi Wabarakatuh, 🙏</p>
            <p>Selamat datang di website resmi SD Negeri Karadenan 01!</p>
            <p>
              Kami sangat berbahagia dapat menyapa Anda melalui platform digital
              ini. Website ini kami hadirkan sebagai sarana informasi dan
              komunikasi bagi seluruh keluarga besar SD Negeri Karadenan 01
              serta masyarakat luas.
            </p>
            <p>
              Di sini, Anda dapat menemukan berbagai informasi terkait kegiatan
              belajar mengajar, program sekolah, prestasi siswa, dan berita
              terkini. Kami berkomitmen untuk menciptakan lingkungan pendidikan
              yang inspiratif, aman, dan berkualitas, demi mencetak generasi
              penerus bangsa yang cerdas, berkarakter, dan siap menghadapi
              tantangan global.
            </p>
            <p>
              Terima kasih atas kunjungan Anda. Semoga website ini bermanfaat!
            </p>
            <p className="font-bold">
              Yani Rochayati, M.Pd - Kepala SD Negeri Karadenan 01
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
