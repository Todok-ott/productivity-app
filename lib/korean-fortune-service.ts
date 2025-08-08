import { getZodiacByYear } from './korean-localization'

interface KoreanFortune {
  message: string
  luckyNumbers: number[]
  luckyColors: string[]
  luckyDirection: string
  zodiacName: string
}

// Mock Korean fortune service - simulates Naver Fortune API
export async function fetchKoreanFortune(birthYear: number): Promise<KoreanFortune> {
  await new Promise(resolve => setTimeout(resolve, 500))
  
  const zodiac = getZodiacByYear(birthYear)
  
  const fortunesByZodiac = {
    pig: [
      {
        message: "오늘은 재물운이 상승하는 날입니다. 직감을 믿고 현명한 결정을 내리세요. 가족과의 시간을 소중히 여기면 더 큰 행복이 찾아올 것입니다.",
        luckyNumbers: [3, 7, 12, 21, 33],
        luckyColors: ["황금색", "진청색"],
        luckyDirection: "남서쪽"
      },
      {
        message: "타인을 돕는 마음이 복을 불러올 날입니다. 성실함과 정직함으로 중요한 인연을 만날 수 있습니다.",
        luckyNumbers: [8, 15, 22, 29, 36],
        luckyColors: ["초록색", "은색"],
        luckyDirection: "북동쪽"
      }
    ],
    rat: [
      {
        message: "새로운 기회가 찾아오는 날입니다. 적극적인 자세로 도전하면 좋은 결과를 얻을 수 있습니다.",
        luckyNumbers: [1, 6, 14, 23, 31],
        luckyColors: ["파란색", "흰색"],
        luckyDirection: "북쪽"
      }
    ],
    ox: [
      {
        message: "꾸준함이 빛을 발하는 날입니다. 차근차근 계획을 세워 실행하면 성공할 수 있습니다.",
        luckyNumbers: [2, 9, 16, 25, 34],
        luckyColors: ["노란색", "갈색"],
        luckyDirection: "동북쪽"
      }
    ],
    tiger: [
      {
        message: "용기와 결단력이 필요한 날입니다. 자신감을 가지고 앞으로 나아가세요.",
        luckyNumbers: [4, 11, 18, 27, 35],
        luckyColors: ["주황색", "검은색"],
        luckyDirection: "동쪽"
      }
    ],
    rabbit: [
      {
        message: "평화롭고 조화로운 하루가 될 것입니다. 인간관계에서 좋은 소식이 있을 수 있습니다.",
        luckyNumbers: [5, 12, 19, 28, 37],
        luckyColors: ["분홍색", "연두색"],
        luckyDirection: "동남쪽"
      }
    ],
    dragon: [
      {
        message: "강한 에너지가 넘치는 날입니다. 리더십을 발휘하여 큰 성과를 이룰 수 있습니다.",
        luckyNumbers: [6, 13, 20, 29, 38],
        luckyColors: ["빨간색", "금색"],
        luckyDirection: "남쪽"
      }
    ],
    snake: [
      {
        message: "지혜롭고 신중한 판단이 필요한 날입니다. 깊이 생각하고 행동하세요.",
        luckyNumbers: [7, 14, 21, 30, 39],
        luckyColors: ["보라색", "검은색"],
        luckyDirection: "남서쪽"
      }
    ],
    horse: [
      {
        message: "활동적이고 역동적인 하루가 될 것입니다. 새로운 도전을 두려워하지 마세요.",
        luckyNumbers: [8, 15, 22, 31, 40],
        luckyColors: ["갈색", "녹색"],
        luckyDirection: "서쪽"
      }
    ],
    goat: [
      {
        message: "온화하고 따뜻한 마음이 행운을 가져다줄 날입니다. 예술적 감성을 발휘해보세요.",
        luckyNumbers: [9, 16, 23, 32, 41],
        luckyColors: ["하늘색", "흰색"],
        luckyDirection: "북서쪽"
      }
    ],
    monkey: [
      {
        message: "창의적이고 유머러스한 하루가 될 것입니다. 재치있는 아이디어로 문제를 해결하세요.",
        luckyNumbers: [10, 17, 24, 33, 42],
        luckyColors: ["노란색", "주황색"],
        luckyDirection: "북쪽"
      }
    ],
    rooster: [
      {
        message: "정확하고 세심한 계획이 성공을 가져다줄 날입니다. 시간 관리를 잘하세요.",
        luckyNumbers: [11, 18, 25, 34, 43],
        luckyColors: ["빨간색", "금색"],
        luckyDirection: "동쪽"
      }
    ],
    dog: [
      {
        message: "충실하고 성실한 마음가짐이 인정받는 날입니다. 신뢰를 바탕으로 관계를 발전시키세요.",
        luckyNumbers: [12, 19, 26, 35, 44],
        luckyColors: ["파란색", "회색"],
        luckyDirection: "남동쪽"
      }
    ]
  }
  
  const fortunes = fortunesByZodiac[zodiac.animal as keyof typeof fortunesByZodiac] || fortunesByZodiac.pig
  const todayFortune = fortunes[new Date().getDate() % fortunes.length]
  
  return {
    ...todayFortune,
    zodiacName: zodiac.name
  }
}
