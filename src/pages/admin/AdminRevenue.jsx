import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { formatCurrency, formatDate } from '@/lib/utils'
import { toast } from '@/stores/uiStore'
import {
  Download,
  Plus,
  TrendingUp,
  TrendingDown,
  Wallet,
  Receipt,
  Edit,
  Trash2,
  Calendar,
  Filter,
  Search,
} from 'lucide-react'

// 목업 매출 데이터
const revenueData = [
  {
    id: 1,
    date: '2024-12-05',
    type: 'campaign',
    description: '에스티로더 기획 숏폼 캠페인',
    brandName: '에스티로더 코리아',
    amount: 12000000,
    isVoucher: false,
  },
  {
    id: 2,
    date: '2024-12-03',
    type: 'campaign',
    description: '라네즈 4주 챌린지 캠페인',
    brandName: '아모레퍼시픽',
    amount: 8000000,
    isVoucher: false,
  },
  {
    id: 3,
    date: '2024-12-01',
    type: 'voucher',
    description: '수출바우처 - 해외 브랜드 A',
    brandName: '해외 브랜드 A',
    amount: 25000000,
    isVoucher: true,
  },
  {
    id: 4,
    date: '2024-11-28',
    type: 'manual',
    description: '기존 캠페인 정산',
    brandName: '헤라',
    amount: 5000000,
    isVoucher: false,
  },
]

// 목업 비용 데이터
const expenseData = [
  {
    id: 1,
    date: '2024-12-05',
    category: '인건비',
    description: '12월 급여',
    amount: 15000000,
  },
  {
    id: 2,
    date: '2024-12-03',
    category: '운영비',
    description: '사무실 임대료',
    amount: 3000000,
  },
  {
    id: 3,
    date: '2024-12-01',
    category: '마케팅비',
    description: '광고 집행비용',
    amount: 5000000,
  },
  {
    id: 4,
    date: '2024-11-28',
    category: '크리에이터 정산',
    description: '11월 크리에이터 포인트 정산',
    amount: 45000000,
  },
]

const revenueTypeLabels = {
  campaign: '캠페인 매출',
  voucher: '수출바우처',
  manual: '수기 입력',
}

const revenueTypeColors = {
  campaign: 'bg-cnec-blue-light text-cnec-blue',
  voucher: 'bg-success-light text-success',
  manual: 'bg-gray-100 text-gray-800',
}

const expenseCategories = [
  '인건비',
  '운영비',
  '마케팅비',
  '크리에이터 정산',
  '세금/공과금',
  '기타',
]

