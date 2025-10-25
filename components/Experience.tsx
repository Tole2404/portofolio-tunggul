'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Briefcase, GraduationCap, Award, Calendar } from 'lucide-react'

interface Experience {
  id: string
  type: string
  title: string
  company: string
  location: string
  period: string
  description: string
  tags: string
  color: string
}

export default function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchExperiences()
  }, [])

  const fetchExperiences = async () => {
    try {
      const res = await fetch('/api/experience')
      const data = await res.json()
      setExperiences(data)
    } catch (error) {
      console.error('Failed to fetch experiences:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="experience" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800/50 dark:to-gray-900 relative overflow-hidden" ref={ref}>
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block mb-4"
          >
            <span className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 rounded-full text-sm font-semibold">
              MY JOURNEY
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Experience & Education
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A timeline of my professional growth and academic achievements
          </p>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-lg text-gray-600 dark:text-gray-400">Loading experience...</div>
          </div>
        ) : experiences.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">No experience available yet.</p>
          </div>
        ) : (
          /* Experience Timeline */
          <div className="relative">
            {/* Vertical Line */}
            <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-purple-500 to-pink-500 transform -translate-x-1/2"></div>

            <div className="space-y-12">
              {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                className={`relative flex flex-col lg:flex-row gap-8 ${
                  index % 2 === 0 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Dot */}
                <div className="hidden lg:flex absolute left-1/2 top-8 w-6 h-6 rounded-full bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-900 border-4 border-primary-500 transform -translate-x-1/2 z-10 shadow-lg">
                  <div className={`absolute inset-1 rounded-full bg-gradient-to-br ${exp.color}`}></div>
                </div>

                {/* Content Card */}
                <div className="lg:w-[calc(50%-2rem)]">
                  <div className="relative bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
                    {/* Decorative Gradient */}
                    <div className={`absolute top-0 ${index % 2 === 0 ? 'right-0' : 'left-0'} w-2 h-full bg-gradient-to-b ${exp.color}`}></div>
                    <div className={`absolute -top-10 ${index % 2 === 0 ? '-right-10' : '-left-10'} w-32 h-32 bg-gradient-to-br ${exp.color} opacity-10 rounded-full blur-2xl`}></div>

                    {/* Header */}
                    <div className="relative flex items-start gap-4 mb-6">
                      <div className={`flex-shrink-0 p-4 bg-gradient-to-br ${exp.color} rounded-2xl text-white shadow-xl`}>
                        {exp.type === 'work' ? (
                          <Briefcase className="w-6 h-6" />
                        ) : (
                          <GraduationCap className="w-6 h-6" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className={`text-sm font-bold bg-gradient-to-r ${exp.color} bg-clip-text text-transparent`}>
                            {exp.period}
                          </span>
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold mb-1 line-clamp-2 break-words">{exp.title}</h3>
                        <div className="flex flex-wrap items-center gap-2 text-gray-600 dark:text-gray-400">
                          <span className="font-semibold text-sm sm:text-base line-clamp-1 break-words">{exp.company}</span>
                          <span>•</span>
                          <span className="text-xs sm:text-sm line-clamp-1">{exp.location}</span>
                        </div>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 leading-relaxed mb-6 break-words">
                      {exp.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {JSON.parse(exp.tags).map((tag: string, tagIndex: number) => (
                        <span
                          key={tagIndex}
                          className="px-4 py-2 text-xs font-semibold bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Spacer for timeline */}
                <div className="hidden lg:block lg:w-[calc(50%-2rem)]"></div>
              </motion.div>
            ))}
            </div>
          </div>
        )}

        {/* Download Resume Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-16"
        >
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold transition-all hover:scale-105 shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Resume
          </a>
        </motion.div>
      </div>
    </section>
  )
}
