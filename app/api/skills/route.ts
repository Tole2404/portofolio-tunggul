import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET all skills
export async function GET() {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(skills)
  } catch (error) {
    console.error('Error fetching skills:', error)
    return NextResponse.json(
      { error: 'Failed to fetch skills' },
      { status: 500 }
    )
  }
}

// CREATE new skill
export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    
    const skill = await prisma.skill.create({
      data: {
        name: data.name,
        level: data.level,
        category: data.category,
        icon: data.icon,
        color: data.color,
        order: data.order || 0
      }
    })

    return NextResponse.json(skill)
  } catch (error) {
    console.error('Error creating skill:', error)
    return NextResponse.json(
      { error: 'Failed to create skill' },
      { status: 500 }
    )
  }
}
