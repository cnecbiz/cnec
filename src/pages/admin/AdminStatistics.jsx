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
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Download,
  Users,
  Megaphone,
  TrendingUp,
  TrendingDown,
  Instagram,
  Youtube,
  Calendar,
  BarChart3,
  Target,
  Award,
  Eye,
  Heart,
  Share2,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Crown,
  Zap,
  Activity,
} from 'lucide-react'

function TiktokIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )
}

// Premium Progress Bar Component
function PremiumProgress({ value, color = 'blue', showGlow = false }) {
  const colors = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    pink: 'from-pink-500 to-pink-600',
    green: 'from-emerald-500 to-emerald-600',
    orange: 'from-orange-500 to-orange-600',
    cyan: 'from-cyan-500 to-cyan-600',
  }

  return (
    <div className="relative h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
      <div
        className={`absolute inset-y-0 left-0 bg-gradient-to-r ${colors[color]} rounded-full transition-all duration-700 ease-out`}
        style={{ width: `${value}%` }}
      >
        {showGlow && (
          <div className="absolute inset-0 bg-white/30 animate-pulse" />
        )}
      </div>
    </div>
  )
}

// Stat Card Component
function StatCard({ title, value, subtitle, icon: Icon, trend, trendValue, gradient, iconBg }) {
  const isPositive = trend === 'up'

  return (
    <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-[0.03] group-hover:opacity-[0.06] transition-opacity`} />
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-3xl font-bold text-gray-900 tracking-tight">{value}</p>
            {(subtitle || trendValue) && (
              <div className="flex items-center gap-2">
                {trendValue && (
                  <span className={`inline-flex items-center text-sm font-medium ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
                    {isPositive ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                    {trendValue}
                  </span>
                )}
                {subtitle && <span className="text-sm text-gray-400">{subtitle}</span>}
              </div>
            )}
          </div>
          <div className={`w-14 h-14 rounded-2xl ${iconBg} flex items-center justify-center shadow-lg`}>
            <Icon className="h-7 w-7 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// Data
const ageStats = [
  { age: '10대', count: 312, percentage: 6, color: 'cyan' },
  { age: '20대', count: 2456, percentage: 47, color: 'blue' },
  { age: '30대', count: 1678, percentage: 32, color: 'purple' },
  { age: '40대', count: 589, percentage: 11, color: 'pink' },
  { age: '50대+', count: 199, percentage: 4, color: 'orange' },
]

const snsStats = [
  { platform: 'Instagram', icon: Instagram, color: 'from-pink-500 to-rose-500', bgColor: 'bg-gradient-to-r from-pink-500 to-rose-500', count: 3856, percentage: 74 },
  { platform: 'TikTok', icon: TiktokIcon, color: 'from-gray-800 to-gray-900', bgColor: 'bg-gradient-to-r from-gray-800 to-gray-900', count: 2134, percentage: 41 },
  { platform: 'YouTube', icon: Youtube, color: 'from-red-500 to-red-600', bgColor: 'bg-gradient-to-r from-red-500 to-red-600', count: 987, percentage: 19 },
]

const followerStats = [
  { range: '1K ~ 5K', count: 1234, percentage: 24, color: 'green' },
  { range: '5K ~ 10K', count: 1567, percentage: 30, color: 'blue' },
  { range: '10K ~ 50K', count: 1456, percentage: 28, color: 'purple' },
  { range: '50K ~ 100K', count: 623, percentage: 12, color: 'pink' },
  { range: '100K+', count: 354, percentage: 7, color: 'orange' },
]

const skinTypeStats = [
  { type: '건성', count: 1234, percentage: 24, color: 'blue' },
  { type: '지성', count: 1456, percentage: 28, color: 'green' },
  { type: '복합성', count: 1789, percentage: 34, color: 'purple' },
  { type: '민감성', count: 755, percentage: 14, color: 'pink' },
]

const categoryStats = [
  { category: '스킨케어', count: 2345, percentage: 45, icon: Sparkles, color: 'from-blue-500 to-cyan-500' },
  { category: '메이크업', count: 1678, percentage: 32, icon: Heart, color: 'from-pink-500 to-rose-500' },
  { category: '헤어케어', count: 456, percentage: 9, icon: Zap, color: 'from-purple-500 to-violet-500' },
  { category: '바디케어', count: 389, percentage: 7, icon: Activity, color: 'from-green-500 to-emerald-500' },
  { category: '이너뷰티', count: 366, percentage: 7, icon: Award, color: 'from-orange-500 to-amber-500' },
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
  { month: '7월', count: 234, target: 250 },
  { month: '8월', count: 289, target: 280 },
  { month: '9월', count: 312, target: 300 },
  { month: '10월', count: 356, target: 350 },
  { month: '11월', count: 378, target: 370 },
  { month: '12월', count: 156, target: 400 },
]

