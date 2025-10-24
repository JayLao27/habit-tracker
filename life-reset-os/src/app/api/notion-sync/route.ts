import { NextRequest, NextResponse } from 'next/server'
import { Client } from '@notionhq/client'

const notion = new Client({
  auth: process.env.NOTION_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, data, userId } = body

    if (!process.env.NOTION_KEY || !process.env.NOTION_DB_ID) {
      return NextResponse.json({ 
        error: 'Notion integration not configured. Please set NOTION_KEY and NOTION_DB_ID environment variables.' 
      }, { status: 400 })
    }

    let notionPage: any = {}

    switch (type) {
      case 'daily-log':
        notionPage = {
          parent: { database_id: process.env.NOTION_DB_ID },
          properties: {
            Name: { 
              title: [{ text: { content: `Daily Reflection - ${new Date(data.date).toLocaleDateString()}` } }] 
            },
            Type: { select: { name: "Daily Log" } },
            Date: { date: { start: data.date } },
            'Morning Activities': { 
              rich_text: [{ text: { content: JSON.stringify(data.morningActivities || []) } }] 
            },
            'Afternoon Activities': { 
              rich_text: [{ text: { content: JSON.stringify(data.afternoonActivities || []) } }] 
            },
            'Evening Activities': { 
              rich_text: [{ text: { content: JSON.stringify(data.nightActivities || []) } }] 
            },
            Feelings: { 
              rich_text: [{ text: { content: data.feelings || '' } }] 
            },
            'AI Recommendations': { 
              rich_text: [{ text: { content: JSON.stringify(data.aiRecommendations || []) } }] 
            },
            Status: { select: { name: "Completed" } }
          }
        }
        break

      case 'goals':
        notionPage = {
          parent: { database_id: process.env.NOTION_DB_ID },
          properties: {
            Name: { 
              title: [{ text: { content: `Goals Update - ${new Date().toLocaleDateString()}` } }] 
            },
            Type: { select: { name: "Goals" } },
            '10-Year Goal': { 
              rich_text: [{ text: { content: data.tenYearGoal || '' } }] 
            },
            '1-Year Goal': { 
              rich_text: [{ text: { content: data.oneYearGoal || '' } }] 
            },
            '3-Month Goal': { 
              rich_text: [{ text: { content: data.threeMonthGoal || '' } }] 
            },
            Status: { select: { name: "Active" } }
          }
        }
        break

      case 'weekly-review':
        notionPage = {
          parent: { database_id: process.env.NOTION_DB_ID },
          properties: {
            Name: { 
              title: [{ text: { content: `Weekly Review - Week of ${new Date(data.weekStart).toLocaleDateString()}` } }] 
            },
            Type: { select: { name: "Weekly Review" } },
            'Week Start': { date: { start: data.weekStart } },
            'Went Well': { 
              rich_text: [{ text: { content: data.wentWell || '' } }] 
            },
            'Didn\'t Go Well': { 
              rich_text: [{ text: { content: data.notWell || '' } }] 
            },
            Gratitude: { 
              rich_text: [{ text: { content: data.gratitude || '' } }] 
            },
            'Next Week Goal': { 
              rich_text: [{ text: { content: data.goal || '' } }] 
            },
            'Focus Projects': { 
              rich_text: [{ text: { content: data.focusProjects || '' } }] 
            },
            Status: { select: { name: "Completed" } }
          }
        }
        break

      case 'mind-reframe':
        notionPage = {
          parent: { database_id: process.env.NOTION_DB_ID },
          properties: {
            Name: { 
              title: [{ text: { content: `Mind Reframe - ${new Date().toLocaleDateString()}` } }] 
            },
            Type: { select: { name: "Mind Reframe" } },
            'Don\'t Want': { 
              rich_text: [{ text: { content: JSON.stringify(data.dontWant || []) } }] 
            },
            'Want': { 
              rich_text: [{ text: { content: JSON.stringify(data.want || []) } }] 
            },
            Status: { select: { name: "Active" } }
          }
        }
        break

      case 'growth-plan':
        notionPage = {
          parent: { database_id: process.env.NOTION_DB_ID },
          properties: {
            Name: { 
              title: [{ text: { content: `Growth Plan - ${new Date().toLocaleDateString()}` } }] 
            },
            Type: { select: { name: "Growth Plan" } },
            'Skills Needed': { 
              rich_text: [{ text: { content: JSON.stringify(data.skillsNeeded || []) } }] 
            },
            'Distractions': { 
              rich_text: [{ text: { content: JSON.stringify(data.distractions || []) } }] 
            },
            Status: { select: { name: "Active" } }
          }
        }
        break

      default:
        return NextResponse.json({ error: 'Invalid sync type' }, { status: 400 })
    }

    const response = await notion.pages.create(notionPage)

    return NextResponse.json({ 
      success: true, 
      notionPageId: response.id,
      message: `${type} synced to Notion successfully` 
    })

  } catch (error) {
    console.error('Error syncing to Notion:', error)
    return NextResponse.json({ 
      error: 'Failed to sync to Notion. Please check your Notion configuration.' 
    }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    if (!process.env.NOTION_KEY || !process.env.NOTION_DB_ID) {
      return NextResponse.json({ 
        error: 'Notion integration not configured' 
      }, { status: 400 })
    }

    // Test Notion connection
    const response = await notion.databases.retrieve({
      database_id: process.env.NOTION_DB_ID
    })

    return NextResponse.json({ 
      success: true, 
      databaseName: response.title[0]?.plain_text || 'Unknown',
      message: 'Notion connection successful' 
    })

  } catch (error) {
    console.error('Error testing Notion connection:', error)
    return NextResponse.json({ 
      error: 'Failed to connect to Notion. Please check your configuration.' 
    }, { status: 500 })
  }
}
