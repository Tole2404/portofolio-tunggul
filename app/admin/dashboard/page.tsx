'use client'

import { useEffect, useState } from 'react'
import { FolderKanban, Award, Briefcase, TrendingUp } from 'lucide-react'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    skills: 0,
    experience: 0
  })

  useEffect(() => {
    // Fetch stats
    const fetchStats = async () => {
      try {
        const [projects, skills, experience] = await Promise.all([
          fetch('/api/projects').then(r => r.json()),
          fetch('/api/skills').then(r => r.json()),
          fetch('/api/experience').then(r => r.json())
        ])

        setStats({
          projects: projects.length || 0,
          skills: skills.length || 0,
          experience: experience.length || 0
        })
      } catch (error) {
        console.error('Failed to fetch stats:', error)
      }
    }

    fetchStats()
  }, [])

  const cards = [
    {
      title: 'Total Projects',
      value: stats.projects,
      icon: <FolderKanban className="w-8 h-8" />,
      color: 'from-blue-500 to-cyan-500',
      href: '/admin/dashboard/projects'
    },
    {
      title: 'Total Skills',
      value: stats.skills,
      icon: <Award className="w-8 h-8" />,
      color: 'from-purple-500 to-pink-500',
      href: '/admin/dashboard/skills'
    },
    {
      title: 'Total Experience',
      value: stats.experience,
      icon: <Briefcase className="w-8 h-8" />,
      color: 'from-orange-500 to-red-500',
      href: '/admin/dashboard/experience'
    }
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Dashboard</h1>
        <p className="text-gray-600 dark:text-gray-400">Welcome back! Here's your portfolio overview.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {cards.map((card, index) => (
          <div
            key={index}
            className="relative bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700 shadow-lg overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${card.color} opacity-10 rounded-full blur-2xl`}></div>
            
            <div className="relative">
              <div className={`inline-flex p-3 bg-gradient-to-br ${card.color} rounded-xl text-white mb-4`}>
                {card.icon}
              </div>
              
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                {card.value}
              </div>
              
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {card.title}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <a
            href="/admin/dashboard/projects"
            className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-center font-medium"
          >
            Manage Projects
          </a>
          <a
            href="/admin/dashboard/skills"
            className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-center font-medium"
          >
            Manage Skills
          </a>
          <a
            href="/admin/dashboard/experience"
            className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-center font-medium"
          >
            Manage Experience
          </a>
        </div>
      </div>
    </div>
  )
}
