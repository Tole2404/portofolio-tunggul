'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Code2, Database, Wrench, Palette } from 'lucide-react'

interface Skill {
  id: string
  name: string
  level: number
  category: string
  icon: string
  color: string
}

const categoryIcons: Record<string, JSX.Element> = {
  'Frontend': <Code2 className="w-6 h-6" />,
  'Backend': <Database className="w-6 h-6" />,
  'Tools': <Wrench className="w-6 h-6" />,
  'Design': <Palette className="w-6 h-6" />,
}

const categoryColors: Record<string, string> = {
  'Frontend': 'from-blue-500 to-cyan-500',
  'Backend': 'from-green-500 to-emerald-500',
  'Tools': 'from-orange-500 to-red-500',
  'Design': 'from-purple-500 to-pink-500',
}

export default function Skills() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    try {
      const res = await fetch('/api/skills')
      const data = await res.json()
      setSkills(data)
    } catch (error) {
      console.error('Failed to fetch skills:', error)
    } finally {
      setLoading(false)
    }
  }

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  const skillCategories = Object.entries(groupedSkills).map(([category, categorySkills]) => ({
    icon: categoryIcons[category] || <Code2 className="w-6 h-6" />,
    title: category,
    color: categoryColors[category] || 'from-blue-500 to-cyan-500',
    skills: categorySkills.map(s => ({ name: s.name, level: s.level }))
  }))

  return (
    <section id="skills" className="py-20 bg-white dark:bg-gray-900 relative overflow-hidden" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
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
              WHAT I DO
            </span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Skills & Expertise
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            A comprehensive overview of my technical skills and professional competencies
          </p>
        </motion.div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-12">
            <div className="text-lg text-gray-600 dark:text-gray-400">Loading skills...</div>
          </div>
        ) : skillCategories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-400">No skills available yet.</p>
          </div>
        ) : (
          /* Skills Categories */
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-4 sm:gap-6">
            {skillCategories.map((category, catIndex) => (
            <motion.div
              key={catIndex}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              className="group"
            >
              {/* Category Card */}
              <div className="relative h-full bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-800/50 rounded-2xl sm:rounded-3xl p-5 sm:p-8 border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden">
                {/* Decorative Elements */}
                <div className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br ${category.color} opacity-10 rounded-full blur-3xl`}></div>
                <div className={`absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br ${category.color} opacity-5 rounded-full blur-2xl`}></div>
                
                {/* Header */}
                <div className="relative flex items-start justify-between mb-5 sm:mb-8">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`p-3 sm:p-4 bg-gradient-to-br ${category.color} rounded-xl sm:rounded-2xl text-white shadow-xl`}>
                      {category.icon}
                    </div>
                    <div>
                      <h3 className="text-base sm:text-xl font-bold mb-0.5 sm:mb-1">{category.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{category.skills.length} Skills</p>
                    </div>
                  </div>
                </div>

                {/* Skills Badges */}
                <div className="relative flex flex-wrap gap-2 sm:gap-3">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skillIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ 
                        duration: 0.3, 
                        delay: catIndex * 0.1 + skillIndex * 0.05,
                        ease: "easeOut"
                      }}
                      whileHover={{ scale: 1.05 }}
                      className="group/skill"
                    >
                      <div className="relative px-3 sm:px-4 py-1.5 sm:py-2 bg-gray-100 dark:bg-gray-700/50 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-all cursor-default border border-gray-200 dark:border-gray-600">
                        <span className="relative text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-200">
                          {skill.name}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
          </div>
        )}
      </div>
    </section>
  )
}
