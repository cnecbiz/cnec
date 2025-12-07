import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatCurrency } from '@/lib/utils'
import { Download, Plus, TrendingUp, TrendingDown, Wallet, Receipt } from 'lucide-react'

export function AdminRevenue() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">매출 관리</h1>
          <p className="text-gray-500">매출 현황을 확인하고 비용을 관리하세요.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            리포트 다운로드
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            매출 수동 입력
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-cnec-blue-light flex items-center justify-center">
                <Wallet className="h-5 w-5 text-cnec-blue" />
              </div>
              <div>
                <p className="text-sm text-gray-500">이번 달 매출</p>
                <p className="text-xl font-bold">{formatCurrency(245000000)}</p>
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
                <p className="text-sm text-gray-500">전월 대비</p>
                <p className="text-xl font-bold text-success">+12.5%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-warning-light flex items-center justify-center">
                <Receipt className="h-5 w-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-gray-500">이번 달 비용</p>
                <p className="text-xl font-bold">{formatCurrency(85000000)}</p>
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
                <p className="text-xl font-bold">{formatCurrency(160000000)}</p>
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

        <TabsContent value="revenue" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>매출 내역</CardTitle>
            </CardHeader>
            <CardContent className="p-8 text-center text-gray-500">
              매출 내역 테이블이 여기에 표시됩니다.
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expense" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>비용 관리</CardTitle>
            </CardHeader>
            <CardContent className="p-8 text-center text-gray-500">
              비용 관리 기능이 여기에 표시됩니다.
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="summary" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>손익 요약</CardTitle>
            </CardHeader>
            <CardContent className="p-8 text-center text-gray-500">
              손익 요약 리포트가 여기에 표시됩니다.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
