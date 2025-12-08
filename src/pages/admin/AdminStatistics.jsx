import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import {
  Download,
  Users,
  Megaphone,
  TrendingUp,
  Instagram,
  Youtube,
  Calendar,
  BarChart3,
  PieChart,
  Target,
  Award,
  Wallet,
  Eye,
  Heart,
  Share2,
} from 'lucide-react'

function TiktokIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )
}

// Sample statistics data
const ageStats = [
  { age: '10대', count: 312, percentage: 6 },
  { age: '20대', count: 2456, percentage: 47 },
  { age: '30대', count: 1678, percentage: 32 },
  { age: '40대', count: 589, percentage: 11 },
  { age: '50대+', count: 199, percentage: 4 },
]

const snsStats = [
  { platform: 'Instagram', icon: Instagram, color: 'text-pink-500', count: 3856, percentage: 74 },
  { platform: 'TikTok', icon: TiktokIcon, color: 'text-gray-800', count: 2134, percentage: 41 },
  { platform: 'YouTube', icon: Youtube, color: 'text-red-500', count: 987, percentage: 19 },
]

const followerStats = [
  { range: '1K ~ 5K', count: 1234, percentage: 24 },
  { range: '5K ~ 10K', count: 1567, percentage: 30 },
  { range: '10K ~ 50K', count: 1456, percentage: 28 },
  { range: '50K ~ 100K', count: 623, percentage: 12 },
  { range: '100K+', count: 354, percentage: 7 },
]

const skinTypeStats = [
  { type: '건성', count: 1234, percentage: 24 },
  { type: '지성', count: 1456, percentage: 28 },
  { type: '복합성', count: 1789, percentage: 34 },
  { type: '민감성', count: 755, percentage: 14 },
]

const categoryStats = [
  { category: '스킨케어', count: 2345, percentage: 45 },
  { category: '메이크업', count: 1678, percentage: 32 },
  { category: '헤어케어', count: 456, percentage: 9 },
  { category: '바디케어', count: 389, percentage: 7 },
  { category: '이너뷰티', count: 366, percentage: 7 },
]

const campaignStats = {
  total: 156,
  active: 23,
  completed: 128,
  pending: 5,
  avgApplicants: 34.5,
  avgCompletionRate: 92.3,
}

const monthlySignups = [
  { month: '7월', count: 234 },
  { month: '8월', count: 289 },
  { month: '9월', count: 312 },
  { month: '10월', count: 356 },
  { month: '11월', count: 378 },
  { month: '12월', count: 156 },
]

const topCreators = [
  { name: '뷰티민지', followers: 125000, campaigns: 24, rating: 4.9 },
  { name: '수아뷰티', followers: 89000, campaigns: 18, rating: 4.8 },
  { name: '예나메이크업', followers: 210000, campaigns: 32, rating: 4.9 },
  { name: '스킨케어연구소', followers: 156000, campaigns: 22, rating: 4.7 },
  { name: '데일리뷰티', followers: 98000, campaigns: 16, rating: 4.8 },
]

const engagementStats = {
  avgViews: 45678,
  avgLikes: 3456,
  avgShares: 234,
  avgEngagementRate: 7.8,
}

