-- CNEC 데이터베이스 스키마
-- 뷰티 크리에이터 × 브랜드 매칭 플랫폼

-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- 1. 프로필 및 사용자 관련 테이블
-- ============================================================

-- 프로필 (Supabase Auth와 연동)
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  user_type VARCHAR(20) NOT NULL CHECK (user_type IN ('admin', 'brand', 'creator')),
  name VARCHAR(100),
  nickname VARCHAR(100),
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  avatar_url TEXT,
  status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended', 'pending')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 크리에이터 프로필 (확장 정보)
CREATE TABLE creator_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  tier VARCHAR(20) DEFAULT 'Bronze' CHECK (tier IN ('Bronze', 'Silver', 'Gold', 'Platinum')),
  skin_type VARCHAR(20),
  skin_concerns TEXT[], -- 배열: ['여드름', '모공', '주름']
  categories TEXT[], -- 배열: ['스킨케어', '메이크업']
  bio TEXT,
  birth_date DATE,
  gender VARCHAR(10),

  -- SNS 정보
  instagram_handle VARCHAR(100),
  instagram_followers INTEGER DEFAULT 0,
  tiktok_handle VARCHAR(100),
  tiktok_followers INTEGER DEFAULT 0,
  youtube_handle VARCHAR(100),
  youtube_subscribers INTEGER DEFAULT 0,

  -- 정산 정보
  bank_name VARCHAR(50),
  bank_account VARCHAR(50),
  account_holder VARCHAR(100),
  id_card_url TEXT,

  -- 배송 정보
  shipping_name VARCHAR(100),
  shipping_phone VARCHAR(20),
  shipping_address TEXT,
  shipping_address_detail VARCHAR(255),
  shipping_zipcode VARCHAR(10),

  -- 통계
  total_campaigns INTEGER DEFAULT 0,
  completed_campaigns INTEGER DEFAULT 0,
  total_earnings BIGINT DEFAULT 0,
  points BIGINT DEFAULT 0,
  rating DECIMAL(2,1) DEFAULT 0.0,
  rating_count INTEGER DEFAULT 0,

  is_recommended BOOLEAN DEFAULT FALSE,
  is_affiliated BOOLEAN DEFAULT FALSE,
  affiliated_fee INTEGER, -- 소속 크리에이터 전용 원고비
  recommended_order INTEGER, -- 추천 크리에이터 노출 순서

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 광고주(브랜드) 프로필
CREATE TABLE brand_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  company_name VARCHAR(255) NOT NULL,
  ceo_name VARCHAR(100),
  business_number VARCHAR(20) UNIQUE,
  business_license_url TEXT,
  manager_name VARCHAR(100),
  manager_phone VARCHAR(20),
  manager_email VARCHAR(255),
  brand_name VARCHAR(255),
  category VARCHAR(50),

  -- 통계
  total_campaigns INTEGER DEFAULT 0,
  total_spent BIGINT DEFAULT 0,

  is_verified BOOLEAN DEFAULT FALSE, -- 사업자 인증 완료 여부
  verified_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 2. 캠페인 관련 테이블
-- ============================================================

