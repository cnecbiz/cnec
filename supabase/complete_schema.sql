-- =============================================
-- CNEC Complete Database Schema
-- 뷰티 크리에이터 × 브랜드 매칭 플랫폼
-- =============================================

-- 기존 테이블 삭제
DROP TABLE IF EXISTS campaign_applications CASCADE;
DROP TABLE IF EXISTS campaign_deliveries CASCADE;
DROP TABLE IF EXISTS campaign_contents CASCADE;
DROP TABLE IF EXISTS campaigns CASCADE;
DROP TABLE IF EXISTS creator_favorites CASCADE;
DROP TABLE IF EXISTS recommended_creators CASCADE;
DROP TABLE IF EXISTS affiliated_creators CASCADE;
DROP TABLE IF EXISTS youtube_creators CASCADE;
DROP TABLE IF EXISTS point_transactions CASCADE;
DROP TABLE IF EXISTS withdrawals CASCADE;
DROP TABLE IF EXISTS revenues CASCADE;
DROP TABLE IF EXISTS expenses CASCADE;
DROP TABLE IF EXISTS contracts CASCADE;
DROP TABLE IF EXISTS email_templates CASCADE;
DROP TABLE IF EXISTS kakao_templates CASCADE;
DROP TABLE IF EXISTS portfolios CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;
DROP TABLE IF EXISTS blocked_ips CASCADE;
DROP TABLE IF EXISTS admin_users CASCADE;
DROP TABLE IF EXISTS brand_profiles CASCADE;
DROP TABLE IF EXISTS creator_profiles CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- =============================================
-- 1. 사용자 관련 테이블
-- =============================================

-- 기본 프로필 테이블
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  user_type VARCHAR(20) NOT NULL DEFAULT 'creator', -- admin, brand, creator
  name VARCHAR(100),
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  avatar_url TEXT,
  status VARCHAR(20) DEFAULT 'pending', -- pending, active, suspended, rejected
  email_verified BOOLEAN DEFAULT FALSE,
  phone_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 관리자 테이블
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  role VARCHAR(50) DEFAULT 'admin', -- super_admin, admin, manager
  permissions JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 광고주(브랜드) 프로필
CREATE TABLE brand_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  company_name VARCHAR(200) NOT NULL,
  ceo_name VARCHAR(100),
  business_number VARCHAR(20),
  business_document_url TEXT, -- 사업자등록증
  manager_name VARCHAR(100),
  manager_phone VARCHAR(20),
  manager_email VARCHAR(255),
  brand_name VARCHAR(200),
  brand_category VARCHAR(100),
  website_url TEXT,
  address TEXT,
  is_verified BOOLEAN DEFAULT FALSE, -- 사업자 인증 여부
  verified_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 크리에이터 프로필
CREATE TABLE creator_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE UNIQUE,
  nickname VARCHAR(100),
  profile_image_url TEXT,
  birth_date DATE,
  gender VARCHAR(10), -- male, female, other

  -- 피부 타입 (다중 선택)
  skin_types TEXT[] DEFAULT '{}', -- 건성, 지성, 복합성, 민감성
  skin_concerns TEXT[] DEFAULT '{}', -- 여드름, 모공, 주름, 기미, 탄력, 건조

  -- 자신있는 카테고리
  expert_categories TEXT[] DEFAULT '{}', -- 기초, 색조, 이너뷰티, 디바이스

  -- SNS 정보
  instagram_url TEXT,
  instagram_followers INTEGER DEFAULT 0,
  tiktok_url TEXT,
  tiktok_followers INTEGER DEFAULT 0,
  youtube_url TEXT,
  youtube_subscribers INTEGER DEFAULT 0,

  -- 등급 및 상태
  grade VARCHAR(20) DEFAULT 'normal', -- normal, silver, gold, platinum, diamond
  creator_type VARCHAR(50) DEFAULT 'general', -- general, recommended, affiliated, youtube_support

  -- 포인트 및 정산
  total_points INTEGER DEFAULT 0,
  available_points INTEGER DEFAULT 0,
  pending_points INTEGER DEFAULT 0,
  total_earned INTEGER DEFAULT 0,

  -- 캠페인 통계
  total_campaigns INTEGER DEFAULT 0,
  completed_campaigns INTEGER DEFAULT 0,
  average_rating DECIMAL(3,2) DEFAULT 0,

  -- 은행 정보 (정산용)
  bank_name VARCHAR(50),
  bank_account VARCHAR(50),
  bank_holder VARCHAR(100),

  -- 원고비 설정 (관리자가 설정)
  base_fee INTEGER DEFAULT 0,

  -- 계약 상태
  contract_signed BOOLEAN DEFAULT FALSE,
  contract_signed_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 2. 크리에이터 분류 테이블
