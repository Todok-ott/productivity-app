"use client"

import { Button } from "@/components/ui/button"
import { X, Settings } from 'lucide-react'
import { koreanTexts } from "@/lib/korean-localization"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  onSettingsClick: () => void
}

export function Sidebar({ isOpen, onClose, onSettingsClick }: SidebarProps) {
  if (!isOpen) return null

  const handleSettingsClick = () => {
    onSettingsClick()
    onClose()
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-40"
        onClick={onClose}
      />
      
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-80 bg-black/90 backdrop-blur-sm border-r border-white/10 z-50 p-6">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-white text-xl font-semibold">{koreanTexts.menu}</h2>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-white hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="space-y-4">
          <Button
            variant="ghost"
            className="w-full justify-start text-white hover:bg-white/10"
            onClick={handleSettingsClick}
          >
            <Settings className="h-5 w-5 mr-3" />
            {koreanTexts.settings}
          </Button>
        </nav>
      </div>
    </>
  )
}
