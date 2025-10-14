import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Design() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const templates = [
    {
      id: 1,
      title: 'Modern Minimal',
      subtitle: '미니멀 모던',
      description: '깔끔하고 세련된 현대적 스타일',
      color: 'from-gray-100 to-gray-200',
      accent: '#D4AF37',
      preview: {
        names: '민수 ♥ 지영',
        date: '2024. 12. 21',
        venue: 'Grand Hyatt Seoul'
      }
    },
    {
      id: 2,
      title: 'Classic Elegant',
      subtitle: '클래식 엘레간트',
      description: '우아하고 고급스러운 전통적 스타일',
      color: 'from-rose-50 to-rose-100',
      accent: '#be185d',
      preview: {
        names: '민수 ♥ 지영',
        date: '2024. 12. 21',
        venue: 'Grand Hyatt Seoul'
      }
    },
    {
      id: 3,
      title: 'Nature Garden',
      subtitle: '네이처 가든',
      description: '자연스럽고 따뜻한 보태니컬 스타일',
      color: 'from-green-50 to-emerald-100',
      accent: '#059669',
      preview: {
        names: '민수 ♥ 지영',
        date: '2024. 12. 21',
        venue: 'Grand Hyatt Seoul'
      }
    },
    {
      id: 4,
      title: 'Vintage Romance',
      subtitle: '빈티지 로맨스',
      description: '로맨틱하고 감성적인 빈티지 스타일',
      color: 'from-purple-50 to-pink-100',
      accent: '#c026d3',
      preview: {
        names: '민수 ♥ 지영',
        date: '2024. 12. 21',
        venue: 'Grand Hyatt Seoul'
      }
    },
    {
      id: 5,
      title: 'Luxury Gold',
      subtitle: '럭셔리 골드',
      description: '화려하고 고급스러운 골드 스타일',
      color: 'from-yellow-50 to-amber-100',
      accent: '#d97706',
      preview: {
        names: '민수 ♥ 지영',
        date: '2024. 12. 21',
        venue: 'Grand Hyatt Seoul'
      }
    },
    {
      id: 6,
      title: 'Ocean Blue',
      subtitle: '오션 블루',
      description: '시원하고 모던한 블루 스타일',
      color: 'from-blue-50 to-cyan-100',
      accent: '#0891b2',
      preview: {
        names: '민수 ♥ 지영',
        date: '2024. 12. 21',
        venue: 'Grand Hyatt Seoul'
      }
    }
  ];

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const handleNext = () => {
    if (!selectedTemplate) {
      alert('디자인을 선택해주세요.');
      return;
    }
    // localStorage에서 가장 최근 invitation의 id 가져오기
    let latestId = null;
    if (typeof window !== 'undefined') {
      const existingData = localStorage.getItem('evervow_invitations');
      const invitations = existingData ? JSON.parse(existingData) : [];
      if (invitations.length > 0) {
        latestId = invitations[invitations.length - 1].id;
      }
    }
    if (!latestId) {
      alert('청첩장 정보를 먼저 입력해주세요.');
      router.push('/form');
      return;
    }
    router.push(`/preview/${latestId}?designId=${selectedTemplate}`);
  };

  const progress = (2 / 3) * 100;

  return (
    <div className="min-h-screen bg-gray-50 font-['Pretendard','Noto_Sans_KR',sans-serif]">
      {/* 헤더 */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/form" className="flex items-center space-x-2 text-gray-600 hover:text-gold transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span>이전 단계</span>
            </Link>

            <div className="text-center flex items-center space-x-2">
              <Image
                src="/EverVowImage.png"
                alt="EverVow Logo"
                width={24}
                height={24}
                className="rounded"
              />
              <div>
                <h1 className="text-lg font-semibold text-gray-800">청첩장 만들기</h1>
                <p className="text-sm text-gray-500">2단계 / 3단계</p>
              </div>
            </div>

            <div className="w-20"></div>
          </div>

          {/* 진행률 바 */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gold h-2 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 pb-32">
        <div className="space-y-8">
          {/* 페이지 제목 */}
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-medium text-gray-800">원하는 스타일을 선택하세요</h2>
            <p className="text-gray-600">청첩장의 분위기와 테마를 정해주세요</p>
          </div>

          {/* 템플릿 그리드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`group cursor-pointer transition-all duration-300 ${
                  selectedTemplate === template.id
                    ? 'transform scale-105'
                    : 'hover:scale-105'
                }`}
                onClick={() => handleTemplateSelect(template.id)}
              >
                <div
                  className={`bg-white rounded-2xl shadow-lg overflow-hidden border-3 transition-all duration-300 ${
                    selectedTemplate === template.id
                      ? 'border-gold shadow-xl ring-4 ring-gold ring-opacity-20'
                      : 'border-transparent hover:shadow-xl'
                  }`}
                >
                  {/* 템플릿 미리보기 */}
                  <div className={`relative h-80 bg-gradient-to-br ${template.color} p-6 flex flex-col justify-center items-center`}>
                    {/* 선택 체크 아이콘 */}
                    {selectedTemplate === template.id && (
                      <div className="absolute top-4 right-4 w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}

                    {/* 미리보기 콘텐츠 */}
                    <div className="text-center space-y-4">
                      <div className="w-16 h-16 rounded-full mx-auto flex items-center justify-center" style={{ backgroundColor: template.accent + '20' }}>
                        <span className="text-2xl">💍</span>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-2xl font-light text-gray-700" style={{ color: template.accent }}>
                          {template.preview.names}
                        </h3>
                        <p className="text-gray-600">{template.preview.date}</p>
                        <p className="text-sm text-gray-500">{template.preview.venue}</p>
                      </div>

                      <div className="mt-6 space-y-2">
                        <div className="h-1 w-16 mx-auto rounded" style={{ backgroundColor: template.accent }}></div>
                        <div className="text-xs text-gray-400 space-y-1">
                          <div className="h-2 bg-gray-300 rounded w-3/4 mx-auto opacity-30"></div>
                          <div className="h-2 bg-gray-300 rounded w-1/2 mx-auto opacity-30"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 템플릿 정보 */}
                  <div className="p-6 space-y-3">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-800">{template.title}</h4>
                      <p className="text-sm text-gray-500">{template.subtitle}</p>
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">{template.description}</p>

                    <button
                      className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-all duration-300 ${
                        selectedTemplate === template.id
                          ? 'bg-gold text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {selectedTemplate === template.id ? '선택됨' : '미리보기'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 추가 옵션 */}
          <div className="text-center py-8 border-t border-gray-200">
            <p className="text-gray-500 mb-4">원하는 스타일이 없으신가요?</p>
            <button className="text-gold font-medium hover:underline">
              커스텀 디자인 요청하기
            </button>
          </div>
        </div>
      </main>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
        <div className="max-w-6xl mx-auto flex gap-4">
          <Link
            href="/form"
            className="flex-1 py-4 border border-gray-300 text-gray-700 rounded-xl font-medium text-center hover:bg-gray-50 transition-colors"
          >
            이전 단계
          </Link>
          <button
            onClick={handleNext}
            disabled={!selectedTemplate}
            className={`flex-1 py-4 rounded-xl font-medium transition-all duration-300 ${
              selectedTemplate
                ? 'bg-gold text-white hover:bg-opacity-90 hover:shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            다음 단계
          </button>
        </div>
      </div>
    </div>
  );
}
