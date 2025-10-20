// 템플릿 5: Luxury Gold - 럭셔리 골드 스타일
import { useState, useEffect } from 'react';

const LuxuryGoldTemplate = ({ data }) => {
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
    <div className="min-h-screen bg-gradient-to-br from-amber-100 to-yellow-200 text-amber-900">
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        .section-animate {
          opacity: 0;
        }
      `}</style>

      {/* 1. Hero Section */}
      <section className="section-animate relative h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-yellow-50 via-amber-100 to-yellow-100">
        {data.heroImage && (
          <div className="absolute inset-0 opacity-30">
            <img src={data.heroImage} alt="Hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-amber-900/10 to-transparent"></div>
          </div>
        )}
        <div className="relative z-10 text-center space-y-6">
          <div className="text-6xl mb-6">✨</div>
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-amber-900">{data.brideName}</h1>
          <div className="w-32 h-1.5 bg-amber-500 mx-auto shadow-md opacity-30"></div>
          <div className="text-3xl text-amber-700 font-semibold">&</div>
          <div className="w-32 h-1.5 bg-amber-500 mx-auto shadow-md opacity-30"></div>
          <h1 className="text-5xl md:text-6xl font-semibold tracking-tight text-amber-900">{data.groomName}</h1>
          <p className="text-amber-700 text-base font-medium mt-10">{data.weddingDate}</p>
          <p className="text-amber-800 text-sm font-semibold">{data.venueName}</p>
        </div>
      </section>

      {/* 2. Greeting Section */}
      <section className="section-animate py-24 px-6 max-w-2xl mx-auto text-center bg-gradient-to-br from-amber-50 via-yellow-100 to-amber-100">
        <div className="space-y-10">
          <div className="inline-block px-10 py-4 bg-amber-200 rounded-lg shadow-lg shadow-amber-400/50">
            <span className="text-sm text-amber-900 font-semibold tracking-tight">Wedding Invitation</span>
          </div>
          <h2 className="text-3xl font-semibold tracking-tight leading-relaxed text-amber-900">
            {data.greetingMessage || '빛나는 순간을\n함께하고 싶습니다'}
          </h2>
          <div className="w-28 h-1.5 bg-amber-500 mx-auto shadow-md opacity-30"></div>
          <p className="text-amber-800 text-base leading-loose font-medium">
            {data.greetingDetail || '찬란한 사랑으로 하나 되어\n영원을 약속하는 날\n소중한 분들을 모시고자 합니다.\n축복으로 빛내주시면\n감사하겠습니다.'}
          </p>
        </div>
      </section>

      {/* 3. Bride & Groom Section */}
      <section className="section-animate py-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Groom */}
            <div className="text-center space-y-6 p-10 bg-gradient-to-br from-amber-50 via-yellow-100 to-amber-100 rounded-2xl border-2 border-amber-300 shadow-2xl shadow-amber-400/50">
              <div className="w-16 h-16 mx-auto bg-amber-200 rounded-full flex items-center justify-center shadow-lg shadow-amber-400/50">
                <span className="text-4xl">🤵</span>
              </div>
              <div>
                <p className="text-xs text-amber-700 font-medium">Groom</p>
                <h3 className="text-3xl mt-3 font-semibold tracking-tight text-amber-900">{data.groomName}</h3>
                <p className="text-sm text-amber-800 mt-2 font-medium">{data.groomParents}</p>
              </div>
              {data.groomPhone && (
                <button className="mt-6 px-8 py-3 bg-amber-200 text-amber-900 hover:bg-amber-300 border border-amber-400 rounded-lg text-sm font-semibold transition-colors shadow-md">
                  연락하기
                </button>
              )}
            </div>

            {/* Bride */}
            <div className="text-center space-y-6 p-10 bg-gradient-to-br from-amber-50 via-yellow-100 to-amber-100 rounded-2xl border-2 border-amber-300 shadow-2xl shadow-amber-400/50">
              <div className="w-16 h-16 mx-auto bg-amber-200 rounded-full flex items-center justify-center shadow-lg shadow-amber-400/50">
                <span className="text-4xl">👰</span>
              </div>
              <div>
                <p className="text-xs text-amber-700 font-medium">Bride</p>
                <h3 className="text-3xl mt-3 font-semibold tracking-tight text-amber-900">{data.brideName}</h3>
                <p className="text-sm text-amber-800 mt-2 font-medium">{data.brideParents}</p>
              </div>
              {data.bridePhone && (
                <button className="mt-6 px-8 py-3 bg-amber-200 text-amber-900 hover:bg-amber-300 border border-amber-400 rounded-lg text-sm font-semibold transition-colors shadow-md">
                  연락하기
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Schedule Section */}
      <section className="section-animate py-24 px-6 bg-gradient-to-br from-amber-50 via-yellow-100 to-amber-100">
        <div className="max-w-2xl mx-auto text-center space-y-10">
          <h2 className="text-4xl font-semibold tracking-tight">일정 & 장소</h2>
          <div className="w-32 h-1.5 bg-amber-500 mx-auto shadow-md opacity-30"></div>

          <div className="space-y-5 mt-12">
            <p className="text-2xl font-semibold text-amber-900">{data.weddingDate}</p>
            <p className="text-amber-700 text-base font-medium">{data.weddingTime}</p>
          </div>

          <div className="mt-12 p-10 bg-white/80 rounded-2xl border-2 border-amber-300 shadow-2xl shadow-amber-400/50">
            <h3 className="text-2xl font-semibold tracking-tight text-amber-900 mb-3">{data.venueName}</h3>
            <p className="text-sm text-amber-800 font-medium">{data.venueAddress}</p>
            {data.venueDetail && <p className="text-xs text-amber-700 mt-3">{data.venueDetail}</p>}

            <button className="mt-10 px-12 py-4 bg-amber-200 hover:bg-amber-300 text-amber-900 border border-amber-400 rounded-lg text-sm font-semibold transition-colors shadow-lg">
              지도 보기
            </button>
          </div>
        </div>
      </section>

      {/* 5. Gallery Section */}
      <section className="section-animate py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-semibold tracking-tight text-center mb-8">Gallery</h2>
          <div className="w-32 h-1.5 bg-amber-500 mx-auto mb-16 shadow-md opacity-30"></div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.galleryImages?.map((img, idx) => (
              <div key={idx} className="aspect-square overflow-hidden rounded-2xl border-2 border-amber-300 hover:border-amber-400 transition-all shadow-2xl shadow-amber-400/50 hover:shadow-amber-500/60">
                <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Footer Section */}
      <section className="section-animate py-24 px-6 text-center bg-gradient-to-br from-amber-50 via-yellow-100 to-amber-100">
        <div className="max-w-2xl mx-auto space-y-10">
          <div className="text-5xl mb-6">✨</div>
          <p className="text-xl font-semibold tracking-tight leading-relaxed text-amber-900">
            {data.footerMessage || '찬란한 축복으로\n빛내주셔서 감사합니다'}
          </p>
          <p className="text-base text-amber-800 font-medium">{data.brideName} & {data.groomName}</p>

          <div className="flex justify-center gap-4 mt-12">
            <button className="px-10 py-4 bg-amber-200 hover:bg-amber-300 text-amber-900 border border-amber-400 rounded-lg text-sm font-semibold transition-colors shadow-lg">
              초대장 공유
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LuxuryGoldTemplate;