-- =============================================

-- 추천 크리에이터
CREATE TABLE recommended_creators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES creator_profiles(id) ON DELETE CASCADE,
  fee INTEGER NOT NULL, -- 원고비
  priority INTEGER DEFAULT 0, -- 정렬 순서
  is_active BOOLEAN DEFAULT TRUE,
  added_by UUID REFERENCES profiles(id),
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 소속 크리에이터
CREATE TABLE affiliated_creators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES creator_profiles(id) ON DELETE CASCADE,
  fee INTEGER NOT NULL, -- 원고비
  contract_start_date DATE,
  contract_end_date DATE,
  commission_rate DECIMAL(5,2) DEFAULT 0, -- 수수료율
  is_active BOOLEAN DEFAULT TRUE,
  added_by UUID REFERENCES profiles(id),
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 유튜브 지원 크리에이터
CREATE TABLE youtube_creators (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES creator_profiles(id) ON DELETE CASCADE,
  youtube_channel_url TEXT NOT NULL,
  fee INTEGER NOT NULL, -- 원고비
  last_upload_date TIMESTAMPTZ,
  upload_count_weekly INTEGER DEFAULT 0,
  total_views INTEGER DEFAULT 0,
  total_videos INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  warning_count INTEGER DEFAULT 0, -- 알림톡 전송 횟수
  last_warning_sent TIMESTAMPTZ,
  added_by UUID REFERENCES profiles(id),
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 3. 캠페인 관련 테이블
-- =============================================

-- 캠페인 메인 테이블
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID REFERENCES brand_profiles(id) ON DELETE CASCADE,

  -- 기본 정보
  campaign_name VARCHAR(255) NOT NULL,
  campaign_type VARCHAR(50) NOT NULL, -- shortform, challenge_4week, premium
  status VARCHAR(30) DEFAULT 'draft', -- draft, pending, recruiting, in_progress, completed, cancelled

  -- 광고주 정보
  advertiser_name VARCHAR(200),
  brand_name VARCHAR(200),

  -- 제품 정보
  product_category VARCHAR(50), -- 기초, 색조, 디바이스, 이너뷰티, 기타
  product_name VARCHAR(255),
  product_url TEXT,
  product_price INTEGER,
  product_images TEXT[] DEFAULT '{}',

  -- 타겟 정보
  target_gender VARCHAR(20), -- all, male, female
  target_age_groups TEXT[] DEFAULT '{}', -- 10대, 20대, 30대, 40대, 50대+
  pain_points TEXT[] DEFAULT '{}', -- 모공, 주름, 기미, 여드름, 건조

  -- 모집 정보
  recruit_count INTEGER DEFAULT 1,
  fee_per_person INTEGER NOT NULL, -- 원고비
  product_quantity INTEGER DEFAULT 1,
  total_fee INTEGER, -- 총 원고료

  -- 일정
  recruit_start_date DATE,
  recruit_end_date DATE,
  selection_start_date DATE,
  selection_end_date DATE,
  upload_start_date DATE,
  upload_end_date DATE,

  -- 추가 옵션
  specific_upload_date DATE, -- 특정일 업로드
  specific_upload_fee INTEGER DEFAULT 50000, -- 특정일 업로드 추가비용
  story_link_required BOOLEAN DEFAULT FALSE,

  -- 콘텐츠 가이드
  video_concept VARCHAR(50), -- before_after, vlog, humor
  video_speed VARCHAR(20), -- fast, normal, slow
  video_length VARCHAR(20), -- 15sec, 30sec, 45sec, 60sec
  hooking_point TEXT, -- 2초 후킹 포인트
  reference_urls TEXT[] DEFAULT '{}',
  emphasis_points TEXT,
  required_scenes TEXT[] DEFAULT '{}', -- 필수 장면

  -- 기타 설정
  channel_promotion TEXT, -- 채널 할인/프로모션
  narration_required BOOLEAN DEFAULT FALSE,
  forbidden_keywords TEXT,
  hashtags TEXT[] DEFAULT '{}',
  instagram_handle TEXT,
  partnership_code_required BOOLEAN DEFAULT FALSE,

  -- 프리미엄 전용
  influencer_url TEXT, -- 섭외 인플루언서 URL
  desired_fee INTEGER, -- 희망 원고비

  -- 결제 정보
  total_amount INTEGER DEFAULT 0,
  payment_status VARCHAR(20) DEFAULT 'pending', -- pending, paid, refunded
  paid_at TIMESTAMPTZ,
  payment_method VARCHAR(50),

  -- 메타데이터
  view_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 캠페인 지원
CREATE TABLE campaign_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE CASCADE,
  creator_id UUID REFERENCES creator_profiles(id) ON DELETE CASCADE,

  status VARCHAR(30) DEFAULT 'applied', -- applied, selected, rejected, withdrawn, completed

  -- 지원 정보
  applied_at TIMESTAMPTZ DEFAULT NOW(),
  selected_at TIMESTAMPTZ,
  rejected_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,

  -- 배송 정보
  shipping_name VARCHAR(100),
  shipping_phone VARCHAR(20),
  shipping_address TEXT,
  shipping_memo TEXT,

  -- 송장 정보
  tracking_number VARCHAR(100),
  tracking_company VARCHAR(50),
  shipped_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,

  -- 평가
  brand_rating INTEGER, -- 광고주가 크리에이터 평가 (1-5)
  brand_review TEXT,
  creator_rating INTEGER, -- 크리에이터가 캠페인 평가 (1-5)
  creator_review TEXT,

  -- 포인트
  points_earned INTEGER DEFAULT 0,
  points_paid_at TIMESTAMPTZ,

  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(campaign_id, creator_id)
);

