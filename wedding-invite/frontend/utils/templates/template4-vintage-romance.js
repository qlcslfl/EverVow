// 템플릿 4: Vintage Romance - 빈티지 로맨스 스타일
import { useState, useEffect } from 'react';

const VintageRomanceTemplate = ({ data }) => {
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
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-rose-50 text-stone-800 font-serif">
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1.1s ease-out forwards;
        }
        .section-animate {
          opacity: 0;
        }
        .vintage-paper {
          background-image:
            linear-gradient(0deg, transparent 24%, rgba(139, 92, 60, 0.02) 25%, rgba(139, 92, 60, 0.02) 26%, transparent 27%, transparent 74%, rgba(139, 92, 60, 0.02) 75%, rgba(139, 92, 60, 0.02) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(139, 92, 60, 0.02) 25%, rgba(139, 92, 60, 0.02) 26%, transparent 27%, transparent 74%, rgba(139, 92, 60, 0.02) 75%, rgba(139, 92, 60, 0.02) 76%, transparent 77%, transparent);
          background-size: 50px 50px;
        }
        .vintage-border {
          border: 2px solid;
          border-image: repeating-linear-gradient(45deg, #8B5C3C, #8B5C3C 10px, transparent 10px, transparent 20px) 1;
        }
        .film-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
        }
        .ornamental-line {
          background: linear-gradient(90deg, transparent, rgba(139, 92, 60, 0.3), transparent);
          height: 1px;
        }
      `}</style>

      {/* 1. Hero Section */}
      <section className="section-animate relative min-h-screen flex flex-col items-center justify-center px-8 py-20 vintage-paper film-grain">
        {data.heroImage && (
          <div className="absolute inset-0 opacity-20">
            <img src={data.heroImage} alt="Hero" className="w-full h-full object-cover sepia-[0.4] grayscale-[0.2]" />
            <div className="absolute inset-0 bg-gradient-to-b from-amber-50/80 via-transparent to-amber-50/80"></div>
          </div>
        )}

        <div className="relative z-10 text-center max-w-xl mx-auto">
          {/* 빈티지 장식 프레임 */}
          <div className="mb-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-stone-400 to-transparent"></div>
              <svg className="w-5 h-5 text-rose-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-stone-400 to-transparent"></div>
            </div>
          </div>

          {/* 메인 타이틀 */}
          <div className="border-4 border-double border-stone-300 bg-white/70 backdrop-blur-sm p-10 shadow-2xl">
            <p className="text-xs tracking-[0.3em] text-stone-500 uppercase mb-6 font-light">Wedding Invitation</p>

            <div className="space-y-5">
              <h1 className="text-4xl md:text-5xl font-serif italic text-stone-700" style={{ fontFamily: 'Georgia, serif' }}>
                {data.groomName}
              </h1>

              <div className="flex items-center justify-center gap-4 my-6">
                <svg className="w-4 h-4 text-rose-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2L9,8.5L2,9.5L7,14.5L5.5,21.5L12,18L18.5,21.5L17,14.5L22,9.5L15,8.5L12,2Z"/>
                </svg>
                <span className="text-xl text-stone-500 font-light">&</span>
                <svg className="w-4 h-4 text-rose-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,2L9,8.5L2,9.5L7,14.5L5.5,21.5L12,18L18.5,21.5L17,14.5L22,9.5L15,8.5L12,2Z"/>
                </svg>
              </div>

              <h1 className="text-4xl md:text-5xl font-serif italic text-stone-700" style={{ fontFamily: 'Georgia, serif' }}>
                {data.brideName}
              </h1>
            </div>

            <div className="ornamental-line w-24 mx-auto my-6"></div>

            <p className="text-sm text-stone-600 tracking-wider">
              {data.weddingDate}
            </p>
          </div>

          {/* 하단 장식 */}
          <div className="mt-8 flex justify-center gap-2">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-stone-400"></div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Greeting Section */}
      <section className="section-animate py-24 px-8 bg-gradient-to-b from-rose-50/30 to-amber-50/30 vintage-paper">
        <div className="max-w-2xl mx-auto text-center">
          {/* 빈티지 장식 */}
          <div className="mb-10">
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-12 h-px bg-stone-300"></div>
              <svg className="w-8 h-8 text-rose-400 opacity-60" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2C11.5,2 11,2.19 10.59,2.59L2.59,10.59C1.8,11.37 1.8,12.63 2.59,13.41L10.59,21.41C11.37,22.2 12.63,22.2 13.41,21.41L21.41,13.41C22.2,12.63 22.2,11.37 21.41,10.59L13.41,2.59C13,2.19 12.5,2 12,2Z"/>
              </svg>
              <div className="w-12 h-px bg-stone-300"></div>
            </div>
          </div>

          <div className="bg-white/60 backdrop-blur-sm border-2 border-stone-200 p-10 shadow-xl">
            <h2 className="text-2xl md:text-3xl font-serif italic text-stone-700 mb-8 leading-relaxed">
              {data.greetingMessage || '우리의 사랑이\n영원히 피어나기를'}
            </h2>

            <div className="ornamental-line w-20 mx-auto my-6"></div>

            <p className="text-base leading-loose text-stone-600 whitespace-pre-line font-light">
              {data.greetingDetail || '두 사람의 작은 만남이\n아름다운 사랑으로 꽃피워\n이제 결실을 맺게 되었습니다.\n\n저희의 첫 걸음을 따뜻하게\n지켜봐 주시면 감사하겠습니다.'}
            </p>
          </div>

          {/* 하단 장식 */}
          <div className="mt-8 flex justify-center gap-3">
            <svg className="w-5 h-5 text-rose-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <svg className="w-5 h-5 text-amber-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
            <svg className="w-5 h-5 text-rose-300" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
            </svg>
          </div>
        </div>
      </section>

      {/* 3. Bride & Groom Section */}
      <section className="section-animate py-20 px-8 bg-white film-grain">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Groom */}
            <div className="bg-gradient-to-br from-amber-50/80 to-white border-4 border-double border-stone-300 p-10 text-center shadow-2xl">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full border-4 border-double border-stone-300 bg-white flex items-center justify-center shadow-lg">
                  <svg className="w-10 h-10 text-stone-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
                  </svg>
                </div>

                <div className="ornamental-line w-16 mx-auto mb-4"></div>

                <p className="text-xs tracking-[0.2em] text-stone-500 uppercase mb-3">Groom</p>
                <h3 className="text-3xl font-serif italic text-stone-700 mb-3">{data.groomName}</h3>

                <div className="flex justify-center gap-1 my-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-300"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-300"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-300"></div>
                </div>

                <p className="text-sm text-stone-600 leading-relaxed">
                  {data.groomParents}
                </p>
              </div>

              {data.groomPhone && (
                <button className="mt-6 px-8 py-2.5 border-2 border-stone-400 text-stone-700 text-sm font-serif hover:bg-stone-100 transition-all duration-300 shadow-md">
                  연락하기
                </button>
              )}
            </div>

            {/* Bride */}
            <div className="bg-gradient-to-br from-rose-50/80 to-white border-4 border-double border-stone-300 p-10 text-center shadow-2xl">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full border-4 border-double border-stone-300 bg-white flex items-center justify-center shadow-lg">
                  <svg className="w-10 h-10 text-stone-600" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12,4A4,4 0 0,1 16,8A4,4 0 0,1 12,12A4,4 0 0,1 8,8A4,4 0 0,1 12,4M12,14C16.42,14 20,15.79 20,18V20H4V18C4,15.79 7.58,14 12,14Z"/>
                  </svg>
                </div>

                <div className="ornamental-line w-16 mx-auto mb-4"></div>

                <p className="text-xs tracking-[0.2em] text-stone-500 uppercase mb-3">Bride</p>
                <h3 className="text-3xl font-serif italic text-stone-700 mb-3">{data.brideName}</h3>

                <div className="flex justify-center gap-1 my-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-300"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-300"></div>
                  <div className="w-1.5 h-1.5 rounded-full bg-rose-300"></div>
                </div>

                <p className="text-sm text-stone-600 leading-relaxed">
                  {data.brideParents}
                </p>
              </div>

              {data.bridePhone && (
                <button className="mt-6 px-8 py-2.5 border-2 border-stone-400 text-stone-700 text-sm font-serif hover:bg-stone-100 transition-all duration-300 shadow-md">
                  연락하기
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Schedule Section */}
      <section className="section-animate py-24 px-8 bg-gradient-to-b from-amber-50/30 to-rose-50/30 vintage-paper">
        <div className="max-w-2xl mx-auto">
          {/* 타이틀 */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-16 h-px bg-stone-300"></div>
              <svg className="w-6 h-6 text-amber-500 opacity-60" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19,19H5V8H19M16,1V3H8V1H6V3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3H18V1"/>
              </svg>
              <div className="w-16 h-px bg-stone-300"></div>
            </div>
            <h2 className="text-3xl font-serif italic text-stone-700">일정 & 장소</h2>
          </div>

          {/* 날짜 및 시간 */}
          <div className="text-center mb-12 py-8 bg-white/70 backdrop-blur-sm border-2 border-stone-200 shadow-lg">
            <p className="text-2xl font-serif italic text-stone-700 mb-3">{data.weddingDate}</p>
            <div className="ornamental-line w-20 mx-auto my-4"></div>
            <p className="text-base text-stone-600">{data.weddingTime}</p>
          </div>

          {/* 장소 정보 카드 */}
          <div className="bg-white/80 backdrop-blur-sm border-4 border-double border-stone-300 p-10 shadow-2xl">
            <div className="text-center space-y-4 mb-8">
              <div className="inline-block p-4 bg-stone-100 rounded-full mb-4 border-2 border-stone-300">
                <svg className="w-8 h-8 text-stone-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12,11.5A2.5,2.5 0 0,1 9.5,9A2.5,2.5 0 0,1 12,6.5A2.5,2.5 0 0,1 14.5,9A2.5,2.5 0 0,1 12,11.5M12,2A7,7 0 0,0 5,9C5,14.25 12,22 12,22C12,22 19,14.25 19,9A7,7 0 0,0 12,2Z"/>
                </svg>
              </div>
              <h3 className="text-2xl font-serif italic text-stone-700">{data.venueName}</h3>
              <div className="ornamental-line w-16 mx-auto"></div>
              <p className="text-sm text-stone-600 leading-relaxed">{data.venueAddress}</p>
              {data.venueDetail && (
                <p className="text-xs text-stone-500 italic">{data.venueDetail}</p>
              )}
            </div>

            <div className="text-center pt-6 border-t-2 border-stone-200">
              <button className="px-12 py-3 bg-stone-600 text-white text-sm font-serif hover:bg-stone-700 transition-all duration-300 shadow-lg">
                오시는 길
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Gallery Section */}
      <section className="section-animate py-20 px-8 bg-white film-grain">
        <div className="max-w-5xl mx-auto">
          {/* 타이틀 */}
          <div className="text-center mb-12">
            <div className="ornamental-line w-32 mx-auto mb-6"></div>
            <h2 className="text-3xl font-serif italic text-stone-700">Our Story</h2>
            <div className="ornamental-line w-32 mx-auto mt-6"></div>
          </div>

          {/* 갤러리 그리드 */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {data.galleryImages?.map((img, idx) => (
              <div
                key={idx}
                className="aspect-square overflow-hidden border-8 border-white shadow-2xl group relative"
                style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.2), inset 0 0 0 1px rgba(139, 92, 60, 0.1)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-amber-100/20 to-rose-100/20 z-10 mix-blend-multiply"></div>
                <img
                  src={img}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-full object-cover sepia-[0.3] contrast-[1.1] brightness-[1.05] group-hover:scale-105 transition-all duration-700"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Footer Section */}
      <section className="section-animate py-24 px-8 bg-gradient-to-b from-rose-50/30 to-amber-50/30 vintage-paper">
        <div className="max-w-2xl mx-auto text-center">
          {/* 빈티지 장식 */}
          <div className="mb-10">
            <div className="flex items-center justify-center gap-4">
              <svg className="w-6 h-6 text-rose-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
              <div className="w-20 h-px bg-stone-300"></div>
              <svg className="w-5 h-5 text-amber-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12,2L9,8.5L2,9.5L7,14.5L5.5,21.5L12,18L18.5,21.5L17,14.5L22,9.5L15,8.5L12,2Z"/>
              </svg>
              <div className="w-20 h-px bg-stone-300"></div>
              <svg className="w-6 h-6 text-rose-300" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
              </svg>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm border-2 border-stone-200 p-10 shadow-xl">
            <p className="text-xl font-serif italic leading-relaxed text-stone-700 mb-6 whitespace-pre-line">
              {data.footerMessage || '사랑하는 마음으로\n함께해 주셔서 감사합니다'}
            </p>

            <div className="ornamental-line w-24 mx-auto my-6"></div>

            <p className="text-base text-stone-600 font-serif italic mb-10">
              {data.brideName} & {data.groomName}
            </p>

            {/* 공유 버튼 */}
            <button className="px-12 py-3 border-2 border-stone-400 text-stone-700 text-sm font-serif hover:bg-stone-100 transition-all duration-300 shadow-md">
              초대장 공유하기
            </button>
          </div>

          {/* 하단 장식 */}
          <div className="mt-12 flex justify-center gap-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-1 h-1 rounded-full bg-stone-400"></div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default VintageRomanceTemplate;
