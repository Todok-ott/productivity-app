"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Copy, Search, Gamepad2, Trash2, Edit } from 'lucide-react'

interface CheatCode {
  id: string
  game: string
  platform: string
  code: string
  description: string
  category: string
  createdAt: Date
}

const platforms = ["PC", "플레이스테이션", "엑스박스", "닌텐도", "모바일", "레트로"]
const categories = ["무기", "돈", "체력", "차량", "캐릭터", "레벨", "기타"]

export function CheatCodeManager() {
  const [cheatCodes, setCheatCodes] = useState<CheatCode[]>([])
  const [game, setGame] = useState("")
  const [platform, setPlatform] = useState("")
  const [code, setCode] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPlatform, setSelectedPlatform] = useState("All")
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    const savedCodes = localStorage.getItem("cheatCodes")
    if (savedCodes) {
      setCheatCodes(JSON.parse(savedCodes))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("cheatCodes", JSON.stringify(cheatCodes))
  }, [cheatCodes])

  const addCheatCode = () => {
    if (!game.trim() || !code.trim() || !platform || !category) return

    const cheatCode: CheatCode = {
      id: editingId || Date.now().toString(),
      game: game.trim(),
      platform,
      code: code.trim(),
      description: description.trim(),
      category,
      createdAt: new Date()
    }

    if (editingId) {
      setCheatCodes(cheatCodes.map(c => c.id === editingId ? cheatCode : c))
      setEditingId(null)
    } else {
      setCheatCodes([cheatCode, ...cheatCodes])
    }

    resetForm()
  }

  const resetForm = () => {
    setGame("")
    setPlatform("")
    setCode("")
    setDescription("")
    setCategory("")
    setEditingId(null)
  }

  const editCheatCode = (cheatCode: CheatCode) => {
    setGame(cheatCode.game)
    setPlatform(cheatCode.platform)
    setCode(cheatCode.code)
    setDescription(cheatCode.description)
    setCategory(cheatCode.category)
    setEditingId(cheatCode.id)
  }

  const deleteCheatCode = (id: string) => {
    setCheatCodes(cheatCodes.filter(c => c.id !== id))
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const filteredCodes = cheatCodes.filter(cheat => {
    const matchesSearch = cheat.game.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cheat.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         cheat.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPlatform = selectedPlatform === "All" || cheat.platform === selectedPlatform
    return matchesSearch && matchesPlatform
  })

  return (
    <div className="space-y-6">
      {/* Add/Edit Form */}
      <Card className="p-4 backdrop-blur-xl bg-white/10 dark:bg-black/10 border-white/20">
        <h3 className="text-lg font-semibold text-white mb-4">
          {editingId ? "치트코드 수정" : "새 치트코드 추가"}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            placeholder="게임 이름"
            value={game}
            onChange={(e) => setGame(e.target.value)}
            className="bg-white/10 text-white border-white/20"
          />
          <Select value={platform} onValueChange={setPlatform}>
            <SelectTrigger className="bg-white/10 text-white border-white/20">
              <SelectValue placeholder="플랫폼 선택" />
            </SelectTrigger>
            <SelectContent>
              {platforms.map(p => (
                <SelectItem key={p} value={p}>{p}</SelectItem>
              ))}
            </SelectContent>
          </Select>
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
            placeholder="치트코드"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="bg-white/10 text-white border-white/20"
          />
        </div>
        <Textarea
          placeholder="설명 (이 치트코드가 하는 일은?)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-4 bg-white/10 text-white border-white/20"
          rows={2}
        />
        <div className="flex gap-2 mt-4">
          <Button onClick={addCheatCode} className="bg-blue-500/20 hover:bg-blue-500/30 text-white">
            <Plus className="h-4 w-4 mr-2" />
            {editingId ? "Update" : "Add"} Cheat Code
          </Button>
          {editingId && (
            <Button onClick={resetForm} variant="outline" className="text-white border-white/20">
              Cancel
            </Button>
          )}
        </div>
      </Card>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            placeholder="치트코드 검색..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-white/10 text-white border-white/20"
          />
        </div>
        <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
          <SelectTrigger className="w-full sm:w-48 bg-white/10 text-white border-white/20">
            <SelectValue>모든 플랫폼</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Platforms</SelectItem>
            {platforms.map(p => (
              <SelectItem key={p} value={p}>{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Cheat Codes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredCodes.map((cheat) => (
          <Card key={cheat.id} className="p-4 backdrop-blur-xl bg-white/10 dark:bg-black/10 border-white/20 hover:bg-white/15 transition-all">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center gap-2">
                <Gamepad2 className="h-5 w-5 text-blue-400" />
                <h4 className="font-semibold text-white">{cheat.game}</h4>
              </div>
              <div className="flex gap-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => editCheatCode(cheat)}
                  className="h-8 w-8 p-0 text-blue-400 hover:bg-blue-500/20"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => deleteCheatCode(cheat.id)}
                  className="h-8 w-8 p-0 text-red-400 hover:bg-red-500/20"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex gap-2 mb-3">
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
                {cheat.platform}
              </Badge>
              <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                {cheat.category}
              </Badge>
            </div>
            
            <div className="bg-black/20 p-3 rounded-lg mb-3">
              <div className="flex justify-between items-center">
                <code className="text-yellow-300 font-mono text-sm">{cheat.code}</code>
                <Button
                  size="sm"
                  onClick={() => copyToClipboard(cheat.code)}
                  className="bg-blue-500/20 hover:bg-blue-500/30 text-white"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {cheat.description && (
              <p className="text-sm text-gray-300">{cheat.description}</p>
            )}
          </Card>
        ))}
      </div>
    </div>
  )
}
