"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Settings, Moon, Sun } from 'lucide-react'
import { koreanTexts } from "@/lib/korean-localization"
import { toast } from "sonner"
import { useTheme } from "next-themes"

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  onBirthYearChange: (year: number) => void
}

export function SettingsModal({ isOpen, onClose, onBirthYearChange }: SettingsModalProps) {
  const [birthYear, setBirthYear] = useState<string>("")
  const { theme, setTheme } = useTheme()
  const [isDarkMode, setIsDarkMode] = useState(theme === "dark")

  useEffect(() => {
    // Load saved birth year
    const saved = localStorage.getItem('birthYear')
    if (saved) {
      setBirthYear(saved)
    } else {
      setBirthYear("1983") // Default to 1983
    }
  }, [])

  useEffect(() => {
    setIsDarkMode(theme === "dark")
  }, [theme])

  const handleSave = () => {
    const year = parseInt(birthYear)
    if (year < 1900 || year > 2024) {
      toast.error("올바른 출생년도를 입력해주세요 (1900-2024)")
      return
    }

    // Save settings
    localStorage.setItem('birthYear', birthYear)
    onBirthYearChange(year)
    
    toast.success("설정이 저장되었습니다!")
    onClose()
  }

  const handleThemeToggle = (checked: boolean) => {
    setIsDarkMode(checked)
    setTheme(checked ? "dark" : "light")
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-slate-900 border-white/20">
        <DialogHeader>
          <DialogTitle className="text-white flex items-center gap-2">
            <Settings className="h-5 w-5" />
            {koreanTexts.settings}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 mt-6">
          {/* Theme Settings */}
          <Card className="bg-black/40 border-white/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg">
                {koreanTexts.themeSettings}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isDarkMode ? (
                    <Moon className="h-5 w-5 text-white" />
                  ) : (
                    <Sun className="h-5 w-5 text-white" />
                  )}
                  <span className="text-white">
                    {isDarkMode ? koreanTexts.darkMode : koreanTexts.lightMode}
                  </span>
                </div>
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={handleThemeToggle}
                />
              </div>
            </CardContent>
          </Card>

          {/* Birth Year Settings */}
          <Card className="bg-black/40 border-white/10">
            <CardHeader className="pb-3">
              <CardTitle className="text-white text-lg">
                {koreanTexts.birthYearSetting}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="birthYear" className="text-white">
                  {koreanTexts.birthYear}
                </Label>
                <Input
                  id="birthYear"
                  type="number"
                  value={birthYear}
                  onChange={(e) => setBirthYear(e.target.value)}
                  placeholder="예: 1983"
                  min="1900"
                  max="2024"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 mt-2"
                />
              </div>
              <p className="text-white/70 text-sm">
                출생년도를 변경하면 띠별 운세가 자동으로 업데이트됩니다.
              </p>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button onClick={handleSave} className="flex-1">
              {koreanTexts.save}
            </Button>
            <Button onClick={onClose} variant="outline" className="flex-1 text-white border-white/20 hover:bg-white/10">
              {koreanTexts.close}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
