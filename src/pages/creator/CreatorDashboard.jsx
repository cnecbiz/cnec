import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { formatCurrency, formatNumber, getDDay } from '@/lib/utils'
import {
  Wallet,
  Megaphone,
  Star,
  TrendingUp,
  Search,
  ArrowRight,
  Calendar,
  Package,
  Upload,
  Clock,
  CheckCircle,
  Sparkles,
  Gift,
  Users,
  Video,
  ShoppingBag,
  Youtube,
  Brain,
  Rocket,
  GraduationCap,
  ChevronRight,
  X,
  PlayCircle,
  Target,
  Award,
  Zap,
} from 'lucide-react'
import { Link } from 'react-router-dom'

// 목업 데이터
const stats = [
  {
    title: '보유 포인트',
    value: 450000,
    icon: Wallet,
    color: 'bg-cnec-blue-light text-cnec-blue',
    format: 'currency',
  },
  {
    title: '진행 중인 캠페인',
    value: 3,
    icon: Megaphone,
    color: 'bg-warning-light text-warning',
    format: 'number',
  },
  {
    title: '완료한 캠페인',
    value: 15,
    icon: CheckCircle,
    color: 'bg-success-light text-success',
    format: 'number',
  },
  {
    title: '평균 평점',
    value: 4.8,
    icon: Star,
    color: 'bg-gray-100 text-gray-600',
    format: 'rating',
  },
]

const myCampaigns = [
  {
    id: 1,
    name: '라네즈 립슬리핑마스크 리뷰',
    brand: '아모레퍼시픽',
    status: '제품 수령 대기',
    fee: 400000,
    deadline: '2024-12-25',
    step: 2,
    totalSteps: 5,
  },
  {
    id: 2,
    name: '에스티로더 더블웨어 파운데이션',
    brand: '에스티로더',
    status: '콘텐츠 제작',
    fee: 500000,
    deadline: '2024-12-20',
    step: 3,
    totalSteps: 5,
  },
  {
    id: 3,
    name: '헤라 블랙쿠션 리뷰',
    brand: '헤라',
    status: '검수 대기',
    fee: 350000,
    deadline: '2024-12-15',
    step: 4,
    totalSteps: 5,
  },
]

const recommendedCampaigns = [
  {
    id: 1,
    name: '설화수 자음생크림 체험단',
    brand: '설화수',
    category: '스킨케어',
    fee: 600000,
    deadline: '2024-12-22',
    applicants: 45,
    maxApplicants: 10,
  },
  {
    id: 2,
    name: '이니스프리 그린티 세럼',
    brand: '이니스프리',
    category: '스킨케어',
    fee: 350000,
    deadline: '2024-12-28',
    applicants: 23,
    maxApplicants: 15,
  },
  {
    id: 3,
    name: '롬앤 쥬시래스팅 틴트',
    brand: '롬앤',
    category: '메이크업',
    fee: 300000,
    deadline: '2024-12-30',
    applicants: 67,
    maxApplicants: 20,
  },
]

const benefits = [
  {
    icon: Video,
    title: '콘텐츠 제작 지원',
    description: '기획 숏폼부터 4주 챌린지까지 다양한 캠페인 참여',
  },
  {
    icon: ShoppingBag,
    title: '공동구매 매칭',
    description: '브랜드와 크리에이터를 연결하는 공동구매 프로그램',
  },
  {
    icon: Youtube,
    title: '유튜브 지원',
    description: '소속 크리에이터를 위한 유튜브 채널 성장 지원',
  },
  {
    icon: Gift,
    title: '제품 지원',
    description: '다양한 뷰티 브랜드 신제품 무료 체험 기회',
  },
  {
    icon: Brain,
    title: 'AI 분석 프로그램',
    description: '콘텐츠 성과 분석 및 인사이트 제공',
  },
  {
    icon: Rocket,
    title: '브랜드 창업 지원',
    description: '세일즈 크리에이터 성장 후 뷰티 브랜드 창업 지원',
  },
]

