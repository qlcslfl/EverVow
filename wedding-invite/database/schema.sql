-- EverVow 청첩장 서비스 데이터베이스 스키마

-- 사용자 테이블
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 디자인 템플릿 테이블
CREATE TABLE designs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    title VARCHAR(100) NOT NULL,
    subtitle VARCHAR(100),
    description TEXT,
    thumbnail_url VARCHAR(500),
    css_theme JSONB NOT NULL, -- 색상, 폰트 등 테마 정보
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 청첩장 테이블
CREATE TABLE invitations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    design_id INTEGER REFERENCES designs(id),

    -- 커플 정보
    groom_kor_name VARCHAR(50) NOT NULL,
    groom_eng_name VARCHAR(100),
    bride_kor_name VARCHAR(50) NOT NULL,
    bride_eng_name VARCHAR(100),
    groom_phone VARCHAR(20),
    bride_phone VARCHAR(20),

    -- 예식 정보
    wedding_date DATE NOT NULL,
    wedding_time TIME NOT NULL,
    venue VARCHAR(200) NOT NULL,
    venue_address TEXT NOT NULL,

    -- 인사말
    message TEXT,

    -- 가족 정보
    groom_father_name VARCHAR(50),
    groom_mother_name VARCHAR(50),
    bride_father_name VARCHAR(50),
    bride_mother_name VARCHAR(50),

    -- 계좌 정보 (JSON으로 저장)
    account_info JSONB,

    -- 갤러리 이미지 URL들
    gallery_images JSONB,

    -- 상태 관리
    status VARCHAR(20) DEFAULT 'draft', -- draft, published, archived
    is_public BOOLEAN DEFAULT true,
    view_count INTEGER DEFAULT 0,

    -- 공유 링크
    share_url VARCHAR(100) UNIQUE,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- RSVP 응답 테이블
CREATE TABLE rsvp_responses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invitation_id UUID REFERENCES invitations(id) ON DELETE CASCADE,
    guest_name VARCHAR(100) NOT NULL,
    attendance VARCHAR(20) NOT NULL, -- 참석, 불참석
    message TEXT,
    contact VARCHAR(20),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 인덱스 생성
CREATE INDEX idx_invitations_user_id ON invitations(user_id);
CREATE INDEX idx_invitations_share_url ON invitations(share_url);
CREATE INDEX idx_invitations_status ON invitations(status);
CREATE INDEX idx_rsvp_invitation_id ON rsvp_responses(invitation_id);

-- 기본 디자인 템플릿 데이터 삽입
INSERT INTO designs (name, title, subtitle, description, css_theme) VALUES
('modern_minimal', 'Modern Minimal', '미니멀 모던', '깔끔하고 세련된 현대적 스타일', '{"color": "from-gray-100 to-gray-200", "accent": "#D4AF37", "textColor": "text-gray-800"}'),
('classic_elegant', 'Classic Elegant', '클래식 엘레간트', '우아하고 고급스러운 전통적 스타일', '{"color": "from-rose-50 to-rose-100", "accent": "#be185d", "textColor": "text-rose-800"}'),
('nature_garden', 'Nature Garden', '네이처 가든', '자연스럽고 따뜻한 보태니컬 스타일', '{"color": "from-green-50 to-emerald-100", "accent": "#059669", "textColor": "text-emerald-800"}'),
('vintage_romance', 'Vintage Romance', '빈티지 로맨스', '로맨틱하고 감성적인 빈티지 스타일', '{"color": "from-purple-50 to-pink-100", "accent": "#c026d3", "textColor": "text-purple-800"}'),
('luxury_gold', 'Luxury Gold', '럭셔리 골드', '화려하고 고급스러운 골드 스타일', '{"color": "from-yellow-50 to-amber-100", "accent": "#d97706", "textColor": "text-amber-800"}'),
('ocean_blue', 'Ocean Blue', '오션 블루', '시원하고 모던한 블루 스타일', '{"color": "from-blue-50 to-cyan-100", "accent": "#0891b2", "textColor": "text-cyan-800"}');

-- 트리거 함수: updated_at 자동 업데이트
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 트리거 적용
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_designs_updated_at BEFORE UPDATE ON designs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_invitations_updated_at BEFORE UPDATE ON invitations FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
