'use client';

import { Flower, LibraryBig, Monitor, Users, School, Star } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';

const fasilitas = [
  {
    icon: School,
    title: 'Ruang Kelas Nyaman & Bersih',
    urlImg: '/ruang-kelas.jpg',
  },
  { icon: LibraryBig, title: 'Perpustakaan Sekolah', urlImg: '/perpus-2.jpg' },
  { icon: Users, title: 'Lapangan Olahraga', urlImg: '/lapangan.jpg' },
  { icon: Monitor, title: 'Lab Komputer Dasar', urlImg: '/lap-komputer.jpg' },
  {
    icon: Flower,
    title: 'Taman & Ruang Terbuka Hijau',
    urlImg: '/taman-terbuka.jpg',
  },
  { icon: Star, title: 'Tempat Ibadah', urlImg: '/musholla.jpg' },
];

export default function FasilitasSection() {
  return (
    <section
      className="flex flex-col w-full bg-blue-50 items-center justify-center px-5 py-40"
      id="fasilitas"
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6">
          🧑‍🏫 Sekilas Fasilitas
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {fasilitas.map((item, idx) => (
            <motion.div
              key={idx}
              className="bg-white rounded-2xl p-8 shadow-md flex flex-col gap-4 items-center text-center hover:shadow-xl transition"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <item.icon className="w-10 h-10 text-blue-500 mb-3" />
              <h3 className="font-semibold text-blue-700">{item.title}</h3>
              <Image
                src={item.urlImg}
                width={800}
                height={800}
                alt={item.title}
                className="object-cover w-full h-[400px] rounded-xl"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
