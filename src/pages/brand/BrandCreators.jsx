import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { formatFollowers } from '@/lib/utils'
import {
  Search,
  Filter,
  Heart,
  Star,
  Instagram,
  Youtube,
  MessageSquare,
  Download,
  FileVideo,
  FileCheck,
  ExternalLink,
  Eye,
  X,
  HeartOff,
} from 'lucide-react'

function TiktokIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )
}

// Sample campaign creators data - would come from Supabase
const campaignCreators = [
  {
    id: '1',
    creatorId: 'c1',
    name: '뷰티민지',
    avatar: null,
    followers: 125000,
    platform: 'instagram',
    platformId: '@beauty_minji',
    campaignId: 'camp1',
    campaignName: '비타민C 세럼 리뷰',
    status: 'completed',
    rating: null,
    submittedAt: '2024-12-05',
    originalFileUrl: 'https://storage.example.com/original1.mp4',
    cleanFileUrl: 'https://storage.example.com/clean1.mp4',
    contentUrl: 'https://instagram.com/reel/abc123',
    fee: 400000,
    isFavorite: true,
  },
  {
    id: '2',
    creatorId: 'c2',
    name: '수아뷰티',
    avatar: null,
    followers: 89000,
    platform: 'tiktok',
    platformId: '@sua_beauty',
    campaignId: 'camp1',
    campaignName: '비타민C 세럼 리뷰',
    status: 'completed',
    rating: 5,
    submittedAt: '2024-12-04',
    originalFileUrl: 'https://storage.example.com/original2.mp4',
    cleanFileUrl: 'https://storage.example.com/clean2.mp4',
    contentUrl: 'https://tiktok.com/@sua_beauty/video/123',
    fee: 500000,
    isFavorite: false,
  },
  {
    id: '3',
    creatorId: 'c3',
    name: '예나메이크업',
    avatar: null,
    followers: 210000,
    platform: 'youtube',
    platformId: '@yena_makeup',
    campaignId: 'camp2',
    campaignName: '4주 스킨케어 챌린지',
    status: 'in_progress',
    rating: null,
    submittedAt: null,
    originalFileUrl: null,
    cleanFileUrl: null,
    contentUrl: null,
    fee: 800000,
    isFavorite: true,
  },
  {
    id: '4',
    creatorId: 'c4',
    name: '스킨케어연구소',
    avatar: null,
    followers: 156000,
    platform: 'instagram',
    platformId: '@skincare_lab',
    campaignId: 'camp1',
    campaignName: '비타민C 세럼 리뷰',
    status: 'pending_review',
    rating: null,
    submittedAt: '2024-12-06',
    originalFileUrl: 'https://storage.example.com/original4.mp4',
    cleanFileUrl: null,
    contentUrl: null,
    fee: 400000,
    isFavorite: false,
  },
]

const favoriteCreators = [
  {
    id: 'c1',
    name: '뷰티민지',
    avatar: null,
    followers: 125000,
    platform: 'instagram',
    platformId: '@beauty_minji',
    rating: 4.9,
    campaignCount: 15,
    categories: ['스킨케어', '메이크업'],
    skinType: '복합성',
    isFavorite: true,
  },
  {
    id: 'c3',
    name: '예나메이크업',
    avatar: null,
    followers: 210000,
    platform: 'youtube',
    platformId: '@yena_makeup',
    rating: 4.9,
    campaignCount: 24,
    categories: ['메이크업', '헤어'],
    skinType: '지성',
    isFavorite: true,
  },
]

const platformIcons = {
  instagram: Instagram,
  tiktok: TiktokIcon,
  youtube: Youtube,
}

const statusLabels = {
  pending: { label: '대기중', variant: 'secondary' },
  selected: { label: '선정됨', variant: 'default' },
  in_progress: { label: '진행중', variant: 'warning' },
  pending_review: { label: '검토중', variant: 'outline' },
  completed: { label: '완료', variant: 'success' },
  rejected: { label: '반려', variant: 'destructive' },
}

