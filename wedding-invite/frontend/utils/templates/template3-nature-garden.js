// 템플릿 3: Nature Garden - 네이처 가든 스타일
import { useState, useEffect } from 'react';

const NatureGardenTemplate = ({ data }) => {
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
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-amber-50 to-green-50 text-green-900">
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(25px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        .section-animate {
          opacity: 0;
        }
        .leaf-pattern {
          background-image:
            radial-gradient(circle at 20% 50%, rgba(134, 239, 172, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 80%, rgba(254, 215, 170, 0.1) 0%, transparent 50%);
        }
        .soft-glow {
          box-shadow: 0 10px 40px rgba(134, 239, 172, 0.2);
        }
      `}</style>

      {/* 1. Hero Section */}
      <section className="section-animate relative min-h-screen flex flex-col items-center justify-center px-6 py-20 leaf-pattern">
        {data.heroImage && (
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/40 to-white/60 z-10"></div>
            <img src={data.heroImage} alt="Hero" className="w-full h-full object-cover blur-sm" />
          </div>
        )}

        <div className="relative z-20 text-center max-w-xl mx-auto">
          {/* 플라워 장식 */}
          <div className="mb-12 flex justify-center items-center gap-4">
            <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C11.5 2 11 2.19 10.59 2.59L2.59 10.59C1.8 11.37 1.8 12.63 2.59 13.41L10.59 21.41C11.37 22.2 12.63 22.2 13.41 21.41L21.41 13.41C22.2 12.63 22.2 11.37 21.41 10.59L13.41 2.59C13 2.19 12.5 2 12 2M12 4L20 12L12 20L4 12L12 4M12 7C9.24 7 7 9.24 7 12S9.24 17 12 17 17 14.76 17 12 14.76 7 12 7M12 9C13.66 9 15 10.34 15 12S13.66 15 12 15 9 13.66 9 12 10.34 9 12 9Z"/>
            </svg>
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent"></div>
            <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C11.5 2 11 2.19 10.59 2.59L2.59 10.59C1.8 11.37 1.8 12.63 2.59 13.41L10.59 21.41C11.37 22.2 12.63 22.2 13.41 21.41L21.41 13.41C22.2 12.63 22.2 11.37 21.41 10.59L13.41 2.59C13 2.19 12.5 2 12 2M12 4L20 12L12 20L4 12L12 4M12 7C9.24 7 7 9.24 7 12S9.24 17 12 17 17 14.76 17 12 14.76 7 12 7M12 9C13.66 9 15 10.34 15 12S13.66 15 12 15 9 13.66 9 12 10.34 9 12 9Z"/>
            </svg>
          </div>

          {/* 신랑신부 이름 */}
          <div className="space-y-6 mb-10">
            <h1 className="text-4xl md:text-5xl text-green-800 tracking-wide" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
              {data.groomName}
            </h1>
            <div className="flex items-center justify-center gap-3">
              <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
            <h1 className="text-4xl md:text-5xl text-green-800 tracking-wide" style={{ fontFamily: 'Noto Sans KR, sans-serif' }}>
              {data.brideName}
            </h1>
          </div>

          {/* 날짜 */}
          <div className="mt-10 py-5 px-8 bg-white/70 backdrop-blur-md rounded-full inline-block soft-glow">
            <p className="text-sm text-green-700 font-medium">
              {data.weddingDate}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Greeting Section */}
      <section className="section-animate py-24 px-6 bg-white/60 leaf-pattern">
        <div className="max-w-2xl mx-auto text-center">
          {/* 나뭇잎 장식 */}
          <div className="mb-10">
            <svg className="w-16 h-16 text-green-500 mx-auto opacity-60" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
            </svg>
          </div>

          <h2 className="text-2xl md:text-3xl text-green-900 mb-8 leading-relaxed font-normal">
            {data.greetingMessage || '봄날의 햇살처럼 따뜻한\n사랑을 약속합니다'}
          </h2>

          <p className="text-base leading-loose text-green-800 whitespace-pre-line">
            {data.greetingDetail || '서로를 아껴주며 존중하는 마음으로\n아름다운 가정을 이루려 합니다.\n\n따뜻한 마음으로 축복해 주시면\n큰 기쁨이 되겠습니다.'}
          </p>

          {/* 하단 장식 */}
          <div className="mt-10 flex justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-green-400 opacity-40"></div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Bride & Groom Section */}
      <section className="section-animate py-20 px-6 bg-gradient-to-b from-amber-50/50 to-green-50/50">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Groom */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-center shadow-lg soft-glow border border-green-100">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                  <svg className="w-10 h-10 text-green-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
                  </svg>
                </div>
                <p className="text-xs text-green-600 uppercase tracking-wider mb-3">Groom</p>
                <h3 className="text-2xl text-green-900 mb-3 font-medium">{data.groomName}</h3>
                <div className="flex justify-center gap-1 mb-4">
                  <div className="w-2 h-2 rounded-full bg-green-300"></div>
                  <div className="w-2 h-2 rounded-full bg-amber-300"></div>
                  <div className="w-2 h-2 rounded-full bg-green-300"></div>
                </div>
                <p className="text-sm text-green-700 leading-relaxed">
                  {data.groomParents}
                </p>
              </div>

              {data.groomPhone && (
                <button className="mt-4 px-8 py-2.5 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200 transition-all duration-300 border border-green-200">
                  연락하기
                </button>
              )}
            </div>

            {/* Bride */}
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 text-center shadow-lg soft-glow border border-green-100">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                  <svg className="w-10 h-10 text-green-700" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
                  </svg>
                </div>
                <p className="text-xs text-green-600 uppercase tracking-wider mb-3">Bride</p>
                <h3 className="text-2xl text-green-900 mb-3 font-medium">{data.brideName}</h3>
                <div className="flex justify-center gap-1 mb-4">
                  <div className="w-2 h-2 rounded-full bg-green-300"></div>
                  <div className="w-2 h-2 rounded-full bg-amber-300"></div>
                  <div className="w-2 h-2 rounded-full bg-green-300"></div>
                </div>
                <p className="text-sm text-green-700 leading-relaxed">
                  {data.brideParents}
                </p>
              </div>

              {data.bridePhone && (
                <button className="mt-4 px-8 py-2.5 bg-green-100 text-green-800 rounded-full text-sm hover:bg-green-200 transition-all duration-300 border border-green-200">
                  연락하기
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Schedule Section */}
      <section className="section-animate py-24 px-6 bg-white leaf-pattern">
        <div className="max-w-2xl mx-auto">
          {/* 타이틀 */}
          <div className="text-center mb-12">
            <svg className="w-12 h-12 text-green-500 mx-auto mb-4 opacity-60" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1M17,12H12V17H17V12Z"/>
            </svg>
            <h2 className="text-3xl text-green-900 font-normal">일정 & 장소</h2>
          </div>

          {/* 날짜 및 시간 */}
          <div className="text-center mb-12 py-6 bg-green-50/50 rounded-2xl">
            <p className="text-xl text-green-900 mb-2 font-medium">{data.weddingDate}</p>
            <p className="text-base text-green-700">{data.weddingTime}</p>
          </div>

          {/* 장소 정보 카드 */}
          <div className="bg-gradient-to-br from-white to-green-50/30 rounded-3xl p-10 shadow-xl soft-glow border border-green-100">
            <div className="text-center space-y-4 mb-8">
              <div className="inline-block p-4 bg-green-100 rounded-full mb-2">
                <svg className="w-8 h-8 text-green-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"/>
                </svg>
              </div>
              <h3 className="text-2xl text-green-900 font-medium">{data.venueName}</h3>
              <p className="text-sm text-green-700 leading-relaxed">{data.venueAddress}</p>
              {data.venueDetail && (
                <p className="text-xs text-green-600">{data.venueDetail}</p>
              )}
            </div>

            <div className="text-center pt-6 border-t border-green-200/50">
              <button className="px-12 py-3.5 bg-green-600 text-white rounded-full text-sm font-medium hover:bg-green-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                오시는 길 안내
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Gallery Section */}
      <section className="section-animate py-20 px-6 bg-gradient-to-b from-green-50/30 to-amber-50/30 leaf-pattern">
        <div className="max-w-5xl mx-auto">
          {/* 타이틀 */}
          <div className="text-center mb-12">
            <div className="flex justify-center gap-2 mb-4">
              <svg className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2L9,8.5L2,9.5L7,14.5L5.5,21.5L12,18L18.5,21.5L17,14.5L22,9.5L15,8.5L12,2Z"/>
              </svg>
              <svg className="w-6 h-6 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2L9,8.5L2,9.5L7,14.5L5.5,21.5L12,18L18.5,21.5L17,14.5L22,9.5L15,8.5L12,2Z"/>
              </svg>
              <svg className="w-6 h-6 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2L9,8.5L2,9.5L7,14.5L5.5,21.5L12,18L18.5,21.5L17,14.5L22,9.5L15,8.5L12,2Z"/>
              </svg>
            </div>
            <h2 className="text-3xl text-green-900 font-normal">우리의 순간들</h2>
          </div>

          {/* 갤러리 그리드 */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {data.galleryImages?.map((img, idx) => (
              <div
                key={idx}
                className="aspect-square overflow-hidden rounded-2xl shadow-lg group relative"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-green-900/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <img
                  src={img}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-full object-cover brightness-105 group-hover:scale-110 transition-all duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Footer Section */}
      <section className="section-animate py-24 px-6 bg-white leaf-pattern">
        <div className="max-w-2xl mx-auto text-center">
          {/* 플라워 장식 */}
          <div className="mb-10 flex justify-center gap-3">
            <svg className="w-10 h-10 text-green-400 opacity-60" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3,13A9,9 0 0,0 12,22A9,9 0 0,0 3,13M12,22A9,9 0 0,0 21,13A9,9 0 0,0 12,22M18,3V8A6,6 0 0,1 12,14A6,6 0 0,1 6,8V3C6.74,3 7.47,3.12 8.16,3.39C8.71,3.62 9.2,3.96 9.61,4.39L12,2L14.39,4.39C14.8,3.96 15.29,3.62 15.84,3.39C16.53,3.12 17.26,3 18,3Z"/>
            </svg>
            <svg className="w-10 h-10 text-amber-400 opacity-60" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <svg className="w-10 h-10 text-green-400 opacity-60" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3,13A9,9 0 0,0 12,22A9,9 0 0,0 3,13M12,22A9,9 0 0,0 21,13A9,9 0 0,0 12,22M18,3V8A6,6 0 0,1 12,14A6,6 0 0,1 6,8V3C6.74,3 7.47,3.12 8.16,3.39C8.71,3.62 9.2,3.96 9.61,4.39L12,2L14.39,4.39C14.8,3.96 15.29,3.62 15.84,3.39C16.53,3.12 17.26,3 18,3Z"/>
            </svg>
          </div>

          <p className="text-xl text-green-900 leading-relaxed mb-6 whitespace-pre-line font-normal">
            {data.footerMessage || '소중한 시간 내어 주셔서\n감사합니다'}
          </p>

          <p className="text-base text-green-700 mb-10">
            {data.brideName} & {data.groomName}
          </p>

          <div className="w-32 h-px bg-gradient-to-r from-transparent via-green-400 to-transparent mx-auto mb-10"></div>

          {/* 공유 버튼 */}
          <button className="px-12 py-3.5 bg-green-100 text-green-800 rounded-full text-sm font-medium hover:bg-green-200 transition-all duration-300 border border-green-200 shadow-md">
            초대장 공유하기
          </button>

          {/* 하단 나뭇잎 장식 */}
          <div className="mt-16 flex justify-center gap-2">
            {[...Array(7)].map((_, i) => (
              <svg key={i} className="w-4 h-4 text-green-300 opacity-40" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z"/>
              </svg>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NatureGardenTemplate;
