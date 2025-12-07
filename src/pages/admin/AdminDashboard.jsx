import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatCurrency, formatNumber, getDDay } from '@/lib/utils'
import {
  TrendingUp,
  TrendingDown,
  Users,
  Megaphone,
  Wallet,
  CreditCard,
  ArrowRight,
  ArrowUpRight,
  Plus,
} from 'lucide-react'

// 목업 데이터
const stats = [
  {
    title: '오늘의 매출',
    value: 12500000,
    change: 12.5,
    changeType: 'increase',
    icon: Wallet,
    format: 'currency',
  },
  {
    title: '이번 달 매출',
    value: 245000000,
    target: 300000000,
    icon: TrendingUp,
    format: 'currency',
  },
  {
    title: '진행 중인 캠페인',
    value: 24,
    subtitle: '모집 중 12 | 제작 중 8 | 검수 중 4',
    icon: Megaphone,
    format: 'number',
  },
  {
    title: '신규 가입자',
    value: 156,
    change: 23,
    changeType: 'increase',
    subtitle: '오늘 15 | 이번 주 78',
    icon: Users,
    format: 'number',
  },
  {
    title: '출금 대기',
    value: 8,
    amount: 4500000,
    icon: CreditCard,
    format: 'number',
    urgent: true,
  },
]

const recentCampaigns = [
  {
    id: 1,
    name: '에스티로더 더블웨어 숏폼',
    brand: '에스티로더',
    status: '모집중',
    applicants: 45,
    target: 20,
    budget: 6000000,
    deadline: '2024-12-20',
  },
  {
    id: 2,
    name: '라네즈 립슬리핑마스크 챌린지',
    brand: '아모레퍼시픽',
    status: '선정완료',
    applicants: 30,
    target: 10,
    budget: 4000000,
    deadline: '2024-12-18',
  },
  {
    id: 3,
    name: '헤라 블랙쿠션 신제품 리뷰',
    brand: '헤라',
    status: '제작중',
    applicants: 15,
    target: 15,
    budget: 4500000,
    deadline: '2024-12-15',
  },
  {
    id: 4,
    name: '설화수 자음생크림 리뷰',
    brand: '설화수',
    status: '검수중',
    applicants: 8,
    target: 8,
    budget: 3200000,
    deadline: '2024-12-12',
  },
]

const recentActivities = [
  { type: 'campaign', message: '새 캠페인이 등록되었습니다: 에스티로더 더블웨어', time: '5분 전' },
  { type: 'user', message: '새로운 크리에이터가 가입했습니다: 뷰티민지', time: '12분 전' },
  { type: 'withdrawal', message: '출금 요청: 크리에이터 박수영 - 300,000원', time: '30분 전' },
  { type: 'campaign', message: '캠페인 콘텐츠가 업로드되었습니다: 라네즈 립마스크', time: '1시간 전' },
  { type: 'user', message: '새로운 광고주가 가입했습니다: (주)코스맥스', time: '2시간 전' },
]

const statusColors = {
  '모집중': 'blue',
  '선정완료': 'success',
  '제작중': 'warning',
  '검수중': 'secondary',
  '완료': 'success',
  '취소': 'error',
}

export function AdminDashboard() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
          <p className="text-gray-500">CNEC 플랫폼 운영 현황을 한눈에 확인하세요.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          캠페인 등록
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className={stat.urgent ? 'border-warning' : ''}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">{stat.title}</span>
                <stat.icon className="h-5 w-5 text-gray-400" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-gray-900">
                  {stat.format === 'currency'
                    ? formatCurrency(stat.value)
                    : formatNumber(stat.value)}
                </span>
                {stat.change && (
                  <span
                    className={`text-sm font-medium flex items-center ${
                      stat.changeType === 'increase' ? 'text-success' : 'text-error'
                    }`}
                  >
                    {stat.changeType === 'increase' ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {stat.change}%
                  </span>
                )}
              </div>
              {stat.target && (
                <div className="mt-2">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>목표 대비</span>
                    <span>{Math.round((stat.value / stat.target) * 100)}%</span>
                  </div>
                  <Progress value={(stat.value / stat.target) * 100} />
                </div>
              )}
              {stat.subtitle && (
                <p className="text-xs text-gray-500 mt-2">{stat.subtitle}</p>
              )}
              {stat.amount && (
                <p className="text-sm text-warning font-medium mt-2">
                  {formatCurrency(stat.amount)}
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Campaigns */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">최근 캠페인</CardTitle>
              <Button variant="ghost" size="sm">
                전체보기 <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>캠페인</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead>지원자</TableHead>
                    <TableHead>예산</TableHead>
                    <TableHead>마감</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentCampaigns.map((campaign) => (
                    <TableRow key={campaign.id} className="cursor-pointer hover:bg-gray-50">
                      <TableCell>
                        <div>
                          <p className="font-medium">{campaign.name}</p>
                          <p className="text-sm text-gray-500">{campaign.brand}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusColors[campaign.status]}>
                          {campaign.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {campaign.applicants}/{campaign.target}명
                      </TableCell>
                      <TableCell>{formatCurrency(campaign.budget)}</TableCell>
                      <TableCell>
                        <span
                          className={`text-sm ${
                            getDDay(campaign.deadline).startsWith('D-') &&
                            parseInt(getDDay(campaign.deadline).slice(2)) <= 3
                              ? 'text-error font-medium'
                              : 'text-gray-500'
                          }`}
                        >
                          {getDDay(campaign.deadline)}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activities */}
        <div>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">실시간 피드</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                  >
                    <div
                      className={`w-2 h-2 rounded-full mt-2 ${
                        activity.type === 'campaign'
                          ? 'bg-cnec-blue'
                          : activity.type === 'user'
                          ? 'bg-success'
                          : 'bg-warning'
                      }`}
                    />
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">{activity.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="mt-4">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">빠른 작업</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-between">
                출금 대기 처리
                <Badge variant="warning">8건</Badge>
              </Button>
              <Button variant="outline" className="w-full justify-between">
                콘텐츠 검수
                <Badge variant="blue">4건</Badge>
              </Button>
              <Button variant="outline" className="w-full justify-between">
                사업자 승인
                <Badge>2건</Badge>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