export function BrandCreators() {
  const [creators, setCreators] = useState(campaignCreators)
  const [favorites, setFavorites] = useState(favoriteCreators)
  const [searchQuery, setSearchQuery] = useState('')
  const [campaignFilter, setCampaignFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  // Rating dialog
  const [ratingDialogOpen, setRatingDialogOpen] = useState(false)
  const [selectedCreator, setSelectedCreator] = useState(null)
  const [rating, setRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)

  // Preview dialog
  const [previewDialogOpen, setPreviewDialogOpen] = useState(false)
  const [previewCreator, setPreviewCreator] = useState(null)

  // Filter creators
  const filteredCreators = creators.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.platformId.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCampaign =
      campaignFilter === 'all' || c.campaignId === campaignFilter
    const matchesStatus =
      statusFilter === 'all' || c.status === statusFilter
    return matchesSearch && matchesCampaign && matchesStatus
  })

  // Toggle favorite
  const toggleFavorite = (creatorId) => {
    setCreators(
      creators.map((c) =>
        c.creatorId === creatorId ? { ...c, isFavorite: !c.isFavorite } : c
      )
    )
    // Update favorites list
    const creator = creators.find((c) => c.creatorId === creatorId)
    if (creator) {
      if (creator.isFavorite) {
        setFavorites(favorites.filter((f) => f.id !== creatorId))
      } else {
        setFavorites([
          ...favorites,
          {
            id: creatorId,
            name: creator.name,
            avatar: creator.avatar,
            followers: creator.followers,
            platform: creator.platform,
            platformId: creator.platformId,
            rating: 0,
            campaignCount: 1,
            categories: [],
            skinType: '',
            isFavorite: true,
          },
        ])
      }
    }
  }

  // Remove from favorites
  const removeFavorite = (creatorId) => {
    setFavorites(favorites.filter((f) => f.id !== creatorId))
    setCreators(
      creators.map((c) =>
        c.creatorId === creatorId ? { ...c, isFavorite: false } : c
      )
    )
  }

  // Open rating dialog
  const openRatingDialog = (creator) => {
    setSelectedCreator(creator)
    setRating(creator.rating || 0)
    setRatingDialogOpen(true)
  }

  // Save rating
  const saveRating = () => {
    if (selectedCreator) {
      setCreators(
        creators.map((c) =>
          c.id === selectedCreator.id ? { ...c, rating } : c
        )
      )
    }
    setRatingDialogOpen(false)
  }

  // Open preview dialog
  const openPreview = (creator) => {
    setPreviewCreator(creator)
    setPreviewDialogOpen(true)
  }

  // Download file
  const downloadFile = (url, fileName) => {
    // In real app, this would trigger a download
    console.log('Downloading:', url, fileName)
    alert(`${fileName} 다운로드가 시작됩니다.`)
  }

  // Unique campaigns for filter
  const uniqueCampaigns = [
    ...new Map(creators.map((c) => [c.campaignId, { id: c.campaignId, name: c.campaignName }])).values(),
  ]

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">크리에이터 현황</h1>
        <p className="text-gray-500">
          캠페인에 참여한 크리에이터를 확인하고 관리하세요.
        </p>
      </div>

      <Tabs defaultValue="campaign">
        <TabsList>
          <TabsTrigger value="campaign">캠페인별 크리에이터</TabsTrigger>
          <TabsTrigger value="favorites">찜한 크리에이터</TabsTrigger>
        </TabsList>

        {/* Campaign Creators Tab */}
        <TabsContent value="campaign" className="mt-4 space-y-4">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="크리에이터 검색..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <Select value={campaignFilter} onValueChange={setCampaignFilter}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="캠페인 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체 캠페인</SelectItem>
                    {uniqueCampaigns.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="상태 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체 상태</SelectItem>
                    <SelectItem value="in_progress">진행중</SelectItem>
                    <SelectItem value="pending_review">검토중</SelectItem>
                    <SelectItem value="completed">완료</SelectItem>
                  </SelectContent>
                </Select>
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
                    <TableHead>캠페인</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead>제출일</TableHead>
                    <TableHead>금액</TableHead>
                    <TableHead>평점</TableHead>
                    <TableHead>파일</TableHead>
                    <TableHead className="text-right">관리</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCreators.map((creator) => {
                    const PlatformIcon =
                      platformIcons[creator.platform] || Instagram
                    return (
                      <TableRow key={creator.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarImage src={creator.avatar} />
                              <AvatarFallback name={creator.name} />
                            </Avatar>
                            <div>
                              <p className="font-medium">{creator.name}</p>
                              <div className="flex items-center gap-1 text-xs text-gray-500">
                                <PlatformIcon className="h-3 w-3" />
                                {creator.platformId}
                                <span className="ml-1">
                                  ({formatFollowers(creator.followers)})
                                </span>
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">
                          {creator.campaignName}
                        </TableCell>
                        <TableCell>
                          <Badge variant={statusLabels[creator.status]?.variant}>
                            {statusLabels[creator.status]?.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-gray-500">
                          {creator.submittedAt || '-'}
                        </TableCell>
                        <TableCell className="font-medium">
                          {creator.fee.toLocaleString()}원
                        </TableCell>
                        <TableCell>
                          {creator.status === 'completed' ? (
                            <button
                              onClick={() => openRatingDialog(creator)}
                              className="flex items-center gap-1 hover:text-yellow-600 transition-colors"
                            >
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-4 w-4 ${
                                    star <= (creator.rating || 0)
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </button>
                          ) : (
                            <span className="text-gray-400 text-sm">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {creator.originalFileUrl && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  downloadFile(
                                    creator.originalFileUrl,
                                    `${creator.name}_원본.mp4`
                                  )
                                }
                                title="원본 파일"
                              >
                                <FileVideo className="h-4 w-4 text-blue-600" />
                              </Button>
                            )}
                            {creator.cleanFileUrl && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() =>
                                  downloadFile(
                                    creator.cleanFileUrl,
                                    `${creator.name}_클린본.mp4`
                                  )
                                }
                                title="클린본 파일"
                              >
                                <FileCheck className="h-4 w-4 text-green-600" />
                              </Button>
                            )}
                            {creator.contentUrl && (
                              <a
                                href={creator.contentUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Button variant="ghost" size="icon" title="게시물 보기">
                                  <ExternalLink className="h-4 w-4" />
                                </Button>
                              </a>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openPreview(creator)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleFavorite(creator.creatorId)}
                            >
                              <Heart
                                className={`h-4 w-4 ${
                                  creator.isFavorite
                                    ? 'fill-red-500 text-red-500'
                                    : ''
                                }`}
                              />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Favorites Tab */}
        <TabsContent value="favorites" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.length === 0 ? (
              <Card className="col-span-full">
                <CardContent className="p-8 text-center text-gray-500">
                  찜한 크리에이터가 없습니다.
                </CardContent>
              </Card>
            ) : (
              favorites.map((creator) => {
                const PlatformIcon =
                  platformIcons[creator.platform] || Instagram
                return (
                  <Card
                    key={creator.id}
                    className="hover:border-cnec-blue transition-colors"
                  >
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
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFavorite(creator.id)}
                        >
                          <HeartOff className="h-4 w-4 text-gray-400" />
                        </Button>
                      </div>

                      {creator.categories?.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-3">
                          {creator.categories.map((cat) => (
                            <Badge key={cat} variant="outline" className="text-xs">
                              {cat}
                            </Badge>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          {creator.rating || '-'}
                        </span>
                        <span>{creator.campaignCount || 0}회 협업</span>
                        {creator.skinType && <span>{creator.skinType}</span>}
                      </div>

                      <div className="flex gap-2">
                        <Button size="sm" className="flex-1">
                          <MessageSquare className="mr-1 h-4 w-4" />
                          제안하기
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
        </TabsContent>
      </Tabs>

      {/* Rating Dialog */}
      <Dialog open={ratingDialogOpen} onOpenChange={setRatingDialogOpen}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>크리에이터 평가</DialogTitle>
          </DialogHeader>
          {selectedCreator && (
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={selectedCreator.avatar} />
                  <AvatarFallback name={selectedCreator.name} />
                </Avatar>
                <div>
                  <p className="font-semibold">{selectedCreator.name}</p>
                  <p className="text-sm text-gray-500">
                    {selectedCreator.campaignName}
                  </p>
                </div>
              </div>
              <div className="flex justify-center py-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="p-1"
                  >
                    <Star
                      className={`h-8 w-8 transition-colors ${
                        star <= (hoverRating || rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
              <p className="text-center text-sm text-gray-500">
                {rating === 0 && '평점을 선택해주세요'}
                {rating === 1 && '매우 불만족'}
                {rating === 2 && '불만족'}
                {rating === 3 && '보통'}
                {rating === 4 && '만족'}
                {rating === 5 && '매우 만족'}
              </p>
            </div>
          )}
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setRatingDialogOpen(false)}
            >
              취소
            </Button>
            <Button onClick={saveRating} disabled={rating === 0}>
              저장
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Preview Dialog */}
      <Dialog open={previewDialogOpen} onOpenChange={setPreviewDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>크리에이터 상세 정보</DialogTitle>
          </DialogHeader>
          {previewCreator && (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={previewCreator.avatar} />
                  <AvatarFallback name={previewCreator.name} />
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{previewCreator.name}</h3>
                  <p className="text-gray-500">{previewCreator.platformId}</p>
                  <p className="text-sm text-gray-500">
                    팔로워 {formatFollowers(previewCreator.followers)}
                  </p>
                </div>
              </div>

              <div className="border rounded-lg p-4 space-y-3">
                <h4 className="font-medium">캠페인 정보</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500">캠페인</p>
                    <p className="font-medium">{previewCreator.campaignName}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">상태</p>
                    <Badge variant={statusLabels[previewCreator.status]?.variant}>
                      {statusLabels[previewCreator.status]?.label}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-gray-500">금액</p>
                    <p className="font-medium">
                      {previewCreator.fee.toLocaleString()}원
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">제출일</p>
                    <p className="font-medium">
                      {previewCreator.submittedAt || '-'}
                    </p>
                  </div>
                </div>
              </div>

              {(previewCreator.originalFileUrl || previewCreator.cleanFileUrl) && (
                <div className="border rounded-lg p-4 space-y-3">
                  <h4 className="font-medium">파일 다운로드</h4>
                  <div className="flex gap-2">
                    {previewCreator.originalFileUrl && (
                      <Button
                        variant="outline"
                        onClick={() =>
                          downloadFile(
                            previewCreator.originalFileUrl,
                            `${previewCreator.name}_원본.mp4`
                          )
                        }
                      >
                        <FileVideo className="mr-2 h-4 w-4" />
                        원본 파일
                      </Button>
                    )}
                    {previewCreator.cleanFileUrl && (
                      <Button
                        variant="outline"
                        onClick={() =>
                          downloadFile(
                            previewCreator.cleanFileUrl,
                            `${previewCreator.name}_클린본.mp4`
                          )
                        }
                      >
                        <FileCheck className="mr-2 h-4 w-4" />
                        클린본 파일
                      </Button>
                    )}
                  </div>
                </div>
              )}

              {previewCreator.contentUrl && (
                <div className="border rounded-lg p-4">
                  <h4 className="font-medium mb-2">게시물</h4>
                  <a
                    href={previewCreator.contentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <ExternalLink className="h-4 w-4" />
                    게시물 보기
                  </a>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setPreviewDialogOpen(false)}>닫기</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
