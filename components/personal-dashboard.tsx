"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Cloud, Sun, CloudRain, Star, Calendar, Clock } from 'lucide-react'

export function PersonalDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [weather] = useState({
    location: "서울, KR",
    temperature: "18°C",
    condition: "구름조금",
    icon: Cloud
  })
  
  const [fortune] = useState({
    zodiac: "돼지띠 (1983년)",
    message: "오늘은 창의적 표현의 기회가 찾아옵니다. 금전적인 문제에서는 직감을 믿으세요.",
    lucky: "파란색, 7, 23"
  })
  
  const [news] = useState([
    { title: "2024 기술 혁신 서밋 발표", time: "2시간 전" },
    { title: "새로운 생산성 도구 트렌드", time: "4시간 전" },
    { title: "원격 근무 통계 발표", time: "6시간 전" }
  ])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Weather Widget */}
      <Card className="p-6 backdrop-blur-xl bg-white/10 dark:bg-black/10 border-white/20 dark:border-white/10 hover:bg-white/15 dark:hover:bg-black/15 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">날씨</h3>
          <weather.icon className="h-6 w-6 text-blue-400" />
        </div>
        <div className="space-y-2">
          <p className="text-2xl font-bold text-white">{weather.temperature}</p>
          <p className="text-gray-300">{weather.condition}</p>
          <p className="text-sm text-gray-400">{weather.location}</p>
        </div>
      </Card>

      {/* Fortune Widget */}
      <Card className="p-6 backdrop-blur-xl bg-white/10 dark:bg-black/10 border-white/20 dark:border-white/10 hover:bg-white/15 dark:hover:bg-black/15 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">운세</h3>
          <Star className="h-6 w-6 text-yellow-400" />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-purple-300">{fortune.zodiac}</p>
          <p className="text-sm text-gray-300 leading-relaxed">{fortune.message}</p>
          <p className="text-xs text-gray-400">행운: {fortune.lucky}</p>
        </div>
      </Card>

      {/* News & Time Widget */}
      <Card className="p-6 backdrop-blur-xl bg-white/10 dark:bg-black/10 border-white/20 dark:border-white/10 hover:bg-white/15 dark:hover:bg-black/15 transition-all duration-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">오늘</h3>
          <Clock className="h-6 w-6 text-green-400" />
        </div>
        <div className="space-y-3">
          <div className="text-center">
            <p className="text-xl font-bold text-white">
              {currentTime.toLocaleTimeString()}
            </p>
            <p className="text-sm text-gray-300">
              {currentTime.toLocaleDateString()}
            </p>
          </div>
          <div className="space-y-2">
            {news.slice(0, 2).map((item, index) => (
              <div key={index} className="text-xs">
                <p className="text-gray-300 truncate">{item.title}</p>
                <p className="text-gray-500">{item.time}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
