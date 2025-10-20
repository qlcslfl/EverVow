// 템플릿 1: Modern Minimal - 모던 미니멀 스타일 (딥 네이비 & 화이트)
import { useState, useEffect } from 'react';

const ModernMinimalTemplate = ({ data }) => {
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
    <div className="min-h-screen bg-white text-gray-900 font-sans antialiased">
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
      <section className="section-animate relative min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-white">
        {data.heroImage && (
          <div className="w-full max-w-lg mx-auto mb-12">
            <div className="aspect-[3/4] rounded-lg overflow-hidden shadow-lg">
              <img
                src={data.heroImage}
                alt="Wedding"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        <div className="relative z-10 text-center max-w-2xl mx-auto space-y-8">
          {/* 심플한 구분선 */}
          <div className="flex items-center justify-center gap-3">
            <div className="w-16 h-px bg-gray-300"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-400"></div>
            <div className="w-16 h-px bg-gray-300"></div>
          </div>

          {/* 신랑신부 이름 */}
          <div className="space-y-5">
            <h1 className="text-4xl md:text-5xl font-light tracking-wide text-gray-900">
              {data.groomName}
            </h1>
            <div className="flex items-center justify-center gap-4">
              <div className="w-6 h-px bg-gray-300"></div>
              <span className="text-lg font-extralight text-gray-400">&</span>
              <div className="w-6 h-px bg-gray-300"></div>
            </div>
            <h1 className="text-4xl md:text-5xl font-light tracking-wide text-gray-900">
              {data.brideName}
            </h1>
          </div>

          {/* 날짜 */}
          <div className="pt-6">
            <p className="text-sm font-light text-gray-500 tracking-widest uppercase">
              {data.weddingDate}
            </p>
          </div>
        </div>
      </section>

      {/* 2. Greeting Section */}
      <section className="section-animate py-20 px-6 bg-slate-50">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-px bg-slate-800"></div>
            <div className="w-1 h-1 rounded-full bg-slate-800"></div>
            <div className="w-8 h-px bg-slate-800"></div>
          </div>

          <h2 className="text-2xl md:text-3xl font-light leading-relaxed text-slate-900 px-4">
            {data.greetingMessage || '소중한 분들을 초대합니다'}
          </h2>

          <p className="text-base md:text-lg font-light leading-loose text-slate-600 whitespace-pre-line px-4">
            {data.greetingDetail || '저희 두 사람의 새로운 시작에\n함께해 주시면 감사하겠습니다.'}
          </p>

          <div className="pt-4">
            <div className="inline-block px-6 py-2 border border-slate-200 rounded-full">
              <p className="text-sm font-light text-slate-500">
                {data.groomParents} · {data.brideParents}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Photo Gallery Section */}
      <section className="section-animate py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto space-y-12">
          {/* 타이틀 */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-px bg-slate-800"></div>
              <div className="w-1 h-1 rounded-full bg-slate-800"></div>
              <div className="w-8 h-px bg-slate-800"></div>
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-slate-900 tracking-wide">Gallery</h2>
          </div>

          {/* 갤러리 그리드 */}
          {data.galleryImages && data.galleryImages.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {data.galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  className="aspect-square overflow-hidden rounded-lg bg-slate-100 group cursor-pointer"
                  onClick={() => setSelectedImage(img)}
                >
                  <img
                    src={img}
                    alt={`Gallery ${idx + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {[1, 2, 3, 4, 5, 6].map((idx) => (
                <div
                  key={idx}
                  className="aspect-square bg-slate-100 rounded-lg flex items-center justify-center"
                >
                  <p className="text-xs text-slate-400">Photo {idx}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 4. Schedule Section */}
      <section className="section-animate py-20 px-6 bg-slate-900 text-white">
        <div className="max-w-2xl mx-auto space-y-12">
          {/* 타이틀 */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-px bg-white/30"></div>
              <div className="w-1 h-1 rounded-full bg-white/50"></div>
              <div className="w-8 h-px bg-white/30"></div>
            </div>
            <h2 className="text-2xl md:text-3xl font-light tracking-wide">When & Where</h2>
          </div>

          {/* 날짜 및 시간 */}
          <div className="text-center space-y-3 py-8">
            <p className="text-xl md:text-2xl font-light">{data.weddingDate}</p>
            <p className="text-base md:text-lg font-light text-white/70">{data.weddingTime}</p>
          </div>

          {/* 장소 정보 */}
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-10 space-y-6 border border-white/10">
            <div className="text-center space-y-3">
              <h3 className="text-lg md:text-xl font-light">{data.venueName}</h3>
              <p className="text-sm md:text-base font-light text-white/80 leading-relaxed">
                {data.venueAddress}
              </p>
              {data.venueDetail && (
                <p className="text-xs md:text-sm font-light text-white/60">{data.venueDetail}</p>
              )}
            </div>

            <div className="pt-4 text-center">
              <button className="px-8 md:px-12 py-3 bg-white text-slate-900 text-sm font-medium tracking-wide rounded-full hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl">
                지도 보기
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Message Section */}
      <section className="section-animate py-20 px-6 bg-white">
        <div className="max-w-2xl mx-auto space-y-12">
          {/* 타이틀 */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-px bg-slate-800"></div>
              <div className="w-1 h-1 rounded-full bg-slate-800"></div>
              <div className="w-8 h-px bg-slate-800"></div>
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-slate-900 tracking-wide">축하 메시지</h2>
            <p className="text-sm font-light text-slate-500">따뜻한 축하의 말을 남겨주세요</p>
          </div>

          {/* 메시지 입력 폼 */}
          <div className="space-y-4">
            <div className="space-y-3">
              <input
                type="text"
                placeholder="이름"
                className="w-full px-5 py-3 border border-slate-200 rounded-lg text-sm font-light focus:outline-none focus:border-slate-400 transition-colors"
              />
              <textarea
                placeholder="축하 메시지를 입력해주세요"
                rows="4"
                className="w-full px-5 py-3 border border-slate-200 rounded-lg text-sm font-light focus:outline-none focus:border-slate-400 transition-colors resize-none"
              />
            </div>
            <button className="w-full py-3 bg-slate-900 text-white text-sm font-medium tracking-wide rounded-lg hover:bg-slate-800 transition-all duration-300 shadow-md hover:shadow-lg">
              메시지 남기기
            </button>
          </div>

          {/* 메시지 목록 */}
          <div className="space-y-4 pt-8">
            {data.messages && data.messages.length > 0 ? (
              data.messages.map((msg, idx) => (
                <div key={idx} className="bg-slate-50 rounded-lg p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-slate-900">{msg.name}</p>
                    <p className="text-xs text-slate-400">{msg.date}</p>
                  </div>
                  <p className="text-sm font-light text-slate-700 leading-relaxed">{msg.message}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <p className="text-sm text-slate-400">첫 번째 축하 메시지를 남겨주세요</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 6. Account Section */}
      <section className="section-animate py-20 px-6 bg-slate-50">
        <div className="max-w-2xl mx-auto space-y-12">
          {/* 타이틀 */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-px bg-slate-800"></div>
              <div className="w-1 h-1 rounded-full bg-slate-800"></div>
              <div className="w-8 h-px bg-slate-800"></div>
            </div>
            <h2 className="text-2xl md:text-3xl font-light text-slate-900 tracking-wide">마음 전하실 곳</h2>
            <p className="text-sm font-light text-slate-500">축하의 마음을 전달해주세요</p>
          </div>

          {/* 계좌 정보 */}
          <div className="space-y-4">
            {/* 신랑 계좌 */}
            {data.groomAccount && (
              <div className="bg-white rounded-xl p-6 md:p-8 space-y-4 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400 mb-1">신랑측</p>
                    <p className="text-base md:text-lg font-light text-slate-900">{data.groomName}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-slate-50 rounded-lg px-4 py-3">
                  <div className="flex-1">
                    <p className="text-xs text-slate-500 mb-1">{data.groomAccount.bank}</p>
                    <p className="text-sm font-medium text-slate-900">{data.groomAccount.number}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(data.groomAccount.number)}
                    className="px-4 py-2 border border-slate-200 text-slate-700 text-xs rounded-lg hover:bg-slate-100 transition-colors"
                  >
                    복사
                  </button>
                </div>
              </div>
            )}

            {/* 신부 계좌 */}
            {data.brideAccount && (
              <div className="bg-white rounded-xl p-6 md:p-8 space-y-4 shadow-sm border border-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-slate-400 mb-1">신부측</p>
                    <p className="text-base md:text-lg font-light text-slate-900">{data.brideName}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between bg-slate-50 rounded-lg px-4 py-3">
                  <div className="flex-1">
                    <p className="text-xs text-slate-500 mb-1">{data.brideAccount.bank}</p>
                    <p className="text-sm font-medium text-slate-900">{data.brideAccount.number}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(data.brideAccount.number)}
                    className="px-4 py-2 border border-slate-200 text-slate-700 text-xs rounded-lg hover:bg-slate-100 transition-colors"
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
                  className="w-full py-3 border border-slate-200 text-slate-600 text-sm font-light rounded-lg hover:bg-white transition-colors"
                >
                  {showAccountModal ? '접기' : '부모님 계좌번호 보기'}
                </button>

                {showAccountModal && (
                  <div className="mt-4 space-y-3 animate-fade-in">
                    {data.parentAccounts.map((acc, idx) => (
                      <div key={idx} className="bg-white rounded-lg p-5 space-y-3 border border-slate-100">
                        <p className="text-sm font-light text-slate-700">{acc.relation} {acc.name}</p>
                        <div className="flex items-center justify-between bg-slate-50 rounded px-3 py-2">
                          <div>
                            <p className="text-xs text-slate-500">{acc.bank}</p>
                            <p className="text-sm text-slate-900">{acc.number}</p>
                          </div>
                          <button
                            onClick={() => copyToClipboard(acc.number)}
                            className="px-3 py-1.5 border border-slate-200 text-slate-600 text-xs rounded hover:bg-slate-100 transition-colors"
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
      <section className="section-animate py-20 px-6 bg-white">
        <div className="max-w-2xl mx-auto text-center space-y-10">
          <div className="flex items-center justify-center gap-2">
            <div className="w-8 h-px bg-slate-800"></div>
            <div className="w-1 h-1 rounded-full bg-slate-800"></div>
            <div className="w-8 h-px bg-slate-800"></div>
          </div>

          <p className="text-lg md:text-xl font-light leading-relaxed text-slate-900 whitespace-pre-line px-4">
            {data.footerMessage || '참석해 주셔서 감사합니다'}
          </p>

          <p className="text-sm font-light text-slate-500">
            {data.groomName} & {data.brideName}
          </p>

          {/* 공유 버튼 */}
          <div className="pt-6 space-y-4">
            <button className="px-10 py-3 bg-slate-900 text-white text-sm font-medium tracking-wide rounded-full hover:bg-slate-800 transition-all duration-300 shadow-md hover:shadow-lg">
              초대장 공유하기
            </button>

            <div className="flex items-center justify-center gap-4 pt-2">
              <button className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center">
                <span className="text-xs text-slate-600">K</span>
              </button>
              <button className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center">
                <span className="text-xs text-slate-600">F</span>
              </button>
              <button className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 transition-colors flex items-center justify-center">
                <span className="text-xs text-slate-600">L</span>
              </button>
            </div>
          </div>

          {/* 하단 여백 */}
          <div className="pt-12">
            <div className="flex items-center justify-center gap-3">
              <div className="w-16 h-px bg-slate-300"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
              <div className="w-16 h-px bg-slate-300"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 이미지 확대 모달 */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl max-h-full">
            <img
              src={selectedImage}
              alt="Selected"
              className="max-w-full max-h-screen object-contain rounded-lg"
            />
          </div>
          <button
            className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-2xl transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default ModernMinimalTemplate;
