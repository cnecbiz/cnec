import { useState, useEffect } from 'react';
import {
  Instagram,
  Youtube,
  Music2,
  ExternalLink,
  Heart,
  Download,
  Copy,
  CheckCircle,
  Star,
  MessageSquare,
} from 'lucide-react';
import {
  Card,
  Button,
  Select,
  Modal,
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
import { formatNumber, formatFollowers, formatDate } from '../../utils/format';

const SNSIcon = ({ type }) => {
  const icons = {
    instagram: <Instagram className="h-4 w-4 text-pink-500" />,
    youtube: <Youtube className="h-4 w-4 text-red-500" />,
    tiktok: <Music2 className="h-4 w-4 text-black" />,
  };
  return icons[type] || null;
};

export const CreatorStatusPage = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    campaignId: '',
    status: '',
  });

  const [campaigns, setCampaigns] = useState([]);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    fetchCampaigns();
    fetchCreators();
  }, [currentPage, searchQuery, filters]);

  const fetchCampaigns = async () => {
    // Mock campaigns
    setCampaigns([
      { id: 1, name: '신제품 런칭 캠페인' },
      { id: 2, name: '4주 챌린지 캠페인' },
      { id: 3, name: '프리미엄 캠페인' },
    ]);
  };

  const fetchCreators = async () => {
    setLoading(true);
    try {
      const mockData = [
        {
          id: 1,
          name: '김크리에이터',
          profileImage: null,
          instagram: 'https://instagram.com/creator1',
          youtube: 'https://youtube.com/@creator1',
          tiktok: 'https://tiktok.com/@creator1',
          followers: { instagram: 50000, youtube: 30000, tiktok: 80000 },
          campaignId: 1,
          campaignName: '신제품 런칭 캠페인',
          status: 'completed',
          progressCount: 3,
          isFavorite: true,
          rating: 5,
          hasOriginalFile: true,
          hasCleanFile: true,
          partnershipCode: 'ABC123',
        },
        {
          id: 2,
          name: '이크리에이터',
          profileImage: null,
          instagram: 'https://instagram.com/creator2',
          youtube: null,
          tiktok: 'https://tiktok.com/@creator2',
          followers: { instagram: 120000, youtube: 0, tiktok: 200000 },
          campaignId: 1,
          campaignName: '신제품 런칭 캠페인',
          status: 'in_progress',
          progressCount: 5,
          isFavorite: false,
          rating: null,
          hasOriginalFile: false,
          hasCleanFile: false,
          partnershipCode: null,
        },
        {
          id: 3,
          name: '박크리에이터',
          profileImage: null,
          instagram: 'https://instagram.com/creator3',
          youtube: 'https://youtube.com/@creator3',
          tiktok: null,
          followers: { instagram: 80000, youtube: 150000, tiktok: 0 },
          campaignId: 2,
          campaignName: '4주 챌린지 캠페인',
          status: 'pending',
          progressCount: 1,
          isFavorite: true,
          rating: 4,
          hasOriginalFile: true,
          hasCleanFile: false,
          partnershipCode: 'XYZ789',
        },
      ];

      setCreators(mockData);
      setTotalPages(1);
    } catch (error) {
      console.error('Error fetching creators:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFavorite = async (creatorId) => {
    setCreators((prev) =>
      prev.map((c) =>
        c.id === creatorId ? { ...c, isFavorite: !c.isFavorite } : c
      )
    );
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    alert('파트너십 코드가 복사되었습니다.');
  };

  const handleMarkComplete = async (creatorId) => {
    if (!confirm('검수 완료 처리하시겠습니까?')) return;
    // TODO: Update in Supabase
    alert('검수 완료 처리되었습니다.');
  };

  const handleRating = (creator) => {
    setSelectedCreator(creator);
    setRating(creator.rating || 0);
    setShowRatingModal(true);
  };

  const handleSubmitRating = async () => {
    // TODO: Save rating to Supabase
    setCreators((prev) =>
      prev.map((c) =>
        c.id === selectedCreator.id ? { ...c, rating } : c
      )
    );
    setShowRatingModal(false);
    setSelectedCreator(null);
    alert('평점이 등록되었습니다.');
  };

  const handleRequestCampaign = async (creatorId) => {
    // TODO: Send campaign request
    alert('캠페인 진행 요청이 발송되었습니다.');
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge variant="warning">대기</Badge>;
      case 'in_progress':
        return <Badge variant="info">진행중</Badge>;
      case 'completed':
        return <Badge variant="success">완료</Badge>;
      default:
        return <Badge>-</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">크리에이터 현황</h1>
        <p className="text-gray-500 mt-1">캠페인에 참여한 크리에이터를 관리합니다</p>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-wrap gap-4">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
            placeholder="크리에이터명으로 검색..."
            className="w-64"
          />
          <Select
            value={filters.campaignId}
            onChange={(e) => setFilters({ ...filters, campaignId: e.target.value })}
            options={campaigns.map((c) => ({ value: c.id.toString(), label: c.name }))}
            placeholder="캠페인 선택"
            className="w-56"
          />
          <Select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            options={[
              { value: 'pending', label: '대기' },
              { value: 'in_progress', label: '진행중' },
              { value: 'completed', label: '완료' },
            ]}
            placeholder="상태"
            className="w-40"
          />
        </div>
      </Card>

      {/* Table */}
      <Card padding={false}>
        <Table>
          <TableHead>
            <TableRow hoverable={false}>
              <TableHeader>크리에이터</TableHeader>
              <TableHeader>SNS</TableHeader>
              <TableHeader>캠페인</TableHeader>
              <TableHeader align="center">진행</TableHeader>
              <TableHeader align="center">상태</TableHeader>
              <TableHeader align="center">파일</TableHeader>
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
            ) : creators.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  참여한 크리에이터가 없습니다
                </TableCell>
              </TableRow>
            ) : (
              creators.map((creator) => (
                <TableRow key={creator.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">
                          {creator.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-gray-900">{creator.name}</p>
                          {creator.rating && (
                            <div className="flex items-center text-yellow-500">
                              <Star className="h-4 w-4 fill-current" />
                              <span className="text-xs ml-0.5">{creator.rating}</span>
                            </div>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">진행 {creator.progressCount}회</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {creator.instagram && (
                        <a href={creator.instagram} target="_blank" rel="noopener noreferrer">
                          <SNSIcon type="instagram" />
                        </a>
                      )}
                      {creator.youtube && (
                        <a href={creator.youtube} target="_blank" rel="noopener noreferrer">
                          <SNSIcon type="youtube" />
                        </a>
                      )}
                      {creator.tiktok && (
                        <a href={creator.tiktok} target="_blank" rel="noopener noreferrer">
                          <SNSIcon type="tiktok" />
                        </a>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{creator.campaignName}</p>
                  </TableCell>
                  <TableCell align="center">
                    {creator.progressCount}회
                  </TableCell>
                  <TableCell align="center">
                    {getStatusBadge(creator.status)}
                  </TableCell>
                  <TableCell align="center">
                    <div className="flex items-center justify-center space-x-1">
                      {creator.hasOriginalFile && (
                        <Button variant="ghost" size="sm" title="원본 다운로드">
                          <Download className="h-4 w-4 text-blue-500" />
                        </Button>
                      )}
                      {creator.hasCleanFile && (
                        <Button variant="ghost" size="sm" title="클린본 다운로드">
                          <Download className="h-4 w-4 text-green-500" />
                        </Button>
                      )}
                      {creator.partnershipCode && (
                        <Button
                          variant="ghost"
                          size="sm"
                          title="파트너십 코드 복사"
                          onClick={() => handleCopyCode(creator.partnershipCode)}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <div className="flex items-center justify-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleToggleFavorite(creator.id)}
                        title="찜하기"
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            creator.isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'
                          }`}
                        />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRating(creator)}
                        title="평점 등록"
                      >
                        <Star className="h-4 w-4 text-yellow-500" />
                      </Button>
                      {creator.status === 'in_progress' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleMarkComplete(creator.id)}
                          title="검수 완료"
                        >
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRequestCampaign(creator.id)}
                        title="캠페인 요청"
                      >
                        <MessageSquare className="h-4 w-4 text-primary-500" />
                      </Button>
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

      {/* Rating Modal */}
      <Modal
        isOpen={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        title="평점 등록"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-gray-600">
            {selectedCreator?.name}님의 평점을 등록해주세요.
          </p>
          <div className="flex justify-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="p-1"
              >
                <Star
                  className={`h-8 w-8 ${
                    star <= rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={() => setShowRatingModal(false)}>
              취소
            </Button>
            <Button onClick={handleSubmitRating}>
              등록
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CreatorStatusPage;
