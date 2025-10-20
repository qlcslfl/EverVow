"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { templates, getTemplateComponent } from '../../utils/templates';

export default function Invite() {
  const router = useRouter();
  const { id, designId } = router.query;
  const [weddingData, setWeddingData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // 템플릿 메타데이터와 컴포넌트 가져오기
  const templateId = Number(designId) || 1;
  const template = templates.find((t) => t.id === templateId) || templates[0];
  const TemplateComponent = template?.component || getTemplateComponent(templateId);

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
            groomName: foundInvitation.groom_kor_name || foundInvitation.groomKorName || '신랑',
            brideName: foundInvitation.bride_kor_name || foundInvitation.brideKorName || '신부',
            weddingDate: foundInvitation.wedding_date || foundInvitation.weddingDate || '2024-12-25',
            weddingTime: foundInvitation.wedding_time || foundInvitation.weddingTime || '14:00',
            venueName: foundInvitation.venue || '웨딩홀',
            venueAddress: foundInvitation.venue_address || foundInvitation.venueAddress || '서울시 강남구',
            greetingMessage: foundInvitation.message || '저희의 결혼식에 초대합니다.',
            heroImage: foundInvitation.title_image || foundInvitation.titleImage || '',
            galleryImages: foundInvitation.gallery || foundInvitation.gallery_images || [],
            groomParents: `${foundInvitation.groom_father_name || '신랑아버지'} · ${foundInvitation.groom_mother_name || '신랑어머니'}의 아들`,
            brideParents: `${foundInvitation.bride_father_name || '신부아버지'} · ${foundInvitation.bride_mother_name || '신부어머니'}의 딸`,
            groomPhone: foundInvitation.groom_phone || '',
            bridePhone: foundInvitation.bride_phone || '',
            venueDetail: foundInvitation.venue_detail || '',
            footerMessage: foundInvitation.footer_message || '함께해 주셔서 감사합니다'
          };

          console.log('=== 처리된 데이터 ===');
          console.log('Processed data:', processedData);

          setWeddingData(processedData);
        } else {
          console.log('=== 데이터 없음 - 샘플 데이터 사용 ===');

          // 샘플 데이터 생성
          const sampleData = {
            groomName: '김신랑',
            brideName: '박신부',
            weddingDate: '2024년 12월 25일 토요일',
            weddingTime: '오후 2시',
            venueName: '그랜드 웨딩홀',
            venueAddress: '서울시 강남구 테헤란로 123',
            greetingMessage: '저희 두 사람이 사랑으로 하나가 되는\n소중한 자리에 여러분을 초대합니다.',
            heroImage: '',
            galleryImages: [],
            groomParents: '김아버지 · 김어머니의 아들',
            brideParents: '박아버지 · 박어머니의 딸',
            groomPhone: '010-1234-5678',
            bridePhone: '010-8765-4321',
            venueDetail: '3층 그랜드홀',
            footerMessage: '함께해 주셔서 감사합니다'
          };

          console.log('Using sample data:', sampleData);
          setWeddingData(sampleData);
        }
      } catch (error) {
        console.error('=== 오류 발생 ===');
        console.error('Error loading invitation data:', error);

        // 에러 발생 시에도 샘플 데이터 제공
        const errorSampleData = {
          groomName: '김신랑',
          brideName: '박신부',
          weddingDate: '2024년 12월 25일 토요일',
          weddingTime: '오후 2시',
          venueName: '그랜드 웨딩홀',
          venueAddress: '서울시 강남구 테헤란로 123',
          greetingMessage: '저희 두 사람이 사랑으로 하나가 되는\n소중한 자리에 여러분을 초대합니다.',
          heroImage: '',
          galleryImages: [],
          groomParents: '김아버지 · 김어머니의 아들',
          brideParents: '박아버지 · 박어머니의 딸',
          footerMessage: '함께해 주셔서 감사합니다'
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
        <title>{weddingData.groomName} ♥ {weddingData.brideName} 결혼식 초대</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={`${weddingData.groomName} ♥ ${weddingData.brideName} 결혼식 초대`} />
        <meta property="og:description" content={weddingData.greetingMessage} />
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&family=Noto+Serif+KR:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </Head>

      {/* 템플릿 컴포넌트 렌더링 */}
      <TemplateComponent data={weddingData} />
    </>
  );
}
