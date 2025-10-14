// 로컬 스토리지 기반 임시 데이터 저장소
class LocalStorageDB {
  constructor() {
    this.INVITATIONS_KEY = 'evervow_invitations';
  }

  // 브라우저 환경 체크
  isClient() {
    return typeof window !== 'undefined';
  }

  // 모든 청첩장 가져오기
  getAllInvitations() {
    if (!this.isClient()) return [];

    try {
      const data = localStorage.getItem(this.INVITATIONS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('데이터 읽기 오류:', error);
      return [];
    }
  }

  // 청첩장 저장
  saveInvitation(invitationData) {
    if (!this.isClient()) {
      return {
        success: false,
        message: '브라우저 환경에서만 사용 가능합니다.'
      };
    }

    try {
      const invitations = this.getAllInvitations();
      const newInvitation = {
        ...invitationData,
        id: invitationData.id || 'inv_' + Date.now(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        status: invitationData.status || 'draft'
      };

      invitations.push(newInvitation);
      localStorage.setItem(this.INVITATIONS_KEY, JSON.stringify(invitations));

      return {
        success: true,
        data: newInvitation
      };
    } catch (error) {
      console.error('저장 오류:', error);
      return {
        success: false,
        message: '저장 중 오류가 발생했습니다.'
      };
    }
  }

  // ID로 청첩장 조회
  getInvitationById(id) {
    if (!this.isClient()) {
      return {
        success: false,
        message: '브라우저 환경에서만 사용 가능합니다.'
      };
    }

    try {
      const invitations = this.getAllInvitations();
      const invitation = invitations.find(inv => inv.id === id);

      return invitation ? {
        success: true,
        data: invitation
      } : {
        success: false,
        message: '청첩장을 찾을 수 없습니다.'
      };
    } catch (error) {
      console.error('조회 오류:', error);
      return {
        success: false,
        message: '조회 중 오류가 발생했습니다.'
      };
    }
  }

  // 청첩장 수정
  updateInvitation(id, updateData) {
    if (!this.isClient()) {
      return {
        success: false,
        message: '브라우저 환경에서만 사용 가능합니다.'
      };
    }

    try {
      const invitations = this.getAllInvitations();
      const index = invitations.findIndex(inv => inv.id === id);

      if (index === -1) {
        return {
          success: false,
          message: '청첩장을 찾을 수 없습니다.'
        };
      }

      invitations[index] = {
        ...invitations[index],
        ...updateData,
        updated_at: new Date().toISOString()
      };

      localStorage.setItem(this.INVITATIONS_KEY, JSON.stringify(invitations));

      return {
        success: true,
        data: invitations[index]
      };
    } catch (error) {
      console.error('수정 오류:', error);
      return {
        success: false,
        message: '수정 중 오류가 발생했습니다.'
      };
    }
  }

  // 청첩장 삭제
  deleteInvitation(id) {
    if (!this.isClient()) {
      return {
        success: false,
        message: '브라우저 환경에서만 사용 가능합니다.'
      };
    }

    try {
      const invitations = this.getAllInvitations();
      const filteredInvitations = invitations.filter(inv => inv.id !== id);

      if (invitations.length === filteredInvitations.length) {
        return {
          success: false,
          message: '청첩장을 찾을 수 없습니다.'
        };
      }

      localStorage.setItem(this.INVITATIONS_KEY, JSON.stringify(filteredInvitations));

      return {
        success: true,
        message: '청첩장이 삭제되었습니다.'
      };
    } catch (error) {
      console.error('삭제 오류:', error);
      return {
        success: false,
        message: '삭제 중 오류가 발생했습니다.'
      };
    }
  }

  // 검색 및 필터링
  searchInvitations(options = {}) {
    try {
      let invitations = this.getAllInvitations();
      const { search, status, page = 1, limit = 10 } = options;

      // 검색 필터링
      if (search) {
        invitations = invitations.filter(inv =>
          inv.groom_kor_name?.includes(search) ||
          inv.bride_kor_name?.includes(search) ||
          inv.venue?.includes(search)
        );
      }

      // 상태 필터링
      if (status) {
        invitations = invitations.filter(inv => inv.status === status);
      }

      // 생성일 기준 내림차순 정렬
      invitations.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      // 페이지네이션
      const totalCount = invitations.length;
      const totalPages = Math.ceil(totalCount / limit);
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedInvitations = invitations.slice(startIndex, endIndex);

      return {
        success: true,
        data: {
          invitations: paginatedInvitations,
          pagination: {
            currentPage: parseInt(page),
            totalPages: totalPages,
            totalCount: totalCount,
            limit: parseInt(limit),
            hasNext: page < totalPages,
            hasPrev: page > 1
          }
        }
      };
    } catch (error) {
      console.error('검색 오류:', error);
      return {
        success: false,
        message: '검색 중 오류가 발생했습니다.'
      };
    }
  }

  // 데이터 초기화 (개발용)
  clearAll() {
    if (!this.isClient()) return;
    localStorage.removeItem(this.INVITATIONS_KEY);
  }

  // 샘플 데이터 생성 (개발용)
  createSampleData() {
    if (!this.isClient()) {
      console.log('브라우저 환경에서만 사용 가능합니다.');
      return;
    }

    const sampleInvitations = [
      {
        id: 'inv_sample_001',
        groom_kor_name: '김민수',
        groom_eng_name: 'Kim Min Su',
        bride_kor_name: '이지영',
        bride_eng_name: 'Lee Ji Young',
        groom_phone: '010-1234-5678',
        bride_phone: '010-9876-5432',
        wedding_date: '2024-12-25',
        wedding_time: '14:00',
        venue: '그랜드 하얏트 서울',
        venue_address: '서울시 용산구 한강대로 322',
        message: '두 사람이 만나 사랑을 키워온 시간만큼,\n소중한 분들과 함께하는 이 날이 더욱 특별해집니다.\n축복해주셔서 감사합니다.',
        account_info: {
          groom: { account: '123456789', bank: '국민은행' },
          bride: { account: '987654321', bank: '신한은행' }
        },
        gallery_images: [
          'https://images.unsplash.com/photo-1519741497674-611481863552?w=400',
          'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400'
        ],
        share_url: 'sample001',
        status: 'published',
        created_at: '2024-10-13T10:30:00Z',
        updated_at: '2024-10-13T10:30:00Z'
      },
      {
        id: 'inv_sample_002',
        groom_kor_name: '박준호',
        groom_eng_name: 'Park Jun Ho',
        bride_kor_name: '최수진',
        bride_eng_name: 'Choi Su Jin',
        wedding_date: '2024-11-15',
        wedding_time: '16:30',
        venue: '롯데호텔 서울',
        venue_address: '서울시 중구 을지로 30',
        message: '평생을 함께 걸어갈 두 사람의 새로운 시작을\n따뜻한 마음으로 축복해 주세요.',
        account_info: {
          groom: { account: '555777999', bank: '우리은행' },
          bride: { account: '111333555', bank: '하나은행' }
        },
        gallery_images: [],
        share_url: 'sample002',
        status: 'draft',
        created_at: '2024-10-12T15:20:00Z',
        updated_at: '2024-10-12T15:20:00Z'
      }
    ];

    localStorage.setItem(this.INVITATIONS_KEY, JSON.stringify(sampleInvitations));
    console.log('샘플 데이터가 생성되었습니다.');
  }
}

// 싱글톤 인스턴스 생성
const localDB = new LocalStorageDB();

export default localDB;
