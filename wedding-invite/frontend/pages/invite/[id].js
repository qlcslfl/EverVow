"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

export default function Invite() {
  const router = useRouter();
  const { id } = router.query;
  const [weddingData, setWeddingData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !id) return;

    console.log('페이지 로딩 시작:', id);

    const timer = setTimeout(() => {
      try {
        // localStorage에서 데이터 가져오기
        const existingData = localStorage.getItem('evervow_invitations');
        console.log('=== 미리보기 디버깅 시작 ===');
        console.log('URL ID:', id, typeof id);
        console.log('Raw localStorage data:', existingData);

        const invitations = existingData ? JSON.parse(existingData) : [];
        console.log('Parsed invitations:', invitations);
        console.log('Total invitations found:', invitations.length);

        // 모든 초대장의 ID와 share_url 로깅
        invitations.forEach((inv, index) => {
          console.log(`Invitation ${index}:`, {
            id: inv.id,
            share_url: inv.share_url,
            groom_name: inv.groom_kor_name,
            bride_name: inv.bride_kor_name
          });
        });

        // 다양한 방법으로 ID 매칭 시도
        let foundInvitation = null;

        // 1. 정확한 ID 매칭
        foundInvitation = invitations.find(inv => inv.id === id);
        if (foundInvitation) {
          console.log('Found by exact ID match:', foundInvitation.id);
        }

        // 2. String ID 매칭
        if (!foundInvitation) {
          foundInvitation = invitations.find(inv => String(inv.id) === String(id));
          if (foundInvitation) {
            console.log('Found by string ID match:', foundInvitation.id);
          }
        }

        // 3. share_url 매칭
        if (!foundInvitation) {
          foundInvitation = invitations.find(inv => inv.share_url === id);
          if (foundInvitation) {
            console.log('Found by share_url match:', foundInvitation.share_url);
          }
        }

        // 4. share_url string 매칭
        if (!foundInvitation) {
          foundInvitation = invitations.find(inv => String(inv.share_url) === String(id));
          if (foundInvitation) {
            console.log('Found by string share_url match:', foundInvitation.share_url);
          }
        }

        // 5. 배열의 첫 번째 요소 (테스트용)
        if (!foundInvitation && invitations.length > 0) {
          console.log('No exact match found, using first invitation for testing');
          foundInvitation = invitations[0];
        }

        if (foundInvitation) {
          console.log('=== 선택된 초대장 ===');
          console.log('Found invitation:', foundInvitation);

          const processedData = {
            ...foundInvitation,
            groomKorName: foundInvitation.groom_kor_name || foundInvitation.groomKorName || '신랑',
            groomEngName: foundInvitation.groom_eng_name || foundInvitation.groomEngName || 'Groom',
            brideKorName: foundInvitation.bride_kor_name || foundInvitation.brideKorName || '신부',
            brideEngName: foundInvitation.bride_eng_name || foundInvitation.brideEngName || 'Bride',
            weddingDate: foundInvitation.wedding_date || foundInvitation.weddingDate || '2024-12-25',
            weddingTime: foundInvitation.wedding_time || foundInvitation.weddingTime || '14:00',
            venue: foundInvitation.venue || '웨딩홀',
            venueAddress: foundInvitation.venue_address || foundInvitation.venueAddress || '서울시 강남구',
            message: foundInvitation.message || '저희의 결혼식에 초대합니다.',
            titleImage: foundInvitation.title_image || foundInvitation.titleImage || '',
            gallery: foundInvitation.gallery || foundInvitation.gallery_images || [],
            groomFatherName: foundInvitation.groom_father_name || foundInvitation.groomFatherName || '신랑아버지',
            groomMotherName: foundInvitation.groom_mother_name || foundInvitation.groomMotherName || '신랑어머니',
            brideFatherName: foundInvitation.bride_father_name || foundInvitation.brideFatherName || '신부아버지',
            brideMotherName: foundInvitation.bride_mother_name || foundInvitation.brideMotherName || '신부어머니'
          };

          console.log('=== 처리된 데이터 ===');
          console.log('Processed data:', processedData);

          setWeddingData(processedData);
        } else {
          console.log('=== 데이터 없음 - 샘플 데이터 사용 ===');
          console.log('No invitation found for ID:', id);
          console.log('Available invitations:', invitations.map(inv => ({
            id: inv.id,
            share_url: inv.share_url,
            names: `${inv.groom_kor_name || inv.groomKorName || 'Unknown'} & ${inv.bride_kor_name || inv.brideKorName || 'Unknown'}`
          })));

          // 샘플 데이터 생성
          const sampleData = {
            groomKorName: '김신랑',
            brideKorName: '박신부',
            groomEngName: 'Groom Kim',
            brideEngName: 'Bride Park',
            weddingDate: '2024-12-25',
            weddingTime: '14:00',
            venue: '샘플 웨딩홀',
            venueAddress: '서울시 강남구 샘플로 123',
            message: '저희 두 사람이 사랑으로 하나가 되는 소중한 자리에\n여러분을 초대합니다.',
            groomFatherName: '김아버지',
            groomMotherName: '김어머니',
            brideFatherName: '박아버지',
            brideMotherName: '박어머니'
          };

          console.log('Using sample data:', sampleData);
          setWeddingData(sampleData);
        }
      } catch (error) {
        console.error('=== 오류 발생 ===');
        console.error('Error loading invitation data:', error);

        // 에러 발생 시에도 샘플 데이터 제공
        const errorSampleData = {
          groomKorName: '김신랑',
          brideKorName: '박신부',
          groomEngName: 'Groom Kim',
          brideEngName: 'Bride Park',
          weddingDate: '2024-12-25',
          weddingTime: '14:00',
          venue: '샘플 웨딩홀',
          venueAddress: '서울시 강남구 샘플로 123',
          message: '저희 두 사람이 사랑으로 하나가 되는 소중한 자리에\n여러분을 초대합니다.',
          groomFatherName: '김아버지',
          groomMotherName: '김어머니',
          brideFatherName: '박아버지',
          brideMotherName: '박어머니'
        };

        console.log('Using error fallback data:', errorSampleData);
        setWeddingData(errorSampleData);
      }

      console.log('=== 미리보기 디버깅 종료 ===');
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [mounted, id]);

  // 마운트되지 않았으면 아무것도 렌더링하지 않음
  if (!mounted) {
    return null;
  }

  console.log('렌더링 상태:', { isLoading, weddingData: !!weddingData });

  if (isLoading) {
    return (
      <>
        <Head>
          <title>청첩장 로딩중...</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p className="text-gray-600">청첩장을 불러오고 있습니다...</p>
          </div>
        </div>
      </>
    );
  }

  if (!weddingData) {
    return (
      <>
        <Head>
          <title>청첩장을 찾을 수 없습니다</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <p className="text-gray-600">청첩장을 찾을 수 없습니다.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{weddingData.groomKorName} ♥ {weddingData.brideKorName} 결혼식 초대</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </Head>

      <div className="min-h-screen bg-gray-50 font-['Noto_Sans_KR',sans-serif]">
        <div className="max-w-md mx-auto bg-white min-h-screen">
          {/* 메인 섹션 */}
          <div className="px-6 py-12 text-center">
            {/* 대표 이미지 */}
            <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border">
              {weddingData.titleImage ? (
                <img
                  src={weddingData.titleImage}
                  alt="Wedding couple"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
              ) : null}
              <span className="text-3xl" style={{
                display: weddingData.titleImage ? 'none' : 'block'
              }}>💍</span>
            </div>

            {/* 커플 이름 */}
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {weddingData.groomKorName} ♥ {weddingData.brideKorName}
            </h1>

            <p className="text-sm text-gray-500 mb-8 uppercase tracking-wider">
              {weddingData.groomEngName} & {weddingData.brideEngName}
            </p>

            {/* 날짜 및 시간 */}
            <div className="mb-8">
              <p className="text-xl text-gray-800 mb-1">
                2024년 12월 25일 수요일
              </p>
              <p className="text-gray-600">
                오후 2시 00분
              </p>
            </div>

            {/* 장소 */}
            <div className="mb-8">
              <p className="text-lg text-gray-800 mb-1">
                {weddingData.venue}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                {weddingData.venueAddress}
              </p>
              <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors">
                지도 보기
              </button>
            </div>

            {/* 인사말 */}
            <div className="bg-gray-50 p-6 rounded-lg mb-8">
              <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm">
                {weddingData.message}
              </p>
            </div>

            {/* 신랑신부 정보 */}
            <div className="flex justify-between text-xs text-gray-600 bg-gray-50 p-4 rounded-lg">
              <div className="text-left">
                <p className="mb-1">신랑: {weddingData.groomKorName}</p>
                <p className="mb-2">{weddingData.groomFatherName} · {weddingData.groomMotherName}</p>
                <p className="text-gray-500">의 아들</p>
              </div>
              <div className="text-right">
                <p className="mb-1">신부: {weddingData.brideKorName}</p>
                <p className="mb-2">{weddingData.brideFatherName} · {weddingData.brideMotherName}</p>
                <p className="text-gray-500">의 딸</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
