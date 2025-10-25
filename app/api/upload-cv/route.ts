import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'
import { existsSync } from 'fs'

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      )
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'Only PDF files are allowed' },
        { status: 400 }
      )
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'File size must be less than 5MB' },
        { status: 400 }
      )
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Create cv directory if it doesn't exist
    const cvDir = path.join(process.cwd(), 'public', 'cv')
    if (!existsSync(cvDir)) {
      await mkdir(cvDir, { recursive: true })
    }

    // Generate filename with timestamp to avoid conflicts
    const timestamp = Date.now()
    const originalName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filename = `CV_${timestamp}_${originalName}`
    const filepath = path.join(cvDir, filename)

    // Write file
    await writeFile(filepath, new Uint8Array(buffer))

    // Return the URL path
    const url = `/cv/${filename}`

    return NextResponse.json({ 
      success: true, 
      url,
      message: 'CV uploaded successfully' 
    })

  } catch (error) {
    console.error('Error uploading CV:', error)
    return NextResponse.json(
      { error: 'Failed to upload CV' },
      { status: 500 }
    )
  }
}
