import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const context = searchParams.get('context')
    const userId = searchParams.get('userId')

    if (!context) {
      return NextResponse.json({ error: 'Context is required' }, { status: 400 })
    }

    // Create AI prompt based on context
    let systemPrompt = "You are a life coach AI assistant. Provide personalized, actionable advice based on the user's daily activities and reflections."
    
    let userPrompt = `Context: ${context}`
    
    if (userId) {
      userPrompt += `\n\nUser ID: ${userId}`
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      max_tokens: 500,
      temperature: 0.7
    })

    const suggestion = completion.choices[0]?.message?.content || "No suggestion available"

    return NextResponse.json({ suggestion })
  } catch (error) {
    console.error('Error generating AI recommendation:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { dailyLog, goals, mindReframe } = body

    if (!dailyLog) {
      return NextResponse.json({ error: 'Daily log is required' }, { status: 400 })
    }

    // Create comprehensive AI prompt
    const systemPrompt = `You are a life coach AI assistant. Analyze the user's daily activities, goals, and mind reframe data to provide personalized insights and recommendations. Focus on:
1. Pattern recognition in daily activities
2. Alignment with stated goals
3. Emotional well-being insights
4. Actionable next steps
5. Motivation and encouragement`

    const userPrompt = `
Daily Log:
- Morning Activities: ${JSON.stringify(dailyLog.morningActivities || [])}
- Afternoon Activities: ${JSON.stringify(dailyLog.afternoonActivities || [])}
- Evening Activities: ${JSON.stringify(dailyLog.nightActivities || [])}
- Feelings: ${dailyLog.feelings || 'Not specified'}

Goals:
- 10-Year Goal: ${goals?.tenYearGoal || 'Not set'}
- 1-Year Goal: ${goals?.oneYearGoal || 'Not set'}
- 3-Month Goal: ${goals?.threeMonthGoal || 'Not set'}

Mind Reframe:
- Don't Want: ${JSON.stringify(mindReframe?.dontWant || [])}
- Want: ${JSON.stringify(mindReframe?.want || [])}

Please provide 3-5 personalized insights and recommendations based on this data.
`

    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt }
      ],
      max_tokens: 800,
      temperature: 0.7
    })

    const insights = completion.choices[0]?.message?.content || "No insights available"

    return NextResponse.json({ insights })
  } catch (error) {
    console.error('Error generating AI insights:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
