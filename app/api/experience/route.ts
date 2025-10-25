import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all experience
export async function GET() {
  try {
    const experience = await prisma.experience.findMany({
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(experience)
  } catch (error) {
    console.error('Error fetching experience:', error)
    return NextResponse.json(
      { error: 'Failed to fetch experience' },
      { status: 500 }
    )
  }
}

// CREATE new experience
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const experience = await prisma.experience.create({
      data: {
        type: data.type,
        title: data.title,
        company: data.company,
        location: data.location,
        period: data.period,
        description: data.description,
        tags: JSON.stringify(data.tags),
        color: data.color,
        order: data.order || 0
      }
    })

    return NextResponse.json(experience)
  } catch (error) {
    console.error('Error creating experience:', error)
    return NextResponse.json(
      { error: 'Failed to create experience' },
      { status: 500 }
    )
  }
}
