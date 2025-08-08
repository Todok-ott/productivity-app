"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Gamepad2, StickyNote, CheckSquare, Calculator, Timer, Palette, Music } from 'lucide-react'

interface ToolsGridProps {
  onToolClick: (toolId: string) => void
}

const tools = [
  {
    id: 'bookmarks',
    title: 'Bookmark Manager',
    description: 'Save and organize your favorite links',
    icon: BookOpen,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'cheat-codes',
    title: 'Cheat Code Manager',
    description: 'Store and manage game cheat codes',
    icon: Gamepad2,
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'notes',
    title: 'Quick Notes',
    description: 'Jot down thoughts and ideas',
    icon: StickyNote,
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    id: 'todo',
    title: 'Todo List',
    description: 'Track your tasks and goals',
    icon: CheckSquare,
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'calculator',
    title: 'Calculator',
    description: 'Quick calculations',
    icon: Calculator,
    color: 'from-red-500 to-red-600'
  },
  {
    id: 'timer',
    title: 'Pomodoro Timer',
    description: 'Focus with time management',
    icon: Timer,
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 'color-picker',
    title: 'Color Picker',
    description: 'Pick and save colors',
    icon: Palette,
    color: 'from-pink-500 to-pink-600'
  },
  {
    id: 'music-player',
    title: 'Music Player',
    description: 'Play background music',
    icon: Music,
    color: 'from-indigo-500 to-indigo-600'
  }
]

export function ToolsGrid({ onToolClick }: ToolsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {tools.map((tool) => {
        const Icon = tool.icon
        return (
          <Card 
            key={tool.id}
            className="bg-black/40 border-white/10 backdrop-blur-sm hover:bg-black/50 transition-all cursor-pointer group"
            onClick={() => onToolClick(tool.id)}
          >
            <CardHeader className="pb-3">
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${tool.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <Icon className="h-6 w-6 text-white" />
              </div>
              <CardTitle className="text-white text-lg">{tool.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-white/70 text-sm">{tool.description}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
