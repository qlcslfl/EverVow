// 템플릿 7: Modern Gold & Black - 모던 골드 & 블랙 스타일
import { useState, useEffect } from 'react';

const ModernGoldBlackTemplate = ({ data }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAccountModal, setShowAccountModal] = useState(false);
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.15 }
    );

    document.querySelectorAll('.section-animate').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('계좌번호가 복사되었습니다.');
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&family=Inter:wght@300;400;500;600&display=swap');

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .section-animate {
          opacity: 0;
        }

        .script-font {
          font-family: 'Great Vibes', cursive;
        }

        .card-touch:active {
          transform: scale(0.98);
          background-color: #FAF7F5;
        }

        .card-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(212, 175, 55, 0.15);
        }
      `}</style>

      {/* 1. Hero Section - 커플 이름 + 하트 */}
      <section className="section-animate pt-[40px] px-[20px] pb-12 text-center">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* 하트 아이콘 */}
          <div className="flex items-center justify-center gap-2">
            <svg className="w-6 h-6 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </div>

          {/* 커플 이름 - 스크립트 폰트 */}
          <div className="space-y-4">
            <h1 className="script-font text-[36px] leading-[1.2] text-black">
              {data.groomName}
            </h1>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-px bg-[#D4AF37]"></div>
              <span className="text-[#D4AF37] text-xl">&</span>
              <div className="w-12 h-px bg-[#D4AF37]"></div>
            </div>
            <h1 className="script-font text-[36px] leading-[1.2] text-black">
              {data.brideName}
            </h1>
          </div>

          {/* 장식 라인 */}
          <div className="pt-4">
            <div className="w-20 h-px bg-[#D4AF37] mx-auto opacity-50"></div>
          </div>
        </div>
      </section>

      {/* 2. Greeting Section - 초대 문구 */}
      <section className="section-animate py-8 px-[20px]">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-[18px] leading-[1.5] font-light text-black">
            {data.greetingMessage || '소중한 분들을 초대합니다'}
          </h2>

          <p className="text-[16px] leading-[1.5] text-gray-700 whitespace-pre-line">
            {data.greetingDetail || '저희 두 사람의 새로운 시작에\n함께해 주시면 감사하겠습니다.'}
          </p>

          {/* 부모님 정보 */}
          <div className="pt-4 text-[14px] text-gray-600">
            <p>{data.groomParents}</p>
            <p className="mt-1">{data.brideParents}</p>
          </div>
        </div>
      </section>

      {/* 3. 결혼 정보 카드 - 날짜/시간/장소 */}
      <section className="section-animate py-6 px-[20px]">
        <div
          className="max-w-2xl mx-auto w-[90%] md:w-full bg-white rounded-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] p-[20px_16px] card-touch card-hover transition-all duration-300"
          onTouchStart={() => setActiveCard('info')}
          onTouchEnd={() => setActiveCard(null)}
        >
          <div className="space-y-3">
            {/* 날짜 */}
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-[#D4AF37] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div>
                <p className="text-[16px] text-black">{data.weddingDate}</p>
              </div>
            </div>

            {/* 시간 */}
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-[#D4AF37] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-[16px] text-black">{data.weddingTime}</p>
              </div>
            </div>

            {/* 장소 */}
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-[#D4AF37] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div className="flex-1">
                <p className="text-[16px] font-medium text-black">{data.venueName}</p>
                <p className="text-[14px] text-gray-600 mt-1">{data.venueAddress}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. 지도 카드 */}
      <section className="section-animate py-6 px-[20px]">
        <div
          className="max-w-2xl mx-auto w-[90%] md:w-full bg-white rounded-[12px] shadow-[0_4px_12px_rgba(0,0,0,0.1)] overflow-hidden card-hover transition-all duration-300"
        >
          {/* 지도 플레이스홀더 */}
          <div className="h-[200px] bg-gray-100 flex items-center justify-center">
            <div className="text-center space-y-2">
              <svg className="w-12 h-12 text-[#D4AF37] mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <p className="text-sm text-gray-500">지도 영역</p>
            </div>
          </div>

          <div className="p-4 text-center">
            <button className="px-8 py-3 bg-[#D4AF37] text-white rounded-[8px] text-[16px] font-medium hover:bg-[#C19B2E] transition-colors">
              지도 보기
            </button>
          </div>
        </div>
      </section>

      {/* 5. Photo Gallery Section */}
      <section className="section-animate py-8 px-[20px]">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* 타이틀 */}
          <div className="text-center space-y-2">
            <h2 className="script-font text-[32px] text-black">Gallery</h2>
            <div className="w-16 h-px bg-[#D4AF37] mx-auto"></div>
          </div>

          {/* 갤러리 그리드 */}
          {data.galleryImages && data.galleryImages.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {data.galleryImages.map((img, idx) => (
                <div
                  key={idx}
                  className="aspect-square overflow-hidden rounded-[12px] bg-gray-100 cursor-pointer group shadow-md hover:shadow-lg transition-all"
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
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((idx) => (
                <div
                  key={idx}
                  className="aspect-square bg-gray-100 rounded-[12px] flex items-center justify-center"
                >
                  <p className="text-xs text-gray-400">Photo {idx}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 6. Message Section */}
      <section className="section-animate py-8 px-[20px] bg-[#FAFAFA]">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* 타이틀 */}
          <div className="text-center space-y-2">
            <h2 className="text-[20px] font-medium text-black">축하 메시지</h2>
            <div className="w-12 h-px bg-[#D4AF37] mx-auto"></div>
            <p className="text-[14px] text-gray-600">따뜻한 축하의 말을 남겨주세요</p>
          </div>

          {/* 메시지 입력 폼 */}
          <div className="space-y-3">
            <input
              type="text"
              placeholder="이름"
              className="w-full px-4 py-3 border border-gray-200 rounded-[8px] text-[16px] bg-white focus:outline-none focus:border-[#D4AF37] transition-colors"
            />
            <textarea
              placeholder="축하 메시지를 입력해주세요"
              rows="4"
              className="w-full px-4 py-3 border border-gray-200 rounded-[8px] text-[16px] bg-white focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
            />
            <button className="w-full py-3 bg-[#D4AF37] text-white rounded-[8px] text-[16px] font-medium hover:bg-[#C19B2E] transition-all duration-300 shadow-md hover:shadow-lg">
              메시지 남기기
            </button>
          </div>

          {/* 메시지 목록 */}
          <div className="space-y-3 pt-4">
            {data.messages && data.messages.length > 0 ? (
              data.messages.map((msg, idx) => (
                <div key={idx} className="bg-white rounded-[12px] p-4 shadow-sm border-l-4 border-[#D4AF37]">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[14px] font-medium text-black">{msg.name}</p>
                    <p className="text-[12px] text-gray-400">{msg.date}</p>
                  </div>
                  <p className="text-[14px] text-gray-700 leading-relaxed">{msg.message}</p>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-white rounded-[12px]">
                <p className="text-[14px] text-gray-400">첫 번째 축하 메시지를 남겨주세요</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 7. Account Section */}
      <section className="section-animate py-8 px-[20px]">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* 타이틀 */}
          <div className="text-center space-y-2">
            <h2 className="text-[20px] font-medium text-black">마음 전하실 곳</h2>
            <div className="w-12 h-px bg-[#D4AF37] mx-auto"></div>
            <p className="text-[14px] text-gray-600">축하의 마음을 전달해주세요</p>
          </div>

          {/* 계좌 정보 */}
          <div className="space-y-3">
            {/* 신랑 계좌 */}
            {data.groomAccount && (
              <div className="bg-white rounded-[12px] p-5 shadow-md border border-gray-100">
                <div className="mb-3">
                  <p className="text-[12px] text-gray-500 mb-1">신랑측</p>
                  <p className="text-[18px] font-medium text-black">{data.groomName}</p>
                </div>
                <div className="flex items-center justify-between bg-gray-50 rounded-[8px] px-4 py-3">
                  <div className="flex-1">
                    <p className="text-[12px] text-gray-600 mb-1">{data.groomAccount.bank}</p>
                    <p className="text-[14px] font-medium text-black">{data.groomAccount.number}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(data.groomAccount.number)}
                    className="ml-3 px-4 py-2 bg-[#D4AF37] text-white text-[14px] rounded-[6px] hover:bg-[#C19B2E] transition-colors"
                  >
                    복사
                  </button>
                </div>
              </div>
            )}

            {/* 신부 계좌 */}
            {data.brideAccount && (
              <div className="bg-white rounded-[12px] p-5 shadow-md border border-gray-100">
                <div className="mb-3">
                  <p className="text-[12px] text-gray-500 mb-1">신부측</p>
                  <p className="text-[18px] font-medium text-black">{data.brideName}</p>
                </div>
                <div className="flex items-center justify-between bg-gray-50 rounded-[8px] px-4 py-3">
                  <div className="flex-1">
                    <p className="text-[12px] text-gray-600 mb-1">{data.brideAccount.bank}</p>
                    <p className="text-[14px] font-medium text-black">{data.brideAccount.number}</p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(data.brideAccount.number)}
                    className="ml-3 px-4 py-2 bg-[#D4AF37] text-white text-[14px] rounded-[6px] hover:bg-[#C19B2E] transition-colors"
                  >
                    복사
                  </button>
                </div>
              </div>
            )}

            {/* 부모님 계좌 */}
            {data.parentAccounts && (
              <div className="pt-2">
                <button
                  onClick={() => setShowAccountModal(!showAccountModal)}
                  className="w-full py-3 border border-gray-300 text-gray-700 text-[14px] rounded-[8px] hover:bg-gray-50 transition-colors"
                >
                  {showAccountModal ? '접기' : '부모님 계좌번호 보기'}
                </button>

                {showAccountModal && (
                  <div className="mt-3 space-y-2">
                    {data.parentAccounts.map((acc, idx) => (
                      <div key={idx} className="bg-gray-50 rounded-[8px] p-4">
                        <p className="text-[14px] text-gray-700 mb-2">{acc.relation} {acc.name}</p>
                        <div className="flex items-center justify-between bg-white rounded px-3 py-2 border border-gray-200">
                          <div>
                            <p className="text-[12px] text-gray-500">{acc.bank}</p>
                            <p className="text-[13px] text-black">{acc.number}</p>
                          </div>
                          <button
                            onClick={() => copyToClipboard(acc.number)}
                            className="px-3 py-1.5 bg-[#D4AF37] text-white text-[12px] rounded hover:bg-[#C19B2E] transition-colors"
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

      {/* 8. Footer Section - 연락처 & SNS */}
      <section className="section-animate py-12 px-[20px] bg-[#FAFAFA]">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          {/* 하트 아이콘 */}
          <div className="flex items-center justify-center">
            <svg className="w-6 h-6 text-[#D4AF37]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </div>

          <p className="text-[18px] leading-[1.5] text-black whitespace-pre-line">
            {data.footerMessage || '참석해 주셔서\n감사합니다'}
          </p>

          <p className="text-[14px] text-gray-600">
            {data.groomName} & {data.brideName}
          </p>

          {/* 공유 버튼 */}
          <div className="pt-4">
            <button className="px-12 py-3 bg-[#D4AF37] text-white rounded-[8px] text-[16px] font-medium hover:bg-[#C19B2E] transition-all duration-300 shadow-lg hover:shadow-xl">
              초대장 공유하기
            </button>
          </div>

          {/* SNS 아이콘 */}
          <div className="flex items-center justify-center gap-4 pt-4">
            <button className="w-12 h-12 bg-white rounded-full shadow-md hover:shadow-lg flex items-center justify-center transition-all hover:scale-110">
              <span className="text-[14px] font-medium text-gray-700">K</span>
            </button>
            <button className="w-12 h-12 bg-white rounded-full shadow-md hover:shadow-lg flex items-center justify-center transition-all hover:scale-110">
              <span className="text-[14px] font-medium text-gray-700">F</span>
            </button>
            <button className="w-12 h-12 bg-white rounded-full shadow-md hover:shadow-lg flex items-center justify-center transition-all hover:scale-110">
              <span className="text-[14px] font-medium text-gray-700">L</span>
            </button>
          </div>

          {/* 하단 장식 */}
          <div className="pt-8">
            <div className="w-20 h-px bg-[#D4AF37] mx-auto opacity-50"></div>
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
              className="max-w-full max-h-screen object-contain rounded-[12px]"
            />
          </div>
          <button
            className="absolute top-6 right-6 w-10 h-10 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white text-2xl transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            ×
          </button>
        </div>
      )}
    </div>
  );
};

export default ModernGoldBlackTemplate;
