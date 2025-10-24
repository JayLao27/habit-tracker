"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Sun, 
  Sunset, 
  Moon, 
  Heart, 
  Brain, 
  Save,
  Sparkles
} from "lucide-react"
import { NotionSyncButton } from "@/components/notion-sync-button"

interface DailyLog {
  morningActivities: string[]
  afternoonActivities: string[]
  nightActivities: string[]
  feelings: string
  aiRecommendations: string[]
}

export default function DailyResetPage() {
  const [currentTab, setCurrentTab] = useState("morning")
  const [dailyLog, setDailyLog] = useState<DailyLog>({
    morningActivities: [],
    afternoonActivities: [],
    nightActivities: [],
    feelings: "",
    aiRecommendations: []
  })

  const [newActivity, setNewActivity] = useState("")

  const addActivity = (period: keyof Pick<DailyLog, 'morningActivities' | 'afternoonActivities' | 'nightActivities'>) => {
    if (newActivity.trim()) {
      setDailyLog(prev => ({
        ...prev,
        [period]: [...prev[period], newActivity.trim()]
      }))
      setNewActivity("")
    }
  }

  const removeActivity = (period: keyof Pick<DailyLog, 'morningActivities' | 'afternoonActivities' | 'nightActivities'>, index: number) => {
    setDailyLog(prev => ({
      ...prev,
      [period]: prev[period].filter((_, i) => i !== index)
    }))
  }

  const saveDailyLog = () => {
    // TODO: Implement API call to save daily log
    console.log("Saving daily log:", dailyLog)
  }

  const getAIInsights = () => {
    // TODO: Implement AI insights generation
    console.log("Getting AI insights...")
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Daily Reset</h1>
        <p className="text-muted-foreground">
          Track your morning, afternoon, and evening activities
        </p>
      </div>

      <Tabs value={currentTab} onValueChange={setCurrentTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="morning" className="flex items-center space-x-2">
            <Sun className="h-4 w-4" />
            <span>Morning</span>
          </TabsTrigger>
          <TabsTrigger value="afternoon" className="flex items-center space-x-2">
            <Sunset className="h-4 w-4" />
            <span>Afternoon</span>
          </TabsTrigger>
          <TabsTrigger value="night" className="flex items-center space-x-2">
            <Moon className="h-4 w-4" />
            <span>Night</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="morning" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sun className="h-5 w-5 text-yellow-500" />
                <span>Morning Activities</span>
              </CardTitle>
              <CardDescription>
                What did you do this morning? Track your morning routine and activities.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="morning-activity">Add Activity</Label>
                <div className="flex space-x-2">
                  <Input
                    id="morning-activity"
                    placeholder="e.g., Morning meditation, Exercise, Breakfast..."
                    value={newActivity}
                    onChange={(e) => setNewActivity(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addActivity('morningActivities')}
                  />
                  <Button onClick={() => addActivity('morningActivities')}>
                    Add
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                {dailyLog.morningActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <span>{activity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeActivity('morningActivities', index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="afternoon" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sunset className="h-5 w-5 text-orange-500" />
                <span>Afternoon Activities</span>
              </CardTitle>
              <CardDescription>
                Track your afternoon work, meetings, and activities.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="afternoon-activity">Add Activity</Label>
                <div className="flex space-x-2">
                  <Input
                    id="afternoon-activity"
                    placeholder="e.g., Deep work session, Meeting, Lunch..."
                    value={newActivity}
                    onChange={(e) => setNewActivity(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addActivity('afternoonActivities')}
                  />
                  <Button onClick={() => addActivity('afternoonActivities')}>
                    Add
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                {dailyLog.afternoonActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <span>{activity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeActivity('afternoonActivities', index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="night" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Moon className="h-5 w-5 text-blue-500" />
                <span>Evening Activities</span>
              </CardTitle>
              <CardDescription>
                Reflect on your evening activities and wind down routine.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="night-activity">Add Activity</Label>
                <div className="flex space-x-2">
                  <Input
                    id="night-activity"
                    placeholder="e.g., Reading, Family time, Relaxation..."
                    value={newActivity}
                    onChange={(e) => setNewActivity(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addActivity('nightActivities')}
                  />
                  <Button onClick={() => addActivity('nightActivities')}>
                    Add
                  </Button>
                </div>
              </div>
              
              <div className="space-y-2">
                {dailyLog.nightActivities.map((activity, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <span>{activity}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeActivity('nightActivities', index)}
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Feelings & Reflection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-red-500" />
            <span>How are you feeling?</span>
          </CardTitle>
          <CardDescription>
            Reflect on your emotional state and overall well-being today.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="How are you feeling today? What emotions did you experience? What made you happy or stressed?"
            value={dailyLog.feelings}
            onChange={(e) => setDailyLog(prev => ({ ...prev, feelings: e.target.value }))}
            className="min-h-[100px]"
          />
        </CardContent>
      </Card>

      {/* AI Insights */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-purple-500" />
            <span>AI Insights</span>
          </CardTitle>
          <CardDescription>
            Get personalized recommendations based on your daily activities.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={getAIInsights} className="w-full">
            <Sparkles className="mr-2 h-4 w-4" />
            Generate AI Insights
          </Button>
          
          {dailyLog.aiRecommendations.length > 0 && (
            <div className="space-y-2">
              {dailyLog.aiRecommendations.map((recommendation, index) => (
                <div key={index} className="p-3 bg-muted rounded-lg">
                  <p className="text-sm">{recommendation}</p>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Save and Sync Buttons */}
      <div className="flex justify-between">
        <NotionSyncButton 
          type="daily-log" 
          data={dailyLog}
          onSync={(success) => {
            if (success) {
              console.log('Daily log synced to Notion successfully')
            }
          }}
        />
        <Button onClick={saveDailyLog} size="lg">
          <Save className="mr-2 h-4 w-4" />
          Save Daily Log
        </Button>
      </div>
    </div>
  )
}
