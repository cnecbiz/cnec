import { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Filter,
  Instagram,
  Youtube,
  Music2,
  ExternalLink,
  Download,
  Upload,
  Wallet,
  TrendingUp,
} from 'lucide-react';
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
import * as XLSX from 'xlsx';

const SNSIcon = ({ type }) => {
  const icons = {
    instagram: <Instagram className="h-4 w-4 text-pink-500" />,
    youtube: <Youtube className="h-4 w-4 text-red-500" />,
    tiktok: <Music2 className="h-4 w-4 text-black" />,
  };
  return icons[type] || null;
};

export const AllCreatorsPage = () => {
  const [creators, setCreators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    snsType: '',
    status: '',
    followerRange: '',
  });

  const [uploadFile, setUploadFile] = useState(null);
  const [uploadPreview, setUploadPreview] = useState([]);

  useEffect(() => {
    fetchCreators();
  }, [currentPage, searchQuery, filters]);

  const fetchCreators = async () => {
    setLoading(true);
    try {
      const mockData = [
        {
          id: 1,
          name: '김전체',
          email: 'all1@example.com',
          instagram: 'https://instagram.com/all1',
          youtube: 'https://youtube.com/@all1',
          tiktok: 'https://tiktok.com/@all1',
          followers: { instagram: 50000, youtube: 30000, tiktok: 80000 },
          campaignProgress: { ongoing: 2, completed: 8 },
          pointBalance: 250000,
          totalEarnings: 4500000,
          status: 'active',
          joinDate: '2023-06-15',
        },
        {
          id: 2,
          name: '이전체',
          email: 'all2@example.com',
          instagram: 'https://instagram.com/all2',
          youtube: null,
          tiktok: 'https://tiktok.com/@all2',
          followers: { instagram: 120000, youtube: 0, tiktok: 200000 },
          campaignProgress: { ongoing: 1, completed: 15 },
          pointBalance: 800000,
          totalEarnings: 12000000,
          status: 'active',
          joinDate: '2023-01-20',
        },
        {
          id: 3,
          name: '박전체',
          email: 'all3@example.com',
          instagram: 'https://instagram.com/all3',
          youtube: 'https://youtube.com/@all3',
          tiktok: null,
          followers: { instagram: 80000, youtube: 150000, tiktok: 0 },
          campaignProgress: { ongoing: 0, completed: 5 },
          pointBalance: 0,
          totalEarnings: 2500000,
          status: 'inactive',
          joinDate: '2023-09-01',
        },
        {
          id: 4,
          name: '최전체',
          email: 'all4@example.com',
          instagram: 'https://instagram.com/all4',
          youtube: 'https://youtube.com/@all4',
          tiktok: 'https://tiktok.com/@all4',
          followers: { instagram: 300000, youtube: 250000, tiktok: 400000 },
          campaignProgress: { ongoing: 3, completed: 25 },
          pointBalance: 1500000,
          totalEarnings: 30000000,
          status: 'active',
          joinDate: '2022-11-10',
        },
      ];

      setCreators(mockData);
      setTotalPages(2);
    } catch (error) {
      console.error('Error fetching creators:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportExcel = () => {
    const exportData = creators.map((creator) => ({
      이름: creator.name,
      이메일: creator.email,
      인스타그램: creator.instagram || '-',
      유튜브: creator.youtube || '-',
      틱톡: creator.tiktok || '-',
      '인스타 팔로워': creator.followers.instagram,
      '유튜브 구독자': creator.followers.youtube,
      '틱톡 팔로워': creator.followers.tiktok,
      '진행중 캠페인': creator.campaignProgress.ongoing,
      '완료 캠페인': creator.campaignProgress.completed,
      '포인트 잔액': creator.pointBalance,
      '총 진행 금액': creator.totalEarnings,
      상태: creator.status === 'active' ? '활동중' : '비활동',
      가입일: creator.joinDate,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, '크리에이터');
    XLSX.writeFile(wb, `크리에이터_목록_${formatDate(new Date(), 'yyyyMMdd')}.xlsx`);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploadFile(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setUploadPreview(jsonData.slice(0, 5)); // Preview first 5 rows
    };
    reader.readAsArrayBuffer(file);
  };

  const handleBulkUpload = async () => {
    if (!uploadFile) {
      alert('파일을 선택해주세요.');
      return;
    }

    try {
      // TODO: Upload to Supabase
      console.log('Uploading creators:', uploadPreview);
      alert('업로드가 완료되었습니다.');
      setShowUploadModal(false);
      setUploadFile(null);
      setUploadPreview([]);
      fetchCreators();
    } catch (error) {
      console.error('Error uploading:', error);
      alert('업로드 중 오류가 발생했습니다.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">전체 크리에이터</h1>
          <p className="text-gray-500 mt-1">전체 가입 크리에이터를 관리합니다</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" icon={Download} onClick={handleExportExcel}>
            엑셀 다운로드
          </Button>
          <Button icon={Upload} onClick={() => setShowUploadModal(true)}>
            엑셀 업로드
          </Button>
        </div>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">전체 크리에이터</p>
              <p className="text-2xl font-bold text-gray-900">{creators.length}명</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">활동중</p>
              <p className="text-2xl font-bold text-green-600">
                {creators.filter(c => c.status === 'active').length}명
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">총 포인트 잔액</p>
              <p className="text-2xl font-bold text-primary-600">
                {formatCurrency(creators.reduce((sum, c) => sum + c.pointBalance, 0))}
              </p>
            </div>
            <Wallet className="h-8 w-8 text-primary-500" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">총 진행 금액</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(creators.reduce((sum, c) => sum + c.totalEarnings, 0))}
              </p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
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
              { value: 'inactive', label: '비활동' },
            ]}
            placeholder="상태"
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
        </div>
      </Card>

      {/* Table */}
      <Card padding={false}>
        <Table>
          <TableHead>
            <TableRow hoverable={false}>
              <TableHeader>크리에이터</TableHeader>
              <TableHeader>SNS</TableHeader>
              <TableHeader align="center">캠페인 진행</TableHeader>
              <TableHeader align="right">포인트 잔액</TableHeader>
              <TableHeader align="right">총 진행 금액</TableHeader>
              <TableHeader align="center">상태</TableHeader>
              <TableHeader>가입일</TableHeader>
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
                        <a
                          href={creator.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:opacity-70"
                          title={`팔로워: ${formatFollowers(creator.followers.instagram)}`}
                        >
                          <SNSIcon type="instagram" />
                        </a>
                      )}
                      {creator.youtube && (
                        <a
                          href={creator.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:opacity-70"
                          title={`구독자: ${formatFollowers(creator.followers.youtube)}`}
                        >
                          <SNSIcon type="youtube" />
                        </a>
                      )}
                      {creator.tiktok && (
                        <a
                          href={creator.tiktok}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:opacity-70"
                          title={`팔로워: ${formatFollowers(creator.followers.tiktok)}`}
                        >
                          <SNSIcon type="tiktok" />
                        </a>
                      )}
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    <div className="text-sm">
                      <span className="text-primary-600 font-medium">{creator.campaignProgress.ongoing}</span>
                      <span className="text-gray-400 mx-1">/</span>
                      <span className="text-gray-600">{creator.campaignProgress.completed}</span>
                      <span className="text-gray-400 text-xs ml-1">(진행/완료)</span>
                    </div>
                  </TableCell>
                  <TableCell align="right">{formatCurrency(creator.pointBalance)}</TableCell>
                  <TableCell align="right">{formatCurrency(creator.totalEarnings)}</TableCell>
                  <TableCell align="center">
                    <Badge variant={creator.status === 'active' ? 'success' : 'default'}>
                      {creator.status === 'active' ? '활동중' : '비활동'}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(creator.joinDate)}</TableCell>
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

      {/* Excel Upload Modal */}
      <Modal
        isOpen={showUploadModal}
        onClose={() => {
          setShowUploadModal(false);
          setUploadFile(null);
          setUploadPreview([]);
        }}
        title="크리에이터 엑셀 업로드"
        size="lg"
      >
        <div className="space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">
              엑셀 파일을 업로드하여 크리에이터를 일괄 등록할 수 있습니다.
            </p>
            <p className="text-xs text-gray-500 mb-4">
              필수 컬럼: 이름, 이메일, 인스타그램/유튜브/틱톡 URL (선택)
            </p>
            <input
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
            />
          </div>

          {uploadPreview.length > 0 && (
            <div>
              <h4 className="font-medium mb-2">미리보기 (상위 5건)</h4>
              <div className="overflow-x-auto border rounded-lg">
                <Table>
                  <TableHead>
                    <TableRow hoverable={false}>
                      {Object.keys(uploadPreview[0]).map((key) => (
                        <TableHeader key={key}>{key}</TableHeader>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {uploadPreview.map((row, index) => (
                      <TableRow key={index}>
                        {Object.values(row).map((value, i) => (
                          <TableCell key={i}>{String(value)}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setShowUploadModal(false);
                setUploadFile(null);
                setUploadPreview([]);
              }}
            >
              취소
            </Button>
            <Button onClick={handleBulkUpload} disabled={!uploadFile}>
              업로드
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AllCreatorsPage;
