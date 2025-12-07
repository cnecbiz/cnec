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

const statusIcons = {
  '선정됨': CheckCircle,
  '제품 수령 대기': Package,
  '콘텐츠 제작': Upload,
  '검수 대기': Clock,
  '완료': CheckCircle,
}

export function CreatorDashboard() {
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
              {myCampaigns.map((campaign) => {
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
              })}
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
        </div>
      </div>
    </div>
  )
}
