'use client'

import { motion } from 'framer-motion'
import { Github, Linkedin, Mail, Download, ExternalLink } from 'lucide-react'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Hero() {
  const [settings, setSettings] = useState<Record<string, string>>({
    hero_name: 'Your Name',
    hero_title: 'Full Stack Developer & UI/UX Enthusiast',
    hero_description: 'I craft beautiful, functional, and user-centered digital experiences with passion and precision, specialized in building modern web applications using cutting-edge technologies and best practices to deliver exceptional results',
    hero_image: 'assets/images/pp.jpg',
    hero_github: 'https://github.com',
    hero_linkedin: 'https://linkedin.com',
    hero_email: 'your.email@example.com',
    hero_available: 'true',
    hero_cv: '/cv/Tunggul_Bayu_Kusuma_CV.pdf',
    about_years: ''
  })

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings')
      const data = await res.json()
      setSettings(prev => ({ ...prev, ...data }))
    } catch (error) {
      console.error('Failed to fetch settings:', error)
    }
  }

  return (
    <section id="home" className="min-h-screen flex items-center relative overflow-hidden pt-20 pb-16">
      {/* Grid Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-50 via-transparent to-purple-50 dark:from-primary-950/20 dark:via-transparent dark:to-purple-950/20"></div>
      </div>

      {/* Mobile Background Image - Only visible on mobile */}
      <div className="lg:hidden absolute inset-0 -z-5">
        <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/70 to-white/90 dark:from-gray-900/60 dark:via-gray-900/70 dark:to-gray-900/90 z-10"></div>
        <Image
          src={settings.hero_image || 'assets/images/pp.jpg'}
          alt="Background"
          fill
          className="object-cover object-top opacity-60 dark:opacity-40"
          priority
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            {settings.hero_available === 'true' && (
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full mb-6">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500"></span>
                </span>
                <span className="text-sm font-medium text-primary-700 dark:text-primary-300">Available for work</span>
              </div>
            )}

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 leading-tight lg:text-shadow-none text-shadow-lg">
              Hi, I'm{' '}
              <span className="relative inline-block">
                <span className="relative z-10 bg-gradient-to-r from-primary-600 via-purple-600 to-pink-600 bg-clip-text text-transparent lg:text-shadow-none drop-shadow-lg break-words">
                  {settings.hero_name}
                </span>
                <span className="absolute bottom-2 left-0 w-full h-3 bg-primary-200 dark:bg-primary-800 -z-10"></span>
              </span>
            </h1>

            <p className="text-lg sm:text-xl lg:text-2xl text-gray-900 dark:text-gray-100 mb-4 font-medium lg:text-gray-600 lg:dark:text-gray-300 drop-shadow-md lg:drop-shadow-none line-clamp-2 lg:line-clamp-none">
              {settings.hero_title}
            </p>

            <p className="text-base sm:text-lg text-gray-800 dark:text-gray-200 mb-8 leading-relaxed lg:text-gray-600 lg:dark:text-gray-400 drop-shadow-md lg:drop-shadow-none line-clamp-3 lg:line-clamp-none max-w-2xl">
              {settings.hero_description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-semibold hover:gap-3 transition-all shadow-lg hover:shadow-xl"
              >
                View Projects
                <ExternalLink className="w-4 h-4 group-hover:rotate-12 transition-transform" />
              </a>
              <a
                href={settings.hero_cv || '/cv/Tunggul_Bayu_Kusuma_CV.pdf'}
                download="Tunggul_Bayu_Kusuma_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white rounded-lg font-semibold hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all"
              >
                <Download className="w-4 h-4" />
                Download CV
              </a>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500 dark:text-gray-400">Connect:</span>
              <div className="flex gap-3">
                <a
                  href={settings.hero_github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href={settings.hero_linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={`mailto:${settings.hero_email}`}
                  className="p-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Image - Hidden on mobile, visible on desktop */}
          <motion.div
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 relative hidden lg:block"
          >
            <div className="relative">
              {/* Floating Decorative Shapes */}
              <div className="absolute -top-8 -left-8 w-16 h-16 border-4 border-amber-400 rotate-12 opacity-60"></div>
              <div className="absolute -top-4 -right-12 w-12 h-12 border-4 border-orange-500 rounded-full opacity-60"></div>
              <div className="absolute -bottom-8 -left-12 w-14 h-14 border-4 border-yellow-500 rotate-45 opacity-60"></div>
              
              {/* Main Image Container with Arch Frame */}
              <div className="relative z-10">
                {/* Arch Background with Border */}
                <div className="relative">
                  {/* Colored Background Arch */}
                  <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-blue-500 dark:from-sky-500 dark:to-blue-600 rounded-t-full rounded-b-3xl"></div>
                  
                  {/* Border Frame */}
                  <div className="absolute -inset-2 border-4 border-slate-700 dark:border-slate-600 rounded-t-full rounded-b-3xl"></div>
                  
                  {/* Image Container */}
                  <div className="relative aspect-[1/1] overflow-hidden rounded-t-full rounded-b-3xl">
                    {/* Profile Image - Will show person only when background is removed */}
                    <Image
                      src={settings.hero_image || 'assets/images/pp.jpg'}
                      alt="Profile"
                      fill
                      className="object-cover object-center"
                      priority
                    />
                  </div>
                </div>
                
                {/* Floating Badge - Only show if years data exists */}
                {settings.about_years && (
                  <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl p-5 shadow-2xl border-4 border-white dark:border-slate-800">
                    <div className="text-white text-center">
                      <div className="text-3xl font-bold">{settings.about_years}</div>
                      <div className="text-xs font-semibold tracking-wide">YEARS</div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  )
}