// 매출 입력 모달
function AddRevenueModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    date: '',
    type: 'manual',
    description: '',
    brandName: '',
    amount: '',
    isVoucher: false,
  })

  const handleSubmit = () => {
    if (!formData.date || !formData.description || !formData.amount) {
      toast.error('필수 항목을 입력해주세요.')
      return
    }
    toast.success('매출이 등록되었습니다.')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>매출 수동 입력</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>날짜 *</Label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>구분 *</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData({ ...formData, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="campaign">캠페인 매출</SelectItem>
                  <SelectItem value="voucher">수출바우처</SelectItem>
                  <SelectItem value="manual">기타</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>광고주/브랜드명</Label>
            <Input
              placeholder="브랜드명 입력"
              value={formData.brandName}
              onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>내용 *</Label>
            <Textarea
              placeholder="매출 내역 설명"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>금액 (원) *</Label>
            <Input
              type="number"
              placeholder="0"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>취소</Button>
          <Button onClick={handleSubmit}>등록</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// 비용 입력 모달
function AddExpenseModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    date: '',
    category: '',
    description: '',
    amount: '',
  })

  const handleSubmit = () => {
    if (!formData.date || !formData.category || !formData.amount) {
      toast.error('필수 항목을 입력해주세요.')
      return
    }
    toast.success('비용이 등록되었습니다.')
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>비용 입력</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>날짜 *</Label>
              <Input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>항목 *</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="항목 선택" />
                </SelectTrigger>
                <SelectContent>
                  {expenseCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label>내용</Label>
            <Textarea
              placeholder="비용 내역 설명"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>금액 (원) *</Label>
            <Input
              type="number"
              placeholder="0"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>취소</Button>
          <Button onClick={handleSubmit}>등록</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function AdminRevenue() {
  const [revenueModalOpen, setRevenueModalOpen] = useState(false)
  const [expenseModalOpen, setExpenseModalOpen] = useState(false)
  const [selectedMonth, setSelectedMonth] = useState('2024-12')

  // 집계
  const totalRevenue = revenueData.reduce((sum, r) => sum + r.amount, 0)
  const totalVoucher = revenueData.filter(r => r.isVoucher).reduce((sum, r) => sum + r.amount, 0)
  const totalExpense = expenseData.reduce((sum, e) => sum + e.amount, 0)
  const operatingProfit = totalRevenue - totalExpense

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">매출 관리</h1>
          <p className="text-gray-500">매출 현황을 확인하고 비용을 관리하세요.</p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-40">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2024-12">2024년 12월</SelectItem>
              <SelectItem value="2024-11">2024년 11월</SelectItem>
              <SelectItem value="2024-10">2024년 10월</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            엑셀 다운로드
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-cnec-blue-light flex items-center justify-center">
                <Wallet className="h-5 w-5 text-cnec-blue" />
              </div>
              <div>
                <p className="text-sm text-gray-500">총 매출</p>
                <p className="text-xl font-bold">{formatCurrency(totalRevenue)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success-light flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-gray-500">수출바우처</p>
                <p className="text-xl font-bold text-success">{formatCurrency(totalVoucher)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-cnec-blue-light flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-cnec-blue" />
              </div>
              <div>
                <p className="text-sm text-gray-500">일반 매출</p>
                <p className="text-xl font-bold">{formatCurrency(totalRevenue - totalVoucher)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-error-light flex items-center justify-center">
                <Receipt className="h-5 w-5 text-error" />
              </div>
              <div>
                <p className="text-sm text-gray-500">총 비용</p>
                <p className="text-xl font-bold text-error">{formatCurrency(totalExpense)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                <TrendingUp className="h-5 w-5 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">영업이익</p>
                <p className={`text-xl font-bold ${operatingProfit >= 0 ? 'text-success' : 'text-error'}`}>
                  {formatCurrency(operatingProfit)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenue">
        <TabsList>
          <TabsTrigger value="revenue">매출 내역</TabsTrigger>
          <TabsTrigger value="expense">비용 관리</TabsTrigger>
          <TabsTrigger value="summary">손익 요약</TabsTrigger>
        </TabsList>

        {/* 매출 내역 */}
        <TabsContent value="revenue" className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="검색..." className="pl-9 w-64" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="구분" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  <SelectItem value="campaign">캠페인</SelectItem>
                  <SelectItem value="voucher">수출바우처</SelectItem>
                  <SelectItem value="manual">수기입력</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={() => setRevenueModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              매출 수동 입력
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>날짜</TableHead>
                    <TableHead>구분</TableHead>
                    <TableHead>광고주/브랜드</TableHead>
                    <TableHead>내용</TableHead>
                    <TableHead className="text-right">금액</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {revenueData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{formatDate(item.date)}</TableCell>
                      <TableCell>
                        <Badge className={revenueTypeColors[item.type]}>
                          {revenueTypeLabels[item.type]}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">{item.brandName}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell className="text-right font-bold text-cnec-blue">
                        {formatCurrency(item.amount)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-error">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 비용 관리 */}
        <TabsContent value="expense" className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="검색..." className="pl-9 w-64" />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="항목" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  {expenseCategories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button onClick={() => setExpenseModalOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              비용 입력
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>날짜</TableHead>
                    <TableHead>항목</TableHead>
                    <TableHead>내용</TableHead>
                    <TableHead className="text-right">금액</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {expenseData.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>{formatDate(item.date)}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.category}</Badge>
                      </TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell className="text-right font-bold text-error">
                        -{formatCurrency(item.amount)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-error">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 손익 요약 */}
        <TabsContent value="summary" className="mt-4">
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>매출 구성</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-gray-600">캠페인 매출</span>
                    <span className="font-bold">{formatCurrency(totalRevenue - totalVoucher)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b">
                    <span className="text-gray-600">수출바우처 매출</span>
                    <span className="font-bold text-success">{formatCurrency(totalVoucher)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 bg-cnec-blue-light rounded-lg px-4">
                    <span className="font-semibold">총 매출</span>
                    <span className="font-bold text-cnec-blue text-xl">{formatCurrency(totalRevenue)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>비용 구성</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {expenseCategories.slice(0, 4).map((cat) => {
                    const catTotal = expenseData
                      .filter((e) => e.category === cat)
                      .reduce((sum, e) => sum + e.amount, 0)
                    if (catTotal === 0) return null
                    return (
                      <div key={cat} className="flex justify-between items-center py-3 border-b">
                        <span className="text-gray-600">{cat}</span>
                        <span className="font-bold">{formatCurrency(catTotal)}</span>
                      </div>
                    )
                  })}
                  <div className="flex justify-between items-center py-3 bg-error-light rounded-lg px-4">
                    <span className="font-semibold">총 비용</span>
                    <span className="font-bold text-error text-xl">{formatCurrency(totalExpense)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>손익 계산</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-gray-600 text-lg">총 매출</span>
                  <span className="font-bold text-lg">{formatCurrency(totalRevenue)}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b">
                  <span className="text-gray-600 text-lg">총 비용</span>
                  <span className="font-bold text-lg text-error">-{formatCurrency(totalExpense)}</span>
                </div>
                <div className={`flex justify-between items-center py-4 rounded-lg px-4 ${operatingProfit >= 0 ? 'bg-success-light' : 'bg-error-light'}`}>
                  <span className="font-bold text-xl">영업이익</span>
                  <span className={`font-bold text-2xl ${operatingProfit >= 0 ? 'text-success' : 'text-error'}`}>
                    {formatCurrency(operatingProfit)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 모달 */}
      <AddRevenueModal isOpen={revenueModalOpen} onClose={() => setRevenueModalOpen(false)} />
      <AddExpenseModal isOpen={expenseModalOpen} onClose={() => setExpenseModalOpen(false)} />
    </div>
  )
}
