import { useState, useEffect } from 'react';
import {
  Plus,
  Send,
  FileText,
  CheckCircle,
  Clock,
  XCircle,
  Eye,
  Download,
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
} from '../../components/common';
import { formatDate, formatDateTime } from '../../utils/format';

export const ContractsPage = () => {
  const [contracts, setContracts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSendModal, setShowSendModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    searchQuery: '',
  });

  const [newContract, setNewContract] = useState({
    type: 'creator', // creator, advertiser
    recipientName: '',
    recipientEmail: '',
    templateId: '',
    customFields: {},
  });

  const [templates, setTemplates] = useState([]);

  useEffect(() => {
    fetchContracts();
    fetchTemplates();
  }, [currentPage, filters]);

  const fetchContracts = async () => {
    setLoading(true);
    try {
      const mockData = [
        {
          id: 1,
          type: 'creator',
          recipientName: '김크리에이터',
          recipientEmail: 'creator1@example.com',
          templateName: '크리에이터 활동 계약서',
          status: 'signed',
          sentAt: '2024-01-10T10:00:00',
          signedAt: '2024-01-10T15:30:00',
        },
        {
          id: 2,
          type: 'advertiser',
          recipientName: 'ABC 화장품',
          recipientEmail: 'abc@company.com',
          templateName: '광고 대행 계약서',
          status: 'pending',
          sentAt: '2024-01-12T09:00:00',
          signedAt: null,
        },
        {
          id: 3,
          type: 'creator',
          recipientName: '이크리에이터',
          recipientEmail: 'creator2@example.com',
          templateName: '소속 크리에이터 계약서',
          status: 'viewed',
          sentAt: '2024-01-14T11:00:00',
          signedAt: null,
        },
        {
          id: 4,
          type: 'advertiser',
          recipientName: 'XYZ 뷰티',
          recipientEmail: 'xyz@beauty.com',
          templateName: '캠페인 진행 계약서',
          status: 'expired',
          sentAt: '2023-12-01T10:00:00',
          signedAt: null,
        },
      ];

      setContracts(mockData);
      setTotalPages(1);
    } catch (error) {
      console.error('Error fetching contracts:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTemplates = async () => {
    // Mock templates
    setTemplates([
      { id: 1, name: '크리에이터 활동 계약서', type: 'creator' },
      { id: 2, name: '소속 크리에이터 계약서', type: 'creator' },
      { id: 3, name: '광고 대행 계약서', type: 'advertiser' },
      { id: 4, name: '캠페인 진행 계약서', type: 'advertiser' },
    ]);
  };

  const handleSendContract = async () => {
    if (!newContract.recipientName || !newContract.recipientEmail || !newContract.templateId) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    try {
      console.log('Sending contract:', newContract);
      alert('계약서가 이메일로 발송되었습니다.');
      setShowSendModal(false);
      setNewContract({
        type: 'creator',
        recipientName: '',
        recipientEmail: '',
        templateId: '',
        customFields: {},
      });
      fetchContracts();
    } catch (error) {
      console.error('Error sending contract:', error);
    }
  };

  const handleResend = async (contractId) => {
    if (!confirm('계약서를 재발송하시겠습니까?')) return;

    try {
      console.log('Resending contract:', contractId);
      alert('계약서가 재발송되었습니다.');
    } catch (error) {
      console.error('Error resending:', error);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'signed':
        return <Badge variant="success" dot>서명완료</Badge>;
      case 'pending':
        return <Badge variant="warning" dot>대기중</Badge>;
      case 'viewed':
        return <Badge variant="info" dot>열람함</Badge>;
      case 'expired':
        return <Badge variant="danger" dot>만료됨</Badge>;
      default:
        return <Badge>알 수 없음</Badge>;
    }
  };

  const filteredTemplates = templates.filter(t =>
    !newContract.type || t.type === newContract.type
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">계약서 관리</h1>
          <p className="text-gray-500 mt-1">전자계약서 발송 및 관리</p>
        </div>
        <Button icon={Send} onClick={() => setShowSendModal(true)}>
          계약서 발송
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">전체 계약서</p>
              <p className="text-2xl font-bold text-gray-900">{contracts.length}</p>
            </div>
            <FileText className="h-8 w-8 text-primary-500" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">서명 완료</p>
              <p className="text-2xl font-bold text-green-600">
                {contracts.filter(c => c.status === 'signed').length}
              </p>
            </div>
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">대기중</p>
              <p className="text-2xl font-bold text-yellow-600">
                {contracts.filter(c => c.status === 'pending' || c.status === 'viewed').length}
              </p>
            </div>
            <Clock className="h-8 w-8 text-yellow-500" />
          </div>
        </Card>
        <Card>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">만료됨</p>
              <p className="text-2xl font-bold text-red-600">
                {contracts.filter(c => c.status === 'expired').length}
              </p>
            </div>
            <XCircle className="h-8 w-8 text-red-500" />
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
            placeholder="받는 사람, 이메일로 검색..."
            className="w-64"
          />
          <Select
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
            options={[
              { value: 'creator', label: '크리에이터' },
              { value: 'advertiser', label: '광고주' },
            ]}
            placeholder="유형"
            className="w-40"
          />
          <Select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            options={[
              { value: 'signed', label: '서명완료' },
              { value: 'pending', label: '대기중' },
              { value: 'viewed', label: '열람함' },
              { value: 'expired', label: '만료됨' },
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
              <TableHeader>유형</TableHeader>
              <TableHeader>받는 사람</TableHeader>
              <TableHeader>계약서</TableHeader>
              <TableHeader>발송일</TableHeader>
              <TableHeader align="center">상태</TableHeader>
              <TableHeader>서명일</TableHeader>
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
            ) : contracts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  발송된 계약서가 없습니다
                </TableCell>
              </TableRow>
            ) : (
              contracts.map((contract) => (
                <TableRow key={contract.id}>
                  <TableCell>
                    <Badge variant={contract.type === 'creator' ? 'primary' : 'info'}>
                      {contract.type === 'creator' ? '크리에이터' : '광고주'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900">{contract.recipientName}</p>
                      <p className="text-sm text-gray-500">{contract.recipientEmail}</p>
                    </div>
                  </TableCell>
                  <TableCell>{contract.templateName}</TableCell>
                  <TableCell>{formatDateTime(contract.sentAt)}</TableCell>
                  <TableCell align="center">
                    {getStatusBadge(contract.status)}
                  </TableCell>
                  <TableCell>
                    {contract.signedAt ? formatDateTime(contract.signedAt) : '-'}
                  </TableCell>
                  <TableCell align="center">
                    <div className="flex items-center justify-center space-x-1">
                      <Button variant="ghost" size="sm" title="보기">
                        <Eye className="h-4 w-4" />
                      </Button>
                      {contract.status === 'signed' && (
                        <Button variant="ghost" size="sm" title="다운로드">
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                      {(contract.status === 'pending' || contract.status === 'expired') && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleResend(contract.id)}
                          title="재발송"
                        >
                          <Send className="h-4 w-4" />
                        </Button>
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

      {/* Send Contract Modal */}
      <Modal
        isOpen={showSendModal}
        onClose={() => setShowSendModal(false)}
        title="계약서 발송"
        size="md"
      >
        <div className="space-y-4">
          <Select
            label="받는 사람 유형"
            value={newContract.type}
            onChange={(e) => setNewContract({ ...newContract, type: e.target.value, templateId: '' })}
            options={[
              { value: 'creator', label: '크리에이터' },
              { value: 'advertiser', label: '광고주/기업' },
            ]}
            required
          />

          <Input
            label="받는 사람 이름"
            value={newContract.recipientName}
            onChange={(e) => setNewContract({ ...newContract, recipientName: e.target.value })}
            placeholder="이름을 입력하세요"
            required
          />

          <Input
            label="이메일 주소"
            type="email"
            value={newContract.recipientEmail}
            onChange={(e) => setNewContract({ ...newContract, recipientEmail: e.target.value })}
            placeholder="이메일 주소를 입력하세요"
            required
          />

          <Select
            label="계약서 템플릿"
            value={newContract.templateId}
            onChange={(e) => setNewContract({ ...newContract, templateId: e.target.value })}
            options={filteredTemplates.map(t => ({ value: t.id.toString(), label: t.name }))}
            required
          />

          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-600">
              선택한 템플릿으로 전자계약서가 이메일로 발송됩니다.
              받는 사람은 이메일 링크를 통해 계약서를 열람하고 전자서명할 수 있습니다.
            </p>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button variant="outline" onClick={() => setShowSendModal(false)}>
              취소
            </Button>
            <Button icon={Send} onClick={handleSendContract}>
              발송
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ContractsPage;
