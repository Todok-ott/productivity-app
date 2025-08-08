"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileType, Upload, Download } from 'lucide-react'
import { koreanTexts } from "@/lib/korean-localization"
import { toast } from "sonner"

const fileTypes = [
  { value: 'txt', label: 'TXT (텍스트)' },
  { value: 'json', label: 'JSON' },
  { value: 'csv', label: 'CSV' },
  { value: 'xml', label: 'XML' },
  { value: 'md', label: 'Markdown' },
  { value: 'html', label: 'HTML' }
]

export function FileConverter() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [fileContent, setFileContent] = useState<string>("")
  const [sourceFormat, setSourceFormat] = useState<string>("")
  const [targetFormat, setTargetFormat] = useState<string>("txt")
  const [isConverting, setIsConverting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      const extension = file.name.split('.').pop()?.toLowerCase() || ''
      setSourceFormat(extension)
      
      const reader = new FileReader()
      reader.onload = (e) => {
        const content = e.target?.result as string
        setFileContent(content)
      }
      reader.readAsText(file)
    }
  }

  const convertFile = async () => {
    if (!selectedFile || !fileContent) {
      toast.error("변환할 파일을 선택해주세요")
      return
    }

    setIsConverting(true)
    
    try {
      let convertedContent = fileContent
      let fileName = selectedFile.name.replace(/\.[^/.]+$/, "")
      
      // Simple conversion logic (in real app, you'd use proper parsers/converters)
      switch (targetFormat) {
        case 'json':
          if (sourceFormat === 'csv') {
            // Simple CSV to JSON conversion
            const lines = fileContent.split('\n')
            const headers = lines[0].split(',')
            const jsonData = lines.slice(1).map(line => {
              const values = line.split(',')
              const obj: any = {}
              headers.forEach((header, index) => {
                obj[header.trim()] = values[index]?.trim() || ''
              })
              return obj
            })
            convertedContent = JSON.stringify(jsonData, null, 2)
          } else {
            convertedContent = JSON.stringify({ content: fileContent }, null, 2)
          }
          break
        case 'csv':
          if (sourceFormat === 'json') {
            try {
              const jsonData = JSON.parse(fileContent)
              if (Array.isArray(jsonData) && jsonData.length > 0) {
                const headers = Object.keys(jsonData[0])
                const csvLines = [headers.join(',')]
                jsonData.forEach(item => {
                  csvLines.push(headers.map(header => item[header] || '').join(','))
                })
                convertedContent = csvLines.join('\n')
              }
            } catch {
              convertedContent = `content\n"${fileContent.replace(/"/g, '""')}"`
            }
          }
          break
        case 'md':
          convertedContent = `# ${fileName}\n\n${fileContent}`
          break
        case 'html':
          convertedContent = `<!DOCTYPE html>
<html>
<head>
    <title>${fileName}</title>
    <meta charset="UTF-8">
</head>
<body>
    <pre>${fileContent}</pre>
</body>
</html>`
          break
        case 'xml':
          convertedContent = `<?xml version="1.0" encoding="UTF-8"?>
<document>
    <content><![CDATA[${fileContent}]]></content>
</document>`
          break
        default:
          convertedContent = fileContent
      }

      // Download converted file
      const blob = new Blob([convertedContent], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${fileName}.${targetFormat}`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      
      toast.success("파일 변환이 완료되었습니다!")
    } catch (error) {
      toast.error("파일 변환 중 오류가 발생했습니다")
    } finally {
      setIsConverting(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <FileType className="h-5 w-5" />
            {koreanTexts.fileConverter}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* File Upload */}
          <div className="text-center">
            <div 
              className="border-2 border-dashed border-white/20 rounded-lg p-8 cursor-pointer hover:border-white/40 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-12 w-12 text-white/50 mx-auto mb-4" />
              <p className="text-white/70">{koreanTexts.dragDrop}</p>
              {selectedFile && (
                <p className="text-white text-sm mt-2">선택된 파일: {selectedFile.name}</p>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              className="hidden"
            />
          </div>

          {selectedFile && (
            <>
              {/* Format Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-white text-sm block mb-2">원본 형식</label>
                  <div className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-white">
                    {sourceFormat.toUpperCase()}
                  </div>
                </div>
                <div>
                  <label className="text-white text-sm block mb-2">변환할 형식</label>
                  <Select value={targetFormat} onValueChange={setTargetFormat}>
                    <SelectTrigger className="bg-white/10 border-white/20 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-white/20">
                      {fileTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value} className="text-white">
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* File Preview */}
              <div>
                <label className="text-white text-sm block mb-2">파일 내용 미리보기</label>
                <div className="bg-black/30 border border-white/20 rounded-md p-3 max-h-40 overflow-y-auto">
                  <pre className="text-white/80 text-xs whitespace-pre-wrap">
                    {fileContent.slice(0, 500)}{fileContent.length > 500 ? '...' : ''}
                  </pre>
                </div>
              </div>

              {/* Convert Button */}
              <Button 
                onClick={convertFile} 
                disabled={isConverting}
                className="w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                {isConverting ? koreanTexts.processing : koreanTexts.convert}
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
