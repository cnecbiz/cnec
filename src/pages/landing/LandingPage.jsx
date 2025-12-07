import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Users,
  Megaphone,
  TrendingUp,
  Sparkles,
  CheckCircle,
  ArrowRight,
  Play,
  Star,
  Instagram,
  Youtube,
} from 'lucide-react'

// TikTok 아이콘 (Lucide에 없음)
function TiktokIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )
}

const stats = [
  { label: '협업 브랜드', value: '400+' },
  { label: '콘텐츠 제작', value: '1,000+' },
  { label: '등록 크리에이터', value: '5,000+' },
  { label: '마케팅 경력', value: '10년+' },
]

const features = [
  {
    icon: Users,
    title: '검증된 크리에이터',
    description: '팔로워 수, 참여율, 콘텐츠 품질 등 다양한 기준으로 검증된 뷰티 크리에이터를 만나보세요.',
  },
  {
    icon: Megaphone,
    title: '효율적인 캠페인 관리',
    description: '캠페인 등록부터 크리에이터 선정, 콘텐츠 검수까지 한 곳에서 관리할 수 있습니다.',
  },
  {
    icon: Sparkles,
    title: 'AI 기획안 생성',
    description: '제품 정보만 입력하면 AI가 자동으로 콘텐츠 기획안을 생성해 드립니다.',
  },
  {
    icon: TrendingUp,
    title: '성과 분석',
    description: '조회수, 참여율, ROI 등 캠페인 성과를 실시간으로 분석하고 리포트를 제공합니다.',
  },
]

const campaigns = [
  {
    title: '기획 숏폼',
    description: '컨셉 기획영상, 기획안 제공',
    price: '30~60만원',
    features: ['스토리보드 제공', '수정 1회 포함', '30초 이내 영상'],
  },
  {
    title: '4주 챌린지',
    description: '1주 1개 × 4주 콘텐츠',
    price: '60~120만원',
    popular: true,
    features: ['비포&애프터 콘텐츠', '4개 영상 제작', '장기 노출 효과'],
  },
  {
    title: '프리미엄',
    description: '메가 인플루언서 지정 섭외',
    price: '협의',
    features: ['50만+ 팔로워', '맞춤형 기획', '전담 매니저 배정'],
  },
]

