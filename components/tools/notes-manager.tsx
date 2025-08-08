"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Edit, Save, X, Plus } from 'lucide-react'
import { toast } from "sonner"

interface Note {
  id: string
  title: string
  content: string
  createdAt: string
  updatedAt: string
}

export function NotesManager() {
  const [notes, setNotes] = useState<Note[]>([])
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editTitle, setEditTitle] = useState("")
  const [editContent, setEditContent] = useState("")

  useEffect(() => {
    const saved = localStorage.getItem('notes')
    if (saved) {
      setNotes(JSON.parse(saved))
    }
  }, [])

  const saveNotes = (newNotes: Note[]) => {
    setNotes(newNotes)
    localStorage.setItem('notes', JSON.stringify(newNotes))
  }

  const addNote = () => {
    if (!title.trim() || !content.trim()) {
      toast.error("Please fill in both title and content")
      return
    }

    const newNote: Note = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    saveNotes([newNote, ...notes])
    setTitle("")
    setContent("")
    toast.success("Note added successfully!")
  }

  const deleteNote = (id: string) => {
    saveNotes(notes.filter(n => n.id !== id))
    toast.success("Note deleted")
  }

  const startEdit = (note: Note) => {
    setEditingId(note.id)
    setEditTitle(note.title)
    setEditContent(note.content)
  }

  const saveEdit = () => {
    if (!editTitle.trim() || !editContent.trim()) {
      toast.error("Please fill in both title and content")
      return
    }

    const updatedNotes = notes.map(note =>
      note.id === editingId
        ? {
            ...note,
            title: editTitle.trim(),
            content: editContent.trim(),
            updatedAt: new Date().toISOString()
          }
        : note
    )

    saveNotes(updatedNotes)
    setEditingId(null)
    setEditTitle("")
    setEditContent("")
    toast.success("Note updated successfully!")
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditTitle("")
    setEditContent("")
  }

  return (
    <div className="space-y-6">
      {/* Add Note Form */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Note
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="note-title" className="text-white">Title</Label>
            <Input
              id="note-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter note title"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
            />
          </div>
          <div>
            <Label htmlFor="note-content" className="text-white">Content</Label>
            <Textarea
              id="note-content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note here..."
              className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[120px]"
            />
          </div>
          <Button onClick={addNote} className="w-full">
            Add Note
          </Button>
        </CardContent>
      </Card>

      {/* Notes List */}
      <div className="space-y-4">
        <h3 className="text-white text-lg font-semibold">
          Your Notes ({notes.length})
        </h3>
        
        {notes.length === 0 ? (
          <Card className="bg-black/40 border-white/10">
            <CardContent className="py-8 text-center">
              <p className="text-white/70">No notes yet. Add your first note above!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {notes.map((note) => (
              <Card key={note.id} className="bg-black/40 border-white/10">
                <CardContent className="p-4">
                  {editingId === note.id ? (
                    <div className="space-y-4">
                      <Input
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="bg-white/10 border-white/20 text-white"
                      />
                      <Textarea
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        className="bg-white/10 border-white/20 text-white min-h-[120px]"
                      />
                      <div className="flex gap-2">
                        <Button onClick={saveEdit} size="sm">
                          <Save className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                        <Button onClick={cancelEdit} variant="outline" size="sm">
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-start justify-between gap-3 mb-3">
                        <h4 className="text-white font-semibold text-lg">
                          {note.title}
                        </h4>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => startEdit(note)}
                            className="text-white/70 hover:text-white p-2"
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteNote(note.id)}
                            className="text-red-400 hover:text-red-300 p-2"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-white/90 whitespace-pre-wrap mb-3">
                        {note.content}
                      </div>
                      <div className="text-white/50 text-xs">
                        Created: {new Date(note.createdAt).toLocaleString()}
                        {note.updatedAt !== note.createdAt && (
                          <span className="ml-4">
                            Updated: {new Date(note.updatedAt).toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
