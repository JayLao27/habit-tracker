"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { CheckSquare, Save, Calendar, Heart, Target, TrendingUp } from "lucide-react"

interface WeeklyReview {
  weekStart: string
  wentWell: string
  notWell: string
  gratitude: string
  goal: string
  focusProjects: string
}

export default function WeeklyReviewPage() {
  const [weeklyReview, setWeeklyReview] = useState<WeeklyReview>({
    weekStart: new Date().toISOString().split('T')[0],
    wentWell: "",
    notWell: "",
    gratitude: "",
    goal: "",
    focusProjects: ""
  })

  const [isEditing, setIsEditing] = useState(false)

  const saveWeeklyReview = () => {
    // TODO: Implement API call to save weekly review
    console.log("Saving weekly review:", weeklyReview)
    setIsEditing(false)
  }

  const updateField = (field: keyof WeeklyReview, value: string) => {
    setWeeklyReview(prev => ({ ...prev, [field]: value }))
  }

  const getWeekStart = () => {
    const today = new Date()
    const dayOfWeek = today.getDay()
    const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1) // Monday
    const monday = new Date(today.setDate(diff))
    return monday.toISOString().split('T')[0]
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Weekly Review</h1>
          <p className="text-muted-foreground">
            Reflect on your week and plan for the next one
          </p>
        </div>
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={saveWeeklyReview}>
                <Save className="mr-2 h-4 w-4" />
                Save Review
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <CheckSquare className="mr-2 h-4 w-4" />
              Start Review
            </Button>
          )}
        </div>
      </div>

      {/* Week Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-blue-500" />
            <span>Week of Review</span>
          </CardTitle>
          <CardDescription>
            Select the week you want to review
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label htmlFor="week-start">Week Starting</Label>
            <input
              id="week-start"
              type="date"
              value={weeklyReview.weekStart}
              onChange={(e) => updateField('weekStart', e.target.value)}
              className="w-full p-2 border rounded-md"
              disabled={!isEditing}
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {/* What Went Well */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span>What Went Well</span>
            </CardTitle>
            <CardDescription>
              Celebrate your wins and successes this week
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <div className="space-y-2">
                <Label htmlFor="went-well">What went well this week?</Label>
                <Textarea
                  id="went-well"
                  placeholder="What achievements, positive experiences, or progress did you make this week?"
                  value={weeklyReview.wentWell}
                  onChange={(e) => updateField('wentWell', e.target.value)}
                  className="min-h-[120px]"
                />
              </div>
            ) : (
              <div className="space-y-2">
                {weeklyReview.wentWell ? (
                  <p className="text-sm leading-relaxed">{weeklyReview.wentWell}</p>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    No wins recorded yet. Click "Start Review" to add your successes.
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* What Didn't Go Well */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-red-500" />
              <span>What Didn't Go Well</span>
            </CardTitle>
            <CardDescription>
              Identify challenges and areas for improvement
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <div className="space-y-2">
                <Label htmlFor="not-well">What didn't go well this week?</Label>
                <Textarea
                  id="not-well"
                  placeholder="What challenges, setbacks, or areas for improvement did you experience?"
                  value={weeklyReview.notWell}
                  onChange={(e) => updateField('notWell', e.target.value)}
                  className="min-h-[120px]"
                />
              </div>
            ) : (
              <div className="space-y-2">
                {weeklyReview.notWell ? (
                  <p className="text-sm leading-relaxed">{weeklyReview.notWell}</p>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    No challenges recorded yet. Click "Start Review" to add areas for improvement.
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Gratitude */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Heart className="h-5 w-5 text-pink-500" />
            <span>Gratitude</span>
          </CardTitle>
          <CardDescription>
            What are you grateful for this week?
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="space-y-2">
              <Label htmlFor="gratitude">What are you grateful for?</Label>
              <Textarea
                id="gratitude"
                placeholder="What people, experiences, or things are you grateful for this week?"
                value={weeklyReview.gratitude}
                onChange={(e) => updateField('gratitude', e.target.value)}
                className="min-h-[100px]"
              />
            </div>
          ) : (
            <div className="space-y-2">
              {weeklyReview.gratitude ? (
                <p className="text-sm leading-relaxed">{weeklyReview.gratitude}</p>
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  No gratitude recorded yet. Click "Start Review" to add what you're grateful for.
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Next Week Planning */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-500" />
              <span>Next Week's Goal</span>
            </CardTitle>
            <CardDescription>
              What do you want to focus on next week?
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <div className="space-y-2">
                <Label htmlFor="next-goal">Next week's main goal</Label>
                <Textarea
                  id="next-goal"
                  placeholder="What is your primary focus for next week?"
                  value={weeklyReview.goal}
                  onChange={(e) => updateField('goal', e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            ) : (
              <div className="space-y-2">
                {weeklyReview.goal ? (
                  <p className="text-sm leading-relaxed">{weeklyReview.goal}</p>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    No goal set yet. Click "Start Review" to set your focus for next week.
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <CheckSquare className="h-5 w-5 text-purple-500" />
              <span>Focus Projects</span>
            </CardTitle>
            <CardDescription>
              What specific projects will you work on?
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <div className="space-y-2">
                <Label htmlFor="focus-projects">Key projects for next week</Label>
                <Textarea
                  id="focus-projects"
                  placeholder="What specific projects or tasks will you focus on next week?"
                  value={weeklyReview.focusProjects}
                  onChange={(e) => updateField('focusProjects', e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
            ) : (
              <div className="space-y-2">
                {weeklyReview.focusProjects ? (
                  <p className="text-sm leading-relaxed">{weeklyReview.focusProjects}</p>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    No projects set yet. Click "Start Review" to plan your focus projects.
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
