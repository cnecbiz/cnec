import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Search, Building2, CheckCircle, Clock, MoreHorizontal } from 'lucide-react'

const companies = [
  { id: 1, name: '(주)에스티로더 코리아', ceo: '김대표', businessNumber: '123-45-67890', manager: '이마케터', email: 'marketing@esteelauder.kr', totalSpent: 45000000, campaigns: 8, status: '승인완료', joinDate: '2024-06-15' },
  { id: 2, name: '아모레퍼시픽', ceo: '서경배', businessNumber: '111-22-33333', manager: '박담당', email: 'brand@amorepacific.com', totalSpent: 120000000, campaigns: 24, status: '승인완료', joinDate: '2024-03-10' },
  { id: 3, name: '(주)코스맥스', ceo: '이경수', businessNumber: '555-66-77777', manager: '최매니저', email: 'manager@cosmax.com', totalSpent: 0, campaigns: 0, status: '승인대기', joinDate: '2024-12-07' },
]

export function AdminCompanies() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">기업 관리</h1>
          <p className="text-gray-500">등록된 광고주(기업) 정보를 관리하세요.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cnec-blue-light flex items-center justify-center">
              <Building2 className="h-5 w-5 text-cnec-blue" />
            </div>
            <div>
              <p className="text-sm text-gray-500">전체 기업</p>
              <p className="text-xl font-bold">156개</p>
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
              <p className="text-xl font-bold">3개</p>
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
              <p className="text-xl font-bold">142개</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle>기업 목록</CardTitle>
          <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input placeholder="회사명, 담당자명 검색..." className="pl-9" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
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
              {companies.map((company) => (
                <TableRow key={company.id} className="cursor-pointer hover:bg-gray-50">
                  <TableCell className="font-medium">{company.name}</TableCell>
                  <TableCell>{company.ceo}</TableCell>
                  <TableCell className="font-mono text-sm">{company.businessNumber}</TableCell>
                  <TableCell>
                    <div>
                      <p>{company.manager}</p>
                      <p className="text-sm text-gray-500">{company.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>{formatCurrency(company.totalSpent)}</TableCell>
                  <TableCell>{company.campaigns}건</TableCell>
                  <TableCell>
                    <Badge variant={company.status === '승인완료' ? 'success' : 'warning'}>
                      {company.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-500">{formatDate(company.joinDate)}</TableCell>
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
    </div>
  )
}
