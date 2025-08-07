"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calculator } from "@/components/tools/calculator"
import { MemoEditor } from "@/components/tools/memo-editor"
import { BookmarkManager } from "@/components/tools/bookmark-manager"
import { CheatCodeManager } from "@/components/tools/cheatcode-manager"
import { ImageTools } from "@/components/tools/image-tools"
import { Translator } from "@/components/tools/translator"
import { TimeTools } from "@/components/tools/time-tools"
import { FileConverter } from "@/components/tools/file-converter"
import { TextDiff } from "@/components/tools/text-diff"
import { QuickTools } from "@/components/tools/quick-tools"

const toolComponents = {
  calculator: { component: Calculator, title: "고급 계산기" },
  memo: { component: MemoEditor, title: "스마트 메모 시스템" },
  bookmarks: { component: BookmarkManager, title: "북마크 관리자" },
  cheatcodes: { component: CheatCodeManager, title: "치트코드 관리자" },
  "image-tools": { component: ImageTools, title: "이미지 압축기 및 크기 조정" },
  translator: { component: Translator, title: "다국어 번역기" },
  "time-tools": { component: TimeTools, title: "시간 변환 도구" },
  "file-converter": { component: FileConverter, title: "파일 형식 변환기" },
  "text-diff": { component: TextDiff, title: "텍스트 비교 도구" },
  "quick-tools": { component: QuickTools, title: "빠른 도구" }
}

interface ToolModalProps {
  toolId: string
  onClose: () => void
}

export function ToolModal({ toolId, onClose }: ToolModalProps) {
  const tool = toolComponents[toolId as keyof typeof toolComponents]
  
  if (!tool) return null
  
  const ToolComponent = tool.component

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto backdrop-blur-xl bg-white/10 dark:bg-black/10 border-white/20 dark:border-white/10">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">{tool.title}</DialogTitle>
        </DialogHeader>
        <div className="mt-4">
          <ToolComponent />
        </div>
      </DialogContent>
    </Dialog>
  )
}
