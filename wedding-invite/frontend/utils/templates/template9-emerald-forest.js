// 템플릿 9: Emerald Forest - 에메랄드 포레스트 스타일
import { useState, useEffect } from 'react';

const EmeraldForestTemplate = ({ data }) => {
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
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 to-teal-900 text-emerald-100">
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
      `}</style>

      {/* 1. Hero Section */}
      <section className="section-animate relative h-screen flex flex-col items-center justify-center px-6 bg-gradient-to-b from-emerald-800 via-green-700 to-teal-800">
        {data.heroImage && (
          <div className="absolute inset-0 opacity-20">
            <img src={data.heroImage} alt="Hero" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
          </div>
        )}
        <div className="relative z-10 text-center space-y-6">
          <div className="text-6xl mb-6">🌲</div>
          <h1 className="text-4xl md:text-5xl font-normal tracking-wide text-emerald-100">{data.brideName}</h1>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-1 bg-emerald-400 opacity-40 shadow-lg shadow-emerald-500/50"></div>
            <span className="text-2xl text-emerald-300">&</span>
            <div className="w-12 h-1 bg-emerald-400 opacity-40 shadow-lg shadow-emerald-500/50"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-normal tracking-wide text-emerald-100">{data.groomName}</h1>
          <div className="w-24 h-1 bg-emerald-400 mx-auto mt-10 opacity-40 shadow-lg shadow-emerald-500/50"></div>
          <p className="text-emerald-200 text-sm mt-8">{data.weddingDate}</p>
          <p className="text-emerald-300/80 text-xs font-serif">{data.venueName}</p>
        </div>
      </section>

      {/* 2. Greeting Section */}
      <section className="section-animate py-24 px-6 max-w-2xl mx-auto text-center">
        <div className="space-y-10">
          <div className="inline-block px-8 py-3 border border-emerald-500/40 rounded-sm">
            <span className="text-sm text-emerald-300 tracking-wide">Wedding Invitation</span>
          </div>
          <h2 className="text-3xl font-normal tracking-wide leading-relaxed text-emerald-100">
            {data.greetingMessage || '숲속의 평화처럼\n깊고 고요한 사랑'}
          </h2>
          <div className="w-24 h-1 bg-emerald-400 mx-auto opacity-40 shadow-lg shadow-emerald-500/50"></div>
          <p className="text-emerald-200 text-base leading-loose">
            {data.greetingDetail || '에메랄드빛 자연처럼\n영원히 푸르를 우리의 사랑\n깊은 숲속에서 약속을 나눕니다.\n저희의 아름다운 시작을\n함께해 주시면 감사하겠습니다.'}
          </p>
        </div>
      </section>

      {/* 3. Bride & Groom Section */}
      <section className="section-animate py-20 px-6 bg-gradient-to-t from-emerald-950 via-emerald-900 to-teal-900">
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Groom */}
            <div className="text-center space-y-6 p-10 bg-gradient-to-br from-emerald-900/60 to-teal-900/60 rounded-lg border border-emerald-500/30 shadow-xl shadow-emerald-900/60">
              <div className="w-16 h-16 mx-auto bg-emerald-800 rounded-full flex items-center justify-center ring-2 ring-emerald-500/40 shadow-lg">
                <span className="text-3xl">🤵</span>
              </div>
              <div>
                <p className="text-xs text-emerald-300 font-serif">Groom</p>
                <h3 className="text-3xl mt-3 font-normal tracking-wide text-emerald-100">{data.groomName}</h3>
                <p className="text-sm text-emerald-200 mt-2">{data.groomParents}</p>
              </div>
              {data.groomPhone && (
                <button className="mt-6 px-8 py-3 bg-emerald-900 text-emerald-100 hover:bg-emerald-800 rounded-sm text-sm transition-colors shadow-md">
                  연락하기
                </button>
              )}
            </div>

            {/* Bride */}
            <div className="text-center space-y-6 p-10 bg-gradient-to-br from-emerald-900/60 to-teal-900/60 rounded-lg border border-emerald-500/30 shadow-xl shadow-emerald-900/60">
              <div className="w-16 h-16 mx-auto bg-emerald-800 rounded-full flex items-center justify-center ring-2 ring-emerald-500/40 shadow-lg">
                <span className="text-3xl">👰</span>
              </div>
              <div>
                <p className="text-xs text-emerald-300 font-serif">Bride</p>
                <h3 className="text-3xl mt-3 font-normal tracking-wide text-emerald-100">{data.brideName}</h3>
                <p className="text-sm text-emerald-200 mt-2">{data.brideParents}</p>
              </div>
              {data.bridePhone && (
                <button className="mt-6 px-8 py-3 bg-emerald-900 text-emerald-100 hover:bg-emerald-800 rounded-sm text-sm transition-colors shadow-md">
                  연락하기
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Schedule Section */}
      <section className="section-animate py-24 px-6">
        <div className="max-w-2xl mx-auto text-center space-y-10">
          <h2 className="text-4xl font-normal tracking-wide">When & Where</h2>
          <div className="w-24 h-1 bg-emerald-400 mx-auto opacity-40 shadow-lg shadow-emerald-500/50"></div>

          <div className="space-y-5 mt-12">
            <p className="text-2xl text-emerald-100">{data.weddingDate}</p>
            <p className="text-emerald-200 text-base">{data.weddingTime}</p>
          </div>

          <div className="mt-12 p-8 bg-gradient-to-br from-emerald-900/40 to-teal-900/40 rounded-lg border border-emerald-500/30 shadow-xl">
            <h3 className="text-2xl font-normal tracking-wide text-emerald-100 mb-3">{data.venueName}</h3>
            <p className="text-sm text-emerald-200">{data.venueAddress}</p>
            {data.venueDetail && <p className="text-xs text-emerald-300/80 mt-3 font-serif">{data.venueDetail}</p>}

            <button className="mt-8 px-10 py-4 bg-emerald-900 hover:bg-emerald-800 text-emerald-100 rounded-sm text-sm transition-colors shadow-lg">
              지도 보기
            </button>
          </div>
        </div>
      </section>

      {/* 5. Gallery Section */}
      <section className="section-animate py-20 px-6 bg-gradient-to-t from-emerald-950 via-emerald-900 to-teal-900">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl font-normal tracking-wide text-center mb-8">Forest Gallery</h2>
          <div className="w-24 h-1 bg-emerald-400 mx-auto mb-16 opacity-40 shadow-lg shadow-emerald-500/50"></div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {data.galleryImages?.map((img, idx) => (
              <div key={idx} className="aspect-square overflow-hidden rounded-lg border border-emerald-500/30 hover:border-emerald-500/50 transition-all shadow-xl shadow-emerald-900/60 hover:shadow-emerald-500/40">
                <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Footer Section */}
      <section className="section-animate py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto space-y-10">
          <div className="w-24 h-1 bg-emerald-400 mx-auto opacity-40 shadow-lg shadow-emerald-500/50"></div>
          <p className="text-xl font-normal tracking-wide leading-relaxed text-emerald-100">
            {data.footerMessage || '깊은 숲의 축복처럼\n영원히 간직하겠습니다'}
          </p>
          <p className="text-base text-emerald-200">{data.brideName} & {data.groomName}</p>

          <div className="flex justify-center gap-4 mt-12">
            <button className="px-10 py-4 bg-emerald-900 hover:bg-emerald-800 text-emerald-100 rounded-sm text-sm transition-colors shadow-md">
              초대장 공유
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EmeraldForestTemplate;
