'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Download, ArrowDownRight, Github, Linkedin, Mail, ShieldAlert, Cpu, Sparkles } from 'lucide-react'
import Image from 'next/image'
import { sound } from './AudioEngine'

export default function HeroV2() {
  const stats = [
    { label: 'CUMULATIVE GPA', value: '3.86', sub: 'Univ. Budi Luhur' },
    { label: 'PROJECTS BUILT', value: '09+', sub: 'Full Stack & IoT' },
    { label: 'PRIMARY STACK', value: 'MERN & PHP', sub: 'Laravel / CI4 / React' },
    { label: 'STATUS', value: 'READY', sub: 'Open for Hire' },
  ]

  return (
    <section id="profile" className="relative min-h-screen pt-32 pb-20 flex items-center justify-center font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
        
        {/* Chapter Telemetry Tag */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-[#ff5b2e] shadow-[0_0_8px_#ff5b2e]" />
          <span className="text-[#ff5b2e] text-xs tracking-[0.25em] font-semibold uppercase">
            01 / 06 PROFILE & IDENTITY
          </span>
          <div className="h-[1px] w-16 bg-gradient-to-r from-[#ff5b2e]/60 to-transparent ml-2" />
          <span className="hidden sm:inline-block text-[11px] text-gray-500 font-sans tracking-normal">
            [ LOC: JAKARTA / TANGERANG, ID ]
          </span>
        </motion.div>

        {/* Main Grid: Left Info, Right Cyber Avatar */}
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column (Content) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ff5b2e]/10 border border-[#ff5b2e]/30 text-[#ff5b2e] text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="tracking-wider">AVAILABLE FOR FULL-TIME & CONTRACT</span>
            </div>

            {/* Huge Name Headline */}
            <div>
              <h1 className="text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-white leading-none font-sans">
                TUNGGUL <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff5b2e] via-[#ff8a50] to-[#00f0ff]">
                  BAYU KUSUMA
                </span>
              </h1>
              <div className="flex items-center gap-3 mt-3 text-sm sm:text-base text-gray-400">
                <span className="text-[#ff5b2e] font-semibold font-mono">ROLE:</span>
                <span className="text-gray-200 font-semibold tracking-wide">FULL STACK SOFTWARE ENGINEER</span>
                <span className="text-gray-600">|</span>
                <span className="text-xs text-gray-400 font-mono">dev.tol3.ai.id</span>
              </div>
            </div>

            {/* Bio Description */}
            <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-sans max-w-2xl">
              Fresh graduate Teknik Informatika dari <strong className="text-white">Universitas Budi Luhur (IPK 3.86)</strong> dengan dedikasi tinggi dalam rekayasa aplikasi web modern. Terbiasa membangun sistem end-to-end dengan <strong className="text-[#ff5b2e]">MERN Stack (MongoDB, Express, React, Node.js)</strong>, sistem enterprise dengan <strong className="text-[#00f0ff]">PHP (Laravel & CodeIgniter 4)</strong>, hingga eksplorasi perangkat keras pintar berbasis <strong className="text-purple-400">IoT & Arduino</strong>.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                onClick={() => sound.playWarp()}
                className="group relative px-6 py-3.5 bg-gradient-to-r from-[#ff5b2e] to-[#ff3b00] text-white font-semibold text-xs tracking-wider rounded-lg shadow-[0_0_25px_rgba(255,91,46,0.4)] hover:shadow-[0_0_35px_rgba(255,91,46,0.7)] transition-all flex items-center gap-2"
              >
                <span>EXPLORE WORK</span>
                <ArrowDownRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              </a>

              <a
                href="/cv/CV_1761406319709_Tunggul_Bayu_Kusuma__CV_.pdf"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white font-medium text-xs tracking-wider rounded-lg border border-white/15 hover:border-[#ff5b2e]/50 transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4 text-[#ff5b2e]" />
                <span>DOWNLOAD CV (PDF)</span>
              </a>

              {/* Social Icons */}
              <div className="flex items-center gap-2 pl-2">
                <a
                  href="https://github.com/Tole2404"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="p-3 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/tunggulbayukusuma/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="p-3 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-[#00f0ff] border border-white/10 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
                <a
                  href="mailto:tunggulbayukusuma@gmail.com"
                  onClick={() => sound.playClick()}
                  className="p-3 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-[#ff5b2e] border border-white/10 transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Telemetry Stats Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10">
              {stats.map((s, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-lg bg-white/[0.02] border border-white/10 hover:border-[#ff5b2e]/40 transition-colors relative overflow-hidden group"
                >
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest">{s.label}</div>
                  <div className="text-xl sm:text-2xl font-bold text-white mt-1 group-hover:text-[#ff5b2e] transition-colors font-mono">
                    {s.value}
                  </div>
                  <div className="text-[11px] text-gray-400 mt-0.5 truncate">{s.sub}</div>
                  <div className="absolute top-0 right-0 w-8 h-[1px] bg-gradient-to-l from-[#ff5b2e]/50 to-transparent" />
                </div>
              ))}
            </div>

          </motion.div>

          {/* Right Column (Cybernetic Avatar Box) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center"
          >
            <div className="relative w-full max-w-md">
              
              {/* Outer Decorative Cyber Brackets */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-[#ff5b2e]" />
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-[#00f0ff]" />
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-[#ff5b2e]" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-[#00f0ff]" />

              {/* Holographic Frame */}
              <div className="relative bg-[#0d0d16] border border-white/10 rounded-2xl overflow-hidden p-3 shadow-[0_0_40px_rgba(0,0,0,0.8)]">
                
                {/* Header bar of cyber card */}
                <div className="flex items-center justify-between pb-3 px-2 border-b border-white/10 text-[10px] text-gray-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="tracking-widest">ID_CARD // VERIFIED</span>
                  </div>
                  <span className="text-[#ff5b2e] font-mono">SYS_CORE.ACTIVE</span>
                </div>

                {/* Profile Image with Cyber Hologram Overlay */}
                <div className="relative aspect-[4/5] rounded-xl overflow-hidden mt-3 bg-gradient-to-b from-slate-900 to-black">
                  <Image
                    src="/assets/images/pp-nobg.png"
                    alt="Tunggul Bayu Kusuma"
                    fill
                    className="object-cover object-top filter brightness-105 contrast-110"
                    priority
                  />

                  {/* Laser Scanline Animation */}
                  <motion.div
                    animate={{ y: ['0%', '1000%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                    className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#ff5b2e] to-transparent opacity-75 shadow-[0_0_12px_#ff5b2e]"
                  />

                  {/* Gradient bottom shadow */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d16] via-transparent to-transparent opacity-80" />

                  {/* Bottom badge overlay */}
                  <div className="absolute bottom-3 left-3 right-3 p-3 rounded-lg bg-black/70 backdrop-blur-md border border-white/10 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-300 font-semibold">Tunggul B. Kusuma</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#ff5b2e]/20 text-[#ff5b2e] font-mono">
                        CANDIDATE
                      </span>
                    </div>
                    <div className="text-[11px] text-gray-400 mt-1">
                      Software Engineer • Jakarta, ID
                    </div>
                  </div>
                </div>

                {/* Footer telemetry */}
                <div className="pt-3 px-2 flex items-center justify-between text-[10px] text-gray-500 font-mono">
                  <span>LATENCY: 12ms</span>
                  <span>ENCRYPT: SHA-256</span>
                </div>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  )
}
