"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Save, Plus, Search, Tag } from 'lucide-react'

interface Memo {
  id: string
  title: string
  content: string
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

export function MemoEditor() {
  const [memos, setMemos] = useState<Memo[]>([])
  const [currentMemo, setCurrentMemo] = useState<Memo | null>(null)
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    const savedMemos = localStorage.getItem("memos")
    if (savedMemos) {
      setMemos(JSON.parse(savedMemos))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("memos", JSON.stringify(memos))
  }, [memos])

  const saveMemo = () => {
    if (!title.trim() || !content.trim()) return

    const memo: Memo = {
      id: currentMemo?.id || Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      tags: tags.split(",").map(tag => tag.trim()).filter(Boolean),
      createdAt: currentMemo?.createdAt || new Date(),
      updatedAt: new Date()
    }

    if (currentMemo) {
      setMemos(memos.map(m => m.id === memo.id ? memo : m))
    } else {
      setMemos([memo, ...memos])
    }

    setCurrentMemo(null)
    setTitle("")
    setContent("")
    setTags("")
  }

  const loadMemo = (memo: Memo) => {
    setCurrentMemo(memo)
    setTitle(memo.title)
    setContent(memo.content)
    setTags(memo.tags.join(", "))
  }

  const newMemo = () => {
    setCurrentMemo(null)
    setTitle("")
    setContent("")
    setTags("")
  }

  const filteredMemos = memos.filter(memo =>
    memo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    memo.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    memo.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
      {/* Memo List */}
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder="메모 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-white/10 text-white border-white/20"
            />
          </div>
          <Button onClick={newMemo} className="bg-blue-500/20 hover:bg-blue-500/30 text-white">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="space-y-2 max-h-[500px] overflow-y-auto">
          {filteredMemos.map((memo) => (
            <Card
              key={memo.id}
              className={`p-3 cursor-pointer backdrop-blur-xl bg-white/10 dark:bg-black/10 border-white/20 hover:bg-white/15 transition-all ${
                currentMemo?.id === memo.id ? "ring-2 ring-blue-400" : ""
              }`}
              onClick={() => loadMemo(memo)}
            >
              <h3 className="font-semibold text-white truncate">{memo.title}</h3>
              <p className="text-sm text-gray-300 truncate mt-1">{memo.content}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {memo.tags.slice(0, 3).map((tag) => (
                  <Badge key={tag} variant="secondary" className="text-xs bg-blue-500/20 text-blue-300">
                    {tag}
                  </Badge>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">
                {memo.updatedAt.toLocaleDateString()}
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Editor */}
      <div className="lg:col-span-2 space-y-4">
        <div className="flex gap-2">
          <Input
            placeholder="메모 제목..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="flex-1 bg-white/10 text-white border-white/20"
          />
          <Button onClick={saveMemo} className="bg-green-500/20 hover:bg-green-500/30 text-white">
            <Save className="h-4 w-4 mr-2" />
            저장
          </Button>
        </div>
        
        <div className="relative">
          <Tag className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="태그 (쉼표로 구분)..."
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="pl-10 bg-white/10 text-white border-white/20"
          />
        </div>
        
        <Textarea
          placeholder="메모를 작성하세요..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="h-[400px] bg-white/10 text-white border-white/20 resize-none"
        />
      </div>
    </div>
  )
}
