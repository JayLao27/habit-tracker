"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Bot, Sparkles, Brain, Target, TrendingUp, Heart, MessageSquare } from "lucide-react"

interface AIInsight {
  id: string
  type: 'motivation' | 'pattern' | 'suggestion' | 'alignment'
  title: string
  content: string
  timestamp: Date
}

export default function AICoachPage() {
  const [insights, setInsights] = useState<AIInsight[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [customPrompt, setCustomPrompt] = useState("")

  const generateInsights = async () => {
    setIsGenerating(true)
    try {
      // TODO: Implement API call to generate AI insights
      // For now, we'll simulate with mock data
      const mockInsights: AIInsight[] = [
        {
          id: '1',
          type: 'pattern',
          title: 'Productivity Pattern Detected',
          content: 'You tend to be most productive in the morning hours (8-11 AM). Consider scheduling your most important tasks during this time.',
          timestamp: new Date()
        },
        {
          id: '2',
          type: 'suggestion',
          title: 'Focus Improvement',
          content: 'Based on your daily logs, try the Pomodoro technique (25 min work, 5 min break) for your deep work sessions.',
          timestamp: new Date()
        },
        {
          id: '3',
          type: 'alignment',
          title: 'Goal Alignment Check',
          content: 'Your daily activities are well-aligned with your 3-month goal. Keep up the great work!',
          timestamp: new Date()
        }
      ]
      
      setInsights(prev => [...mockInsights, ...prev])
    } catch (error) {
      console.error('Error generating insights:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const generateCustomInsight = async () => {
    if (!customPrompt.trim()) return
    
    setIsGenerating(true)
    try {
      // TODO: Implement API call for custom prompt
      const mockInsight: AIInsight = {
        id: Date.now().toString(),
        type: 'suggestion',
        title: 'Custom Insight',
        content: `Based on your request: "${customPrompt}", here's my analysis and recommendations...`,
        timestamp: new Date()
      }
      
      setInsights(prev => [mockInsight, ...prev])
      setCustomPrompt("")
    } catch (error) {
      console.error('Error generating custom insight:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'motivation':
        return <Heart className="h-4 w-4 text-pink-500" />
      case 'pattern':
        return <TrendingUp className="h-4 w-4 text-blue-500" />
      case 'suggestion':
        return <Brain className="h-4 w-4 text-purple-500" />
      case 'alignment':
        return <Target className="h-4 w-4 text-green-500" />
      default:
        return <MessageSquare className="h-4 w-4 text-gray-500" />
    }
  }

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'motivation':
        return 'bg-pink-50 border-pink-200'
      case 'pattern':
        return 'bg-blue-50 border-blue-200'
      case 'suggestion':
        return 'bg-purple-50 border-purple-200'
      case 'alignment':
        return 'bg-green-50 border-green-200'
      default:
        return 'bg-gray-50 border-gray-200'
    }
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Coach</h1>
        <p className="text-muted-foreground">
          Get personalized insights and recommendations based on your data
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-yellow-500" />
              <span>Generate Insights</span>
            </CardTitle>
            <CardDescription>
              Get AI-powered analysis of your daily activities and progress
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={generateInsights} 
              disabled={isGenerating}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Brain className="mr-2 h-4 w-4 animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Insights
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-blue-500" />
              <span>Ask AI Coach</span>
            </CardTitle>
            <CardDescription>
              Ask specific questions about your progress and goals
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="custom-prompt">What would you like to know?</Label>
              <Textarea
                id="custom-prompt"
                placeholder="e.g., How can I improve my focus? What patterns do you see in my daily routine?"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                className="min-h-[80px]"
              />
            </div>
            <Button 
              onClick={generateCustomInsight} 
              disabled={isGenerating || !customPrompt.trim()}
              className="w-full"
            >
              {isGenerating ? (
                <>
                  <Brain className="mr-2 h-4 w-4 animate-spin" />
                  Thinking...
                </>
              ) : (
                <>
                  <Bot className="mr-2 h-4 w-4" />
                  Ask AI Coach
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-purple-500" />
            <span>AI Insights</span>
          </CardTitle>
          <CardDescription>
            Personalized recommendations and analysis based on your data
          </CardDescription>
        </CardHeader>
        <CardContent>
          {insights.length > 0 ? (
            <div className="space-y-4">
              {insights.map((insight) => (
                <div
                  key={insight.id}
                  className={`p-4 rounded-lg border ${getInsightColor(insight.type)}`}
                >
                  <div className="flex items-start space-x-3">
                    {getInsightIcon(insight.type)}
                    <div className="flex-1 space-y-2">
                      <h4 className="font-medium">{insight.title}</h4>
                      <p className="text-sm text-muted-foreground">
                        {insight.content}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {insight.timestamp.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No insights yet. Click "Generate Insights" to get AI-powered analysis of your data.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* AI Capabilities */}
      <Card>
        <CardHeader>
          <CardTitle>AI Coach Capabilities</CardTitle>
          <CardDescription>
            What your AI coach can help you with
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-medium">Pattern Recognition</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Identify productivity patterns in your daily routine</li>
                <li>• Spot recurring challenges and opportunities</li>
                <li>• Track progress toward your goals</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Personalized Recommendations</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Suggest habit improvements based on your data</li>
                <li>• Recommend focus techniques and strategies</li>
                <li>• Provide motivation and encouragement</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Goal Alignment</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Check if daily activities align with your goals</li>
                <li>• Suggest adjustments to stay on track</li>
                <li>• Celebrate milestones and progress</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Well-being Insights</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Analyze your emotional patterns</li>
                <li>• Suggest stress management techniques</li>
                <li>• Recommend work-life balance improvements</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
