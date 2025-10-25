import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all projects
export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(projects)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    )
  }
}

// CREATE new project
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const project = await prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        image: data.image,
        tags: JSON.stringify(data.tags),
        github: data.github,
        demo: data.demo,
        gradient: data.gradient,
        featured: data.featured || false,
        order: data.order || 0
      }
    })

    return NextResponse.json(project)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    )
  }
}
