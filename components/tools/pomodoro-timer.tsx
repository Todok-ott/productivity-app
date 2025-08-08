"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Play, Pause, RotateCcw, Coffee } from 'lucide-react'
import { toast } from "sonner"

export function PomodoroTimer() {
  const [minutes, setMinutes] = useState(25)
  const [seconds, setSeconds] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [isBreak, setIsBreak] = useState(false)
  const [sessions, setSessions] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1)
        } else if (minutes > 0) {
          setMinutes(minutes - 1)
          setSeconds(59)
        } else {
          // Timer finished
          setIsActive(false)
          if (isBreak) {
            // Break finished, start work session
            setIsBreak(false)
            setMinutes(25)
            setSeconds(0)
            toast.success("Break finished! Time to work!")
          } else {
            // Work session finished
            setSessions(sessions + 1)
            setIsBreak(true)
            setMinutes(5)
            setSeconds(0)
            toast.success("Work session completed! Take a break!")
          }
        }
      }, 1000)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isActive, minutes, seconds, isBreak, sessions])

  const toggleTimer = () => {
    setIsActive(!isActive)
  }

  const resetTimer = () => {
    setIsActive(false)
    if (isBreak) {
      setMinutes(5)
    } else {
      setMinutes(25)
    }
    setSeconds(0)
  }

  const startBreak = () => {
    setIsActive(false)
    setIsBreak(true)
    setMinutes(5)
    setSeconds(0)
  }

  const formatTime = (mins: number, secs: number) => {
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progress = isBreak 
    ? ((5 * 60 - (minutes * 60 + seconds)) / (5 * 60)) * 100
    : ((25 * 60 - (minutes * 60 + seconds)) / (25 * 60)) * 100

  return (
    <div className="max-w-md mx-auto space-y-6">
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white text-center">
            {isBreak ? "Break Time" : "Focus Time"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Timer Display */}
          <div className="text-center">
            <div className="text-6xl font-mono font-bold text-white mb-4">
              {formatTime(minutes, seconds)}
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-white/20 rounded-full h-2 mb-4">
              <div 
                className={`h-2 rounded-full transition-all duration-1000 ${
                  isBreak ? 'bg-green-500' : 'bg-blue-500'
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Controls */}
          <div className="flex justify-center gap-4">
            <Button
              onClick={toggleTimer}
              className={`${
                isActive 
                  ? 'bg-red-600 hover:bg-red-700' 
                  : 'bg-green-600 hover:bg-green-700'
              } text-white`}
            >
              {isActive ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
              {isActive ? 'Pause' : 'Start'}
            </Button>
            
            <Button
              onClick={resetTimer}
              variant="outline"
              className="text-white border-white/20 hover:bg-white/10"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            
            {!isBreak && (
              <Button
                onClick={startBreak}
                variant="outline"
                className="text-white border-white/20 hover:bg-white/10"
              >
                <Coffee className="h-4 w-4 mr-2" />
                Break
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Session Counter */}
      <Card className="bg-black/40 border-white/10">
        <CardContent className="p-4 text-center">
          <div className="text-white">
            <span className="text-2xl font-bold">{sessions}</span>
            <span className="text-white/70 ml-2">sessions completed</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
