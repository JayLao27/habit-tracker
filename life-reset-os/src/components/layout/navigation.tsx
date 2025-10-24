"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { 
  Home, 
  Calendar, 
  Target, 
  Brain, 
  TrendingUp, 
  CheckSquare, 
  Clock,
  Bot
} from "lucide-react"

const navigationItems = [
  {
    name: "Dashboard",
    href: "/",
    icon: Home,
  },
  {
    name: "Daily Reset",
    href: "/daily-reset",
    icon: Calendar,
  },
  {
    name: "Goals",
    href: "/goals",
    icon: Target,
  },
  {
    name: "Mind Reframe",
    href: "/mind-reframe",
    icon: Brain,
  },
  {
    name: "Growth Plan",
    href: "/growth-plan",
    icon: TrendingUp,
  },
  {
    name: "Weekly Review",
    href: "/weekly-review",
    icon: CheckSquare,
  },
  {
    name: "Tasks",
    href: "/tasks",
    icon: Clock,
  },
  {
    name: "AI Coach",
    href: "/ai-coach",
    icon: Bot,
  },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col space-y-1 p-4">
      {navigationItems.map((item) => {
        const Icon = item.icon
        const isActive = pathname === item.href
        
        return (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{item.name}</span>
          </Link>
        )
      })}
    </nav>
  )
}