-- 캠페인
CREATE TABLE campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id UUID NOT NULL REFERENCES brand_profiles(id) ON DELETE CASCADE,
  created_by UUID REFERENCES profiles(id), -- 대리 등록 시 관리자 ID

  campaign_type VARCHAR(20) NOT NULL CHECK (campaign_type IN ('short', 'challenge', 'premium')),
  name VARCHAR(255) NOT NULL,
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'recruiting', 'selected', 'production', 'review', 'completed', 'cancelled')),

  -- 제품 정보
  category VARCHAR(50),
  product_name VARCHAR(255),
  product_url TEXT,
  product_price INTEGER,
  product_images TEXT[], -- 이미지 URL 배열
  target_gender VARCHAR(10) CHECK (target_gender IN ('all', 'male', 'female')),
  target_age_groups TEXT[], -- ['20대', '30대']
  skin_concerns TEXT[],

  -- 모집 정보
  fee INTEGER NOT NULL, -- 1인당 원고비
  recruit_count INTEGER NOT NULL, -- 모집 인원
  applicant_count INTEGER DEFAULT 0, -- 지원자 수
  selected_count INTEGER DEFAULT 0, -- 선정된 인원

  -- 일정
  recruit_start_date DATE,
  recruit_end_date DATE,
  upload_deadline DATE,
  specific_upload_date DATE, -- 특정일 업로드 옵션

  -- 콘텐츠 가이드
  content_concept TEXT,
  content_speed VARCHAR(20) CHECK (content_speed IN ('slow', 'normal', 'fast')),
  content_length VARCHAR(10), -- '15', '30', '60'
  hooking_point TEXT,
  reference_urls TEXT[],
  required_scenes TEXT[],

  -- 추가 옵션
  discount_info TEXT,
  has_narration BOOLEAN DEFAULT FALSE,
  forbidden_keywords TEXT,
  required_hashtags TEXT,
  partnership_code TEXT,

  -- AI 기획안
  ai_plan JSONB, -- AI 생성 기획안 저장

  -- 금액
  total_budget BIGINT, -- 총 예산

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 캠페인 지원
CREATE TABLE campaign_applications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,
  creator_id UUID NOT NULL REFERENCES creator_profiles(id) ON DELETE CASCADE,

  status VARCHAR(20) DEFAULT 'applied' CHECK (status IN ('applied', 'selected', 'rejected', 'withdrawn')),
  application_message TEXT, -- 지원 동기

  -- 선정 후 정보
  selected_at TIMESTAMPTZ,

  -- 제품 배송
  tracking_number VARCHAR(50),
  shipping_status VARCHAR(20) CHECK (shipping_status IN ('pending', 'shipped', 'delivered')),
  shipped_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(campaign_id, creator_id)
);

-- 캠페인 콘텐츠 (크리에이터 업로드)
CREATE TABLE campaign_contents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  application_id UUID NOT NULL REFERENCES campaign_applications(id) ON DELETE CASCADE,

  original_video_url TEXT, -- 원본 영상
  clean_video_url TEXT, -- 클린본 (워터마크 없는 버전)
  upload_url TEXT, -- SNS 업로드 URL
  partnership_code_used VARCHAR(100), -- 사용된 파트너십 코드

  status VARCHAR(20) DEFAULT 'submitted' CHECK (status IN ('submitted', 'approved', 'rejected', 'revision_requested')),
  revision_message TEXT, -- 수정 요청 사유

  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  reviewed_at TIMESTAMPTZ,
  approved_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 3. 포인트 및 정산 관련 테이블
-- ============================================================

-- 포인트 내역
CREATE TABLE point_transactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  creator_id UUID NOT NULL REFERENCES creator_profiles(id) ON DELETE CASCADE,

  type VARCHAR(20) NOT NULL CHECK (type IN ('earn', 'withdraw', 'adjust')),
  amount BIGINT NOT NULL, -- 양수: 적립, 음수: 출금
  balance_after BIGINT NOT NULL, -- 거래 후 잔액

  description TEXT,
  campaign_id UUID REFERENCES campaigns(id),

  -- 출금 관련
  withdrawal_status VARCHAR(20) CHECK (withdrawal_status IN ('pending', 'processing', 'completed', 'rejected')),
  bank_name VARCHAR(50),
  bank_account VARCHAR(50),
  account_holder VARCHAR(100),
  processed_at TIMESTAMPTZ,
  processed_by UUID REFERENCES profiles(id),
  rejection_reason TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 4. 매출 관리 테이블
-- ============================================================

-- 매출 내역
CREATE TABLE revenues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID REFERENCES campaigns(id),
  brand_id UUID REFERENCES brand_profiles(id),

  type VARCHAR(20) NOT NULL CHECK (type IN ('campaign', 'manual', 'voucher')), -- voucher: 수출바우처
  amount BIGINT NOT NULL,
  description TEXT,

  payment_method VARCHAR(20), -- card, transfer, kakaopay, naverpay
  payment_status VARCHAR(20) DEFAULT 'completed' CHECK (payment_status IN ('pending', 'completed', 'refunded')),
  paid_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES profiles(id)
);

-- 비용 내역
CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  category VARCHAR(50) NOT NULL, -- 인건비, 마케팅비, 운영비, 제세공과금
  amount BIGINT NOT NULL,
  description TEXT,
  receipt_url TEXT,
  expense_date DATE,

  created_at TIMESTAMPTZ DEFAULT NOW(),
  created_by UUID REFERENCES profiles(id)
);

-- ============================================================
-- 5. 계약서 관리 테이블
-- ============================================================

