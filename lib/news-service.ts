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

// Mock news service - in production, you'd use a real news API
export async function fetchNewsData(): Promise<NewsItem[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const newsTemplates = [
    {
      title: "Global Climate Summit Reaches Historic Agreement",
      summary: "World leaders unite on unprecedented climate action plan with binding commitments...",
      content: "In a groundbreaking development at the Global Climate Summit, world leaders from over 190 countries have reached a historic agreement on climate action. The comprehensive plan includes binding commitments to reduce carbon emissions by 50% within the next decade, massive investments in renewable energy infrastructure, and a global fund to support developing nations in their transition to clean energy. This agreement represents the most significant international cooperation on climate change since the Paris Agreement. Scientists and environmental groups are calling it a crucial step toward preventing catastrophic climate change. The plan will be implemented through a series of coordinated actions across all participating nations, with regular monitoring and accountability measures.",
      source: "Global News Network",
      category: 'breaking' as const,
      importance: 10
    },
    {
      title: "Revolutionary Medical Breakthrough in Cancer Treatment",
      summary: "New immunotherapy treatment shows 95% success rate in clinical trials...",
      content: "Medical researchers have announced a revolutionary breakthrough in cancer treatment that could change the landscape of oncology forever. The new immunotherapy treatment, developed through a collaboration between leading medical institutions, has shown a remarkable 95% success rate in Phase III clinical trials involving over 2,000 patients with various types of cancer. The treatment works by enhancing the body's natural immune system to target and destroy cancer cells more effectively than ever before. Unlike traditional chemotherapy, this new approach has minimal side effects and can be administered on an outpatient basis. The FDA has fast-tracked the approval process, and the treatment could be available to patients within the next six months.",
      source: "Medical Times",
      category: 'breaking' as const,
      importance: 9
    },
    {
      title: "Tech Giants Announce Joint AI Safety Initiative",
      summary: "Major technology companies collaborate on artificial intelligence safety standards...",
      content: "In an unprecedented move, the world's largest technology companies have announced a joint initiative to establish comprehensive safety standards for artificial intelligence development. The collaboration includes commitments to transparent AI development, ethical guidelines for AI deployment, and shared research on AI safety measures. This initiative comes as AI technology continues to advance rapidly, raising concerns about potential risks and the need for responsible development. The companies have pledged to invest billions of dollars in AI safety research and to share their findings with the broader scientific community. Industry experts view this as a crucial step toward ensuring that AI development benefits humanity while minimizing potential risks.",
      source: "Tech Today",
      category: 'trending' as const,
      importance: 8
    },
    {
      title: "Space Mission Discovers Potential Signs of Life",
      summary: "Mars rover findings suggest possible microbial life on the red planet...",
      content: "NASA's latest Mars rover mission has made a discovery that could revolutionize our understanding of life in the universe. The rover has detected chemical signatures and geological formations that strongly suggest the presence of microbial life on Mars, both in the past and potentially in the present. The findings include organic compounds, methane emissions, and mineral formations that on Earth are associated with biological processes. While scientists are cautious about declaring definitive proof of life, the evidence is compelling enough to warrant immediate follow-up missions. This discovery could answer one of humanity's most fundamental questions: Are we alone in the universe?",
      source: "Space Explorer",
      category: 'major' as const,
      importance: 9
    },
    {
      title: "Global Economic Recovery Shows Strong Momentum",
      summary: "International markets surge as economic indicators point to sustained growth...",
      content: "Global financial markets are experiencing their strongest performance in years as economic indicators point to sustained recovery and growth across major economies. Employment rates have reached pre-pandemic levels in most developed nations, while inflation has stabilized within target ranges. The recovery is being driven by increased consumer spending, business investment, and government infrastructure projects. Economists are optimistic about the outlook for the coming year, though they caution about potential challenges from geopolitical tensions and supply chain disruptions. The positive economic momentum is expected to continue, with GDP growth projections being revised upward for most major economies.",
      source: "Financial Herald",
      category: 'trending' as const,
      importance: 7
    },
    {
      title: "Renewable Energy Milestone: 50% of Global Power",
      summary: "Renewable energy sources now provide half of the world's electricity generation...",
      content: "A historic milestone has been reached in the global transition to clean energy, with renewable sources now providing 50% of the world's electricity generation for the first time in modern history. This achievement comes ahead of most expert predictions and represents a dramatic shift in the global energy landscape. Solar and wind power have been the primary drivers of this growth, with costs continuing to decline and efficiency improving. The milestone is being celebrated by environmental groups and policymakers as proof that the transition to clean energy is not only possible but economically viable. This trend is expected to accelerate as more countries commit to net-zero emissions targets.",
      source: "Energy Weekly",
      category: 'major' as const,
      importance: 8
    }
  ]
  
  // Randomize and add timestamps
  const shuffled = newsTemplates
    .sort(() => Math.random() - 0.5)
    .slice(0, 4)
    .map((template, index) => ({
      ...template,
      id: `news-${Date.now()}-${index}`,
      publishedAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000).toISOString()
    }))
    .sort((a, b) => b.importance - a.importance)
  
  return shuffled
}
