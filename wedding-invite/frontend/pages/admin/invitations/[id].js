// 개별 청첩장 상세 조회 페이지
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import localDB from '../../../utils/localStorageDB';

export default function InvitationDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [invitation, setInvitation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // 컴포넌트가 마운트된 후에만 실행
  useEffect(() => {
    setMounted(true);
  }, []);

  // 청첩장 상세 데이터 조회 (localStorageDB 사용)
  const fetchInvitationDetail = async () => {
    if (!id || !mounted) return;

    try {
      setLoading(true);

      // localStorageDB를 사용하여 데이터 조회
      const result = localDB.getInvitationById(id);

      if (result.success) {
        setInvitation(result.data);
      } else {
        console.error('청첩장을 찾을 수 없습니다:', id, result.message);
        alert(result.message || '청첩장을 찾을 수 없습니다.');
        router.push('/admin');
      }
    } catch (error) {
      console.error('데이터 로드 오류:', error);
      alert('데이터를 불러오는 중 오류가 발생했습니다.');
      router.push('/admin');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mounted && id) {
      fetchInvitationDetail();
    }
  }, [id, mounted]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('클립보드에 복사되었습니다!');
    });
  };

  // 서버사이드 렌더링 중에는 로딩 상태만 보여줌
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold mx-auto"></div>
          <p className="mt-4 text-gray-600">로딩 중...</p>
        </div>
      </div>
    );
  }

  if (!invitation) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">청첩장을 찾을 수 없습니다.</p>
          <Link href="/admin" className="mt-4 inline-block text-gold hover:underline">
            목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const shareUrl = `${typeof window !== 'undefined' ? window.location.origin : ''}/invite/${invitation.share_url}`;

  return (
    <div className="min-h-screen bg-gray-50 font-['Pretendard','Noto_Sans_KR',sans-serif]">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-gold hover:underline">
                ← 목록으로 돌아가기
              </Link>
              <span className="text-gray-400">|</span>
              <h1 className="text-xl font-semibold text-gray-800">청첩장 상세보기</h1>
            </div>
            <div className="flex space-x-2">
              <Link
                href={`/invite/${invitation.share_url}`}
                target="_blank"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
              >
                미리보기
              </Link>
              <button
                onClick={() => copyToClipboard(shareUrl)}
                className="bg-gold text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
              >
                링크 복사
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="space-y-6">
          {/* 기본 정보 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
              기본 정보
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-700 mb-3">커플 정보</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <span className="font-medium">신랑:</span>
                    {invitation.groom_father_title && <span className="text-red-500">{invitation.groom_father_title} </span>}
                    {invitation.groom_kor_name}
                    {invitation.groom_eng_name && ` (${invitation.groom_eng_name})`}
                  </p>
                  <p>
                    <span className="font-medium">신부:</span>
                    {invitation.bride_father_title && <span className="text-red-500">{invitation.bride_father_title} </span>}
                    {invitation.bride_kor_name}
                    {invitation.bride_eng_name && ` (${invitation.bride_eng_name})`}
                  </p>
                  {invitation.groom_phone && <p><span className="font-medium">신랑 연락처:</span> {invitation.groom_phone}</p>}
                  {invitation.bride_phone && <p><span className="font-medium">신부 연락처:</span> {invitation.bride_phone}</p>}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-gray-700 mb-3">예식 정보</h3>
                <div className="space-y-2 text-sm">
                  <p><span className="font-medium">날짜:</span> {invitation.wedding_date}</p>
                  <p><span className="font-medium">시간:</span> {invitation.wedding_time}</p>
                  <p><span className="font-medium">장소:</span> {invitation.venue}</p>
                  <p><span className="font-medium">주소:</span> {invitation.venue_address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* 타이틀 이미지 섹션 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
              타이틀 이미지
            </h2>
            <div className="flex justify-center">
              {invitation.title_image ? (
                <div className="relative">
                  <img
                    src={invitation.title_image}
                    alt="Wedding Title Image"
                    className="w-64 h-64 object-cover rounded-full shadow-lg border-4 border-gray-100"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-64 h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full shadow-lg border-4 border-gray-100 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center bg-gray-300 mb-2">
                        <span className="text-2xl">💍</span>
                      </div>
                      <p className="text-sm text-gray-500">이미지를 불러올 수 없습니다</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-64 h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full shadow-lg border-4 border-gray-100 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center bg-gray-300 mb-2">
                      <span className="text-2xl">💍</span>
                    </div>
                    <p className="text-sm text-gray-500">타이틀 이미지가<br/>등록되지 않았습니다</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 가족 정보 */}
          {(invitation.groom_father_name || invitation.groom_mother_name || invitation.bride_father_name || invitation.bride_mother_name) && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                가족 정보
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {(invitation.groom_father_name || invitation.groom_mother_name) && (
                  <div>
                    <h3 className="font-medium text-gray-700 mb-3">신랑 측</h3>
                    <div className="space-y-2 text-sm">
                      {invitation.groom_father_name && (
                        <p>
                          <span className="font-medium">아버님:</span>
                          {invitation.groom_father_title && <span className="text-red-500">{invitation.groom_father_title} </span>}
                          {invitation.groom_father_name}
                        </p>
                      )}
                      {invitation.groom_mother_name && (
                        <p>
                          <span className="font-medium">어머님:</span>
                          {invitation.groom_mother_title && <span className="text-red-500">{invitation.groom_mother_title} </span>}
                          {invitation.groom_mother_name}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {(invitation.bride_father_name || invitation.bride_mother_name) && (
                  <div>
                    <h3 className="font-medium text-gray-700 mb-3">신부 측</h3>
                    <div className="space-y-2 text-sm">
                      {invitation.bride_father_name && (
                        <p>
                          <span className="font-medium">아버님:</span>
                          {invitation.bride_father_title && <span className="text-red-500">{invitation.bride_father_title} </span>}
                          {invitation.bride_father_name}
                        </p>
                      )}
                      {invitation.bride_mother_name && (
                        <p>
                          <span className="font-medium">어머님:</span>
                          {invitation.bride_mother_title && <span className="text-red-500">{invitation.bride_mother_title} </span>}
                          {invitation.bride_mother_name}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 인사말 */}
          {invitation.message && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                인사말
              </h2>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700 whitespace-pre-line">{invitation.message}</p>
              </div>
            </div>
          )}

          {/* 계좌 정보 */}
          {invitation.account_info && Object.keys(invitation.account_info).length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                계좌 정보
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(invitation.account_info).map(([key, account]) => {
                  const labels = {
                    groom: '신랑',
                    bride: '신부',
                    groomFather: '신랑 아버지',
                    groomMother: '신랑 어머니',
                    brideFather: '신부 아버지',
                    brideMother: '신부 어머니'
                  };

                  if (!account.account || !account.bank) return null;

                  return (
                    <div key={key} className="bg-gray-50 p-3 rounded-lg">
                      <p className="font-medium text-gray-700">{labels[key]}</p>
                      <p className="text-sm text-gray-600">{account.bank} {account.account}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 갤러리 이미지 */}
          {invitation.gallery_images && invitation.gallery_images.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
                갤러리 ({invitation.gallery_images.length}장)
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {invitation.gallery_images.map((imageUrl, index) => (
                  <div key={index} className="aspect-square relative group">
                    <img
                      src={imageUrl}
                      alt={`갤러리 이미지 ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => window.open(imageUrl, '_blank')}
                      onError={(e) => {
                        // 이미지 로드 실패 시 플레이스홀더 표시
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="hidden w-full h-full bg-gray-100 rounded-lg border border-gray-200 items-center justify-center">
                      <div className="text-center">
                        <span className="text-2xl text-gray-400">🖼️</span>
                        <p className="text-xs text-gray-500 mt-1">이미지 로드 실패</p>
                      </div>
                    </div>
                    {/* 이미지 확대 아이콘 */}
                    <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 공유 정보 */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">
              공유 정보
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">공유 URL</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={shareUrl}
                    readOnly
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm"
                  />
                  <button
                    onClick={() => copyToClipboard(shareUrl)}
                    className="px-3 py-2 bg-gold text-white text-sm rounded-lg hover:bg-opacity-90"
                  >
                    복사
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">상태:</span>
                  <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                    invitation.status === 'published' ? 'bg-green-100 text-green-800' :
                    invitation.status === 'draft' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {invitation.status === 'published' ? '게시됨' :
                     invitation.status === 'draft' ? '임시저장' : invitation.status}
                  </span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">생성일:</span>
                  <span className="ml-2 text-gray-600">{new Date(invitation.created_at).toLocaleString('ko-KR')}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">수정일:</span>
                  <span className="ml-2 text-gray-600">{new Date(invitation.updated_at).toLocaleString('ko-KR')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