-- 계약서 템플릿
CREATE TABLE contract_templates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  type VARCHAR(20) NOT NULL CHECK (type IN ('brand', 'creator')),
  content TEXT NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 계약서
CREATE TABLE contracts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  template_id UUID REFERENCES contract_templates(id),
  campaign_id UUID REFERENCES campaigns(id),

  signer_id UUID NOT NULL REFERENCES profiles(id),
  signer_type VARCHAR(20) NOT NULL CHECK (signer_type IN ('brand', 'creator')),

  status VARCHAR(20) DEFAULT 'sent' CHECK (status IN ('sent', 'viewed', 'signed', 'expired')),
  signed_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,

  external_contract_id VARCHAR(255), -- 모두싸인/이싸인 계약 ID

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 6. 알림 테이블
-- ============================================================

CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  type VARCHAR(50) NOT NULL, -- campaign_selected, delivery_shipped, content_approved, points_earned 등
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,

  reference_type VARCHAR(50), -- campaign, application, withdrawal 등
  reference_id UUID,

  is_read BOOLEAN DEFAULT FALSE,
  read_at TIMESTAMPTZ,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 7. 찜하기 테이블
-- ============================================================

CREATE TABLE favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  brand_id UUID NOT NULL REFERENCES brand_profiles(id) ON DELETE CASCADE,
  creator_id UUID NOT NULL REFERENCES creator_profiles(id) ON DELETE CASCADE,
  folder_name VARCHAR(100) DEFAULT 'default',
  created_at TIMESTAMPTZ DEFAULT NOW(),

  UNIQUE(brand_id, creator_id)
);

-- ============================================================
-- 8. 평점 및 리뷰 테이블
-- ============================================================

CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  campaign_id UUID NOT NULL REFERENCES campaigns(id) ON DELETE CASCADE,

  reviewer_type VARCHAR(20) NOT NULL CHECK (reviewer_type IN ('brand', 'creator')),
  reviewer_id UUID NOT NULL REFERENCES profiles(id),
  reviewee_id UUID NOT NULL REFERENCES profiles(id),

  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,

  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 9. 감사 로그 테이블
-- ============================================================

CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id),
  action VARCHAR(100) NOT NULL,
  target_type VARCHAR(50),
  target_id UUID,
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================================
-- 인덱스 생성
-- ============================================================

CREATE INDEX idx_profiles_user_type ON profiles(user_type);
CREATE INDEX idx_profiles_status ON profiles(status);

CREATE INDEX idx_creator_profiles_user_id ON creator_profiles(user_id);
CREATE INDEX idx_creator_profiles_tier ON creator_profiles(tier);
CREATE INDEX idx_creator_profiles_is_recommended ON creator_profiles(is_recommended);

CREATE INDEX idx_brand_profiles_user_id ON brand_profiles(user_id);
CREATE INDEX idx_brand_profiles_is_verified ON brand_profiles(is_verified);

CREATE INDEX idx_campaigns_brand_id ON campaigns(brand_id);
CREATE INDEX idx_campaigns_status ON campaigns(status);
CREATE INDEX idx_campaigns_category ON campaigns(category);
CREATE INDEX idx_campaigns_recruit_end_date ON campaigns(recruit_end_date);

CREATE INDEX idx_campaign_applications_campaign_id ON campaign_applications(campaign_id);
CREATE INDEX idx_campaign_applications_creator_id ON campaign_applications(creator_id);
CREATE INDEX idx_campaign_applications_status ON campaign_applications(status);

CREATE INDEX idx_point_transactions_creator_id ON point_transactions(creator_id);
CREATE INDEX idx_point_transactions_type ON point_transactions(type);
CREATE INDEX idx_point_transactions_withdrawal_status ON point_transactions(withdrawal_status);

CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_notifications_is_read ON notifications(is_read);

CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_action ON audit_logs(action);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- ============================================================
-- Row Level Security (RLS) 정책
-- ============================================================

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE creator_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE brand_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE campaign_contents ENABLE ROW LEVEL SECURITY;
ALTER TABLE point_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- 프로필: 본인 또는 관리자만 접근
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- 크리에이터 프로필: 모든 인증 사용자 조회 가능, 수정은 본인만
CREATE POLICY "Anyone can view creator profiles" ON creator_profiles
  FOR SELECT USING (TRUE);

