// 템플릿별 동적 스타일을 생성하는 헬퍼 함수들

/**
 * 아이콘 컨테이너 스타일 (템플릿 ID별로 다른 스타일)
 */
export const getIconContainerStyle = (templateId) => {
  const styles = {
    1: 'ring-2 ring-gray-600',
    2: 'ring-2 ring-amber-400/50',
    3: 'shadow-md shadow-amber-300/30',
    4: 'backdrop-blur-sm',
    5: 'shadow-lg shadow-amber-400/50',
    6: 'backdrop-brightness-105',
    7: 'ring-2 ring-purple-300/50 backdrop-blur-sm',
    8: 'shadow-md shadow-orange-400/40',
    9: 'ring-2 ring-emerald-500/40',
    10: 'ring-2 ring-gray-400 shadow-sm'
  };
  return styles[templateId] || '';
};

/**
 * 날짜 텍스트 스타일
 */
export const getDateTextStyle = (templateId) => {
  const styles = {
    1: 'text-gray-300 text-sm',
    2: 'text-amber-200 text-sm',
    3: 'text-amber-800',
    4: 'text-rose-700 text-sm',
    5: 'text-amber-700 font-medium',
    6: 'text-cyan-700',
    7: 'text-purple-700 text-sm',
    8: 'text-orange-800 font-medium',
    9: 'text-emerald-200 text-sm',
    10: 'text-gray-800 text-sm tracking-wider'
  };
  return styles[templateId] || '';
};

/**
 * 장소 텍스트 스타일
 */
export const getVenueTextStyle = (templateId) => {
  const styles = {
    1: 'text-gray-400 uppercase text-xs',
    2: 'text-amber-300/80 font-serif',
    3: 'text-amber-700/80',
    4: 'text-rose-600/80 italic',
    5: 'text-amber-800 font-semibold',
    6: 'text-cyan-600',
    7: 'text-purple-600/80 text-xs',
    8: 'text-orange-700/90',
    9: 'text-emerald-300/80 font-serif text-xs',
    10: 'text-gray-600 uppercase text-xs tracking-widest'
  };
  return styles[templateId] || '';
};

/**
 * 구분선 스타일
 */
export const getDividerStyle = (templateId) => {
  const styles = {
    1: 'h-0.5',
    2: 'h-1 shadow-lg shadow-amber-500/50',
    3: 'h-1',
    4: 'h-0.5 w-24',
    5: 'h-1.5 shadow-md',
    6: 'h-1',
    7: 'h-0.5 w-20',
    8: 'h-1 w-20 shadow-sm',
    9: 'h-1 shadow-lg shadow-emerald-500/50',
    10: 'h-px w-24'
  };
  return styles[templateId] || '';
};

/**
 * 텍스트 라인 투명도
 */
export const getTextLineOpacity = (templateId) => {
  const styles = {
    1: 'opacity-40',
    2: 'opacity-30',
    3: 'opacity-20',
    4: 'opacity-25',
    5: 'opacity-30',
    6: 'opacity-20',
    7: 'opacity-25',
    8: 'opacity-30',
    9: 'opacity-40',
    10: 'opacity-15'
  };
  return styles[templateId] || '';
};

/**
 * 텍스트 라인 배경 색상
 */
export const getTextLineBgColor = (templateId) => {
  const styles = {
    1: 'bg-gray-600',
    2: 'bg-amber-400',
    3: 'bg-amber-400',
    4: 'bg-rose-300',
    5: 'bg-amber-500',
    6: 'bg-cyan-400',
    7: 'bg-purple-400',
    8: 'bg-orange-400',
    9: 'bg-emerald-400',
    10: 'bg-gray-500'
  };
  return styles[templateId] || '';
};

/**
 * 카드 제목 색상
 */
export const getCardTitleColor = (templateId) => {
  const styles = {
    1: 'text-gray-900',
    2: 'text-blue-900',
    3: 'text-amber-900',
    4: 'text-rose-900',
    5: 'text-amber-900',
    6: 'text-cyan-900',
    7: 'text-purple-900',
    8: 'text-orange-900',
    9: 'text-emerald-900',
    10: 'text-gray-900'
  };
  return styles[templateId] || '';
};

/**
 * 카드 부제목 색상
 */
export const getCardSubtitleColor = (templateId) => {
  const styles = {
    1: 'text-gray-600',
    2: 'text-blue-700',
    3: 'text-amber-700',
    4: 'text-rose-700',
    5: 'text-amber-700',
    6: 'text-cyan-700',
    7: 'text-purple-700',
    8: 'text-orange-700',
    9: 'text-emerald-700',
    10: 'text-gray-600'
  };
  return styles[templateId] || '';
};

/**
 * 카드 설명 색상
 */
export const getCardDescriptionColor = (templateId) => {
  const styles = {
    1: 'text-gray-700',
    2: 'text-blue-800',
    3: 'text-amber-800',
    4: 'text-rose-800',
    5: 'text-amber-800',
    6: 'text-cyan-800',
    7: 'text-purple-800',
    8: 'text-orange-800',
    9: 'text-emerald-800',
    10: 'text-gray-700'
  };
  return styles[templateId] || '';
};

/**
 * 미리보기 버튼 스타일 (선택되지 않았을 때)
 */
export const getPreviewButtonStyle = (templateId) => {
  const styles = {
    1: 'bg-gray-800 text-gray-100 hover:bg-gray-700',
    2: 'bg-blue-900 text-amber-100 hover:bg-blue-800',
    3: 'bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300',
    4: 'bg-pink-100 text-rose-900 hover:bg-pink-200 border border-pink-300',
    5: 'bg-amber-200 text-amber-900 hover:bg-amber-300 border border-amber-400',
    6: 'bg-cyan-100 text-cyan-900 hover:bg-cyan-200 border border-cyan-300',
    7: 'bg-purple-100 text-purple-900 hover:bg-purple-200 border border-purple-300',
    8: 'bg-orange-100 text-orange-900 hover:bg-orange-200 border border-orange-300',
    9: 'bg-emerald-900 text-emerald-100 hover:bg-emerald-800',
    10: 'bg-white text-gray-900 hover:bg-gray-50 border-2 border-gray-300'
  };
  return styles[templateId] || '';
};

