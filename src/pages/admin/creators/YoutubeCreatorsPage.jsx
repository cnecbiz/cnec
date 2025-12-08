import { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Filter,
  Youtube,
  ExternalLink,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Mail,
  MessageSquare,
} from 'lucide-react';
import {
  Card,
  CardTitle,
  CardContent,
  Button,
  Input,
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
} from '../../../components/common';
import { formatCurrency, formatNumber, formatFollowers, formatDate } from '../../../utils/format';

export const YoutubeCreatorsPage = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [selectedCreator, setSelectedCreator] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    uploadStatus: '',
    subscriberRange: '',
  });

  const [newCreator, setNewCreator] = useState({
    creatorId: '',
    youtubeUrl: '',
    manuscriptFee: '',
  });

  const [registeredCreators, setRegisteredCreators] = useState([]);
  const [creatorSearchQuery, setCreatorSearchQuery] = useState('');

  useEffect(() => {
    fetchCreators();
  }, [currentPage, searchQuery, filters]);

  const fetchCreators = async () => {
    setLoading(true);
    try {
      const mockData = [
        {
          id: 1,
          name: '김유튜버',
          email: 'youtube1@example.com',
          phone: '010-1234-5678',
          youtubeUrl: 'https://youtube.com/@youtuber1',
          channelName: '김유튜버 채널',
          subscribers: 150000,
          totalViews: 5000000,
          manuscriptFee: 500000,
          lastUploadDate: '2024-01-10',
          weeklyUploads: 2,
          uploadStatus: 'good', // good, warning, danger
          stats: {
            views: [12000, 15000, 18000, 14000],
            likes: [800, 1200, 1500, 1100],
            comments: [120, 180, 220, 160],
          },
        },
        {
          id: 2,
          name: '이유튜버',
          email: 'youtube2@example.com',
          phone: '010-2345-6789',
          youtubeUrl: 'https://youtube.com/@youtuber2',
          channelName: '이유튜버 뷰티',
          subscribers: 80000,
          totalViews: 2500000,
          manuscriptFee: 400000,
          lastUploadDate: '2024-01-05',
          weeklyUploads: 0,
          uploadStatus: 'danger',
          stats: {
            views: [8000, 9000, 7000, 6000],
            likes: [400, 500, 350, 300],
            comments: [60, 80, 50, 40],
          },
        },
        {
          id: 3,
          name: '박유튜버',
          email: 'youtube3@example.com',
          phone: '010-3456-7890',
          youtubeUrl: 'https://youtube.com/@youtuber3',
          channelName: '박유튜버 스킨케어',
          subscribers: 300000,
          totalViews: 12000000,
          manuscriptFee: 800000,
          lastUploadDate: '2024-01-08',
          weeklyUploads: 1,
          uploadStatus: 'warning',
          stats: {
            views: [25000, 30000, 28000, 22000],
            likes: [2000, 2500, 2200, 1800],
            comments: [300, 400, 350, 280],
          },
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

  const fetchRegisteredCreators = async (query) => {
    const mockRegistered = [
      { id: 101, name: '최유튜버', email: 'choi.yt@example.com' },
      { id: 102, name: '정유튜버', email: 'jung.yt@example.com' },
    ];
    setRegisteredCreators(
      mockRegistered.filter(c =>
        c.name.includes(query) || c.email.includes(query)
      )
    );
  };

  const handleAddCreator = async () => {
    if (!newCreator.creatorId || !newCreator.youtubeUrl || !newCreator.manuscriptFee) {
      alert('모든 필수 항목을 입력해주세요.');
      return;
    }

    try {
      console.log('Adding YouTube creator:', newCreator);
      setShowAddModal(false);
      setNewCreator({ creatorId: '', youtubeUrl: '', manuscriptFee: '' });
      fetchCreators();
    } catch (error) {
      console.error('Error adding creator:', error);
    }
  };

  const handleCreatorSearch = (query) => {
    setCreatorSearchQuery(query);
    if (query.length >= 2) {
      fetchRegisteredCreators(query);
    } else {
      setRegisteredCreators([]);
    }
  };

  const handleSendNotification = async (creator, type) => {
    // TODO: Implement actual notification sending (email or Kakao)
    alert(`${type === 'email' ? '이메일' : '카카오 알림톡'}을 ${creator.name}님에게 발송합니다.`);
  };

  const getUploadStatusBadge = (status) => {
    switch (status) {
      case 'good':
        return <Badge variant="success" dot>정상</Badge>;
      case 'warning':
        return <Badge variant="warning" dot>주의</Badge>;
      case 'danger':
        return <Badge variant="danger" dot>미업로드</Badge>;
      default:
        return <Badge>알 수 없음</Badge>;
    }
  };

  const showStats = (creator) => {
    setSelectedCreator(creator);
    setShowStatsModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">유튜브 지원 크리에이터</h1>
          <p className="text-gray-500 mt-1">유튜브 지원 크리에이터를 관리하고 업로드 현황을 모니터링합니다</p>
        </div>
        <Button icon={Plus} onClick={() => setShowAddModal(true)}>
          크리에이터 추가
        </Button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">정상 업로드</p>
              <p className="text-2xl font-bold text-green-600">
                {creators.filter(c => c.uploadStatus === 'good').length}명
              </p>
            </div>
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">업로드 주의</p>
              <p className="text-2xl font-bold text-yellow-600">
                {creators.filter(c => c.uploadStatus === 'warning').length}명
              </p>
            </div>
            <AlertTriangle className="h-10 w-10 text-yellow-500" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">미업로드 (알림 필요)</p>
              <p className="text-2xl font-bold text-red-600">
                {creators.filter(c => c.uploadStatus === 'danger').length}명
              </p>
            </div>
            <AlertTriangle className="h-10 w-10 text-red-500" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-wrap gap-4">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
            placeholder="이름, 이메일, 채널명으로 검색..."
            className="w-64"
          />
          <Select
            value={filters.uploadStatus}
            onChange={(e) => setFilters({ ...filters, uploadStatus: e.target.value })}
            options={[
              { value: 'good', label: '정상' },
              { value: 'warning', label: '주의' },
              { value: 'danger', label: '미업로드' },
            ]}
            placeholder="업로드 상태"
            className="w-40"
          />
          <Select
            value={filters.subscriberRange}
            onChange={(e) => setFilters({ ...filters, subscriberRange: e.target.value })}
            options={[
              { value: '0-50000', label: '5만 이하' },
              { value: '50000-100000', label: '5만-10만' },
              { value: '100000-500000', label: '10만-50만' },
              { value: '500000+', label: '50만 이상' },
            ]}
            placeholder="구독자 수"
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
              <TableHeader>채널</TableHeader>
              <TableHeader align="right">구독자</TableHeader>
              <TableHeader align="right">원고비</TableHeader>
              <TableHeader>최근 업로드</TableHeader>
              <TableHeader align="center">주간 업로드</TableHeader>
              <TableHeader align="center">상태</TableHeader>
              <TableHeader align="center">관리</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  로딩중...
                </TableCell>
              </TableRow>
            ) : creators.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                  등록된 크리에이터가 없습니다
                </TableCell>
              </TableRow>
            ) : (
              creators.map((creator) => (
                <TableRow key={creator.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-full bg-red-100 flex items-center justify-center">
                        <Youtube className="h-5 w-5 text-red-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{creator.name}</p>
                        <p className="text-sm text-gray-500">{creator.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <a
                      href={creator.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center text-primary-600 hover:text-primary-700"
                    >
                      {creator.channelName}
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </a>
                  </TableCell>
                  <TableCell align="right">{formatFollowers(creator.subscribers)}</TableCell>
                  <TableCell align="right">{formatCurrency(creator.manuscriptFee)}</TableCell>
                  <TableCell>{formatDate(creator.lastUploadDate)}</TableCell>
                  <TableCell align="center">{creator.weeklyUploads}회</TableCell>
                  <TableCell align="center">
                    {getUploadStatusBadge(creator.uploadStatus)}
                  </TableCell>
                  <TableCell align="center">
                    <div className="flex items-center justify-center space-x-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => showStats(creator)}
                        title="통계 보기"
                      >
                        <BarChart3 className="h-4 w-4" />
                      </Button>
                      {creator.uploadStatus === 'danger' && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSendNotification(creator, 'email')}
                            title="이메일 발송"
                          >
                            <Mail className="h-4 w-4 text-blue-500" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleSendNotification(creator, 'kakao')}
                            title="카카오 알림톡 발송"
                          >
                            <MessageSquare className="h-4 w-4 text-yellow-500" />
                          </Button>
                        </>
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

      {/* Add Creator Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="유튜브 지원 크리에이터 추가"
        size="md"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              크리에이터 검색 <span className="text-red-500">*</span>
            </label>
            <SearchInput
              value={creatorSearchQuery}
              onChange={handleCreatorSearch}
              onClear={() => {
                setCreatorSearchQuery('');
                setRegisteredCreators([]);
              }}
              placeholder="이름 또는 이메일로 검색..."
              className="w-full"
            />
            {registeredCreators.length > 0 && (
              <div className="mt-2 border rounded-lg max-h-40 overflow-y-auto">
                {registeredCreators.map((creator) => (
                  <button
                    key={creator.id}
                    onClick={() => {
                      setNewCreator({ ...newCreator, creatorId: creator.id });
                      setCreatorSearchQuery(creator.name);
                      setRegisteredCreators([]);
                    }}
                    className="w-full px-3 py-2 text-left hover:bg-gray-50 flex items-center justify-between"
                  >
                    <span>{creator.name}</span>
                    <span className="text-sm text-gray-500">{creator.email}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <Input
            label="유튜브 채널 URL"
            value={newCreator.youtubeUrl}
            onChange={(e) => setNewCreator({ ...newCreator, youtubeUrl: e.target.value })}
            placeholder="https://youtube.com/@channel"
            required
          />

          <Input
            label="원고비"
            type="number"
            value={newCreator.manuscriptFee}
            onChange={(e) => setNewCreator({ ...newCreator, manuscriptFee: e.target.value })}
            placeholder="원고비를 입력하세요"
            required
          />

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              취소
            </Button>
            <Button onClick={handleAddCreator}>
              추가
            </Button>
          </div>
        </div>
      </Modal>

      {/* Stats Modal */}
      <Modal
        isOpen={showStatsModal}
        onClose={() => setShowStatsModal(false)}
        title={selectedCreator ? `${selectedCreator.channelName} 통계` : '채널 통계'}
        size="lg"
      >
        {selectedCreator && (
          <div className="space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <p className="text-sm text-gray-500">구독자</p>
                <p className="text-xl font-bold">{formatFollowers(selectedCreator.subscribers)}</p>
              </Card>
              <Card>
                <p className="text-sm text-gray-500">총 조회수</p>
                <p className="text-xl font-bold">{formatNumber(selectedCreator.totalViews)}</p>
              </Card>
              <Card>
                <p className="text-sm text-gray-500">주간 업로드</p>
                <p className="text-xl font-bold">{selectedCreator.weeklyUploads}회</p>
              </Card>
            </div>

            <div>
              <h4 className="font-medium mb-4">최근 4주 성과</h4>
              <Table>
                <TableHead>
                  <TableRow hoverable={false}>
                    <TableHeader>주차</TableHeader>
                    <TableHeader align="right">조회수</TableHeader>
                    <TableHeader align="right">좋아요</TableHeader>
                    <TableHeader align="right">댓글</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedCreator.stats.views.map((_, index) => (
                    <TableRow key={index}>
                      <TableCell>{index + 1}주차</TableCell>
                      <TableCell align="right">{formatNumber(selectedCreator.stats.views[index])}</TableCell>
                      <TableCell align="right">{formatNumber(selectedCreator.stats.likes[index])}</TableCell>
                      <TableCell align="right">{formatNumber(selectedCreator.stats.comments[index])}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default YoutubeCreatorsPage;
