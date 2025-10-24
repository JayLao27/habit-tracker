"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Target, Save, Edit3, CheckCircle } from "lucide-react"

interface Goals {
  tenYearGoal: string
  oneYearGoal: string
  threeMonthGoal: string
}

export default function GoalsPage() {
  const [goals, setGoals] = useState<Goals>({
    tenYearGoal: "",
    oneYearGoal: "",
    threeMonthGoal: ""
  })

  const [isEditing, setIsEditing] = useState(false)

  const saveGoals = () => {
    // TODO: Implement API call to save goals
    console.log("Saving goals:", goals)
    setIsEditing(false)
  }

  const updateGoal = (field: keyof Goals, value: string) => {
    setGoals(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Goal Clarity</h1>
          <p className="text-muted-foreground">
            Define your 10-year, 1-year, and 3-month goals
          </p>
        </div>
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={saveGoals}>
                <Save className="mr-2 h-4 w-4" />
                Save Goals
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit3 className="mr-2 h-4 w-4" />
              Edit Goals
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {/* 10-Year Goal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-500" />
              <span>10-Year Vision</span>
            </CardTitle>
            <CardDescription>
              Your long-term life vision and ultimate goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <div className="space-y-2">
                <Label htmlFor="ten-year-goal">10-Year Goal</Label>
                <Textarea
                  id="ten-year-goal"
                  placeholder="Where do you want to be in 10 years? What legacy do you want to leave?"
                  value={goals.tenYearGoal}
                  onChange={(e) => updateGoal('tenYearGoal', e.target.value)}
                  className="min-h-[120px]"
                />
              </div>
            ) : (
              <div className="space-y-2">
                {goals.tenYearGoal ? (
                  <p className="text-sm leading-relaxed">{goals.tenYearGoal}</p>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    No 10-year goal set yet. Click "Edit Goals" to add one.
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* 1-Year Goal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-green-500" />
              <span>1-Year Goal</span>
            </CardTitle>
            <CardDescription>
              Major milestones you want to achieve this year
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <div className="space-y-2">
                <Label htmlFor="one-year-goal">1-Year Goal</Label>
                <Textarea
                  id="one-year-goal"
                  placeholder="What do you want to accomplish this year? What major changes do you want to make?"
                  value={goals.oneYearGoal}
                  onChange={(e) => updateGoal('oneYearGoal', e.target.value)}
                  className="min-h-[120px]"
                />
              </div>
            ) : (
              <div className="space-y-2">
                {goals.oneYearGoal ? (
                  <p className="text-sm leading-relaxed">{goals.oneYearGoal}</p>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    No 1-year goal set yet. Click "Edit Goals" to add one.
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* 3-Month Goal */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-orange-500" />
              <span>3-Month Goal</span>
            </CardTitle>
            <CardDescription>
              Immediate focus areas for the next quarter
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <div className="space-y-2">
                <Label htmlFor="three-month-goal">3-Month Goal</Label>
                <Textarea
                  id="three-month-goal"
                  placeholder="What do you want to focus on for the next 3 months? What habits do you want to build?"
                  value={goals.threeMonthGoal}
                  onChange={(e) => updateGoal('threeMonthGoal', e.target.value)}
                  className="min-h-[120px]"
                />
              </div>
            ) : (
              <div className="space-y-2">
                {goals.threeMonthGoal ? (
                  <p className="text-sm leading-relaxed">{goals.threeMonthGoal}</p>
                ) : (
                  <p className="text-sm text-muted-foreground italic">
                    No 3-month goal set yet. Click "Edit Goals" to add one.
                  </p>
                )}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Goal Alignment Check */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-purple-500" />
            <span>Goal Alignment Check</span>
          </CardTitle>
          <CardDescription>
            Ensure your goals are aligned and actionable
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <h4 className="font-medium">10-Year → 1-Year</h4>
                <p className="text-sm text-muted-foreground">
                  Does your 1-year goal move you toward your 10-year vision?
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">1-Year → 3-Month</h4>
                <p className="text-sm text-muted-foreground">
                  Does your 3-month goal support your 1-year objectives?
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Actionable Steps</h4>
                <p className="text-sm text-muted-foreground">
                  Can you break down your 3-month goal into weekly actions?
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
