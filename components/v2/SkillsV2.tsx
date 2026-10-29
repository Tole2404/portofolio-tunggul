'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Code2, Server, Database, Cpu, Wrench, Sparkles, Orbit } from 'lucide-react'
import { sound } from './AudioEngine'

interface SkillItem {
  name: string
  level: number // 1 to 100
  tier: 'Expert' | 'Advanced' | 'Competent'
  color: string
  notes: string
}

interface SkillCategory {
  id: string
  name: string
  icon: React.ReactNode
  skills: SkillItem[]
}

export default function SkillsV2() {
  const [activeTab, setActiveTab] = useState('all')
  const [hoveredSkill, setHoveredSkill] = useState<SkillItem | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const categories: SkillCategory[] = [
    {
      id: 'frontend',
      name: 'FRONTEND',
      icon: <Code2 className="w-4 h-4" />,
      skills: [
        { name: 'React', level: 88, tier: 'Advanced', color: '#00f0ff', notes: 'Hooks, Context, Component Life Cycle, Single Page Apps' },
        { name: 'Next.js 14', level: 85, tier: 'Advanced', color: '#ffffff', notes: 'App Router, Server Components, Static Export, API Routes' },
        { name: 'TypeScript / JS', level: 86, tier: 'Advanced', color: '#ffea00', notes: 'ES6+, Async/Await, Strict Types, DOM Manipulation' },
        { name: 'TailwindCSS', level: 90, tier: 'Expert', color: '#38bdf8', notes: 'Custom Tokens, Dark Mode, Responsive Grids, Flexbox' },
        { name: 'HTML5 & CSS3', level: 92, tier: 'Expert', color: '#ff5b2e', notes: 'Semantic Markup, Flex, Grid, Responsive Web Design' },
      ]
    },
    {
      id: 'backend',
      name: 'BACKEND & APIS',
      icon: <Server className="w-4 h-4" />,
      skills: [
        { name: 'Node.js & Express', level: 82, tier: 'Advanced', color: '#22c55e', notes: 'RESTful API Services, Middleware, JWT Auth' },
        { name: 'PHP', level: 86, tier: 'Advanced', color: '#818cf8', notes: 'Object-Oriented Programming, MVC Architecture' },
        { name: 'Laravel 11', level: 84, tier: 'Advanced', color: '#ef4444', notes: 'Eloquent ORM, Blade, Multi-Auth Guards, Sanctum' },
        { name: 'CodeIgniter 4', level: 85, tier: 'Advanced', color: '#f97316', notes: 'Enterprise Workflows, Multi-level Approval, Query Builder' },
        { name: 'RESTful API Architecture', level: 88, tier: 'Advanced', color: '#a855f7', notes: 'CRUD Endpoints, Error Handling, Request Validation' },
      ]
    },
    {
      id: 'database',
      name: 'DATABASES & ORM',
      icon: <Database className="w-4 h-4" />,
      skills: [
        { name: 'MySQL', level: 85, tier: 'Advanced', color: '#0284c7', notes: 'Relational Schema Design, Foreign Keys, Indexing' },
        { name: 'PostgreSQL', level: 80, tier: 'Competent', color: '#3b82f6', notes: 'Prisma Integration, Accelerate Connection Pooling' },
        { name: 'MongoDB', level: 80, tier: 'Competent', color: '#10b981', notes: 'Document Model, Mongoose ODM, NoSQL Schemas' },
        { name: 'Prisma ORM', level: 82, tier: 'Advanced', color: '#14b8a6', notes: 'Schema Generation, Migrations, Type-safe Queries' },
      ]
    },
    {
      id: 'iot',
      name: 'IOT & EMBEDDED',
      icon: <Cpu className="w-4 h-4" />,
      skills: [
        { name: 'Arduino (C++)', level: 80, tier: 'Competent', color: '#06b6d4', notes: 'Microcontroller Programming, Prototyping, FTI FAIR' },
        { name: 'Sensors & Actuators', level: 82, tier: 'Competent', color: '#ff5b2e', notes: 'DHT11, Servos, Relays, Real-Time Clocks (RTC)' },
      ]
    },
    {
      id: 'tools',
      name: 'DEV TOOLS',
      icon: <Wrench className="w-4 h-4" />,
      skills: [
        { name: 'Git & GitHub', level: 88, tier: 'Advanced', color: '#f97316', notes: 'Branching, Merge Workflows, Open Source Repos' },
        { name: 'Postman', level: 85, tier: 'Advanced', color: '#ff6c37', notes: 'API Testing, Documentation, Environment Variables' },
        { name: 'Vercel & Netlify', level: 88, tier: 'Advanced', color: '#ffffff', notes: 'Continuous Deployment, Serverless Functions' },
      ]
    }
  ]

  // Flattened for "all"
  const allSkills = categories.flatMap(c => c.skills)
  const displayedSkills = activeTab === 'all' 
    ? allSkills 
    : categories.find(c => c.id === activeTab)?.skills || []

  // Interactive 3D orbital animation in Canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let angle = 0
    let width = (canvas.width = canvas.parentElement?.clientWidth || 300)
    let height = (canvas.height = canvas.parentElement?.clientHeight || 300)

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return
      width = canvas.width = canvas.parentElement.clientWidth
      height = canvas.height = canvas.parentElement.clientHeight
    }
    window.addEventListener('resize', handleResize)

    const render = () => {
      ctx.clearRect(0, 0, width, height)
      angle += 0.012

      const cx = width / 2
      const cy = height / 2
      const radiusX = Math.min(width, height) * 0.42
      const radiusY = radiusX * 0.35

      // Draw Elliptical Orbit Ring
      ctx.save()
      ctx.translate(cx, cy)
      ctx.rotate(-0.2)

      // Ring path
      ctx.beginPath()
      ctx.ellipse(0, 0, radiusX, radiusY, 0, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(255, 91, 46, 0.25)'
      ctx.lineWidth = 1.5
      ctx.stroke()

      // Secondary ring
      ctx.beginPath()
      ctx.ellipse(0, 0, radiusX * 0.7, radiusY * 0.7, 0, 0, Math.PI * 2)
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.2)'
      ctx.lineWidth = 1
      ctx.stroke()

      // Core pulsating sun
      const coreGrad = ctx.createRadialGradient(0, 0, 2, 0, 0, 25)
      coreGrad.addColorStop(0, '#ff5b2e')
      coreGrad.addColorStop(0.5, 'rgba(255, 91, 46, 0.4)')
      coreGrad.addColorStop(1, 'rgba(255, 91, 46, 0)')
      ctx.fillStyle = coreGrad
      ctx.beginPath()
      ctx.arc(0, 0, 25, 0, Math.PI * 2)
      ctx.fill()

      // Orbiting satellites (5 nodes)
      const nodes = 5
      for (let i = 0; i < nodes; i++) {
        const theta = angle + (i * Math.PI * 2) / nodes
        const px = radiusX * Math.cos(theta)
        const py = radiusY * Math.sin(theta)

        // Depth scale
        const depth = (py + radiusY) / (radiusY * 2) // 0 to 1
        const nodeSize = 3 + depth * 3

        ctx.beginPath()
        ctx.arc(px, py, nodeSize, 0, Math.PI * 2)
        ctx.fillStyle = i % 2 === 0 ? '#ff5b2e' : '#00f0ff'
        ctx.shadowBlur = 10
        ctx.shadowColor = ctx.fillStyle
        ctx.fill()
        ctx.shadowBlur = 0
      }

      ctx.restore()
      animId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animId)
    }
  }, [])

  return (
    <section id="skills" className="py-28 relative font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-[#00f0ff] shadow-[0_0_8px_#00f0ff]" />
              <span className="text-[#00f0ff] text-xs tracking-[0.25em] font-semibold uppercase">
                03 / 06 TECH STACK & CORE SKILLS
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-bold text-white font-sans tracking-tight">
              ENGINEERING ARSENAL
            </h2>
            <p className="text-gray-400 text-sm font-sans mt-2 max-w-xl">
              Kemampuan teknis teruji dalam arsitektur Full Stack modern, perancangan database relasional & NoSQL, hingga integrasi sistem IoT.
            </p>
          </div>

          {/* Interactive 3D Orbital Widget Preview */}
          <div className="w-full md:w-64 h-36 relative bg-[#0c0c14] border border-white/10 rounded-xl overflow-hidden p-2 flex items-center justify-center">
            <canvas ref={canvasRef} className="w-full h-full block" />
            <div className="absolute top-2 left-2 text-[10px] text-gray-500 font-mono">
              [ ORBITAL MATRIX ]
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-white/10">
          <button
            onClick={() => {
              sound.playClick()
              setActiveTab('all')
            }}
            className={`px-4 py-2 rounded-lg text-xs tracking-wider transition-all flex items-center gap-2 ${
              activeTab === 'all'
                ? 'bg-[#ff5b2e] text-white shadow-[0_0_15px_rgba(255,91,46,0.5)] font-semibold'
                : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10'
            }`}
          >
            <Orbit className="w-3.5 h-3.5" />
            <span>ALL MODULES ({allSkills.length})</span>
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                sound.playClick()
                setActiveTab(cat.id)
              }}
              className={`px-4 py-2 rounded-lg text-xs tracking-wider transition-all flex items-center gap-2 ${
                activeTab === cat.id
                  ? 'bg-[#00f0ff] text-black shadow-[0_0_15px_rgba(0,240,255,0.5)] font-semibold'
                  : 'bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {cat.icon}
              <span>{cat.name}</span>
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {displayedSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
                onMouseEnter={() => {
                  sound.playHover()
                  setHoveredSkill(skill)
                }}
                className="group p-5 rounded-xl bg-[#0c0c14]/80 border border-white/10 hover:border-[#ff5b2e]/50 transition-all relative overflow-hidden backdrop-blur-sm"
              >
                {/* Neon Top Edge Indicator */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ backgroundColor: skill.color, boxShadow: `0 0 10px ${skill.color}` }}
                />

                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ backgroundColor: skill.color, boxShadow: `0 0 8px ${skill.color}` }}
                    />
                    <h3 className="text-white font-bold font-sans text-base group-hover:text-white transition-colors">
                      {skill.name}
                    </h3>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-gray-400 font-mono">
                    {skill.tier}
                  </span>
                </div>

                {/* Progress telemetry bar */}
                <div className="space-y-1.5 my-3">
                  <div className="flex justify-between text-[11px] text-gray-500 font-mono">
                    <span>PROFICIENCY</span>
                    <span className="text-gray-300 font-semibold">{skill.level}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full rounded-full"
                      style={{ backgroundColor: skill.color }}
                    />
                  </div>
                </div>

                {/* Note Description */}
                <p className="text-xs text-gray-400 font-sans leading-relaxed mt-2">
                  {skill.notes}
                </p>

              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
