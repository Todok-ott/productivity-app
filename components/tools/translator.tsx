"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Languages, ArrowRight, Copy } from 'lucide-react'
import { koreanTexts } from "@/lib/korean-localization"
import { toast } from "sonner"

const languages = [
  { code: 'ko', name: '한국어' },
  { code: 'en', name: 'English' },
  { code: 'ja', name: '日本語' },
  { code: 'zh', name: '中文' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ru', name: 'Русский' },
  { code: 'ar', name: 'العربية' },
  { code: 'hi', name: 'हिन्दी' }
]

export function Translator() {
  const [sourceText, setSourceText] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [sourceLang, setSourceLang] = useState("ko")
  const [targetLang, setTargetLang] = useState("en")
  const [isTranslating, setIsTranslating] = useState(false)

  // Mock translation function - in real app, you'd use Google Translate API or similar
  const translateText = async () => {
    if (!sourceText.trim()) {
      toast.error("번역할 텍스트를 입력해주세요")
      return
    }

    setIsTranslating(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // Mock translation responses
    const mockTranslations: { [key: string]: string } = {
      'ko-en': 'This is a translated text from Korean to English.',
      'en-ko': '이것은 영어에서 한국어로 번역된 텍스트입니다.',
      'ko-ja': 'これは韓国語から日本語に翻訳されたテキストです。',
      'ja-ko': '이것은 일본어에서 한국어로 번역된 텍스트입니다.',
      'ko-zh': '这是从韩语翻译成中文的文本。',
      'zh-ko': '이것은 중국어에서 한국어로 번역된 텍스트입니다.'
    }
    
    const translationKey = `${sourceLang}-${targetLang}`
    const result = mockTranslations[translationKey] || `[${sourceLang} → ${targetLang}] ${sourceText}`
    
    setTranslatedText(result)
    setIsTranslating(false)
    toast.success("번역이 완료되었습니다!")
  }

  const copyTranslation = async () => {
    if (translatedText) {
      try {
        await navigator.clipboard.writeText(translatedText)
        toast.success("번역 결과가 클립보드에 복사되었습니다!")
      } catch (error) {
        toast.error("복사에 실패했습니다")
      }
    }
  }

  const swapLanguages = () => {
    setSourceLang(targetLang)
    setTargetLang(sourceLang)
    setSourceText(translatedText)
    setTranslatedText("")
  }

  return (
    <div className="space-y-6">
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Languages className="h-5 w-5" />
            {koreanTexts.translator}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Language Selection */}
          <div className="flex items-center gap-4">
            <Select value={sourceLang} onValueChange={setSourceLang}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-white/20">
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code} className="text-white">
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={swapLanguages}
              className="text-white hover:bg-white/10"
            >
              <ArrowRight className="h-4 w-4" />
            </Button>
            
            <Select value={targetLang} onValueChange={setTargetLang}>
              <SelectTrigger className="bg-white/10 border-white/20 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-white/20">
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code} className="text-white">
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Text Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Textarea
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                placeholder="번역할 텍스트를 입력하세요..."
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[200px]"
              />
            </div>
            <div className="relative">
              <Textarea
                value={translatedText}
                readOnly
                placeholder="번역 결과가 여기에 표시됩니다..."
                className="bg-white/5 border-white/20 text-white placeholder:text-white/50 min-h-[200px]"
              />
              {translatedText && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={copyTranslation}
                  className="absolute top-2 right-2 text-white/70 hover:text-white"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              )}
            </div>
          </div>

          {/* Translate Button */}
          <Button 
            onClick={translateText} 
            disabled={isTranslating}
            className="w-full"
          >
            {isTranslating ? koreanTexts.processing : koreanTexts.translate}
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
