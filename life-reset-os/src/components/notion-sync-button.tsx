"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

interface NotionSyncButtonProps {
  type: 'daily-log' | 'goals' | 'weekly-review' | 'mind-reframe' | 'growth-plan'
  data: any
  onSync?: (success: boolean) => void
}

export function NotionSyncButton({ type, data, onSync }: NotionSyncButtonProps) {
  const [isSyncing, setIsSyncing] = useState(false)
  const [syncStatus, setSyncStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [syncMessage, setSyncMessage] = useState('')

  const syncToNotion = async () => {
    setIsSyncing(true)
    setSyncStatus('idle')
    setSyncMessage('')

    try {
      const response = await fetch('/api/notion-sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          data,
          userId: 'current-user' // TODO: Get from auth context
        })
      })

      const result = await response.json()

      if (response.ok) {
        setSyncStatus('success')
        setSyncMessage(result.message || 'Synced to Notion successfully!')
        onSync?.(true)
      } else {
        setSyncStatus('error')
        setSyncMessage(result.error || 'Failed to sync to Notion')
        onSync?.(false)
      }
    } catch (error) {
      setSyncStatus('error')
      setSyncMessage('Network error. Please try again.')
      onSync?.(false)
    } finally {
      setIsSyncing(false)
    }
  }

  const getSyncIcon = () => {
    if (isSyncing) return <Loader2 className="h-4 w-4 animate-spin" />
    if (syncStatus === 'success') return <CheckCircle className="h-4 w-4 text-green-500" />
    if (syncStatus === 'error') return <AlertCircle className="h-4 w-4 text-red-500" />
    return <Upload className="h-4 w-4" />
  }

  const getSyncColor = () => {
    if (syncStatus === 'success') return 'text-green-500'
    if (syncStatus === 'error') return 'text-red-500'
    return ''
  }

  return (
    <div className="space-y-2">
      <Button 
        onClick={syncToNotion} 
        disabled={isSyncing}
        variant="outline"
        className="w-full"
      >
        {getSyncIcon()}
        <span className="ml-2">
          {isSyncing ? 'Syncing...' : 'Sync to Notion'}
        </span>
      </Button>
      
      {syncMessage && (
        <div className={`text-sm ${getSyncColor()}`}>
          {syncMessage}
        </div>
      )}
    </div>
  )
}

export function NotionSyncStatus() {
  const [isChecking, setIsChecking] = useState(false)
  const [connectionStatus, setConnectionStatus] = useState<'idle' | 'connected' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const checkConnection = async () => {
    setIsChecking(true)
    setConnectionStatus('idle')
    setStatusMessage('')

    try {
      const response = await fetch('/api/notion-sync')
      const result = await response.json()

      if (response.ok) {
        setConnectionStatus('connected')
        setStatusMessage(`Connected to Notion database: ${result.databaseName}`)
      } else {
        setConnectionStatus('error')
        setStatusMessage(result.error || 'Failed to connect to Notion')
      }
    } catch (error) {
      setConnectionStatus('error')
      setStatusMessage('Network error. Please check your configuration.')
    } finally {
      setIsChecking(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Upload className="h-5 w-5" />
          <span>Notion Integration</span>
        </CardTitle>
        <CardDescription>
          Sync your data to Notion for external organization
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={checkConnection} 
          disabled={isChecking}
          variant="outline"
          className="w-full"
        >
          {isChecking ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Checking Connection...
            </>
          ) : (
            <>
              <Upload className="mr-2 h-4 w-4" />
              Test Notion Connection
            </>
          )}
        </Button>
        
        {statusMessage && (
          <div className={`text-sm ${
            connectionStatus === 'connected' ? 'text-green-500' : 
            connectionStatus === 'error' ? 'text-red-500' : 
            'text-muted-foreground'
          }`}>
            {statusMessage}
          </div>
        )}

        <div className="text-xs text-muted-foreground">
          <p>To enable Notion sync:</p>
          <ul className="list-disc list-inside space-y-1 mt-2">
            <li>Set NOTION_KEY in your environment variables</li>
            <li>Set NOTION_DB_ID in your environment variables</li>
            <li>Create a Notion database with the required properties</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
