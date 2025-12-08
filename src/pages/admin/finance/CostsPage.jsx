import { useState, useEffect } from 'react';
import {
  Plus,
  Download,
  Edit,
  Trash2,
  Receipt,
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
  Pagination,
} from '../../../components/common';
import { formatCurrency, formatDate } from '../../../utils/format';
import { COST_CATEGORIES } from '../../../constants';
import * as XLSX from 'xlsx';

export const CostsPage = () => {
  const [costs, setCosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingCost, setEditingCost] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    category: '',
  });

  const [newCost, setNewCost] = useState({
    date: '',
    category: '',
    amount: '',
    description: '',
  });

  const [summary, setSummary] = useState({
    totalCosts: 0,
    byCategory: {},
  });

  useEffect(() => {
    fetchCosts();
  }, [currentPage, filters]);

  const fetchCosts = async () => {
    setLoading(true);
    try {
      const mockData = [
        {
          id: 1,
          date: '2024-01-15',
          category: '인건비',
          amount: 8000000,
          description: '1월 급여',
        },
        {
          id: 2,
          date: '2024-01-14',
          category: '마케팅비',
          amount: 2000000,
          description: '광고 집행비용',
        },
        {
          id: 3,
          date: '2024-01-10',
          category: '운영비',
          amount: 500000,
          description: '사무실 임대료',
        },
        {
          id: 4,
          date: '2024-01-08',
          category: '제품비',
          amount: 1500000,
          description: '샘플 제품 구매',
        },
        {
          id: 5,
          date: '2024-01-05',
          category: '배송비',
          amount: 300000,
          description: '크리에이터 제품 배송',
        },
      ];

      setCosts(mockData);
      setTotalPages(1);

      // Calculate summary
      const total = mockData.reduce((sum, c) => sum + c.amount, 0);
      const byCategory = mockData.reduce((acc, c) => {
        acc[c.category] = (acc[c.category] || 0) + c.amount;
        return acc;
      }, {});

      setSummary({
        totalCosts: total,
        byCategory,
      });
    } catch (error) {
      console.error('Error fetching costs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCost = async () => {
    if (!newCost.date || !newCost.category || !newCost.amount) {
      alert('필수 항목을 모두 입력해주세요.');
      return;
    }

    try {
      console.log('Adding cost:', newCost);
      setShowAddModal(false);
      setNewCost({
        date: '',
        category: '',
        amount: '',
        description: '',
      });
      setEditingCost(null);
      fetchCosts();
    } catch (error) {
      console.error('Error adding cost:', error);
    }
  };

  const handleEdit = (cost) => {
    setNewCost({
      date: cost.date,
      category: cost.category,
      amount: cost.amount.toString(),
      description: cost.description,
    });
    setEditingCost(cost);
    setShowAddModal(true);
  };

  const handleDelete = async (costId) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;

    try {
      console.log('Deleting cost:', costId);
      fetchCosts();
    } catch (error) {
      console.error('Error deleting cost:', error);
    }
  };

  const handleExportExcel = () => {
    const exportData = costs.map((cost) => ({
      날짜: cost.date,
      항목: cost.category,
      금액: cost.amount,
      설명: cost.description,
    }));

    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, '비용');
    XLSX.writeFile(wb, `비용내역_${formatDate(new Date(), 'yyyyMMdd')}.xlsx`);
  };

  const categoryOptions = Object.entries(COST_CATEGORIES).map(([key, value]) => ({
    value: value,
    label: value,
  }));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">비용 관리</h1>
          <p className="text-gray-500 mt-1">운영 비용을 관리합니다</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" icon={Download} onClick={handleExportExcel}>
            엑셀 다운로드
          </Button>
          <Button icon={Plus} onClick={() => setShowAddModal(true)}>
            비용 등록
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="md:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">총 비용</p>
              <p className="text-2xl font-bold text-red-600">{formatCurrency(summary.totalCosts)}</p>
            </div>
            <Receipt className="h-8 w-8 text-red-500" />
          </div>
        </Card>
        {Object.entries(summary.byCategory).slice(0, 3).map(([category, amount]) => (
          <Card key={category}>
            <div>
              <p className="text-sm text-gray-500">{category}</p>
              <p className="text-xl font-bold text-gray-900">{formatCurrency(amount)}</p>
            </div>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <div className="flex flex-wrap gap-4">
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
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
            options={categoryOptions}
            placeholder="항목"
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
              <TableHeader>항목</TableHeader>
              <TableHeader align="right">금액</TableHeader>
              <TableHeader>설명</TableHeader>
              <TableHeader align="center">관리</TableHeader>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8">
                  로딩중...
                </TableCell>
              </TableRow>
            ) : costs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                  등록된 비용이 없습니다
                </TableCell>
              </TableRow>
            ) : (
              costs.map((cost) => (
                <TableRow key={cost.id}>
                  <TableCell>{formatDate(cost.date)}</TableCell>
                  <TableCell>
                    <Badge variant="default">{cost.category}</Badge>
                  </TableCell>
                  <TableCell align="right" className="font-medium text-red-600">
                    {formatCurrency(cost.amount)}
                  </TableCell>
                  <TableCell className="text-gray-500">{cost.description || '-'}</TableCell>
                  <TableCell align="center">
                    <div className="flex items-center justify-center space-x-1">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(cost)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(cost.id)}>
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

      {/* Add/Edit Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => {
          setShowAddModal(false);
          setEditingCost(null);
          setNewCost({ date: '', category: '', amount: '', description: '' });
        }}
        title={editingCost ? '비용 수정' : '비용 등록'}
        size="md"
      >
        <div className="space-y-4">
          <Input
            label="날짜"
            type="date"
            value={newCost.date}
            onChange={(e) => setNewCost({ ...newCost, date: e.target.value })}
            required
          />

          <Select
            label="항목"
            value={newCost.category}
            onChange={(e) => setNewCost({ ...newCost, category: e.target.value })}
            options={categoryOptions}
            required
          />

          <Input
            label="금액"
            type="number"
            value={newCost.amount}
            onChange={(e) => setNewCost({ ...newCost, amount: e.target.value })}
            placeholder="금액을 입력하세요"
            required
          />

          <Input
            label="설명"
            value={newCost.description}
            onChange={(e) => setNewCost({ ...newCost, description: e.target.value })}
            placeholder="설명을 입력하세요"
          />

          <div className="flex justify-end space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setShowAddModal(false);
                setEditingCost(null);
                setNewCost({ date: '', category: '', amount: '', description: '' });
              }}
            >
              취소
            </Button>
            <Button onClick={handleAddCost}>
              {editingCost ? '수정' : '등록'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default CostsPage;
