'use client'

import React, { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Github, CheckCircle2, AlertTriangle, Lightbulb, UserCheck, Calendar, Users } from 'lucide-react'
import Image from 'next/image'
import { sound } from './AudioEngine'

export interface ProjectDetail {
  id: string
  title: string
  tagline: string
  category: string
  image: string
  tags: string[]
  github: string
  demo?: string
  featured?: boolean
  role: string
  timeline: string
  teamSize: string
  fullDescription: string
  features: string[]
  challenges: string
  solutions: string
}

interface ProjectModalV2Props {
  project: ProjectDetail | null
  isOpen: boolean
  onClose: () => void
}

export default function ProjectModalV2({ project, isOpen, onClose }: ProjectModalV2Props) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      window.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.body.style.overflow = 'unset'
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, onClose])

  if (!project) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 font-mono">
          
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              sound.playClick()
              onClose()
            }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Cyber Modal Window */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.25 }}
            className="relative w-full max-w-4xl max-h-[90vh] bg-[#0c0c16] border border-[#ff5b2e]/40 rounded-2xl shadow-[0_0_50px_rgba(255,91,46,0.25)] flex flex-col overflow-hidden z-10"
          >
            {/* Top Telemetry Header */}
            <div className="px-6 py-4 bg-[#11111e] border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-[#ff5b2e] animate-ping" />
                <span className="text-gray-400 font-mono">PROJECT_DOSSIER //</span>
                <span className="text-[#ff5b2e] font-bold uppercase">{project.category}</span>
              </div>
              <button
                onClick={() => {
                  sound.playClick()
                  onClose()
                }}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Content Body */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-8 custom-scrollbar">
              
              {/* Title & Actions */}
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white font-sans">
                    {project.title}
                  </h2>
                  <p className="text-sm text-gray-400 font-sans mt-1">
                    {project.tagline}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {project.demo && (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playClick()}
                      className="px-4 py-2 rounded-lg bg-[#ff5b2e] hover:bg-[#ff4210] text-white text-xs font-semibold flex items-center gap-1.5 shadow-[0_0_15px_rgba(255,91,46,0.4)] transition-all"
                    >
                      <span>LIVE DEMO</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => sound.playClick()}
                      className="px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-xs flex items-center gap-1.5 transition-colors"
                    >
                      <Github className="w-3.5 h-3.5 text-[#00f0ff]" />
                      <span>REPOSITORY</span>
                    </a>
                  )}
                </div>
              </div>

              {/* Meta Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/10 text-xs">
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase">Role</span>
                  <span className="text-white font-semibold font-sans">{project.role}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase">Timeline</span>
                  <span className="text-white font-semibold font-sans">{project.timeline}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase">Team</span>
                  <span className="text-white font-semibold font-sans">{project.teamSize}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase">Architecture</span>
                  <span className="text-[#00f0ff] font-semibold">{project.tags[0] || 'Full Stack'}</span>
                </div>
              </div>

              {/* Banner Image */}
              <div className="relative h-64 sm:h-80 w-full rounded-xl overflow-hidden border border-white/10 bg-slate-900">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c16] via-transparent to-transparent opacity-80" />
              </div>

              {/* Description */}
              <div>
                <h3 className="text-xs text-[#ff5b2e] tracking-widest font-mono uppercase mb-2">
                  // EXECUTIVE SUMMARY
                </h3>
                <p className="text-gray-300 text-sm sm:text-base font-sans leading-relaxed">
                  {project.fullDescription}
                </p>
              </div>

              {/* Features List */}
              {project.features && project.features.length > 0 && (
                <div>
                  <h3 className="text-xs text-[#00f0ff] tracking-widest font-mono uppercase mb-3">
                    // KEY CAPABILITIES & FEATURES
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-2.5">
                    {project.features.map((feat, fIdx) => (
                      <div key={fIdx} className="p-3 rounded-lg bg-white/[0.02] border border-white/10 flex items-start gap-2.5 text-xs text-gray-300 font-sans">
                        <CheckCircle2 className="w-4 h-4 text-[#00f0ff] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Challenges & Solutions (STAR format) */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-red-950/20 border border-red-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-red-400 font-mono">
                    <AlertTriangle className="w-4 h-4" />
                    <span>CHALLENGE FACED</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
                    {project.challenges}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-emerald-950/20 border border-emerald-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
                    <Lightbulb className="w-4 h-4" />
                    <span>ENGINEERING SOLUTION</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-300 font-sans leading-relaxed">
                    {project.solutions}
                  </p>
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
                {project.tags.map((t, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded text-xs bg-white/5 border border-white/10 text-gray-300 font-mono"
                  >
                    #{t}
                  </span>
                ))}
              </div>

            </div>

            {/* Bottom Bar */}
            <div className="px-6 py-3 bg-[#11111e] border-t border-white/10 flex items-center justify-between text-[11px] text-gray-500">
              <span>STATUS: PRODUCTION READY</span>
              <button
                onClick={() => {
                  sound.playClick()
                  onClose()
                }}
                className="text-gray-300 hover:text-white"
              >
                [ CLOSE MODAL ]
              </button>
            </div>

          </motion.div>

        </div>
      )}
    </AnimatePresence>
  )
}
