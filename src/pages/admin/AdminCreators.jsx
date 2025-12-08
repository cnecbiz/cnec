import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
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
import { Checkbox } from '@/components/ui/checkbox'
import { formatCurrency, formatDate } from '@/lib/utils'
import { toast } from '@/stores/uiStore'
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
  Trash2,
  Edit,
  Eye,
  AlertCircle,
  Send,
  X,
  Check,
} from 'lucide-react'

// TikTok 아이콘
function TiktokIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )
}

// 목업 데이터 - 전체 크리에이터
const allCreators = [
  {
    id: 1,
    name: '뷰티민지',
    email: 'minji@email.com',
    phone: '010-1234-5678',
    avatar: null,
    grade: 'gold',
    campaigns: 15,
    points: 2500000,
    totalEarnings: 7500000,
    rating: 4.9,
    joinDate: '2024-06-15',
    instagram: '@beautyminji',
    instagramUrl: 'https://instagram.com/beautyminji',
    instagramFollowers: 125000,
    tiktok: '@beautyminji',
    tiktokUrl: 'https://tiktok.com/@beautyminji',
    tiktokFollowers: 89000,
    youtube: null,
    youtubeUrl: null,
    youtubeSubscribers: 0,
  },
  {
    id: 2,
    name: '수아뷰티',
    email: 'sua@email.com',
    phone: '010-2345-6789',
    avatar: null,
    grade: 'silver',
    campaigns: 8,
    points: 800000,
    totalEarnings: 3200000,
    rating: 4.8,
    joinDate: '2024-08-20',
    instagram: '@suabeauty',
    instagramUrl: 'https://instagram.com/suabeauty',
    instagramFollowers: 45000,
    tiktok: '@suabeauty',
    tiktokUrl: 'https://tiktok.com/@suabeauty',
    tiktokFollowers: 120000,
    youtube: '@suabeauty',
    youtubeUrl: 'https://youtube.com/@suabeauty',
    youtubeSubscribers: 25000,
  },
  {
    id: 3,
    name: '예나메이크업',
    email: 'yena@email.com',
    phone: '010-3456-7890',
    avatar: null,
    grade: 'platinum',
    campaigns: 24,
    points: 5000000,
    totalEarnings: 15000000,
    rating: 4.9,
    joinDate: '2024-03-10',
    instagram: '@yenamakeup',
    instagramUrl: 'https://instagram.com/yenamakeup',
    instagramFollowers: 210000,
    tiktok: null,
    tiktokUrl: null,
    tiktokFollowers: 0,
    youtube: '@yenamakeup',
    youtubeUrl: 'https://youtube.com/@yenamakeup',
    youtubeSubscribers: 180000,
  },
]

// 추천 크리에이터 목업
const recommendedCreators = [
  { ...allCreators[0], fee: 400000, priority: 1 },
  { ...allCreators[2], fee: 600000, priority: 2 },
]

// 소속 크리에이터 목업
const affiliatedCreators = [
  { ...allCreators[1], fee: 350000, contractStart: '2024-01-01', contractEnd: '2024-12-31' },
]

// 유튜브 지원 크리에이터 목업
const youtubeCreators = [
  {
    ...allCreators[1],
    fee: 500000,
    lastUpload: '2024-12-05',
    weeklyUploads: 1,
    totalViews: 1250000,
    totalVideos: 48,
    warningCount: 0,
  },
  {
    ...allCreators[2],
    fee: 800000,
    lastUpload: '2024-11-28',
    weeklyUploads: 0,
    totalViews: 3500000,
    totalVideos: 120,
    warningCount: 1,
  },
]

const gradeColors = {
  normal: 'bg-gray-100 text-gray-800',
  bronze: 'bg-amber-100 text-amber-800',
  silver: 'bg-gray-200 text-gray-800',
  gold: 'bg-yellow-100 text-yellow-800',
  platinum: 'bg-purple-100 text-purple-800',
  diamond: 'bg-cyan-100 text-cyan-800',
}

const gradeLabels = {
  normal: '일반',
  bronze: 'Bronze',
  silver: 'Silver',
  gold: 'Gold',
  platinum: 'Platinum',
  diamond: 'Diamond',
}

