import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
import { Download, CheckCircle, Clock, XCircle } from 'lucide-react'

const withdrawalRequests = [
  { id: 1, creator: '뷰티민지', amount: 300000, bank: '카카오뱅크', account: '3333-01-1234567', status: '대기', requestedAt: '2024-12-07' },
  { id: 2, creator: '수아뷰티', amount: 500000, bank: '신한은행', account: '110-123-456789', status: '대기', requestedAt: '2024-12-07' },
  { id: 3, creator: '예나메이크업', amount: 1000000, bank: '국민은행', account: '123456-12-123456', status: '처리중', requestedAt: '2024-12-06' },
]

const statusConfig = {
  '대기': { icon: Clock, color: 'warning' },
  '처리중': { icon: Clock, color: 'blue' },
  '완료': { icon: CheckCircle, color: 'success' },
  '반려': { icon: XCircle, color: 'error' },
}

export function AdminPoints() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">포인트/출금 관리</h1>
          <p className="text-gray-500">크리에이터 출금 요청을 처리하세요.</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          은행 이체용 엑셀
        </Button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">대기 중인 요청</p>
            <p className="text-2xl font-bold text-warning">8건</p>
            <p className="text-sm text-gray-500">{formatCurrency(4500000)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">오늘 처리 완료</p>
            <p className="text-2xl font-bold text-success">12건</p>
            <p className="text-sm text-gray-500">{formatCurrency(8200000)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">이번 달 총 출금</p>
            <p className="text-2xl font-bold">156건</p>
            <p className="text-sm text-gray-500">{formatCurrency(125000000)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Withdrawal Requests */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>출금 요청 목록</CardTitle>
          <Button size="sm">선택 건 일괄 승인</Button>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <input type="checkbox" className="rounded" />
                </TableHead>
                <TableHead>크리에이터</TableHead>
                <TableHead>금액</TableHead>
                <TableHead>은행</TableHead>
                <TableHead>계좌번호</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>요청일</TableHead>
                <TableHead>작업</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {withdrawalRequests.map((request) => {
                const StatusIcon = statusConfig[request.status]?.icon || Clock
                return (
                  <TableRow key={request.id}>
                    <TableCell>
                      <input type="checkbox" className="rounded" />
                    </TableCell>
                    <TableCell className="font-medium">{request.creator}</TableCell>
                    <TableCell>{formatCurrency(request.amount)}</TableCell>
                    <TableCell>{request.bank}</TableCell>
                    <TableCell className="font-mono text-sm">{request.account}</TableCell>
                    <TableCell>
                      <Badge variant={statusConfig[request.status]?.color}>
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-500">{formatDate(request.requestedAt)}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">승인</Button>
                        <Button size="sm" variant="ghost" className="text-error">반려</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
