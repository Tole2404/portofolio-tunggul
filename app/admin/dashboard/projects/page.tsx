'use client'

import { useEffect, useState } from 'react'
import { Plus, Edit, Trash2, ExternalLink, X } from 'lucide-react'

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
  order: number
  fullDescription?: string
  features?: string
  screenshots?: string
  challenges?: string
  solutions?: string
  role?: string
  timeline?: string
  teamSize?: string
}

export default function ProjectsManagement() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    tags: '',
    github: '',
    demo: '',
    gradient: 'from-blue-600 to-cyan-500',
    featured: false,
    order: 0,
    fullDescription: '',
    features: '',
    screenshots: '',
    challenges: '',
    solutions: '',
    role: '',
    timeline: '',
    teamSize: ''
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>('')
  const [imageInputType, setImageInputType] = useState<'upload' | 'url'>('url')
  const [screenshotInputType, setScreenshotInputType] = useState<'upload' | 'url'>('url')
  const [screenshotFiles, setScreenshotFiles] = useState<File[]>([])

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects')
      const data = await res.json()
      setProjects(data)
    } catch (error) {
      console.error('Failed to fetch projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
        setFormData({...formData, image: reader.result as string})
      }
      reader.readAsDataURL(file)
    }
  }

  const openModal = (project?: Project) => {
    if (project) {
      setEditingProject(project)
      setFormData({
        title: project.title,
        description: project.description,
        image: project.image,
        tags: JSON.parse(project.tags).join(', '),
        github: project.github,
        demo: project.demo,
        gradient: project.gradient,
        featured: project.featured,
        order: project.order,
        fullDescription: project.fullDescription || '',
        features: project.features ? JSON.parse(project.features).join('\n') : '',
        screenshots: project.screenshots ? JSON.parse(project.screenshots).join('\n') : '',
        challenges: project.challenges || '',
        solutions: project.solutions || '',
        role: project.role || '',
        timeline: project.timeline || '',
        teamSize: project.teamSize || ''
      })
      setImagePreview(project.image)
    } else {
      setEditingProject(null)
      setFormData({
        title: '',
        description: '',
        image: '',
        tags: '',
        github: '',
        demo: '',
        gradient: 'from-blue-600 to-cyan-500',
        featured: false,
        order: 0,
        fullDescription: '',
        features: '',
        screenshots: '',
        challenges: '',
        solutions: '',
        role: '',
        timeline: '',
        teamSize: ''
      })
      setImageFile(null)
      setImagePreview('')
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingProject(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    const tagsArray = formData.tags.split(',').map(tag => tag.trim())
    const featuresArray = formData.features.split('\n').map(f => f.trim()).filter(f => f)
    const screenshotsArray = formData.screenshots.split('\n').map(s => s.trim()).filter(s => s)
    
    const projectData = {
      ...formData,
      tags: tagsArray,
      features: featuresArray.length > 0 ? featuresArray : undefined,
      screenshots: screenshotsArray.length > 0 ? screenshotsArray : undefined
    }

    try {
      if (editingProject) {
        await fetch(`/api/projects/${editingProject.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(projectData)
        })
      } else {
        await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(projectData)
        })
      }
      closeModal()
      fetchProjects()
    } catch (error) {
      console.error('Failed to save project:', error)
    }
  }

  const deleteProject = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      await fetch(`/api/projects/${id}`, { method: 'DELETE' })
      fetchProjects()
    } catch (error) {
      console.error('Failed to delete project:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">Projects</h1>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Manage your portfolio projects</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          <span>Add Project</span>
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
          <p className="text-gray-500 dark:text-gray-400 mb-4">No projects yet</p>
          <button 
            onClick={() => openModal()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Your First Project
          </button>
        </div>
      ) : (
        <div className="grid gap-3 sm:gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-2xl p-3 sm:p-6 border border-gray-200 dark:border-gray-700"
            >
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-6">
                {/* Image */}
                <div className="flex-shrink-0 w-full sm:w-48 h-40 sm:h-32 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-xl font-bold text-gray-900 dark:text-white mb-1 truncate">
                        {project.title}
                      </h3>
                      {project.featured && (
                        <span className="inline-block px-2 py-0.5 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-400 text-xs font-semibold rounded">
                          Featured
                        </span>
                      )}
                    </div>
                    <div className="flex gap-0.5 sm:gap-2 flex-shrink-0">
                      <button 
                        onClick={() => openModal(project)}
                        className="p-1.5 sm:p-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="p-1.5 sm:p-2 text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs sm:text-base text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-3">
                    {JSON.parse(project.tags).map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-2 sm:gap-3 text-xs sm:text-sm">
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-primary-600 dark:text-primary-400"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Demo
                    </a>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-sm text-primary-600 dark:text-primary-400"
                    >
                      <ExternalLink className="w-4 h-4" />
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-white dark:bg-gray-800 rounded-none sm:rounded-2xl max-w-2xl w-full h-full sm:h-auto sm:max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 sm:p-6 flex items-center justify-between z-10">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                {editingProject ? 'Edit Project' : 'Add New Project'}
              </h2>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  placeholder="E-Commerce Platform"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Full-stack online store with payment gateway..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Project Image *
                </label>
                
                {/* Image Preview */}
                {imagePreview && (
                  <div className="mb-3 relative">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-full h-48 object-cover rounded-lg border-2 border-gray-200 dark:border-gray-600"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setImagePreview('')
                        setFormData({...formData, image: ''})
                        setImageFile(null)
                      }}
                      className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}

                {/* Toggle Buttons */}
                <div className="flex gap-2 mb-3">
                  <button
                    type="button"
                    onClick={() => setImageInputType('url')}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                      imageInputType === 'url'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    🔗 URL
                  </button>
                  <button
                    type="button"
                    onClick={() => setImageInputType('upload')}
                    className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                      imageInputType === 'upload'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    📤 Upload
                  </button>
                </div>

                {/* URL Input */}
                {imageInputType === 'url' && (
                  <div>
                    <input
                      type="url"
                      value={formData.image.startsWith('data:') ? '' : formData.image}
                      onChange={(e) => {
                        setFormData({...formData, image: e.target.value})
                        setImagePreview(e.target.value)
                      }}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                      placeholder="https://images.unsplash.com/photo-..."
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      💡 Paste image URL from Unsplash, Imgur, or any image hosting
                    </p>
                  </div>
                )}

                {/* File Upload */}
                {imageInputType === 'upload' && (
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 dark:file:bg-primary-900 dark:file:text-primary-300"
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                      📁 Supported: JPG, PNG, GIF, WebP (Max 5MB)
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tags (comma separated) *
                </label>
                <input
                  type="text"
                  required
                  value={formData.tags}
                  onChange={(e) => setFormData({...formData, tags: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Next.js, TypeScript, MongoDB"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    GitHub URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.github}
                    onChange={(e) => setFormData({...formData, github: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    placeholder="https://github.com/..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Demo URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={formData.demo}
                    onChange={(e) => setFormData({...formData, demo: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                    placeholder="https://demo.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Gradient
                </label>
                <select
                  value={formData.gradient}
                  onChange={(e) => setFormData({...formData, gradient: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="from-blue-600 to-cyan-500">Blue to Cyan</option>
                  <option value="from-purple-600 to-pink-500">Purple to Pink</option>
                  <option value="from-orange-600 to-amber-500">Orange to Amber</option>
                  <option value="from-green-600 to-emerald-500">Green to Emerald</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                  className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                />
                <label htmlFor="featured" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Featured Project
                </label>
              </div>

              {/* Modal Detail Fields */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  📝 Modal Details (Optional)
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Description
                    </label>
                    <textarea
                      rows={4}
                      value={formData.fullDescription}
                      onChange={(e) => setFormData({...formData, fullDescription: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                      placeholder="Detailed description for modal..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Features (one per line)
                    </label>
                    <textarea
                      rows={6}
                      value={formData.features}
                      onChange={(e) => setFormData({...formData, features: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white font-mono text-sm"
                      placeholder="User authentication with JWT&#10;Real-time notifications&#10;Responsive design&#10;Dark mode support"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Screenshots
                    </label>

                    {/* Toggle Buttons */}
                    <div className="flex gap-2 mb-3">
                      <button
                        type="button"
                        onClick={() => setScreenshotInputType('url')}
                        className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          screenshotInputType === 'url'
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        🔗 URL
                      </button>
                      <button
                        type="button"
                        onClick={() => setScreenshotInputType('upload')}
                        className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          screenshotInputType === 'upload'
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                      >
                        📤 Upload
                      </button>
                    </div>

                    {/* URL Input */}
                    {screenshotInputType === 'url' && (
                      <div>
                        <textarea
                          rows={4}
                          value={formData.screenshots}
                          onChange={(e) => setFormData({...formData, screenshots: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white font-mono text-sm"
                          placeholder="https://images.unsplash.com/photo-1.jpg&#10;https://images.unsplash.com/photo-2.jpg&#10;https://images.unsplash.com/photo-3.jpg"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          💡 One URL per line
                        </p>
                      </div>
                    )}

                    {/* File Upload */}
                    {screenshotInputType === 'upload' && (
                      <div>
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={(e) => {
                            const files = Array.from(e.target.files || [])
                            setScreenshotFiles(files)
                            
                            // Convert to base64 for preview
                            const urls: string[] = []
                            files.forEach((file, index) => {
                              const reader = new FileReader()
                              reader.onloadend = () => {
                                urls.push(reader.result as string)
                                if (urls.length === files.length) {
                                  setFormData({...formData, screenshots: urls.join('\n')})
                                }
                              }
                              reader.readAsDataURL(file)
                            })
                          }}
                          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 dark:file:bg-primary-900 dark:file:text-primary-300"
                        />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          📁 Select multiple images (Max 5 images, 5MB each)
                        </p>
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Challenges
                    </label>
                    <textarea
                      rows={3}
                      value={formData.challenges}
                      onChange={(e) => setFormData({...formData, challenges: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                      placeholder="What challenges did you face?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Solutions
                    </label>
                    <textarea
                      rows={3}
                      value={formData.solutions}
                      onChange={(e) => setFormData({...formData, solutions: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                      placeholder="How did you solve them?"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Role
                      </label>
                      <input
                        type="text"
                        value={formData.role}
                        onChange={(e) => setFormData({...formData, role: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                        placeholder="Full Stack Developer"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Timeline
                      </label>
                      <input
                        type="text"
                        value={formData.timeline}
                        onChange={(e) => setFormData({...formData, timeline: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                        placeholder="3 months"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Team Size
                      </label>
                      <input
                        type="text"
                        value={formData.teamSize}
                        onChange={(e) => setFormData({...formData, teamSize: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                        placeholder="4 people"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  {editingProject ? 'Update Project' : 'Add Project'}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
