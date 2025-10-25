'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, ExternalLink, Github, Calendar, Users, CheckCircle, Lightbulb, Target } from 'lucide-react'
import Image from 'next/image'
import { useEffect } from 'react'

interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string
  github: string
  demo: string
  gradient: string
  featured: boolean
  fullDescription?: string
  features?: string
  screenshots?: string
  challenges?: string
  solutions?: string
  role?: string
  timeline?: string
  teamSize?: string
}

interface ProjectModalProps {
  project: Project | null
  isOpen: boolean
  onClose: () => void
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!project) return null

  const tags = JSON.parse(project.tags)
  const features = project.features ? JSON.parse(project.features) : []
  const screenshots = project.screenshots ? JSON.parse(project.screenshots) : []

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="min-h-screen px-4 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2 }}
                className="relative bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 p-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors shadow-lg"
                >
                  <X className="w-6 h-6" />
                </button>

                {/* Scrollable Content */}
                <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
                  {/* Header Image */}
                  <div className="relative h-64 sm:h-80 overflow-hidden">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${project.gradient} opacity-20`}></div>
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-8">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {tags.map((tag: string, index: number) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 text-xs font-semibold bg-white/20 backdrop-blur-sm text-white rounded-lg"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                        {project.title}
                      </h2>
                      {project.featured && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-400/90 text-yellow-900 rounded-full text-sm font-bold">
                          ⭐ Featured Project
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-8 space-y-8">
                    {/* Meta Info */}
                    <div className="grid sm:grid-cols-3 gap-4">
                      {project.role && (
                        <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                          <Target className="w-5 h-5 text-primary-500" />
                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Role</div>
                            <div className="font-semibold text-sm">{project.role}</div>
                          </div>
                        </div>
                      )}
                      {project.timeline && (
                        <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                          <Calendar className="w-5 h-5 text-primary-500" />
                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Timeline</div>
                            <div className="font-semibold text-sm">{project.timeline}</div>
                          </div>
                        </div>
                      )}
                      {project.teamSize && (
                        <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                          <Users className="w-5 h-5 text-primary-500" />
                          <div>
                            <div className="text-xs text-gray-500 dark:text-gray-400">Team Size</div>
                            <div className="font-semibold text-sm">{project.teamSize}</div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    <div>
                      <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                        <span className={`w-1 h-8 bg-gradient-to-b ${project.gradient} rounded-full`}></span>
                        Overview
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {project.fullDescription || project.description}
                      </p>
                    </div>

                    {/* Features */}
                    {features.length > 0 && (
                      <div>
                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                          <CheckCircle className="w-6 h-6 text-green-500" />
                          Key Features
                        </h3>
                        <ul className="grid sm:grid-cols-2 gap-3">
                          {features.map((feature: string, index: number) => (
                            <li key={index} className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Challenges & Solutions */}
                    {(project.challenges || project.solutions) && (
                      <div className="grid sm:grid-cols-2 gap-6">
                        {project.challenges && (
                          <div>
                            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                              <Lightbulb className="w-5 h-5 text-orange-500" />
                              Challenges
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed bg-orange-50 dark:bg-orange-900/20 p-4 rounded-xl border-l-4 border-orange-500">
                              {project.challenges}
                            </p>
                          </div>
                        )}
                        {project.solutions && (
                          <div>
                            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                              <CheckCircle className="w-5 h-5 text-green-500" />
                              Solutions
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed bg-green-50 dark:bg-green-900/20 p-4 rounded-xl border-l-4 border-green-500">
                              {project.solutions}
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Screenshots Gallery */}
                    {screenshots.length > 0 && (
                      <div>
                        <h3 className="text-2xl font-bold mb-4">Screenshots</h3>
                        <div className="grid sm:grid-cols-2 gap-4">
                          {screenshots.map((screenshot: string, index: number) => (
                            <div key={index} className="relative aspect-video rounded-xl overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                              <Image
                                src={screenshot}
                                alt={`Screenshot ${index + 1}`}
                                fill
                                className="object-cover hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                      >
                        <ExternalLink className="w-5 h-5" />
                        View Live Demo
                      </a>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white rounded-xl font-semibold hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all"
                      >
                        <Github className="w-5 h-5" />
                        View Source Code
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <style jsx global>{`
            .custom-scrollbar::-webkit-scrollbar {
              width: 8px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
              background: transparent;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #cbd5e0;
              border-radius: 4px;
            }
            .dark .custom-scrollbar::-webkit-scrollbar-thumb {
              background: #4a5568;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover {
              background: #a0aec0;
            }
          `}</style>
        </>
      )}
    </AnimatePresence>
  )
}
