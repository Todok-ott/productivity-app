"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { BookmarkManager } from "./tools/bookmark-manager"
import { CheatCodeManager } from "./tools/cheat-code-manager"
import { NotesManager } from "./tools/notes-manager"
import { TodoManager } from "./tools/todo-manager"
import { Calculator } from "./tools/calculator"
import { PomodoroTimer } from "./tools/pomodoro-timer"
import { ColorPicker } from "./tools/color-picker"
import { MusicPlayer } from "./tools/music-player"

interface ToolModalProps {
  toolId: string
  onClose: () => void
}

const toolComponents = {
  'bookmarks': BookmarkManager,
  'cheat-codes': CheatCodeManager,
  'notes': NotesManager,
  'todo': TodoManager,
  'calculator': Calculator,
  'timer': PomodoroTimer,
  'color-picker': ColorPicker,
  'music-player': MusicPlayer,
}

const toolTitles = {
  'bookmarks': 'Bookmark Manager',
  'cheat-codes': 'Cheat Code Manager',
  'notes': 'Quick Notes',
  'todo': 'Todo List',
  'calculator': 'Calculator',
  'timer': 'Pomodoro Timer',
  'color-picker': 'Color Picker',
  'music-player': 'Music Player',
}

export function ToolModal({ toolId, onClose }: ToolModalProps) {
  const ToolComponent = toolComponents[toolId as keyof typeof toolComponents]
  const title = toolTitles[toolId as keyof typeof toolTitles]

  if (!ToolComponent) return null

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border-white/20">
        <DialogHeader>
          <DialogTitle className="text-white text-xl">{title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <ToolComponent />
        </div>
      </DialogContent>
    </Dialog>
  )
}
