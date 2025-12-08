import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatCurrency, formatNumber, getDDay, formatFollowers } from '@/lib/utils'
import {
  Megaphone,
  Users,
  Eye,
  TrendingUp,
  Plus,
  ArrowRight,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
} from 'lucide-react'
import { Link } from 'react-router-dom'

// 목업 데이터
const stats = [
  {
    title: '진행 중인 캠페인',
    value: 3,
    icon: Megaphone,
    color: 'bg-cnec-blue-light text-cnec-blue',
  },
  {
    title: '협업 크리에이터',
    value: 24,
    icon: Users,
    color: 'bg-success-light text-success',
  },
  {
    title: '총 콘텐츠 조회수',
    value: 1250000,
    icon: Eye,
    color: 'bg-warning-light text-warning',
  },
  {
    title: '총 집행 금액',
    value: 45000000,
    icon: TrendingUp,
    color: 'bg-gray-100 text-gray-600',
  },
]

const activeCampaigns = [
  {
    id: 1,
    name: '에스티로더 더블웨어 숏폼',
    status: '모집중',
    progress: 60,
    applicants: 12,
    target: 20,
    deadline: '2024-12-20',
  },
  {
    id: 2,
    name: '라네즈 립슬리핑마스크',
    status: '제작중',
    progress: 40,
    completed: 4,
    total: 10,
    deadline: '2024-12-25',
  },
  {
    id: 3,
    name: '헤라 블랙쿠션 리뷰',
    status: '검수중',
    progress: 80,
    approved: 6,
    total: 8,
    deadline: '2024-12-15',
  },
]

const topCreators = [
  {
    id: 1,
    name: '뷰티민지',
    avatar: null,
    followers: 125000,
    platform: 'instagram',
    rating: 4.9,
    campaigns: 5,
  },
  {
    id: 2,
    name: '수아뷰티',
    avatar: null,
    followers: 89000,
    platform: 'tiktok',
    rating: 4.8,
    campaigns: 3,
  },
  {
    id: 3,
    name: '예나메이크업',
    avatar: null,
    followers: 210000,
    platform: 'youtube',
    rating: 4.9,
    campaigns: 4,
  },
]

const statusConfig = {
  '모집중': { icon: Users, color: 'text-cnec-blue', bg: 'bg-cnec-blue-light' },
  '제작중': { icon: Clock, color: 'text-warning', bg: 'bg-warning-light' },
  '검수중': { icon: AlertCircle, color: 'text-gray-600', bg: 'bg-gray-100' },
  '완료': { icon: CheckCircle, color: 'text-success', bg: 'bg-success-light' },
}

export function BrandDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
          <p className="text-gray-500">캠페인 현황을 확인하고 관리하세요.</p>
        </div>
        <Button asChild>
          <Link to="/brand/campaigns/new">
            <Plus className="mr-2 h-4 w-4" />
            새 캠페인 등록
          </Link>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-500 truncate">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900 truncate">
                    {stat.title.includes('금액') || stat.title.includes('조회수')
                      ? stat.title.includes('금액')
                        ? formatCurrency(stat.value)
                        : formatFollowers(stat.value)
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
        {/* Active Campaigns */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">진행 중인 캠페인</CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/brand/campaigns">
                  전체보기 <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="space-y-4">
              {activeCampaigns.map((campaign) => {
                const StatusIcon = statusConfig[campaign.status]?.icon || Megaphone
                return (
                  <div
                    key={campaign.id}
                    className="p-4 rounded-lg border border-gray-200 hover:border-cnec-blue transition-colors cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-medium text-gray-900">{campaign.name}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant={campaign.status === '모집중' ? 'blue' : campaign.status === '제작중' ? 'warning' : 'secondary'}>
                            {campaign.status}
                          </Badge>
                          <span className="text-sm text-gray-500 flex items-center">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            {getDDay(campaign.deadline)}
                          </span>
                        </div>
                      </div>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${statusConfig[campaign.status]?.bg}`}>
                        <StatusIcon className={`h-4 w-4 ${statusConfig[campaign.status]?.color}`} />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">진행률</span>
                        <span className="font-medium">{campaign.progress}%</span>
                      </div>
                      <Progress value={campaign.progress} />
                      <p className="text-xs text-gray-500">
                        {campaign.status === '모집중' && `${campaign.applicants}/${campaign.target}명 지원`}
                        {campaign.status === '제작중' && `${campaign.completed}/${campaign.total}개 콘텐츠 제작 완료`}
                        {campaign.status === '검수중' && `${campaign.approved}/${campaign.total}개 검수 완료`}
                      </p>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>

        {/* Top Creators & Quick Actions */}
        <div className="space-y-6">
          {/* Top Creators */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">협업 크리에이터 TOP</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topCreators.map((creator, index) => (
                <div
                  key={creator.id}
                  className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <span className="text-sm font-medium text-gray-400 w-4">{index + 1}</span>
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={creator.avatar} />
                    <AvatarFallback name={creator.name} />
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{creator.name}</p>
                    <p className="text-xs text-gray-500">
                      {formatFollowers(creator.followers)} 팔로워 | {creator.campaigns}회 협업
                    </p>
                  </div>
                  <div className="flex items-center text-warning">
                    <span className="text-sm font-medium">{creator.rating}</span>
                    <svg className="h-4 w-4 ml-0.5 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full mt-2" asChild>
                <Link to="/brand/creators">
                  모든 크리에이터 보기
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">빠른 작업</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/brand/campaigns/new">
                  <Plus className="mr-2 h-4 w-4" />
                  새 캠페인 등록
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/brand/creators">
                  <Users className="mr-2 h-4 w-4" />
                  크리에이터 찾기
                </Link>
              </Button>
              <Button variant="outline" className="w-full justify-start" asChild>
                <Link to="/brand/payments">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  결제 내역 확인
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