export function AdminStatistics() {
  const [period, setPeriod] = useState('month')

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">통계</h1>
          <p className="text-gray-500">플랫폼 이용 통계를 확인하세요.</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">이번 주</SelectItem>
              <SelectItem value="month">이번 달</SelectItem>
              <SelectItem value="quarter">분기</SelectItem>
              <SelectItem value="year">올해</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            리포트 다운로드
          </Button>
        </div>
      </div>

      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">크리에이터 통계</TabsTrigger>
          <TabsTrigger value="campaigns">캠페인 통계</TabsTrigger>
          <TabsTrigger value="revenue">매출 통계</TabsTrigger>
          <TabsTrigger value="engagement">인게이지먼트</TabsTrigger>
        </TabsList>

        {/* 크리에이터 통계 */}
        <TabsContent value="users" className="mt-4 space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">총 크리에이터</p>
                    <p className="text-2xl font-bold">5,234명</p>
                  </div>
                  <Users className="h-8 w-8 text-cnec-blue opacity-50" />
                </div>
                <p className="text-xs text-green-600 mt-2">+12.5% vs 지난달</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">총 광고주</p>
                    <p className="text-2xl font-bold">412개</p>
                  </div>
                  <Target className="h-8 w-8 text-purple-500 opacity-50" />
                </div>
                <p className="text-xs text-green-600 mt-2">+8.2% vs 지난달</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">평균 팔로워</p>
                    <p className="text-2xl font-bold">24.5K</p>
                  </div>
                  <Heart className="h-8 w-8 text-red-500 opacity-50" />
                </div>
                <p className="text-xs text-green-600 mt-2">+5.3% vs 지난달</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500">이번 달 신규</p>
                    <p className="text-2xl font-bold">+156명</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-500 opacity-50" />
                </div>
                <p className="text-xs text-gray-500 mt-2">일 평균 5.2명</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 연령별 통계 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  연령별 가입자
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {ageStats.map((stat) => (
                  <div key={stat.age} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{stat.age}</span>
                      <span className="text-gray-500">
                        {stat.count.toLocaleString()}명 ({stat.percentage}%)
                      </span>
                    </div>
                    <Progress value={stat.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* SNS별 통계 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Share2 className="h-5 w-5" />
                  SNS별 가입자
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {snsStats.map((stat) => {
                  const Icon = stat.icon
                  return (
                    <div key={stat.platform} className="flex items-center gap-4">
                      <Icon className={`h-6 w-6 ${stat.color}`} />
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">{stat.platform}</span>
                          <span className="text-gray-500">
                            {stat.count.toLocaleString()}명 ({stat.percentage}%)
                          </span>
                        </div>
                        <Progress value={stat.percentage} className="h-2" />
                      </div>
                    </div>
                  )
                })}
                <p className="text-xs text-gray-500 mt-2">
                  * 중복 계정 포함 (다중 SNS 연동 가능)
                </p>
              </CardContent>
            </Card>

            {/* 팔로워 분포 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  팔로워 분포
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {followerStats.map((stat) => (
                  <div key={stat.range} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{stat.range}</span>
                      <span className="text-gray-500">
                        {stat.count.toLocaleString()}명 ({stat.percentage}%)
                      </span>
                    </div>
                    <Progress value={stat.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* 피부타입 분포 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5" />
                  피부타입 분포
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {skinTypeStats.map((stat) => (
                  <div key={stat.type} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>{stat.type}</span>
                      <span className="text-gray-500">
                        {stat.count.toLocaleString()}명 ({stat.percentage}%)
                      </span>
                    </div>
                    <Progress value={stat.percentage} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* 월별 가입 추이 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                월별 신규 가입 추이
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-4 h-48">
                {monthlySignups.map((month) => (
                  <div key={month.month} className="flex-1 flex flex-col items-center">
                    <div
                      className="w-full bg-cnec-blue rounded-t"
                      style={{ height: `${(month.count / 400) * 100}%` }}
                    />
                    <span className="text-xs text-gray-500 mt-2">{month.month}</span>
                    <span className="text-xs font-medium">{month.count}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 카테고리별 관심사 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                카테고리별 관심사
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {categoryStats.map((stat) => (
                  <div key={stat.category} className="text-center p-4 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold text-cnec-blue">{stat.percentage}%</p>
                    <p className="text-sm text-gray-600 mt-1">{stat.category}</p>
                    <p className="text-xs text-gray-400">{stat.count.toLocaleString()}명</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 캠페인 통계 */}
        <TabsContent value="campaigns" className="mt-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">총 캠페인</p>
                <p className="text-2xl font-bold">{campaignStats.total}건</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">진행 중</p>
                <p className="text-2xl font-bold text-green-600">{campaignStats.active}건</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">평균 지원자</p>
                <p className="text-2xl font-bold">{campaignStats.avgApplicants}명</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">평균 완료율</p>
                <p className="text-2xl font-bold">{campaignStats.avgCompletionRate}%</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Megaphone className="h-5 w-5" />
                  캠페인 유형별 현황
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                  <span className="font-medium">기획 숏폼</span>
                  <Badge variant="blue">89건 (57%)</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                  <span className="font-medium">4주 챌린지</span>
                  <Badge variant="outline">52건 (33%)</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-amber-50 rounded-lg">
                  <span className="font-medium">프리미엄</span>
                  <Badge variant="secondary">15건 (10%)</Badge>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  TOP 크리에이터
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topCreators.map((creator, index) => (
                    <div key={creator.name} className="flex items-center gap-3">
                      <span className="w-6 h-6 rounded-full bg-cnec-blue text-white text-xs flex items-center justify-center">
                        {index + 1}
                      </span>
                      <div className="flex-1">
                        <p className="font-medium">{creator.name}</p>
                        <p className="text-xs text-gray-500">
                          팔로워 {(creator.followers / 1000).toFixed(0)}K · {creator.campaigns}회 진행
                        </p>
                      </div>
                      <Badge variant="outline">★ {creator.rating}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 매출 통계 */}
        <TabsContent value="revenue" className="mt-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">총 매출</p>
                <p className="text-2xl font-bold text-cnec-blue">1.24억원</p>
                <p className="text-xs text-green-600 mt-1">+18.5% vs 지난달</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">캠페인 매출</p>
                <p className="text-2xl font-bold">8,540만원</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">수출바우처</p>
                <p className="text-2xl font-bold">3,860만원</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">크리에이터 정산</p>
                <p className="text-2xl font-bold text-gray-600">6,230만원</p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                월별 매출 추이
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-gray-500">
                매출 차트가 여기에 표시됩니다 (실제 구현시 Chart.js 또는 Recharts 사용)
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 인게이지먼트 통계 */}
        <TabsContent value="engagement" className="mt-4 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Eye className="h-8 w-8 text-blue-500" />
                  <div>
                    <p className="text-sm text-gray-500">평균 조회수</p>
                    <p className="text-2xl font-bold">
                      {(engagementStats.avgViews / 1000).toFixed(1)}K
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Heart className="h-8 w-8 text-red-500" />
                  <div>
                    <p className="text-sm text-gray-500">평균 좋아요</p>
                    <p className="text-2xl font-bold">
                      {(engagementStats.avgLikes / 1000).toFixed(1)}K
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Share2 className="h-8 w-8 text-green-500" />
                  <div>
                    <p className="text-sm text-gray-500">평균 공유</p>
                    <p className="text-2xl font-bold">{engagementStats.avgShares}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-8 w-8 text-purple-500" />
                  <div>
                    <p className="text-sm text-gray-500">평균 참여율</p>
                    <p className="text-2xl font-bold">{engagementStats.avgEngagementRate}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>콘텐츠 성과 분석</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center text-gray-500">
                콘텐츠 유형별/시간대별/요일별 성과 분석 차트가 여기에 표시됩니다
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
