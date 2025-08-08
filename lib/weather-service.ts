interface WeatherData {
  location: string
  temperature: number
  condition: string
  humidity: number
  windSpeed: number
  icon: string
  lastUpdated: string
}

// Mock weather service - in production, you'd use a real weather API
export async function fetchWeatherData(): Promise<WeatherData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  const conditions = [
    { condition: "Sunny", icon: "☀️", temp: 22 },
    { condition: "Partly Cloudy", icon: "⛅", temp: 18 },
    { condition: "Cloudy", icon: "☁️", temp: 15 },
    { condition: "Rainy", icon: "🌧️", temp: 12 },
    { condition: "Stormy", icon: "⛈️", temp: 10 }
  ]
  
  const randomCondition = conditions[Math.floor(Math.random() * conditions.length)]
  
  return {
    location: "Seoul, South Korea",
    temperature: randomCondition.temp + Math.floor(Math.random() * 10),
    condition: randomCondition.condition,
    humidity: 45 + Math.floor(Math.random() * 40),
    windSpeed: 5 + Math.floor(Math.random() * 15),
    icon: randomCondition.icon,
    lastUpdated: new Date().toISOString()
  }
}
