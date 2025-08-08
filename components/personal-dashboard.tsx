"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar, Star, Sparkles, ExternalLink } from 'lucide-react'

interface NewsItem {
  id: string
  title: string
  summary: string
  content: string
  source: string
  publishedAt: string
}

export function PersonalDashboard() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null)

  // Mock news data - in real app, this would come from an API
  const [news] = useState<NewsItem[]>([
    {
      id: '1',
      title: 'Major Tech Breakthrough in AI Development',
      summary: 'Scientists announce significant advancement in artificial intelligence capabilities...',
      content: 'In a groundbreaking development, researchers at leading technology institutes have announced a major breakthrough in artificial intelligence development. This advancement promises to revolutionize how we interact with technology in our daily lives. The new AI system demonstrates unprecedented capabilities in understanding context, reasoning, and problem-solving. Industry experts believe this could be the beginning of a new era in technological innovation. The implications for various sectors including healthcare, education, and business automation are enormous. Companies are already exploring how to integrate these new capabilities into their existing systems.',
      source: 'Tech News Daily',
      publishedAt: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      title: 'Global Climate Initiative Shows Promising Results',
      summary: 'New environmental policies lead to measurable improvements in air quality...',
      content: 'Recent data from environmental monitoring stations worldwide shows that the global climate initiative launched last year is yielding promising results. Air quality measurements in major cities have improved by an average of 15% compared to the same period last year. The initiative, which focuses on renewable energy adoption and carbon emission reduction, has gained support from over 150 countries. Scientists are optimistic that if current trends continue, we could see significant environmental improvements within the next decade. The success of this program demonstrates the power of international cooperation in addressing global challenges.',
      source: 'Environmental Times',
      publishedAt: '2024-01-15T08:15:00Z'
    },
    {
      id: '3',
      title: 'Space Exploration Reaches New Milestone',
      summary: 'Private space company successfully completes historic mission to Mars...',
      content: 'A private space exploration company has successfully completed a historic unmanned mission to Mars, marking a significant milestone in space exploration. The mission, which took 7 months to complete, has provided valuable data about the Martian atmosphere and surface conditions. This achievement represents a major step forward in humanitys quest to explore and potentially colonize other planets. The mission has also demonstrated the viability of private sector involvement in space exploration, opening new possibilities for future missions. Scientists are already planning follow-up missions based on the data collected from this groundbreaking expedition.',
      source: 'Space Explorer Magazine',
      publishedAt: '2024-01-14T16:45:00Z'
    }
  ])

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  // Enhanced fortune for Year of the Pig (1983)
  const getPigFortune = () => {
    const fortunes = [
      {
        message: "Today brings excellent opportunities for financial growth. Your natural intuition will guide you to make wise decisions.",
        luckyNumbers: [3, 7, 12, 21, 33],
        luckyColors: ["Golden Yellow", "Deep Blue"],
        luckyDirection: "Southwest"
      },
      {
        message: "Your compassionate nature will be rewarded today. Help others and you'll find unexpected blessings.",
        luckyNumbers: [8, 15, 22, 29, 36],
        luckyColors: ["Forest Green", "Silver"],
        luckyDirection: "Northeast"
      },
      {
        message: "Focus on family and close relationships today. Your loyalty and honesty will strengthen important bonds.",
        luckyNumbers: [5, 11, 18, 25, 42],
        luckyColors: ["Royal Purple", "Warm Orange"],
        luckyDirection: "Northwest"
      }
    ]
    
    const today = new Date().getDate()
    return fortunes[today % fortunes.length]
  }

  const todaysFortune = getPigFortune()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Time & Date */}
      <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Today
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-white mb-2">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
          <div className="text-white/70">
            {currentTime.toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Fortune for Year of the Pig */}
      <Card className="bg-black/40 border-white/10 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            Today's Fortune for Pig Zodiac (1983 born)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-white/90 text-sm leading-relaxed">
            {todaysFortune.message}
          </p>
          
          <div className="space-y-2">
            <div>
              <span className="text-white/70 text-xs font-medium">Lucky Numbers:</span>
              <div className="flex gap-1 mt-1">
                {todaysFortune.luckyNumbers.map((num) => (
                  <Badge key={num} variant="secondary" className="bg-purple-600/30 text-white text-xs">
                    {num}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <span className="text-white/70 text-xs font-medium">Lucky Colors:</span>
              <div className="flex gap-1 mt-1">
                {todaysFortune.luckyColors.map((color) => (
                  <Badge key={color} variant="secondary" className="bg-blue-600/30 text-white text-xs">
                    {color}
                  </Badge>
                ))}
              </div>
            </div>
            
            <div>
              <span className="text-white/70 text-xs font-medium">Lucky Direction:</span>
              <Badge variant="secondary" className="bg-green-600/30 text-white text-xs ml-2">
                {todaysFortune.luckyDirection}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced News Section */}
      <Card className="bg-black/40 border-white/10 backdrop-blur-sm lg:col-span-1">
        <CardHeader className="pb-3">
          <CardTitle className="text-white flex items-center gap-2">
            <Star className="h-5 w-5" />
            Latest News
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {news.slice(0, 3).map((item) => (
            <div 
              key={item.id}
              className="p-4 bg-white/5 rounded-lg border border-white/10 cursor-pointer hover:bg-white/10 transition-colors"
              onClick={() => setSelectedNews(item)}
            >
              <h3 className="text-white font-semibold text-base mb-2 leading-tight">
                {item.title}
              </h3>
              <p className="text-white/70 text-sm mb-3 leading-relaxed">
                {item.summary}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-white/50 text-xs">{item.source}</span>
                <Button variant="ghost" size="sm" className="text-white/70 hover:text-white p-1">
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* News Detail Modal */}
      <Dialog open={!!selectedNews} onOpenChange={() => setSelectedNews(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-slate-900 border-white/20">
          <DialogHeader>
            <DialogTitle className="text-white text-xl mb-2">
              {selectedNews?.title}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-white/70">
              <span>{selectedNews?.source}</span>
              <span>•</span>
              <span>{selectedNews?.publishedAt ? new Date(selectedNews.publishedAt).toLocaleDateString() : ''}</span>
            </div>
            <div className="text-white/90 leading-relaxed">
              {selectedNews?.content}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
