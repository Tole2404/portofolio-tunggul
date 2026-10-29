'use client'

import React from 'react'
import { sound } from './AudioEngine'

interface ChapterHudProps {
  activeSection: string
}

export default function ChapterHud({ activeSection }: ChapterHudProps) {
  const chapters = [
    { id: 'profile', num: '01', label: 'PROFILE' },
    { id: 'experience', num: '02', label: 'TIMELINE' },
    { id: 'skills', num: '03', label: 'SKILLS' },
    { id: 'projects', num: '04', label: 'WORK' },
    { id: 'education', num: '05', label: 'ROOTS' },
    { id: 'contact', num: '06', label: 'TRANSMIT' },
  ]

  const handleClick = () => {
    sound.playWarp()
  }

  return (
    <aside className="hidden xl:flex fixed right-8 top-1/2 -translate-y-1/2 z-40 flex-col items-end gap-5 font-mono select-none">
      {chapters.map((ch) => {
        const isActive = activeSection === ch.id
        return (
          <a
            key={ch.id}
            href={`#${ch.id}`}
            onClick={handleClick}
            onMouseEnter={() => sound.playHover()}
            className="group flex items-center gap-3 text-right"
          >
            <span
              className={`text-[11px] tracking-widest transition-all duration-300 opacity-0 group-hover:opacity-100 ${
                isActive ? 'opacity-100 text-[#ff5b2e] font-bold' : 'text-gray-400'
              }`}
            >
              {ch.label}
            </span>
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-lg border text-xs font-mono transition-all duration-300 ${
                isActive
                  ? 'bg-[#ff5b2e] border-[#ff5b2e] text-white shadow-[0_0_15px_rgba(255,91,46,0.6)] font-bold scale-110'
                  : 'bg-[#0c0c16]/80 border-white/10 text-gray-400 group-hover:text-white group-hover:border-white/30 backdrop-blur-sm'
              }`}
            >
              {ch.num}
            </div>
          </a>
        )
      })}
    </aside>
  )
}
