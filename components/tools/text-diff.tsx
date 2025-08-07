"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { GitCompare, Copy, RotateCcw } from 'lucide-react'

export function TextDiff() {
  const [leftText, setLeftText] = useState("")
  const [rightText, setRightText] = useState("")
  const [showDiff, setShowDiff] = useState(false)

  const generateDiff = () => {
    setShowDiff(true)
  }

  const clearAll = () => {
    setLeftText("")
    setRightText("")
    setShowDiff(false)
  }

  const copyText = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  // Simple diff algorithm for demonstration
  const getDiffLines = () => {
    const leftLines = leftText.split('\n')
    const rightLines = rightText.split('\n')
    const maxLines = Math.max(leftLines.length, rightLines.length)
    
    const diffResult = []
    for (let i = 0; i < maxLines; i++) {
      const leftLine = leftLines[i] || ''
      const rightLine = rightLines[i] || ''
      
      let status = 'unchanged'
      if (leftLine !== rightLine) {
        if (!leftLine) status = 'added'
        else if (!rightLine) status = 'removed'
        else status = 'modified'
      }
      
      diffResult.push({
        lineNumber: i + 1,
        leftLine,
        rightLine,
        status
      })
    }
    
    return diffResult
  }

  const diffLines = showDiff ? getDiffLines() : []

  return (
    <div className="space-y-6">
      {/* Input Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-4 backdrop-blur-xl bg-white/10 dark:bg-black/10 border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">원본 텍스트</h3>
            <Button
              size="sm"
              variant="outline"
              onClick={() => copyText(leftText)}
              className="text-white border-white/20"
              disabled={!leftText}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <Textarea
            placeholder="원본 텍스트를 여기에 붙여넣으세요..."
            value={leftText}
            onChange={(e) => setLeftText(e.target.value)}
            className="h-64 bg-white/10 text-white border-white/20 resize-none font-mono text-sm"
          />
        </Card>

        <Card className="p-4 backdrop-blur-xl bg-white/10 dark:bg-black/10 border-white/20">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">수정된 텍스트</h3>
            <Button
              size="sm"
              variant="outline"
              onClick={() => copyText(rightText)}
              className="text-white border-white/20"
              disabled={!rightText}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
          <Textarea
            placeholder="수정된 텍스트를 여기에 붙여넣으세요..."
            value={rightText}
            onChange={(e) => setRightText(e.target.value)}
            className="h-64 bg-white/10 text-white border-white/20 resize-none font-mono text-sm"
          />
        </Card>
      </div>

      {/* Controls */}
      <div className="flex justify-center gap-4">
        <Button
          onClick={generateDiff}
          disabled={!leftText || !rightText}
          className="bg-blue-500/20 hover:bg-blue-500/30 text-white"
        >
          <GitCompare className="h-4 w-4 mr-2" />
          텍스트 비교
        </Button>
        <Button
          onClick={clearAll}
          variant="outline"
          className="text-white border-white/20"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          모두 지우기
        </Button>
      </div>

      {/* Diff Results */}
      {showDiff && (
        <Card className="p-6 backdrop-blur-xl bg-white/10 dark:bg-black/10 border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4">비교 결과</h3>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">원본</h4>
              <div className="bg-black/20 rounded-lg p-4 max-h-96 overflow-y-auto">
                {diffLines.map((line) => (
                  <div
                    key={`left-${line.lineNumber}`}
                    className={`flex font-mono text-sm py-1 ${
                      line.status === 'removed' ? 'bg-red-500/20 text-red-300' :
                      line.status === 'modified' ? 'bg-yellow-500/20 text-yellow-300' :
                      'text-gray-300'
                    }`}
                  >
                    <span className="w-8 text-gray-500 text-right mr-4 select-none">
                      {line.leftLine ? line.lineNumber : ''}
                    </span>
                    <span className="flex-1">{line.leftLine || ' '}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-300 mb-2">수정됨</h4>
              <div className="bg-black/20 rounded-lg p-4 max-h-96 overflow-y-auto">
                {diffLines.map((line) => (
                  <div
                    key={`right-${line.lineNumber}`}
                    className={`flex font-mono text-sm py-1 ${
                      line.status === 'added' ? 'bg-green-500/20 text-green-300' :
                      line.status === 'modified' ? 'bg-yellow-500/20 text-yellow-300' :
                      'text-gray-300'
                    }`}
                  >
                    <span className="w-8 text-gray-500 text-right mr-4 select-none">
                      {line.rightLine ? line.lineNumber : ''}
                    </span>
                    <span className="flex-1">{line.rightLine || ' '}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500/20 rounded"></div>
              <span className="text-green-300">추가됨</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-red-500/20 rounded"></div>
              <span className="text-red-300">삭제됨</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-yellow-500/20 rounded"></div>
              <span className="text-yellow-300">수정됨</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-500/20 rounded"></div>
              <span className="text-gray-300">변경 없음</span>
            </div>
          </div>
        </Card>
      )}
    </div>
  )
}
