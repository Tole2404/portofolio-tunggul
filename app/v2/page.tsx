'use client'

import React, { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import ParticleBackground from '@/components/v2/ParticleBackground'
import NavbarV2 from '@/components/v2/NavbarV2'
import ChapterHud from '@/components/v2/ChapterHud'
import HeroV2 from '@/components/v2/HeroV2'
import ExperienceV2 from '@/components/v2/ExperienceV2'
import SkillsV2 from '@/components/v2/SkillsV2'
import ProjectsV2 from '@/components/v2/ProjectsV2'
import EducationV2 from '@/components/v2/EducationV2'
import ContactV2 from '@/components/v2/ContactV2'
import BootSequence from '@/components/v2/BootSequence'

export default function V2PortfolioPage() {
  const [booted, setBooted] = useState(false)
  const [activeSection, setActiveSection] = useState('profile')

  // Check if session already booted to prevent annoying repeat on quick reloads
  useEffect(() => {
    const isSessionBooted = sessionStorage.getItem('tunggul_sys_booted')
    if (isSessionBooted === 'true') {
      setBooted(true)
    }

    const sections = ['profile', 'experience', 'skills', 'projects', 'education', 'contact']

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35

      for (let i = sections.length - 1; i >= 0; i--) {
        const secId = sections[i]
        const el = document.getElementById(secId)
        if (el) {
          const top = el.offsetTop
          if (scrollPos >= top) {
            setActiveSection(secId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleEnterSystem = () => {
    sessionStorage.setItem('tunggul_sys_booted', 'true')
    setBooted(true)
  }

  return (
    <div className="relative bg-[#07070b] text-gray-100 min-h-screen overflow-x-hidden">
      
      {/* Boot Sequence Overlay */}
      <AnimatePresence>
        {!booted && (
          <BootSequence onEnter={handleEnterSystem} />
        )}
      </AnimatePresence>

      {/* 3D Particle Starfield & Cyber Mesh Canvas */}
      <ParticleBackground />

      {/* Navigation Top HUD */}
      <NavbarV2 activeSection={activeSection} />

      {/* Floating Right HUD Chapter Telemetry */}
      <ChapterHud activeSection={activeSection} />

      {/* Main Chapters */}
      <main className="relative z-10">
        <HeroV2 />
        <ExperienceV2 />
        <SkillsV2 />
        <ProjectsV2 />
        <EducationV2 />
        <ContactV2 />
      </main>

    </div>
  )
}
