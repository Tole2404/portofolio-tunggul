'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Award, BookOpen, RotateCw, CheckCircle, Trophy, Sparkles } from 'lucide-react'
import { sound } from './AudioEngine'

interface FlipCard {
  id: string
  title: string
  institution: string
  period: string
  location: string
  tag: string
  score?: string
  frontSummary: string
  backDetails: {
    highlight: string
    items: string[]
  }
}

export default function EducationV2() {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({})

  const toggleFlip = (id: string) => {
    sound.playClick()
    setFlippedCards(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const cards: FlipCard[] = [
    {
      id: 'ubl',
      title: 'S1 Teknik Informatika',
      institution: 'Universitas Budi Luhur',
      period: '2021 — 2025',
      location: 'Jakarta Selatan, ID',
      tag: 'ACADEMIC DEGREE',
      score: 'GPA 3.86',
      frontSummary:
        'Lulusan Sarjana Komputer dengan predikat kelulusan sangat memuaskan (IPK 3.86). Menekuni rekayasa web, arsitektur perangkat lunak, dan kecerdasan komputasi.',
      backDetails: {
        highlight: 'Mata Kuliah Utama & Pencapaian:',
        items: [
          'Web Programming & Advanced Database Systems',
          'Pemrograman Berorientasi Objek & Rekayasa Perangkat Lunak',
          'Pemrograman Sistem Kendali & IoT (Arduino Uno Prototype)',
          'Mobile Programming (Flutter & Dart Ecosystem)',
          'Pencapaian IPK Kumulatif: 3.86 / 4.00'
        ]
      }
    },
    {
      id: 'dicoding',
      title: 'Full Stack Web Development',
      institution: 'Dicoding Indonesia',
      period: 'Feb 2024 — Jun 2024',
      location: 'Kampus Merdeka (SIB)',
      tag: 'PROFESSIONAL CERTIFICATION',
      score: 'COMPLETED',
      frontSummary:
        'Program pelatihan intensif berstandar industri dengan kurikulum kurasi Google Developers Authorized Training Partner.',
      backDetails: {
        highlight: 'Kompetensi & Portofolio:',
        items: [
          'MERN Stack Capstone: SarasSingkat Book Summary Platform',
          'Progressive Web Apps (PWA) Restaurant Catalog',
          'Notes App dengan RESTful API & Automated Testing',
          'BookshelfApp dengan Client-side State Storage',
          'Clean Architecture & Continuous Integration'
        ]
      }
    },
    {
      id: 'fti-fair',
      title: 'FTI FAIR Exhibition & Award',
      institution: 'Fakultas Teknologi Informasi UBL',
      period: '2023 — 2024',
      location: 'Jakarta, ID',
      tag: 'CAMPUS INNOVATION',
      score: 'EXHIBITOR',
      frontSummary:
        'Terpilih memamerkan prototipe perangkat keras "Smart Kandang Ayam Otomatis Berbasis Arduino Uno" pada pameran teknologi tahunan kampus.',
      backDetails: {
        highlight: 'Inovasi yang Dipamerkan:',
        items: [
          'Otomasi servo pakan dan pompa air dengan mikrokontroler',
          'Stabilisasi suhu ruangan kandang dengan sensor DHT11',
          'Integrasi modul Real Time Clock (RTC) untuk presisi jadwal',
          'Diuji dan dipresentasikan di hadapan dosen dan pengunjung pameran'
        ]
      }
    }
  ]

  return (
    <section id="education" className="py-28 relative font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#a855f7]" />
            <span className="text-purple-400 text-xs tracking-[0.25em] font-semibold uppercase">
              05 / 06 FOUNDATIONS & ACADEMICS
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-sans tracking-tight">
            ACADEMIC ROOTS & CREDENTIALS
          </h2>
          <p className="text-gray-400 text-sm font-sans mt-2 max-w-xl">
            Pondasi teoritis dan praktis yang kokoh. <span className="text-[#00f0ff]">Klik kartu untuk membalik (3D Flip)</span> dan melihat detail kurikulum & pencapaian.
          </p>
        </div>

        {/* 3D Flip Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card) => {
            const isFlipped = flippedCards[card.id]

            return (
              <div
                key={card.id}
                onClick={() => toggleFlip(card.id)}
                className="h-[380px] cursor-pointer group [perspective:1000px]"
              >
                <div
                  className={`relative w-full h-full duration-500 [transform-style:preserve-3d] transition-transform ${
                    isFlipped ? '[transform:rotateY(180deg)]' : ''
                  }`}
                >
                  
                  {/* FRONT SIDE */}
                  <div className="absolute inset-0 [backface-visibility:hidden] p-6 rounded-2xl bg-[#0c0c16] border border-white/10 group-hover:border-[#00f0ff]/50 transition-colors shadow-xl flex flex-col justify-between overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#00f0ff]/5 rounded-full blur-2xl pointer-events-none" />

                    <div>
                      {/* Top Bar */}
                      <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs">
                        <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400">
                          {card.tag}
                        </span>
                        {card.score && (
                          <span className="text-xs font-bold text-[#00f0ff] font-mono">
                            {card.score}
                          </span>
                        )}
                      </div>

                      {/* Title & Inst */}
                      <div className="mt-4">
                        <h3 className="text-xl font-bold text-white font-sans group-hover:text-[#00f0ff] transition-colors">
                          {card.title}
                        </h3>
                        <div className="text-xs font-semibold text-gray-400 mt-1">
                          {card.institution}
                        </div>
                        <div className="text-[11px] text-gray-500 mt-0.5">
                          {card.period} • {card.location}
                        </div>
                      </div>

                      {/* Front Summary */}
                      <p className="text-xs text-gray-300 font-sans leading-relaxed mt-5">
                        {card.frontSummary}
                      </p>
                    </div>

                    {/* Bottom Prompt */}
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-500">
                      <span className="text-[11px] text-gray-400">Click to inspect</span>
                      <RotateCw className="w-3.5 h-3.5 text-[#00f0ff] group-hover:rotate-180 transition-transform duration-500" />
                    </div>
                  </div>

                  {/* BACK SIDE (Flipped 180deg) */}
                  <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] p-6 rounded-2xl bg-[#0e0e1a] border border-[#00f0ff]/40 shadow-[0_0_30px_rgba(0,240,255,0.15)] flex flex-col justify-between overflow-hidden">
                    <div>
                      <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs text-[#00f0ff]">
                        <span className="font-bold">// DOSSIER DETAILS</span>
                        <span>{card.period}</span>
                      </div>

                      <div className="mt-4">
                        <div className="text-xs font-semibold text-gray-200 mb-3 font-sans">
                          {card.backDetails.highlight}
                        </div>
                        <div className="space-y-2 text-xs font-sans text-gray-300">
                          {card.backDetails.items.map((it, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckCircle className="w-3.5 h-3.5 text-[#00f0ff] shrink-0 mt-0.5" />
                              <span>{it}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs text-gray-400">
                      <span className="text-[11px]">Click to flip back</span>
                      <RotateCw className="w-3.5 h-3.5 text-[#00f0ff]" />
                    </div>
                  </div>

                </div>
              </div>
            )
          })}
        </div>

      </div>
    </section>
  )
}
