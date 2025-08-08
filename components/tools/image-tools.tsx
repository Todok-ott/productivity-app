"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Image, Upload, Download, FileArchiveIcon as Compress } from 'lucide-react'
import { koreanTexts } from "@/lib/korean-localization"
import { toast } from "sonner"

export function ImageTools() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string>("")
  const [quality, setQuality] = useState([80])
  const [width, setWidth] = useState<string>("")
  const [height, setHeight] = useState<string>("")
  const [processing, setProcessing] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setImagePreview(result)
        
        // Get original dimensions
        const img = new Image()
        img.onload = () => {
          setWidth(img.width.toString())
          setHeight(img.height.toString())
        }
        img.src = result
      }
      reader.readAsDataURL(file)
    } else {
      toast.error("올바른 이미지 파일을 선택해주세요")
    }
  }

  const processImage = async (type: 'compress' | 'resize') => {
    if (!selectedImage || !canvasRef.current) return

    setProcessing(true)
    
    try {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      const img = new Image()
      img.onload = () => {
        const targetWidth = parseInt(width) || img.width
        const targetHeight = parseInt(height) || img.height
        
        canvas.width = targetWidth
        canvas.height = targetHeight
        
        ctx.drawImage(img, 0, 0, targetWidth, targetHeight)
        
        const qualityValue = type === 'compress' ? quality[0] / 100 : 0.9
        canvas.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = `processed-${selectedImage.name}`
            document.body.appendChild(a)
            a.click()
            document.body.removeChild(a)
            URL.revokeObjectURL(url)
            
            toast.success(`이미지 ${type === 'compress' ? '압축' : '리사이즈'}가 완료되었습니다!`)
          }
          setProcessing(false)
        }, selectedImage.type, qualityValue)
      }
      img.src = imagePreview
    } catch (error) {
      toast.error("이미지 처리 중 오류가 발생했습니다")
      setProcessing(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Image className="h-5 w-5" />
            {koreanTexts.imageTools}
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
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageSelect}
              className="hidden"
            />
          </div>

          {imagePreview && (
            <>
              {/* Image Preview */}
              <div className="text-center">
                <img 
                  src={imagePreview || "/placeholder.svg"} 
                  alt="Preview" 
                  className="max-w-full max-h-64 mx-auto rounded-lg border border-white/20"
                />
              </div>

              {/* Controls */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-white">너비 (px)</Label>
                  <Input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="bg-white/10 border-white/20 text-white mt-2"
                  />
                </div>
                <div>
                  <Label className="text-white">높이 (px)</Label>
                  <Input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="bg-white/10 border-white/20 text-white mt-2"
                  />
                </div>
              </div>

              <div>
                <Label className="text-white">압축 품질: {quality[0]}%</Label>
                <Slider
                  value={quality}
                  onValueChange={setQuality}
                  max={100}
                  min={10}
                  step={5}
                  className="mt-2"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button 
                  onClick={() => processImage('compress')} 
                  disabled={processing}
                  className="flex-1"
                >
                  <Compress className="h-4 w-4 mr-2" />
                  {processing ? koreanTexts.processing : koreanTexts.compress}
                </Button>
                <Button 
                  onClick={() => processImage('resize')} 
                  disabled={processing}
                  variant="outline"
                  className="flex-1 text-white border-white/20 hover:bg-white/10"
                >
                  <Download className="h-4 w-4 mr-2" />
                  {koreanTexts.resize}
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {/* Hidden canvas for processing */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
