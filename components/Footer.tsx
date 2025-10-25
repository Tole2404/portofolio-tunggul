'use client'

import { Github, Linkedin, Mail, Heart } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [settings, setSettings] = useState<Record<string, string>>({
    footer_name: 'Tunggul Bayu Kusuma',
    footer_tagline: 'Full Stack Developer crafting beautiful digital experiences with modern technologies.',
    footer_email: 'your.email@example.com',
    footer_phone: '+62 123 4567 8900',
    footer_location: 'Jakarta, Indonesia',
    footer_github: 'https://github.com',
    footer_linkedin: 'https://linkedin.com',
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

  const socialLinks = [
    { icon: <Github className="w-5 h-5" />, href: settings.footer_github, label: 'GitHub' },
    { icon: <Linkedin className="w-5 h-5" />, href: settings.footer_linkedin, label: 'LinkedIn' },
    { icon: <Mail className="w-5 h-5" />, href: `mailto:${settings.footer_email}`, label: 'Email' },
  ]

  const quickLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ]

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white mb-4">
              {settings.footer_name}<span className="text-primary-400">.</span>
            </h3>
            <p className="text-gray-400 mb-4 text-sm">
              {settings.footer_tagline}
            </p>
            <div className="flex gap-3">
              {socialLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                  aria-label={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Get In Touch</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href={`mailto:${settings.footer_email}`} className="hover:text-primary-400 transition-colors">
                  {settings.footer_email}
                </a>
              </li>
              <li>
                <a href={`tel:${settings.footer_phone.replace(/\s/g, '')}`} className="hover:text-primary-400 transition-colors">
                  {settings.footer_phone}
                </a>
              </li>
              <li>{settings.footer_location}</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
          {/* <div className="pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm text-center md:text-left">
                © {currentYear} {settings.footer_name}. All rights reserved.
              </p>
              <p className="text-gray-500 text-sm flex items-center gap-1">
                Built with <Heart className="w-4 h-4 text-red-500 fill-current animate-pulse" /> using Next.js & TailwindCSS
              </p>
            </div>
          </div> */}
      </div>
    </footer>
  )
}
