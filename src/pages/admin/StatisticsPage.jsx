import { useState, useEffect } from 'react';
import {
  Users,
  Instagram,
  Youtube,
  Music2,
  TrendingUp,
  Calendar,
} from 'lucide-react';
import {
  Card,
  CardTitle,
  CardContent,
  Select,
} from '../../components/common';
import { formatNumber, formatFollowers } from '../../utils/format';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

const COLORS = ['#0ea5e9', '#22c55e', '#f59e0b', '#ef4444', '#8b5cf6'];

export const StatisticsPage = () => {
  const [period, setPeriod] = useState('month');
  const [stats, setStats] = useState({
    ageDistribution: [],
    snsDistribution: [],
    followerAverage: {},
    monthlySignups: [],
    campaignStats: [],
  });

  useEffect(() => {
    fetchStats();
  }, [period]);

  const fetchStats = async () => {
    // Mock data
    setStats({
      ageDistribution: [
        { name: '10대', value: 120, percent: 8 },
        { name: '20대', value: 650, percent: 43 },
        { name: '30대', value: 480, percent: 32 },
        { name: '40대', value: 180, percent: 12 },
        { name: '50대 이상', value: 70, percent: 5 },
      ],
      snsDistribution: [
        { name: '인스타그램', value: 1200, icon: Instagram, color: '#E4405F' },
        { name: '유튜브', value: 450, icon: Youtube, color: '#FF0000' },
        { name: '틱톡', value: 850, icon: Music2, color: '#000000' },
      ],
      followerAverage: {
        instagram: 45000,
        youtube: 32000,
        tiktok: 68000,
        total: 48000,
      },
      monthlySignups: [
        { month: '1월', signups: 45 },
        { month: '2월', signups: 52 },
        { month: '3월', signups: 61 },
        { month: '4월', signups: 48 },
        { month: '5월', signups: 73 },
        { month: '6월', signups: 85 },
        { month: '7월', signups: 92 },
        { month: '8월', signups: 78 },
        { month: '9월', signups: 88 },
        { month: '10월', signups: 95 },
        { month: '11월', signups: 102 },
        { month: '12월', signups: 110 },
      ],
      campaignStats: [
        { month: '1월', campaigns: 12, revenue: 15000000 },
        { month: '2월', campaigns: 18, revenue: 22000000 },
        { month: '3월', campaigns: 15, revenue: 18000000 },
        { month: '4월', campaigns: 22, revenue: 28000000 },
        { month: '5월', campaigns: 25, revenue: 32000000 },
        { month: '6월', campaigns: 30, revenue: 38000000 },
      ],
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">통계</h1>
          <p className="text-gray-500 mt-1">크리에이터 및 캠페인 통계를 확인하세요</p>
        </div>
        <Select
          value={period}
          onChange={(e) => setPeriod(e.target.value)}
          options={[
            { value: 'week', label: '이번 주' },
            { value: 'month', label: '이번 달' },
            { value: 'quarter', label: '이번 분기' },
            { value: 'year', label: '올해' },
          ]}
          className="w-40"
        />
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">전체 크리에이터</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatNumber(stats.ageDistribution.reduce((sum, a) => sum + a.value, 0))}
              </p>
            </div>
            <Users className="h-8 w-8 text-primary-500" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">평균 팔로워</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatFollowers(stats.followerAverage.total)}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">이달 신규 가입</p>
              <p className="text-2xl font-bold text-gray-900">
                {stats.monthlySignups.length > 0
                  ? formatNumber(stats.monthlySignups[stats.monthlySignups.length - 1].signups)
                  : '-'}
              </p>
            </div>
            <Calendar className="h-8 w-8 text-blue-500" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">주요 SNS</p>
              <p className="text-2xl font-bold text-pink-600">인스타그램</p>
            </div>
            <Instagram className="h-8 w-8 text-pink-500" />
          </div>
        </Card>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Age Distribution */}
        <Card>
          <CardTitle>연령별 가입자</CardTitle>
          <CardContent className="mt-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={stats.ageDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${percent}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {stats.ageDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* SNS Distribution */}
        <Card>
          <CardTitle>SNS별 가입자</CardTitle>
          <CardContent className="mt-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={stats.snsDistribution}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#0ea5e9">
                    {stats.snsDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4">
              {stats.snsDistribution.map((sns) => (
                <div key={sns.name} className="text-center">
                  <p className="text-sm text-gray-500">{sns.name}</p>
                  <p className="text-lg font-bold" style={{ color: sns.color }}>
                    {formatNumber(sns.value)}명
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Signups */}
        <Card>
          <CardTitle>월별 가입자 추이</CardTitle>
          <CardContent className="mt-4">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stats.monthlySignups}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="signups"
                    stroke="#0ea5e9"
                    strokeWidth={2}
                    dot={{ fill: '#0ea5e9' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Average Followers by SNS */}
        <Card>
          <CardTitle>SNS별 평균 팔로워</CardTitle>
          <CardContent className="mt-4">
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-pink-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Instagram className="h-8 w-8 text-pink-500" />
                  <span className="font-medium">인스타그램</span>
                </div>
                <span className="text-xl font-bold text-pink-600">
                  {formatFollowers(stats.followerAverage.instagram)}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Youtube className="h-8 w-8 text-red-500" />
                  <span className="font-medium">유튜브</span>
                </div>
                <span className="text-xl font-bold text-red-600">
                  {formatFollowers(stats.followerAverage.youtube)}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Music2 className="h-8 w-8 text-gray-700" />
                  <span className="font-medium">틱톡</span>
                </div>
                <span className="text-xl font-bold text-gray-700">
                  {formatFollowers(stats.followerAverage.tiktok)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Campaign Stats */}
      <Card>
        <CardTitle>캠페인 현황</CardTitle>
        <CardContent className="mt-4">
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.campaignStats}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" orientation="left" stroke="#0ea5e9" />
                <YAxis yAxisId="right" orientation="right" stroke="#22c55e" />
                <Tooltip
                  formatter={(value, name) => [
                    name === 'revenue' ? formatNumber(value) + '원' : value + '건',
                    name === 'revenue' ? '매출' : '캠페인',
                  ]}
                />
                <Legend />
                <Bar yAxisId="left" dataKey="campaigns" fill="#0ea5e9" name="캠페인 수" />
                <Bar yAxisId="right" dataKey="revenue" fill="#22c55e" name="매출" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardTitle>추천 지표</CardTitle>
          <CardContent className="mt-4">
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between">
                <span className="text-gray-500">가장 활발한 연령대</span>
                <span className="font-medium">20대 (43%)</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">가장 높은 참여율 SNS</span>
                <span className="font-medium">틱톡</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">평균 캠페인 완료율</span>
                <span className="font-medium">92%</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">재참여율</span>
                <span className="font-medium">78%</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>카테고리별 선호도</CardTitle>
          <CardContent className="mt-4">
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between">
                <span className="text-gray-500">기초 스킨케어</span>
                <span className="font-medium">35%</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">색조 메이크업</span>
                <span className="font-medium">28%</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">이너뷰티</span>
                <span className="font-medium">20%</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">디바이스</span>
                <span className="font-medium">12%</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">기타</span>
                <span className="font-medium">5%</span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>성장 지표</CardTitle>
          <CardContent className="mt-4">
            <ul className="space-y-3 text-sm">
              <li className="flex justify-between">
                <span className="text-gray-500">월간 성장률</span>
                <span className="font-medium text-green-600">+12.5%</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">신규 광고주</span>
                <span className="font-medium">15개</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">평균 캠페인 규모</span>
                <span className="font-medium">5.2M</span>
              </li>
              <li className="flex justify-between">
                <span className="text-gray-500">크리에이터 만족도</span>
                <span className="font-medium">4.7/5.0</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StatisticsPage;
