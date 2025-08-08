"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, Calendar, Timer } from 'lucide-react'
import { koreanTexts } from "@/lib/korean-localization"

export function TimeTools() {
  const [seconds, setSeconds] = useState<string>("")
  const [convertedTime, setConvertedTime] = useState<string>("")
  const [startDate, setStartDate] = useState<string>("")
  const [endDate, setEndDate] = useState<string>("")
  const [dateDiff, setDateDiff] = useState<string>("")
  const [timestamp, setTimestamp] = useState<string>("")
  const [humanTime, setHumanTime] = useState<string>("")

  const convertSeconds = () => {
    const totalSeconds = parseInt(seconds)
    if (isNaN(totalSeconds)) return

    const days = Math.floor(totalSeconds / 86400)
    const hours = Math.floor((totalSeconds % 86400) / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const remainingSeconds = totalSeconds % 60

    let result = ""
    if (days > 0) result += `${days}일 `
    if (hours > 0) result += `${hours}시간 `
    if (minutes > 0) result += `${minutes}분 `
    if (remainingSeconds > 0) result += `${remainingSeconds}초`

    setConvertedTime(result.trim() || "0초")
  }

  const calculateDateDiff = () => {
    if (!startDate || !endDate) return

    const start = new Date(startDate)
    const end = new Date(endDate)
    const diffTime = Math.abs(end.getTime() - start.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
    const diffMinutes = Math.floor(diffTime / (1000 * 60))

    setDateDiff(`${diffDays}일 (${diffHours}시간, ${diffMinutes}분)`)
  }

  const convertTimestamp = () => {
    const ts = parseInt(timestamp)
    if (isNaN(ts)) return

    const date = new Date(ts * 1000)
    setHumanTime(date.toLocaleString('ko-KR'))
  }

  const getCurrentTimestamp = () => {
    const now = Math.floor(Date.now() / 1000)
    setTimestamp(now.toString())
    setHumanTime(new Date().toLocaleString('ko-KR'))
  }

  return (
    <div className="space-y-6">
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Clock className="h-5 w-5" />
            {koreanTexts.timeTools}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="seconds" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-white/10">
              <TabsTrigger value="seconds" className="text-white data-[state=active]:bg-white/20">
                초 변환
              </TabsTrigger>
              <TabsTrigger value="dates" className="text-white data-[state=active]:bg-white/20">
                날짜 계산
              </TabsTrigger>
              <TabsTrigger value="timestamp" className="text-white data-[state=active]:bg-white/20">
                타임스탬프
              </TabsTrigger>
            </TabsList>

            <TabsContent value="seconds" className="space-y-4">
              <div>
                <Label htmlFor="seconds-input" className="text-white">초 입력</Label>
                <Input
                  id="seconds-input"
                  type="number"
                  value={seconds}
                  onChange={(e) => setSeconds(e.target.value)}
                  placeholder="예: 3661"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 mt-2"
                />
              </div>
              <Button onClick={convertSeconds} className="w-full">
                <Timer className="h-4 w-4 mr-2" />
                변환하기
              </Button>
              {convertedTime && (
                <div className="bg-black/30 border border-white/20 rounded-md p-4">
                  <div className="text-white/70 text-sm mb-1">변환 결과:</div>
                  <div className="text-white text-lg font-semibold">{convertedTime}</div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="dates" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="start-date" className="text-white">시작 날짜</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="bg-white/10 border-white/20 text-white mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="end-date" className="text-white">종료 날짜</Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="bg-white/10 border-white/20 text-white mt-2"
                  />
                </div>
              </div>
              <Button onClick={calculateDateDiff} className="w-full">
                <Calendar className="h-4 w-4 mr-2" />
                날짜 차이 계산
              </Button>
              {dateDiff && (
                <div className="bg-black/30 border border-white/20 rounded-md p-4">
                  <div className="text-white/70 text-sm mb-1">날짜 차이:</div>
                  <div className="text-white text-lg font-semibold">{dateDiff}</div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="timestamp" className="space-y-4">
              <div>
                <Label htmlFor="timestamp-input" className="text-white">타임스탬프 (Unix)</Label>
                <Input
                  id="timestamp-input"
                  type="number"
                  value={timestamp}
                  onChange={(e) => setTimestamp(e.target.value)}
                  placeholder="예: 1640995200"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/50 mt-2"
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={convertTimestamp} className="flex-1">
                  변환하기
                </Button>
                <Button onClick={getCurrentTimestamp} variant="outline" className="text-white border-white/20 hover:bg-white/10">
                  현재 시간
                </Button>
              </div>
              {humanTime && (
                <div className="bg-black/30 border border-white/20 rounded-md p-4">
                  <div className="text-white/70 text-sm mb-1">변환 결과:</div>
                  <div className="text-white text-lg font-semibold">{humanTime}</div>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
