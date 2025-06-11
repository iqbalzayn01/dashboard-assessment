'use client';

import { Heart, Lightbulb, ActivitySquare, Book } from 'lucide-react';
import { motion } from 'motion/react';

const programs = [
  {
    icon: Book,
    title: 'Literasi & Numerasi Dasar',
    desc: 'Menumbuhkan minat baca dan pemahaman angka sejak dini.',
  },
  {
    icon: Heart,
    title: 'Pendidikan Karakter',
    desc: 'Nilai-nilai budi pekerti, empati, dan disiplin.',
  },
  {
    icon: Lightbulb,
    title: 'Kelas Inspiratif',
    desc: 'Belajar langsung dari para profesional di berbagai bidang.',
  },
  {
    icon: ActivitySquare,
    title: 'Ekstrakurikuler Beragam',
    desc: 'Pramuka, Tari, Pencak Silat, Tahfidz, dan lainnya.',
  },
];

export default function ProgramUnggulanSection() {
  return (
    <section className="py-20 bg-white" id="program">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-blue-600 mb-6">
          🧒 Program Unggulan
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6">
          {programs.map((item, idx) => (
            <motion.div
              key={idx}
              className="rounded-2xl bg-blue-50 p-6 shadow-sm hover:shadow-md text-left transition"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <div className="flex items-center gap-4 mb-2">
                <item.icon className="w-8 h-8 text-blue-500" />
                <h3 className="font-semibold text-blue-700">{item.title}</h3>
              </div>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
