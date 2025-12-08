import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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
import { formatCurrency, getDDay } from '@/lib/utils'
import { Search, Filter, Plus, MoreHorizontal } from 'lucide-react'

// 목업 데이터
const campaigns = [
  {
    id: 'CP-2024-001',
    name: '에스티로더 더블웨어 숏폼',
    brand: '에스티로더',
    category: '메이크업',
    status: '모집중',
    applicants: 45,
    target: 20,
    fee: 500000,
    totalBudget: 10000000,
    createdAt: '2024-12-01',
    deadline: '2024-12-20',
  },
  {
    id: 'CP-2024-002',
    name: '라네즈 립슬리핑마스크 챌린지',
    brand: '아모레퍼시픽',
    category: '스킨케어',
    status: '선정완료',
    applicants: 30,
    target: 10,
    fee: 400000,
    totalBudget: 4000000,
    createdAt: '2024-11-28',
    deadline: '2024-12-18',
  },
  {
    id: 'CP-2024-003',
    name: '헤라 블랙쿠션 리뷰',
    brand: '헤라',
    category: '메이크업',
    status: '제작중',
    applicants: 15,
    target: 15,
    fee: 450000,
    totalBudget: 6750000,
    createdAt: '2024-11-25',
    deadline: '2024-12-15',
  },
  {
    id: 'CP-2024-004',
    name: '설화수 자음생크림 체험단',
    brand: '설화수',
    category: '스킨케어',
    status: '검수중',
    applicants: 8,
    target: 8,
    fee: 600000,
    totalBudget: 4800000,
    createdAt: '2024-11-20',
    deadline: '2024-12-12',
  },
  {
    id: 'CP-2024-005',
    name: '이니스프리 그린티 세럼',
    brand: '이니스프리',
    category: '스킨케어',
    status: '완료',
    applicants: 20,
    target: 20,
    fee: 350000,
    totalBudget: 7000000,
    createdAt: '2024-11-15',
    deadline: '2024-12-05',
  },
]

const statusColors = {
  '임시저장': 'secondary',
  '모집중': 'blue',
  '선정완료': 'success',
  '제작중': 'warning',
  '검수중': 'secondary',
  '완료': 'success',
  '취소': 'error',
}

export function AdminCampaigns() {
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">캠페인 관리</h1>
          <p className="text-gray-500">등록된 캠페인을 관리하고 진행 상황을 확인하세요.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          대리 등록
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="recruiting">모집중</TabsTrigger>
          <TabsTrigger value="selected">선정완료</TabsTrigger>
          <TabsTrigger value="production">제작중</TabsTrigger>
          <TabsTrigger value="review">검수중</TabsTrigger>
          <TabsTrigger value="completed">완료</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          {/* Filters */}
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="캠페인명, 광고주명 검색..." className="pl-9" />
                </div>
                <Select defaultValue="all">
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="카테고리" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체 카테고리</SelectItem>
                    <SelectItem value="skincare">스킨케어</SelectItem>
                    <SelectItem value="makeup">메이크업</SelectItem>
                    <SelectItem value="haircare">헤어케어</SelectItem>
                    <SelectItem value="bodycare">바디케어</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  더 많은 필터
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Campaign Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>캠페인 ID</TableHead>
                    <TableHead>캠페인명</TableHead>
                    <TableHead>광고주</TableHead>
                    <TableHead>카테고리</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead>지원/모집</TableHead>
                    <TableHead>원고비</TableHead>
                    <TableHead>마감</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.map((campaign) => (
                    <TableRow key={campaign.id} className="cursor-pointer hover:bg-gray-50">
                      <TableCell className="font-mono text-sm text-gray-500">
                        {campaign.id}
                      </TableCell>
                      <TableCell>
                        <p className="font-medium">{campaign.name}</p>
                      </TableCell>
                      <TableCell>{campaign.brand}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{campaign.category}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusColors[campaign.status]}>
                          {campaign.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {campaign.applicants}/{campaign.target}명
                      </TableCell>
                      <TableCell>{formatCurrency(campaign.fee)}</TableCell>
                      <TableCell>
                        <span
                          className={
                            getDDay(campaign.deadline).startsWith('D-') &&
                            parseInt(getDDay(campaign.deadline).slice(2)) <= 3
                              ? 'text-error font-medium'
                              : 'text-gray-500'
                          }
                        >
                          {getDDay(campaign.deadline)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {['recruiting', 'selected', 'production', 'review', 'completed'].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-4">
            <Card>
              <CardContent className="p-8 text-center text-gray-500">
                해당 상태의 캠페인 목록이 여기에 표시됩니다.
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
