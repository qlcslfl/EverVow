// 청첩장 목록 조회 API
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { page = 1, limit = 10, status, search } = req.query;

    // TODO: 실제 PostgreSQL에서 목록 조회
    // const offset = (page - 1) * limit;
    // let query = 'SELECT * FROM invitations';
    // const conditions = [];
    // const params = [];

    // if (status) {
    //   conditions.push('status = $' + (params.length + 1));
    //   params.push(status);
    // }

    // if (search) {
    //   conditions.push('(groom_kor_name ILIKE $' + (params.length + 1) + ' OR bride_kor_name ILIKE $' + (params.length + 2) + ')');
    //   params.push(`%${search}%`, `%${search}%`);
    // }

    // if (conditions.length > 0) {
    //   query += ' WHERE ' + conditions.join(' AND ');
    // }

    // query += ' ORDER BY created_at DESC LIMIT $' + (params.length + 1) + ' OFFSET $' + (params.length + 2);
    // params.push(limit, offset);

    // const result = await db.query(query, params);
    // const countResult = await db.query('SELECT COUNT(*) FROM invitations' + (conditions.length > 0 ? ' WHERE ' + conditions.join(' AND ') : ''), params.slice(0, -2));

    // 임시 목록 데이터
    const mockInvitations = [
      {
        id: 'inv_1697180400000',
        groom_kor_name: '김민수',
        bride_kor_name: '이지영',
        wedding_date: '2024-12-25',
        venue: '그랜드 하얏트 서울',
        status: 'published',
        share_url: 'abc123def456',
        created_at: '2024-10-13T10:30:00Z',
        updated_at: '2024-10-13T10:30:00Z'
      },
      {
        id: 'inv_1697180500000',
        groom_kor_name: '박준호',
        bride_kor_name: '최수진',
        wedding_date: '2024-11-15',
        venue: '롯데호텔 서울',
        status: 'draft',
        share_url: 'xyz789ghi012',
        created_at: '2024-10-13T09:15:00Z',
        updated_at: '2024-10-13T09:15:00Z'
      },
      {
        id: 'inv_1697180600000',
        groom_kor_name: '정태현',
        bride_kor_name: '김하늘',
        wedding_date: '2024-10-30',
        venue: '신라호텔 서울',
        status: 'published',
        share_url: 'def456jkl789',
        created_at: '2024-10-12T16:45:00Z',
        updated_at: '2024-10-12T16:45:00Z'
      }
    ];

    // 검색 및 필터링 적용 (임시)
    let filteredInvitations = mockInvitations;

    if (status) {
      filteredInvitations = filteredInvitations.filter(inv => inv.status === status);
    }

    if (search) {
      filteredInvitations = filteredInvitations.filter(inv =>
        inv.groom_kor_name.includes(search) ||
        inv.bride_kor_name.includes(search) ||
        inv.venue.includes(search)
      );
    }

    // 페이지네이션 적용
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedInvitations = filteredInvitations.slice(startIndex, endIndex);

    const totalCount = filteredInvitations.length;
    const totalPages = Math.ceil(totalCount / limit);

    res.status(200).json({
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
    });

  } catch (error) {
    console.error('목록 조회 오류:', error);
    res.status(500).json({
      success: false,
      message: '서버 오류가 발생했습니다.'
    });
  }
}
