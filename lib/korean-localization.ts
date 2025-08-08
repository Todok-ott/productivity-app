export const koreanTexts = {
  // Header & Navigation
  appTitle: "생산성 프로",
  menu: "메뉴",
  settings: "설정",
  exportData: "데이터 내보내기",
  importData: "데이터 가져오기",
  
  // Dashboard Widgets
  today: "오늘",
  weather: "날씨",
  fortuneTitle: "오늘의 운세",
  luckyNumbers: "행운의 숫자",
  luckyColors: "행운의 색깔",
  luckyDirection: "행운의 방향",
  breakingNews: "속보 및 주요 뉴스",
  
  // Tool Cards
  bookmarkManager: "북마크 관리",
  bookmarkDesc: "즐겨찾는 링크를 저장하고 정리하세요",
  cheatCodeManager: "치트코드 관리",
  cheatCodeDesc: "게임 치트코드를 저장하고 관리하세요",
  quickNotes: "빠른 메모",
  notesDesc: "생각과 아이디어를 기록하세요",
  todoList: "할 일 목록",
  todoDesc: "작업과 목표를 추적하세요",
  calculator: "계산기",
  calculatorDesc: "빠른 계산",
  textDiff: "텍스트 비교 도구",
  textDiffDesc: "두 텍스트를 나란히 비교하세요",
  imageTools: "이미지 압축/리사이즈",
  imageToolsDesc: "이미지를 압축하고 크기를 조정하세요",
  translator: "번역기",
  translatorDesc: "다국어 번역 도구",
  fileConverter: "파일 변환",
  fileConverterDesc: "파일 형식을 변환하세요",
  timeTools: "시간 변환 도구",
  timeToolsDesc: "시간 단위 변환 및 날짜 계산",
  pomodoroTimer: "포모도로 타이머",
  timerDesc: "시간 관리로 집중하세요",
  colorPicker: "색상 선택기",
  colorDesc: "색상을 선택하고 저장하세요",
  musicPlayer: "음악 플레이어",
  musicDesc: "배경음악 재생",
  
  // Weather
  sunny: "맑음",
  cloudy: "흐림",
  partlyCloudy: "구름 조금",
  rainy: "비",
  stormy: "폭풍",
  location: "서울, 대한민국",
  updatedAgo: "전 업데이트",
  
  // News Labels
  breaking: "속보",
  trending: "인기",
  major: "주요",
  
  // Time units
  minutesAgo: "분 전",
  hoursAgo: "시간 전",
  daysAgo: "일 전",
  
  // Settings
  themeSettings: "테마 설정",
  darkMode: "다크 모드",
  lightMode: "라이트 모드",
  birthYearSetting: "생년월일 설정",
  birthYear: "출생년도",
  save: "저장",
  close: "닫기",
  
  // Common
  refresh: "새로고침",
  loading: "로딩 중...",
  error: "오류가 발생했습니다",
  
  // Tool specific
  compare: "비교",
  leftText: "왼쪽 텍스트",
  rightText: "오른쪽 텍스트",
  differences: "차이점",
  compress: "압축",
  resize: "크기 조정",
  translate: "번역",
  convert: "변환",
  upload: "업로드",
  download: "다운로드",
  selectFile: "파일 선택",
  dragDrop: "파일을 드래그하거나 클릭하여 업로드",
  processing: "처리 중...",
  completed: "완료",
  failed: "실패"
}

export const zodiacAnimals = {
  1983: { name: "돼지띠", animal: "pig" },
  1984: { name: "쥐띠", animal: "rat" },
  1985: { name: "소띠", animal: "ox" },
  1986: { name: "호랑이띠", animal: "tiger" },
  1987: { name: "토끼띠", animal: "rabbit" },
  1988: { name: "용띠", animal: "dragon" },
  1989: { name: "뱀띠", animal: "snake" },
  1990: { name: "말띠", animal: "horse" },
  1991: { name: "양띠", animal: "goat" },
  1992: { name: "원숭이띠", animal: "monkey" },
  1993: { name: "닭띠", animal: "rooster" },
  1994: { name: "개띠", animal: "dog" }
}

export function getZodiacByYear(year: number) {
  const baseYear = 1983
  const cycle = (year - baseYear) % 12
  const adjustedCycle = cycle < 0 ? cycle + 12 : cycle
  const zodiacYear = baseYear + adjustedCycle
  
  return zodiacAnimals[zodiacYear as keyof typeof zodiacAnimals] || zodiacAnimals[1983]
}
