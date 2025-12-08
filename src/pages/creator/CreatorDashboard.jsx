import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Megaphone,
  DollarSign,
  TrendingUp,
  CheckCircle,
  Clock,
  ArrowRight,
  Gift,
  Users,
  Rocket,
} from 'lucide-react';
import { Card, CardTitle, CardContent, Button, Badge } from '../../components/common';
import { formatCurrency, formatNumber, formatDate } from '../../utils/format';

export const CreatorDashboard = () => {
  const [stats, setStats] = useState({
    activeCampaigns: 0,
    completedCampaigns: 0,
    totalEarnings: 0,
    pendingEarnings: 0,
    availableBalance: 0,
  });

  const [availableCampaigns, setAvailableCampaigns] = useState([]);
  const [myCampaigns, setMyCampaigns] = useState([]);

  useEffect(() => {
    // TODO: Fetch from Supabase
    setStats({
      activeCampaigns: 2,
      completedCampaigns: 15,
      totalEarnings: 8500000,
      pendingEarnings: 800000,
      availableBalance: 500000,
    });

    setAvailableCampaigns([
      {
        id: 1,
        name: '신제품 런칭 기획 숏폼',
        brand: 'ABC 화장품',
        category: '기획 숏폼',
        manuscriptFee: 400000,
        deadline: '2024-01-31',
        applicants: 8,
        targetCount: 10,
      },
      {
        id: 2,
        name: '4주 스킨케어 챌린지',
        brand: 'XYZ 뷰티',
        category: '4주 챌린지',
        manuscriptFee: 800000,
        deadline: '2024-02-15',
        applicants: 3,
        targetCount: 5,
      },
    ]);

    setMyCampaigns([
      {
        id: 101,
        name: '기초 스킨케어 리뷰',
        status: 'in_progress',
        uploadDeadline: '2024-01-25',
      },
      {
        id: 102,
        name: '메이크업 튜토리얼',
        status: 'review',
        uploadDeadline: '2024-01-20',
      },
    ]);
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'in_progress':
        return <Badge variant="info">제작중</Badge>;
      case 'review':
        return <Badge variant="warning">검수중</Badge>;
      case 'completed':
        return <Badge variant="success">완료</Badge>;
      default:
        return <Badge>-</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <Card className="bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">크넥 크리에이터로 성장하세요!</h2>
            <p className="text-primary-100 mt-2">
              뷰티 전문 크리에이터로 성장하고, 다양한 혜택을 받아보세요.
            </p>
            <div className="flex items-center space-x-4 mt-4">
              <div className="flex items-center">
                <Gift className="h-5 w-5 mr-2" />
                <span className="text-sm">제품 지원</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                <span className="text-sm">공동구매 매칭</span>
              </div>
              <div className="flex items-center">
                <Rocket className="h-5 w-5 mr-2" />
                <span className="text-sm">브랜드 창업 지원</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

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
              <p className="text-sm text-gray-500">완료 캠페인</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completedCampaigns}</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">총 수익</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(stats.totalEarnings)}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-500" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">출금 가능</p>
              <p className="text-2xl font-bold text-primary-600">{formatCurrency(stats.availableBalance)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-yellow-500" />
          </div>
        </Card>
      </div>

      {/* My Campaigns */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <CardTitle>진행중인 캠페인</CardTitle>
          <Link to="/creator/campaigns" className="text-sm text-primary-600 hover:text-primary-700 flex items-center">
            전체 보기 <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <CardContent>
          {myCampaigns.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Megaphone className="h-12 w-12 mx-auto text-gray-300" />
              <p className="mt-2">진행중인 캠페인이 없습니다</p>
              <Link to="/creator/campaigns">
                <Button className="mt-4" size="sm">
                  캠페인 지원하기
                </Button>
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {myCampaigns.map((campaign) => (
                <div
                  key={campaign.id}
                  className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                >
                  <div>
                    <p className="font-medium text-gray-900">{campaign.name}</p>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <Clock className="h-4 w-4 mr-1" />
                      업로드 마감: {formatDate(campaign.uploadDeadline)}
                    </div>
                  </div>
                  {getStatusBadge(campaign.status)}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Available Campaigns */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <CardTitle>지원 가능한 캠페인</CardTitle>
          <Link to="/creator/campaigns" className="text-sm text-primary-600 hover:text-primary-700 flex items-center">
            전체 보기 <ArrowRight className="h-4 w-4 ml-1" />
          </Link>
        </div>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {availableCampaigns.map((campaign) => (
              <div
                key={campaign.id}
                className="p-4 border rounded-lg hover:border-primary-300 hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <Badge variant="default" size="sm">{campaign.category}</Badge>
                    <h3 className="font-medium text-gray-900 mt-2">{campaign.name}</h3>
                    <p className="text-sm text-gray-500">{campaign.brand}</p>
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-lg font-bold text-primary-600">
                      {formatCurrency(campaign.manuscriptFee)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {campaign.applicants}/{campaign.targetCount}명 지원
                    </p>
                  </div>
                  <Link to={`/creator/campaigns/${campaign.id}`}>
                    <Button size="sm">지원하기</Button>
                  </Link>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  마감: {formatDate(campaign.deadline)}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Benefits Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center">
          <Gift className="h-10 w-10 text-primary-500 mx-auto" />
          <h3 className="font-medium mt-4">제품 지원</h3>
          <p className="text-sm text-gray-500 mt-2">
            다양한 뷰티 브랜드의 제품을 무료로 받아보세요
          </p>
        </Card>
        <Card className="text-center">
          <Users className="h-10 w-10 text-green-500 mx-auto" />
          <h3 className="font-medium mt-4">공동구매 매칭</h3>
          <p className="text-sm text-gray-500 mt-2">
            팔로워를 위한 공동구매 매칭 서비스 제공
          </p>
        </Card>
        <Card className="text-center">
          <Rocket className="h-10 w-10 text-yellow-500 mx-auto" />
          <h3 className="font-medium mt-4">브랜드 창업 지원</h3>
          <p className="text-sm text-gray-500 mt-2">
            일정 요건 충족 시 뷰티 브랜드 창업 지원
          </p>
        </Card>
      </div>
    </div>
  );
};

export default CreatorDashboard;
