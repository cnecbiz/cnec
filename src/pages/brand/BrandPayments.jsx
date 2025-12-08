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
import { Download, Receipt, FileText } from 'lucide-react'

const payments = [
  { id: 'PAY-2024-001', campaign: '에스티로더 더블웨어 숏폼', amount: 10000000, method: '신용카드', status: '완료', date: '2024-12-05' },
  { id: 'PAY-2024-002', campaign: '라네즈 립슬리핑마스크', amount: 4000000, method: '계좌이체', status: '완료', date: '2024-11-28' },
  { id: 'PAY-2024-003', campaign: '헤라 블랙쿠션 리뷰', amount: 6750000, method: '카카오페이', status: '완료', date: '2024-11-20' },
]

export function BrandPayments() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">결제 내역</h1>
          <p className="text-gray-500">캠페인 결제 내역을 확인하고 세금계산서를 다운로드하세요.</p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">이번 달 결제</p>
            <p className="text-2xl font-bold">{formatCurrency(10000000)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">총 집행 금액</p>
            <p className="text-2xl font-bold">{formatCurrency(45000000)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">진행 중인 캠페인</p>
            <p className="text-2xl font-bold">3건</p>
          </CardContent>
        </Card>
      </div>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>결제 내역</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>결제 ID</TableHead>
                <TableHead>캠페인</TableHead>
                <TableHead>결제 금액</TableHead>
                <TableHead>결제 수단</TableHead>
                <TableHead>상태</TableHead>
                <TableHead>결제일</TableHead>
                <TableHead>서류</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-mono text-sm">{payment.id}</TableCell>
                  <TableCell>{payment.campaign}</TableCell>
                  <TableCell className="font-medium">{formatCurrency(payment.amount)}</TableCell>
                  <TableCell>{payment.method}</TableCell>
                  <TableCell>
                    <Badge variant="success">{payment.status}</Badge>
                  </TableCell>
                  <TableCell className="text-gray-500">{formatDate(payment.date)}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Receipt className="h-4 w-4 mr-1" />
                        영수증
                      </Button>
                      <Button variant="ghost" size="sm">
                        <FileText className="h-4 w-4 mr-1" />
                        세금계산서
                      </Button>
                    </div>
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