-- 캠페인 콘텐츠 (크리에이터 제출물)
CREATE TABLE campaign_contents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id UUID REFERENCES campaign_applications(id) ON DELETE CASCADE,

  -- 콘텐츠 정보
  content_type VARCHAR(20) DEFAULT 'video', -- video, image
  original_file_url TEXT, -- 원본 파일
  clean_file_url TEXT, -- 클린본 파일
  thumbnail_url TEXT,

  -- SNS 업로드 정보
  sns_platform VARCHAR(20), -- instagram, tiktok, youtube
  sns_post_url TEXT,
  uploaded_at TIMESTAMPTZ,

  -- 파트너십 광고
  partnership_code TEXT,

  -- 검수
  review_status VARCHAR(20) DEFAULT 'pending', -- pending, approved, rejected, revision_requested
  reviewed_at TIMESTAMPTZ,
  reviewed_by UUID REFERENCES profiles(id),
  review_note TEXT,
  revision_count INTEGER DEFAULT 0,

  -- 통계
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 4. 찜하기 기능
-- =============================================

CREATE TABLE creator_favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id UUID REFERENCES brand_profiles(id) ON DELETE CASCADE,
  creator_id UUID REFERENCES creator_profiles(id) ON DELETE CASCADE,
  note TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(brand_id, creator_id)
);

-- =============================================
-- 5. 매출 및 비용 관리
-- =============================================

