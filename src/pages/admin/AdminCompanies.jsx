import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatCurrency, formatDate } from '@/lib/utils'
import {
  Search,
  Building2,
  CheckCircle,
  Clock,
  MoreHorizontal,
  Download,
  Eye,
  XCircle,
  Mail,
  Phone,
  MapPin,
  FileText,
  TrendingUp,
  Users,
  Globe,
} from 'lucide-react'

const initialCompanies = [
  {
    id: 1,
    name: '(주)에스티로더 코리아',
    ceo: '김대표',
    businessNumber: '123-45-67890',
    manager: '이마케터',
    managerPhone: '010-1234-5678',
    email: 'marketing@esteelauder.kr',
    address: '서울특별시 강남구 테헤란로 123',
    website: 'https://www.esteelauder.co.kr',
    totalSpent: 45000000,
    campaigns: 8,
    activeCampaigns: 2,
    creators: 45,
    status: '승인완료',
    joinDate: '2024-06-15',
    lastActivity: '2024-12-07',
    isExportVoucher: false,
    memo: '',
  },
  {
    id: 2,
    name: '아모레퍼시픽',
    ceo: '서경배',
    businessNumber: '111-22-33333',
    manager: '박담당',
    managerPhone: '010-2345-6789',
    email: 'brand@amorepacific.com',
    address: '서울특별시 용산구 한강대로 100',
    website: 'https://www.amorepacific.com',
    totalSpent: 120000000,
    campaigns: 24,
    activeCampaigns: 5,
    creators: 156,
    status: '승인완료',
    joinDate: '2024-03-10',
    lastActivity: '2024-12-06',
    isExportVoucher: true,
    memo: '수출바우처 사용 기업',
  },
  {
    id: 3,
    name: '(주)코스맥스',
    ceo: '이경수',
    businessNumber: '555-66-77777',
    manager: '최매니저',
    managerPhone: '010-3456-7890',
    email: 'manager@cosmax.com',
    address: '경기도 성남시 분당구 판교로 200',
    website: 'https://www.cosmax.com',
    totalSpent: 0,
    campaigns: 0,
    activeCampaigns: 0,
    creators: 0,
    status: '승인대기',
    joinDate: '2024-12-07',
    lastActivity: '2024-12-07',
    isExportVoucher: false,
    memo: '신규 가입 기업',
  },
  {
    id: 4,
    name: '(주)클리오',
    ceo: '한현옥',
    businessNumber: '222-33-44444',
    manager: '정브랜드',
    managerPhone: '010-4567-8901',
    email: 'brand@cliocosmetic.com',
    address: '서울특별시 강남구 역삼동 123',
    website: 'https://www.cliocosmetic.com',
    totalSpent: 35000000,
    campaigns: 12,
    activeCampaigns: 1,
    creators: 67,
    status: '승인완료',
    joinDate: '2024-05-20',
    lastActivity: '2024-12-05',
    isExportVoucher: false,
    memo: '',
  },
  {
    id: 5,
    name: '(주)토니모리',
    ceo: '배해동',
    businessNumber: '333-44-55555',
    manager: '김마케팅',
    managerPhone: '010-5678-9012',
    email: 'marketing@tonymoly.com',
    address: '서울특별시 성동구 성수동 50',
    website: 'https://www.tonymoly.com',
    totalSpent: 0,
    campaigns: 0,
    activeCampaigns: 0,
    creators: 0,
    status: '승인거절',
    joinDate: '2024-11-25',
    lastActivity: '2024-11-25',
    isExportVoucher: false,
    memo: '서류 미비',
  },
]

