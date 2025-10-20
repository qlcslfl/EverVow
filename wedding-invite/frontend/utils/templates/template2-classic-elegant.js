// 템플릿 2: Classic Elegant - 클래식 엘레강트 스타일
import { useState, useEffect } from 'react';

const ClassicElegantTemplate = ({ data }) => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.section-animate').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-amber-50 text-amber-900 font-serif">
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        .section-animate {
          opacity: 0;
        }
        .elegant-border {
          background: linear-gradient(90deg, transparent, #D4AF37, transparent);
          height: 1px;
        }
        .paper-texture {
          background-image:
            repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(212, 175, 55, 0.03) 2px, rgba(212, 175, 55, 0.03) 4px);
        }
      `}</style>

      {/* 1. Hero Section */}
      <section className="section-animate relative min-h-screen flex flex-col items-center justify-center px-6 py-20 paper-texture">
        {data.heroImage && (
          <div className="absolute inset-0 opacity-10">
            <img src={data.heroImage} alt="Hero" className="w-full h-full object-cover sepia" />
          </div>
        )}

        <div className="relative z-10 text-center max-w-xl mx-auto">
          {/* 장식 모티프 */}
          <div className="mb-8">
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 elegant-border"></div>
              <svg className="w-6 h-6 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L9.5 8.5L3 9.5L7.5 14.5L6.5 21L12 17.5L17.5 21L16.5 14.5L21 9.5L14.5 8.5L12 2Z"/>
              </svg>
              <div className="w-12 elegant-border"></div>
            </div>
          </div>

          {/* 메인 타이틀 */}
          <div className="space-y-6 mb-10">
            <p className="text-xs tracking-[0.3em] text-amber-700 uppercase font-light">Wedding Invitation</p>

            <div className="space-y-3">
              <h1 className="text-5xl md:text-6xl font-serif text-amber-900 tracking-tight">
                {data.brideName}
              </h1>
              <div className="flex items-center justify-center gap-4 my-4">
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
                <span className="text-2xl text-amber-600">∞</span>
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-600 to-transparent"></div>
              </div>
              <h1 className="text-5xl md:text-6xl font-serif text-amber-900 tracking-tight">
                {data.groomName}
              </h1>
            </div>
          </div>

          {/* 날짜 */}
          <div className="mt-8 py-6 border-t border-b border-amber-300/30">
            <p className="text-sm tracking-widest text-amber-800 font-light uppercase">
              {data.weddingDate}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Greeting Section */}
      <section className="section-animate py-20 px-6 bg-white/40 paper-texture">
        <div className="max-w-2xl mx-auto text-center">
          {/* 장식 */}
          <div className="mb-8">
            <div className="elegant-border w-32 mx-auto mb-6"></div>
            <svg className="w-8 h-8 text-amber-600 mx-auto" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>

          <h2 className="text-3xl font-serif text-amber-900 mb-8 leading-relaxed">
            {data.greetingMessage || '평생을 함께할\n반려자를 만났습니다'}
          </h2>

          <p className="text-base leading-loose text-amber-800 whitespace-pre-line font-light">
            {data.greetingDetail || '저희 두 사람이 사랑과 믿음으로\n한 가정을 이루게 되었습니다.\n\n귀한 걸음 하시어 축복해 주시면\n더없는 기쁨으로 간직하겠습니다.'}
          </p>

          <div className="elegant-border w-32 mx-auto mt-8"></div>
        </div>
      </section>

      {/* 3. Bride & Groom Section */}
      <section className="section-animate py-16 px-6 bg-gradient-to-b from-amber-50 to-white paper-texture">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Groom */}
            <div className="bg-white/60 backdrop-blur-sm p-10 text-center shadow-xl border border-amber-200/50">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-amber-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <p className="text-xs tracking-[0.2em] text-amber-600 uppercase mb-3">Groom</p>
                <h3 className="text-3xl font-serif text-amber-900 mb-2">{data.groomName}</h3>
                <div className="w-12 h-px bg-amber-400 mx-auto my-4"></div>
                <p className="text-sm text-amber-700 leading-relaxed">
                  {data.groomParents}
                </p>
              </div>

              {data.groomPhone && (
                <button className="mt-6 px-8 py-2.5 border-2 border-amber-600 text-amber-900 text-sm font-serif hover:bg-amber-600 hover:text-white transition-all duration-300 shadow-md">
                  연락하기
                </button>
              )}
            </div>

            {/* Bride */}
            <div className="bg-white/60 backdrop-blur-sm p-10 text-center shadow-xl border border-amber-200/50">
              <div className="mb-6">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-amber-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                  </svg>
                </div>
                <p className="text-xs tracking-[0.2em] text-amber-600 uppercase mb-3">Bride</p>
                <h3 className="text-3xl font-serif text-amber-900 mb-2">{data.brideName}</h3>
                <div className="w-12 h-px bg-amber-400 mx-auto my-4"></div>
                <p className="text-sm text-amber-700 leading-relaxed">
                  {data.brideParents}
                </p>
              </div>

              {data.bridePhone && (
                <button className="mt-6 px-8 py-2.5 border-2 border-amber-600 text-amber-900 text-sm font-serif hover:bg-amber-600 hover:text-white transition-all duration-300 shadow-md">
                  연락하기
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Schedule Section */}
      <section className="section-animate py-20 px-6 bg-white paper-texture">
        <div className="max-w-2xl mx-auto">
          {/* 타이틀 */}
          <div className="text-center mb-12">
            <div className="elegant-border w-32 mx-auto mb-6"></div>
            <h2 className="text-4xl font-serif text-amber-900">When & Where</h2>
            <div className="elegant-border w-32 mx-auto mt-6"></div>
          </div>

          {/* 날짜 및 시간 */}
          <div className="text-center mb-12 py-8 border-y border-amber-300/30">
            <p className="text-2xl font-serif text-amber-900 mb-3">{data.weddingDate}</p>
            <p className="text-base text-amber-700">{data.weddingTime}</p>
          </div>

          {/* 장소 정보 카드 */}
          <div className="bg-gradient-to-br from-amber-50 to-white p-10 shadow-2xl border border-amber-200/50">
            <div className="text-center space-y-4 mb-8">
              <div className="inline-block p-3 bg-amber-100 rounded-full mb-4">
                <svg className="w-6 h-6 text-amber-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-serif text-amber-900">{data.venueName}</h3>
              <p className="text-sm text-amber-700 leading-relaxed">{data.venueAddress}</p>
              {data.venueDetail && (
                <p className="text-xs text-amber-600 italic">{data.venueDetail}</p>
              )}
            </div>

            <div className="text-center pt-4 border-t border-amber-300/30">
              <button className="px-12 py-3 bg-amber-700 text-white text-sm font-serif hover:bg-amber-800 transition-all duration-300 shadow-lg">
                오시는 길 보기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Gallery Section */}
      <section className="section-animate py-16 px-6 bg-gradient-to-b from-white to-amber-50 paper-texture">
        <div className="max-w-5xl mx-auto">
          {/* 타이틀 */}
          <div className="text-center mb-12">
            <div className="elegant-border w-32 mx-auto mb-6"></div>
            <h2 className="text-4xl font-serif text-amber-900">Our Memories</h2>
            <div className="elegant-border w-32 mx-auto mt-6"></div>
          </div>

          {/* 갤러리 그리드 */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.galleryImages?.map((img, idx) => (
              <div
                key={idx}
                className="aspect-square overflow-hidden shadow-lg border-4 border-white group"
              >
                <img
                  src={img}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-full object-cover sepia-[0.15] group-hover:sepia-0 transition-all duration-700 group-hover:scale-110"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Footer Section */}
      <section className="section-animate py-20 px-6 bg-white paper-texture">
        <div className="max-w-2xl mx-auto text-center">
          {/* 장식 */}
          <div className="mb-10">
            <div className="elegant-border w-32 mx-auto mb-6"></div>
            <svg className="w-12 h-12 text-amber-600 mx-auto" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L9.5 8.5L3 9.5L7.5 14.5L6.5 21L12 17.5L17.5 21L16.5 14.5L21 9.5L14.5 8.5L12 2Z"/>
            </svg>
          </div>

          <p className="text-xl font-serif leading-relaxed text-amber-900 mb-6 whitespace-pre-line">
            {data.footerMessage || '귀한 걸음 해주셔서\n진심으로 감사드립니다'}
          </p>

          <p className="text-base text-amber-700 font-serif mb-10">
            {data.brideName} & {data.groomName}
          </p>

          <div className="elegant-border w-48 mx-auto mb-8"></div>

          {/* 공유 버튼 */}
          <button className="px-12 py-3 border-2 border-amber-600 text-amber-900 text-sm font-serif hover:bg-amber-600 hover:text-white transition-all duration-300 shadow-md">
            초대장 공유하기
          </button>

          {/* 하단 장식 */}
          <div className="mt-16">
            <div className="flex items-center justify-center gap-3">
              <div className="w-16 elegant-border"></div>
              <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <div className="w-16 elegant-border"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClassicElegantTemplate;
