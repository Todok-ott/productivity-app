"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Hash, Type, Shuffle, Copy, Zap } from 'lucide-react'

export function QuickTools() {
  const [text, setText] = useState("")
  const [result, setResult] = useState("")
  const [password, setPassword] = useState("")
  const [passwordLength, setPasswordLength] = useState("12")

  const generateHash = (type: string) => {
    if (!text) return
    // Simulate hash generation (in real app, use crypto library)
    const mockHash = `${type.toUpperCase()}: ${btoa(text + type).substring(0, 32)}...`
    setResult(mockHash)
  }

  const transformText = (type: string) => {
    if (!text) return
    
    let transformed = ""
    switch (type) {
      case "uppercase":
        transformed = text.toUpperCase()
        break
      case "lowercase":
        transformed = text.toLowerCase()
        break
      case "title":
        transformed = text.replace(/\w\S*/g, (txt) => 
          txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        )
        break
      case "reverse":
        transformed = text.split("").reverse().join("")
        break
      case "base64":
        transformed = btoa(text)
        break
      case "url":
        transformed = encodeURIComponent(text)
        break
    }
    setResult(transformed)
  }

  const generatePassword = () => {
    const length = parseInt(passwordLength)
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
    let result = ""
    
    for (let i = 0; i < length; i++) {
      result += charset.charAt(Math.floor(Math.random() * charset.length))
    }
    
    setPassword(result)
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <Tabs defaultValue="hash" className="w-full">
      <TabsList className="grid w-full grid-cols-3 bg-white/10 dark:bg-black/10">
        <TabsTrigger value="hash" className="text-white">해시 생성기</TabsTrigger>
        <TabsTrigger value="text" className="text-white">텍스트 도구</TabsTrigger>
        <TabsTrigger value="password" className="text-white">비밀번호 생성</TabsTrigger>
      </TabsList>

      <TabsContent value="hash" className="space-y-4">
        <Card className="p-6 backdrop-blur-xl bg-white/10 dark:bg-black/10 border-white/20">
          <div className="flex items-center gap-2 mb-4">
            <Hash className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">해시 생성기</h3>
          </div>
          
          <div className="space-y-4">
            <Textarea
              placeholder="해시할 텍스트를 입력하세요..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="bg-white/10 text-white border-white/20"
              rows={3}
            />
            
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => generateHash("md5")}
                className="bg-blue-500/20 hover:bg-blue-500/30 text-white"
              >
                MD5
              </Button>
              <Button
                onClick={() => generateHash("sha1")}
                className="bg-green-500/20 hover:bg-green-500/30 text-white"
              >
                SHA1
              </Button>
              <Button
                onClick={() => generateHash("sha256")}
                className="bg-purple-500/20 hover:bg-purple-500/30 text-white"
              >
                SHA256
              </Button>
            </div>
            
            {result && (
              <div className="p-4 bg-black/20 rounded-lg">
                <div className="flex justify-between items-start gap-2">
                  <code className="text-green-300 font-mono text-sm break-all">{result}</code>
                  <Button
                    size="sm"
                    onClick={() => copyToClipboard(result)}
                    className="bg-white/10 hover:bg-white/20 text-white shrink-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="text" className="space-y-4">
        <Card className="p-6 backdrop-blur-xl bg-white/10 dark:bg-black/10 border-white/20">
          <div className="flex items-center gap-2 mb-4">
            <Type className="h-5 w-5 text-green-400" />
            <h3 className="text-lg font-semibold text-white">텍스트 변환기</h3>
          </div>
          
          <div className="space-y-4">
            <Textarea
              placeholder="변환할 텍스트를 입력하세요..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="bg-white/10 text-white border-white/20"
              rows={3}
            />
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              <Button
                onClick={() => transformText("uppercase")}
                className="bg-blue-500/20 hover:bg-blue-500/30 text-white"
              >
                대문자
              </Button>
              <Button
                onClick={() => transformText("lowercase")}
                className="bg-green-500/20 hover:bg-green-500/30 text-white"
              >
                소문자
              </Button>
              <Button
                onClick={() => transformText("title")}
                className="bg-purple-500/20 hover:bg-purple-500/30 text-white"
              >
                제목 형식
              </Button>
              <Button
                onClick={() => transformText("reverse")}
                className="bg-red-500/20 hover:bg-red-500/30 text-white"
              >
                뒤집기
              </Button>
              <Button
                onClick={() => transformText("base64")}
                className="bg-yellow-500/20 hover:bg-yellow-500/30 text-white"
              >
                Base64
              </Button>
              <Button
                onClick={() => transformText("url")}
                className="bg-pink-500/20 hover:bg-pink-500/30 text-white"
              >
                URL 인코딩
              </Button>
            </div>
            
            {result && (
              <div className="p-4 bg-black/20 rounded-lg">
                <div className="flex justify-between items-start gap-2">
                  <p className="text-white break-all">{result}</p>
                  <Button
                    size="sm"
                    onClick={() => copyToClipboard(result)}
                    className="bg-white/10 hover:bg-white/20 text-white shrink-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="password" className="space-y-4">
        <Card className="p-6 backdrop-blur-xl bg-white/10 dark:bg-black/10 border-white/20">
          <div className="flex items-center gap-2 mb-4">
            <Shuffle className="h-5 w-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">비밀번호 생성기</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-white mb-2">비밀번호 길이</label>
              <Input
                type="number"
                min="4"
                max="128"
                value={passwordLength}
                onChange={(e) => setPasswordLength(e.target.value)}
                className="bg-white/10 text-white border-white/20"
              />
            </div>
            
            <Button
              onClick={generatePassword}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
            >
              <Zap className="h-4 w-4 mr-2" />
              비밀번호 생성
            </Button>
            
            {password && (
              <div className="p-4 bg-black/20 rounded-lg">
                <div className="flex justify-between items-center gap-2">
                  <code className="text-green-300 font-mono text-lg break-all">{password}</code>
                  <Button
                    size="sm"
                    onClick={() => copyToClipboard(password)}
                    className="bg-white/10 hover:bg-white/20 text-white shrink-0"
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <div className="mt-2 text-sm text-gray-400">
                  Strength: <span className="text-green-400">강함</span> • Length: {password.length} 문자
                </div>
              </div>
            )}
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
