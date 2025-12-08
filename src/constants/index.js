// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  ADVERTISER: 'advertiser',
  CREATOR: 'creator',
};

// Creator types
export const CREATOR_TYPES = {
  RECOMMENDED: 'recommended', // 추천 크리에이터
  AFFILIATED: 'affiliated', // 소속 크리에이터
  YOUTUBE_SUPPORT: 'youtube_support', // 유튜브 지원 크리에이터
};

// Campaign categories
export const CAMPAIGN_CATEGORIES = {
  PLANNED_SHORTFORM: 'planned_shortform', // 기획 숏폼
  FOUR_WEEK_CHALLENGE: 'four_week_challenge', // 4주 챌린지
  PREMIUM: 'premium', // 프리미엄
};

// Product categories
export const PRODUCT_CATEGORIES = {
  BASIC: '기초',
  COLOR: '색조',
  DEVICE: '디바이스',
  INNER_BEAUTY: '이너뷰티',
  OTHER: '기타',
};

// Skin concerns (Pain points)
export const SKIN_CONCERNS = {
  PORES: '모공',
  WRINKLES: '주름',
  SPOTS: '기미',
  ACNE: '여드름',
  DRY: '건조',
};

// Skin types
export const SKIN_TYPES = {
  DRY: '건성',
  OILY: '지성',
  COMBINATION: '복합성',
  ACNE: '여드름',
  PORES: '모공',
  WRINKLES: '주름',
  SPOTS: '기미',
  ELASTICITY: '탄력',
};

// Video concepts
export const VIDEO_CONCEPTS = {
  BEFORE_AFTER: '비포&애프터',
  VLOG: '브이로그',
  HUMOR: '유머',
};

// Video speeds
export const VIDEO_SPEEDS = {
  FAST: '빠른전개',
  NORMAL: '보통',
  QUICK: '빠름',
};

// Video lengths
export const VIDEO_LENGTHS = {
  UNDER_15: '15초이내',
  AROUND_30: '30초내외',
  AROUND_45: '45초 내외',
  AROUND_60: '60초내외',
};

// Required scenes
export const REQUIRED_SCENES = {
  BEFORE_AFTER: '비포&애프터',
  PRODUCT_USE: '제품 사용',
  PRODUCT_SOLO: '제품 단독',
  TEXTURE: '제형',
  VANITY: '화장대',
  HOME: '집',
  OUTDOOR: '야외',
};

// Manuscript fees for planned shortform
export const PLANNED_SHORTFORM_FEES = [300000, 400000, 500000, 600000];

// Manuscript fees for 4-week challenge
export const FOUR_WEEK_CHALLENGE_FEES = [600000, 800000, 1000000, 1200000];

// Gender options
export const GENDER_OPTIONS = {
  MALE: '남성',
  FEMALE: '여성',
  ALL: '전체',
};

// Age groups
export const AGE_GROUPS = {
  TEENS: '10대',
  TWENTIES: '20대',
  THIRTIES: '30대',
  FORTIES: '40대',
  FIFTIES_PLUS: '50대 이상',
};

// SNS Types
export const SNS_TYPES = {
  INSTAGRAM: 'instagram',
  YOUTUBE: 'youtube',
  TIKTOK: 'tiktok',
};

// Campaign status
export const CAMPAIGN_STATUS = {
  DRAFT: 'draft', // 임시저장
  RECRUITING: 'recruiting', // 모집중
  SELECTING: 'selecting', // 선정중
  IN_PROGRESS: 'in_progress', // 진행중
  COMPLETED: 'completed', // 완료
  CANCELLED: 'cancelled', // 취소
};

// Creator application status
export const APPLICATION_STATUS = {
  PENDING: 'pending', // 대기
  SELECTED: 'selected', // 선정
  REJECTED: 'rejected', // 미선정
  SHIPPED: 'shipped', // 제품 발송
  COMPLETED: 'completed', // 완료
};

// Export voucher types
export const VOUCHER_TYPES = {
  EXPORT: '수출바우처',
  NORMAL: '일반',
};

// Cost categories
export const COST_CATEGORIES = {
  LABOR: '인건비',
  MARKETING: '마케팅비',
  OPERATION: '운영비',
  PRODUCT: '제품비',
  SHIPPING: '배송비',
  OTHER: '기타',
};
