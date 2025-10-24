import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const date = searchParams.get('date')

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 })
    }

    const whereClause: any = { userId }
    if (date) {
      whereClause.date = new Date(date)
    }

    const dailyLogs = await prisma.dailyLog.findMany({
      where: whereClause,
      orderBy: { date: 'desc' },
      take: 30 // Limit to last 30 days
    })

    return NextResponse.json(dailyLogs)
  } catch (error) {
    console.error('Error fetching daily logs:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, date, morningActivities, afternoonActivities, nightActivities, feelings, aiRecommendations } = body

    if (!userId || !date) {
      return NextResponse.json({ error: 'User ID and date are required' }, { status: 400 })
    }

    const dailyLog = await prisma.dailyLog.create({
      data: {
        userId,
        date: new Date(date),
        morningActivities: JSON.stringify(morningActivities || []),
        afternoonActivities: JSON.stringify(afternoonActivities || []),
        nightActivities: JSON.stringify(nightActivities || []),
        feelings: feelings || '',
        aiRecommendations: JSON.stringify(aiRecommendations || [])
      }
    })

    return NextResponse.json(dailyLog)
  } catch (error) {
    console.error('Error creating daily log:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, morningActivities, afternoonActivities, nightActivities, feelings, aiRecommendations } = body

    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 })
    }

    const dailyLog = await prisma.dailyLog.update({
      where: { id },
      data: {
        morningActivities: morningActivities ? JSON.stringify(morningActivities) : undefined,
        afternoonActivities: afternoonActivities ? JSON.stringify(afternoonActivities) : undefined,
        nightActivities: nightActivities ? JSON.stringify(nightActivities) : undefined,
        feelings: feelings !== undefined ? feelings : undefined,
        aiRecommendations: aiRecommendations ? JSON.stringify(aiRecommendations) : undefined
      }
    })

    return NextResponse.json(dailyLog)
  } catch (error) {
    console.error('Error updating daily log:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
