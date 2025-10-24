import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const mindReframe = await prisma.mindReframe.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(mindReframe)
  } catch (error) {
    console.error('Error fetching mind reframe:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, dontWant, want } = body

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const mindReframe = await prisma.mindReframe.create({
      data: {
        userId,
        dontWant: JSON.stringify(dontWant || []),
        want: JSON.stringify(want || [])
      }
    })

    return NextResponse.json(mindReframe)
  } catch (error) {
    console.error('Error creating mind reframe:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, dontWant, want } = body

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const mindReframe = await prisma.mindReframe.update({
      where: { id },
      data: {
        dontWant: dontWant ? JSON.stringify(dontWant) : undefined,
        want: want ? JSON.stringify(want) : undefined
      }
    })

    return NextResponse.json(mindReframe)
  } catch (error) {
    console.error('Error updating mind reframe:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
