// 청첩장 데이터 저장 API
import localDB from '../../../utils/localStorageDB';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const {
      // 커플 정보
      groomKorName,
      groomEngName,
      brideKorName,
      brideEngName,
      groomPhone,
      bridePhone,

      // 예식 정보
      weddingDate,
      weddingTime,
      venue,
      venueAddress,

      // 인사말
      message,

      // 가족 정보
      groomFatherName,
      groomMotherName,
      brideFatherName,
      brideMotherName,

      // 계좌 정보
      accountInfo,

      // 갤러리 이미지 URLs (Firebase Storage에서 받은 URL들)
      galleryImages,

      // 디자인 선택
      designId,

      // 사용자 정보
      userInfo
    } = req.body;

    // 데이터 검증
    if (!groomKorName || !brideKorName || !weddingDate || !venue) {
      return res.status(400).json({
        message: '필수 정보가 누락되었습니다.'
      });
    }

    // 고유한 공유 URL 생성
    const shareUrl = generateUniqueShareUrl();

    // localStorage에 저장할 데이터 구성
    const invitationData = {
      groom_kor_name: groomKorName,
      groom_eng_name: groomEngName,
      bride_kor_name: brideKorName,
      bride_eng_name: brideEngName,
      groom_phone: groomPhone,
      bride_phone: bridePhone,
      wedding_date: weddingDate,
      wedding_time: weddingTime,
      venue: venue,
      venue_address: venueAddress,
      message: message,
      groom_father_name: groomFatherName,
      groom_mother_name: groomMotherName,
      bride_father_name: brideFatherName,
      bride_mother_name: brideMotherName,
      account_info: accountInfo, // 이미 객체 형태로 전달됨
      gallery_images: galleryImages || [], // Firebase Storage URL들
      design_id: designId,
      share_url: shareUrl,
      status: 'draft'
    };

    // localStorage에 실제로 저장 (클라이언트 사이드에서 실행됨)
    const saveResult = localDB.saveInvitation(invitationData);

    if (saveResult.success) {
      res.status(201).json({
        success: true,
        data: {
          invitationId: saveResult.data.id,
          shareUrl: shareUrl,
          previewUrl: `/preview/${saveResult.data.id}`,
          message: '청첩장이 성공적으로 생성되었습니다.'
        }
      });
    } else {
      throw new Error(saveResult.message);
    }

  } catch (error) {
    console.error('청첩장 저장 오류:', error);
    res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다: ' + error.message
    });
  }
}

// 고유한 공유 URL 생성 함수
function generateUniqueShareUrl() {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `${timestamp}${randomStr}`;
}
