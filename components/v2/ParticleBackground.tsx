'use client'

import React, { useEffect, useRef } from 'react'

interface Point3D {
  x: number
  y: number
  z: number
  origX: number
  origY: number
  origZ: number
  color: string
  size: number
}

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    let mouseX = 0
    let mouseY = 0
    let targetRotX = 0
    let targetRotY = 0
    let rotX = 0
    let rotY = 0

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = width / 2
      const centerY = height / 2
      mouseX = (e.clientX - centerX) / centerX
      mouseY = (e.clientY - centerY) / centerY
      targetRotY = mouseX * 0.4
      targetRotX = -mouseY * 0.4
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)

    // Generate 3D sphere & orbital particles
    const particleCount = window.innerWidth < 768 ? 220 : 420
    const particles: Point3D[] = []
    const radius = Math.min(width, height) * 0.38

    // Accent colors inspired by cyber neon palette
    const colors = ['#ff5b2e', '#ff8a50', '#00f0ff', '#38bdf8', '#a855f7', '#ffffff']

    for (let i = 0; i < particleCount; i++) {
      // Fibonacci sphere distribution for uniform 3D sphere
      const phi = Math.acos(1 - (2 * (i + 0.5)) / particleCount)
      const theta = Math.PI * (1 + Math.sqrt(5)) * i

      const r = radius * (0.75 + Math.random() * 0.5)
      const x = r * Math.sin(phi) * Math.cos(theta)
      const y = r * Math.sin(phi) * Math.sin(theta)
      const z = r * Math.cos(phi)

      particles.push({
        x,
        y,
        z,
        origX: x,
        origY: y,
        origZ: z,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 2 + 0.8
      })
    }

    const fov = 450 // Perspective depth

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Smooth rotation toward mouse target + continuous idle spin
      rotY += (targetRotY - rotY) * 0.05 + 0.002
      rotX += (targetRotX - rotX) * 0.05 + 0.0008

      const cosY = Math.cos(rotY)
      const sinY = Math.sin(rotY)
      const cosX = Math.cos(rotX)
      const sinX = Math.sin(rotX)

      const centerX = width / 2
      const centerY = height / 2

      // Subtle ambient background gradient
      const bgGrad = ctx.createRadialGradient(
        centerX,
        centerY,
        50,
        centerX,
        centerY,
        Math.max(width, height) * 0.7
      )
      bgGrad.addColorStop(0, 'rgba(255, 91, 46, 0.04)')
      bgGrad.addColorStop(0.5, 'rgba(168, 85, 247, 0.02)')
      bgGrad.addColorStop(1, 'rgba(7, 7, 11, 0)')
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, width, height)

      // Sort particles by Z so far particles are drawn first
      const projectedPoints: { x: number; y: number; z: number; size: number; color: string; alpha: number }[] = []

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]

        // 3D Rotation Matrix
        // Y-axis rotation
        let x1 = p.origX * cosY - p.origZ * sinY
        let z1 = p.origZ * cosY + p.origX * sinY

        // X-axis rotation
        let y1 = p.origY * cosX - z1 * sinX
        let z2 = z1 * cosX + p.origY * sinX

        // Perspective projection
        const scale = fov / (fov + z2 + 300)
        const projX = centerX + x1 * scale
        const projY = centerY + y1 * scale
        const alpha = Math.max(0.1, Math.min(1, (z2 + 300) / 600))

        projectedPoints.push({
          x: projX,
          y: projY,
          z: z2,
          size: p.size * scale,
          color: p.color,
          alpha
        })
      }

      // Draw faint constellation lines between nearby points
      ctx.lineWidth = 0.5
      const maxDist = 65
      for (let i = 0; i < projectedPoints.length; i += 2) {
        for (let j = i + 1; j < projectedPoints.length; j += 4) {
          const dx = projectedPoints[i].x - projectedPoints[j].x
          const dy = projectedPoints[i].y - projectedPoints[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.15 * projectedPoints[i].alpha
            ctx.strokeStyle = `rgba(255, 91, 46, ${lineAlpha})`
            ctx.beginPath()
            ctx.moveTo(projectedPoints[i].x, projectedPoints[i].y)
            ctx.lineTo(projectedPoints[j].x, projectedPoints[j].y)
            ctx.stroke()
          }
        }
      }

      // Draw particles
      for (let i = 0; i < projectedPoints.length; i++) {
        const pt = projectedPoints[i]
        ctx.beginPath()
        ctx.arc(pt.x, pt.y, Math.max(0.6, pt.size), 0, Math.PI * 2)
        ctx.fillStyle = pt.color
        ctx.globalAlpha = pt.alpha
        ctx.shadowBlur = pt.size > 2 ? 8 : 0
        ctx.shadowColor = pt.color
        ctx.fill()
      }
      ctx.globalAlpha = 1
      ctx.shadowBlur = 0

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
      />
      {/* Sci-fi vignette and scanlines */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(7,7,11,0.85)_100%)] pointer-events-none" />
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
    </div>
  )
}
