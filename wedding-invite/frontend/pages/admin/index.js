// 관리자 페이지 - 저장된 청첩장 목록 확인
import { useState, useEffect } from 'react';
import Link from 'next/link';
import localDB from '../../utils/localStorageDB';

export default function AdminPage() {
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [mounted, setMounted] = useState(false);

  // 컴포넌트가 마운트된 후에만 실행
  useEffect(() => {
    setMounted(true);
  }, []);

  // 청첩장 목록 조회 (localStorageDB 사용)
  const fetchInvitations = async (page = 1) => {
    if (!mounted) return; // 클라이언트 사이드에서만 실행

    try {
      setLoading(true);

      // localStorageDB를 사용하여 검색
      const result = localDB.searchInvitations({
        search: searchTerm,
        status: statusFilter,
        page: page,
        limit: 10
      });

      if (result.success) {
        setInvitations(result.data.invitations);
        setTotalPages(result.data.pagination.totalPages);
        setTotalCount(result.data.pagination.totalCount);
        setCurrentPage(result.data.pagination.currentPage);
      } else {
        console.error('데이터 조회 실패:', result.message);
        setInvitations([]);
        setTotalPages(1);
        setTotalCount(0);
      }
    } catch (error) {
      console.error('데이터 조회 오류:', error);
      setInvitations([]);
      setTotalPages(1);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (mounted) {
      fetchInvitations(1);
    }
  }, [searchTerm, statusFilter, mounted]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (mounted) {
      fetchInvitations(1);
    }
  };

  const handleDelete = async (invitationId) => {
    if (!mounted) return;

    if (confirm('정말 삭제하시겠습니까?')) {
      try {
        // localStorageDB를 사용하여 삭제
        const result = localDB.deleteInvitation(invitationId);

        if (result.success) {
          alert('삭제되었습니다.');
          fetchInvitations(currentPage);
        } else {
          alert(result.message || '삭제에 실패했습니다.');
        }
      } catch (error) {
        console.error('삭제 오류:', error);
        alert('삭제 중 오류가 발생했습니다.');
      }
    }
  };

  const getStatusBadge = (status) => {
    const statusColors = {
      draft: 'bg-yellow-100 text-yellow-800',
      published: 'bg-green-100 text-green-800',
      archived: 'bg-gray-100 text-gray-800'
    };

    const statusText = {
      draft: '임시저장',
      published: '게시됨',
      archived: '보관됨'
    };

    return (
      <span className={`px-2 py-1 text-xs rounded-full ${statusColors[status] || 'bg-gray-100 text-gray-800'}`}>
        {statusText[status] || status}
      </span>
    );
  };

  // 서버사이드 렌더링 중에는 로딩 상태만 보여줌
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto"></div>
          <p className="mt-2 text-gray-500">로딩 중...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-['Pretendard','Noto_Sans_KR',sans-serif]">
      {/* 헤더 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-bold text-gold">
                EverVow
              </Link>
              <span className="text-gray-400">|</span>
              <h1 className="text-xl font-semibold text-gray-800">관리자 페이지</h1>
            </div>
            <Link
              href="/form"
              className="bg-gold text-white px-4 py-2 rounded-lg hover:bg-opacity-90 transition-colors"
            >
              새 청첩장 만들기
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* 필터 및 검색 */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="신랑/신부 이름 또는 장소로 검색..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
              />
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-gold"
              >
                <option value="">전체 상태</option>
                <option value="draft">임시저장</option>
                <option value="published">게시됨</option>
                <option value="archived">보관됨</option>
              </select>
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-gold text-white rounded-lg hover:bg-opacity-90 transition-colors"
            >
              검색
            </button>
          </form>
        </div>

        {/* 청첩장 목록 */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">저장된 청첩장 목록</h2>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gold mx-auto"></div>
              <p className="mt-2 text-gray-500">로딩 중...</p>
            </div>
          ) : invitations.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              저장된 청첩장이 없습니다.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      커플 정보
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      예식 정보
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      상태
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      생성일
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      액션
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {invitations.map((invitation) => (
                    <tr key={invitation.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {invitation.groom_kor_name} ♥ {invitation.bride_kor_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            ID: {invitation.id}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-gray-900">{invitation.venue}</div>
                          <div className="text-sm text-gray-500">{invitation.wedding_date}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {getStatusBadge(invitation.status)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(invitation.created_at).toLocaleDateString('ko-KR')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <Link
                          href={`/admin/invitations/${invitation.id}`}
                          className="text-gold hover:text-gold-dark"
                        >
                          상세보기
                        </Link>
                        <Link
                          href={`/invite/${invitation.share_url}`}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          미리보기
                        </Link>
                        <button
                          onClick={() => handleDelete(invitation.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          삭제
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* 페이지네이션 */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
              <div className="text-sm text-gray-700">
                페이지 {currentPage} / {totalPages}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => fetchInvitations(currentPage - 1)}
                  disabled={currentPage <= 1}
                  className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  이전
                </button>
                <button
                  onClick={() => fetchInvitations(currentPage + 1)}
                  disabled={currentPage >= totalPages}
                  className="px-3 py-1 text-sm border border-gray-300 rounded disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  다음
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
