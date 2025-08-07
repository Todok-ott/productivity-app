"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X, Clock, Bookmark, Calculator, FileText, Star } from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const recentTools = [
    { id: "calculator", name: "계산기", icon: Calculator, time: "2분 전" },
    { id: "memo", name: "스마트 메모", icon: FileText, time: "5분 전" },
    { id: "bookmarks", name: "북마크", icon: Bookmark, time: "10분 전" }
  ]

  const quickActions = [
    { name: "새 메모", action: () => {} },
    { name: "빠른 계산", action: () => {} },
    { name: "북마크 추가", action: () => {} }
  ]

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-80 bg-gradient-to-b from-slate-900/95 to-purple-900/95 backdrop-blur-xl border-l border-white/20 z-50 overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">빠른 접근</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="text-white hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Recent Tools */}
          <Card className="p-4 backdrop-blur-xl bg-white/10 dark:bg-black/10 border-white/20 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-blue-400" />
              <h3 className="font-semibold text-white">최근 사용</h3>
            </div>
            <div className="space-y-2">
              {recentTools.map((tool) => (
                <div key={tool.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/10 transition-colors cursor-pointer">
                  <tool.icon className="h-4 w-4 text-gray-400" />
                  <div className="flex-1">
                    <p className="text-sm text-white">{tool.name}</p>
                    <p className="text-xs text-gray-400">{tool.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="p-4 backdrop-blur-xl bg-white/10 dark:bg-black/10 border-white/20 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Star className="h-5 w-5 text-yellow-400" />
              <h3 className="font-semibold text-white">빠른 작업</h3>
            </div>
            <div className="space-y-2">
              {quickActions.map((action, index) => (
                <Button
                  key={index}
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-white/20"
                  onClick={action.action}
                >
                  {action.name}
                </Button>
              ))}
            </div>
          </Card>

          {/* Stats */}
          <Card className="p-4 backdrop-blur-xl bg-white/10 dark:bg-black/10 border-white/20">
            <h3 className="font-semibold text-white mb-4">사용 통계</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">오늘 사용한 도구</span>
                <span className="text-white font-medium">12</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">처리한 파일</span>
                <span className="text-white font-medium">8</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-300">절약한 시간</span>
                <span className="text-green-400 font-medium">2.5 시간</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </>
  )
}
