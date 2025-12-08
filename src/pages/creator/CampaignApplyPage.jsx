import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  Filter,
  Clock,
  Users,
  DollarSign,
} from 'lucide-react';
import {
  Card,
  Button,
  Select,
  Badge,
  SearchInput,
  Pagination,
} from '../../components/common';
import { formatCurrency, formatDate } from '../../utils/format';

export const CampaignApplyPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    category: '',
    productCategory: '',
  });

  useEffect(() => {
    fetchCampaigns();
  }, [currentPage, searchQuery, filters]);

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const mockData = [
        {
          id: 1,
          name: '신제품 기초 스킨케어 리뷰',
          brand: 'ABC 화장품',
          category: 'planned_shortform',
          productCategory: '기초',
          manuscriptFee: 400000,
          recruitmentDeadline: '2024-01-31',
          uploadDeadline: '2024-02-28',
          targetCount: 10,
          applicants: 8,
          description: '새로운 기초 스킨케어 라인 리뷰 캠페인입니다.',
          productImage: null,
        },
        {
          id: 2,
          name: '4주 피부 개선 챌린지',
          brand: 'XYZ 뷰티',
          category: 'four_week_challenge',
          productCategory: '기초',
          manuscriptFee: 800000,
          recruitmentDeadline: '2024-02-15',
          uploadDeadline: '2024-04-15',
          targetCount: 5,
          applicants: 3,
          description: '4주간 피부 변화를 기록하는 챌린지 캠페인입니다.',
          productImage: null,
        },
        {
          id: 3,
          name: '봄 신상 색조 메이크업',
          brand: '라라 코스메틱',
          category: 'planned_shortform',
          productCategory: '색조',
          manuscriptFee: 500000,
          recruitmentDeadline: '2024-02-10',
          uploadDeadline: '2024-03-10',
          targetCount: 8,
          applicants: 12,
          description: '봄 시즌 신상 색조 제품 리뷰 캠페인입니다.',
          productImage: null,
        },
        {
          id: 4,
          name: '이너뷰티 콜라겐 체험단',
          brand: '글로벌 뷰티',
          category: 'planned_shortform',
          productCategory: '이너뷰티',
          manuscriptFee: 300000,
          recruitmentDeadline: '2024-01-25',
          uploadDeadline: '2024-02-25',
          targetCount: 15,
          applicants: 10,
          description: '먹는 콜라겐 체험 리뷰 캠페인입니다.',
          productImage: null,
        },
      ];

      setCampaigns(mockData);
      setTotalPages(1);
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'planned_shortform':
        return '기획 숏폼';
      case 'four_week_challenge':
        return '4주 챌린지';
      case 'premium':
        return '프리미엄';
      default:
        return '-';
    }
  };

  const getCategoryBadge = (category) => {
    switch (category) {
      case 'planned_shortform':
        return <Badge variant="primary">{getCategoryLabel(category)}</Badge>;
      case 'four_week_challenge':
        return <Badge variant="success">{getCategoryLabel(category)}</Badge>;
      case 'premium':
        return <Badge variant="warning">{getCategoryLabel(category)}</Badge>;
      default:
        return <Badge>{getCategoryLabel(category)}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">캠페인 지원</h1>
        <p className="text-gray-500 mt-1">지원 가능한 캠페인을 확인하고 지원하세요</p>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-wrap gap-4">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
            placeholder="캠페인명, 브랜드로 검색..."
            className="w-64"
          />
          <Select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            options={[
              { value: 'planned_shortform', label: '기획 숏폼' },
              { value: 'four_week_challenge', label: '4주 챌린지' },
            ]}
            placeholder="캠페인 유형"
            className="w-40"
          />
          <Select
            value={filters.productCategory}
            onChange={(e) => setFilters({ ...filters, productCategory: e.target.value })}
            options={[
              { value: '기초', label: '기초' },
              { value: '색조', label: '색조' },
              { value: '디바이스', label: '디바이스' },
              { value: '이너뷰티', label: '이너뷰티' },
              { value: '기타', label: '기타' },
            ]}
            placeholder="제품 카테고리"
            className="w-40"
          />
        </div>
      </Card>

      {/* Campaign List */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-500">로딩중...</p>
        </div>
      ) : campaigns.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-gray-500">지원 가능한 캠페인이 없습니다.</p>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {campaigns.map((campaign) => (
            <Card key={campaign.id} className="hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  {getCategoryBadge(campaign.category)}
                  <Badge variant="default" className="ml-2">{campaign.productCategory}</Badge>
                </div>
                {campaign.applicants >= campaign.targetCount && (
                  <Badge variant="danger">마감임박</Badge>
                )}
              </div>

              <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
              <p className="text-sm text-gray-500 mt-1">{campaign.brand}</p>

              <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                {campaign.description}
              </p>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-500">원고비</p>
                    <p className="text-lg font-bold text-primary-600">
                      {formatCurrency(campaign.manuscriptFee)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">지원 현황</p>
                    <div className="flex items-center">
                      <Users className="h-4 w-4 text-gray-400 mr-1" />
                      <span className="text-sm">
                        <span className="font-medium">{campaign.applicants}</span>
                        <span className="text-gray-400">/{campaign.targetCount}명</span>
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    마감: {formatDate(campaign.recruitmentDeadline)}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <Link to={`/creator/campaigns/${campaign.id}`}>
                  <Button className="w-full">
                    자세히 보기
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Pagination */}
      <div className="flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      {/* Guide */}
      <Card className="bg-primary-50 border-primary-200">
        <h3 className="font-semibold text-primary-900">캠페인 지원 안내</h3>
        <ul className="mt-3 space-y-2 text-sm text-primary-800">
          <li>• 프로필 설정을 완료해야 캠페인에 지원할 수 있습니다.</li>
          <li>• 캠페인 선정 후 제품이 발송되며, 기한 내에 콘텐츠를 업로드해야 합니다.</li>
          <li>• 검수 완료 후 원고비가 포인트로 지급됩니다.</li>
          <li>• 문의사항은 고객센터로 연락해주세요.</li>
        </ul>
      </Card>
    </div>
  );
};

export default CampaignApplyPage;
