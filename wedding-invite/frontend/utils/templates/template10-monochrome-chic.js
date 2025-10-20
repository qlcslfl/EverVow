// 템플릿 10: Monochrome Chic - 블랙 & 화이트의 완벽한 조화
import { useState, useEffect } from 'react';

const MonochromeChicTemplate = ({ data }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAccountModal, setShowAccountModal] = useState(false);

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

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('계좌번호가 복사되었습니다.');
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-serif">
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }
        .section-animate {
          opacity: 0;
        }
        @keyframes slideIn {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        .line-animate {
          animation: slideIn 1.2s ease-out forwards;
        }
      `}</style>

      {/* 1. Hero Section */}
      <section className="section-animate relative min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-black text-white">
        {data.heroImage && (
          <div className="absolute inset-0 opacity-20">
            <img
              src={data.heroImage}
              alt="Hero"
              className="w-full h-full object-cover grayscale"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60"></div>
          </div>
        )}

        <div className="relative z-10 text-center max-w-2xl mx-auto space-y-10">
          {/* 기하학적 장식 */}
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 border border-white/30 rotate-45"></div>
            <div className="w-2 h-2 bg-white"></div>
            <div className="w-12 h-12 border border-white/30 rotate-45"></div>
          </div>

          {/* 신랑신부 이름 */}
          <div className="space-y-8">
            <h1 className="text-5xl md:text-6xl font-light tracking-[0.3em] text-white uppercase">
              {data.groomName}
            </h1>
            <div className="flex items-center justify-center gap-8">
              <div className="w-16 h-px bg-white"></div>
              <span className="text-2xl font-light">&</span>
              <div className="w-16 h-px bg-white"></div>
            </div>
            <h1 className="text-5xl md:text-6xl font-light tracking-[0.3em] text-white uppercase">
              {data.brideName}
            </h1>
          </div>

          {/* 날짜 */}
          <div className="pt-8 space-y-2">
            <div className="w-24 h-px bg-white/40 mx-auto mb-4"></div>
            <p className="text-sm tracking-[0.4em] text-white/90 uppercase">
              {data.weddingDate}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Greeting Section */}
      <section className="section-animate py-24 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center space-y-10">
          {/* 타이틀 */}
          <div className="space-y-4">
            <div className="inline-block border-2 border-black px-8 py-3">
              <span className="text-xs tracking-[0.3em] uppercase font-sans">
                Wedding Invitation
              </span>
            </div>
          </div>

          {/* 메시지 */}
          <h2 className="text-3xl md:text-4xl font-light leading-relaxed tracking-wide">
            {data.greetingMessage || '영원을 약속하는 날'}
          </h2>

          <div className="w-16 h-px bg-black mx-auto"></div>

          <p className="text-base md:text-lg leading-loose text-gray-700 whitespace-pre-line px-4">
            {data.greetingDetail || '흑과 백의 조화처럼\n완벽한 균형을 이루는 우리\n\n영원히 변치 않을 사랑을\n약속하고자 합니다'}
          </p>

          {/* 부모님 */}
          <div className="pt-8 space-y-2">
            <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
              <span>{data.groomParents}</span>
              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
              <span>{data.brideParents}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Photo Gallery Section */}
      <section className="section-animate py-20 px-6 bg-black text-white">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* 타이틀 */}
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3">
              <div className="w-8 h-8 border border-white/30 rotate-45"></div>
              <div className="w-1.5 h-1.5 bg-white"></div>
              <div className="w-8 h-8 border border-white/30 rotate-45"></div>
            </div>
            <h2 className="text-3xl md:text-4xl font-light tracking-[0.3em] uppercase">
              Gallery
            </h2>
            <div className="w-16 h-px bg-white/40 mx-auto"></div>
          </div>

          {/* 갤러리 그리드 */}
          {data.galleryImages && data.galleryImages.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
              {data.galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  className="aspect-square overflow-hidden bg-gray-900 group cursor-pointer border border-white/10"
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img}
                    alt={`Gallery ${idx + 1}`}
                    className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
              {[1, 2, 3, 4, 5, 6].map((idx) => (
                <div
                  key={idx}
                  className="aspect-square bg-gray-900 border border-white/10 flex items-center justify-center"
                >
                  <p className="text-xs text-gray-600">Photo {idx}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Schedule Section */}
      <section className="section-animate py-24 px-6 bg-white">
        <div className="max-w-2xl mx-auto space-y-16">
          {/* 타이틀 */}
          <div className="text-center space-y-6">
            <div className="inline-block border-2 border-black px-8 py-3">
              <span className="text-xs tracking-[0.3em] uppercase font-sans">
                When & Where
              </span>
            </div>
          </div>

          {/* 날짜 및 시간 */}
          <div className="text-center space-y-4">
            <p className="text-2xl md:text-3xl font-light tracking-wide">
              {data.weddingDate}
            </p>
            <div className="w-12 h-px bg-gray-300 mx-auto"></div>
            <p className="text-lg text-gray-600 tracking-wide">
              {data.weddingTime}
            </p>
          </div>

          {/* 장소 정보 */}
          <div className="border-4 border-black p-10 md:p-12 space-y-6">
            <div className="text-center space-y-4">
              <h3 className="text-2xl md:text-3xl font-light tracking-wide">
                {data.venueName}
              </h3>
              <div className="w-12 h-px bg-gray-300 mx-auto"></div>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                {data.venueAddress}
              </p>
              {data.venueDetail && (
                <p className="text-xs md:text-sm text-gray-500">
                  {data.venueDetail}
                </p>
              )}
            </div>

            <div className="pt-6 text-center">
              <button className="px-12 py-4 bg-black text-white text-sm tracking-[0.2em] uppercase hover:bg-gray-800 transition-all duration-300 font-sans">
                지도 보기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Message Section */}
      <section className="section-animate py-20 px-6 bg-gray-50">
        <div className="max-w-2xl mx-auto space-y-12">
          {/* 타이틀 */}
          <div className="text-center space-y-6">
            <div className="flex items-center justify-center gap-3">
              <div className="w-6 h-6 border border-black/30 rotate-45"></div>
              <div className="w-1 h-1 bg-black"></div>
              <div className="w-6 h-6 border border-black/30 rotate-45"></div>
            </div>
            <h2 className="text-2xl md:text-3xl font-light tracking-[0.2em] uppercase">
              축하 메시지
            </h2>
            <div className="w-12 h-px bg-gray-400 mx-auto"></div>
            <p className="text-sm text-gray-600 tracking-wide font-sans">
              따뜻한 축하의 말을 남겨주세요
            </p>
          </div>

          {/* 메시지 입력 폼 */}
          <div className="space-y-4">
            <div className="space-y-4">
              <input
                type="text"
                placeholder="이름"
                className="w-full px-6 py-4 border-2 border-gray-300 bg-white text-sm font-sans focus:outline-none focus:border-black transition-colors"
              />
              <textarea
                placeholder="축하 메시지를 입력해주세요"
                rows="5"
                className="w-full px-6 py-4 border-2 border-gray-300 bg-white text-sm font-sans focus:outline-none focus:border-black transition-colors resize-none"
              />
            </div>
            <button className="w-full py-4 bg-black text-white text-sm tracking-[0.2em] uppercase hover:bg-gray-800 transition-all duration-300 font-sans">
              메시지 남기기
            </button>
          </div>

          {/* 메시지 목록 */}
          <div className="space-y-1 pt-8">
            {data.messages && data.messages.length > 0 ? (
              data.messages.map((msg, idx) => (
                <div key={idx} className="bg-white border-l-4 border-black p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium tracking-wide">{msg.name}</p>
                    <p className="text-xs text-gray-400 font-sans">{msg.date}</p>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed">{msg.message}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-16 border-2 border-dashed border-gray-300">
                <p className="text-sm text-gray-400 font-sans">첫 번째 축하 메시지를 남겨주세요</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. Account Section */}
      <section className="section-animate py-20 px-6 bg-black text-white">
        <div className="max-w-2xl mx-auto space-y-12">
          {/* 타이틀 */}
          <div className="text-center space-y-6">
            <div className="inline-block border-2 border-white px-8 py-3">
              <span className="text-xs tracking-[0.3em] uppercase font-sans">
                마음 전하실 곳
              </span>
            </div>
            <p className="text-sm text-white/70 tracking-wide font-sans">
              축하의 마음을 전달해주세요
            </p>
          </div>

          {/* 계좌 정보 */}
          <div className="space-y-1">
            {/* 신랑 계좌 */}
            {data.groomAccount && (
              <div className="bg-white text-black p-8 md:p-10 space-y-6 border-4 border-white">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500 tracking-[0.2em] uppercase font-sans">
                      신랑측
                    </p>
                    <p className="text-xl md:text-2xl font-light tracking-wide">
                      {data.groomName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-gray-50 p-4 border-l-4 border-black">
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 mb-2 font-sans">{data.groomAccount.bank}</p>
                    <p className="text-sm md:text-base font-medium tracking-wide">
                      {data.groomAccount.number}
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(data.groomAccount.number)}
                    className="ml-4 px-5 py-2 border-2 border-black text-black text-xs tracking-wider uppercase hover:bg-black hover:text-white transition-all font-sans"
                  >
                    복사
                  </button>
                </div>
              </div>
            )}

            {/* 신부 계좌 */}
            {data.brideAccount && (
              <div className="bg-white text-black p-8 md:p-10 space-y-6 border-4 border-white">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <p className="text-xs text-gray-500 tracking-[0.2em] uppercase font-sans">
                      신부측
                    </p>
                    <p className="text-xl md:text-2xl font-light tracking-wide">
                      {data.brideName}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-gray-50 p-4 border-l-4 border-black">
                  <div className="flex-1">
                    <p className="text-xs text-gray-600 mb-2 font-sans">{data.brideAccount.bank}</p>
                    <p className="text-sm md:text-base font-medium tracking-wide">
                      {data.brideAccount.number}
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(data.brideAccount.number)}
                    className="ml-4 px-5 py-2 border-2 border-black text-black text-xs tracking-wider uppercase hover:bg-black hover:text-white transition-all font-sans"
                  >
                    복사
                  </button>
                </div>
              </div>
            )}

            {/* 부모님 계좌 (옵션) */}
            {data.parentAccounts && (
              <div className="pt-4">
                <button
                  onClick={() => setShowAccountModal(!showAccountModal)}
                  className="w-full py-4 border-2 border-white text-white text-sm tracking-wider uppercase hover:bg-white hover:text-black transition-all font-sans"
                >
                  {showAccountModal ? '접기' : '부모님 계좌번호 보기'}
                </button>

                {showAccountModal && (
                  <div className="mt-1 space-y-1 animate-fade-in">
                    {data.parentAccounts.map((acc, idx) => (
                      <div key={idx} className="bg-white/10 backdrop-blur-sm p-6 border border-white/20 space-y-4">
                        <p className="text-sm tracking-wide">{acc.relation} {acc.name}</p>
                        <div className="flex items-center justify-between bg-black/30 p-3 border-l-2 border-white">
                          <div>
                            <p className="text-xs text-white/60 font-sans">{acc.bank}</p>
                            <p className="text-sm mt-1">{acc.number}</p>
                          </div>
                          <button
                            onClick={() => copyToClipboard(acc.number)}
                            className="px-4 py-2 border border-white text-white text-xs tracking-wider uppercase hover:bg-white hover:text-black transition-all font-sans"
                          >
                            복사
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 7. Footer Section */}
      <section className="section-animate py-24 px-6 bg-white text-center">
        <div className="max-w-2xl mx-auto space-y-12">
          {/* 장식 */}
          <div className="flex items-center justify-center gap-4">
            <div className="w-10 h-10 border-2 border-black rotate-45"></div>
            <div className="w-2 h-2 bg-black"></div>
            <div className="w-10 h-10 border-2 border-black rotate-45"></div>
          </div>

          <p className="text-xl md:text-2xl font-light leading-relaxed tracking-wide whitespace-pre-line px-4">
            {data.footerMessage || '참석해 주셔서\n감사합니다'}
          </p>

          <div className="w-16 h-px bg-gray-400 mx-auto"></div>

          <p className="text-sm tracking-[0.2em] text-gray-600 uppercase font-sans">
            {data.groomName} & {data.brideName}
          </p>

          {/* 공유 버튼 */}
          <div className="pt-8 space-y-6">
            <button className="px-16 py-4 bg-black text-white text-sm tracking-[0.3em] uppercase hover:bg-gray-800 transition-all duration-300 shadow-lg font-sans">
              초대장 공유하기
            </button>

            <div className="flex items-center justify-center gap-3 pt-4">
              <button className="w-12 h-12 border-2 border-black hover:bg-black hover:text-white transition-all flex items-center justify-center">
                <span className="text-sm font-sans">K</span>
              </button>
              <button className="w-12 h-12 border-2 border-black hover:bg-black hover:text-white transition-all flex items-center justify-center">
                <span className="text-sm font-sans">F</span>
              </button>
              <button className="w-12 h-12 border-2 border-black hover:bg-black hover:text-white transition-all flex items-center justify-center">
                <span className="text-sm font-sans">L</span>
              </button>
            </div>
          </div>

          {/* 하단 장식 */}
          <div className="pt-16">
            <div className="flex items-center justify-center gap-4">
              <div className="w-8 h-8 border border-black/30 rotate-45"></div>
              <div className="w-1.5 h-1.5 bg-black"></div>
              <div className="w-8 h-8 border border-black/30 rotate-45"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 이미지 확대 모달 */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl max-h-full">
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-full max-h-screen object-contain"
            />
          </div>
          <button
            className="absolute top-6 right-6 w-12 h-12 border-2 border-white hover:bg-white hover:text-black flex items-center justify-center text-white text-3xl transition-all"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default MonochromeChicTemplate;
