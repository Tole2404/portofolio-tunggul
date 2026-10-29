'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, Phone, MapPin, Github, Linkedin, Download, CheckCircle2, ArrowUp, Terminal } from 'lucide-react'
import { sound } from './AudioEngine'

export default function ContactV2() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSending, setIsSending] = useState(false)
  const [statusMessage, setStatusMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    sound.playClick()
    setIsSending(true)
    setStatusMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await res.json()

      if (res.ok) {
        setStatusMessage('TRANSMISSION_SUCCESS: Message delivered to Tunggul.')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatusMessage(`ERROR: ${data.error || 'Failed to transmit.'}`)
      }
    } catch (err) {
      // Offline fallback
      setStatusMessage('TRANSMISSION_QUEUED: Direct email: tunggulbayukusuma@gmail.com')
    } finally {
      setIsSending(false)
      setTimeout(() => setStatusMessage(''), 7000)
    }
  }

  const scrollToTop = () => {
    sound.playWarp()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section id="contact" className="py-28 relative font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-[#ff5b2e] shadow-[0_0_8px_#ff5b2e]" />
            <span className="text-[#ff5b2e] text-xs tracking-[0.25em] font-semibold uppercase">
              06 / 06 TRANSMISSION & CONNECT
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-white font-sans tracking-tight">
            INITIATE COMMUNICATION
          </h2>
          <p className="text-gray-400 text-sm font-sans mt-2 max-w-xl">
            Tertarik berdiskusi peluang kerja, kolaborasi proyek, atau ingin mengundang wawancara? Kirim transmisi langsung ke sistem saya.
          </p>
        </div>

        {/* Main Grid: Info + Terminal Form */}
        <div className="grid lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Terminal Channel Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0c0c16] border border-white/10 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs">
                <span className="text-gray-400">// DIRECT_CHANNELS</span>
                <span className="text-emerald-400 font-mono">ENCRYPTED</span>
              </div>

              {/* Email */}
              <a
                href="mailto:tunggulbayukusuma@gmail.com"
                onClick={() => sound.playClick()}
                className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#ff5b2e]/50 hover:bg-white/[0.05] transition-all group"
              >
                <div className="p-3 rounded-lg bg-[#ff5b2e]/10 text-[#ff5b2e] group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase">Primary Email</div>
                  <div className="text-sm text-gray-200 group-hover:text-white font-sans font-medium">
                    tunggulbayukusuma@gmail.com
                  </div>
                </div>
              </a>

              {/* WhatsApp / Phone */}
              <a
                href="https://wa.me/6287720912755"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => sound.playClick()}
                className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5 hover:border-[#00f0ff]/50 hover:bg-white/[0.05] transition-all group"
              >
                <div className="p-3 rounded-lg bg-[#00f0ff]/10 text-[#00f0ff] group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase">WhatsApp / Phone</div>
                  <div className="text-sm text-gray-200 group-hover:text-white font-sans font-medium">
                    +62 877 2091 2755
                  </div>
                </div>
              </a>

              {/* Location */}
              <div className="flex items-center gap-4 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="p-3 rounded-lg bg-purple-500/10 text-purple-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase">Current Station</div>
                  <div className="text-sm text-gray-200 font-sans font-medium">
                    Tangerang / Jakarta, Indonesia
                  </div>
                </div>
              </div>

              {/* CV Action */}
              <div className="pt-2">
                <a
                  href="/cv/CV_1761406319709_Tunggul_Bayu_Kusuma__CV_.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white text-xs font-semibold flex items-center justify-center gap-2 transition-all hover:border-[#ff5b2e]/60"
                >
                  <Download className="w-4 h-4 text-[#ff5b2e]" />
                  <span>DOWNLOAD FORMAL CV (PDF)</span>
                </a>
              </div>

            </div>

            {/* Social Links */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/10 flex items-center justify-between">
              <span className="text-xs text-gray-400">CONNECT NETWORKS</span>
              <div className="flex gap-2">
                <a
                  href="https://github.com/Tole2404"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-4 h-4" />
                </a>
                <a
                  href="https://www.linkedin.com/in/tunggulbayukusuma/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => sound.playClick()}
                  className="p-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-[#00f0ff] transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Terminal Transmission Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-8 rounded-2xl bg-[#0c0c16] border border-white/10 shadow-xl relative overflow-hidden">
              
              <div className="flex items-center justify-between pb-4 border-b border-white/10 text-xs text-gray-400 mb-6">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-[#ff5b2e]" />
                  <span>TRANSMISSION_TERMINAL // v2.4</span>
                </div>
                <span className="text-[11px] text-gray-500">FORMAT: JSON</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] text-gray-400 uppercase mb-1.5">
                      YOUR NAME *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. John Doe / Tech Recruiter"
                      className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 focus:border-[#ff5b2e] focus:outline-none text-white text-xs font-mono transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-gray-400 uppercase mb-1.5">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@company.com"
                      className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 focus:border-[#ff5b2e] focus:outline-none text-white text-xs font-mono transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-gray-400 uppercase mb-1.5">
                    SUBJECT / INQUIRY TOPIC *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Full Stack Opportunity / Collaboration"
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 focus:border-[#ff5b2e] focus:outline-none text-white text-xs font-mono transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-gray-400 uppercase mb-1.5">
                    MESSAGE PAYLOAD *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Detail regarding role, requirements, or project scope..."
                    className="w-full px-4 py-3 rounded-lg bg-white/[0.03] border border-white/10 focus:border-[#ff5b2e] focus:outline-none text-white text-xs font-mono transition-colors resize-none"
                  />
                </div>

                {/* Status Message */}
                {statusMessage && (
                  <div className="p-3 rounded-lg bg-white/5 border border-[#ff5b2e]/40 text-xs text-gray-200 font-mono">
                    {statusMessage}
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-[#ff5b2e] to-[#ff3b00] hover:from-[#ff4816] hover:to-[#ff2800] text-white text-xs font-bold tracking-widest uppercase flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,91,46,0.35)] transition-all disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSending ? 'TRANSMITTING...' : 'TRANSMIT MESSAGE PAYLOAD'}</span>
                </button>
              </form>

            </div>
          </div>

        </div>

        {/* Cyber Outro Footer */}
        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div>
            © {new Date().getFullYear()} Tunggul Bayu Kusuma. Handcrafted with Next.js & Cybernetics.
          </div>

          <div className="flex items-center gap-4">
            <span className="text-gray-400 font-mono">dev.tol3.ai.id</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white border border-white/10 flex items-center gap-1 transition-colors"
            >
              <span>TOP</span>
              <ArrowUp className="w-3.5 h-3.5 text-[#ff5b2e]" />
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}
