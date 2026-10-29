'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal, Shield, ArrowRight, Sparkles } from 'lucide-react'
import { sound } from './AudioEngine'

interface BootSequenceProps {
  onEnter: () => void
}

export default function BootSequence({ onEnter }: BootSequenceProps) {
  const [bootProgress, setBootProgress] = useState(0)
  const [logText, setLogText] = useState('CONNECTING TO NEURAL MESH...')
  const [isReady, setIsReady] = useState(false)

  const logs = [
    'CONNECTING TO NEURAL MESH...',
    'LOADING DEV.TOL3.AI.ID RUNTIME...',
    'DECRYPTING PORTFOLIO MODULES...',
    'MOUNTING 3D ORBITAL PARTICLE CORE...',
    'SYSTEM READY: TUNGGUL BAYU KUSUMA'
  ]

  useEffect(() => {
    let currentLog = 0
    const logInterval = setInterval(() => {
      currentLog++
      if (currentLog < logs.length) {
        setLogText(logs[currentLog])
      }
    }, 350)

    const progressInterval = setInterval(() => {
      setBootProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          clearInterval(logInterval)
          setIsReady(true)
          return 100
        }
        return prev + 10
      })
    }, 120)

    return () => {
      clearInterval(logInterval)
      clearInterval(progressInterval)
    }
  }, [])

  const handleStart = () => {
    sound.playWarp()
    onEnter()
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="fixed inset-0 z-[200] bg-[#07070b] flex flex-col items-center justify-center p-6 font-mono select-none"
    >
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,91,46,0.1)_0%,rgba(7,7,11,1)_70%)] pointer-events-none" />

      {/* Terminal Box */}
      <div className="relative z-10 w-full max-w-lg bg-[#0c0c16] border border-[#ff5b2e]/30 rounded-2xl p-8 shadow-[0_0_60px_rgba(255,91,46,0.2)]">
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs text-gray-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5b2e] animate-ping" />
            <span className="text-white font-bold">TUNGGUL_SYS // BOOTLOADER</span>
          </div>
          <span className="text-[11px] text-gray-500 font-mono">v2.4.0</span>
        </div>

        {/* Center Progress */}
        <div className="py-8 space-y-5">
          <div className="flex items-center justify-between text-xs">
            <span className="text-gray-400 text-[11px] truncate">{logText}</span>
            <span className="text-[#ff5b2e] font-bold ml-2">{bootProgress}%</span>
          </div>

          {/* Progress Bar */}
          <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#ff5b2e] via-[#ff8a50] to-[#00f0ff] transition-all duration-150"
              style={{ width: `${bootProgress}%` }}
            />
          </div>

          {/* Identity Subtitle */}
          <div className="pt-2 text-center">
            <h1 className="text-xl font-bold text-white font-sans tracking-wide">
              Tunggul Bayu Kusuma
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              Full Stack Software Engineer • MERN & PHP Ecosystems
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="pt-4 border-t border-white/10 flex flex-col gap-2">
          {isReady ? (
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={handleStart}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#ff5b2e] to-[#ff3b00] hover:from-[#ff4816] hover:to-[#ff2800] text-white text-xs font-bold tracking-[0.2em] uppercase flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(255,91,46,0.5)] transition-all group cursor-pointer"
            >
              <span>ENTER THE SYSTEM</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </motion.button>
          ) : (
            <div className="w-full py-4 text-center text-xs text-gray-500 font-mono">
              [ INITIALIZING SYSTEM CORE... ]
            </div>
          )}

          <button
            onClick={handleStart}
            className="text-[11px] text-gray-500 hover:text-gray-300 py-1 transition-colors text-center"
          >
            Skip boot sequence →
          </button>
        </div>

      </div>

      {/* Footer telemetry */}
      <div className="relative z-10 mt-8 text-center text-[10px] text-gray-600 font-mono">
        HOST: dev.tol3.ai.id // LATENCY: OPTIMAL
      </div>
    </motion.div>
  )
}
