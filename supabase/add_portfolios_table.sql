-- 포트폴리오 테이블 추가 (기존 DB에 추가할 경우 실행)
-- CNEC 메인 페이지 대표 영상 관리용

CREATE TABLE IF NOT EXISTS portfolios (
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

-- 샘플 데이터 (선택 사항)
-- INSERT INTO portfolios (title, video_url, thumbnail, platform, is_featured, sort_order)
-- VALUES
--   ('뷰티 브랜드 A 캠페인', 'https://...', 'https://...', 'tiktok', true, 1),
--   ('스킨케어 런칭 캠페인', 'https://...', 'https://...', 'instagram', true, 2);
