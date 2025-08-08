"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Copy, Palette } from 'lucide-react'
import { toast } from "sonner"

export function ColorPicker() {
  const [selectedColor, setSelectedColor] = useState("#3b82f6")
  const [savedColors, setSavedColors] = useState<string[]>([])

  const copyToClipboard = async (color: string) => {
    try {
      await navigator.clipboard.writeText(color)
      toast.success(`Color ${color} copied to clipboard!`)
    } catch (error) {
      toast.error("Failed to copy color")
    }
  }

  const saveColor = () => {
    if (!savedColors.includes(selectedColor)) {
      setSavedColors([...savedColors, selectedColor])
      toast.success("Color saved!")
    } else {
      toast.info("Color already saved")
    }
  }

  const removeColor = (color: string) => {
    setSavedColors(savedColors.filter(c => c !== color))
    toast.success("Color removed!")
  }

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  const hexToHsl = (hex: string) => {
    const rgb = hexToRgb(hex)
    if (!rgb) return null
    
    const r = rgb.r / 255
    const g = rgb.g / 255
    const b = rgb.b / 255
    
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h = 0
    let s = 0
    const l = (max + min) / 2
    
    if (max !== min) {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }
      h /= 6
    }
    
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100)
    }
  }

  const rgbValues = hexToRgb(selectedColor)
  const hslValues = hexToHsl(selectedColor)

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Palette className="h-5 w-5" />
            Color Picker
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Color Preview */}
          <div className="text-center space-y-4">
            <div 
              className="w-32 h-32 mx-auto rounded-lg border-2 border-white/20"
              style={{ backgroundColor: selectedColor }}
            />
            
            {/* Color Input */}
            <div className="flex gap-2 justify-center">
              <input
                type="color"
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-16 h-10 rounded border-2 border-white/20 bg-transparent cursor-pointer"
              />
              <Input
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="bg-white/10 border-white/20 text-white w-32"
                placeholder="#000000"
              />
            </div>
          </div>

          {/* Color Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-black/30 border-white/10">
              <CardContent className="p-4 text-center">
                <div className="text-white/70 text-sm mb-1">HEX</div>
                <div className="text-white font-mono">{selectedColor}</div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(selectedColor)}
                  className="mt-2 text-white/70 hover:text-white"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-black/30 border-white/10">
              <CardContent className="p-4 text-center">
                <div className="text-white/70 text-sm mb-1">RGB</div>
                <div className="text-white font-mono text-sm">
                  {rgbValues ? `${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b}` : 'Invalid'}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => rgbValues && copyToClipboard(`rgb(${rgbValues.r}, ${rgbValues.g}, ${rgbValues.b})`)}
                  className="mt-2 text-white/70 hover:text-white"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-black/30 border-white/10">
              <CardContent className="p-4 text-center">
                <div className="text-white/70 text-sm mb-1">HSL</div>
                <div className="text-white font-mono text-sm">
                  {hslValues ? `${hslValues.h}°, ${hslValues.s}%, ${hslValues.l}%` : 'Invalid'}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => hslValues && copyToClipboard(`hsl(${hslValues.h}, ${hslValues.s}%, ${hslValues.l}%)`)}
                  className="mt-2 text-white/70 hover:text-white"
                >
                  <Copy className="h-3 w-3" />
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Save Color */}
          <div className="text-center">
            <Button onClick={saveColor} className="w-full">
              Save Color
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Saved Colors */}
      {savedColors.length > 0 && (
        <Card className="bg-black/40 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Saved Colors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-6 md:grid-cols-8 gap-3">
              {savedColors.map((color, index) => (
                <div key={index} className="group relative">
                  <div
                    className="w-12 h-12 rounded-lg border-2 border-white/20 cursor-pointer hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeColor(color)}
                    className="absolute -top-2 -right-2 w-6 h-6 p-0 bg-red-600 hover:bg-red-700 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
