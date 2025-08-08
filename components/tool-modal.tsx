"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { BookmarkManager } from "./tools/bookmark-manager"
import { CheatCodeManager } from "./tools/cheat-code-manager"
import { NotesManager } from "./tools/notes-manager"
import { TodoManager } from "./tools/todo-manager"
import { Calculator } from "./tools/calculator"
import { TextDiff } from "./tools/text-diff"
import { ImageTools } from "./tools/image-tools"
import { Translator } from "./tools/translator"
import { FileConverter } from "./tools/file-converter"
import { TimeTools } from "./tools/time-tools"
import { PomodoroTimer } from "./tools/pomodoro-timer"
import { ColorPicker } from "./tools/color-picker"
import { MusicPlayer } from "./tools/music-player"
import { koreanTexts } from "@/lib/korean-localization"

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
  'text-diff': TextDiff,
  'image-tools': ImageTools,
  'translator': Translator,
  'file-converter': FileConverter,
  'time-tools': TimeTools,
  'timer': PomodoroTimer,
  'color-picker': ColorPicker,
  'music-player': MusicPlayer,
}

const toolTitles = {
  'bookmarks': koreanTexts.bookmarkManager,
  'cheat-codes': koreanTexts.cheatCodeManager,
  'notes': koreanTexts.quickNotes,
  'todo': koreanTexts.todoList,
  'calculator': koreanTexts.calculator,
  'text-diff': koreanTexts.textDiff,
  'image-tools': koreanTexts.imageTools,
  'translator': koreanTexts.translator,
  'file-converter': koreanTexts.fileConverter,
  'time-tools': koreanTexts.timeTools,
  'timer': koreanTexts.pomodoroTimer,
  'color-picker': koreanTexts.colorPicker,
  'music-player': koreanTexts.musicPlayer,
}

export function ToolModal({ toolId, onClose }: ToolModalProps) {
  const ToolComponent = toolComponents[toolId as keyof typeof toolComponents]
  const title = toolTitles[toolId as keyof typeof toolTitles]

  if (!ToolComponent) return null

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-slate-900 border-white/20">
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
