import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { formatFollowers, formatCurrency, formatDate } from '@/lib/utils'
import {
  Search,
  Filter,
  Download,
  Upload,
  Plus,
  Star,
  Instagram,
  Youtube,
  MoreHorizontal,
  ExternalLink,
} from 'lucide-react'

// TikTok 아이콘
function TiktokIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )
}

// 목업 데이터
const creators = [
  {
    id: 1,
    name: '뷰티민지',
    email: 'minji@email.com',
    avatar: null,
    tier: 'Gold',
    campaigns: 15,
    points: 2500000,
    totalEarnings: 7500000,
    rating: 4.9,
    joinDate: '2024-06-15',
    social: { instagram: '@beautyminji', tiktok: '@beautyminji', youtube: null },
    followers: { instagram: 125000, tiktok: 89000, youtube: 0 },
  },
  {
    id: 2,
    name: '수아뷰티',
    email: 'sua@email.com',
    avatar: null,
    tier: 'Silver',
    campaigns: 8,
    points: 800000,
    totalEarnings: 3200000,
    rating: 4.8,
    joinDate: '2024-08-20',
    social: { instagram: '@suabeauty', tiktok: '@suabeauty', youtube: '@suabeauty' },
    followers: { instagram: 45000, tiktok: 120000, youtube: 25000 },
  },
  {
    id: 3,
    name: '예나메이크업',
    email: 'yena@email.com',
    avatar: null,
    tier: 'Platinum',
    campaigns: 24,
    points: 5000000,
    totalEarnings: 15000000,
    rating: 4.9,
    joinDate: '2024-03-10',
    social: { instagram: '@yenamakeup', tiktok: null, youtube: '@yenamakeup' },
    followers: { instagram: 210000, tiktok: 0, youtube: 180000 },
  },
]

const tierColors = {
  Bronze: 'bg-amber-100 text-amber-800',
  Silver: 'bg-gray-100 text-gray-800',
  Gold: 'bg-yellow-100 text-yellow-800',
  Platinum: 'bg-purple-100 text-purple-800',
}

export function AdminCreators() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTier, setSelectedTier] = useState('all')

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">크리에이터 관리</h1>
          <p className="text-gray-500">등록된 크리에이터를 관리하고 추천 크리에이터를 설정하세요.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Upload className="mr-2 h-4 w-4" />
            엑셀 업로드
          </Button>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            엑셀 다운로드
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            크리에이터 추가
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">전체 크리에이터</TabsTrigger>
          <TabsTrigger value="recommended">추천 크리에이터</TabsTrigger>
          <TabsTrigger value="affiliated">소속 크리에이터</TabsTrigger>
          <TabsTrigger value="youtube">유튜브 지원</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-4">
          {/* Filters */}
          <Card className="mb-4">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="이름, 이메일, SNS 검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Select value={selectedTier} onValueChange={setSelectedTier}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="등급" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체 등급</SelectItem>
                    <SelectItem value="Bronze">Bronze</SelectItem>
                    <SelectItem value="Silver">Silver</SelectItem>
                    <SelectItem value="Gold">Gold</SelectItem>
                    <SelectItem value="Platinum">Platinum</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  더 많은 필터
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Creator Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>크리에이터</TableHead>
                    <TableHead>SNS</TableHead>
                    <TableHead>등급</TableHead>
                    <TableHead>캠페인</TableHead>
                    <TableHead>포인트</TableHead>
                    <TableHead>총 수익</TableHead>
                    <TableHead>평점</TableHead>
                    <TableHead>가입일</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {creators.map((creator) => (
                    <TableRow key={creator.id} className="cursor-pointer hover:bg-gray-50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={creator.avatar} />
                            <AvatarFallback name={creator.name} />
                          </Avatar>
                          <div>
                            <p className="font-medium">{creator.name}</p>
                            <p className="text-sm text-gray-500">{creator.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {creator.social.instagram && (
                            <a href="#" className="text-gray-400 hover:text-pink-500">
                              <Instagram className="h-4 w-4" />
                            </a>
                          )}
                          {creator.social.tiktok && (
                            <a href="#" className="text-gray-400 hover:text-gray-900">
                              <TiktokIcon className="h-4 w-4" />
                            </a>
                          )}
                          {creator.social.youtube && (
                            <a href="#" className="text-gray-400 hover:text-red-500">
                              <Youtube className="h-4 w-4" />
                            </a>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={tierColors[creator.tier]}>{creator.tier}</Badge>
                      </TableCell>
                      <TableCell>{creator.campaigns}회</TableCell>
                      <TableCell>{formatCurrency(creator.points)}</TableCell>
                      <TableCell>{formatCurrency(creator.totalEarnings)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-warning fill-warning" />
                          <span>{creator.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-500">
                        {formatDate(creator.joinDate)}
                      </TableCell>
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
        </TabsContent>

        <TabsContent value="recommended" className="mt-4">
          <Card>
            <CardContent className="p-8 text-center text-gray-500">
              추천 크리에이터 관리 기능이 곧 추가됩니다.
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="affiliated" className="mt-4">
          <Card>
            <CardContent className="p-8 text-center text-gray-500">
              소속 크리에이터 관리 기능이 곧 추가됩니다.
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="youtube" className="mt-4">
          <Card>
            <CardContent className="p-8 text-center text-gray-500">
              유튜브 지원 크리에이터 관리 기능이 곧 추가됩니다.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
