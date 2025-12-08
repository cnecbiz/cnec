import { useState, useEffect } from 'react';
import {
  Users,
  DollarSign,
  TrendingUp,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { Card, CardTitle, CardContent } from '../../components/common';
import { formatCurrency, formatNumber } from '../../utils/format';

const StatCard = ({ title, value, change, changeType, icon: Icon }) => (
  <Card>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        {change && (
          <div className={`flex items-center mt-2 text-sm ${changeType === 'up' ? 'text-green-600' : 'text-red-600'}`}>
            {changeType === 'up' ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
            <span>{change}% 전월 대비</span>
          </div>
        )}
      </div>
      <div className={`p-3 rounded-lg ${
        changeType === 'up' ? 'bg-green-100' : changeType === 'down' ? 'bg-red-100' : 'bg-primary-100'
      }`}>
        <Icon className={`h-6 w-6 ${
          changeType === 'up' ? 'text-green-600' : changeType === 'down' ? 'text-red-600' : 'text-primary-600'
        }`} />
      </div>
    </div>
  </Card>
);

export const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalCreators: 0,
    totalRevenue: 0,
    activeCampaigns: 0,
    pendingContracts: 0,
  });

  useEffect(() => {
    // TODO: Fetch real stats from Supabase
    setStats({
      totalCreators: 1234,
      totalRevenue: 125000000,
      activeCampaigns: 45,
      pendingContracts: 12,
    });
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
        <p className="text-gray-500 mt-1">전체 현황을 확인하세요</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="전체 크리에이터"
          value={formatNumber(stats.totalCreators)}
          change="12"
          changeType="up"
          icon={Users}
        />
        <StatCard
          title="월 매출"
          value={formatCurrency(stats.totalRevenue)}
          change="8"
          changeType="up"
          icon={DollarSign}
        />
        <StatCard
          title="진행중 캠페인"
          value={formatNumber(stats.activeCampaigns)}
          change="5"
          changeType="down"
          icon={TrendingUp}
        />
        <StatCard
          title="대기중 계약서"
          value={formatNumber(stats.pendingContracts)}
          icon={FileText}
        />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardTitle>최근 가입 크리에이터</CardTitle>
          <CardContent className="mt-4">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div className="flex items-center space-x-3">
                    <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">크리에이터 {i}</p>
                      <p className="text-xs text-gray-500">@creator{i}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-500">방금 전</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardTitle>최근 캠페인</CardTitle>
          <CardContent className="mt-4">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-900">캠페인 {i}</p>
                    <p className="text-xs text-gray-500">브랜드 {i}</p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    i % 2 === 0 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {i % 2 === 0 ? '진행중' : '모집중'}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage;
