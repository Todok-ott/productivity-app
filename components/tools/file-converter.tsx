"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Download, FileImage, Trash2 } from 'lucide-react'

interface ConvertedFile {
  id: string
  name: string
  originalFormat: string
  targetFormat: string
  size: number
  url: string
}

const imageFormats = ["jpeg", "png", "webp", "gif", "bmp"]
const documentFormats = ["pdf", "docx", "txt", "rtf"]

export function FileConverter() {
  const [files, setFiles] = useState<ConvertedFile[]>([])
  const [targetFormat, setTargetFormat] = useState("png")
  const [conversionType, setConversionType] = useState("image")

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = event.target.files
    if (!uploadedFiles) return

    Array.from(uploadedFiles).forEach((file) => {
      // Simulate file conversion
      const convertedFile: ConvertedFile = {
        id: Date.now().toString() + Math.random(),
        name: file.name,
        originalFormat: file.name.split('.').pop() || '',
        targetFormat,
        size: file.size,
        url: URL.createObjectURL(file)
      }
      
      setFiles(prev => [...prev, convertedFile])
    })
  }

  const downloadFile = (file: ConvertedFile) => {
    const link = document.createElement('a')
    link.href = file.url
    link.download = `${file.name.split('.')[0]}.${file.targetFormat}`
    link.click()
  }

  const removeFile = (id: string) => {
    setFiles(files.filter(f => f.id !== id))
  }

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-6">
      {/* Conversion Settings */}
      <Card className="p-6 backdrop-blur-xl bg-white/10 dark:bg-black/10 border-white/20">
        <h3 className="text-lg font-semibold text-white mb-4">파일 변환 설정</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-white mb-2">변환 유형</label>
            <Select value={conversionType} onValueChange={setConversionType}>
              <SelectTrigger className="bg-white/10 text-white border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="image">이미지 변환</SelectItem>
                <SelectItem value="document">문서 변환</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-white mb-2">대상 형식</label>
            <Select value={targetFormat} onValueChange={setTargetFormat}>
              <SelectTrigger className="bg-white/10 text-white border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(conversionType === "image" ? imageFormats : documentFormats).map(format => (
                  <SelectItem key={format} value={format}>{format.toUpperCase()}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
          <input
            type="file"
            multiple
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
            accept={conversionType === "image" ? "image/*" : ".pdf,.doc,.docx,.txt"}
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-white mb-2">파일을 업로드하려면 클릭하거나 드래그 앤 드롭하세요</p>
            <p className="text-sm text-gray-400">
              {conversionType === "image" ? "이미지 파일을 지원합니다" : "문서 파일을 지원합니다"}
            </p>
          </label>
        </div>
      </Card>

      {/* Converted Files */}
      {files.length > 0 && (
        <Card className="p-6 backdrop-blur-xl bg-white/10 dark:bg-black/10 border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4">변환된 파일</h3>
          
          <div className="space-y-3">
            {files.map((file) => (
              <div key={file.id} className="flex items-center justify-between p-4 bg-white/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <FileImage className="h-8 w-8 text-blue-400" />
                  <div>
                    <p className="text-white font-medium">{file.name}</p>
                    <p className="text-sm text-gray-400">
                      {file.originalFormat.toUpperCase()} → {file.targetFormat.toUpperCase()} • {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => downloadFile(file)}
                    className="bg-green-500/20 hover:bg-green-500/30 text-white"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    다운로드
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeFile(file.id)}
                    className="text-red-400 border-red-400/20 hover:bg-red-500/20"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  )
}
