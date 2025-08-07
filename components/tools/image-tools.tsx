"use client"

import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Download, ImageIcon, Trash2 } from 'lucide-react'

interface ProcessedImage {
  id: string
  name: string
  originalSize: number
  compressedSize: number
  url: string
  format: string
}

export function ImageTools() {
  const [images, setImages] = useState<ProcessedImage[]>([])
  const [quality, setQuality] = useState([80])
  const [format, setFormat] = useState("jpeg")
  const [width, setWidth] = useState("")
  const [height, setHeight] = useState("")

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()
        reader.onload = (e) => {
          const img = new Image()
          img.onload = () => {
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')
            
            // Set canvas dimensions
            const targetWidth = width ? parseInt(width) : img.width
            const targetHeight = height ? parseInt(height) : img.height
            
            canvas.width = targetWidth
            canvas.height = targetHeight
            
            // Draw and compress
            ctx?.drawImage(img, 0, 0, targetWidth, targetHeight)
            
            canvas.toBlob((blob) => {
              if (blob) {
                const url = URL.createObjectURL(blob)
                const processedImage: ProcessedImage = {
                  id: Date.now().toString(),
                  name: file.name,
                  originalSize: file.size,
                  compressedSize: blob.size,
                  url,
                  format
                }
                setImages(prev => [...prev, processedImage])
              }
            }, `image/${format}`, quality[0] / 100)
          }
          img.src = e.target?.result as string
        }
        reader.readAsDataURL(file)
      }
    })
  }, [quality, format, width, height])

  const downloadImage = (image: ProcessedImage) => {
    const link = document.createElement('a')
    link.href = image.url
    link.download = `compressed_${image.name}`
    link.click()
  }

  const removeImage = (id: string) => {
    setImages(images.filter(img => img.id !== id))
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
      {/* Upload and Settings */}
      <Card className="p-6 backdrop-blur-xl bg-white/10 dark:bg-black/10 border-white/20">
        <h3 className="text-lg font-semibold text-white mb-4">이미지 압축 설정</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div>
            <Label className="text-white">품질 (%)</Label>
            <div className="mt-2">
              <Slider
                value={quality}
                onValueChange={setQuality}
                max={100}
                min={10}
                step={5}
                className="w-full"
              />
              <p className="text-sm text-gray-300 mt-1">{quality[0]}%</p>
            </div>
          </div>
          
          <div>
            <Label className="text-white">출력 형식</Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger className="mt-2 bg-white/10 text-white border-white/20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="jpeg">JPEG</SelectItem>
                <SelectItem value="png">PNG</SelectItem>
                <SelectItem value="webp">WebP</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="text-white">너비 (px)</Label>
            <input
              type="number"
              placeholder="자동"
              value={width}
              onChange={(e) => setWidth(e.target.value)}
              className="mt-2 w-full px-3 py-2 bg-white/10 text-white border border-white/20 rounded-md"
            />
          </div>
          
          <div>
            <Label className="text-white">높이 (px)</Label>
            <input
              type="number"
              placeholder="자동"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              className="mt-2 w-full px-3 py-2 bg-white/10 text-white border border-white/20 rounded-md"
            />
          </div>
        </div>

        <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-white mb-2">이미지를 업로드하려면 클릭하거나 드래그 앤 드롭하세요</p>
            <p className="text-sm text-gray-400">JPG, PNG, WebP 형식을 지원합니다</p>
          </label>
        </div>
      </Card>

      {/* Processed Images */}
      {images.length > 0 && (
        <Card className="p-6 backdrop-blur-xl bg-white/10 dark:bg-black/10 border-white/20">
          <h3 className="text-lg font-semibold text-white mb-4">처리된 이미지</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image) => (
              <div key={image.id} className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-3">
                  <ImageIcon className="h-5 w-5 text-blue-400" />
                  <span className="text-white font-medium truncate">{image.name}</span>
                </div>
                
                <img
                  src={image.url || "/placeholder.svg"}
                  alt={image.name}
                  className="w-full h-32 object-cover rounded-lg mb-3"
                />
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between text-gray-300">
                    <span>원본:</span>
                    <span>{formatFileSize(image.originalSize)}</span>
                  </div>
                  <div className="flex justify-between text-gray-300">
                    <span>압축됨:</span>
                    <span>{formatFileSize(image.compressedSize)}</span>
                  </div>
                  <div className="flex justify-between text-green-400">
                    <span>절약됨:</span>
                    <span>
                      {Math.round((1 - image.compressedSize / image.originalSize) * 100)}%
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-4">
                  <Button
                    size="sm"
                    onClick={() => downloadImage(image)}
                    className="flex-1 bg-green-500/20 hover:bg-green-500/30 text-white"
                  >
                    <Download className="h-4 w-4 mr-1" />
                    다운로드
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => removeImage(image.id)}
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
