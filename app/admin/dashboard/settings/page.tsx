'use client'

import { useEffect, useState } from 'react'
import { Save, Lock, Upload, X } from 'lucide-react'
import Image from 'next/image'

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    // Hero Section
    hero_name: '',
    hero_title: '',
    hero_description: '',
    hero_image: '',
    hero_github: '',
    hero_linkedin: '',
    hero_email: '',
    hero_available: 'true',
    hero_cv: '',
    
    // About Section  
    about_description: '',
    about_years_experience: '',
    about_projects_completed: '',
    about_happy_clients: '',
    
    // Footer Section
    footer_name: '',
    footer_tagline: '',
    footer_email: '',
    footer_phone: '',
    footer_location: '',
    footer_github: '',
    footer_linkedin: ''
  })
  
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [uploading, setUploading] = useState(false)
  const [previewImage, setPreviewImage] = useState('')
  const [uploadingCV, setUploadingCV] = useState(false)
  
  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [passwordMessage, setPasswordMessage] = useState('')
  const [changingPassword, setChangingPassword] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  useEffect(() => {
    setPreviewImage(settings.hero_image)
  }, [settings.hero_image])

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings')
      const data = await res.json()
      setSettings(prev => ({ ...prev, ...data }))
    } catch (error) {
      console.error('Failed to fetch settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setMessage('Please select an image file')
      return
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage('Image size must be less than 5MB')
      return
    }

    setUploading(true)
    setMessage('')

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()

      if (res.ok) {
        setSettings({ ...settings, hero_image: data.url })
        setPreviewImage(data.url)
        setMessage('Image uploaded successfully!')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage(data.error || 'Failed to upload image')
      }
    } catch (error) {
      setMessage('Error uploading image')
    } finally {
      setUploading(false)
    }
  }

  const removeImage = () => {
    setSettings({ ...settings, hero_image: '' })
    setPreviewImage('')
  }

  const handleCVUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (file.type !== 'application/pdf') {
      setMessage('Please upload a PDF file')
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setMessage('File size must be less than 5MB')
      return
    }

    setUploadingCV(true)
    setMessage('')

    const formData = new FormData()
    formData.append('file', file)

    try {
      const res = await fetch('/api/upload-cv', {
        method: 'POST',
        body: formData
      })

      const data = await res.json()

      if (res.ok) {
        setSettings({ ...settings, hero_cv: data.url })
        setMessage('CV uploaded successfully!')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage(data.error || 'Failed to upload CV')
      }
    } catch (error) {
      setMessage('Error uploading CV')
    } finally {
      setUploadingCV(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })

      if (res.ok) {
        setMessage('Settings saved successfully!')
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage('Failed to save settings')
      }
    } catch (error) {
      setMessage('Error saving settings')
    } finally {
      setSaving(false)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setPasswordMessage('')

    // Validation
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordMessage('New passwords do not match')
      return
    }

    if (passwordData.newPassword.length < 6) {
      setPasswordMessage('Password must be at least 6 characters')
      return
    }

    setChangingPassword(true)

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'admin@portfolio.com', // You can get this from session/context
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        })
      })

      const data = await res.json()

      if (res.ok) {
        setPasswordMessage('Password changed successfully!')
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        })
        setTimeout(() => setPasswordMessage(''), 3000)
      } else {
        setPasswordMessage(data.error || 'Failed to change password')
      }
    } catch (error) {
      setPasswordMessage('Error changing password')
    } finally {
      setChangingPassword(false)
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
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1 sm:mb-2">Site Settings</h1>
        <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">Manage your portfolio content and information</p>
      </div>

      {message && (
        <div className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-lg text-sm sm:text-base ${message.includes('success') ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-8">
        {/* Hero Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg sm:rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4 sm:mb-6">Hero Section</h2>
          
          <div className="grid gap-4 sm:gap-6">
            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={settings.hero_name}
                onChange={(e) => setSettings({...settings, hero_name: e.target.value})}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                Title/Role
              </label>
              <input
                type="text"
                value={settings.hero_title}
                onChange={(e) => setSettings({...settings, hero_title: e.target.value})}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                placeholder="Full Stack Developer"
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                Description
              </label>
              <textarea
                rows={3}
                value={settings.hero_description}
                onChange={(e) => setSettings({...settings, hero_description: e.target.value})}
                className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                placeholder="I craft beautiful digital experiences..."
              />
            </div>

            <div>
              <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                Profile Image
              </label>
              
              {/* Image Preview */}
              {previewImage && (
                <div className="mb-3 sm:mb-4 relative inline-block">
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden border-2 border-gray-300 dark:border-gray-600">
                    <Image
                      src={previewImage}
                      alt="Profile preview"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Upload Button */}
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <label className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-sm sm:text-base bg-primary-600 text-white rounded-lg hover:bg-primary-700 cursor-pointer transition-colors">
                  <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>{uploading ? 'Uploading...' : 'Upload'}</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
                
                {/* Manual URL Input */}
                <input
                  type="text"
                  value={settings.hero_image}
                  onChange={(e) => setSettings({...settings, hero_image: e.target.value})}
                  className="flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Or paste image URL"
                />
              </div>
              <p className="mt-1.5 sm:mt-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                Upload an image (max 5MB) or paste an image URL
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={settings.hero_github}
                  onChange={(e) => setSettings({...settings, hero_github: e.target.value})}
                  className="w-full px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  placeholder="https://github.com/username"
                />
              </div>

              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5 sm:mb-2">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={settings.hero_linkedin}
                  onChange={(e) => setSettings({...settings, hero_linkedin: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={settings.hero_email}
                  onChange={(e) => setSettings({...settings, hero_email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                CV File (PDF)
              </label>
              
              {/* Current CV Display */}
              {settings.hero_cv && (
                <div className="mb-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
                      </svg>
                      <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                        Current CV
                      </span>
                    </div>
                    <a
                      href={settings.hero_cv}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary-600 dark:text-primary-400 hover:underline"
                    >
                      View PDF
                    </a>
                  </div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {settings.hero_cv}
                  </p>
                </div>
              )}

              {/* Upload Button */}
              <div className="flex items-center gap-3">
                <label className="flex-1 cursor-pointer">
                  <div className={`flex items-center justify-center gap-2 px-4 py-2.5 border-2 border-dashed rounded-lg transition-colors ${
                    uploadingCV 
                      ? 'border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 cursor-not-allowed' 
                      : 'border-gray-300 dark:border-gray-600 hover:border-primary-500 dark:hover:border-primary-400 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}>
                    <Upload className="w-5 h-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {uploadingCV ? 'Uploading...' : settings.hero_cv ? 'Replace CV' : 'Upload CV (PDF)'}
                    </span>
                  </div>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleCVUpload}
                    disabled={uploadingCV}
                    className="hidden"
                  />
                </label>
              </div>
              
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                Max file size: 5MB. Only PDF format is accepted.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="available"
                checked={settings.hero_available === 'true'}
                onChange={(e) => setSettings({...settings, hero_available: e.target.checked ? 'true' : 'false'})}
                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
              />
              <label htmlFor="available" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Available for work
              </label>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">About Section</h2>
          
          <div className="grid gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                About Description
              </label>
              <textarea
                rows={4}
                value={settings.about_description}
                onChange={(e) => setSettings({...settings, about_description: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                placeholder="Tell your story..."
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Years Experience
                </label>
                <input
                  type="text"
                  value={settings.about_years_experience}
                  onChange={(e) => setSettings({...settings, about_years_experience: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  placeholder="3+"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Projects Completed
                </label>
                <input
                  type="text"
                  value={settings.about_projects_completed}
                  onChange={(e) => setSettings({...settings, about_projects_completed: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  placeholder="50+"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Happy Clients
                </label>
                <input
                  type="text"
                  value={settings.about_happy_clients}
                  onChange={(e) => setSettings({...settings, about_happy_clients: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  placeholder="30+"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Footer Section</h2>
          
          <div className="grid gap-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Footer Name
                </label>
                <input
                  type="text"
                  value={settings.footer_name}
                  onChange={(e) => setSettings({...settings, footer_name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  placeholder="YourName"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={settings.footer_location}
                  onChange={(e) => setSettings({...settings, footer_location: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Jakarta, Indonesia"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Footer Tagline
              </label>
              <textarea
                rows={2}
                value={settings.footer_tagline}
                onChange={(e) => setSettings({...settings, footer_tagline: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                placeholder="Full Stack Developer crafting beautiful digital experiences..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Footer Email
                </label>
                <input
                  type="email"
                  value={settings.footer_email}
                  onChange={(e) => setSettings({...settings, footer_email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Footer Phone
                </label>
                <input
                  type="tel"
                  value={settings.footer_phone}
                  onChange={(e) => setSettings({...settings, footer_phone: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  placeholder="+62 123 4567 8900"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Footer GitHub URL
                </label>
                <input
                  type="url"
                  value={settings.footer_github}
                  onChange={(e) => setSettings({...settings, footer_github: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  placeholder="https://github.com/username"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Footer LinkedIn URL
                </label>
                <input
                  type="url"
                  value={settings.footer_linkedin}
                  onChange={(e) => setSettings({...settings, footer_linkedin: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                  placeholder="https://linkedin.com/in/username"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4 sm:w-5 sm:h-5" />
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>

      {/* Change Password Section */}
      <div className="mt-4 sm:mt-8 bg-white dark:bg-gray-800 rounded-lg sm:rounded-2xl p-4 sm:p-6 border border-gray-200 dark:border-gray-700">
        <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
          <Lock className="w-5 h-5 sm:w-6 sm:h-6 text-gray-900 dark:text-white" />
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">Change Password</h2>
        </div>

        {passwordMessage && (
          <div className={`mb-6 p-4 rounded-lg ${passwordMessage.includes('success') ? 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400' : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400'}`}>
            {passwordMessage}
          </div>
        )}

        <form onSubmit={handlePasswordChange} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Current Password
            </label>
            <input
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
              placeholder="Enter current password"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                New Password
              </label>
              <input
                type="password"
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                required
                minLength={6}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                placeholder="Enter new password"
              />
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Minimum 6 characters
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Confirm New Password
              </label>
              <input
                type="password"
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                required
                minLength={6}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white"
                placeholder="Confirm new password"
              />
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={changingPassword}
              className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Lock className="w-5 h-5" />
              {changingPassword ? 'Changing...' : 'Change Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
