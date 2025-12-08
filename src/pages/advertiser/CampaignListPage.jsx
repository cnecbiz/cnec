import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Plus,
  Search,
  Filter,
  Eye,
  Edit,
  MoreVertical,
} from 'lucide-react';
import {
  Card,
  Button,
  Select,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
  Badge,
  SearchInput,
  Pagination,
} from '../../components/common';
import { formatCurrency, formatDate } from '../../utils/format';

export const CampaignListPage = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    status: '',
    category: '',
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
          name: '신제품 런칭 캠페인',
          category: 'planned_shortform',
          status: 'in_progress',
          targetCount: 10,
          appliedCount: 15,
          selectedCount: 10,
          manuscriptFee: 400000,
          totalBudget: 4000000,
          recruitmentDeadline: '2024-01-20',
          uploadDeadline: '2024-02-15',
          createdAt: '2024-01-01',
        },
        {
          id: 2,
          name: '4주 챌린지 비포애프터',
          category: 'four_week_challenge',
          status: 'recruiting',
          targetCount: 5,
          appliedCount: 8,
          selectedCount: 0,
          manuscriptFee: 800000,
          totalBudget: 4000000,
          recruitmentDeadline: '2024-01-31',
          uploadDeadline: '2024-03-15',
          createdAt: '2024-01-10',
        },
        {
          id: 3,
          name: '메가 인플루언서 콜라보',
          category: 'premium',
          status: 'completed',
          targetCount: 1,
          appliedCount: 1,
          selectedCount: 1,
          manuscriptFee: 5000000,
          totalBudget: 5000000,
          recruitmentDeadline: '2023-12-15',
          uploadDeadline: '2024-01-10',
          createdAt: '2023-12-01',
        },
        {
          id: 4,
          name: '기초 스킨케어 리뷰',
          category: 'planned_shortform',
          status: 'draft',
          targetCount: 8,
          appliedCount: 0,
          selectedCount: 0,
          manuscriptFee: 300000,
          totalBudget: 2400000,
          recruitmentDeadline: null,
          uploadDeadline: null,
          createdAt: '2024-01-12',
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

  const getStatusBadge = (status) => {
    switch (status) {
      case 'draft':
        return <Badge variant="default">임시저장</Badge>;
      case 'recruiting':
        return <Badge variant="info">모집중</Badge>;
      case 'selecting':
        return <Badge variant="warning">선정중</Badge>;
      case 'in_progress':
        return <Badge variant="primary">진행중</Badge>;
      case 'completed':
        return <Badge variant="success">완료</Badge>;
      default:
        return <Badge>-</Badge>;
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">캠페인 관리</h1>
          <p className="text-gray-500 mt-1">등록한 캠페인을 관리합니다</p>
        </div>
        <Link to="/advertiser/campaigns/create">
          <Button icon={Plus}>
            캠페인 등록
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-wrap gap-4">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
            placeholder="캠페인명으로 검색..."
            className="w-64"
          />
          <Select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            options={[
              { value: 'draft', label: '임시저장' },
              { value: 'recruiting', label: '모집중' },
              { value: 'selecting', label: '선정중' },
              { value: 'in_progress', label: '진행중' },
              { value: 'completed', label: '완료' },
            ]}
            placeholder="상태"
            className="w-40"
          />
          <Select
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            options={[
              { value: 'planned_shortform', label: '기획 숏폼' },
              { value: 'four_week_challenge', label: '4주 챌린지' },
              { value: 'premium', label: '프리미엄' },
            ]}
            placeholder="카테고리"
            className="w-40"
          />
        </div>
      </Card>

      {/* Table */}
      <Card padding={false}>
        <Table>
          <TableHead>
            <TableRow hoverable={false}>
              <TableHeader>캠페인명</TableHeader>
              <TableHeader>카테고리</TableHeader>
              <TableHeader align="center">지원/선정</TableHeader>
              <TableHeader align="right">원고비</TableHeader>
              <TableHeader>모집마감</TableHeader>
              <TableHeader align="center">상태</TableHeader>
              <TableHeader align="center">관리</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  로딩중...
                </TableCell>
              </TableRow>
            ) : campaigns.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  등록된 캠페인이 없습니다
                </TableCell>
              </TableRow>
            ) : (
              campaigns.map((campaign) => (
                <TableRow key={campaign.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900">{campaign.name}</p>
                      <p className="text-sm text-gray-500">
                        등록일: {formatDate(campaign.createdAt)}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="default">{getCategoryLabel(campaign.category)}</Badge>
                  </TableCell>
                  <TableCell align="center">
                    <span className="text-primary-600 font-medium">{campaign.appliedCount}</span>
                    <span className="text-gray-400 mx-1">/</span>
                    <span className="text-gray-600">{campaign.selectedCount}</span>
                    <span className="text-gray-400 text-xs ml-1">({campaign.targetCount}명)</span>
                  </TableCell>
                  <TableCell align="right">{formatCurrency(campaign.manuscriptFee)}</TableCell>
                  <TableCell>
                    {campaign.recruitmentDeadline
                      ? formatDate(campaign.recruitmentDeadline)
                      : '-'}
                  </TableCell>
                  <TableCell align="center">
                    {getStatusBadge(campaign.status)}
                  </TableCell>
                  <TableCell align="center">
                    <div className="flex items-center justify-center space-x-1">
                      <Link to={`/advertiser/campaigns/${campaign.id}`}>
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      {campaign.status === 'draft' && (
                        <Link to={`/advertiser/campaigns/${campaign.id}/edit`}>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* Pagination */}
      <div className="flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default CampaignListPage;
