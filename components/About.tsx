'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Code2, Palette, Zap, Award, Coffee, Target } from 'lucide-react'

export default function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [settings, setSettings] = useState<Record<string, string>>({
    about_description: '',
    about_years_experience: '3+',
    about_projects_completed: '50+',
    about_happy_clients: '30+'
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

  const stats = [
    { number: settings.about_projects_completed || '50+', label: 'Projects Completed', icon: <Target className="w-5 h-5" /> },
    { number: settings.about_years_experience || '3+', label: 'Years Experience', icon: <Award className="w-5 h-5" /> },
    { number: settings.about_happy_clients || '30+', label: 'Happy Clients', icon: <Coffee className="w-5 h-5" /> },
  ]

  const values = [
    { icon: <Code2 className="w-6 h-6" />, title: 'Quality First', desc: 'Clean, maintainable code' },
    { icon: <Zap className="w-6 h-6" />, title: 'Fast Delivery', desc: 'Efficient workflows' },
    { icon: <Palette className="w-6 h-6" />, title: 'User-Centric', desc: 'Beautiful interfaces' },
  ]

  return (
    <section id="about" className="py-20 relative overflow-hidden" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="inline-block">
            <h2 className="text-4xl md:text-5xl font-bold mb-2">
              About Me
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-primary-600 to-purple-600 rounded-full"></div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-6 lg:gap-12 items-start">
          {/* Left Content - 3 columns */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3 space-y-4 sm:space-y-6"
          >
            <div className="prose prose-lg dark:prose-invert max-w-none">
              {settings.about_description ? (
                <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-line break-words">
                  {settings.about_description}
                </p>
              ) : (
                <>
                  <p className="text-sm sm:text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    I'm a <span className="font-semibold text-gray-900 dark:text-white">Full Stack Developer</span> with a passion for 
                    creating digital products that make a difference. I combine technical expertise with creative 
                    problem-solving to build web applications that are both functional and beautiful.
                  </p>
                  <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed">
                    My journey in web development started with curiosity and has evolved into a career I'm truly 
                    passionate about. I believe in writing clean code, following best practices, and continuously 
                    learning new technologies to stay ahead in this fast-paced industry.
                  </p>
                </>
              )}
            </div>

            {/* Stats - Mobile: 2 columns side by side */}
            <div className="grid grid-cols-2 sm:hidden gap-3">
              {stats.slice(0, 2).map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                  className="relative"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-purple-500 rounded-lg blur opacity-20"></div>
                  <div className="relative p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex items-center justify-between mb-1">
                      <div className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                        {stat.number}
                      </div>
                      <div className="text-primary-600 dark:text-primary-400">
                        {stat.icon}
                      </div>
                    </div>
                    <div className="text-xs font-medium text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Values */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 pt-2 sm:pt-6">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="p-3 sm:p-4 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
                >
                  <div className="text-primary-600 dark:text-primary-400 mb-1.5 sm:mb-2">{value.icon}</div>
                  <h4 className="font-semibold text-xs sm:text-sm mb-0.5 sm:mb-1">{value.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{value.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 sm:pt-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg font-semibold shadow-lg"
              >
                Let's Work Together
              </a>
              <a
                href="#projects"
                className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white rounded-lg font-semibold"
              >
                View My Work
              </a>
            </div>
          </motion.div>

          {/* Right Stats - 2 columns - Hidden on mobile, shown on sm+ */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hidden sm:block lg:col-span-2 space-y-4"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-purple-500 rounded-xl blur opacity-25"></div>
                <div className="relative p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                      {stat.number}
                    </div>
                    <div className="text-primary-600 dark:text-primary-400">
                      {stat.icon}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>              
                </div>
              </motion.div>
            ))}

            {/* Tech Stack Preview */}           
          </motion.div>
        </div>
      </div>
    </section>
  )
}