const getStatusBadge = (status) => {
  switch (status) {
    case '승인완료':
      return (
        <Badge variant="success" className="gap-1">
          <CheckCircle className="h-3 w-3" />
          승인완료
        </Badge>
      )
    case '승인대기':
      return (
        <Badge variant="warning" className="gap-1">
          <Clock className="h-3 w-3" />
          승인대기
        </Badge>
      )
    case '승인거절':
      return (
        <Badge variant="destructive" className="gap-1">
          <XCircle className="h-3 w-3" />
          승인거절
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export function AdminCompanies() {
  const [companies, setCompanies] = useState(initialCompanies)
  const [selectedCompanies, setSelectedCompanies] = useState([])
  const [detailDialogOpen, setDetailDialogOpen] = useState(false)
  const [selectedCompany, setSelectedCompany] = useState(null)
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const stats = {
    total: companies.length,
    pending: companies.filter((c) => c.status === '승인대기').length,
    active: companies.filter((c) => c.status === '승인완료').length,
    exportVoucher: companies.filter((c) => c.isExportVoucher).length,
  }

  const filteredCompanies = companies.filter((company) => {
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'pending' && company.status === '승인대기') ||
      (filterStatus === 'approved' && company.status === '승인완료') ||
      (filterStatus === 'rejected' && company.status === '승인거절') ||
      (filterStatus === 'voucher' && company.isExportVoucher)
    const matchesSearch =
      company.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.manager.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.email.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const toggleSelectCompany = (id) => {
    setSelectedCompanies((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    if (selectedCompanies.length === filteredCompanies.length) {
      setSelectedCompanies([])
    } else {
      setSelectedCompanies(filteredCompanies.map((c) => c.id))
    }
  }

  const openDetail = (company) => {
    setSelectedCompany(company)
    setDetailDialogOpen(true)
  }

  const approveCompany = (id) => {
    setCompanies((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: '승인완료' } : c))
    )
    if (selectedCompany?.id === id) {
      setSelectedCompany({ ...selectedCompany, status: '승인완료' })
    }
  }

  const rejectCompany = (id) => {
    setCompanies((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: '승인거절' } : c))
    )
    if (selectedCompany?.id === id) {
      setSelectedCompany({ ...selectedCompany, status: '승인거절' })
    }
  }

  const toggleExportVoucher = (id) => {
    setCompanies((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, isExportVoucher: !c.isExportVoucher } : c
      )
    )
    if (selectedCompany?.id === id) {
      setSelectedCompany({
        ...selectedCompany,
        isExportVoucher: !selectedCompany.isExportVoucher,
      })
    }
  }

  const exportToExcel = () => {
    alert(
      `${selectedCompanies.length > 0 ? selectedCompanies.length + '개' : '전체'} 기업 정보를 엑셀로 내보냅니다.`
    )
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">기업 관리</h1>
          <p className="text-gray-500">
            등록된 광고주(기업) 정보를 관리하세요.
          </p>
        </div>
        <Button variant="outline" onClick={exportToExcel}>
          <Download className="mr-2 h-4 w-4" />
          엑셀 내보내기
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cnec-blue-light flex items-center justify-center">
              <Building2 className="h-5 w-5 text-cnec-blue" />
            </div>
            <div>
              <p className="text-sm text-gray-500">전체 기업</p>
              <p className="text-xl font-bold">{stats.total}개</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning-light flex items-center justify-center">
              <Clock className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-sm text-gray-500">승인 대기</p>
              <p className="text-xl font-bold">{stats.pending}개</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success-light flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-gray-500">활성 기업</p>
              <p className="text-xl font-bold">{stats.active}개</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">
              <Globe className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">수출바우처</p>
              <p className="text-xl font-bold">{stats.exportVoucher}개</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter and Search */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>기업 목록</CardTitle>
          <div className="flex items-center gap-2">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="상태 필터" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체</SelectItem>
                <SelectItem value="pending">승인대기</SelectItem>
                <SelectItem value="approved">승인완료</SelectItem>
                <SelectItem value="rejected">승인거절</SelectItem>
                <SelectItem value="voucher">수출바우처</SelectItem>
              </SelectContent>
            </Select>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="회사명, 담당자명 검색..."
                className="pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox
                    checked={
                      filteredCompanies.length > 0 &&
                      selectedCompanies.length === filteredCompanies.length
                    }
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>회사명</TableHead>
                <TableHead>대표자</TableHead>
                <TableHead>사업자번호</TableHead>
                <TableHead>담당자</TableHead>
                <TableHead>총 집행액</TableHead>
                <TableHead>캠페인</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>가입일</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCompanies.map((company) => (
                <TableRow
                  key={company.id}
                  className="cursor-pointer hover:bg-gray-50"
                  onClick={() => openDetail(company)}
                >
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedCompanies.includes(company.id)}
                      onCheckedChange={() => toggleSelectCompany(company.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {company.name}
                      {company.isExportVoucher && (
                        <Badge variant="purple" className="text-xs">
                          수출바우처
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{company.ceo}</TableCell>
                  <TableCell className="font-mono text-sm">
                    {company.businessNumber}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p>{company.manager}</p>
                      <p className="text-sm text-gray-500">{company.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{formatCurrency(company.totalSpent)}</TableCell>
                  <TableCell>
                    <div>
                      <p>{company.campaigns}건</p>
                      {company.activeCampaigns > 0 && (
                        <p className="text-sm text-green-600">
                          진행중 {company.activeCampaigns}건
                        </p>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(company.status)}</TableCell>
                  <TableCell className="text-gray-500">
                    {formatDate(company.joinDate)}
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openDetail(company)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Company Detail Dialog */}
      <Dialog open={detailDialogOpen} onOpenChange={setDetailDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>기업 상세 정보</DialogTitle>
          </DialogHeader>
          {selectedCompany && (
            <Tabs defaultValue="info">
              <TabsList>
                <TabsTrigger value="info">기본 정보</TabsTrigger>
                <TabsTrigger value="campaigns">캠페인 현황</TabsTrigger>
                <TabsTrigger value="settings">설정</TabsTrigger>
              </TabsList>

              <TabsContent value="info" className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">
                      {selectedCompany.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      {getStatusBadge(selectedCompany.status)}
                      {selectedCompany.isExportVoucher && (
                        <Badge variant="purple">수출바우처</Badge>
                      )}
                    </div>
                  </div>
                  {selectedCompany.status === '승인대기' && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => rejectCompany(selectedCompany.id)}
                      >
                        <XCircle className="mr-1 h-4 w-4" />
                        거절
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => approveCompany(selectedCompany.id)}
                      >
                        <CheckCircle className="mr-1 h-4 w-4" />
                        승인
                      </Button>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <Label className="text-gray-500">대표자</Label>
                    <p className="font-medium">{selectedCompany.ceo}</p>
                  </div>
                  <div className="space-y-1">
                    <Label className="text-gray-500">사업자등록번호</Label>
                    <p className="font-mono">{selectedCompany.businessNumber}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-500">담당자 정보</Label>
                  <div className="p-3 bg-gray-50 rounded-lg space-y-2">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span>{selectedCompany.manager}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span>{selectedCompany.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span>{selectedCompany.managerPhone}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-500">주소</Label>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{selectedCompany.address}</span>
                  </div>
                </div>

                {selectedCompany.website && (
                  <div className="space-y-2">
                    <Label className="text-gray-500">웹사이트</Label>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-gray-400" />
                      <a
                        href={selectedCompany.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-cnec-blue hover:underline"
                      >
                        {selectedCompany.website}
                      </a>
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label className="text-gray-500">가입일 / 최근 활동</Label>
                  <p>
                    {formatDate(selectedCompany.joinDate)} /{' '}
                    {formatDate(selectedCompany.lastActivity)}
                  </p>
                </div>

                {selectedCompany.memo && (
                  <div className="space-y-2">
                    <Label className="text-gray-500">메모</Label>
                    <p className="text-sm p-3 bg-yellow-50 rounded-lg">
                      {selectedCompany.memo}
                    </p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="campaigns" className="mt-4 space-y-4">
                <div className="grid grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <TrendingUp className="h-8 w-8 mx-auto text-cnec-blue mb-2" />
                      <p className="text-2xl font-bold">
                        {formatCurrency(selectedCompany.totalSpent)}
                      </p>
                      <p className="text-sm text-gray-500">총 집행액</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <FileText className="h-8 w-8 mx-auto text-green-500 mb-2" />
                      <p className="text-2xl font-bold">
                        {selectedCompany.campaigns}건
                      </p>
                      <p className="text-sm text-gray-500">
                        총 캠페인 (진행중 {selectedCompany.activeCampaigns}건)
                      </p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <Users className="h-8 w-8 mx-auto text-purple-500 mb-2" />
                      <p className="text-2xl font-bold">
                        {selectedCompany.creators}명
                      </p>
                      <p className="text-sm text-gray-500">참여 크리에이터</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="text-center text-gray-500 py-8">
                  캠페인 상세 내역은 캠페인 관리 페이지에서 확인할 수 있습니다.
                </div>
              </TabsContent>

              <TabsContent value="settings" className="mt-4 space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">수출바우처 사용 기업</p>
                    <p className="text-sm text-gray-500">
                      매출 관리에서 수출바우처로 구분됩니다.
                    </p>
                  </div>
                  <Checkbox
                    checked={selectedCompany.isExportVoucher}
                    onCheckedChange={() =>
                      toggleExportVoucher(selectedCompany.id)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label>관리자 메모</Label>
                  <textarea
                    className="w-full px-3 py-2 border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-cnec-blue"
                    rows={3}
                    placeholder="기업에 대한 메모를 입력하세요"
                    defaultValue={selectedCompany.memo}
                  />
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1">
                    <Mail className="mr-2 h-4 w-4" />
                    이메일 발송
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <FileText className="mr-2 h-4 w-4" />
                    계약서 발송
                  </Button>
                </div>

                {selectedCompany.status === '승인완료' && (
                  <Button
                    variant="destructive"
                    className="w-full"
                    onClick={() => {
                      if (confirm('정말 이 기업을 비활성화하시겠습니까?')) {
                        rejectCompany(selectedCompany.id)
                      }
                    }}
                  >
                    기업 비활성화
                  </Button>
                )}

                {selectedCompany.status === '승인거절' && (
                  <Button
                    className="w-full"
                    onClick={() => approveCompany(selectedCompany.id)}
                  >
                    <CheckCircle className="mr-2 h-4 w-4" />
                    기업 재승인
                  </Button>
                )}
              </TabsContent>
            </Tabs>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
