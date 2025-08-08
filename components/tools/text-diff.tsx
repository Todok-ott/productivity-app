"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, ArrowLeftRight } from 'lucide-react'
import { koreanTexts } from "@/lib/korean-localization"

export function TextDiff() {
  const [leftText, setLeftText] = useState("")
  const [rightText, setRightText] = useState("")
  const [showDiff, setShowDiff] = useState(false)

  const getDifferences = () => {
    const leftLines = leftText.split('\n')
    const rightLines = rightText.split('\n')
    const maxLines = Math.max(leftLines.length, rightLines.length)
    
    const differences = []
    for (let i = 0; i < maxLines; i++) {
      const leftLine = leftLines[i] || ''
      const rightLine = rightLines[i] || ''
      
      if (leftLine !== rightLine) {
        differences.push({
          lineNumber: i + 1,
          left: leftLine,
          right: rightLine,
          type: leftLine === '' ? 'added' : rightLine === '' ? 'removed' : 'modified'
        })
      }
    }
    return differences
  }

  const differences = getDifferences()

  const compareTexts = () => {
    setShowDiff(true)
  }

  const clearTexts = () => {
    setLeftText("")
    setRightText("")
    setShowDiff(false)
  }

  return (
    <div className="space-y-6">
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <FileText className="h-5 w-5" />
            {koreanTexts.textDiff}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="left-text" className="text-white">{koreanTexts.leftText}</Label>
              <Textarea
                id="left-text"
                value={leftText}
                onChange={(e) => setLeftText(e.target.value)}
                placeholder="첫 번째 텍스트를 입력하세요..."
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[200px] mt-2"
              />
            </div>
            <div>
              <Label htmlFor="right-text" className="text-white">{koreanTexts.rightText}</Label>
              <Textarea
                id="right-text"
                value={rightText}
                onChange={(e) => setRightText(e.target.value)}
                placeholder="두 번째 텍스트를 입력하세요..."
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[200px] mt-2"
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button onClick={compareTexts} className="flex-1">
              <ArrowLeftRight className="h-4 w-4 mr-2" />
              {koreanTexts.compare}
            </Button>
            <Button onClick={clearTexts} variant="outline" className="text-white border-white/20 hover:bg-white/10">
              지우기
            </Button>
          </div>
        </CardContent>
      </Card>

      {showDiff && (
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">{koreanTexts.differences} ({differences.length}개)</CardTitle>
          </CardHeader>
          <CardContent>
            {differences.length === 0 ? (
              <p className="text-white/70 text-center py-8">텍스트가 동일합니다!</p>
            ) : (
              <div className="space-y-4">
                {differences.map((diff, index) => (
                  <div key={index} className="border border-white/10 rounded-lg p-4">
                    <div className="text-white/70 text-sm mb-2">라인 {diff.lineNumber}</div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className={`p-3 rounded ${diff.type === 'removed' ? 'bg-red-900/30' : diff.type === 'added' ? 'bg-gray-800/30' : 'bg-yellow-900/30'}`}>
                        <div className="text-xs text-white/50 mb-1">이전</div>
                        <div className="text-white font-mono text-sm">{diff.left || '(빈 줄)'}</div>
                      </div>
                      <div className={`p-3 rounded ${diff.type === 'added' ? 'bg-green-900/30' : diff.type === 'removed' ? 'bg-gray-800/30' : 'bg-yellow-900/30'}`}>
                        <div className="text-xs text-white/50 mb-1">이후</div>
                        <div className="text-white font-mono text-sm">{diff.right || '(빈 줄)'}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
