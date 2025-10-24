"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Brain, Save, Edit3, X, Check } from "lucide-react"

interface MindReframe {
  dontWant: string[]
  want: string[]
}

export default function MindReframePage() {
  const [mindReframe, setMindReframe] = useState<MindReframe>({
    dontWant: [],
    want: []
  })

  const [isEditing, setIsEditing] = useState(false)
  const [newDontWant, setNewDontWant] = useState("")
  const [newWant, setNewWant] = useState("")

  const addDontWant = () => {
    if (newDontWant.trim()) {
      setMindReframe(prev => ({
        ...prev,
        dontWant: [...prev.dontWant, newDontWant.trim()]
      }))
      setNewDontWant("")
    }
  }

  const addWant = () => {
    if (newWant.trim()) {
      setMindReframe(prev => ({
        ...prev,
        want: [...prev.want, newWant.trim()]
      }))
      setNewWant("")
    }
  }

  const removeDontWant = (index: number) => {
    setMindReframe(prev => ({
      ...prev,
      dontWant: prev.dontWant.filter((_, i) => i !== index)
    }))
  }

  const removeWant = (index: number) => {
    setMindReframe(prev => ({
      ...prev,
      want: prev.want.filter((_, i) => i !== index)
    }))
  }

  const saveMindReframe = () => {
    // TODO: Implement API call to save mind reframe
    console.log("Saving mind reframe:", mindReframe)
    setIsEditing(false)
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mind Reframe</h1>
          <p className="text-muted-foreground">
            Define what you want and what you don't want in life
          </p>
        </div>
        <div className="flex space-x-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>
                Cancel
              </Button>
              <Button onClick={saveMindReframe}>
                <Save className="mr-2 h-4 w-4" />
                Save Reframe
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit3 className="mr-2 h-4 w-4" />
              Edit Reframe
            </Button>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* What I Don't Want */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <X className="h-5 w-5 text-red-500" />
              <span>What I Don't Want</span>
            </CardTitle>
            <CardDescription>
              Things you want to avoid, eliminate, or move away from
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <div className="space-y-2">
                <Label htmlFor="dont-want">Add something you don't want</Label>
                <div className="flex space-x-2">
                  <Textarea
                    id="dont-want"
                    placeholder="e.g., Stress, Procrastination, Toxic relationships..."
                    value={newDontWant}
                    onChange={(e) => setNewDontWant(e.target.value)}
                    className="min-h-[60px]"
                  />
                  <Button onClick={addDontWant} size="sm">
                    Add
                  </Button>
                </div>
              </div>
            ) : null}
            
            <div className="space-y-2">
              {mindReframe.dontWant.length > 0 ? (
                mindReframe.dontWant.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-red-50">
                    <span className="text-sm">{item}</span>
                    {isEditing && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeDontWant(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  No items added yet. Click "Edit Reframe" to add what you don't want.
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* What I Want */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Check className="h-5 w-5 text-green-500" />
              <span>What I Want</span>
            </CardTitle>
            <CardDescription>
              Things you want to achieve, experience, or move toward
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isEditing ? (
              <div className="space-y-2">
                <Label htmlFor="want">Add something you want</Label>
                <div className="flex space-x-2">
                  <Textarea
                    id="want"
                    placeholder="e.g., Peace of mind, Financial freedom, Healthy relationships..."
                    value={newWant}
                    onChange={(e) => setNewWant(e.target.value)}
                    className="min-h-[60px]"
                  />
                  <Button onClick={addWant} size="sm">
                    Add
                  </Button>
                </div>
              </div>
            ) : null}
            
            <div className="space-y-2">
              {mindReframe.want.length > 0 ? (
                mindReframe.want.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg bg-green-50">
                    <span className="text-sm">{item}</span>
                    {isEditing && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeWant(index)}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground italic">
                  No items added yet. Click "Edit Reframe" to add what you want.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reflection Questions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5 text-purple-500" />
            <span>Reflection Questions</span>
          </CardTitle>
          <CardDescription>
            Use these questions to deepen your understanding of your wants and don't wants
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-medium">About What You Don't Want:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• What patterns or behaviors are you trying to break?</li>
                <li>• What situations make you feel drained or unhappy?</li>
                <li>• What would you like to eliminate from your life?</li>
                <li>• What boundaries do you need to set?</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">About What You Want:</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• What experiences bring you joy and fulfillment?</li>
                <li>• What kind of person do you want to become?</li>
                <li>• What relationships do you want to cultivate?</li>
                <li>• What impact do you want to have on the world?</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
