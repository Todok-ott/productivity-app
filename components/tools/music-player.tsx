"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, SkipBack, SkipForward, Volume2, Music } from 'lucide-react'

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState([50])
  const [currentTrack, setCurrentTrack] = useState(0)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Sample tracks (in a real app, these would be actual audio files)
  const tracks = [
    { title: "Focus Music 1", artist: "Ambient Sounds", duration: 180 },
    { title: "Nature Sounds", artist: "Relaxation", duration: 240 },
    { title: "White Noise", artist: "Concentration", duration: 300 },
    { title: "Rain Sounds", artist: "Nature", duration: 200 }
  ]

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
    }
  }, [])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play()
    }
    setIsPlaying(!isPlaying)
  }

  const nextTrack = () => {
    setCurrentTrack((prev) => (prev + 1) % tracks.length)
    setCurrentTime(0)
  }

  const prevTrack = () => {
    setCurrentTrack((prev) => (prev - 1 + tracks.length) % tracks.length)
    setCurrentTime(0)
  }

  const handleSeek = (value: number[]) => {
    const audio = audioRef.current
    if (!audio) return
    
    audio.currentTime = value[0]
    setCurrentTime(value[0])
  }

  const handleVolumeChange = (value: number[]) => {
    const audio = audioRef.current
    if (!audio) return
    
    setVolume(value)
    audio.volume = value[0] / 100
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="max-w-md mx-auto">
      <Card className="bg-black/40 border-white/10">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Music className="h-5 w-5" />
            Music Player
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Track Info */}
          <div className="text-center space-y-2">
            <h3 className="text-white text-lg font-semibold">
              {tracks[currentTrack].title}
            </h3>
            <p className="text-white/70">
              {tracks[currentTrack].artist}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Slider
              value={[currentTime]}
              max={duration || 100}
              step={1}
              onValueChange={handleSeek}
              className="w-full"
            />
            <div className="flex justify-between text-white/70 text-sm">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration || tracks[currentTrack].duration)}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevTrack}
              className="text-white/70 hover:text-white"
            >
              <SkipBack className="h-5 w-5" />
            </Button>
            
            <Button
              onClick={togglePlay}
              className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white"
            >
              {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={nextTrack}
              className="text-white/70 hover:text-white"
            >
              <SkipForward className="h-5 w-5" />
            </Button>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3">
            <Volume2 className="h-4 w-4 text-white/70" />
            <Slider
              value={volume}
              max={100}
              step={1}
              onValueChange={handleVolumeChange}
              className="flex-1"
            />
            <span className="text-white/70 text-sm w-8">
              {volume[0]}
            </span>
          </div>

          {/* Track List */}
          <div className="space-y-2">
            <h4 className="text-white font-medium">Playlist</h4>
            {tracks.map((track, index) => (
              <div
                key={index}
                className={`p-2 rounded cursor-pointer transition-colors ${
                  index === currentTrack
                    ? 'bg-white/20 text-white'
                    : 'bg-white/5 text-white/70 hover:bg-white/10'
                }`}
                onClick={() => setCurrentTrack(index)}
              >
                <div className="flex justify-between">
                  <span className="text-sm">{track.title}</span>
                  <span className="text-xs">{formatTime(track.duration)}</span>
                </div>
                <div className="text-xs opacity-70">{track.artist}</div>
              </div>
            ))}
          </div>

          {/* Hidden audio element for demo */}
          <audio ref={audioRef} />
        </CardContent>
      </Card>
    </div>
  )
}
