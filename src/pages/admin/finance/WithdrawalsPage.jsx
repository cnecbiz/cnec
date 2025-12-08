import { useState, useEffect } from 'react';
import {
  Download,
  CheckCircle,
  Clock,
  XCircle,
  Wallet,
} from 'lucide-react';
import {
  Card,
  Button,
  Input,
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
} from '../../../components/common';
import { formatCurrency, formatDate, formatDateTime } from '../../../utils/format';
import * as XLSX from 'xlsx';

export const WithdrawalsPage = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    status: '',
    searchQuery: '',
  });

  const [summary, setSummary] = useState({
    totalPending: 0,
    totalCompleted: 0,
    pendingCount: 0,
    completedCount: 0,
  });

  useEffect(() => {
    fetchWithdrawals();
  }, [currentPage, filters]);

  const fetchWithdrawals = async () => {
    setLoading(true);
    try {
      const mockData = [
        {
          id: 1,
          creatorName: '김크리에이터',
          email: 'creator1@example.com',
          bankName: '국민은행',
          accountNumber: '123-456-789012',
          accountHolder: '김크리에이터',
          amount: 500000,
          status: 'pending',
          requestedAt: '2024-01-15T10:30:00',
          processedAt: null,
        },
        {
          id: 2,
          creatorName: '이크리에이터',
          email: 'creator2@example.com',
          bankName: '신한은행',
          accountNumber: '987-654-321098',
          accountHolder: '이크리에이터',
          amount: 800000,
          status: 'completed',
          requestedAt: '2024-01-14T14:20:00',
          processedAt: '2024-01-14T16:00:00',
        },
        {
          id: 3,
          creatorName: '박크리에이터',
          email: 'creator3@example.com',
          bankName: '우리은행',
          accountNumber: '111-222-333444',
          accountHolder: '박크리에이터',
          amount: 1200000,
          status: 'pending',
          requestedAt: '2024-01-15T09:00:00',
          processedAt: null,
        },
        {
          id: 4,
          creatorName: '최크리에이터',
          email: 'creator4@example.com',
          bankName: '하나은행',
          accountNumber: '555-666-777888',
          accountHolder: '최크리에이터',
          amount: 300000,
          status: 'rejected',
          requestedAt: '2024-01-13T11:30:00',
          processedAt: '2024-01-13T15:00:00',
          rejectionReason: '계좌정보 불일치',
        },
      ];

      setWithdrawals(mockData);
      setTotalPages(1);

      // Calculate summary
      const pending = mockData.filter(w => w.status === 'pending');
      const completed = mockData.filter(w => w.status === 'completed');

      setSummary({
        totalPending: pending.reduce((sum, w) => sum + w.amount, 0),
        totalCompleted: completed.reduce((sum, w) => sum + w.amount, 0),
        pendingCount: pending.length,
        completedCount: completed.length,
      });
    } catch (error) {
      console.error('Error fetching withdrawals:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (withdrawalId) => {
    if (!confirm('출금을 승인하시겠습니까?')) return;

    try {
      console.log('Approving withdrawal:', withdrawalId);
      fetchWithdrawals();
    } catch (error) {
      console.error('Error approving:', error);
    }
  };

  const handleReject = async (withdrawalId) => {
    const reason = prompt('거절 사유를 입력해주세요:');
    if (!reason) return;

    try {
      console.log('Rejecting withdrawal:', withdrawalId, reason);
      fetchWithdrawals();
    } catch (error) {
      console.error('Error rejecting:', error);
    }
  };

  const handleExportExcel = () => {
    const exportData = withdrawals.map((w) => ({
      크리에이터: w.creatorName,
      이메일: w.email,
      은행: w.bankName,
      계좌번호: w.accountNumber,
      예금주: w.accountHolder,
      금액: w.amount,
      상태: w.status === 'pending' ? '대기' : w.status === 'completed' ? '완료' : '거절',
      신청일시: w.requestedAt,
      처리일시: w.processedAt || '-',
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, '출금현황');
    XLSX.writeFile(wb, `출금현황_${formatDate(new Date(), 'yyyyMMdd')}.xlsx`);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge variant="warning" dot>대기</Badge>;
      case 'completed':
        return <Badge variant="success" dot>완료</Badge>;
      case 'rejected':
        return <Badge variant="danger" dot>거절</Badge>;
      default:
        return <Badge>알 수 없음</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">포인트 출금 현황</h1>
          <p className="text-gray-500 mt-1">크리에이터 포인트 출금 요청을 관리합니다</p>
        </div>
        <Button variant="outline" icon={Download} onClick={handleExportExcel}>
          엑셀 다운로드
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">대기중 출금액</p>
              <p className="text-2xl font-bold text-yellow-600">{formatCurrency(summary.totalPending)}</p>
              <p className="text-xs text-gray-400 mt-1">{summary.pendingCount}건</p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">완료된 출금액</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(summary.totalCompleted)}</p>
              <p className="text-xs text-gray-400 mt-1">{summary.completedCount}건</p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </Card>
        <Card className="md:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">총 출금 처리액 (이번 달)</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(summary.totalCompleted + summary.totalPending)}
              </p>
            </div>
            <Wallet className="h-8 w-8 text-primary-500" />
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
            placeholder="크리에이터명, 이메일로 검색..."
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
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            options={[
              { value: 'pending', label: '대기' },
              { value: 'completed', label: '완료' },
              { value: 'rejected', label: '거절' },
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
              <TableHeader>계좌정보</TableHeader>
              <TableHeader align="right">금액</TableHeader>
              <TableHeader>신청일시</TableHeader>
              <TableHeader align="center">상태</TableHeader>
              <TableHeader align="center">처리</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8">
                  로딩중...
                </TableCell>
              </TableRow>
            ) : withdrawals.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                  출금 요청이 없습니다
                </TableCell>
              </TableRow>
            ) : (
              withdrawals.map((withdrawal) => (
                <TableRow key={withdrawal.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900">{withdrawal.creatorName}</p>
                      <p className="text-sm text-gray-500">{withdrawal.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{withdrawal.bankName}</p>
                      <p className="text-gray-500">{withdrawal.accountNumber}</p>
                      <p className="text-gray-400">{withdrawal.accountHolder}</p>
                    </div>
                  </TableCell>
                  <TableCell align="right" className="font-medium">
                    {formatCurrency(withdrawal.amount)}
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p>{formatDateTime(withdrawal.requestedAt)}</p>
                      {withdrawal.processedAt && (
                        <p className="text-gray-500">처리: {formatDateTime(withdrawal.processedAt)}</p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    {getStatusBadge(withdrawal.status)}
                    {withdrawal.rejectionReason && (
                      <p className="text-xs text-red-500 mt-1">{withdrawal.rejectionReason}</p>
                    )}
                  </TableCell>
                  <TableCell align="center">
                    {withdrawal.status === 'pending' && (
                      <div className="flex items-center justify-center space-x-2">
                        <Button
                          variant="success"
                          size="xs"
                          onClick={() => handleApprove(withdrawal.id)}
                        >
                          승인
                        </Button>
                        <Button
                          variant="danger"
                          size="xs"
                          onClick={() => handleReject(withdrawal.id)}
                        >
                          거절
                        </Button>
                      </div>
                    )}
                    {withdrawal.status !== 'pending' && (
                      <span className="text-gray-400 text-sm">-</span>
                    )}
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

export default WithdrawalsPage;
