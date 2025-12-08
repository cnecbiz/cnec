import { useState, useEffect } from 'react';
import {
  Plus,
  Download,
  Filter,
  DollarSign,
  TrendingUp,
  Calendar,
} from 'lucide-react';
import {
  Card,
  CardTitle,
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
import { formatCurrency, formatDate } from '../../../utils/format';
import * as XLSX from 'xlsx';

export const SalesPage = () => {
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    voucherType: '',
    searchQuery: '',
  });

  const [newSale, setNewSale] = useState({
    date: '',
    advertiserName: '',
    campaignName: '',
    amount: '',
    voucherType: 'normal', // normal, export
    description: '',
  });

  const [summary, setSummary] = useState({
    totalSales: 0,
    normalSales: 0,
    exportVoucherSales: 0,
    monthlyGrowth: 0,
  });

  useEffect(() => {
    fetchSales();
  }, [currentPage, filters]);

  const fetchSales = async () => {
    setLoading(true);
    try {
      const mockData = [
        {
          id: 1,
          date: '2024-01-15',
          advertiserName: 'ABC 화장품',
          campaignName: '신제품 런칭 캠페인',
          amount: 5000000,
          voucherType: 'normal',
          source: 'campaign', // campaign, manual
          description: '',
        },
        {
          id: 2,
          date: '2024-01-12',
          advertiserName: 'XYZ 뷰티',
          campaignName: '4주 챌린지 캠페인',
          amount: 8000000,
          voucherType: 'export',
          source: 'campaign',
          description: '수출바우처 적용',
        },
        {
          id: 3,
          date: '2024-01-10',
          advertiserName: '라라 코스메틱',
          campaignName: '기획 숏폼 5건',
          amount: 3000000,
          voucherType: 'normal',
          source: 'manual',
          description: '기존 캠페인 수기 등록',
        },
        {
          id: 4,
          date: '2024-01-08',
          advertiserName: '글로벌 뷰티',
          campaignName: '해외 마케팅 캠페인',
          amount: 12000000,
          voucherType: 'export',
          source: 'campaign',
          description: '수출바우처 50% 적용',
        },
      ];

      setSales(mockData);
      setTotalPages(1);

      // Calculate summary
      const total = mockData.reduce((sum, s) => sum + s.amount, 0);
      const normal = mockData.filter(s => s.voucherType === 'normal').reduce((sum, s) => sum + s.amount, 0);
      const exportV = mockData.filter(s => s.voucherType === 'export').reduce((sum, s) => sum + s.amount, 0);

      setSummary({
        totalSales: total,
        normalSales: normal,
        exportVoucherSales: exportV,
        monthlyGrowth: 12.5,
      });
    } catch (error) {
      console.error('Error fetching sales:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddSale = async () => {
    if (!newSale.date || !newSale.advertiserName || !newSale.amount) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    try {
      console.log('Adding sale:', newSale);
      setShowAddModal(false);
      setNewSale({
        date: '',
        advertiserName: '',
        campaignName: '',
        amount: '',
        voucherType: 'normal',
        description: '',
      });
      fetchSales();
    } catch (error) {
      console.error('Error adding sale:', error);
    }
  };

  const handleExportExcel = () => {
    const exportData = sales.map((sale) => ({
      날짜: sale.date,
      광고주: sale.advertiserName,
      캠페인명: sale.campaignName,
      금액: sale.amount,
      구분: sale.voucherType === 'export' ? '수출바우처' : '일반',
      출처: sale.source === 'campaign' ? '캠페인 연동' : '수기 입력',
      비고: sale.description,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, '매출');
    XLSX.writeFile(wb, `매출내역_${formatDate(new Date(), 'yyyyMMdd')}.xlsx`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">매출 관리</h1>
          <p className="text-gray-500 mt-1">캠페인 매출을 관리합니다</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" icon={Download} onClick={handleExportExcel}>
            엑셀 다운로드
          </Button>
          <Button icon={Plus} onClick={() => setShowAddModal(true)}>
            매출 등록
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">총 매출</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(summary.totalSales)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-primary-500" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">일반 매출</p>
              <p className="text-2xl font-bold text-gray-900">{formatCurrency(summary.normalSales)}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">수출바우처 매출</p>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(summary.exportVoucherSales)}</p>
            </div>
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">전월 대비</p>
              <p className="text-2xl font-bold text-green-600">+{summary.monthlyGrowth}%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-500" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-wrap gap-4">
          <SearchInput
            value={filters.searchQuery}
            onChange={(value) => setFilters({ ...filters, searchQuery: value })}
            onClear={() => setFilters({ ...filters, searchQuery: '' })}
            placeholder="광고주, 캠페인명으로 검색..."
            className="w-64"
          />
          <Input
            type="date"
            value={filters.startDate}
            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
            className="w-40"
          />
          <span className="flex items-center text-gray-500">~</span>
          <Input
            type="date"
            value={filters.endDate}
            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
            className="w-40"
          />
          <Select
            value={filters.voucherType}
            onChange={(e) => setFilters({ ...filters, voucherType: e.target.value })}
            options={[
              { value: 'normal', label: '일반' },
              { value: 'export', label: '수출바우처' },
            ]}
            placeholder="구분"
            className="w-40"
          />
        </div>
      </Card>

      {/* Table */}
      <Card padding={false}>
        <Table>
          <TableHead>
            <TableRow hoverable={false}>
              <TableHeader>날짜</TableHeader>
              <TableHeader>광고주</TableHeader>
              <TableHeader>캠페인명</TableHeader>
              <TableHeader align="right">금액</TableHeader>
              <TableHeader align="center">구분</TableHeader>
              <TableHeader align="center">출처</TableHeader>
              <TableHeader>비고</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8">
                  로딩중...
                </TableCell>
              </TableRow>
            ) : sales.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  등록된 매출이 없습니다
                </TableCell>
              </TableRow>
            ) : (
              sales.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell>{formatDate(sale.date)}</TableCell>
                  <TableCell className="font-medium">{sale.advertiserName}</TableCell>
                  <TableCell>{sale.campaignName}</TableCell>
                  <TableCell align="right" className="font-medium">
                    {formatCurrency(sale.amount)}
                  </TableCell>
                  <TableCell align="center">
                    <Badge variant={sale.voucherType === 'export' ? 'info' : 'default'}>
                      {sale.voucherType === 'export' ? '수출바우처' : '일반'}
                    </Badge>
                  </TableCell>
                  <TableCell align="center">
                    <Badge variant={sale.source === 'campaign' ? 'success' : 'warning'}>
                      {sale.source === 'campaign' ? '캠페인 연동' : '수기 입력'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-500 text-sm">{sale.description || '-'}</TableCell>
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

      {/* Add Sale Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="매출 등록"
        size="md"
      >
        <div className="space-y-4">
          <Input
            label="날짜"
            type="date"
            value={newSale.date}
            onChange={(e) => setNewSale({ ...newSale, date: e.target.value })}
            required
          />

          <Input
            label="광고주명"
            value={newSale.advertiserName}
            onChange={(e) => setNewSale({ ...newSale, advertiserName: e.target.value })}
            placeholder="광고주명을 입력하세요"
            required
          />

          <Input
            label="캠페인명"
            value={newSale.campaignName}
            onChange={(e) => setNewSale({ ...newSale, campaignName: e.target.value })}
            placeholder="캠페인명을 입력하세요"
          />

          <Input
            label="금액"
            type="number"
            value={newSale.amount}
            onChange={(e) => setNewSale({ ...newSale, amount: e.target.value })}
            placeholder="금액을 입력하세요"
            required
          />

          <Select
            label="구분"
            value={newSale.voucherType}
            onChange={(e) => setNewSale({ ...newSale, voucherType: e.target.value })}
            options={[
              { value: 'normal', label: '일반' },
              { value: 'export', label: '수출바우처' },
            ]}
            required
          />

          <Input
            label="비고"
            value={newSale.description}
            onChange={(e) => setNewSale({ ...newSale, description: e.target.value })}
            placeholder="비고를 입력하세요"
          />

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              취소
            </Button>
            <Button onClick={handleAddSale}>
              등록
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SalesPage;
