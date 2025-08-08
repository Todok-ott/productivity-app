interface KoreanNewsItem {
  id: string
  title: string
  summary: string
  content: string
  source: string
  publishedAt: string
  category: 'breaking' | 'trending' | 'major'
  importance: number
}

// Mock Korean news service - simulates Korean news APIs
export async function fetchKoreanNews(): Promise<KoreanNewsItem[]> {
  await new Promise(resolve => setTimeout(resolve, 800))
  
  const koreanNewsTemplates = [
    {
      title: "정부, 새로운 경제정책 발표로 시장 활성화 기대",
      summary: "정부가 발표한 새로운 경제정책으로 국내 시장 활성화와 일자리 창출이 기대됩니다...",
      content: "정부는 오늘 새로운 경제정책을 발표하며 국내 경제 활성화를 위한 종합적인 대책을 제시했습니다. 이번 정책에는 중소기업 지원 확대, 신산업 육성, 일자리 창출을 위한 다양한 방안이 포함되어 있습니다. 특히 디지털 전환을 위한 지원금 확대와 스타트업 생태계 조성에 중점을 두고 있어 많은 관심을 받고 있습니다. 경제 전문가들은 이번 정책이 코로나19 이후 경제 회복에 긍정적인 영향을 미칠 것으로 전망한다고 밝혔습니다.",
      source: "KBS 뉴스",
      category: 'breaking' as const,
      importance: 10
    },
    {
      title: "K-팝 그룹, 빌보드 차트 1위 달성으로 한류 열풍 지속",
      summary: "국내 K-팝 그룹이 빌보드 메인 차트에서 1위를 차지하며 전 세계적인 한류 열풍을 이어가고 있습니다...",
      content: "국내 대표 K-팝 그룹이 빌보드 200 차트에서 1위를 달성하며 한국 음악의 위상을 다시 한번 입증했습니다. 이번 성과는 한국 음악이 전 세계적으로 사랑받고 있음을 보여주는 대표적인 사례로 평가받고 있습니다. 특히 이번 앨범은 한국적인 정서와 현대적인 사운드를 조화롭게 결합하여 국내외 팬들의 큰 호응을 얻었습니다. 문화체육관광부는 이러한 성과가 한국 문화 콘텐츠의 경쟁력을 보여주는 것이라고 평가했습니다.",
      source: "MBC 뉴스",
      category: 'trending' as const,
      importance: 8
    },
    {
      title: "서울시, 대중교통 요금 조정안 발표",
      summary: "서울시가 대중교통 요금 조정안을 발표하며 시민들의 교통비 부담 완화를 위한 방안을 제시했습니다...",
      content: "서울시는 오늘 대중교통 요금 조정안을 발표하며 시민들의 교통비 부담을 줄이기 위한 다양한 방안을 제시했습니다. 이번 조정안에는 환승 할인 확대, 청년층 대상 교통비 지원, 장거리 이용객을 위한 할인 제도 등이 포함되어 있습니다. 서울시 관계자는 이번 조치가 시민들의 교통비 부담을 실질적으로 줄이고 대중교통 이용을 활성화하는 데 도움이 될 것이라고 설명했습니다. 새로운 요금제는 다음 달부터 시행될 예정입니다.",
      source: "연합뉴스",
      category: 'major' as const,
      importance: 7
    },
    {
      title: "국내 IT 기업, 글로벌 시장 진출 확대",
      summary: "국내 주요 IT 기업들이 해외 시장 진출을 확대하며 글로벌 경쟁력을 강화하고 있습니다...",
      content: "국내 주요 IT 기업들이 해외 시장 진출을 적극적으로 확대하며 글로벌 경쟁력을 강화하고 있습니다. 특히 인공지능, 클라우드 서비스, 모바일 게임 분야에서 두각을 나타내며 해외에서도 높은 평가를 받고 있습니다. 이들 기업은 현지 파트너십 구축과 함께 글로벌 표준에 맞는 서비스를 제공하여 시장 점유율을 확대하고 있습니다. 업계 전문가들은 한국 IT 기업들의 기술력과 창의성이 글로벌 시장에서 경쟁 우위를 확보하는 데 중요한 역할을 하고 있다고 분석했습니다.",
      source: "네이버 뉴스",
      category: 'trending' as const,
      importance: 6
    }
  ]
  
  return koreanNewsTemplates
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map((template, index) => ({
      ...template,
      id: `korean-news-${Date.now()}-${index}`,
      publishedAt: new Date(Date.now() - Math.random() * 12 * 60 * 60 * 1000).toISOString()
    }))
    .sort((a, b) => b.importance - a.importance)
}
