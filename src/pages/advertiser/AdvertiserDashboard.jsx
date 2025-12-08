import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Megaphone,
  Users,
  TrendingUp,
  DollarSign,
  Plus,
  ArrowRight,
} from 'lucide-react';
import { Card, CardTitle, CardContent, Button, Badge } from '../../components/common';
import { formatCurrency, formatNumber, formatDate } from '../../utils/format';

export const AdvertiserDashboard = () => {
  const [stats, setStats] = useState({
    activeCampaigns: 0,
    totalCreators: 0,
    totalViews: 0,
    totalSpent: 0,
  });

  const [recentCampaigns, setRecentCampaigns] = useState([]);

  useEffect(() => {
    // TODO: Fetch from Supabase
    setStats({
      activeCampaigns: 3,
      totalCreators: 25,
      totalViews: 150000,
      totalSpent: 12500000,
    });

    setRecentCampaigns([
      {
        id: 1,
        name: '신제품 런칭 캠페인',
        status: 'in_progress',
        creatorCount: 10,
        deadline: '2024-02-15',
      },
      {
        id: 2,
        name: '4주 챌린지 캠페인',
        status: 'recruiting',
        creatorCount: 5,
        deadline: '2024-01-31',
      },
      {
        id: 3,
        name: '프리미엄 인플루언서 캠페인',
        status: 'completed',
        creatorCount: 3,
        deadline: '2024-01-10',
      },
    ]);
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'recruiting':
        return <Badge variant="info">모집중</Badge>;
      case 'in_progress':
        return <Badge variant="warning">진행중</Badge>;
      case 'completed':
        return <Badge variant="success">완료</Badge>;
      default:
        return <Badge>-</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
          <p className="text-gray-500 mt-1">캠페인 현황을 확인하세요</p>
        </div>
        <Link to="/advertiser/campaigns/create">
          <Button icon={Plus}>
            캠페인 등록
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">진행중 캠페인</p>
              <p className="text-2xl font-bold text-gray-900">{stats.activeCampaigns}</p>
            </div>
            <Megaphone className="h-8 w-8 text-primary-500" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">참여 크리에이터</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalCreators}명</p>
            </div>
            <Users className="h-8 w-8 text-green-500" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">총 조회수</p>
              <p className="text-2xl font-bold text-gray-900">{formatNumber(stats.totalViews)}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-500" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">총 집행 금액</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalSpent)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-yellow-500" />
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardTitle>빠른 작업</CardTitle>
        <CardContent className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link
              to="/advertiser/campaigns/create?type=planned_shortform"
              className="p-4 border rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
            >
              <h3 className="font-medium text-gray-900">기획 숏폼</h3>
              <p className="text-sm text-gray-500 mt-1">컨셉에 맞는 기획영상 제작</p>
            </Link>
            <Link
              to="/advertiser/campaigns/create?type=four_week_challenge"
              className="p-4 border rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
            >
              <h3 className="font-medium text-gray-900">4주 챌린지</h3>
              <p className="text-sm text-gray-500 mt-1">4주간 드라마틱한 비포&애프터</p>
            </Link>
            <Link
              to="/advertiser/campaigns/create?type=premium"
              className="p-4 border rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
            >
              <h3 className="font-medium text-gray-900">프리미엄</h3>
              <p className="text-sm text-gray-500 mt-1">메가 인플루언서 섭외</p>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recent Campaigns */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <CardTitle>최근 캠페인</CardTitle>
          <Link to="/advertiser/campaigns" className="text-sm text-primary-600 hover:text-primary-700 flex items-center">
            전체 보기 <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <CardContent>
          <div className="space-y-4">
            {recentCampaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
              >
                <div>
                  <p className="font-medium text-gray-900">{campaign.name}</p>
                  <p className="text-sm text-gray-500">
                    크리에이터 {campaign.creatorCount}명 · 마감 {formatDate(campaign.deadline)}
                  </p>
                </div>
                {getStatusBadge(campaign.status)}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Info Banner */}
      <Card className="bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold">크넥 서비스 안내</h3>
            <p className="text-primary-100 mt-1">
              뷰티 전문 크리에이터와 함께하는 숏폼 마케팅, 지금 시작하세요!
            </p>
          </div>
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-primary-600">
            자세히 보기
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default AdvertiserDashboard;
