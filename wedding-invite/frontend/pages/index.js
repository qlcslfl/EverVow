import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const features = [
    {
      icon: "✏️",
      title: "간단한 입력",
      description: "몇 분만 투자하세요.\n필요한 정보만 입력하면\n나머지는 저희가 처리합니다."
    },
    {
      icon: "🎨",
      title: "다양한 디자인",
      description: "모던부터 클래식까지\n취향에 맞는 템플릿을\n자유롭게 선택하세요."
    },
    {
      icon: "📱",
      title: "쉽고 빠른 공유",
      description: "링크 하나로 완성.\n카카오톡, 문자로\n간편하게 전달하세요."
    }
  ];

  return (
    <div className="min-h-screen bg-white font-['Pretendard','Noto_Sans_KR',sans-serif]">
      {/* 헤더 */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* 로고 */}
            <div className="flex items-center space-x-2">
              <Image
                src="/EverVowImage.png"
                alt="EverVow Logo"
                width={40}
                height={40}
                className="rounded-lg"
              />
              <span className="text-2xl font-extrabold text-gray-900">EverVow</span>
            </div>

            {/* 데스크톱 메뉴 */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-600 hover:text-gold transition-colors">서비스 소개</a>
              <a href="#about" className="text-gray-600 hover:text-gold transition-colors">회사 소개</a>
              <a href="#contact" className="text-gray-600 hover:text-gold transition-colors">문의</a>
              <Link href="/form" className="bg-gold text-white px-4 py-2 rounded-full hover:bg-opacity-90 transition-all duration-300 hover:scale-105">
                시작하기
              </Link>
            </nav>

            {/* 모바일 메뉴 버튼 */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                <div className={`w-full h-0.5 bg-gray-600 transition-all ${isMenuOpen ? 'rotate-45 translate-y-1' : ''}`}></div>
                <div className={`w-full h-0.5 bg-gray-600 transition-all ${isMenuOpen ? 'opacity-0' : ''}`}></div>
                <div className={`w-full h-0.5 bg-gray-600 transition-all ${isMenuOpen ? '-rotate-45 -translate-y-1' : ''}`}></div>
              </div>
            </button>
          </div>

          {/* 모바일 메뉴 */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-100">
              <nav className="flex flex-col space-y-4">
                <a href="#features" className="text-gray-600 hover:text-gold transition-colors">서비스 소개</a>
                <a href="#about" className="text-gray-600 hover:text-gold transition-colors">회사 소개</a>
                <a href="#contact" className="text-gray-600 hover:text-gold transition-colors">문의</a>
                <Link href="/form" className="bg-gold text-white px-4 py-2 rounded-full text-center hover:bg-opacity-90 transition-all duration-300">
                  시작하기
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* 메인 히어로 섹션 */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* 텍스트 콘텐츠 */}
            <div className="text-center lg:text-left space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-light text-gray-800 leading-tight">
                  특별한 날을 위한<br />
                  <span className="text-gold font-medium">모바일 청첩장</span>
                </h1>
                <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                  복잡한 과정은 이제 그만.<br />
                  몇 분만에 완성되는 감각적인 디지털 청첩장으로<br />
                  소중한 분들을 초대하세요.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/form" className="bg-gold text-white px-8 py-4 rounded-full font-medium text-lg shadow-lg hover:bg-opacity-90 hover:scale-105 transition-all duration-300">
                  지금 청첩장 만들기
                </Link>
                <button className="border-2 border-gray-200 text-gray-700 px-8 py-4 rounded-full font-medium text-lg hover:border-gold hover:text-gold transition-all duration-300">
                  샘플 보기
                </button>
              </div>

              {/* 통계 */}
              <div className="flex justify-center lg:justify-start space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gold">10,000+</div>
                  <div className="text-sm text-gray-500">제작된 청첩장</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gold">99%</div>
                  <div className="text-sm text-gray-500">만족도</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gold">5분</div>
                  <div className="text-sm text-gray-500">평균 제작시간</div>
                </div>
              </div>
            </div>

            {/* 대표 이미지 */}
            <div className="relative">
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl shadow-2xl p-8 lg:p-12 aspect-[3/4] flex items-center justify-center">
                  <div className="text-center space-y-6">
                    <div className="w-24 h-24 bg-gold bg-opacity-20 rounded-full mx-auto flex items-center justify-center">
                      <span className="text-3xl">💍</span>
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-2xl font-light text-gray-700">민수 ♥ 지영</h3>
                      <p className="text-gray-500">2024. 12. 21</p>
                      <p className="text-sm text-gray-400">그랜드 하얏트 서울</p>
                    </div>
                    <div className="text-xs text-gray-400 bg-white rounded-full px-4 py-2 inline-block">
                      모바일 청첩장 미리보기
                    </div>
                  </div>
                </div>
              </div>

              {/* 배경 장식 */}
              <div className="absolute -top-4 -right-4 w-32 h-32 bg-gold bg-opacity-10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-yellow-300 bg-opacity-20 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 특징 소개 섹션 */}
      <section id="features" className="py-20 lg:py-32 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-light text-gray-800">
              왜 <span className="text-gold font-medium">EverVow</span>일까요?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              복잡하고 번거로운 기존 방식을 벗어나, 더 쉽고 빠르게 완성하는 새로운 경험을 제공합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center group"
              >
                <div className="w-16 h-16 bg-gold bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-opacity-20 transition-colors">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 lg:py-32 bg-gradient-to-r from-gold to-yellow-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-3xl lg:text-4xl font-light text-white">
                지금 바로 시작해보세요
              </h2>
              <p className="text-lg text-white/90 max-w-2xl mx-auto">
                몇 분만 투자하면 완성되는 감각적인 모바일 청첩장.<br />
                소중한 순간을 더욱 특별하게 만들어보세요.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/form" className="bg-white text-gold px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300">
                무료로 청첩장 만들기
              </Link>
              <button className="border-2 border-white text-white px-8 py-4 rounded-full font-medium text-lg hover:bg-white hover:text-gold transition-all duration-300">
                더 많은 샘플 보기
              </button>
            </div>

            <p className="text-sm text-white/80">
              * 회원가입 없이 바로 시작 가능 • 5분 내 완성 • 무료 체험
            </p>
          </div>
        </div>
      </section>

      {/* 푸터 */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {/* 브랜드 */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <Image
                  src="/EverVowImage.png"
                  alt="EverVow Logo"
                  width={32}
                  height={32}
                  className="rounded-lg"
                />
                <span className="text-xl font-extrabold text-white">EverVow</span>
              </div>
              <p className="text-gray-400 mb-6 max-w-md">
                특별한 날을 위한 모바일 청첩장 서비스.<br />
                더 쉽고, 더 빠르고, 더 감각적인 경험을 제공합니다.
              </p>

              {/* SNS 링크 */}
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gold transition-colors">
                  <span className="text-sm">📘</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gold transition-colors">
                  <span className="text-sm">📷</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gold transition-colors">
                  <span className="text-sm">🐦</span>
                </a>
              </div>
            </div>

            {/* 서비스 */}
            <div>
              <h4 className="font-semibold mb-4">서비스</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">청첩장 제작</a></li>
                <li><a href="#" className="hover:text-white transition-colors">템플릿</a></li>
                <li><a href="#" className="hover:text-white transition-colors">가격 안내</a></li>
                <li><a href="#" className="hover:text-white transition-colors">고객 후기</a></li>
              </ul>
            </div>

            {/* 고객지원 */}
            <div>
              <h4 className="font-semibold mb-4">고객지원</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">자주 묻는 질문</a></li>
                <li><a href="#" className="hover:text-white transition-colors">이용 가이드</a></li>
                <li><a href="#" className="hover:text-white transition-colors">문의하기</a></li>
                <li><a href="#" className="hover:text-white transition-colors">개인정보처리방침</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p className="text-sm text-gray-400">&copy; 2024 EverVow. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