const topCreators = [
  { name: '뷰티민지', followers: 125000, campaigns: 24, rating: 4.9, avatar: '민' },
  { name: '수아뷰티', followers: 89000, campaigns: 18, rating: 4.8, avatar: '수' },
  { name: '예나메이크업', followers: 210000, campaigns: 32, rating: 4.9, avatar: '예' },
  { name: '스킨케어연구소', followers: 156000, campaigns: 22, rating: 4.7, avatar: '스' },
  { name: '데일리뷰티', followers: 98000, campaigns: 16, rating: 4.8, avatar: '데' },
]

const engagementStats = {
  avgViews: 45678,
  avgLikes: 3456,
  avgShares: 234,
  avgEngagementRate: 7.8,
}

export function AdminStatistics() {
  const [period, setPeriod] = useState('month')

  const maxSignup = Math.max(...monthlySignups.map(m => m.count))

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">통계 대시보드</h1>
          <p className="text-gray-500 mt-1">플랫폼 성과를 한눈에 확인하세요</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-36 bg-white border-gray-200 shadow-sm">
              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">이번 주</SelectItem>
              <SelectItem value="month">이번 달</SelectItem>
              <SelectItem value="quarter">분기</SelectItem>
              <SelectItem value="year">올해</SelectItem>
            </SelectContent>
          </Select>
          <Button className="bg-gray-900 hover:bg-gray-800 text-white shadow-lg">
            <Download className="mr-2 h-4 w-4" />
            리포트 다운로드
          </Button>
        </div>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="bg-gray-100/80 p-1 rounded-xl">
          <TabsTrigger value="users" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm px-6">
            크리에이터 통계
          </TabsTrigger>
          <TabsTrigger value="campaigns" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm px-6">
            캠페인 통계
          </TabsTrigger>
          <TabsTrigger value="revenue" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm px-6">
            매출 통계
          </TabsTrigger>
          <TabsTrigger value="engagement" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm px-6">
            인게이지먼트
          </TabsTrigger>
        </TabsList>

        {/* 크리에이터 통계 */}
        <TabsContent value="users" className="space-y-6">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            <StatCard
              title="총 크리에이터"
              value="5,234명"
              trendValue="+12.5%"
              subtitle="vs 지난달"
              trend="up"
              icon={Users}
              gradient="from-blue-600 to-cyan-500"
              iconBg="bg-gradient-to-br from-blue-500 to-cyan-500"
            />
            <StatCard
              title="총 광고주"
              value="412개"
              trendValue="+8.2%"
              subtitle="vs 지난달"
              trend="up"
              icon={Target}
              gradient="from-purple-600 to-pink-500"
              iconBg="bg-gradient-to-br from-purple-500 to-pink-500"
            />
            <StatCard
              title="평균 팔로워"
              value="24.5K"
              trendValue="+5.3%"
              subtitle="vs 지난달"
              trend="up"
              icon={Heart}
              gradient="from-rose-600 to-orange-500"
              iconBg="bg-gradient-to-br from-rose-500 to-orange-500"
            />
            <StatCard
              title="이번 달 신규"
              value="+156명"
              subtitle="일 평균 5.2명"
              icon={TrendingUp}
              gradient="from-emerald-600 to-teal-500"
              iconBg="bg-gradient-to-br from-emerald-500 to-teal-500"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* 연령별 통계 */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                      <BarChart3 className="h-4 w-4 text-white" />
                    </div>
                    연령별 가입자
                  </CardTitle>
                  <Badge variant="secondary" className="bg-blue-50 text-blue-600 border-0">총 5,234명</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-5 pt-4">
                {ageStats.map((stat) => (
                  <div key={stat.age} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">{stat.age}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900">{stat.count.toLocaleString()}명</span>
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{stat.percentage}%</span>
                      </div>
                    </div>
                    <PremiumProgress value={stat.percentage * 2} color={stat.color} />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* SNS별 통계 */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center">
                      <Share2 className="h-4 w-4 text-white" />
                    </div>
                    SNS별 가입자
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-5 pt-4">
                {snsStats.map((stat) => {
                  const Icon = stat.icon
                  return (
                    <div key={stat.platform} className="group">
                      <div className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors">
                        <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center shadow-lg`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-center mb-2">
                            <span className="font-semibold text-gray-900">{stat.platform}</span>
                            <span className="text-sm font-bold text-gray-700">{stat.count.toLocaleString()}명</span>
                          </div>
                          <div className="relative h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className={`absolute inset-y-0 left-0 bg-gradient-to-r ${stat.color} rounded-full transition-all duration-700`}
                              style={{ width: `${stat.percentage}%` }}
                            />
                          </div>
                        </div>
                        <span className="text-lg font-bold text-gray-400">{stat.percentage}%</span>
                      </div>
                    </div>
                  )
                })}
                <p className="text-xs text-gray-400 text-center pt-2">
                  * 중복 계정 포함 (다중 SNS 연동 가능)
                </p>
              </CardContent>
            </Card>

            {/* 팔로워 분포 */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">
                      <Users className="h-4 w-4 text-white" />
                    </div>
                    팔로워 분포
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-5 pt-4">
                {followerStats.map((stat) => (
                  <div key={stat.range} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">{stat.range}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900">{stat.count.toLocaleString()}명</span>
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{stat.percentage}%</span>
                      </div>
                    </div>
                    <PremiumProgress value={stat.percentage * 3} color={stat.color} />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* 피부타입 분포 */}
            <Card className="border-0 shadow-lg">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-white" />
                    </div>
                    피부타입 분포
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-5 pt-4">
                {skinTypeStats.map((stat) => (
                  <div key={stat.type} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">{stat.type}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900">{stat.count.toLocaleString()}명</span>
                        <span className="text-xs text-gray-400 bg-gray-100 px-2 py-0.5 rounded-full">{stat.percentage}%</span>
                      </div>
                    </div>
                    <PremiumProgress value={stat.percentage * 2.5} color={stat.color} />
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* 월별 가입 추이 */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                    <Calendar className="h-4 w-4 text-white" />
                  </div>
                  월별 신규 가입 추이
                </CardTitle>
                <div className="flex items-center gap-4 text-sm">
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500" />
                    실제
                  </span>
                  <span className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-gray-200" />
                    목표
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-6 h-64 pt-8">
                {monthlySignups.map((month) => (
                  <div key={month.month} className="flex-1 flex flex-col items-center gap-3">
                    <div className="relative w-full h-48 flex items-end">
                      {/* Target bar (background) */}
                      <div
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 bg-gray-100 rounded-t-lg"
                        style={{ height: `${(month.target / 400) * 100}%` }}
                      />
                      {/* Actual bar */}
                      <div
                        className="relative left-1/2 -translate-x-1/2 w-10 bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-lg shadow-lg transition-all duration-500 hover:scale-105"
                        style={{ height: `${(month.count / 400) * 100}%` }}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded-lg whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
                          {month.count}명
                        </div>
                      </div>
                    </div>
                    <div className="text-center">
                      <span className="text-sm font-medium text-gray-600">{month.month}</span>
                      <p className="text-lg font-bold text-gray-900">{month.count}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* 카테고리별 관심사 */}
          <Card className="border-0 shadow-lg overflow-hidden">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                  <Target className="h-4 w-4 text-white" />
                </div>
                카테고리별 관심사
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
                {categoryStats.map((stat) => {
                  const Icon = stat.icon
                  return (
                    <div
                      key={stat.category}
                      className="group relative p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 hover:from-white hover:to-gray-50 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300 text-center"
                    >
                      <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <p className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                        {stat.percentage}%
                      </p>
                      <p className="text-sm font-medium text-gray-600 mt-1">{stat.category}</p>
                      <p className="text-xs text-gray-400 mt-1">{stat.count.toLocaleString()}명</p>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 캠페인 통계 */}
        <TabsContent value="campaigns" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            <StatCard
              title="총 캠페인"
              value={`${campaignStats.total}건`}
              icon={Megaphone}
              gradient="from-blue-600 to-indigo-500"
              iconBg="bg-gradient-to-br from-blue-500 to-indigo-500"
            />
            <StatCard
              title="진행 중"
              value={`${campaignStats.active}건`}
              icon={Activity}
              gradient="from-emerald-600 to-green-500"
              iconBg="bg-gradient-to-br from-emerald-500 to-green-500"
            />
            <StatCard
              title="평균 지원자"
              value={`${campaignStats.avgApplicants}명`}
              icon={Users}
              gradient="from-purple-600 to-violet-500"
              iconBg="bg-gradient-to-br from-purple-500 to-violet-500"
            />
            <StatCard
              title="평균 완료율"
              value={`${campaignStats.avgCompletionRate}%`}
              icon={Award}
              gradient="from-amber-600 to-orange-500"
              iconBg="bg-gradient-to-br from-amber-500 to-orange-500"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
                    <Megaphone className="h-4 w-4 text-white" />
                  </div>
                  캠페인 유형별 현황
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                        <Zap className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900">기획 숏폼</span>
                        <p className="text-xs text-gray-500">단기 집중 캠페인</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-blue-600">89건</p>
                      <p className="text-xs text-gray-400">57%</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900">4주 챌린지</span>
                        <p className="text-xs text-gray-500">장기 리뷰 프로그램</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-purple-600">52건</p>
                      <p className="text-xs text-gray-400">33%</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                        <Crown className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <span className="font-semibold text-gray-900">프리미엄</span>
                        <p className="text-xs text-gray-500">브랜드 앰버서더</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-amber-600">15건</p>
                      <p className="text-xs text-gray-400">10%</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                      <Crown className="h-4 w-4 text-white" />
                    </div>
                    TOP 크리에이터
                  </CardTitle>
                  <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                    Best 5
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {topCreators.map((creator, index) => (
                    <div
                      key={creator.name}
                      className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold ${
                        index === 0 ? 'bg-gradient-to-br from-amber-400 to-amber-600' :
                        index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                        index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                        'bg-gray-200 text-gray-600'
                      }`}>
                        {index + 1}
                      </div>
                      <Avatar className="h-10 w-10 border-2 border-white shadow">
                        <AvatarFallback className="bg-gradient-to-br from-pink-400 to-rose-400 text-white font-semibold">
                          {creator.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-gray-900 truncate">{creator.name}</p>
                        <p className="text-xs text-gray-500">
                          {(creator.followers / 1000).toFixed(0)}K 팔로워 · {creator.campaigns}회 진행
                        </p>
                      </div>
                      <div className="flex items-center gap-1 bg-amber-50 px-2 py-1 rounded-lg">
                        <svg className="h-4 w-4 fill-amber-400" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                        <span className="text-sm font-bold text-amber-600">{creator.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 매출 통계 */}
        <TabsContent value="revenue" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            <StatCard
              title="총 매출"
              value="1.24억원"
              trendValue="+18.5%"
              subtitle="vs 지난달"
              trend="up"
              icon={TrendingUp}
              gradient="from-blue-600 to-cyan-500"
              iconBg="bg-gradient-to-br from-blue-500 to-cyan-500"
            />
            <StatCard
              title="캠페인 매출"
              value="8,540만원"
              icon={Megaphone}
              gradient="from-purple-600 to-pink-500"
              iconBg="bg-gradient-to-br from-purple-500 to-pink-500"
            />
            <StatCard
              title="수출바우처"
              value="3,860만원"
              icon={Award}
              gradient="from-emerald-600 to-teal-500"
              iconBg="bg-gradient-to-br from-emerald-500 to-teal-500"
            />
            <StatCard
              title="크리에이터 정산"
              value="6,230만원"
              icon={Users}
              gradient="from-gray-600 to-gray-500"
              iconBg="bg-gradient-to-br from-gray-500 to-gray-600"
            />
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-white" />
                </div>
                월별 매출 추이
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <BarChart3 className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">매출 차트가 여기에 표시됩니다</p>
                  <p className="text-sm text-gray-400 mt-1">Recharts 또는 Chart.js로 구현</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 인게이지먼트 통계 */}
        <TabsContent value="engagement" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
            <StatCard
              title="평균 조회수"
              value={`${(engagementStats.avgViews / 1000).toFixed(1)}K`}
              icon={Eye}
              gradient="from-blue-600 to-indigo-500"
              iconBg="bg-gradient-to-br from-blue-500 to-indigo-500"
            />
            <StatCard
              title="평균 좋아요"
              value={`${(engagementStats.avgLikes / 1000).toFixed(1)}K`}
              icon={Heart}
              gradient="from-rose-600 to-pink-500"
              iconBg="bg-gradient-to-br from-rose-500 to-pink-500"
            />
            <StatCard
              title="평균 공유"
              value={engagementStats.avgShares.toString()}
              icon={Share2}
              gradient="from-emerald-600 to-green-500"
              iconBg="bg-gradient-to-br from-emerald-500 to-green-500"
            />
            <StatCard
              title="평균 참여율"
              value={`${engagementStats.avgEngagementRate}%`}
              icon={Activity}
              gradient="from-purple-600 to-violet-500"
              iconBg="bg-gradient-to-br from-purple-500 to-violet-500"
            />
          </div>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-violet-500 flex items-center justify-center">
                  <Activity className="h-4 w-4 text-white" />
                </div>
                콘텐츠 성과 분석
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                    <Activity className="h-8 w-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500">콘텐츠 유형별/시간대별/요일별 성과 분석</p>
                  <p className="text-sm text-gray-400 mt-1">차트 라이브러리로 구현</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
