'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Zap, Terminal } from 'lucide-react'

export default function SplashScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)
  const [textIndex, setTextIndex] = useState(0)

  const loadingTexts = [
    "initializing vibe check...",
    "loading portfolio.exe",
    "welcome to my portfolio",
    "connecting to the matrix...",
    "almost there bestie..."
  ]

  useEffect(() => {
    // Text rotation
    const textInterval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % loadingTexts.length)
    }, 600)

    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          clearInterval(textInterval)
          setTimeout(() => setIsLoading(false), 300)
          return 100
        }
        return prev + 10
      })
    }, 150)

    return () => {
      clearInterval(interval)
      clearInterval(textInterval)
    }
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black"
        >
          {/* Animated Background */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Neon Glow Effects */}
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full blur-[120px]"
            />
            <motion.div
              animate={{
                scale: [1.3, 1, 1.3],
                opacity: [0.15, 0.3, 0.15],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px]"
            />
            
            {/* Scanline Effect */}
            <motion.div
              animate={{ y: ["0%", "100%"] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear"
              }}
              className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent h-32"
            />
            
            {/* Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#0ff1_1px,transparent_1px),linear-gradient(to_bottom,#0ff1_1px,transparent_1px)] bg-[size:50px_50px]"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center gap-6 px-4">
            {/* Terminal Logo */}
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 15,
                duration: 0.6
              }}
              className="relative"
            >
              {/* Glitch Effect Container */}
              <div className="relative">
                {/* Main Terminal */}
                <motion.div
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(6, 182, 212, 0.3)",
                      "0 0 40px rgba(6, 182, 212, 0.5)",
                      "0 0 20px rgba(6, 182, 212, 0.3)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="relative w-20 h-20 sm:w-28 sm:h-28 bg-black border-2 border-cyan-500 rounded-lg flex items-center justify-center"
                >
                  <Terminal className="w-10 h-10 sm:w-14 sm:h-14 text-cyan-400" strokeWidth={2} />
                  
                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-400"></div>
                  <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-400"></div>
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-400"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-400"></div>
                </motion.div>
                
                {/* Lightning Bolt */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute -top-3 -right-3"
                >
                  <Zap className="w-8 h-8 text-yellow-400 fill-yellow-400 drop-shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
                </motion.div>
              </div>
            </motion.div>

            {/* Text Animation */}
            <div className="text-center space-y-4">
              {/* Main Title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative"
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight">
                  <span className="text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                    LET'S
                  </span>
                  <br />
                  <motion.span
                    animate={{
                      textShadow: [
                        "0 0 20px rgba(6, 182, 212, 0.8)",
                        "0 0 40px rgba(6, 182, 212, 1)",
                        "0 0 20px rgba(6, 182, 212, 0.8)"
                      ]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="text-cyan-400"
                  >
                    GO!
                  </motion.span>
                </h1>
                
                {/* Glitch Effect Text */}
                <motion.div
                  animate={{
                    opacity: [0, 1, 0],
                    x: [-2, 2, -2]
                  }}
                  transition={{
                    duration: 0.3,
                    repeat: Infinity,
                    repeatDelay: 2
                  }}
                  className="absolute inset-0 text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-purple-500 mix-blend-screen"
                  aria-hidden="true"
                >
                  LET'S<br />GO!
                </motion.div>
              </motion.div>
              
              {/* Loading Text */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="font-mono text-sm sm:text-base"
              >
                <span className="text-cyan-400">&gt;</span>
                <motion.span
                  key={textIndex}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-white/90 ml-2"
                >
                  {loadingTexts[textIndex]}
                </motion.span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="text-cyan-400 ml-1"
                >
                  _
                </motion.span>
              </motion.div>
            </div>

            {/* Progress Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="w-72 sm:w-96 space-y-3"
            >
              {/* Progress Container */}
              <div className="relative h-3 bg-gray-900 rounded border border-cyan-500/30 overflow-hidden">
                {/* Progress Fill */}
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.2 }}
                  className="absolute h-full bg-gradient-to-r from-cyan-500 via-cyan-400 to-cyan-500 relative"
                  style={{
                    boxShadow: "0 0 20px rgba(6, 182, 212, 0.6)"
                  }}
                >
                  {/* Animated Stripes */}
                  <motion.div
                    animate={{
                      backgroundPosition: ["0px 0px", "40px 0px"]
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.2)_10px,rgba(0,0,0,0.2)_20px)]"
                  />
                </motion.div>
                
                {/* Glitch Effect */}
                <motion.div
                  animate={{
                    opacity: [0, 0.3, 0],
                    scaleX: [1, 1.02, 1]
                  }}
                  transition={{
                    duration: 0.2,
                    repeat: Infinity,
                    repeatDelay: 1.5
                  }}
                  className="absolute inset-0 bg-purple-500 mix-blend-screen"
                />
              </div>
              
              {/* Percentage & Status */}
              <div className="flex items-center justify-between text-xs sm:text-sm font-mono">
                <span className="text-cyan-400">
                  [{progress}%]
                </span>
                <motion.span
                  animate={{
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="text-white/70"
                >
                  {progress < 100 ? "LOADING..." : "READY!"}
                </motion.span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