export function LandingPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cnec-blue text-white font-bold">
                C
              </div>
              <span className="text-xl font-bold text-gray-900">CNEC</span>
            </Link>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="text-sm text-gray-600 hover:text-gray-900">서비스 소개</a>
              <a href="#campaigns" className="text-sm text-gray-600 hover:text-gray-900">캠페인 유형</a>
              <a href="#creators" className="text-sm text-gray-600 hover:text-gray-900">크리에이터</a>
            </nav>

            <div className="flex items-center gap-3">
              <Button variant="ghost" asChild>
                <Link to="/auth/login">로그인</Link>
              </Button>
              <Button asChild>
                <Link to="/auth/register">시작하기</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-4xl mx-auto">
            <Badge variant="blue" className="mb-4">
              뷰티 인플루언서 마케팅 플랫폼
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              뷰티 크리에이터와<br />
              브랜드를 <span className="text-cnec-blue">연결</span>합니다
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              KNEC 마케팅 에이전시의 10년 이상 노하우와 400개 이상의 브랜드 협업 경험을 바탕으로
              고품질 숏폼 콘텐츠 제작을 지원합니다.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="xl" asChild>
                <Link to="/auth/register/brand">
                  광고주로 시작하기 <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link to="/auth/register/creator">
                  크리에이터로 시작하기
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-cnec-blue">{stat.value}</p>
                <p className="text-sm text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="blue" className="mb-4">Features</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              왜 CNEC인가요?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              브랜드와 크리에이터 모두를 위한 최적의 마케팅 솔루션을 제공합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="border-0 shadow-sm hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-cnec-blue-light flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-cnec-blue" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Campaign Types Section */}
      <section id="campaigns" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="blue" className="mb-4">Campaign Types</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              캠페인 유형
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              브랜드의 목적에 맞는 다양한 캠페인 유형을 선택하세요.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {campaigns.map((campaign) => (
              <Card
                key={campaign.title}
                className={`relative ${campaign.popular ? 'border-cnec-blue border-2 shadow-lg' : 'border-gray-200'}`}
              >
                {campaign.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-cnec-blue">인기</Badge>
                  </div>
                )}
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{campaign.title}</h3>
                  <p className="text-sm text-gray-500 mb-4">{campaign.description}</p>
                  <p className="text-2xl font-bold text-cnec-blue mb-6">{campaign.price}</p>
                  <ul className="space-y-3 mb-6">
                    {campaign.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-success" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className="w-full"
                    variant={campaign.popular ? 'default' : 'outline'}
                    asChild
                  >
                    <Link to="/auth/register/brand">시작하기</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Creator CTA Section */}
      <section id="creators" className="py-20 px-4 sm:px-6 lg:px-8 bg-cnec-blue">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <Badge className="bg-white/20 text-white mb-4">For Creators</Badge>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                뷰티 크리에이터라면<br />
                지금 바로 합류하세요
              </h2>
              <p className="text-white/80 mb-8">
                브랜드와의 협업 기회, 원고비 수익, 그리고 세일즈 크리에이터로
                성장할 수 있는 다양한 혜택이 기다리고 있습니다.
              </p>
              <ul className="space-y-4 mb-8">
                {[
                  '검증된 브랜드와의 안전한 협업',
                  '투명한 원고비 지급 시스템',
                  '공동구매 매칭 수익 기회',
                  '브랜드 창업 지원 프로그램',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-white" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Button size="lg" className="bg-white text-cnec-blue hover:bg-gray-100" asChild>
                <Link to="/auth/register/creator">
                  크리에이터 등록하기 <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <Card className="bg-white/10 border-white/20 text-white">
                  <CardContent className="p-4">
                    <Instagram className="h-8 w-8 mb-2" />
                    <p className="text-2xl font-bold">2,000+</p>
                    <p className="text-sm text-white/70">인스타그램 크리에이터</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-white/20 text-white">
                  <CardContent className="p-4">
                    <TiktokIcon className="h-8 w-8 mb-2" />
                    <p className="text-2xl font-bold">1,500+</p>
                    <p className="text-sm text-white/70">틱톡 크리에이터</p>
                  </CardContent>
                </Card>
              </div>
              <div className="space-y-4 mt-8">
                <Card className="bg-white/10 border-white/20 text-white">
                  <CardContent className="p-4">
                    <Youtube className="h-8 w-8 mb-2" />
                    <p className="text-2xl font-bold">500+</p>
                    <p className="text-sm text-white/70">유튜브 크리에이터</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/10 border-white/20 text-white">
                  <CardContent className="p-4">
                    <Star className="h-8 w-8 mb-2" />
                    <p className="text-2xl font-bold">4.8</p>
                    <p className="text-sm text-white/70">평균 평점</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            지금 바로 시작하세요
          </h2>
          <p className="text-gray-600 mb-8">
            CNEC과 함께 효과적인 뷰티 마케팅을 경험해 보세요.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" asChild>
              <Link to="/auth/register">무료로 시작하기</Link>
            </Button>
            <Button size="lg" variant="outline">
              <Play className="mr-2 h-4 w-4" />
              데모 영상 보기
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-cnec-blue font-bold">
                  C
                </div>
                <span className="text-xl font-bold">CNEC</span>
              </div>
              <p className="text-sm text-gray-400">
                뷰티 크리에이터와 브랜드를 연결하는<br />
                마케팅 플랫폼
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">서비스</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">캠페인 등록</a></li>
                <li><a href="#" className="hover:text-white">크리에이터 찾기</a></li>
                <li><a href="#" className="hover:text-white">AI 기획안</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">회사</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">회사 소개</a></li>
                <li><a href="#" className="hover:text-white">채용</a></li>
                <li><a href="#" className="hover:text-white">블로그</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">고객지원</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white">자주 묻는 질문</a></li>
                <li><a href="#" className="hover:text-white">이용약관</a></li>
                <li><a href="#" className="hover:text-white">개인정보처리방침</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
            <p>&copy; 2024 CNEC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
