"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, ExternalLink, Plus } from 'lucide-react'
import { toast } from "sonner"

interface Bookmark {
  id: string
  title: string
  url: string
  createdAt: string
}

export function BookmarkManager() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [title, setTitle] = useState("")
  const [url, setUrl] = useState("")

  useEffect(() => {
    const saved = localStorage.getItem('bookmarks')
    if (saved) {
      setBookmarks(JSON.parse(saved))
    }
  }, [])

  const saveBookmarks = (newBookmarks: Bookmark[]) => {
    setBookmarks(newBookmarks)
    localStorage.setItem('bookmarks', JSON.stringify(newBookmarks))
  }

  const addBookmark = () => {
    if (!title.trim() || !url.trim()) {
      toast.error("Please fill in both title and URL")
      return
    }

    const newBookmark: Bookmark = {
      id: Date.now().toString(),
      title: title.trim(),
      url: url.trim(),
      createdAt: new Date().toISOString()
    }

    saveBookmarks([...bookmarks, newBookmark])
    setTitle("")
    setUrl("")
    toast.success("Bookmark added successfully!")
  }

  const deleteBookmark = (id: string) => {
    saveBookmarks(bookmarks.filter(b => b.id !== id))
    toast.success("Bookmark deleted")
  }

  const openBookmark = (url: string) => {
    const fullUrl = url.startsWith('http') ? url : `https://${url}`
    window.open(fullUrl, '_blank')
  }

  return (
    <div className="space-y-6">
      {/* Add Bookmark Form */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Bookmark
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="title" className="text-white">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter bookmark title"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
            <div>
              <Label htmlFor="url" className="text-white">URL</Label>
              <Input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter URL"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
              />
            </div>
          </div>
          <Button onClick={addBookmark} className="w-full">
            Add Bookmark
          </Button>
        </CardContent>
      </Card>

      {/* Bookmarks List */}
      <div className="space-y-4">
        <h3 className="text-white text-lg font-semibold">
          Your Bookmarks ({bookmarks.length})
        </h3>
        
        {bookmarks.length === 0 ? (
          <Card className="bg-black/40 border-white/10">
            <CardContent className="py-8 text-center">
              <p className="text-white/70">No bookmarks yet. Add your first bookmark above!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {bookmarks.map((bookmark) => (
              <Card key={bookmark.id} className="bg-black/40 border-white/10 hover:bg-black/50 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-medium truncate mb-1">
                        {bookmark.title}
                      </h4>
                      <p className="text-white/70 text-sm truncate mb-2">
                        {bookmark.url}
                      </p>
                      <p className="text-white/50 text-xs">
                        Added {new Date(bookmark.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openBookmark(bookmark.url)}
                        className="text-white/70 hover:text-white p-2"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteBookmark(bookmark.id)}
                        className="text-red-400 hover:text-red-300 p-2"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
