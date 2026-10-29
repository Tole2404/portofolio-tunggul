'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Volume2, VolumeX, Menu, X, Terminal, ArrowUpRight, ShieldCheck } from 'lucide-react'
import { sound } from './AudioEngine'
import Link from 'next/link'

interface NavbarV2Props {
  activeSection: string
}

export default function NavbarV2({ activeSection }: NavbarV2Props) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(false)
  const [systemTime, setSystemTime] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)

    // Update digital HUD clock (WIB / Local)
    const updateTime = () => {
      const now = new Date()
      setSystemTime(
        now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      )
    }
    updateTime()
    const timer = setInterval(updateTime, 1000)

    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearInterval(timer)
    }
  }, [])

  const toggleSound = () => {
    const nextState = !soundEnabled
    setSoundEnabled(nextState)
    sound.enabled = nextState
    if (nextState) sound.playClick()
  }

  const navLinks = [
    { id: 'profile', label: '01 PROFILE', href: '#profile' },
    { id: 'experience', label: '02 TIMELINE', href: '#experience' },
    { id: 'skills', label: '03 SKILLS', href: '#skills' },
    { id: 'projects', label: '04 WORK', href: '#projects' },
    { id: 'education', label: '05 ROOTS', href: '#education' },
    { id: 'contact', label: '06 TRANSMIT', href: '#contact' },
  ]

  const handleNavClick = () => {
    sound.playClick()
    setMobileMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-mono ${
        isScrolled
          ? 'bg-[#07070b]/90 backdrop-blur-md border-b border-[#ff5b2e]/20 py-3 shadow-[0_4px_25px_rgba(0,0,0,0.8)]'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brand / Terminal Identity */}
        <div className="flex items-center gap-3">
          <Link
            href="#profile"
            onClick={() => sound.playClick()}
            className="group flex items-center gap-2 text-white font-bold tracking-widest text-sm hover:text-[#ff5b2e] transition-colors"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5b2e] animate-ping" />
            <span className="text-gray-400 group-hover:text-white transition-colors">TUNGGUL</span>
            <span className="text-[#ff5b2e]">.SYS</span>
            <span className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400 ml-1">
              v2.4
            </span>
          </Link>

          {/* Quick Return to Classic Link */}
          <Link
            href="/"
            onClick={() => sound.playClick()}
            className="hidden md:inline-flex items-center gap-1 text-[11px] text-gray-400 hover:text-white px-2 py-1 rounded bg-white/5 hover:bg-white/10 border border-white/10 transition-colors ml-2"
          >
            <span>Classic Portfolio</span>
            <ArrowUpRight className="w-3 h-3 text-[#ff5b2e]" />
          </Link>
        </div>

        {/* Center Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navLinks.map((item) => {
            const isActive = activeSection === item.id
            return (
              <a
                key={item.id}
                href={item.href}
                onClick={handleNavClick}
                onMouseEnter={() => sound.playHover()}
                className={`relative px-3.5 py-1.5 text-xs tracking-wider transition-all rounded-md ${
                  isActive
                    ? 'text-[#ff5b2e] font-semibold bg-[#ff5b2e]/10 border border-[#ff5b2e]/30 shadow-[0_0_15px_rgba(255,91,46,0.2)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </a>
            )
          })}
        </nav>

        {/* Right HUD Controls */}
        <div className="flex items-center gap-3">
          {/* Digital Telemetry Clock */}
          <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/40 border border-white/10 text-[11px] text-gray-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>UTC+7</span>
            <span className="text-white font-medium ml-1">{systemTime}</span>
          </div>

          {/* Audio Synthesizer Toggle */}
          <button
            onClick={toggleSound}
            title={soundEnabled ? 'Disable SFX' : 'Enable Cyber SFX'}
            className={`p-2 rounded-lg border transition-all ${
              soundEnabled
                ? 'bg-[#ff5b2e]/20 border-[#ff5b2e] text-[#ff5b2e] shadow-[0_0_10px_rgba(255,91,46,0.3)]'
                : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => {
              sound.playClick()
              setMobileMenuOpen(!mobileMenuOpen)
            }}
            className="lg:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0a0a10]/95 backdrop-blur-xl border-b border-[#ff5b2e]/30 px-6 py-6 overflow-hidden"
          >
            <div className="flex flex-col space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-white/10 text-xs text-gray-400">
                <span>SYSTEM NAVIGATION</span>
                <span className="text-[#ff5b2e]">ONLINE</span>
              </div>
              {navLinks.map((item) => (
                <a
                  key={item.id}
                  href={item.href}
                  onClick={handleNavClick}
                  className="px-4 py-2.5 rounded-lg text-sm text-gray-300 hover:text-[#ff5b2e] hover:bg-[#ff5b2e]/10 border border-transparent hover:border-[#ff5b2e]/20 transition-all flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="text-[10px] text-gray-500">WARP →</span>
                </a>
              ))}
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <Link
                  href="/"
                  className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
                >
                  <span>Switch to Classic UI</span>
                  <ArrowUpRight className="w-3 h-3 text-[#ff5b2e]" />
                </Link>
                <div className="text-[11px] text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>SECURE V2</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
