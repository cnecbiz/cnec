import { useState, useEffect } from 'react';
import { Plus, Search, Filter, Instagram, Youtube, Music2, ExternalLink, Edit, Trash2 } from 'lucide-react';
import {
  Card,
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

const SNSIcon = ({ type }) => {
  const icons = {
    instagram: <Instagram className="h-4 w-4 text-pink-500" />,
    youtube: <Youtube className="h-4 w-4 text-red-500" />,
    tiktok: <Music2 className="h-4 w-4 text-black" />,
  };
  return icons[type] || null;
};

export const AffiliatedCreatorsPage = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    snsType: '',
    status: '',
  });

  const [newCreator, setNewCreator] = useState({
    creatorId: '',
    manuscriptFee: '',
    contractStartDate: '',
    contractEndDate: '',
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
          name: '김소속',
          email: 'affiliated1@example.com',
          instagram: 'https://instagram.com/affiliated1',
          youtube: 'https://youtube.com/@affiliated1',
          tiktok: 'https://tiktok.com/@affiliated1',
          followers: { instagram: 150000, youtube: 80000, tiktok: 200000 },
          manuscriptFee: 800000,
          contractStartDate: '2024-01-01',
          contractEndDate: '2024-12-31',
          totalCampaigns: 25,
          status: 'active',
        },
        {
          id: 2,
          name: '이소속',
          email: 'affiliated2@example.com',
          instagram: 'https://instagram.com/affiliated2',
          youtube: null,
          tiktok: 'https://tiktok.com/@affiliated2',
          followers: { instagram: 300000, youtube: 0, tiktok: 450000 },
          manuscriptFee: 1200000,
          contractStartDate: '2024-03-01',
          contractEndDate: '2025-02-28',
          totalCampaigns: 18,
          status: 'active',
        },
        {
          id: 3,
          name: '박소속',
          email: 'affiliated3@example.com',
          instagram: 'https://instagram.com/affiliated3',
          youtube: 'https://youtube.com/@affiliated3',
          tiktok: null,
          followers: { instagram: 80000, youtube: 250000, tiktok: 0 },
          manuscriptFee: 600000,
          contractStartDate: '2023-06-01',
          contractEndDate: '2024-05-31',
          totalCampaigns: 32,
          status: 'expired',
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
      { id: 101, name: '최소속', email: 'choi.aff@example.com' },
      { id: 102, name: '정소속', email: 'jung.aff@example.com' },
      { id: 103, name: '강소속', email: 'kang.aff@example.com' },
    ];
    setRegisteredCreators(
      mockRegistered.filter(c =>
        c.name.includes(query) || c.email.includes(query)
      )
    );
  };

  const handleAddCreator = async () => {
    if (!newCreator.creatorId || !newCreator.manuscriptFee) {
      alert('크리에이터와 원고비를 선택해주세요.');
      return;
    }

    try {
      console.log('Adding affiliated creator:', newCreator);
      setShowAddModal(false);
      setNewCreator({ creatorId: '', manuscriptFee: '', contractStartDate: '', contractEndDate: '' });
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

  const getStatusBadge = (status, endDate) => {
    const isExpired = new Date(endDate) < new Date();
    if (isExpired || status === 'expired') {
      return <Badge variant="danger">계약만료</Badge>;
    }
    return <Badge variant="success">활동중</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">소속 크리에이터</h1>
          <p className="text-gray-500 mt-1">소속 크리에이터를 관리합니다</p>
        </div>
        <Button icon={Plus} onClick={() => setShowAddModal(true)}>
          크리에이터 추가
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-wrap gap-4">
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            onClear={() => setSearchQuery('')}
            placeholder="이름, 이메일로 검색..."
            className="w-64"
          />
          <Select
            value={filters.snsType}
            onChange={(e) => setFilters({ ...filters, snsType: e.target.value })}
            options={[
              { value: 'instagram', label: '인스타그램' },
              { value: 'youtube', label: '유튜브' },
              { value: 'tiktok', label: '틱톡' },
            ]}
            placeholder="SNS 유형"
            className="w-40"
          />
          <Select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            options={[
              { value: 'active', label: '활동중' },
              { value: 'expired', label: '계약만료' },
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
              <TableHeader align="right">팔로워</TableHeader>
              <TableHeader align="right">원고비</TableHeader>
              <TableHeader>계약 기간</TableHeader>
              <TableHeader align="center">진행 캠페인</TableHeader>
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
                      <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-sm font-medium text-gray-600">
                          {creator.name.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{creator.name}</p>
                        <p className="text-sm text-gray-500">{creator.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {creator.instagram && (
                        <a href={creator.instagram} target="_blank" rel="noopener noreferrer" className="hover:opacity-70">
                          <SNSIcon type="instagram" />
                        </a>
                      )}
                      {creator.youtube && (
                        <a href={creator.youtube} target="_blank" rel="noopener noreferrer" className="hover:opacity-70">
                          <SNSIcon type="youtube" />
                        </a>
                      )}
                      {creator.tiktok && (
                        <a href={creator.tiktok} target="_blank" rel="noopener noreferrer" className="hover:opacity-70">
                          <SNSIcon type="tiktok" />
                        </a>
                      )}
                    </div>
                  </TableCell>
                  <TableCell align="right">
                    <div className="text-sm space-y-1">
                      {creator.followers.instagram > 0 && (
                        <div className="flex items-center justify-end space-x-1">
                          <SNSIcon type="instagram" />
                          <span>{formatFollowers(creator.followers.instagram)}</span>
                        </div>
                      )}
                      {creator.followers.youtube > 0 && (
                        <div className="flex items-center justify-end space-x-1">
                          <SNSIcon type="youtube" />
                          <span>{formatFollowers(creator.followers.youtube)}</span>
                        </div>
                      )}
                      {creator.followers.tiktok > 0 && (
                        <div className="flex items-center justify-end space-x-1">
                          <SNSIcon type="tiktok" />
                          <span>{formatFollowers(creator.followers.tiktok)}</span>
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell align="right">{formatCurrency(creator.manuscriptFee)}</TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{formatDate(creator.contractStartDate)}</p>
                      <p className="text-gray-500">~ {formatDate(creator.contractEndDate)}</p>
                    </div>
                  </TableCell>
                  <TableCell align="center">{creator.totalCampaigns}회</TableCell>
                  <TableCell align="center">
                    {getStatusBadge(creator.status, creator.contractEndDate)}
                  </TableCell>
                  <TableCell align="center">
                    <div className="flex items-center justify-center space-x-1">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4 text-red-500" />
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

      {/* Add Creator Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="소속 크리에이터 추가"
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
            label="원고비"
            type="number"
            value={newCreator.manuscriptFee}
            onChange={(e) => setNewCreator({ ...newCreator, manuscriptFee: e.target.value })}
            placeholder="원고비를 입력하세요"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="계약 시작일"
              type="date"
              value={newCreator.contractStartDate}
              onChange={(e) => setNewCreator({ ...newCreator, contractStartDate: e.target.value })}
              required
            />
            <Input
              label="계약 종료일"
              type="date"
              value={newCreator.contractEndDate}
              onChange={(e) => setNewCreator({ ...newCreator, contractEndDate: e.target.value })}
              required
            />
          </div>

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
    </div>
  );
};

export default AffiliatedCreatorsPage;
