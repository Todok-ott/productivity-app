export function Footer() {
  return (
    <footer className="mt-16 py-8 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <p className="text-gray-400 text-sm">
              © 2024 생산성프로. 모든 권리 보유.
            </p>
            <p className="text-gray-500 text-xs mt-1">
              버전 1.0.0 • Next.js & TypeScript로 제작
            </p>
          </div>
          
          <div className="flex items-center space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">개인정보처리방침</a>
            <a href="#" className="hover:text-white transition-colors">이용약관</a>
            <a href="#" className="hover:text-white transition-colors">지원</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
