import { useState, useEffect } from 'react';
import { Plus, Search, Filter, Instagram, Youtube, Music2, ExternalLink } from 'lucide-react';
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
import { formatCurrency, formatNumber, formatFollowers } from '../../../utils/format';
import { supabase } from '../../../lib/supabase';

const SNSIcon = ({ type }) => {
  const icons = {
    instagram: <Instagram className="h-4 w-4 text-pink-500" />,
    youtube: <Youtube className="h-4 w-4 text-red-500" />,
    tiktok: <Music2 className="h-4 w-4 text-black" />,
  };
  return icons[type] || null;
};

export const RecommendedCreatorsPage = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    snsType: '',
    followerRange: '',
  });

  // Form state for adding creator
  const [newCreator, setNewCreator] = useState({
    creatorId: '',
    manuscriptFee: '',
  });

  // All registered creators for selection
  const [registeredCreators, setRegisteredCreators] = useState([]);
  const [creatorSearchQuery, setCreatorSearchQuery] = useState('');

  useEffect(() => {
    fetchCreators();
  }, [currentPage, searchQuery, filters]);

  const fetchCreators = async () => {
    setLoading(true);
    try {
      // TODO: Replace with actual Supabase query
      // For now, using mock data
      const mockData = [
        {
          id: 1,
          name: '김뷰티',
          email: 'beauty@example.com',
          instagram: 'https://instagram.com/beauty',
          youtube: 'https://youtube.com/@beauty',
          tiktok: 'https://tiktok.com/@beauty',
          followers: { instagram: 50000, youtube: 30000, tiktok: 80000 },
          manuscriptFee: 400000,
          totalCampaigns: 12,
          status: 'active',
        },
        {
          id: 2,
          name: '이스킨',
          email: 'skin@example.com',
          instagram: 'https://instagram.com/skin',
          youtube: null,
          tiktok: 'https://tiktok.com/@skin',
          followers: { instagram: 120000, youtube: 0, tiktok: 200000 },
          manuscriptFee: 600000,
          totalCampaigns: 8,
          status: 'active',
        },
        {
          id: 3,
          name: '박메이크',
          email: 'makeup@example.com',
          instagram: 'https://instagram.com/makeup',
          youtube: 'https://youtube.com/@makeup',
          tiktok: null,
          followers: { instagram: 80000, youtube: 150000, tiktok: 0 },
          manuscriptFee: 500000,
          totalCampaigns: 15,
          status: 'inactive',
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
    // TODO: Fetch from Supabase with search query
    // This would filter creators not already in recommended list
    const mockRegistered = [
      { id: 101, name: '최뷰티', email: 'choi@example.com' },
      { id: 102, name: '정스킨', email: 'jung@example.com' },
      { id: 103, name: '강메이크', email: 'kang@example.com' },
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
      // TODO: Add to Supabase
      console.log('Adding recommended creator:', newCreator);
      setShowAddModal(false);
      setNewCreator({ creatorId: '', manuscriptFee: '' });
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

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">추천 크리에이터</h1>
          <p className="text-gray-500 mt-1">추천 크리에이터를 관리합니다</p>
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
            value={filters.followerRange}
            onChange={(e) => setFilters({ ...filters, followerRange: e.target.value })}
            options={[
              { value: '0-10000', label: '1만 이하' },
              { value: '10000-50000', label: '1만-5만' },
              { value: '50000-100000', label: '5만-10만' },
              { value: '100000+', label: '10만 이상' },
            ]}
            placeholder="팔로워 수"
            className="w-40"
          />
          <Button variant="outline" icon={Filter} onClick={() => setShowFilterModal(true)}>
            상세 필터
          </Button>
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
              <TableHeader align="center">진행 캠페인</TableHeader>
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
            ) : creators.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
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
                    <div className="text-sm">
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
                  <TableCell align="center">{creator.totalCampaigns}회</TableCell>
                  <TableCell align="center">
                    <Badge variant={creator.status === 'active' ? 'success' : 'default'}>
                      {creator.status === 'active' ? '활동중' : '비활동'}
                    </Badge>
                  </TableCell>
                  <TableCell align="center">
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
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
        title="추천 크리에이터 추가"
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

          <Select
            label="원고비"
            value={newCreator.manuscriptFee}
            onChange={(e) => setNewCreator({ ...newCreator, manuscriptFee: e.target.value })}
            options={[
              { value: '300000', label: '30만원' },
              { value: '400000', label: '40만원' },
              { value: '500000', label: '50만원' },
              { value: '600000', label: '60만원' },
            ]}
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
    </div>
  );
};

export default RecommendedCreatorsPage;
