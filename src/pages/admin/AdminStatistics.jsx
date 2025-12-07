import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Download, Users, Megaphone, TrendingUp } from 'lucide-react'

export function AdminStatistics() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">통계</h1>
          <p className="text-gray-500">플랫폼 이용 통계를 확인하세요.</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          리포트 다운로드
        </Button>
      </div>

      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">사용자 통계</TabsTrigger>
          <TabsTrigger value="campaigns">캠페인 통계</TabsTrigger>
          <TabsTrigger value="revenue">매출 통계</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">총 크리에이터</p>
                <p className="text-2xl font-bold">5,234명</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">총 광고주</p>
                <p className="text-2xl font-bold">412개</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-sm text-gray-500">이번 달 신규 가입</p>
                <p className="text-2xl font-bold">+156명</p>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                사용자 분포
              </CardTitle>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center text-gray-500">
              연령/성별/SNS별 분포 차트가 여기에 표시됩니다.
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="campaigns" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Megaphone className="h-5 w-5" />
                캠페인 현황
              </CardTitle>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center text-gray-500">
              카테고리별 현황, 평균 지원자, 완료율 등의 차트가 여기에 표시됩니다.
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="revenue" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                매출 추이
              </CardTitle>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center text-gray-500">
              기간별 매출 추이, 광고주별 순위 등의 차트가 여기에 표시됩니다.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
