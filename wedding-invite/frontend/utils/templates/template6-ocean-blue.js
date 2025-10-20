// 템플릿 6: Ocean Blue - 오션 블루 스타일
import { useState, useEffect } from 'react';

const OceanBlueTemplate = ({ data }) => {
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
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-100 text-cyan-900">
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.9s ease-out forwards;
        }
        .section-animate {
          opacity: 0;
        }
      `}</style>

      {/* 1. Hero Section */}
      <section className="section-animate relative h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-white via-blue-50 to-cyan-50">
        {data.heroImage && (
          <div className="absolute inset-0 opacity-25">
            <img src={data.heroImage} alt="Hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-b from-white/60 to-transparent backdrop-brightness-110"></div>
          </div>
        )}
        <div className="relative z-10 text-center space-y-6">
          <div className="text-6xl mb-4">🌊</div>
          <h1 className="text-4xl md:text-5xl font-normal text-cyan-900">{data.brideName}</h1>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-1 bg-cyan-400 opacity-20"></div>
            <span className="text-2xl text-cyan-700">&</span>
            <div className="w-12 h-1 bg-cyan-400 opacity-20"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-normal text-cyan-900">{data.groomName}</h1>
          <div className="w-20 h-1 bg-cyan-400 mx-auto mt-10 opacity-20"></div>
          <p className="text-cyan-700 text-base mt-8">{data.weddingDate}</p>
          <p className="text-cyan-600 text-sm">{data.venueName}</p>
        </div>
      </section>

      {/* 2. Greeting Section */}
      <section className="section-animate py-20 px-6 max-w-xl mx-auto text-center">
        <div className="space-y-8">
          <div className="inline-flex items-center gap-3">
            <span className="text-2xl">💙</span>
            <span className="text-sm text-cyan-700">Wedding Invitation</span>
            <span className="text-2xl">💙</span>
          </div>
          <h2 className="text-2xl font-normal leading-relaxed text-cyan-900">
            {data.greetingMessage || '푸른 바다처럼 넓고\n깊은 사랑을 시작합니다'}
          </h2>
          <p className="text-cyan-800 text-sm leading-loose">
            {data.greetingDetail || '맑고 투명한 마음으로\n서로를 사랑하며 살아가겠습니다.\n저희의 새로운 출발을\n축복해 주시면 감사하겠습니다.'}
          </p>
        </div>
      </section>

      {/* 3. Bride & Groom Section */}
      <section className="section-animate py-16 px-6 bg-gradient-to-br from-white via-blue-50 to-cyan-100">
        <div className="max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Groom */}
            <div className="text-center space-y-5 p-8 bg-white/80 rounded-2xl border border-cyan-200 shadow-lg shadow-cyan-300/40 backdrop-brightness-105">
              <div className="w-14 h-14 mx-auto bg-cyan-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">🤵</span>
              </div>
              <div>
                <p className="text-xs text-cyan-700">Groom</p>
                <h3 className="text-2xl mt-2 text-cyan-900">{data.groomName}</h3>
                <p className="text-sm text-cyan-700 mt-2">{data.groomParents}</p>
              </div>
              {data.groomPhone && (
                <button className="mt-5 px-6 py-2 bg-cyan-100 text-cyan-900 hover:bg-cyan-200 border border-cyan-300 rounded-full text-sm transition-colors">
                  연락하기
                </button>
              )}
            </div>

            {/* Bride */}
            <div className="text-center space-y-5 p-8 bg-white/80 rounded-2xl border border-cyan-200 shadow-lg shadow-cyan-300/40 backdrop-brightness-105">
              <div className="w-14 h-14 mx-auto bg-cyan-100 rounded-full flex items-center justify-center">
                <span className="text-3xl">👰</span>
              </div>
              <div>
                <p className="text-xs text-cyan-700">Bride</p>
                <h3 className="text-2xl mt-2 text-cyan-900">{data.brideName}</h3>
                <p className="text-sm text-cyan-700 mt-2">{data.brideParents}</p>
              </div>
              {data.bridePhone && (
                <button className="mt-5 px-6 py-2 bg-cyan-100 text-cyan-900 hover:bg-cyan-200 border border-cyan-300 rounded-full text-sm transition-colors">
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
          <h2 className="text-3xl font-normal">일정 & 장소</h2>
          <div className="w-16 h-1 bg-cyan-400 mx-auto opacity-20"></div>

          <div className="space-y-4 mt-10">
            <p className="text-xl text-cyan-900">{data.weddingDate}</p>
            <p className="text-cyan-700 text-sm">{data.weddingTime}</p>
          </div>

          <div className="mt-10 p-8 bg-white/80 rounded-2xl border border-cyan-200 shadow-lg shadow-cyan-300/40">
            <h3 className="text-xl text-cyan-900 mb-2">{data.venueName}</h3>
            <p className="text-sm text-cyan-800">{data.venueAddress}</p>
            {data.venueDetail && <p className="text-xs text-cyan-700 mt-2">{data.venueDetail}</p>}

            <button className="mt-8 px-8 py-3 bg-cyan-100 hover:bg-cyan-200 text-cyan-900 border border-cyan-300 rounded-full text-sm transition-colors">
              오시는 길
            </button>
          </div>
        </div>
      </section>

      {/* 5. Gallery Section */}
      <section className="section-animate py-16 px-6 bg-gradient-to-br from-white via-blue-50 to-cyan-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-normal text-center mb-6">Our Story</h2>
          <div className="w-16 h-1 bg-cyan-400 mx-auto mb-12 opacity-20"></div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.galleryImages?.map((img, idx) => (
              <div key={idx} className="aspect-square overflow-hidden rounded-2xl border border-cyan-200 hover:border-cyan-400 transition-all shadow-lg shadow-cyan-300/40 hover:shadow-cyan-400/50">
                <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover hover:scale-110 transition-transform duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Footer Section */}
      <section className="section-animate py-20 px-6 text-center">
        <div className="max-w-xl mx-auto space-y-8">
          <div className="text-4xl mb-4">🌊</div>
          <p className="text-lg font-normal leading-relaxed text-cyan-900">
            {data.footerMessage || '소중한 시간 내어 주셔서\n진심으로 감사드립니다'}
          </p>
          <p className="text-sm text-cyan-700">{data.brideName} & {data.groomName}</p>

          <div className="flex justify-center gap-4 mt-10">
            <button className="px-8 py-3 bg-cyan-100 hover:bg-cyan-200 text-cyan-900 border border-cyan-300 rounded-full text-sm transition-colors">
              초대장 공유
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OceanBlueTemplate;
