"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpen, Gamepad2, StickyNote, CheckSquare, Calculator, FileText, Image, Languages, FileType, Clock, Timer, Palette, Music } from 'lucide-react'
import { koreanTexts } from "@/lib/korean-localization"

interface ToolsGridProps {
  onToolClick: (toolId: string) => void
}

const tools = [
  {
    id: 'bookmarks',
    title: koreanTexts.bookmarkManager,
    description: koreanTexts.bookmarkDesc,
    icon: BookOpen,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'cheat-codes',
    title: koreanTexts.cheatCodeManager,
    description: koreanTexts.cheatCodeDesc,
    icon: Gamepad2,
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'notes',
    title: koreanTexts.quickNotes,
    description: koreanTexts.notesDesc,
    icon: StickyNote,
    color: 'from-yellow-500 to-yellow-600'
  },
  {
    id: 'todo',
    title: koreanTexts.todoList,
    description: koreanTexts.todoDesc,
    icon: CheckSquare,
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'calculator',
    title: koreanTexts.calculator,
    description: koreanTexts.calculatorDesc,
    icon: Calculator,
    color: 'from-red-500 to-red-600'
  },
  {
    id: 'text-diff',
    title: koreanTexts.textDiff,
    description: koreanTexts.textDiffDesc,
    icon: FileText,
    color: 'from-cyan-500 to-cyan-600'
  },
  {
    id: 'image-tools',
    title: koreanTexts.imageTools,
    description: koreanTexts.imageToolsDesc,
    icon: Image,
    color: 'from-emerald-500 to-emerald-600'
  },
  {
    id: 'translator',
    title: koreanTexts.translator,
    description: koreanTexts.translatorDesc,
    icon: Languages,
    color: 'from-violet-500 to-violet-600'
  },
  {
    id: 'file-converter',
    title: koreanTexts.fileConverter,
    description: koreanTexts.fileConverterDesc,
    icon: FileType,
    color: 'from-rose-500 to-rose-600'
  },
  {
    id: 'time-tools',
    title: koreanTexts.timeTools,
    description: koreanTexts.timeToolsDesc,
    icon: Clock,
    color: 'from-amber-500 to-amber-600'
  },
  {
    id: 'timer',
    title: koreanTexts.pomodoroTimer,
    description: koreanTexts.timerDesc,
    icon: Timer,
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 'color-picker',
    title: koreanTexts.colorPicker,
    description: koreanTexts.colorDesc,
    icon: Palette,
    color: 'from-pink-500 to-pink-600'
  },
  {
    id: 'music-player',
    title: koreanTexts.musicPlayer,
    description: koreanTexts.musicDesc,
    icon: Music,
    color: 'from-indigo-500 to-indigo-600'
  }
]

export function ToolsGrid({ onToolClick }: ToolsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
