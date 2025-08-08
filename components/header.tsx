"use client"

import { Button } from "@/components/ui/button"
import { Menu, Download, Upload } from 'lucide-react'
import { useRef } from "react"
import { toast } from "sonner"

interface HeaderProps {
  onMenuClick: () => void
}

export function Header({ onMenuClick }: HeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const exportData = () => {
    try {
      const data = {
        bookmarks: JSON.parse(localStorage.getItem('bookmarks') || '[]'),
        cheatCodes: JSON.parse(localStorage.getItem('cheatCodes') || '[]'),
        notes: JSON.parse(localStorage.getItem('notes') || '[]'),
        todos: JSON.parse(localStorage.getItem('todos') || '[]'),
        settings: JSON.parse(localStorage.getItem('settings') || '{}'),
        exportDate: new Date().toISOString()
      }

      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `productivity-data-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      toast.success("Data exported successfully!")
    } catch (error) {
      toast.error("Failed to export data")
    }
  }

  const importData = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target?.result as string)
        
        if (data.bookmarks) localStorage.setItem('bookmarks', JSON.stringify(data.bookmarks))
        if (data.cheatCodes) localStorage.setItem('cheatCodes', JSON.stringify(data.cheatCodes))
        if (data.notes) localStorage.setItem('notes', JSON.stringify(data.notes))
        if (data.todos) localStorage.setItem('todos', JSON.stringify(data.todos))
        if (data.settings) localStorage.setItem('settings', JSON.stringify(data.settings))
        
        toast.success("Data imported successfully! Please refresh the page.")
        setTimeout(() => window.location.reload(), 2000)
      } catch (error) {
        toast.error("Invalid file format")
      }
    }
    reader.readAsText(file)
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <header className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="text-white hover:bg-white/10"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="text-2xl font-bold text-white">Productivity Pro</h1>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={exportData}
            className="text-white border-white/20 hover:bg-white/10"
          >
            <Download className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            className="text-white border-white/20 hover:bg-white/10"
          >
            <Upload className="h-4 w-4 mr-2" />
            Import Data
          </Button>
          
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={importData}
            className="hidden"
          />
        </div>
      </div>
    </header>
  )
}
