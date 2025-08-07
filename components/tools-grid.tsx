"use client"

import { Card } from "@/components/ui/card"
import { Calculator, FileText, Bookmark, Code, Image, Languages, Clock, FileImage, GitCompare, Zap } from 'lucide-react'

const tools = [
  {
    id: "calculator",
    title: "고급 계산기",
    description: "단위 변환기가 있는 공학용 계산기",
    icon: Calculator,
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "memo",
    title: "스마트 메모장",
    description: "자동 저장 기능이 있는 리치 텍스트 에디터",
    icon: FileText,
    color: "from-green-500 to-emerald-500"
  },
  {
    id: "bookmarks",
    title: "북마크 관리자",
    description: "북마크를 정리하고 관리하세요",
    icon: Bookmark,
    color: "from-yellow-500 to-orange-500"
  },
  {
    id: "cheatcodes",
    title: "치트코드 관리자",
    description: "치트코드를 저장하고 정리하세요",
    icon: Code,
    color: "from-purple-500 to-pink-500"
  },
  {
    id: "image-tools",
    title: "이미지 압축기",
    description: "이미지를 압축하고 크기를 조정하세요",
    icon: Image,
    color: "from-red-500 to-rose-500"
  },
  {
    id: "translator",
    title: "다국어 번역기",
    description: "20개 이상의 언어 간 번역",
    icon: Languages,
    color: "from-indigo-500 to-blue-500"
  },
  {
    id: "time-tools",
    title: "시간 변환기",
    description: "시간대 및 형식 변환",
    icon: Clock,
    color: "from-teal-500 to-cyan-500"
  },
  {
    id: "file-converter",
    title: "파일 변환기",
    description: "파일 형식 간 변환",
    icon: FileImage,
    color: "from-violet-500 to-purple-500"
  },
  {
    id: "text-diff",
    title: "텍스트 비교",
    description: "텍스트 파일 비교 및 차이점 확인",
    icon: GitCompare,
    color: "from-amber-500 to-yellow-500"
  },
  {
    id: "quick-tools",
    title: "빠른 도구",
    description: "유틸리티 도구 모음",
    icon: Zap,
    color: "from-pink-500 to-red-500"
  }
]

interface ToolsGridProps {
  onToolClick: (toolId: string) => void
}

export function ToolsGrid({ onToolClick }: ToolsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
      {tools.map((tool) => (
        <Card
          key={tool.id}
          className="group p-6 backdrop-blur-xl bg-white/10 dark:bg-black/10 border-white/20 dark:border-white/10 hover:bg-white/15 dark:hover:bg-black/15 transition-all duration-300 cursor-pointer hover:scale-105 hover:shadow-2xl"
          onClick={() => onToolClick(tool.id)}
        >
          <div className="flex flex-col items-center text-center space-y-4">
            <div className={`p-4 rounded-2xl bg-gradient-to-r ${tool.color} group-hover:scale-110 transition-transform duration-300`}>
              <tool.icon className="h-8 w-8 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white mb-2">{tool.title}</h3>
              <p className="text-sm text-gray-300 leading-relaxed">{tool.description}</p>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
