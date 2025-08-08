"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Trash2, Copy, Plus, Check } from 'lucide-react'
import { toast } from "sonner"

interface CheatCode {
  id: string
  code: string
  createdAt: string
}

export function CheatCodeManager() {
  const [cheatCodes, setCheatCodes] = useState<CheatCode[]>([])
  const [newCode, setNewCode] = useState("")
  const [copiedId, setCopiedId] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('cheatCodes')
    if (saved) {
      setCheatCodes(JSON.parse(saved))
    }
  }, [])

  const saveCheatCodes = (codes: CheatCode[]) => {
    setCheatCodes(codes)
    localStorage.setItem('cheatCodes', JSON.stringify(codes))
  }

  const addCheatCode = () => {
    if (!newCode.trim()) {
      toast.error("Please enter a cheat code")
      return
    }

    const cheatCode: CheatCode = {
      id: Date.now().toString(),
      code: newCode.trim(),
      createdAt: new Date().toISOString()
    }

    saveCheatCodes([...cheatCodes, cheatCode])
    setNewCode("")
    toast.success("Cheat code added successfully!")
  }

  const deleteCheatCode = (id: string) => {
    saveCheatCodes(cheatCodes.filter(c => c.id !== id))
    toast.success("Cheat code deleted")
  }

  const copyToClipboard = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code)
      setCopiedId(id)
      toast.success("Cheat code copied to clipboard!")
      setTimeout(() => setCopiedId(null), 2000)
    } catch (error) {
      toast.error("Failed to copy to clipboard")
    }
  }

  return (
    <div className="space-y-6">
      {/* Add Cheat Code Form */}
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Cheat Code
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Textarea
            value={newCode}
            onChange={(e) => setNewCode(e.target.value)}
            placeholder="Enter your cheat code here..."
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 min-h-[100px]"
          />
          <Button onClick={addCheatCode} className="w-full">
            Add Cheat Code
          </Button>
        </CardContent>
      </Card>

      {/* Cheat Codes List */}
      <div className="space-y-4">
        <h3 className="text-white text-lg font-semibold">
          Your Cheat Codes ({cheatCodes.length})
        </h3>
        
        {cheatCodes.length === 0 ? (
          <Card className="bg-black/40 border-white/10">
            <CardContent className="py-8 text-center">
              <p className="text-white/70">No cheat codes yet. Add your first cheat code above!</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {cheatCodes.map((cheatCode) => (
              <Card key={cheatCode.id} className="bg-black/40 border-white/10">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="bg-black/30 p-3 rounded-lg mb-3 font-mono text-sm">
                        <pre className="text-white whitespace-pre-wrap break-words">
                          {cheatCode.code}
                        </pre>
                      </div>
                      <p className="text-white/50 text-xs">
                        Added {new Date(cheatCode.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyToClipboard(cheatCode.code, cheatCode.id)}
                        className="text-white/70 hover:text-white p-2"
                      >
                        {copiedId === cheatCode.id ? (
                          <Check className="h-4 w-4 text-green-400" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteCheatCode(cheatCode.id)}
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