-- 매출 관리
CREATE TABLE revenues (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
  brand_id UUID REFERENCES brand_profiles(id) ON DELETE SET NULL,

  revenue_type VARCHAR(50) NOT NULL, -- campaign, voucher, other
  voucher_type VARCHAR(50), -- 수출바우처 등

  amount INTEGER NOT NULL,
  description TEXT,

  -- 날짜
  revenue_date DATE NOT NULL,

  -- 수기 입력 여부
  is_manual BOOLEAN DEFAULT FALSE,

  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 비용 관리
CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  expense_date DATE NOT NULL,
  category VARCHAR(100), -- 인건비, 운영비, 마케팅비 등
  amount INTEGER NOT NULL,
  description TEXT,
  receipt_url TEXT,

  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 6. 포인트 및 출금
-- =============================================

-- 포인트 거래 내역
CREATE TABLE point_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES creator_profiles(id) ON DELETE CASCADE,

  transaction_type VARCHAR(30) NOT NULL, -- earn, withdraw, cancel, adjust
  amount INTEGER NOT NULL,
  balance_after INTEGER NOT NULL,

  -- 관련 정보
  campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,
  application_id UUID REFERENCES campaign_applications(id) ON DELETE SET NULL,
  withdrawal_id UUID,

  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 출금 요청
CREATE TABLE withdrawals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID REFERENCES creator_profiles(id) ON DELETE CASCADE,

  amount INTEGER NOT NULL,
  fee INTEGER DEFAULT 0, -- 출금 수수료
  net_amount INTEGER NOT NULL, -- 실수령액

  status VARCHAR(20) DEFAULT 'pending', -- pending, processing, completed, rejected

  -- 계좌 정보
  bank_name VARCHAR(50),
  bank_account VARCHAR(50),
  bank_holder VARCHAR(100),

  -- 처리 정보
  processed_at TIMESTAMPTZ,
  processed_by UUID REFERENCES profiles(id),
  rejection_reason TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 포인트 거래에 출금 FK 추가
ALTER TABLE point_transactions ADD CONSTRAINT fk_withdrawal
  FOREIGN KEY (withdrawal_id) REFERENCES withdrawals(id) ON DELETE SET NULL;

-- =============================================
-- 7. 계약서 관리
-- =============================================

CREATE TABLE contracts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),

  contract_type VARCHAR(50) NOT NULL, -- brand, creator
  template_name VARCHAR(200),

  -- 관련 당사자
  brand_id UUID REFERENCES brand_profiles(id) ON DELETE SET NULL,
  creator_id UUID REFERENCES creator_profiles(id) ON DELETE SET NULL,
  campaign_id UUID REFERENCES campaigns(id) ON DELETE SET NULL,

  -- 계약서 내용
  contract_content TEXT,
  contract_file_url TEXT,

  -- 서명 정보
  status VARCHAR(20) DEFAULT 'draft', -- draft, sent, viewed, signed, expired
  sent_at TIMESTAMPTZ,
  viewed_at TIMESTAMPTZ,
  signed_at TIMESTAMPTZ,
  signature_image_url TEXT,

  -- 이메일 발송
  recipient_email VARCHAR(255),
  email_sent_at TIMESTAMPTZ,

  expires_at TIMESTAMPTZ,

  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 8. 사이트 관리
-- =============================================

-- 포트폴리오 (랜딩 페이지용)
CREATE TABLE portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  video_url TEXT,
  video_file_url TEXT, -- 직접 업로드
  thumbnail_url TEXT,
  platform VARCHAR(50), -- tiktok, instagram, youtube
  creator_name VARCHAR(100),
  views INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT TRUE,
  sort_order INTEGER DEFAULT 0,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 사이트 설정
CREATE TABLE site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value TEXT,
  setting_type VARCHAR(20) DEFAULT 'text', -- text, json, number, boolean
  description TEXT,
  updated_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 이메일 템플릿
