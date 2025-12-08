import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { formatCurrency, getDDay } from '@/lib/utils'
import { Plus, Calendar, Users, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const campaigns = [
  { id: 1, name: '에스티로더 더블웨어 숏폼', status: '모집중', progress: 60, applicants: 12, target: 20, fee: 500000, deadline: '2024-12-20' },
  { id: 2, name: '라네즈 립슬리핑마스크', status: '제작중', progress: 40, completed: 4, total: 10, fee: 400000, deadline: '2024-12-25' },
  { id: 3, name: '헤라 블랙쿠션 리뷰', status: '검수중', progress: 80, approved: 6, total: 8, fee: 450000, deadline: '2024-12-15' },
]

const statusColors = {
  '임시저장': 'secondary',
  '모집중': 'blue',
  '선정완료': 'success',
  '제작중': 'warning',
  '검수중': 'secondary',
  '완료': 'success',
}

export function BrandCampaigns() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">캠페인 관리</h1>
          <p className="text-gray-500">등록된 캠페인을 관리하고 진행 상황을 확인하세요.</p>
        </div>
        <Button asChild>
          <Link to="/brand/campaigns/new">
            <Plus className="mr-2 h-4 w-4" />
            새 캠페인 등록
          </Link>
        </Button>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">전체</TabsTrigger>
          <TabsTrigger value="recruiting">모집중</TabsTrigger>
          <TabsTrigger value="production">제작중</TabsTrigger>
          <TabsTrigger value="review">검수중</TabsTrigger>
          <TabsTrigger value="completed">완료</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          <div className="grid gap-4">
            {campaigns.map((campaign) => (
              <Card key={campaign.id} className="hover:border-cnec-blue transition-colors cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                      <div className="flex items-center gap-3 mt-2">
                        <Badge variant={statusColors[campaign.status]}>{campaign.status}</Badge>
                        <span className="text-sm text-gray-500 flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {getDDay(campaign.deadline)}
                        </span>
                        <span className="text-sm text-gray-500 flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {campaign.status === '모집중' ? `${campaign.applicants}/${campaign.target}명 지원` : `${campaign.total}명`}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-cnec-blue">{formatCurrency(campaign.fee)}</p>
                      <p className="text-sm text-gray-500">1인당 원고비</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">진행률</span>
                      <span className="font-medium">{campaign.progress}%</span>
                    </div>
                    <Progress value={campaign.progress} />
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button variant="ghost" size="sm">
                      상세보기 <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {['recruiting', 'production', 'review', 'completed'].map((tab) => (
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
