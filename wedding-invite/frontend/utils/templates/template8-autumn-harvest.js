// 템플릿 8: Autumn Harvest
import { useState, useEffect } from 'react';

const AutumnHarvestTemplate = ({ data }) => {
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
    <div className="min-h-screen bg-gradient-to-br from-orange-100 to-red-100 text-orange-900">
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
      <section className="section-animate relative h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-orange-100 via-red-100 to-yellow-100">
        {data.heroImage && (
          <div className="absolute inset-0 opacity-35">
            <img src={data.heroImage} alt="Hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent"></div>
          </div>
        )}
        <div className="relative z-10 text-center space-y-6">
          <div className="text-6xl mb-4">🍂</div>
          <h1 className="text-4xl md:text-5xl font-medium tracking-wide text-orange-900">{data.brideName}</h1>
          <div className="flex items-center justify-center gap-4">
            <div className="w-10 h-1 bg-orange-400 opacity-30 shadow-sm"></div>
            <span className="text-2xl text-orange-700">&</span>
            <div className="w-10 h-1 bg-orange-400 opacity-30 shadow-sm"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-medium tracking-wide text-orange-900">{data.groomName}</h1>
          <div className="w-20 h-1 bg-orange-400 mx-auto mt-10 opacity-30 shadow-sm"></div>
          <p className="text-orange-800 text-base font-medium mt-8">{data.weddingDate}</p>
          <p className="text-orange-700/90 text-sm">{data.venueName}</p>
        </div>
      </section>

      {/* 2. Greeting Section */}
      <section className="section-animate py-20 px-6 max-w-xl mx-auto text-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-3">
            <span className="text-2xl">🍁</span>
            <span className="text-sm text-orange-700 font-medium tracking-wide">Autumn Wedding</span>
            <span className="text-2xl">🍁</span>
          </div>
          <h2 className="text-2xl font-medium tracking-wide leading-relaxed text-orange-900">
            {data.greetingMessage || '가을 단풍처럼\n아름다운 사랑을 맺습니다'}
          </h2>
          <p className="text-orange-800 text-sm leading-loose font-medium">
            {data.greetingDetail || '풍요로운 가을의 결실처럼\n저희 두 사람의 사랑도\n아름답게 익어갑니다.\n따뜻한 마음으로\n축복해 주시면 감사하겠습니다.'}
          </p>
        </div>
      </section>

      {/* 3. Bride & Groom Section */}
      <section className="section-animate py-16 px-6 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Groom */}
            <div className="text-center space-y-5 p-8 bg-white/80 rounded-2xl border border-orange-300 shadow-xl shadow-orange-400/40">
              <div className="w-14 h-14 mx-auto bg-orange-100 rounded-full flex items-center justify-center shadow-md shadow-orange-400/40">
                <span className="text-3xl">🤵</span>
              </div>
              <div>
                <p className="text-xs text-orange-700/90 font-medium">Groom</p>
                <h3 className="text-2xl mt-2 font-medium tracking-wide text-orange-900">{data.groomName}</h3>
                <p className="text-sm text-orange-700 mt-2">{data.groomParents}</p>
              </div>
              {data.groomPhone && (
                <button className="mt-5 px-6 py-2 bg-orange-100 text-orange-900 hover:bg-orange-200 border border-orange-300 rounded-full text-sm font-medium tracking-wide transition-colors">
                  연락하기
                </button>
              )}
            </div>

            {/* Bride */}
            <div className="text-center space-y-5 p-8 bg-white/80 rounded-2xl border border-orange-300 shadow-xl shadow-orange-400/40">
              <div className="w-14 h-14 mx-auto bg-orange-100 rounded-full flex items-center justify-center shadow-md shadow-orange-400/40">
                <span className="text-3xl">👰</span>
              </div>
              <div>
                <p className="text-xs text-orange-700/90 font-medium">Bride</p>
                <h3 className="text-2xl mt-2 font-medium tracking-wide text-orange-900">{data.brideName}</h3>
                <p className="text-sm text-orange-700 mt-2">{data.brideParents}</p>
              </div>
              {data.bridePhone && (
                <button className="mt-5 px-6 py-2 bg-orange-100 text-orange-900 hover:bg-orange-200 border border-orange-300 rounded-full text-sm font-medium tracking-wide transition-colors">
                  연락하기
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Schedule Section */}
      <section className="section-animate py-20 px-6">
        <div className="max-w-xl mx-auto text-center space-y-8">
          <h2 className="text-3xl font-medium tracking-wide">일정 & 장소</h2>
          <div className="w-20 h-1 bg-orange-400 mx-auto opacity-30 shadow-sm"></div>

          <div className="space-y-4 mt-10">
            <p className="text-xl font-medium text-orange-900">{data.weddingDate}</p>
            <p className="text-orange-800 text-sm font-medium">{data.weddingTime}</p>
          </div>

          <div className="mt-10 p-8 bg-white/80 rounded-2xl border border-orange-300 shadow-xl shadow-orange-400/40">
            <h3 className="text-xl font-medium tracking-wide text-orange-900 mb-2">{data.venueName}</h3>
            <p className="text-sm text-orange-800">{data.venueAddress}</p>
            {data.venueDetail && <p className="text-xs text-orange-700 mt-2">{data.venueDetail}</p>}

            <button className="mt-8 px-8 py-3 bg-orange-100 hover:bg-orange-200 text-orange-900 border border-orange-300 rounded-full text-sm font-medium tracking-wide transition-colors">
              오시는 길
            </button>
          </div>
        </div>
      </section>

      {/* 5. Gallery Section */}
      <section className="section-animate py-16 px-6 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-medium tracking-wide text-center mb-6">Harvest Memories</h2>
          <div className="w-20 h-1 bg-orange-400 mx-auto mb-12 opacity-30 shadow-sm"></div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.galleryImages?.map((img, idx) => (
              <div key={idx} className="aspect-square overflow-hidden rounded-2xl border border-orange-300 hover:border-orange-500 transition-all shadow-xl shadow-orange-400/40 hover:shadow-orange-500/50">
                <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Footer Section */}
      <section className="section-animate py-20 px-6 text-center">
        <div className="max-w-xl mx-auto space-y-8">
          <div className="text-4xl mb-4">🍂</div>
          <p className="text-lg font-medium tracking-wide leading-relaxed text-orange-900">
            {data.footerMessage || '가을의 풍요로움처럼\n따뜻한 마음 감사합니다'}
          </p>
          <p className="text-sm text-orange-700">{data.brideName} & {data.groomName}</p>

          <div className="flex justify-center gap-4 mt-10">
            <button className="px-8 py-3 bg-orange-100 hover:bg-orange-200 text-orange-900 border border-orange-300 rounded-full text-sm font-medium tracking-wide transition-colors">
              초대장 공유
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AutumnHarvestTemplate;
