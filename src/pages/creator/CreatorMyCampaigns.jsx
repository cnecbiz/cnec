import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { formatCurrency, getDDay } from '@/lib/utils'
import { Calendar, Package, Upload, Clock, CheckCircle, ExternalLink } from 'lucide-react'

const myCampaigns = [
  { id: 1, name: '라네즈 립슬리핑마스크 리뷰', brand: '아모레퍼시픽', status: 'delivery', fee: 400000, deadline: '2024-12-25', trackingNumber: '1234567890', step: 2, totalSteps: 5 },
  { id: 2, name: '에스티로더 더블웨어 파운데이션', brand: '에스티로더', status: 'production', fee: 500000, deadline: '2024-12-20', step: 3, totalSteps: 5 },
  { id: 3, name: '헤라 블랙쿠션 리뷰', brand: '헤라', status: 'review', fee: 350000, deadline: '2024-12-15', step: 4, totalSteps: 5, uploadedAt: '2024-12-10' },
]

const statusConfig = {
  applied: { label: '지원 중', icon: Clock, color: 'secondary' },
  selected: { label: '선정됨', icon: CheckCircle, color: 'success' },
  delivery: { label: '제품 수령 대기', icon: Package, color: 'warning' },
  production: { label: '콘텐츠 제작', icon: Upload, color: 'blue' },
  review: { label: '검수 대기', icon: Clock, color: 'secondary' },
  completed: { label: '완료', icon: CheckCircle, color: 'success' },
  rejected: { label: '미선정', icon: Clock, color: 'error' },
}

export function CreatorMyCampaigns() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">내 캠페인</h1>
        <p className="text-gray-500">지원한 캠페인과 진행 상황을 확인하세요.</p>
      </div>

      <Tabs defaultValue="ongoing">
        <TabsList>
          <TabsTrigger value="ongoing">진행 중</TabsTrigger>
          <TabsTrigger value="applied">지원 중</TabsTrigger>
          <TabsTrigger value="completed">완료</TabsTrigger>
          <TabsTrigger value="rejected">미선정</TabsTrigger>
        </TabsList>

        <TabsContent value="ongoing" className="mt-4">
          <div className="space-y-4">
            {myCampaigns.map((campaign) => {
              const status = statusConfig[campaign.status]
              const StatusIcon = status?.icon || Clock
              return (
                <Card key={campaign.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                        <p className="text-gray-500">{campaign.brand}</p>
                      </div>
                      <Badge variant="blue">{formatCurrency(campaign.fee)}</Badge>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <Badge variant={status?.color}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {status?.label}
                      </Badge>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        마감 {getDDay(campaign.deadline)}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">진행률</span>
                        <span className="font-medium">{campaign.step}/{campaign.totalSteps} 단계</span>
                      </div>
                      <Progress value={(campaign.step / campaign.totalSteps) * 100} />
                    </div>

                    {/* Status-specific content */}
                    {campaign.status === 'delivery' && campaign.trackingNumber && (
                      <div className="p-3 bg-gray-50 rounded-lg mb-4">
                        <p className="text-sm text-gray-500">운송장 번호</p>
                        <div className="flex items-center justify-between">
                          <p className="font-mono font-medium">{campaign.trackingNumber}</p>
                          <Button variant="link" size="sm" className="text-cnec-blue">
                            배송 조회 <ExternalLink className="ml-1 h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {campaign.status === 'production' && (
                      <div className="flex gap-2">
                        <Button className="flex-1">
                          <Upload className="mr-2 h-4 w-4" />
                          콘텐츠 업로드
                        </Button>
                        <Button variant="outline">가이드라인 보기</Button>
                      </div>
                    )}

                    {campaign.status === 'review' && (
                      <div className="p-3 bg-cnec-blue-light rounded-lg">
                        <p className="text-sm text-cnec-blue">
                          업로드한 콘텐츠를 검수 중입니다. 검수가 완료되면 알림을 보내드립니다.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {['applied', 'completed', 'rejected'].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-4">
            <Card>
              <CardContent className="p-8 text-center text-gray-500">
                해당 상태의 캠페인이 여기에 표시됩니다.
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}
