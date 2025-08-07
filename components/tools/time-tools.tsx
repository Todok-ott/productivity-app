"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Clock, Timer, Calendar, Globe } from 'lucide-react'

const timezones = [
  { value: "UTC", label: "UTC" },
  { value: "America/New_York", label: "New York" },
  { value: "America/Los_Angeles", label: "Los Angeles" },
  { value: "Europe/London", label: "London" },
  { value: "Europe/Paris", label: "Paris" },
  { value: "Asia/Tokyo", label: "Tokyo" },
  { value: "Asia/Seoul", label: "Seoul" },
  { value: "Asia/Shanghai", label: "Shanghai" },
  { value: "Australia/Sydney", label: "Sydney" }
]

export function TimeTools() {
  const [seconds, setSeconds] = useState("")
  const [convertedTime, setConvertedTime] = useState("")
  const [countdownTime, setCountdownTime] = useState("")
  const [timeLeft, setTimeLeft] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [selectedTimezone, setSelectedTimezone] = useState("UTC")
  const [timezoneTime, setTimezoneTime] = useState("")

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1)
      }, 1000)
    } else if (timeLeft === 0) {
      setIsRunning(false)
    }
    return () => clearInterval(interval)
  }, [isRunning, timeLeft])

  useEffect(() => {
    const updateTimezoneTime = () => {
      const now = new Date()
      const timeInZone = new Intl.DateTimeFormat('en-US', {
        timeZone: selectedTimezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }).format(now)
      setTimezoneTime(timeInZone)
    }

    updateTimezoneTime()
    const interval = setInterval(updateTimezoneTime, 1000)
    return () => clearInterval(interval)
  }, [selectedTimezone])

  const convertSeconds = () => {
    const sec = parseInt(seconds)
    if (isNaN(sec)) return

    const hours = Math.floor(sec / 3600)
    const minutes = Math.floor((sec % 3600) / 60)
    const remainingSeconds = sec % 60

    setConvertedTime(`${hours}h ${minutes}m ${remainingSeconds}s`)
  }

  const startCountdown = () => {
    const time = parseInt(countdownTime)
    if (isNaN(time) || time <= 0) return

    setTimeLeft(time)
    setIsRunning(true)
  }

  const stopCountdown = () => {
    setIsRunning(false)
  }

  const resetCountdown = () => {
    setIsRunning(false)
    setTimeLeft(0)
  }

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <Tabs defaultValue="converter" className="w-full">
      <TabsList className="grid w-full grid-cols-4 bg-white/10 dark:bg-black/10">
        <TabsTrigger value="converter" className="text-white">변환기</TabsTrigger>
        <TabsTrigger value="countdown" className="text-white">카운트다운</TabsTrigger>
        <TabsTrigger value="timezone" className="text-white">시간대</TabsTrigger>
        <TabsTrigger value="calculator" className="text-white">계산기</TabsTrigger>
      </TabsList>

      <TabsContent value="converter" className="space-y-4">
        <Card className="p-6 backdrop-blur-xl bg-white/10 dark:bg-black/10 border-white/20">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-white">초를 시간으로 변환</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label className="text-white">초</Label>
              <Input
                type="number"
                placeholder="초를 입력하세요"
                value={seconds}
                onChange={(e) => setSeconds(e.target.value)}
                className="bg-white/10 text-white border-white/20"
              />
            </div>
            
            <Button onClick={convertSeconds} className="bg-blue-500/20 hover:bg-blue-500/30 text-white">
              변환
            </Button>
            
            {convertedTime && (
              <div className="p-4 bg-white/5 rounded-lg">
                <p className="text-white font-mono text-lg">{convertedTime}</p>
              </div>
            )}
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="countdown" className="space-y-4">
        <Card className="p-6 backdrop-blur-xl bg-white/10 dark:bg-black/10 border-white/20">
          <div className="flex items-center gap-2 mb-4">
            <Timer className="h-5 w-5 text-green-400" />
            <h3 className="text-lg font-semibold text-white">카운트다운 타이머</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label className="text-white">카운트다운 시간 (초)</Label>
              <Input
                type="number"
                placeholder="초를 입력하세요"
                value={countdownTime}
                onChange={(e) => setCountdownTime(e.target.value)}
                className="bg-white/10 text-white border-white/20"
                disabled={isRunning}
              />
            </div>
            
            <div className="flex gap-2">
              <Button
                onClick={startCountdown}
                disabled={isRunning}
                className="bg-green-500/20 hover:bg-green-500/30 text-white"
              >
                시작
              </Button>
              <Button
                onClick={stopCountdown}
                disabled={!isRunning}
                className="bg-red-500/20 hover:bg-red-500/30 text-white"
              >
                중지
              </Button>
              <Button
                onClick={resetCountdown}
                className="bg-gray-500/20 hover:bg-gray-500/30 text-white"
              >
                리셋
              </Button>
            </div>
            
            {timeLeft > 0 && (
              <div className="text-center">
                <div className="text-4xl font-mono text-white mb-2">
                  {formatTime(timeLeft)}
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-1000"
                    style={{
                      width: `${((parseInt(countdownTime) - timeLeft) / parseInt(countdownTime)) * 100}%`
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="timezone" className="space-y-4">
        <Card className="p-6 backdrop-blur-xl bg-white/10 dark:bg-black/10 border-white/20">
          <div className="flex items-center gap-2 mb-4">
            <Globe className="h-5 w-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">세계 시계</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label className="text-white">시간대 선택</Label>
              <Select value={selectedTimezone} onValueChange={setSelectedTimezone}>
                <SelectTrigger className="bg-white/10 text-white border-white/20">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timezones.map(tz => (
                    <SelectItem key={tz.value} value={tz.value}>{tz.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="p-4 bg-white/5 rounded-lg text-center">
              <p className="text-sm text-gray-400 mb-1">{selectedTimezone}</p>
              <p className="text-2xl font-mono text-white">{timezoneTime}</p>
            </div>
          </div>
        </Card>
      </TabsContent>

      <TabsContent value="calculator" className="space-y-4">
        <Card className="p-6 backdrop-blur-xl bg-white/10 dark:bg-black/10 border-white/20">
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">날짜 계산기</h3>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label className="text-white">시작 날짜</Label>
                <Input
                  type="date"
                  className="bg-white/10 text-white border-white/20"
                />
              </div>
              <div>
                <Label className="text-white">종료 날짜</Label>
                <Input
                  type="date"
                  className="bg-white/10 text-white border-white/20"
                />
              </div>
            </div>
            
            <Button className="bg-yellow-500/20 hover:bg-yellow-500/30 text-white">
              차이 계산
            </Button>
            
            <div className="p-4 bg-white/5 rounded-lg">
              <p className="text-white">날짜 계산 결과가 여기에 표시됩니다</p>
            </div>
          </div>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
