"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeftRight, Volume2, Copy, History } from 'lucide-react'

const languages = [
  { code: "en", name: "영어 (English)" },
  { code: "ko", name: "한국어 (Korean)" },
  { code: "ja", name: "일본어 (Japanese)" },
  { code: "zh", name: "중국어 (Chinese)" },
  { code: "es", name: "스페인어 (Spanish)" },
  { code: "fr", name: "프랑스어 (French)" },
  { code: "de", name: "독일어 (German)" },
  { code: "it", name: "이탈리아어 (Italian)" },
  { code: "pt", name: "포르투갈어 (Portuguese)" },
  { code: "ru", name: "러시아어 (Russian)" },
  { code: "ar", name: "아랍어 (Arabic)" },
  { code: "hi", name: "힌디어 (Hindi)" },
  { code: "th", name: "태국어 (Thai)" },
  { code: "vi", name: "베트남어 (Vietnamese)" },
  { code: "nl", name: "네덜란드어 (Dutch)" },
  { code: "sv", name: "스웨덴어 (Swedish)" },
  { code: "no", name: "노르웨이어 (Norwegian)" },
  { code: "da", name: "덴마크어 (Danish)" },
  { code: "fi", name: "핀란드어 (Finnish)" },
  { code: "pl", name: "폴란드어 (Polish)" }
]

interface Translation {
  id: string
  sourceText: string
  translatedText: string
  fromLang: string
  toLang: string
  timestamp: Date
}

export function Translator() {
  const [sourceText, setSourceText] = useState("")
  const [translatedText, setTranslatedText] = useState("")
  const [fromLang, setFromLang] = useState("en")
  const [toLang, setToLang] = useState("ko")
  const [history, setHistory] = useState<Translation[]>([])
  const [isTranslating, setIsTranslating] = useState(false)

  const translateText = async () => {
    if (!sourceText.trim()) return
    
    setIsTranslating(true)
    
    // Simulate translation API call
    setTimeout(() => {
      const mockTranslation = `[Translated from ${languages.find(l => l.code === fromLang)?.name} to ${languages.find(l => l.code === toLang)?.name}]: ${sourceText}`
      
      setTranslatedText(mockTranslation)
      
      const translation: Translation = {
        id: Date.now().toString(),
        sourceText,
        translatedText: mockTranslation,
        fromLang,
        toLang,
        timestamp: new Date()
      }
      
      setHistory(prev => [translation, ...prev.slice(0, 9)]) // Keep last 10
      setIsTranslating(false)
    }, 1000)
  }

  const swapLanguages = () => {
    setFromLang(toLang)
    setToLang(fromLang)
    setSourceText(translatedText)
    setTranslatedText("")
  }

  const speakText = (text: string, lang: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = lang
      speechSynthesis.speak(utterance)
    }
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6">
      {/* Translation Interface */}
      <Card className="p-6 backdrop-blur-xl bg-white/10 dark:bg-black/10 border-white/20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Source */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Select value={fromLang} onValueChange={setFromLang}>
                <SelectTrigger className="w-48 bg-white/10 text-white border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {languages.map(lang => (
                    <SelectItem key={lang.code} value={lang.code}>{lang.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              <Button
                onClick={swapLanguages}
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
              >
                <ArrowLeftRight className="h-4 w-4" />
              </Button>
            </div>
            
            <Textarea
              placeholder="번역할 텍스트를 입력하세요..."
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              className="h-40 bg-white/10 text-white border-white/20 resize-none"
            />
            
            <div className="flex gap-2">
              <Button
                onClick={() => speakText(sourceText, fromLang)}
                variant="outline"
                size="sm"
                className="text-white border-white/20"
                disabled={!sourceText}
              >
                <Volume2 className="h-4 w-4 mr-1" />
                음성
              </Button>
              <Button
                onClick={() => copyToClipboard(sourceText)}
                variant="outline"
                size="sm"
                className="text-white border-white/20"
                disabled={!sourceText}
              >
                <Copy className="h-4 w-4 mr-1" />
                복사
              </Button>
            </div>
          </div>

          {/* Target */}
          <div className="space-y-4">
            <Select value={toLang} onValueChange={setToLang}>
              <SelectTrigger className="w-48 bg-white/10 text-white border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map(lang => (
                  <SelectItem key={lang.code} value={lang.code}>{lang.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Textarea
              placeholder="번역 결과가 여기에 표시됩니다..."
              value={translatedText}
              readOnly
              className="h-40 bg-white/10 text-white border-white/20 resize-none"
            />
            
            <div className="flex gap-2">
              <Button
                onClick={() => speakText(translatedText, toLang)}
                variant="outline"
                size="sm"
                className="text-white border-white/20"
                disabled={!translatedText}
              >
                <Volume2 className="h-4 w-4 mr-1" />
                음성
              </Button>
              <Button
                onClick={() => copyToClipboard(translatedText)}
                variant="outline"
                size="sm"
                className="text-white border-white/20"
                disabled={!translatedText}
              >
                <Copy className="h-4 w-4 mr-1" />
                복사
              </Button>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <Button
            onClick={translateText}
            disabled={!sourceText.trim() || isTranslating}
            className="bg-blue-500/20 hover:bg-blue-500/30 text-white px-8"
          >
            {isTranslating ? "번역 중..." : "번역하기"}
          </Button>
        </div>
      </Card>

      {/* Translation History */}
      {history.length > 0 && (
        <Card className="p-6 backdrop-blur-xl bg-white/10 dark:bg-black/10 border-white/20">
          <div className="flex items-center gap-2 mb-4">
            <History className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">번역 기록</h3>
          </div>
          
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {history.map((translation) => (
              <div key={translation.id} className="bg-white/5 rounded-lg p-3">
                <div className="flex justify-between items-start mb-2">
                  <span className="text-sm text-gray-400">
                    {languages.find(l => l.code === translation.fromLang)?.name} → {languages.find(l => l.code === translation.toLang)?.name}
                  </span>
                  <span className="text-xs text-gray-500">
                    {translation.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-300">{translation.sourceText}</p>
                  <p className="text-sm text-white">{translation.translatedText}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
