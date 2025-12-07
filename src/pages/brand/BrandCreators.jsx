import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { formatFollowers } from '@/lib/utils'
import { Search, Filter, Heart, Star, Instagram, Youtube, MessageSquare } from 'lucide-react'

function TiktokIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )
}

const creators = [
  { id: 1, name: '뷰티민지', avatar: null, followers: 125000, platform: 'instagram', rating: 4.9, campaigns: 15, categories: ['스킨케어', '메이크업'], skinType: '복합성' },
  { id: 2, name: '수아뷰티', avatar: null, followers: 89000, platform: 'tiktok', rating: 4.8, campaigns: 8, categories: ['메이크업'], skinType: '건성' },
  { id: 3, name: '예나메이크업', avatar: null, followers: 210000, platform: 'youtube', rating: 4.9, campaigns: 24, categories: ['메이크업', '헤어'], skinType: '지성' },
  { id: 4, name: '스킨케어연구소', avatar: null, followers: 156000, platform: 'instagram', rating: 4.7, campaigns: 12, categories: ['스킨케어'], skinType: '민감성' },
]

const platformIcons = {
  instagram: Instagram,
  tiktok: TiktokIcon,
  youtube: Youtube,
}

export function BrandCreators() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">크리에이터 현황</h1>
        <p className="text-gray-500">캠페인에 참여한 크리에이터를 확인하고 관리하세요.</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="크리에이터 검색..." className="pl-9" />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              필터
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Creator Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {creators.map((creator) => {
          const PlatformIcon = platformIcons[creator.platform] || Instagram
          return (
            <Card key={creator.id} className="hover:border-cnec-blue transition-colors">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={creator.avatar} />
                      <AvatarFallback name={creator.name} />
                    </Avatar>
                    <div>
                      <p className="font-semibold">{creator.name}</p>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <PlatformIcon className="h-4 w-4" />
                        {formatFollowers(creator.followers)}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-1 mb-3">
                  {creator.categories.map((cat) => (
                    <Badge key={cat} variant="outline" className="text-xs">{cat}</Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-warning fill-warning" />
                    {creator.rating}
                  </span>
                  <span>{creator.campaigns}회 협업</span>
                  <span>{creator.skinType}</span>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Heart className="mr-1 h-4 w-4" />
                    찜하기
                  </Button>
                  <Button size="sm" className="flex-1">
                    <MessageSquare className="mr-1 h-4 w-4" />
                    제안하기
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
