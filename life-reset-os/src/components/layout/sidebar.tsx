"use client"

import { Navigation } from "./navigation"

export function Sidebar() {
  return (
    <div className="flex h-full w-64 flex-col border-r bg-background">
      <div className="flex h-16 items-center border-b px-6">
        <h1 className="text-xl font-bold">Life Reset OS</h1>
      </div>
      <Navigation />
    </div>
  )
}
