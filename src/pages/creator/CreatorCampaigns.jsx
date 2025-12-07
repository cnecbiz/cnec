import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { formatCurrency, getDDay } from '@/lib/utils'
import { Search, Filter, Calendar, Users, Heart } from 'lucide-react'

const campaigns = [
  { id: 1, name: '설화수 자음생크림 체험단', brand: '설화수', category: '스킨케어', fee: 600000, deadline: '2024-12-22', applicants: 45, maxApplicants: 10, image: null },
  { id: 2, name: '이니스프리 그린티 세럼', brand: '이니스프리', category: '스킨케어', fee: 350000, deadline: '2024-12-28', applicants: 23, maxApplicants: 15, image: null },
  { id: 3, name: '롬앤 쥬시래스팅 틴트', brand: '롬앤', category: '메이크업', fee: 300000, deadline: '2024-12-30', applicants: 67, maxApplicants: 20, image: null },
  { id: 4, name: '라네즈 네오쿠션', brand: '아모레퍼시픽', category: '메이크업', fee: 450000, deadline: '2024-12-25', applicants: 38, maxApplicants: 12, image: null },
  { id: 5, name: 'COSRX 스네일 무신 에센스', brand: 'COSRX', category: '스킨케어', fee: 400000, deadline: '2024-12-27', applicants: 56, maxApplicants: 15, image: null },
  { id: 6, name: '클리오 킬커버 파운데이션', brand: '클리오', category: '메이크업', fee: 500000, deadline: '2024-12-24', applicants: 82, maxApplicants: 10, image: null },
]

export function CreatorCampaigns() {
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('all')

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">캠페인 탐색</h1>
        <p className="text-gray-500">지금 모집 중인 캠페인에 지원해 보세요.</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="캠페인, 브랜드 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={category} onValueChange={setCategory}>
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
            <Select defaultValue="latest">
              <SelectTrigger className="w-32">
                <SelectValue placeholder="정렬" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="latest">최신순</SelectItem>
                <SelectItem value="deadline">마감임박순</SelectItem>
                <SelectItem value="fee">원고비순</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Campaign Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {campaigns.map((campaign) => (
          <Card key={campaign.id} className="overflow-hidden hover:border-cnec-blue transition-colors cursor-pointer group">
            {/* Image placeholder */}
            <div className="h-40 bg-gradient-to-br from-cnec-blue-light to-gray-100 flex items-center justify-center">
              <span className="text-4xl font-bold text-cnec-blue/20">{campaign.brand[0]}</span>
            </div>

            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <Badge variant="outline" className="text-xs mb-2">{campaign.category}</Badge>
                  <h3 className="font-semibold text-gray-900 group-hover:text-cnec-blue transition-colors">
                    {campaign.name}
                  </h3>
                  <p className="text-sm text-gray-500">{campaign.brand}</p>
                </div>
                <Button variant="ghost" size="icon" className="shrink-0">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mt-4 mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {getDDay(campaign.deadline)}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {campaign.applicants}명 지원
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-cnec-blue">
                  {formatCurrency(campaign.fee)}
                </span>
                <Button size="sm">지원하기</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