CREATE TABLE email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_key VARCHAR(100) UNIQUE NOT NULL, -- welcome, campaign_apply, etc.
  template_name VARCHAR(200) NOT NULL,
  subject VARCHAR(500),
  body_html TEXT,
  body_text TEXT,
  variables TEXT[] DEFAULT '{}', -- 사용 가능한 변수 목록
  is_active BOOLEAN DEFAULT TRUE,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 카카오 알림톡 템플릿
CREATE TABLE kakao_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_key VARCHAR(100) UNIQUE NOT NULL,
  template_name VARCHAR(200) NOT NULL,
  template_code VARCHAR(100), -- 카카오 템플릿 코드
  message_content TEXT,
  buttons JSONB DEFAULT '[]',
  variables TEXT[] DEFAULT '{}',
  is_active BOOLEAN DEFAULT TRUE,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- IP 차단 목록
CREATE TABLE blocked_ips (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ip_address VARCHAR(45) NOT NULL,
  reason TEXT,
  blocked_until TIMESTAMPTZ,
  is_permanent BOOLEAN DEFAULT FALSE,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 게시판/공지사항
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_type VARCHAR(50) DEFAULT 'notice', -- notice, faq, guide
  title VARCHAR(500) NOT NULL,
  content TEXT,
  is_published BOOLEAN DEFAULT FALSE,
  is_pinned BOOLEAN DEFAULT FALSE,
  view_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 9. 인덱스 생성
-- =============================================

CREATE INDEX idx_profiles_user_type ON profiles(user_type);
CREATE INDEX idx_profiles_status ON profiles(status);
CREATE INDEX idx_creator_profiles_grade ON creator_profiles(grade);
CREATE INDEX idx_creator_profiles_creator_type ON creator_profiles(creator_type);
CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_campaigns_type ON campaigns(campaign_type);
CREATE INDEX idx_campaigns_brand ON campaigns(brand_id);
CREATE INDEX idx_applications_campaign ON campaign_applications(campaign_id);
CREATE INDEX idx_applications_creator ON campaign_applications(creator_id);
CREATE INDEX idx_applications_status ON campaign_applications(status);
CREATE INDEX idx_revenues_date ON revenues(revenue_date);
CREATE INDEX idx_expenses_date ON expenses(expense_date);
CREATE INDEX idx_point_transactions_creator ON point_transactions(creator_id);
CREATE INDEX idx_withdrawals_status ON withdrawals(status);

-- =============================================
-- 10. RLS 비활성화 (개발 중)
-- =============================================

ALTER TABLE profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;
ALTER TABLE brand_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE creator_profiles DISABLE ROW LEVEL SECURITY;
ALTER TABLE recommended_creators DISABLE ROW LEVEL SECURITY;
ALTER TABLE affiliated_creators DISABLE ROW LEVEL SECURITY;
ALTER TABLE youtube_creators DISABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns DISABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_applications DISABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_contents DISABLE ROW LEVEL SECURITY;
ALTER TABLE creator_favorites DISABLE ROW LEVEL SECURITY;
ALTER TABLE revenues DISABLE ROW LEVEL SECURITY;
ALTER TABLE expenses DISABLE ROW LEVEL SECURITY;
ALTER TABLE point_transactions DISABLE ROW LEVEL SECURITY;
ALTER TABLE withdrawals DISABLE ROW LEVEL SECURITY;
ALTER TABLE contracts DISABLE ROW LEVEL SECURITY;
ALTER TABLE portfolios DISABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE email_templates DISABLE ROW LEVEL SECURITY;
ALTER TABLE kakao_templates DISABLE ROW LEVEL SECURITY;
ALTER TABLE blocked_ips DISABLE ROW LEVEL SECURITY;
ALTER TABLE posts DISABLE ROW LEVEL SECURITY;

-- =============================================
-- 11. 초기 데이터
-- =============================================

-- 기본 사이트 설정
INSERT INTO site_settings (setting_key, setting_value, setting_type, description) VALUES
('site_name', 'CNEC', 'text', '사이트 이름'),
('site_description', '뷰티 크리에이터 × 브랜드 매칭 플랫폼', 'text', '사이트 설명'),
('contact_email', 'contact@cnec.kr', 'text', '문의 이메일'),
('contact_phone', '02-1234-5678', 'text', '문의 전화'),
('seo_scripts', '', 'text', 'SEO 외부 스크립트'),
('google_analytics_id', '', 'text', 'Google Analytics ID'),
('kakao_channel_id', '', 'text', '카카오 채널 ID');

-- 이메일 템플릿
INSERT INTO email_templates (template_key, template_name, subject, body_html, variables) VALUES
('welcome_brand', '광고주 가입 환영', '[CNEC] 가입을 환영합니다!', '<h1>{{name}}님, 환영합니다!</h1><p>CNEC에 가입해 주셔서 감사합니다.</p>', ARRAY['name', 'email']),
('welcome_creator', '크리에이터 가입 환영', '[CNEC] 크리에이터 가입을 환영합니다!', '<h1>{{name}}님, 환영합니다!</h1><p>CNEC 크리에이터로 가입해 주셔서 감사합니다.</p>', ARRAY['name', 'email']),
('campaign_apply', '캠페인 지원 완료', '[CNEC] 캠페인 지원이 완료되었습니다', '<h1>{{campaign_name}} 캠페인에 지원하셨습니다.</h1>', ARRAY['name', 'campaign_name']),
('campaign_selected', '캠페인 선정 안내', '[CNEC] 캠페인에 선정되셨습니다!', '<h1>축하합니다! {{campaign_name}} 캠페인에 선정되셨습니다.</h1>', ARRAY['name', 'campaign_name']),
('contract_request', '전자계약서 서명 요청', '[CNEC] 전자계약서 서명을 요청드립니다', '<h1>전자계약서 서명을 요청드립니다.</h1><p>아래 링크를 클릭하여 계약서를 확인하고 서명해 주세요.</p>', ARRAY['name', 'contract_url']);

-- 카카오 알림톡 템플릿
INSERT INTO kakao_templates (template_key, template_name, message_content, variables) VALUES
('campaign_apply', '캠페인 지원 완료', '[CNEC] {{name}}님, {{campaign_name}} 캠페인 지원이 완료되었습니다.', ARRAY['name', 'campaign_name']),
('campaign_selected', '캠페인 선정 안내', '[CNEC] {{name}}님, {{campaign_name}} 캠페인에 선정되셨습니다! 축하드립니다.', ARRAY['name', 'campaign_name']),
('youtube_upload_warning', '유튜브 업로드 알림', '[CNEC] {{name}}님, 이번 주 업로드가 아직 완료되지 않았습니다. 기한 내 업로드 부탁드립니다.', ARRAY['name']),
('withdrawal_complete', '출금 완료 안내', '[CNEC] {{name}}님, {{amount}}원 출금이 완료되었습니다.', ARRAY['name', 'amount']);

-- 샘플 포트폴리오
INSERT INTO portfolios (title, description, video_url, platform, is_featured, sort_order) VALUES
('에스티로더 더블웨어 캠페인', '자연스러운 커버력을 강조한 숏폼', 'https://www.tiktok.com/@sample/video/1', 'tiktok', true, 1),
('라네즈 립슬리핑마스크 리뷰', '촉촉한 입술을 위한 나이트케어', 'https://www.instagram.com/reel/sample', 'instagram', true, 2),
('헤라 블랙쿠션 4주 챌린지', '드라마틱한 비포&애프터', 'https://www.youtube.com/shorts/sample', 'youtube', true, 3),
('설화수 윤조에센스 GRWM', '모닝 스킨케어 루틴', 'https://www.tiktok.com/@sample/video/2', 'tiktok', true, 4);

-- =============================================
-- 완료 메시지
-- =============================================
SELECT 'CNEC Database Schema Created Successfully!' as message;