CREATE POLICY "Creators can update own profile" ON creator_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- 캠페인: 모집중인 캠페인은 모두 조회 가능
CREATE POLICY "Anyone can view recruiting campaigns" ON campaigns
  FOR SELECT USING (status = 'recruiting' OR brand_id IN (
    SELECT id FROM brand_profiles WHERE user_id = auth.uid()
  ));

-- 알림: 본인만 접근
CREATE POLICY "Users can view own notifications" ON notifications
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own notifications" ON notifications
  FOR UPDATE USING (auth.uid() = user_id);

-- ============================================================
-- 트리거 함수
-- ============================================================

-- updated_at 자동 업데이트
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 각 테이블에 트리거 적용
CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_creator_profiles_updated_at
  BEFORE UPDATE ON creator_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_brand_profiles_updated_at
  BEFORE UPDATE ON brand_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaigns_updated_at
  BEFORE UPDATE ON campaigns
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaign_applications_updated_at
  BEFORE UPDATE ON campaign_applications
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_campaign_contents_updated_at
  BEFORE UPDATE ON campaign_contents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 신규 사용자 프로필 자동 생성
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, user_type, name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'user_type', 'creator'),
    COALESCE(NEW.raw_user_meta_data->>'name', '')
  );

  -- 크리에이터인 경우 creator_profiles도 생성
  IF COALESCE(NEW.raw_user_meta_data->>'user_type', 'creator') = 'creator' THEN
    INSERT INTO creator_profiles (user_id, skin_type, skin_concerns, categories)
    VALUES (
      NEW.id,
      NEW.raw_user_meta_data->>'skin_type',
      ARRAY(SELECT jsonb_array_elements_text(COALESCE(NEW.raw_user_meta_data->'skin_concerns', '[]'::jsonb))),
      ARRAY(SELECT jsonb_array_elements_text(COALESCE(NEW.raw_user_meta_data->'categories', '[]'::jsonb)))
    );
  END IF;

  -- 광고주인 경우 brand_profiles도 생성
  IF NEW.raw_user_meta_data->>'user_type' = 'brand' THEN
    INSERT INTO brand_profiles (user_id, company_name, ceo_name, business_number, manager_name, manager_phone, brand_name, category)
    VALUES (
      NEW.id,
      COALESCE(NEW.raw_user_meta_data->>'company_name', ''),
      NEW.raw_user_meta_data->>'ceo_name',
      NEW.raw_user_meta_data->>'business_number',
      NEW.raw_user_meta_data->>'manager_name',
      NEW.raw_user_meta_data->>'manager_phone',
      NEW.raw_user_meta_data->>'brand_name',
      NEW.raw_user_meta_data->>'category'
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- 캠페인 지원자 수 자동 업데이트
CREATE OR REPLACE FUNCTION update_campaign_applicant_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE campaigns SET applicant_count = applicant_count + 1 WHERE id = NEW.campaign_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE campaigns SET applicant_count = applicant_count - 1 WHERE id = OLD.campaign_id;
  END IF;
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_applicant_count
  AFTER INSERT OR DELETE ON campaign_applications
  FOR EACH ROW EXECUTE FUNCTION update_campaign_applicant_count();

-- ============================================================
-- 11. 포트폴리오 테이블 (관리자가 등록하는 대표 영상)
-- ============================================================

CREATE TABLE portfolios (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  video_url TEXT NOT NULL,
  thumbnail TEXT,
  platform VARCHAR(50), -- tiktok, instagram, youtube
  views INTEGER DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE, -- 메인 페이지에 노출 여부
  sort_order INTEGER DEFAULT 0,
  created_by UUID REFERENCES profiles(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 포트폴리오 RLS 정책
ALTER TABLE portfolios ENABLE ROW LEVEL SECURITY;

-- 누구나 조회 가능
CREATE POLICY "Portfolios are viewable by everyone"
  ON portfolios FOR SELECT
  USING (true);

-- 관리자만 생성/수정/삭제 가능
CREATE POLICY "Only admins can insert portfolios"
  ON portfolios FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.user_type = 'admin'
    )
  );

CREATE POLICY "Only admins can update portfolios"
  ON portfolios FOR UPDATE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.user_type = 'admin'
    )
  );

CREATE POLICY "Only admins can delete portfolios"
  ON portfolios FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.user_type = 'admin'
    )
  );
