import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { templateMetadata } from '../utils/templates';

export default function Design() {
  const router = useRouter();
  const [selectedTemplate, setSelectedTemplate] = useState(null);

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
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
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
            {templateMetadata.map((template) => (
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
                  className={`rounded-2xl overflow-hidden border-3 transition-all duration-300 ${template.shadowStyle} ${
                    selectedTemplate === template.id
                      ? 'border-gold shadow-xl ring-4 ring-gold ring-opacity-20'
                      : `border-transparent ${template.hoverEffect}`
                  }`}
                >
                  {/* 템플릿 미리보기 */}
                  <div className={`relative h-80 bg-gradient-to-br ${template.color} p-6 flex flex-col justify-center items-center overflow-hidden`}>
                    {/* 오버레이 효과 */}
                    <div className={`absolute inset-0 ${template.overlayEffect}`}></div>

                    {/* 선택 체크 아이콘 */}
                    {selectedTemplate === template.id && (
                      <div className="absolute top-4 right-4 w-8 h-8 bg-gold rounded-full flex items-center justify-center z-10 shadow-lg">
                        <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    )}

                    {/* 미리보기 콘텐츠 */}
                    <div className={`text-center space-y-4 z-10 relative ${template.fontStyle}`}>
                      <div
                        className="w-16 h-16 rounded-full mx-auto flex items-center justify-center transition-all duration-300"
                        style={{ backgroundColor: template.accent + '20' }}
                      >
                        <span className="text-2xl">{template.icon}</span>
                      </div>

                      <div className="space-y-2">
                        <h3
                          className={`text-2xl ${template.fontStyle} ${template.textColor}`}
                          style={{ color: template.accent }}
                        >
                          민수 ♥ 지영
                        </h3>
                        <p className={`${template.textColor} text-sm`}>
                          2024. 12. 21
                        </p>
                        <p className={`text-sm ${template.textColor} opacity-80`}>
                          Grand Hyatt Seoul
                        </p>
                      </div>

                      <div className="mt-6 space-y-2">
                        <div
                          className="h-1 w-16 mx-auto rounded"
                          style={{ backgroundColor: template.accent }}
                        ></div>
                        <div className="text-xs space-y-1 opacity-30">
                          <div className="h-2 rounded w-3/4 mx-auto bg-current"></div>
                          <div className="h-2 rounded w-1/2 mx-auto bg-current"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 템플릿 정보 */}
                  <div className={`p-6 space-y-3 ${template.cardBg}`}>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">
                        {template.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {template.subtitle}
                      </p>
                    </div>
                    <p className="text-sm leading-relaxed text-gray-700">
                      {template.description}
                    </p>

                    <button
                      className={`w-full py-2 px-4 rounded-lg font-medium text-sm transition-all duration-300 ${
                        selectedTemplate === template.id
                          ? 'bg-gold text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm mb-4">
              * 선택한 템플릿은 언제든지 변경할 수 있습니다
            </p>
          </div>
        </div>
      </main>

      {/* 하단 고정 버튼 */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-4 px-4 sm:px-6 z-40">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link
            href="/form"
            className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            이전
          </Link>
          <button
            onClick={handleNext}
            disabled={!selectedTemplate}
            className={`px-8 py-3 rounded-lg font-medium transition-all duration-300 ${
              selectedTemplate
                ? 'bg-gold text-white hover:bg-gold-dark shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            다음 단계로
          </button>
        </div>
      </div>
    </div>
  );
}
