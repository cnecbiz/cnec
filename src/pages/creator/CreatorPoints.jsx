import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { formatCurrency, formatDate } from '@/lib/utils'
import { Wallet, TrendingUp, ArrowDownToLine, ArrowUpFromLine } from 'lucide-react'

const pointHistory = [
  { id: 1, type: 'earn', description: '라네즈 립슬리핑마스크 캠페인 완료', amount: 400000, date: '2024-12-05', status: '완료' },
  { id: 2, type: 'withdraw', description: '출금', amount: -300000, date: '2024-12-03', status: '완료' },
  { id: 3, type: 'earn', description: '에스티로더 더블웨어 캠페인 완료', amount: 500000, date: '2024-11-28', status: '완료' },
  { id: 4, type: 'withdraw', description: '출금', amount: -200000, date: '2024-11-25', status: '완료' },
]

export function CreatorPoints() {
  const [withdrawAmount, setWithdrawAmount] = useState('')
  const currentPoints = 450000

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">포인트/정산</h1>
        <p className="text-gray-500">적립된 포인트를 확인하고 출금을 신청하세요.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-cnec-blue to-cnec-blue-dark text-white">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <Wallet className="h-5 w-5" />
              <span className="text-sm text-white/70">보유 포인트</span>
            </div>
            <p className="text-3xl font-bold">{formatCurrency(currentPoints)}</p>
            <div className="flex gap-2 mt-4">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="bg-white text-cnec-blue hover:bg-gray-100">
                    출금 신청
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>출금 신청</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500">출금 가능 금액</p>
                      <p className="text-2xl font-bold text-cnec-blue">{formatCurrency(currentPoints)}</p>
                    </div>
                    <div className="space-y-2">
                      <Label>출금 금액</Label>
                      <Input
                        type="number"
                        placeholder="출금할 금액을 입력하세요"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                      />
                      <p className="text-xs text-gray-500">최소 출금 금액: 10,000원</p>
                    </div>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-500 mb-1">출금 계좌</p>
                      <p className="font-medium">카카오뱅크 3333-01-1234567</p>
                      <p className="text-sm text-gray-500">예금주: 홍길동</p>
                    </div>
                    <Button className="w-full">출금 신청</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="h-5 w-5 text-success" />
              <span className="text-sm text-gray-500">이번 달 수익</span>
            </div>
            <p className="text-2xl font-bold">{formatCurrency(900000)}</p>
            <p className="text-sm text-success mt-2">+23% 전월 대비</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-2">
              <ArrowDownToLine className="h-5 w-5 text-gray-500" />
              <span className="text-sm text-gray-500">총 출금액</span>
            </div>
            <p className="text-2xl font-bold">{formatCurrency(7500000)}</p>
            <p className="text-sm text-gray-500 mt-2">누적 15회</p>
          </CardContent>
        </Card>
      </div>

      {/* Point History */}
      <Card>
        <CardHeader>
          <CardTitle>포인트 내역</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all">
            <TabsList>
              <TabsTrigger value="all">전체</TabsTrigger>
              <TabsTrigger value="earn">적립</TabsTrigger>
              <TabsTrigger value="withdraw">출금</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>구분</TableHead>
                    <TableHead>내용</TableHead>
                    <TableHead>금액</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead>일시</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pointHistory.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        {item.type === 'earn' ? (
                          <Badge variant="blue" className="flex items-center gap-1 w-fit">
                            <ArrowUpFromLine className="h-3 w-3" />
                            적립
                          </Badge>
                        ) : (
                          <Badge variant="secondary" className="flex items-center gap-1 w-fit">
                            <ArrowDownToLine className="h-3 w-3" />
                            출금
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell className={item.type === 'earn' ? 'text-cnec-blue font-medium' : 'text-gray-500'}>
                        {item.type === 'earn' ? '+' : ''}{formatCurrency(item.amount)}
                      </TableCell>
                      <TableCell>
                        <Badge variant={item.status === '완료' ? 'success' : 'warning'}>
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-500">{formatDate(item.date)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>

            <TabsContent value="earn" className="mt-4">
              <p className="text-center text-gray-500 py-8">적립 내역이 여기에 표시됩니다.</p>
            </TabsContent>

            <TabsContent value="withdraw" className="mt-4">
              <p className="text-center text-gray-500 py-8">출금 내역이 여기에 표시됩니다.</p>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
