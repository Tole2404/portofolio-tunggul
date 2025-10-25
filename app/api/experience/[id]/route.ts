import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// UPDATE experience
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const data = await request.json()
    
    const experience = await prisma.experience.update({
      where: { id: params.id },
      data: {
        type: data.type,
        title: data.title,
        company: data.company,
        location: data.location,
        period: data.period,
        description: data.description,
        tags: JSON.stringify(data.tags),
        color: data.color,
        order: data.order
      }
    })

    return NextResponse.json(experience)
  } catch (error) {
    console.error('Error updating experience:', error)
    return NextResponse.json(
      { error: 'Failed to update experience' },
      { status: 500 }
    )
  }
}

// DELETE experience
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.experience.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting experience:', error)
    return NextResponse.json(
      { error: 'Failed to delete experience' },
      { status: 500 }
    )
  }
}
