"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, ExternalLink, Trash2, Edit, Folder } from 'lucide-react'

interface Bookmark {
  id: string
  title: string
  url: string
  category: string
  description?: string
  createdAt: Date
}

const categories = ["업무", "개인", "학습", "엔터테인먼트", "도구", "뉴스"]

export function BookmarkManager() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    const savedBookmarks = localStorage.getItem("bookmarks")
    if (savedBookmarks) {
      setBookmarks(JSON.parse(savedBookmarks))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks))
  }, [bookmarks])

  const addBookmark = () => {
    if (!title.trim() || !url.trim() || !category) return

    const bookmark: Bookmark = {
      id: editingId || Date.now().toString(),
      title: title.trim(),
      url: url.trim(),
      category,
      description: description.trim(),
      createdAt: new Date()
    }

    if (editingId) {
      setBookmarks(bookmarks.map(b => b.id === editingId ? bookmark : b))
      setEditingId(null)
    } else {
      setBookmarks([bookmark, ...bookmarks])
    }

    resetForm()
  }

  const resetForm = () => {
    setTitle("")
    setUrl("")
    setCategory("")
    setDescription("")
    setEditingId(null)
  }

  const editBookmark = (bookmark: Bookmark) => {
    setTitle(bookmark.title)
    setUrl(bookmark.url)
    setCategory(bookmark.category)
    setDescription(bookmark.description || "")
    setEditingId(bookmark.id)
  }

  const deleteBookmark = (id: string) => {
    setBookmarks(bookmarks.filter(b => b.id !== id))
  }

  const filteredBookmarks = selectedCategory === "All" 
    ? bookmarks 
    : bookmarks.filter(b => b.category === selectedCategory)

  const bookmarksByCategory = categories.reduce((acc, cat) => {
    acc[cat] = bookmarks.filter(b => b.category === cat).length
    return acc
  }, {} as Record<string, number>)

  return (
    <div className="space-y-6">
      {/* Add/Edit Form */}
      <Card className="p-4 backdrop-blur-xl bg-white/10 dark:bg-black/10 border-white/20">
        <h3 className="text-lg font-semibold text-white mb-4">
          {editingId ? "북마크 수정" : "새 북마크 추가"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="북마크 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-white/10 text-white border-white/20"
          />
          <Input
            placeholder="URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="bg-white/10 text-white border-white/20"
          />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="bg-white/10 text-white border-white/20">
              <SelectValue placeholder="카테고리 선택" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="설명 (선택사항)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="bg-white/10 text-white border-white/20"
          />
        </div>
        <div className="flex gap-2 mt-4">
          <Button onClick={addBookmark} className="bg-blue-500/20 hover:bg-blue-500/30 text-white">
            <Plus className="h-4 w-4 mr-2" />
            {editingId ? "수정" : "추가"} 북마크
          </Button>
          {editingId && (
            <Button onClick={resetForm} variant="outline" className="text-white border-white/20">
              취소
            </Button>
          )}
        </div>
      </Card>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === "All" ? "default" : "outline"}
          onClick={() => setSelectedCategory("All")}
          className="text-white"
        >
          모든 항목 ({bookmarks.length})
        </Button>
        {categories.map(cat => (
          <Button
            key={cat}
            variant={selectedCategory === cat ? "default" : "outline"}
            onClick={() => setSelectedCategory(cat)}
            className="text-white"
          >
            <Folder className="h-4 w-4 mr-1" />
            {cat} ({bookmarksByCategory[cat] || 0})
          </Button>
        ))}
      </div>

      {/* Bookmarks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredBookmarks.map((bookmark) => (
          <Card key={bookmark.id} className="p-4 backdrop-blur-xl bg-white/10 dark:bg-black/10 border-white/20 hover:bg-white/15 transition-all">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-semibold text-white truncate flex-1">{bookmark.title}</h4>
              <div className="flex gap-1 ml-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => editBookmark(bookmark)}
                  className="h-8 w-8 p-0 text-blue-400 hover:bg-blue-500/20"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => deleteBookmark(bookmark.id)}
                  className="h-8 w-8 p-0 text-red-400 hover:bg-red-500/20"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <p className="text-sm text-gray-300 truncate mb-2">{bookmark.url}</p>
            
            {bookmark.description && (
              <p className="text-sm text-gray-400 mb-3">{bookmark.description}</p>
            )}
            
            <div className="flex justify-between items-center">
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                {bookmark.category}
              </Badge>
              <Button
                size="sm"
                onClick={() => window.open(bookmark.url, "_blank")}
                className="bg-green-500/20 hover:bg-green-500/30 text-white"
              >
                <ExternalLink className="h-4 w-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