// 크리에이터 추가 모달
function AddCreatorModal({ isOpen, onClose, type }) {
  const [selectedCreators, setSelectedCreators] = useState([])
  const [fee, setFee] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const handleAdd = () => {
    if (selectedCreators.length === 0) {
      toast.error('크리에이터를 선택해주세요.')
      return
    }
    if (!fee) {
      toast.error('원고비를 입력해주세요.')
      return
    }
    toast.success(`${selectedCreators.length}명의 크리에이터가 추가되었습니다.`)
    onClose()
    setSelectedCreators([])
    setFee('')
  }

  const typeLabels = {
    recommended: '추천 크리에이터',
    affiliated: '소속 크리에이터',
    youtube: '유튜브 지원 크리에이터',
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{typeLabels[type]} 추가</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* 검색 */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="크리에이터 검색..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* 크리에이터 목록 */}
          <div className="border rounded-lg max-h-64 overflow-auto">
            {allCreators
              .filter(c => c.name.includes(searchQuery) || c.email.includes(searchQuery))
              .map((creator) => (
              <div
                key={creator.id}
                className="flex items-center gap-3 p-3 border-b last:border-0 hover:bg-gray-50"
              >
                <Checkbox
                  checked={selectedCreators.includes(creator.id)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedCreators([...selectedCreators, creator.id])
                    } else {
                      setSelectedCreators(selectedCreators.filter(id => id !== creator.id))
                    }
                  }}
                />
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{creator.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-sm">{creator.name}</p>
                  <p className="text-xs text-gray-500">{creator.email}</p>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  {creator.instagram && <Instagram className="h-4 w-4" />}
                  {creator.tiktok && <TiktokIcon className="h-4 w-4" />}
                  {creator.youtube && <Youtube className="h-4 w-4" />}
                </div>
                <Badge className={gradeColors[creator.grade]}>{gradeLabels[creator.grade]}</Badge>
              </div>
            ))}
          </div>

          {/* 원고비 입력 */}
          <div className="space-y-2">
            <Label>원고비 (원)</Label>
            <Input
              type="number"
              placeholder="예: 400000"
              value={fee}
              onChange={(e) => setFee(e.target.value)}
            />
          </div>

          {type === 'youtube' && (
            <div className="space-y-2">
              <Label>유튜브 채널 URL</Label>
              <Input placeholder="https://youtube.com/@channel" />
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>취소</Button>
          <Button onClick={handleAdd}>
            <Plus className="mr-2 h-4 w-4" />
            추가하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// SNS 링크 컴포넌트
function SnsLinks({ creator }) {
  return (
    <div className="flex items-center gap-2">
      {creator.instagram && (
        <a
          href={creator.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-pink-500 transition-colors"
          title={creator.instagram}
        >
          <Instagram className="h-4 w-4" />
        </a>
      )}
      {creator.tiktok && (
        <a
          href={creator.tiktokUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-gray-900 transition-colors"
          title={creator.tiktok}
        >
          <TiktokIcon className="h-4 w-4" />
        </a>
      )}
      {creator.youtube && (
        <a
          href={creator.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-red-500 transition-colors"
          title={creator.youtube}
        >
          <Youtube className="h-4 w-4" />
        </a>
      )}
    </div>
  )
}

export function AdminCreators() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGrade, setSelectedGrade] = useState('all')
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [addModalType, setAddModalType] = useState('recommended')

  const openAddModal = (type) => {
    setAddModalType(type)
    setAddModalOpen(true)
  }

  const sendYoutubeWarning = (creatorName) => {
    toast.success(`${creatorName}님에게 업로드 알림이 발송되었습니다.`)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">크리에이터 관리</h1>
          <p className="text-gray-500">등록된 크리에이터를 관리하고 분류하세요.</p>
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
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">전체 크리에이터</p>
            <p className="text-2xl font-bold text-cnec-blue">{allCreators.length}명</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">추천 크리에이터</p>
            <p className="text-2xl font-bold text-success">{recommendedCreators.length}명</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">소속 크리에이터</p>
            <p className="text-2xl font-bold text-warning">{affiliatedCreators.length}명</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-gray-500">유튜브 지원</p>
            <p className="text-2xl font-bold text-error">{youtubeCreators.length}명</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">전체 크리에이터</TabsTrigger>
          <TabsTrigger value="recommended">추천 크리에이터</TabsTrigger>
          <TabsTrigger value="affiliated">소속 크리에이터</TabsTrigger>
          <TabsTrigger value="youtube">유튜브 지원</TabsTrigger>
        </TabsList>

        {/* 전체 크리에이터 */}
        <TabsContent value="all" className="mt-4">
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
                <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="등급" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">전체 등급</SelectItem>
                    <SelectItem value="normal">일반</SelectItem>
                    <SelectItem value="bronze">Bronze</SelectItem>
                    <SelectItem value="silver">Silver</SelectItem>
                    <SelectItem value="gold">Gold</SelectItem>
                    <SelectItem value="platinum">Platinum</SelectItem>
                    <SelectItem value="diamond">Diamond</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline">
                  <Filter className="mr-2 h-4 w-4" />
                  더 많은 필터
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-0 overflow-x-auto">
              <Table className="min-w-[900px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[200px]">크리에이터</TableHead>
                    <TableHead className="min-w-[80px]">SNS</TableHead>
                    <TableHead className="min-w-[80px]">등급</TableHead>
                    <TableHead className="min-w-[70px]">캠페인</TableHead>
                    <TableHead className="min-w-[120px]">포인트 잔액</TableHead>
                    <TableHead className="min-w-[120px]">총 진행 금액</TableHead>
                    <TableHead className="min-w-[60px]">평점</TableHead>
                    <TableHead className="min-w-[100px]">가입일</TableHead>
                    <TableHead className="min-w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allCreators.map((creator) => (
                    <TableRow key={creator.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={creator.avatar} />
                            <AvatarFallback>{creator.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{creator.name}</p>
                            <p className="text-sm text-gray-500">{creator.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <SnsLinks creator={creator} />
                      </TableCell>
                      <TableCell>
                        <Badge className={gradeColors[creator.grade]}>
                          {gradeLabels[creator.grade]}
                        </Badge>
                      </TableCell>
                      <TableCell>{creator.campaigns}회</TableCell>
                      <TableCell>{formatCurrency(creator.points)}</TableCell>
                      <TableCell className="font-medium">{formatCurrency(creator.totalEarnings)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-warning fill-warning" />
                          <span>{creator.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-500">{formatDate(creator.joinDate)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" title="상세보기">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="수정">
                            <Edit className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 추천 크리에이터 */}
        <TabsContent value="recommended" className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">광고주에게 추천되는 크리에이터를 관리합니다.</p>
            <Button onClick={() => openAddModal('recommended')}>
              <Plus className="mr-2 h-4 w-4" />
              크리에이터 추가
            </Button>
          </div>

          <Card>
            <CardContent className="p-0 overflow-x-auto">
              <Table className="min-w-[800px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[60px]">순위</TableHead>
                    <TableHead className="min-w-[200px]">크리에이터</TableHead>
                    <TableHead className="min-w-[80px]">SNS</TableHead>
                    <TableHead className="min-w-[80px]">등급</TableHead>
                    <TableHead className="min-w-[100px]">원고비</TableHead>
                    <TableHead className="min-w-[70px]">캠페인</TableHead>
                    <TableHead className="min-w-[60px]">평점</TableHead>
                    <TableHead className="min-w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recommendedCreators.map((creator, index) => (
                    <TableRow key={creator.id}>
                      <TableCell>
                        <span className="font-bold text-cnec-blue">{index + 1}</span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{creator.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{creator.name}</p>
                            <p className="text-sm text-gray-500">{creator.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <SnsLinks creator={creator} />
                      </TableCell>
                      <TableCell>
                        <Badge className={gradeColors[creator.grade]}>
                          {gradeLabels[creator.grade]}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium text-cnec-blue">
                        {formatCurrency(creator.fee)}
                      </TableCell>
                      <TableCell>{creator.campaigns}회</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-warning fill-warning" />
                          <span>{creator.rating}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" title="수정">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="삭제" className="text-error">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 소속 크리에이터 */}
        <TabsContent value="affiliated" className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">CNEC 소속 크리에이터를 관리합니다.</p>
            <Button onClick={() => openAddModal('affiliated')}>
              <Plus className="mr-2 h-4 w-4" />
              크리에이터 추가
            </Button>
          </div>

          <Card>
            <CardContent className="p-0 overflow-x-auto">
              <Table className="min-w-[900px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[200px]">크리에이터</TableHead>
                    <TableHead className="min-w-[80px]">SNS</TableHead>
                    <TableHead className="min-w-[80px]">등급</TableHead>
                    <TableHead className="min-w-[100px]">원고비</TableHead>
                    <TableHead className="min-w-[100px]">계약 시작</TableHead>
                    <TableHead className="min-w-[100px]">계약 종료</TableHead>
                    <TableHead className="min-w-[70px]">캠페인</TableHead>
                    <TableHead className="min-w-[80px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {affiliatedCreators.map((creator) => (
                    <TableRow key={creator.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback>{creator.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{creator.name}</p>
                            <p className="text-sm text-gray-500">{creator.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <SnsLinks creator={creator} />
                      </TableCell>
                      <TableCell>
                        <Badge className={gradeColors[creator.grade]}>
                          {gradeLabels[creator.grade]}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium text-cnec-blue">
                        {formatCurrency(creator.fee)}
                      </TableCell>
                      <TableCell>{formatDate(creator.contractStart)}</TableCell>
                      <TableCell>{formatDate(creator.contractEnd)}</TableCell>
                      <TableCell>{creator.campaigns}회</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" title="수정">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="삭제" className="text-error">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 유튜브 지원 크리에이터 */}
        <TabsContent value="youtube" className="mt-4">
          <div className="flex justify-between items-center mb-4">
            <p className="text-gray-600">유튜브 지원 크리에이터를 관리하고 업로드 현황을 확인합니다.</p>
            <Button onClick={() => openAddModal('youtube')}>
              <Plus className="mr-2 h-4 w-4" />
              크리에이터 추가
            </Button>
          </div>

          <Card>
            <CardContent className="p-0 overflow-x-auto">
              <Table className="min-w-[1000px]">
                <TableHeader>
                  <TableRow>
                    <TableHead className="min-w-[200px]">크리에이터</TableHead>
                    <TableHead className="min-w-[140px]">유튜브 채널</TableHead>
                    <TableHead className="min-w-[100px]">원고비</TableHead>
                    <TableHead className="min-w-[100px]">최근 업로드</TableHead>
                    <TableHead className="min-w-[100px]">주간 업로드</TableHead>
                    <TableHead className="min-w-[100px]">총 조회수</TableHead>
                    <TableHead className="min-w-[80px]">총 영상</TableHead>
                    <TableHead className="min-w-[60px]">경고</TableHead>
                    <TableHead className="min-w-[120px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {youtubeCreators.map((creator) => {
                    const needsWarning = creator.weeklyUploads < 1
                    return (
                      <TableRow key={creator.id} className={needsWarning ? 'bg-error-light' : ''}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>{creator.name[0]}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{creator.name}</p>
                              <p className="text-sm text-gray-500">{creator.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <a
                            href={creator.youtubeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1 text-cnec-blue hover:underline"
                          >
                            <Youtube className="h-4 w-4" />
                            {creator.youtube}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </TableCell>
                        <TableCell className="font-medium">{formatCurrency(creator.fee)}</TableCell>
                        <TableCell>{formatDate(creator.lastUpload)}</TableCell>
                        <TableCell>
                          <span className={needsWarning ? 'text-error font-bold' : 'text-success'}>
                            {creator.weeklyUploads}개
                          </span>
                          {needsWarning && (
                            <AlertCircle className="inline ml-1 h-4 w-4 text-error" />
                          )}
                        </TableCell>
                        <TableCell>{creator.totalViews.toLocaleString()}</TableCell>
                        <TableCell>{creator.totalVideos}개</TableCell>
                        <TableCell>
                          <Badge variant={creator.warningCount > 0 ? 'error' : 'secondary'}>
                            {creator.warningCount}회
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {needsWarning && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-error"
                                onClick={() => sendYoutubeWarning(creator.name)}
                              >
                                <Send className="mr-1 h-3 w-3" />
                                알림 전송
                              </Button>
                            )}
                            <Button variant="ghost" size="icon" title="수정">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" title="삭제" className="text-error">
                              <Trash2 className="h-4 w-4" />
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
      </Tabs>

      {/* 크리에이터 추가 모달 */}
      <AddCreatorModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        type={addModalType}
      />
    </div>
  )
}
