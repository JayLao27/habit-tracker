"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { TrendingUp, Save, Edit3, Plus, X, Target, AlertTriangle } from "lucide-react"

interface GrowthPlan {
  skillsNeeded: string[]
  distractions: string[]
}

export default function GrowthPlanPage() {
  const [growthPlan, setGrowthPlan] = useState<GrowthPlan>({
    skillsNeeded: [],
    distractions: []
  })

  const [isEditing, setIsEditing] = useState(false)
  const [newSkill, setNewSkill] = useState("")
  const [newDistraction, setNewDistraction] = useState("")

  const addSkill = () => {
    if (newSkill.trim()) {
      setGrowthPlan(prev => ({
        ...prev,
        skillsNeeded: [...prev.skillsNeeded, newSkill.trim()]
      }))
      setNewSkill("")
    }
  }

  const addDistraction = () => {
    if (newDistraction.trim()) {
      setGrowthPlan(prev => ({
        ...prev,
        distractions: [...prev.distractions, newDistraction.trim()]
      }))
      setNewDistraction("")
    }
  }

  const removeSkill = (index: number) => {
    setGrowthPlan(prev => ({
      ...prev,
      skillsNeeded: prev.skillsNeeded.filter((_, i) => i !== index)
    }))
  }

  const removeDistraction = (index: number) => {
    setGrowthPlan(prev => ({
      ...prev,
      distractions: prev.distractions.filter((_, i) => i !== index)
    }))
  }

  const saveGrowthPlan = () => {
    // TODO: Implement API call to save growth plan
    console.log("Saving growth plan:", growthPlan)
    setIsEditing(false)
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Growth Plan</h1>
          <p className="text-muted-foreground">
            Identify skills you need to develop and distractions to eliminate
          </p>
        </div>
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={saveGrowthPlan}>
                <Save className="mr-2 h-4 w-4" />
                Save Plan
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit3 className="mr-2 h-4 w-4" />
              Edit Plan
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Skills Needed */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5 text-blue-500" />
              <span>Skills I Need to Develop</span>
            </CardTitle>
            <CardDescription>
              What skills will help you achieve your goals?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <div className="space-y-2">
                <Label htmlFor="new-skill">Add a skill to develop</Label>
                <div className="flex space-x-2">
                  <Textarea
                    id="new-skill"
                    placeholder="e.g., Public speaking, Coding, Time management..."
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    className="min-h-[60px]"
                  />
                  <Button onClick={addSkill} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : null}
            
            <div className="space-y-2">
              {growthPlan.skillsNeeded.length > 0 ? (
                growthPlan.skillsNeeded.map((skill, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-blue-50">
                    <span className="text-sm">{skill}</span>
                    {isEditing && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSkill(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  No skills added yet. Click "Edit Plan" to add skills you want to develop.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Distractions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <span>Distractions to Eliminate</span>
            </CardTitle>
            <CardDescription>
              What habits or activities are holding you back?
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <div className="space-y-2">
                <Label htmlFor="new-distraction">Add a distraction to eliminate</Label>
                <div className="flex space-x-2">
                  <Textarea
                    id="new-distraction"
                    placeholder="e.g., Social media scrolling, Procrastination, Negative self-talk..."
                    value={newDistraction}
                    onChange={(e) => setNewDistraction(e.target.value)}
                    className="min-h-[60px]"
                  />
                  <Button onClick={addDistraction} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ) : null}
            
            <div className="space-y-2">
              {growthPlan.distractions.length > 0 ? (
                growthPlan.distractions.map((distraction, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-red-50">
                    <span className="text-sm">{distraction}</span>
                    {isEditing && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDistraction(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  No distractions added yet. Click "Edit Plan" to add what you want to eliminate.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Growth Strategy */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-green-500" />
            <span>Growth Strategy</span>
          </CardTitle>
          <CardDescription>
            Actionable steps to develop skills and eliminate distractions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h4 className="font-medium">Skill Development Plan</h4>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h5 className="font-medium text-sm">Daily Practice</h5>
                  <p className="text-xs text-muted-foreground">
                    Dedicate 30 minutes daily to skill development
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h5 className="font-medium text-sm">Weekly Learning</h5>
                  <p className="text-xs text-muted-foreground">
                    Take courses, read books, or find mentors
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h5 className="font-medium text-sm">Monthly Review</h5>
                  <p className="text-xs text-muted-foreground">
                    Assess progress and adjust learning approach
                  </p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Distraction Elimination</h4>
              <div className="space-y-3">
                <div className="p-3 border rounded-lg">
                  <h5 className="font-medium text-sm">Identify Triggers</h5>
                  <p className="text-xs text-muted-foreground">
                    Notice when and why you engage in distracting behaviors
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h5 className="font-medium text-sm">Replace Habits</h5>
                  <p className="text-xs text-muted-foreground">
                    Substitute distracting activities with productive ones
                  </p>
                </div>
                <div className="p-3 border rounded-lg">
                  <h5 className="font-medium text-sm">Environment Design</h5>
                  <p className="text-xs text-muted-foreground">
                    Modify your environment to reduce distractions
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
