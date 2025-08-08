"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar, Star, Sparkles, ExternalLink, RefreshCw, Cloud, Droplets, Wind } from 'lucide-react'
import { fetchWeatherData } from "@/lib/weather-service"
import { fetchKoreanNews } from "@/lib/korean-news-service"
import { fetchKoreanFortune } from "@/lib/korean-fortune-service"
import { koreanTexts } from "@/lib/korean-localization"
import { toast } from "sonner"

interface NewsItem {
  id: string
  title: string
  summary: string
  content: string
  source: string
  publishedAt: string
  category: 'breaking' | 'trending' | 'major'
  importance: number
}

interface WeatherData {
  location: string
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  icon: string
  lastUpdated: string
}

interface KoreanFortune {
  message: string
  luckyNumbers: number[]
  luckyColors: string[]
  luckyDirection: string
  zodiacName: string
}

interface PersonalDashboardProps {
  birthYear: number
  onFortuneUpdate?: () => void
}

export function PersonalDashboard({ birthYear, onFortuneUpdate }: PersonalDashboardProps) {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)
  const [news, setNews] = useState<NewsItem[]>([])
  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [fortune, setFortune] = useState<KoreanFortune | null>(null)
  const [newsLoading, setNewsLoading] = useState(true)
  const [weatherLoading, setWeatherLoading] = useState(true)
  const [fortuneLoading, setFortuneLoading] = useState(true)

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    loadInitialData()
    
    const refreshInterval = setInterval(() => {
      refreshData()
    }, 5 * 60 * 1000)
    
    return () => clearInterval(refreshInterval)
  }, [])

  useEffect(() => {
    // Update fortune when birth year changes
    loadFortuneData()
  }, [birthYear])

  const loadInitialData = async () => {
    await Promise.all([loadWeatherData(), loadNewsData(), loadFortuneData()])
  }

  const loadWeatherData = async () => {
    setWeatherLoading(true)
    try {
      const weatherData = await fetchWeatherData()
      // Translate weather condition to Korean
      const translatedWeather = {
        ...weatherData,
        condition: translateWeatherCondition(weatherData.condition),
        location: koreanTexts.location
      }
      setWeather(translatedWeather)
    } catch (error) {
      toast.error("날씨 정보를 불러오는데 실패했습니다")
    } finally {
      setWeatherLoading(false)
    }
  }

  const loadNewsData = async () => {
    setNewsLoading(true)
    try {
      const newsData = await fetchKoreanNews()
      setNews(newsData)
    } catch (error) {
      toast.error("뉴스를 불러오는데 실패했습니다")
    } finally {
      setNewsLoading(false)
    }
  }

  const loadFortuneData = async () => {
    setFortuneLoading(true)
    try {
      const fortuneData = await fetchKoreanFortune(birthYear)
      setFortune(fortuneData)
    } catch (error) {
      toast.error("운세 정보를 불러오는데 실패했습니다")
    } finally {
      setFortuneLoading(false)
    }
  }

  const translateWeatherCondition = (condition: string) => {
    const translations: { [key: string]: string } = {
      'Sunny': koreanTexts.sunny,
      'Cloudy': koreanTexts.cloudy,
      'Partly Cloudy': koreanTexts.partlyCloudy,
      'Rainy': koreanTexts.rainy,
      'Stormy': koreanTexts.stormy
    }
    return translations[condition] || condition
  }

  const refreshData = async () => {
    toast.info("데이터를 새로고침하는 중...")
    await Promise.all([loadWeatherData(), loadNewsData(), loadFortuneData()])
    toast.success("데이터가 새로고침되었습니다!")
  }

  const refreshWeather = async () => {
    toast.info("날씨 정보를 새로고침하는 중...")
    await loadWeatherData()
    toast.success("날씨 정보가 업데이트되었습니다!")
  }

  const refreshNews = async () => {
    toast.info("뉴스를 새로고침하는 중...")
    await loadNewsData()
    toast.success("뉴스가 업데이트되었습니다!")
  }

  const getTimeAgo = (dateString: string) => {
    const now = new Date()
    const publishedDate = new Date(dateString)
    const diffInMinutes = Math.floor((now.getTime() - publishedDate.getTime()) / (1000 * 60))
    
    if (diffInMinutes < 60) {
      return `${diffInMinutes}${koreanTexts.minutesAgo}`
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)}${koreanTexts.hoursAgo}`
    } else {
      return `${Math.floor(diffInMinutes / 1440)}${koreanTexts.daysAgo}`
    }
  }

  const getCategoryBadge = (category: string) => {
    switch (category) {
      case 'breaking':
        return <Badge className="bg-red-600 text-white text-xs">{koreanTexts.breaking}</Badge>
      case 'trending':
        return <Badge className="bg-orange-600 text-white text-xs">{koreanTexts.trending}</Badge>
      case 'major':
        return <Badge className="bg-blue-600 text-white text-xs">{koreanTexts.major}</Badge>
      default:
        return null
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Time & Date */}
      <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            {koreanTexts.today}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-white mb-2">
            {currentTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="text-white/70">
            {currentTime.toLocaleDateString('ko-KR', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Weather */}
      <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cloud className="h-5 w-5" />
              {koreanTexts.weather}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={refreshWeather}
              disabled={weatherLoading}
              className="text-white/70 hover:text-white p-1"
            >
              <RefreshCw className={`h-4 w-4 ${weatherLoading ? 'animate-spin' : ''}`} />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {weatherLoading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="h-6 w-6 animate-spin text-white/50" />
            </div>
          ) : weather ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-3xl font-bold text-white flex items-center gap-2">
                    <span className="text-2xl">{weather.icon}</span>
                    {weather.temperature}°C
                  </div>
                  <div className="text-white/70 text-sm">{weather.condition}</div>
                  <div className="text-white/50 text-xs">{weather.location}</div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-blue-400" />
                  <span className="text-white/70 text-sm">{weather.humidity}%</span>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4 text-gray-400" />
                  <span className="text-white/70 text-sm">{weather.windSpeed} km/h</span>
                </div>
              </div>
              
              <div className="text-white/40 text-xs">
                {getTimeAgo(weather.lastUpdated)} {koreanTexts.updatedAgo}
              </div>
            </div>
          ) : (
            <div className="text-white/70 text-center py-4">
              {koreanTexts.error}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Korean Fortune */}
      <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            {koreanTexts.fortuneTitle} ({fortune?.zodiacName})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {fortuneLoading ? (
            <div className="flex items-center justify-center py-8">
              <RefreshCw className="h-6 w-6 animate-spin text-white/50" />
            </div>
          ) : fortune ? (
            <>
              <p className="text-white/90 text-sm leading-relaxed">
                {fortune.message}
              </p>
              
              <div className="space-y-2">
                <div>
                  <span className="text-white/70 text-xs font-medium">{koreanTexts.luckyNumbers}:</span>
                  <div className="flex gap-1 mt-1">
                    {fortune.luckyNumbers.map((num) => (
                      <Badge key={num} variant="secondary" className="bg-purple-600/30 text-white text-xs">
                        {num}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <span className="text-white/70 text-xs font-medium">{koreanTexts.luckyColors}:</span>
                  <div className="flex gap-1 mt-1">
                    {fortune.luckyColors.map((color) => (
                      <Badge key={color} variant="secondary" className="bg-blue-600/30 text-white text-xs">
                        {color}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div>
                  <span className="text-white/70 text-xs font-medium">{koreanTexts.luckyDirection}:</span>
                  <Badge variant="secondary" className="bg-green-600/30 text-white text-xs ml-2">
                    {fortune.luckyDirection}
                  </Badge>
                </div>
              </div>
            </>
          ) : (
            <div className="text-white/70 text-center py-4">
              {koreanTexts.error}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Korean News Section */}
      <Card className="bg-black/40 border-white/10 backdrop-blur-sm lg:col-span-3">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              {koreanTexts.breakingNews}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={refreshNews}
              disabled={newsLoading}
              className="text-white/70 hover:text-white p-1"
            >
              <RefreshCw className={`h-4 w-4 ${newsLoading ? 'animate-spin' : ''}`} />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {newsLoading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="h-8 w-8 animate-spin text-white/50" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {news.map((item) => (
                <div 
                  key={item.id}
                  className="p-6 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-all duration-200 hover:scale-[1.02]"
                  onClick={() => setSelectedNews(item)}
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    {getCategoryBadge(item.category)}
                    <span className="text-white/50 text-xs">
                      {getTimeAgo(item.publishedAt)}
                    </span>
                  </div>
                  
                  <h3 className="text-white font-bold text-lg mb-3 leading-tight line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-white/80 text-sm mb-4 leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-white/60 text-xs font-medium">{item.source}</span>
                    <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 p-1">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* News Detail Modal */}
      <Dialog open={!!selectedNews} onOpenChange={() => setSelectedNews(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border-white/20">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-2">
              {selectedNews && getCategoryBadge(selectedNews.category)}
              <span className="text-white/50 text-sm">
                {selectedNews?.source} • {selectedNews && getTimeAgo(selectedNews.publishedAt)}
              </span>
            </div>
            <DialogTitle className="text-white text-2xl leading-tight">
              {selectedNews?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 mt-6">
            <div className="text-white/90 text-lg leading-relaxed">
              {selectedNews?.content}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
