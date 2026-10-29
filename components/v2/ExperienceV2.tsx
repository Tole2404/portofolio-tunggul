'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Briefcase, Calendar, MapPin, ChevronRight, CheckCircle2 } from 'lucide-react'
import { sound } from './AudioEngine'

interface TimelineItem {
  period: string
  title: string
  company: string
  location: string
  type: string
  description: string
  achievements: string[]
  tags: string[]
  accent: string
}

export default function ExperienceV2() {
  const experiences: TimelineItem[] = [
    {
      period: 'NOV 2024 — DES 2024',
      title: 'IT Developer Intern',
      company: 'PT Kansai Prakarsa Coatings',
      location: 'Tangerang, Indonesia',
      type: 'ENTERPRISE INTERNSHIP',
      description:
        'Merancang dan mengembangkan aplikasi web Recruitment Flow end-to-end untuk mendigitalkan proses penerimaan calon karyawan baru dan modul online psychotest.',
      achievements: [
        'Membangun sistem approval multi-level (Department Head → Director → HR/GA) menggunakan CodeIgniter 4.',
        'Mendesain arsitektur database relasional MySQL dan modul CRUD pelamar terintegrasi.',
        'Menyusun dokumentasi teknis dan testing sistem rekrutmen berbasis web perusahaan.'
      ],
      tags: ['CodeIgniter 4', 'PHP', 'MySQL', 'Bootstrap', 'RESTful API'],
      accent: 'border-[#ff5b2e] text-[#ff5b2e]'
    },
    {
      period: 'FEB 2024 — JUNI 2024',
      title: 'Full Stack Web Engineering (SIB)',
      company: 'Dicoding Indonesia',
      location: 'Remote, Indonesia',
      type: 'STUDI INDEPENDEN BERSERTIFIKAT',
      description:
        'Menyelesaikan kurikulum intensif pengembangan web modern standar industri dan memimpin pengerjaan Capstone Project SarasSingkat bersama tim.',
      achievements: [
        'Membangun platform SarasSingkat dengan MERN Stack (MongoDB, Express, React, Node.js) bertema literasi nasional.',
        'Mengimplementasikan arsitektur RESTful API, otentikasi JWT, dan Progressive Web Apps (PWA).',
        'Mengembangkan BookshelfApp dan Notes App dengan automated testing dan clean code principles.'
      ],
      tags: ['React', 'Node.js', 'Express.js', 'MongoDB', 'PWA', 'JWT'],
      accent: 'border-[#00f0ff] text-[#00f0ff]'
    },
    {
      period: 'JUNI 2019 — AGUSTUS 2019',
      title: 'Data Integrity & Verification Intern',
      company: 'Perum BULOG',
      location: 'Jakarta, Indonesia',
      type: 'PRAKTEK KERJA LAPANGAN (PKL)',
      description:
        'Bertanggung jawab dalam validasi, auditing, dan pemeliharaan integritas database logistik dan persediaan nasional.',
      achievements: [
        'Memverifikasi dan memvalidasi keakuratan data lebih dari 3.500 entri database logistik.',
        'Memastikan zero data discrepancy dan mematuhi SOP keamanan data korporasi BUMN.',
        'Bekerja sama lintas divisi operasional dan administrasi pergudangan.'
      ],
      tags: ['Data Integrity', 'Database Audit', 'Data Entry', 'Enterprise SOP'],
      accent: 'border-purple-400 text-purple-400'
    }
  ]

  return (
    <section id="experience" className="py-28 relative font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#ff5b2e] shadow-[0_0_8px_#ff5b2e]" />
            <span className="text-[#ff5b2e] text-xs tracking-[0.25em] font-semibold uppercase">
              02 / 06 TIMELINE & MILESTONES
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-sans tracking-tight">
            WORK EXPERIENCE & IMPACT
          </h2>
          <p className="text-gray-400 text-sm font-sans mt-2 max-w-2xl">
            Jejak rekam profesional dan kontribusi nyata dalam pengembangan perangkat lunak korporasi serta program intensif bersertifikasi.
          </p>
        </div>

        {/* Timeline Pipeline */}
        <div className="relative border-l border-white/10 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-12">
          
          {experiences.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              onMouseEnter={() => sound.playHover()}
              className="relative group"
            >
              {/* Glowing Pipeline Node */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#07070b] border-2 border-[#ff5b2e] group-hover:scale-125 group-hover:bg-[#ff5b2e] group-hover:shadow-[0_0_15px_#ff5b2e] transition-all" />

              {/* Card Container */}
              <div className="p-6 sm:p-8 rounded-2xl bg-[#0c0c14]/90 border border-white/10 group-hover:border-[#ff5b2e]/40 transition-all shadow-xl relative overflow-hidden backdrop-blur-sm">
                
                {/* Subtle cyber background grid */}
                <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-[#ff5b2e]/5 to-transparent pointer-events-none" />

                {/* Top Meta Bar */}
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-gray-300 font-mono">
                      {item.period}
                    </span>
                    <span className={`text-[10px] px-2 py-0.5 rounded border ${item.accent} font-mono uppercase`}>
                      {item.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-sans">
                    <MapPin className="w-3.5 h-3.5 text-[#ff5b2e]" />
                    <span>{item.location}</span>
                  </div>
                </div>

                {/* Job Title & Company */}
                <h3 className="text-xl sm:text-2xl font-bold text-white font-sans group-hover:text-[#ff5b2e] transition-colors">
                  {item.title}
                </h3>
                <div className="text-sm font-semibold text-gray-400 font-mono mt-1">
                  @ {item.company}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-300 font-sans leading-relaxed mt-4">
                  {item.description}
                </p>

                {/* Key Achievements Bullet Points */}
                <div className="mt-4 space-y-2 font-sans text-xs sm:text-sm text-gray-300">
                  {item.achievements.map((ach, aIdx) => (
                    <div key={aIdx} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-[#ff5b2e] shrink-0 mt-0.5" />
                      <span>{ach}</span>
                    </div>
                  ))}
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mt-6 pt-5 border-t border-white/10">
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-2.5 py-1 rounded text-xs bg-white/5 border border-white/10 text-gray-300 font-mono hover:border-[#ff5b2e]/40 transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </section>
  )
}
