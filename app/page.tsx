"use client"

import { useState, useEffect } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/header"
import { PersonalDashboard } from "@/components/personal-dashboard"
import { ToolsGrid } from "@/components/tools-grid"
import { Sidebar } from "@/components/sidebar"
import { Footer } from "@/components/footer"
import { ToolModal } from "@/components/tool-modal"
import { SettingsModal } from "@/components/settings-modal"
import { Toaster } from "sonner"

export default function Home() {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [birthYear, setBirthYear] = useState(1983)

  useEffect(() => {
    // Load saved birth year
    const saved = localStorage.getItem('birthYear')
    if (saved) {
      setBirthYear(parseInt(saved))
    }
  }, [])

  const handleBirthYearChange = (year: number) => {
    setBirthYear(year)
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 dark:from-slate-950 dark:via-purple-950 dark:to-slate-950">
        {/* Background Pattern */}
        <div className="fixed inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%3E%3Cg%20fill%3D%22none%22%20fillRule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%239C92AC%22%20fillOpacity%3D%220.05%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
        
        <div className="relative z-10">
          <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
          
          <main className="container mx-auto px-4 py-6 space-y-8">
            <PersonalDashboard birthYear={birthYear} />
            <ToolsGrid onToolClick={setActiveModal} />
          </main>
          
          <Sidebar 
            isOpen={sidebarOpen} 
            onClose={() => setSidebarOpen(false)}
            onSettingsClick={() => setSettingsOpen(true)}
          />
          <Footer />
          
          {activeModal && (
            <ToolModal
              toolId={activeModal}
              onClose={() => setActiveModal(null)}
            />
          )}

          <SettingsModal
            isOpen={settingsOpen}
            onClose={() => setSettingsOpen(false)}
            onBirthYearChange={handleBirthYearChange}
          />
        </div>
      </div>
      <Toaster position="top-right" />
    </ThemeProvider>
  )
}