const tutorialSteps = [
  { step: 1, title: '프로필 등록', description: '피부 타입과 SNS 계정 연동' },
  { step: 2, title: '캠페인 탐색', description: '관심 캠페인 찾고 지원하기' },
  { step: 3, title: '제품 수령', description: '선정 후 제품 받기' },
  { step: 4, title: '콘텐츠 제작', description: '가이드에 맞게 영상 제작' },
  { step: 5, title: '업로드 완료', description: 'SNS 업로드 후 포인트 지급' },
]

const statusIcons = {
  '선정됨': CheckCircle,
  '제품 수령 대기': Package,
  '콘텐츠 제작': Upload,
  '검수 대기': Clock,
  '완료': CheckCircle,
}

export function CreatorDashboard() {
  const [showOnboarding, setShowOnboarding] = useState(true)
  const isNewUser = myCampaigns.length === 0 // 실제로는 사용자 데이터로 판단

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
          <p className="text-gray-500">오늘의 활동 현황을 확인하세요.</p>
        </div>
        <Button asChild>
          <Link to="/creator/campaigns">
            <Search className="mr-2 h-4 w-4" />
            캠페인 탐색
          </Link>
        </Button>
      </div>

      {/* Onboarding Banner for New Users */}
      {showOnboarding && (
        <Card className="bg-gradient-to-r from-cnec-blue via-indigo-600 to-purple-600 text-white border-0 overflow-hidden relative">
          <button
            onClick={() => setShowOnboarding(false)}
            className="absolute top-4 right-4 text-white/70 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Sparkles className="h-5 w-5" />
                  <Badge className="bg-white/20 text-white border-0">New Creator</Badge>
                </div>
                <h2 className="text-2xl font-bold mb-2">크넥 크리에이터로 성장하세요!</h2>
                <p className="text-white/80 mb-4">
                  뷰티 전문 크리에이터로 성장하는 여정을 시작하세요.
                  콘텐츠 제작부터 브랜드 창업까지, 크넥이 함께합니다.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button
                    className="bg-white text-cnec-blue hover:bg-gray-100"
                    asChild
                  >
                    <Link to="/creator/campaigns">
                      <Target className="mr-2 h-4 w-4" />
                      캠페인 지원하기
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-white/30 text-white hover:bg-white/10"
                    asChild
                  >
                    <Link to="/creator/profile">
                      <GraduationCap className="mr-2 h-4 w-4" />
                      프로필 완성하기
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="hidden md:block w-48 h-32 bg-white/10 rounded-lg flex items-center justify-center">
                <PlayCircle className="h-16 w-16 text-white/50" />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Benefits Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-cnec-blue" />
            크넥 크리에이터 혜택
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-gray-50 hover:bg-cnec-blue-light transition-colors text-center group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <benefit.icon className="h-6 w-6 text-cnec-blue" />
                </div>
                <p className="font-medium text-sm text-gray-900">{benefit.title}</p>
                <p className="text-xs text-gray-500 mt-1">{benefit.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Growth Program Banner */}
      <Card className="border-2 border-amber-200 bg-gradient-to-r from-amber-50 to-orange-50">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shrink-0">
              <Rocket className="h-7 w-7 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                세일즈 크리에이터 성장 프로그램
              </h3>
              <p className="text-sm text-gray-600">
                콘텐츠 지원을 받고 세일즈 크리에이터로 성장하세요!
                일정 요건을 충족하면 <strong className="text-amber-600">뷰티 브랜드 창업</strong>을 지원합니다.
              </p>
              <p className="text-xs text-gray-500 mt-2">
                주요 제조사 샘플부터 양산, 패키지 디자인, 유통, 마케팅까지 - 크리에이터님은 콘텐츠 제작에만 집중하세요!
              </p>
            </div>
            <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
              자세히 보기
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tutorial Steps */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-cnec-blue" />
            캠페인 참여 가이드
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between overflow-x-auto pb-2">
            {tutorialSteps.map((item, index) => (
              <div key={item.step} className="flex items-center flex-shrink-0">
                <div className="flex flex-col items-center text-center w-28">
                  <div className="w-10 h-10 rounded-full bg-cnec-blue text-white flex items-center justify-center font-bold mb-2">
                    {item.step}
                  </div>
                  <p className="text-sm font-medium text-gray-900">{item.title}</p>
                  <p className="text-xs text-gray-500">{item.description}</p>
                </div>
                {index < tutorialSteps.length - 1 && (
                  <ChevronRight className="h-5 w-5 text-gray-300 mx-2" />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-xl font-bold text-gray-900">
                    {stat.format === 'currency'
                      ? formatCurrency(stat.value)
                      : stat.format === 'rating'
                      ? `${stat.value} / 5.0`
                      : formatNumber(stat.value)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* My Campaigns */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">진행 중인 캠페인</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/creator/my-campaigns">
                  전체보기 <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {myCampaigns.length > 0 ? (
                myCampaigns.map((campaign) => {
                  const StatusIcon = statusIcons[campaign.status] || Clock
                  return (
                    <div
                      key={campaign.id}
                      className="p-4 rounded-lg border border-gray-200 hover:border-cnec-blue transition-colors cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="font-medium text-gray-900">{campaign.name}</h3>
                          <p className="text-sm text-gray-500">{campaign.brand}</p>
                        </div>
                        <Badge variant="blue">{formatCurrency(campaign.fee)}</Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <StatusIcon className="h-4 w-4" />
                            <span>{campaign.status}</span>
                          </div>
                          <div className="flex items-center gap-1 text-gray-500">
                            <Calendar className="h-3.5 w-3.5" />
                            <span>{getDDay(campaign.deadline)}</span>
                          </div>
                        </div>
                        <Progress value={(campaign.step / campaign.totalSteps) * 100} />
                        <p className="text-xs text-gray-500 text-right">
                          {campaign.step}/{campaign.totalSteps} 단계
                        </p>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="text-center py-8">
                  <Megaphone className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500 mb-4">아직 진행 중인 캠페인이 없습니다.</p>
                  <Button asChild>
                    <Link to="/creator/campaigns">첫 캠페인 지원하기</Link>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recommended Campaigns & Points */}
        <div className="space-y-6">
          {/* Points Summary */}
          <Card className="bg-gradient-to-br from-cnec-blue to-cnec-blue-dark text-white">
            <CardContent className="p-6">
              <p className="text-sm text-white/70 mb-1">보유 포인트</p>
              <p className="text-3xl font-bold mb-4">{formatCurrency(450000)}</p>
              <div className="flex gap-2">
                <Button size="sm" className="bg-white text-cnec-blue hover:bg-gray-100 flex-1" asChild>
                  <Link to="/creator/points">출금 신청</Link>
                </Button>
                <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/10 flex-1" asChild>
                  <Link to="/creator/points">내역 보기</Link>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Campaigns */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">추천 캠페인</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recommendedCampaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="p-3 rounded-lg border border-gray-200 hover:border-cnec-blue transition-colors cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-medium text-gray-900 text-sm">{campaign.name}</h4>
                      <p className="text-xs text-gray-500">{campaign.brand}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">{campaign.category}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-cnec-blue">
                      {formatCurrency(campaign.fee)}
                    </span>
                    <span className="text-gray-500">
                      {campaign.applicants}명 지원 | {getDDay(campaign.deadline)}
                    </span>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2" asChild>
                <Link to="/creator/campaigns">
                  더 많은 캠페인 보기
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                빠른 메뉴
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Link
                to="/creator/profile"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-gray-400" />
                  <span className="text-sm">프로필 수정</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Link>
              <Link
                to="/creator/my-campaigns"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Upload className="h-5 w-5 text-gray-400" />
                  <span className="text-sm">파일 업로드</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Link>
              <Link
                to="/creator/notifications"
                className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Megaphone className="h-5 w-5 text-gray-400" />
                  <span className="text-sm">알림 확인</span>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400" />
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
