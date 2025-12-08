import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
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
import { Progress } from '@/components/ui/progress'
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
  Users,
  Crown,
  Award,
  TrendingUp,
  Calendar,
  Mail,
  Phone,
  MessageSquare,
  Video,
  BarChart3,
  Clock,
  CheckCircle,
  XCircle,
  ArrowUpRight,
  FileSpreadsheet,
  RefreshCw,
  Sparkles,
  Heart,
  Play,
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
    skinType: '복합성',
    age: '20대',
    categories: ['스킨케어', '메이크업'],
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
    skinType: '지성',
    age: '20대',
    categories: ['메이크업'],
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
    skinType: '건성',
    age: '30대',
    categories: ['스킨케어', '헤어케어'],
  },
  {
    id: 4,
    name: '데일리뷰티',
    email: 'daily@email.com',
    phone: '010-4567-8901',
    avatar: null,
    grade: 'bronze',
    campaigns: 5,
    points: 350000,
    totalEarnings: 1500000,
    rating: 4.6,
    joinDate: '2024-10-05',
    instagram: '@dailybeauty',
    instagramUrl: 'https://instagram.com/dailybeauty',
    instagramFollowers: 32000,
    tiktok: '@dailybeauty',
    tiktokUrl: 'https://tiktok.com/@dailybeauty',
    tiktokFollowers: 55000,
    youtube: null,
    youtubeUrl: null,
    youtubeSubscribers: 0,
    skinType: '민감성',
    age: '20대',
    categories: ['이너뷰티'],
  },
  {
    id: 5,
    name: '스킨케어연구소',
    email: 'skinlab@email.com',
    phone: '010-5678-9012',
    avatar: null,
    grade: 'diamond',
    campaigns: 32,
    points: 8500000,
    totalEarnings: 25000000,
    rating: 5.0,
    joinDate: '2024-01-15',
    instagram: '@skinlab',
    instagramUrl: 'https://instagram.com/skinlab',
    instagramFollowers: 350000,
    tiktok: '@skinlab',
    tiktokUrl: 'https://tiktok.com/@skinlab',
    tiktokFollowers: 280000,
    youtube: '@skinlab',
    youtubeUrl: 'https://youtube.com/@skinlab',
    youtubeSubscribers: 420000,
    skinType: '복합성',
    age: '30대',
    categories: ['스킨케어', '디바이스'],
  },
]

// 추천 크리에이터 목업
const initialRecommendedCreators = [
  { ...allCreators[0], fee: 400000, priority: 1 },
  { ...allCreators[2], fee: 600000, priority: 2 },
]

// 소속 크리에이터 목업
const initialAffiliatedCreators = [
  { ...allCreators[1], fee: 350000, contractStart: '2024-01-01', contractEnd: '2024-12-31' },
]

// 유튜브 지원 크리에이터 목업
const initialYoutubeCreators = [
  {
    ...allCreators[1],
    fee: 500000,
    youtubeChannelUrl: 'https://youtube.com/@suabeauty',
    lastUpload: '2024-12-05',
    weeklyUploads: 1,
    totalViews: 1250000,
    totalVideos: 48,
    warningCount: 0,
    uploadHistory: [
      { date: '2024-12-05', views: 15000, title: '겨울 스킨케어 루틴' },
      { date: '2024-11-28', views: 23000, title: '메이크업 추천템' },
    ],
  },
  {
    ...allCreators[2],
    fee: 800000,
    youtubeChannelUrl: 'https://youtube.com/@yenamakeup',
    lastUpload: '2024-11-28',
    weeklyUploads: 0,
    totalViews: 3500000,
    totalVideos: 120,
    warningCount: 1,
    uploadHistory: [
      { date: '2024-11-28', views: 45000, title: '연말 파티 메이크업' },
      { date: '2024-11-15', views: 38000, title: '데일리 메이크업' },
    ],
  },
  {
    ...allCreators[4],
    fee: 1200000,
    youtubeChannelUrl: 'https://youtube.com/@skinlab',
    lastUpload: '2024-12-07',
    weeklyUploads: 2,
    totalViews: 8500000,
    totalVideos: 256,
    warningCount: 0,
    uploadHistory: [
      { date: '2024-12-07', views: 52000, title: '신상 세럼 비교 리뷰' },
      { date: '2024-12-03', views: 41000, title: '피부 타입별 클렌저' },
    ],
  },
]

const gradeConfig = {
  normal: { label: '일반', color: 'bg-gray-100 text-gray-700', icon: null },
  bronze: { label: 'Bronze', color: 'bg-amber-100 text-amber-700', icon: Award },
  silver: { label: 'Silver', color: 'bg-slate-200 text-slate-700', icon: Award },
  gold: { label: 'Gold', color: 'bg-yellow-100 text-yellow-700', icon: Crown },
  platinum: { label: 'Platinum', color: 'bg-purple-100 text-purple-700', icon: Crown },
  diamond: { label: 'Diamond', color: 'bg-cyan-100 text-cyan-700', icon: Sparkles },
}

// 프리미엄 스탯 카드
function StatCard({ title, value, subtitle, icon: Icon, gradient, iconBg }) {
  return (
    <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-[0.03] group-hover:opacity-[0.06] transition-opacity`} />
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
            {subtitle && <p className="text-xs text-gray-400 mt-1">{subtitle}</p>}
          </div>
          <div className={`w-12 h-12 rounded-xl ${iconBg} flex items-center justify-center shadow-lg`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// SNS 링크 컴포넌트
function SnsLinks({ creator, size = 'default' }) {
  const iconSize = size === 'large' ? 'h-5 w-5' : 'h-4 w-4'
  const containerClass = size === 'large' ? 'gap-3' : 'gap-2'

  return (
    <div className={`flex items-center ${containerClass}`}>
      {creator.instagram && (
        <a
          href={creator.instagramUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-rose-500 text-white hover:scale-110 transition-transform shadow-md"
          title={`${creator.instagram} (${(creator.instagramFollowers / 1000).toFixed(0)}K)`}
        >
          <Instagram className={iconSize} />
        </a>
      )}
      {creator.tiktok && (
        <a
          href={creator.tiktokUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 text-white hover:scale-110 transition-transform shadow-md"
          title={`${creator.tiktok} (${(creator.tiktokFollowers / 1000).toFixed(0)}K)`}
        >
          <TiktokIcon className={iconSize} />
        </a>
      )}
      {creator.youtube && (
        <a
          href={creator.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-red-500 to-red-600 text-white hover:scale-110 transition-transform shadow-md"
          title={`${creator.youtube} (${(creator.youtubeSubscribers / 1000).toFixed(0)}K)`}
        >
          <Youtube className={iconSize} />
        </a>
      )}
    </div>
  )
}

// 크리에이터 추가 모달 (고급 버전)
function AddCreatorModal({ isOpen, onClose, type, creators, onAdd }) {
  const [selectedCreators, setSelectedCreators] = useState([])
  const [fee, setFee] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [gradeFilter, setGradeFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [youtubeUrl, setYoutubeUrl] = useState('')
  const [contractStart, setContractStart] = useState('')
  const [contractEnd, setContractEnd] = useState('')

  const filteredCreators = useMemo(() => {
    return creators.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.instagram?.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesGrade = gradeFilter === 'all' || c.grade === gradeFilter
      const matchesCategory = categoryFilter === 'all' || c.categories?.includes(categoryFilter)
      return matchesSearch && matchesGrade && matchesCategory
    })
  }, [creators, searchQuery, gradeFilter, categoryFilter])

  const handleAdd = () => {
    if (selectedCreators.length === 0) {
      toast.error('크리에이터를 선택해주세요.')
      return
    }
    if (!fee) {
      toast.error('원고비를 입력해주세요.')
      return
    }
    if (type === 'youtube' && !youtubeUrl) {
      toast.error('유튜브 채널 URL을 입력해주세요.')
      return
    }
    if (type === 'affiliated' && (!contractStart || !contractEnd)) {
      toast.error('계약 기간을 입력해주세요.')
      return
    }

    const selectedData = selectedCreators.map(id => {
      const creator = creators.find(c => c.id === id)
      return {
        ...creator,
        fee: parseInt(fee),
        ...(type === 'youtube' && { youtubeChannelUrl: youtubeUrl }),
        ...(type === 'affiliated' && { contractStart, contractEnd }),
      }
    })

    onAdd(selectedData)
    toast.success(`${selectedCreators.length}명의 크리에이터가 추가되었습니다.`)
    handleClose()
  }

  const handleClose = () => {
    setSelectedCreators([])
    setFee('')
    setSearchQuery('')
    setGradeFilter('all')
    setCategoryFilter('all')
    setYoutubeUrl('')
    setContractStart('')
    setContractEnd('')
    onClose()
  }

  const toggleCreator = (id) => {
    if (selectedCreators.includes(id)) {
      setSelectedCreators(selectedCreators.filter(cid => cid !== id))
    } else {
      setSelectedCreators([...selectedCreators, id])
    }
  }

  const typeConfig = {
    recommended: { title: '추천 크리에이터 추가', description: '광고주에게 추천할 크리에이터를 선택하세요.' },
    affiliated: { title: '소속 크리에이터 추가', description: 'CNEC 소속 크리에이터를 등록하세요.' },
    youtube: { title: '유튜브 지원 크리에이터 추가', description: '유튜브 지원 프로그램에 참여할 크리에이터를 선택하세요.' },
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{typeConfig[type]?.title}</DialogTitle>
          <DialogDescription>{typeConfig[type]?.description}</DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden flex flex-col gap-4">
          {/* 검색 및 필터 */}
          <div className="flex flex-wrap gap-3">
            <div className="relative flex-1 min-w-[200px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="이름, 이메일, SNS 검색..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={gradeFilter} onValueChange={setGradeFilter}>
              <SelectTrigger className="w-[140px]">
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
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="카테고리" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 카테고리</SelectItem>
                <SelectItem value="스킨케어">스킨케어</SelectItem>
                <SelectItem value="메이크업">메이크업</SelectItem>
                <SelectItem value="헤어케어">헤어케어</SelectItem>
                <SelectItem value="바디케어">바디케어</SelectItem>
                <SelectItem value="이너뷰티">이너뷰티</SelectItem>
                <SelectItem value="디바이스">디바이스</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 선택된 크리에이터 표시 */}
          {selectedCreators.length > 0 && (
            <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <CheckCircle className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium text-blue-700">
                {selectedCreators.length}명 선택됨
              </span>
              <Button
                variant="ghost"
                size="sm"
                className="ml-auto text-blue-600 hover:text-blue-700"
                onClick={() => setSelectedCreators([])}
              >
                선택 해제
              </Button>
            </div>
          )}

          {/* 크리에이터 목록 */}
          <div className="flex-1 border rounded-xl overflow-auto">
            <div className="divide-y">
              {filteredCreators.map((creator) => {
                const isSelected = selectedCreators.includes(creator.id)
                const GradeIcon = gradeConfig[creator.grade]?.icon
                return (
                  <div
                    key={creator.id}
                    onClick={() => toggleCreator(creator.id)}
                    className={`flex items-center gap-4 p-4 cursor-pointer transition-all ${
                      isSelected ? 'bg-blue-50 border-l-4 border-l-blue-500' : 'hover:bg-gray-50'
                    }`}
                  >
                    <Checkbox
                      checked={isSelected}
                      onCheckedChange={() => toggleCreator(creator.id)}
                      className="pointer-events-none"
                    />
                    <Avatar className="h-12 w-12 border-2 border-white shadow">
                      <AvatarImage src={creator.avatar} />
                      <AvatarFallback className="bg-gradient-to-br from-pink-400 to-rose-400 text-white font-semibold">
                        {creator.name[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900">{creator.name}</p>
                        <Badge className={`${gradeConfig[creator.grade]?.color} text-xs`}>
                          {GradeIcon && <GradeIcon className="h-3 w-3 mr-1" />}
                          {gradeConfig[creator.grade]?.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-500">{creator.email}</p>
                      <div className="flex items-center gap-4 mt-1 text-xs text-gray-400">
                        <span>캠페인 {creator.campaigns}회</span>
                        <span>평점 {creator.rating}</span>
                        <span>{creator.age}</span>
                      </div>
                    </div>
                    <SnsLinks creator={creator} />
                  </div>
                )
              })}
              {filteredCreators.length === 0 && (
                <div className="p-8 text-center text-gray-500">
                  검색 결과가 없습니다.
                </div>
              )}
            </div>
          </div>

          {/* 입력 필드 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
            <div className="space-y-2">
              <Label className="text-sm font-medium">원고비 (원) *</Label>
              <div className="relative">
                <Input
                  type="number"
                  placeholder="예: 400000"
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                  className="pl-8"
                />
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">₩</span>
              </div>
            </div>

            {type === 'youtube' && (
              <div className="space-y-2">
                <Label className="text-sm font-medium">유튜브 채널 URL *</Label>
                <div className="relative">
                  <Input
                    placeholder="https://youtube.com/@channel"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    className="pl-10"
                  />
                  <Youtube className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-red-500" />
                </div>
              </div>
            )}

            {type === 'affiliated' && (
              <>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">계약 시작일 *</Label>
                  <Input
                    type="date"
                    value={contractStart}
                    onChange={(e) => setContractStart(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-medium">계약 종료일 *</Label>
                  <Input
                    type="date"
                    value={contractEnd}
                    onChange={(e) => setContractEnd(e.target.value)}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        <DialogFooter className="pt-4">
          <Button variant="outline" onClick={handleClose}>취소</Button>
          <Button onClick={handleAdd} className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600">
            <Plus className="mr-2 h-4 w-4" />
            {selectedCreators.length}명 추가하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// 유튜브 통계 모달
function YoutubeStatsModal({ isOpen, onClose, creator }) {
  if (!creator) return null

  const uploadRate = creator.weeklyUploads >= 1 ? 100 : (creator.weeklyUploads * 100)

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-gradient-to-br from-red-400 to-red-500 text-white">
                {creator.name[0]}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-bold">{creator.name}</p>
              <a
                href={creator.youtubeChannelUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-red-500 hover:underline flex items-center gap-1"
              >
                <Youtube className="h-3 w-3" />
                {creator.youtube}
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* 통계 카드 */}
          <div className="grid grid-cols-4 gap-3">
            <div className="p-4 rounded-xl bg-gradient-to-br from-red-50 to-rose-50 border border-red-100 text-center">
              <Video className="h-5 w-5 text-red-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{creator.totalVideos}</p>
              <p className="text-xs text-gray-500">총 영상</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100 text-center">
              <Eye className="h-5 w-5 text-blue-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{(creator.totalViews / 1000000).toFixed(1)}M</p>
              <p className="text-xs text-gray-500">총 조회수</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100 text-center">
              <TrendingUp className="h-5 w-5 text-green-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{creator.weeklyUploads}</p>
              <p className="text-xs text-gray-500">주간 업로드</p>
            </div>
            <div className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 text-center">
              <AlertCircle className="h-5 w-5 text-amber-500 mx-auto mb-2" />
              <p className="text-2xl font-bold text-gray-900">{creator.warningCount}</p>
              <p className="text-xs text-gray-500">경고 횟수</p>
            </div>
          </div>

          {/* 업로드 현황 */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-900">주간 업로드 현황</h4>
              <span className={`text-sm font-medium ${creator.weeklyUploads >= 1 ? 'text-green-600' : 'text-red-600'}`}>
                {creator.weeklyUploads >= 1 ? '목표 달성' : '업로드 필요'}
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">주간 목표: 1개</span>
                <span className="font-medium">{creator.weeklyUploads}개 완료</span>
              </div>
              <Progress value={uploadRate} className="h-3" />
            </div>
          </div>

          {/* 최근 업로드 */}
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-900">최근 업로드</h4>
            <div className="space-y-2">
              {creator.uploadHistory?.map((upload, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-red-500 to-rose-500 flex items-center justify-center">
                    <Play className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{upload.title}</p>
                    <p className="text-xs text-gray-500">{formatDate(upload.date)}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">{upload.views.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">조회수</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>닫기</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// 알림 발송 모달
function SendNotificationModal({ isOpen, onClose, creator, type }) {
  const [message, setMessage] = useState('')
  const [sendEmail, setSendEmail] = useState(true)
  const [sendKakao, setSendKakao] = useState(true)

  const handleSend = () => {
    if (!sendEmail && !sendKakao) {
      toast.error('발송 수단을 선택해주세요.')
      return
    }

    const methods = []
    if (sendEmail) methods.push('이메일')
    if (sendKakao) methods.push('카카오 알림톡')

    toast.success(`${creator?.name}님에게 ${methods.join(', ')}이(가) 발송되었습니다.`)
    onClose()
  }

  const defaultMessages = {
    warning: `안녕하세요, ${creator?.name}님.\n\n유튜브 지원 프로그램 주간 업로드 미달 알림입니다.\n금주 내로 영상 1개 이상 업로드 부탁드립니다.\n\n- CNEC 관리자`,
    reminder: `안녕하세요, ${creator?.name}님.\n\n유튜브 지원 프로그램 업로드 리마인더입니다.\n꾸준한 업로드를 부탁드립니다.\n\n- CNEC 관리자`,
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="h-5 w-5 text-blue-500" />
            알림 발송
          </DialogTitle>
          <DialogDescription>
            {creator?.name}님에게 알림을 발송합니다.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* 발송 수단 */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">발송 수단</Label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox checked={sendEmail} onCheckedChange={setSendEmail} />
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-sm">이메일</span>
                <span className="text-xs text-gray-400">({creator?.email})</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox checked={sendKakao} onCheckedChange={setSendKakao} />
                <MessageSquare className="h-4 w-4 text-yellow-500" />
                <span className="text-sm">카카오 알림톡</span>
                <span className="text-xs text-gray-400">({creator?.phone})</span>
              </label>
            </div>
          </div>

          {/* 메시지 내용 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">메시지 내용</Label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMessage(defaultMessages.warning)}
                >
                  경고 템플릿
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setMessage(defaultMessages.reminder)}
                >
                  리마인더 템플릿
                </Button>
              </div>
            </div>
            <Textarea
              placeholder="메시지를 입력하세요..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={6}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>취소</Button>
          <Button onClick={handleSend} className="bg-gradient-to-r from-blue-500 to-cyan-500">
            <Send className="mr-2 h-4 w-4" />
            발송하기
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// 엑셀 업로드 모달
function ExcelUploadModal({ isOpen, onClose }) {
  const [file, setFile] = useState(null)
  const [isDragging, setIsDragging] = useState(false)

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile?.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        droppedFile?.type === 'application/vnd.ms-excel') {
      setFile(droppedFile)
    } else {
      toast.error('엑셀 파일(.xlsx, .xls)만 업로드 가능합니다.')
    }
  }

  const handleUpload = () => {
    if (!file) {
      toast.error('파일을 선택해주세요.')
      return
    }
    toast.success('엑셀 파일이 업로드되었습니다. 데이터를 처리 중입니다.')
    onClose()
    setFile(null)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-green-500" />
            엑셀 일괄 업로드
          </DialogTitle>
          <DialogDescription>
            크리에이터 목록을 엑셀 파일로 일괄 등록합니다.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* 드래그 앤 드롭 영역 */}
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
              isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
            }`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
          >
            {file ? (
              <div className="space-y-2">
                <FileSpreadsheet className="h-12 w-12 text-green-500 mx-auto" />
                <p className="font-medium text-gray-900">{file.name}</p>
                <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                <Button variant="outline" size="sm" onClick={() => setFile(null)}>
                  파일 변경
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="h-12 w-12 text-gray-400 mx-auto" />
                <p className="font-medium text-gray-900">파일을 드래그하거나 클릭하여 업로드</p>
                <p className="text-sm text-gray-500">지원 형식: .xlsx, .xls</p>
                <input
                  type="file"
                  accept=".xlsx,.xls"
                  className="hidden"
                  id="excel-upload"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <Button variant="outline" size="sm" asChild>
                  <label htmlFor="excel-upload" className="cursor-pointer">파일 선택</label>
                </Button>
              </div>
            )}
          </div>

          {/* 템플릿 다운로드 */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">템플릿 파일</p>
              <p className="text-sm text-gray-500">양식에 맞게 데이터를 입력해주세요.</p>
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              템플릿 다운로드
            </Button>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>취소</Button>
          <Button onClick={handleUpload} disabled={!file}>
            <Upload className="mr-2 h-4 w-4" />
            업로드
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// 크리에이터 상세 모달
function CreatorDetailModal({ isOpen, onClose, creator }) {
  if (!creator) return null

  const GradeIcon = gradeConfig[creator.grade]?.icon

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>크리에이터 상세 정보</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* 프로필 헤더 */}
          <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
            <Avatar className="h-20 w-20 border-4 border-white shadow-lg">
              <AvatarImage src={creator.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-pink-400 to-rose-400 text-white text-2xl font-bold">
                {creator.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold text-gray-900">{creator.name}</h3>
                <Badge className={`${gradeConfig[creator.grade]?.color}`}>
                  {GradeIcon && <GradeIcon className="h-3 w-3 mr-1" />}
                  {gradeConfig[creator.grade]?.label}
                </Badge>
              </div>
              <p className="text-gray-500">{creator.email}</p>
              <p className="text-gray-500">{creator.phone}</p>
            </div>
            <SnsLinks creator={creator} size="large" />
          </div>

          {/* 통계 */}
          <div className="grid grid-cols-4 gap-3">
            <div className="text-center p-4 bg-blue-50 rounded-xl">
              <p className="text-2xl font-bold text-blue-600">{creator.campaigns}</p>
              <p className="text-xs text-gray-500">캠페인</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-xl">
              <p className="text-2xl font-bold text-green-600">{formatCurrency(creator.points)}</p>
              <p className="text-xs text-gray-500">포인트 잔액</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-xl">
              <p className="text-2xl font-bold text-purple-600">{formatCurrency(creator.totalEarnings)}</p>
              <p className="text-xs text-gray-500">총 진행 금액</p>
            </div>
            <div className="text-center p-4 bg-amber-50 rounded-xl">
              <div className="flex items-center justify-center gap-1">
                <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
                <p className="text-2xl font-bold text-amber-600">{creator.rating}</p>
              </div>
              <p className="text-xs text-gray-500">평점</p>
            </div>
          </div>

          {/* 상세 정보 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-gray-500">가입일</Label>
              <p className="font-medium">{formatDate(creator.joinDate)}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-gray-500">연령대</Label>
              <p className="font-medium">{creator.age}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-gray-500">피부 타입</Label>
              <p className="font-medium">{creator.skinType}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-gray-500">관심 카테고리</Label>
              <div className="flex gap-1">
                {creator.categories?.map((cat) => (
                  <Badge key={cat} variant="outline" className="text-xs">{cat}</Badge>
                ))}
              </div>
            </div>
          </div>

          {/* SNS 팔로워 */}
          <div className="space-y-3">
            <Label className="text-gray-500">SNS 팔로워</Label>
            <div className="grid grid-cols-3 gap-3">
              {creator.instagram && (
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-pink-50 to-rose-50 rounded-lg border border-pink-100">
                  <Instagram className="h-5 w-5 text-pink-500" />
                  <div>
                    <p className="text-xs text-gray-500">Instagram</p>
                    <p className="font-semibold">{(creator.instagramFollowers / 1000).toFixed(0)}K</p>
                  </div>
                </div>
              )}
              {creator.tiktok && (
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg border border-gray-200">
                  <TiktokIcon className="h-5 w-5 text-gray-800" />
                  <div>
                    <p className="text-xs text-gray-500">TikTok</p>
                    <p className="font-semibold">{(creator.tiktokFollowers / 1000).toFixed(0)}K</p>
                  </div>
                </div>
              )}
              {creator.youtube && (
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-red-50 to-rose-50 rounded-lg border border-red-100">
                  <Youtube className="h-5 w-5 text-red-500" />
                  <div>
                    <p className="text-xs text-gray-500">YouTube</p>
                    <p className="font-semibold">{(creator.youtubeSubscribers / 1000).toFixed(0)}K</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>닫기</Button>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            정보 수정
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function AdminCreators() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedGrade, setSelectedGrade] = useState('all')
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [addModalType, setAddModalType] = useState('recommended')
  const [excelModalOpen, setExcelModalOpen] = useState(false)
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [selectedCreator, setSelectedCreator] = useState(null)
  const [youtubeStatsModalOpen, setYoutubeStatsModalOpen] = useState(false)
  const [notificationModalOpen, setNotificationModalOpen] = useState(false)
  const [notificationCreator, setNotificationCreator] = useState(null)

  // 상태 관리 (실제로는 API 연동)
  const [recommendedCreators, setRecommendedCreators] = useState(initialRecommendedCreators)
  const [affiliatedCreators, setAffiliatedCreators] = useState(initialAffiliatedCreators)
  const [youtubeCreators, setYoutubeCreators] = useState(initialYoutubeCreators)

  const openAddModal = (type) => {
    setAddModalType(type)
    setAddModalOpen(true)
  }

  const openDetailModal = (creator) => {
    setSelectedCreator(creator)
    setDetailModalOpen(true)
  }

  const openYoutubeStatsModal = (creator) => {
    setSelectedCreator(creator)
    setYoutubeStatsModalOpen(true)
  }

  const openNotificationModal = (creator) => {
    setNotificationCreator(creator)
    setNotificationModalOpen(true)
  }

  const handleAddCreators = (type, creators) => {
    switch (type) {
      case 'recommended':
        setRecommendedCreators([...recommendedCreators, ...creators.map((c, i) => ({ ...c, priority: recommendedCreators.length + i + 1 }))])
        break
      case 'affiliated':
        setAffiliatedCreators([...affiliatedCreators, ...creators])
        break
      case 'youtube':
        setYoutubeCreators([...youtubeCreators, ...creators.map(c => ({
          ...c,
          lastUpload: null,
          weeklyUploads: 0,
          totalViews: 0,
          totalVideos: 0,
          warningCount: 0,
          uploadHistory: [],
        }))])
        break
    }
  }

  const handleDeleteCreator = (type, id) => {
    switch (type) {
      case 'recommended':
        setRecommendedCreators(recommendedCreators.filter(c => c.id !== id))
        break
      case 'affiliated':
        setAffiliatedCreators(affiliatedCreators.filter(c => c.id !== id))
        break
      case 'youtube':
        setYoutubeCreators(youtubeCreators.filter(c => c.id !== id))
        break
    }
    toast.success('크리에이터가 삭제되었습니다.')
  }

  const filteredAllCreators = useMemo(() => {
    return allCreators.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.email.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesGrade = selectedGrade === 'all' || c.grade === selectedGrade
      return matchesSearch && matchesGrade
    })
  }, [searchQuery, selectedGrade])

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">크리에이터 관리</h1>
          <p className="text-gray-500 mt-1">등록된 크리에이터를 관리하고 분류하세요.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setExcelModalOpen(true)}>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="전체 크리에이터"
          value={`${allCreators.length}명`}
          subtitle={`+12명 이번 달`}
          icon={Users}
          gradient="from-blue-600 to-cyan-500"
          iconBg="bg-gradient-to-br from-blue-500 to-cyan-500"
        />
        <StatCard
          title="추천 크리에이터"
          value={`${recommendedCreators.length}명`}
          icon={Crown}
          gradient="from-amber-600 to-orange-500"
          iconBg="bg-gradient-to-br from-amber-500 to-orange-500"
        />
        <StatCard
          title="소속 크리에이터"
          value={`${affiliatedCreators.length}명`}
          icon={Award}
          gradient="from-purple-600 to-pink-500"
          iconBg="bg-gradient-to-br from-purple-500 to-pink-500"
        />
        <StatCard
          title="유튜브 지원"
          value={`${youtubeCreators.length}명`}
          subtitle={`${youtubeCreators.filter(c => c.weeklyUploads < 1).length}명 업로드 필요`}
          icon={Youtube}
          gradient="from-red-600 to-rose-500"
          iconBg="bg-gradient-to-br from-red-500 to-rose-500"
        />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="bg-gray-100/80 p-1 rounded-xl">
          <TabsTrigger value="all" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm px-6">
            전체 크리에이터
          </TabsTrigger>
          <TabsTrigger value="recommended" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm px-6">
            추천 크리에이터
          </TabsTrigger>
          <TabsTrigger value="affiliated" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm px-6">
            소속 크리에이터
          </TabsTrigger>
          <TabsTrigger value="youtube" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm px-6">
            유튜브 지원
          </TabsTrigger>
        </TabsList>

        {/* 전체 크리에이터 */}
        <TabsContent value="all" className="space-y-4">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-4">
              <div className="flex flex-wrap items-center gap-4">
                <div className="relative flex-1 min-w-[250px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="이름, 이메일, SNS 검색..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={selectedGrade} onValueChange={setSelectedGrade}>
                  <SelectTrigger className="w-[140px]">
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

          <Card className="border-0 shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table className="min-w-[1000px]">
                  <TableHeader>
                    <TableRow className="bg-gray-50/50">
                      <TableHead className="w-[250px] font-semibold">크리에이터</TableHead>
                      <TableHead className="w-[120px] font-semibold">SNS</TableHead>
                      <TableHead className="w-[100px] font-semibold">등급</TableHead>
                      <TableHead className="w-[80px] font-semibold text-center">캠페인</TableHead>
                      <TableHead className="w-[120px] font-semibold text-right">포인트 잔액</TableHead>
                      <TableHead className="w-[130px] font-semibold text-right">총 진행 금액</TableHead>
                      <TableHead className="w-[80px] font-semibold text-center">평점</TableHead>
                      <TableHead className="w-[100px] font-semibold">가입일</TableHead>
                      <TableHead className="w-[80px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAllCreators.map((creator) => {
                      const GradeIcon = gradeConfig[creator.grade]?.icon
                      return (
                        <TableRow key={creator.id} className="hover:bg-gray-50/50 transition-colors">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10 border-2 border-white shadow">
                                <AvatarImage src={creator.avatar} />
                                <AvatarFallback className="bg-gradient-to-br from-pink-400 to-rose-400 text-white font-semibold">
                                  {creator.name[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-semibold text-gray-900">{creator.name}</p>
                                <p className="text-sm text-gray-500">{creator.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <SnsLinks creator={creator} />
                          </TableCell>
                          <TableCell>
                            <Badge className={`${gradeConfig[creator.grade]?.color}`}>
                              {GradeIcon && <GradeIcon className="h-3 w-3 mr-1" />}
                              {gradeConfig[creator.grade]?.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center font-medium">{creator.campaigns}회</TableCell>
                          <TableCell className="text-right font-medium">{formatCurrency(creator.points)}</TableCell>
                          <TableCell className="text-right font-semibold text-blue-600">{formatCurrency(creator.totalEarnings)}</TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                              <span className="font-medium">{creator.rating}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-gray-500">{formatDate(creator.joinDate)}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="icon" onClick={() => openDetailModal(creator)} title="상세보기">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" title="수정">
                                <Edit className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 추천 크리에이터 */}
        <TabsContent value="recommended" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600">광고주에게 추천되는 크리에이터를 관리합니다.</p>
            </div>
            <Button onClick={() => openAddModal('recommended')} className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
              <Plus className="mr-2 h-4 w-4" />
              크리에이터 추가
            </Button>
          </div>

          <Card className="border-0 shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table className="min-w-[900px]">
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-amber-50 to-orange-50">
                      <TableHead className="w-[60px] font-semibold text-center">순위</TableHead>
                      <TableHead className="w-[220px] font-semibold">크리에이터</TableHead>
                      <TableHead className="w-[120px] font-semibold">SNS</TableHead>
                      <TableHead className="w-[100px] font-semibold">등급</TableHead>
                      <TableHead className="w-[120px] font-semibold text-right">원고비</TableHead>
                      <TableHead className="w-[80px] font-semibold text-center">캠페인</TableHead>
                      <TableHead className="w-[80px] font-semibold text-center">평점</TableHead>
                      <TableHead className="w-[100px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recommendedCreators.map((creator, index) => {
                      const GradeIcon = gradeConfig[creator.grade]?.icon
                      return (
                        <TableRow key={creator.id} className="hover:bg-amber-50/30 transition-colors">
                          <TableCell className="text-center">
                            <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center text-white font-bold text-sm ${
                              index === 0 ? 'bg-gradient-to-br from-amber-400 to-amber-600' :
                              index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-500' :
                              index === 2 ? 'bg-gradient-to-br from-orange-400 to-orange-600' :
                              'bg-gray-200 text-gray-600'
                            }`}>
                              {index + 1}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10 border-2 border-white shadow">
                                <AvatarFallback className="bg-gradient-to-br from-amber-400 to-orange-400 text-white font-semibold">
                                  {creator.name[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-semibold text-gray-900">{creator.name}</p>
                                <p className="text-sm text-gray-500">{creator.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <SnsLinks creator={creator} />
                          </TableCell>
                          <TableCell>
                            <Badge className={`${gradeConfig[creator.grade]?.color}`}>
                              {GradeIcon && <GradeIcon className="h-3 w-3 mr-1" />}
                              {gradeConfig[creator.grade]?.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-bold text-amber-600">
                            {formatCurrency(creator.fee)}
                          </TableCell>
                          <TableCell className="text-center font-medium">{creator.campaigns}회</TableCell>
                          <TableCell className="text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Star className="h-4 w-4 text-amber-400 fill-amber-400" />
                              <span className="font-medium">{creator.rating}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="icon" title="수정">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                onClick={() => handleDeleteCreator('recommended', creator.id)}
                                title="삭제"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                    {recommendedCreators.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-12 text-gray-500">
                          <Crown className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                          <p>등록된 추천 크리에이터가 없습니다.</p>
                          <Button variant="outline" className="mt-4" onClick={() => openAddModal('recommended')}>
                            <Plus className="mr-2 h-4 w-4" />
                            크리에이터 추가
                          </Button>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 소속 크리에이터 */}
        <TabsContent value="affiliated" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600">CNEC 소속 크리에이터를 관리합니다.</p>
            </div>
            <Button onClick={() => openAddModal('affiliated')} className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              <Plus className="mr-2 h-4 w-4" />
              크리에이터 추가
            </Button>
          </div>

          <Card className="border-0 shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table className="min-w-[1000px]">
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-purple-50 to-pink-50">
                      <TableHead className="w-[220px] font-semibold">크리에이터</TableHead>
                      <TableHead className="w-[120px] font-semibold">SNS</TableHead>
                      <TableHead className="w-[100px] font-semibold">등급</TableHead>
                      <TableHead className="w-[120px] font-semibold text-right">원고비</TableHead>
                      <TableHead className="w-[110px] font-semibold">계약 시작</TableHead>
                      <TableHead className="w-[110px] font-semibold">계약 종료</TableHead>
                      <TableHead className="w-[80px] font-semibold text-center">캠페인</TableHead>
                      <TableHead className="w-[100px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {affiliatedCreators.map((creator) => {
                      const GradeIcon = gradeConfig[creator.grade]?.icon
                      const isExpiringSoon = new Date(creator.contractEnd) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
                      return (
                        <TableRow key={creator.id} className="hover:bg-purple-50/30 transition-colors">
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10 border-2 border-white shadow">
                                <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-400 text-white font-semibold">
                                  {creator.name[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-semibold text-gray-900">{creator.name}</p>
                                <p className="text-sm text-gray-500">{creator.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <SnsLinks creator={creator} />
                          </TableCell>
                          <TableCell>
                            <Badge className={`${gradeConfig[creator.grade]?.color}`}>
                              {GradeIcon && <GradeIcon className="h-3 w-3 mr-1" />}
                              {gradeConfig[creator.grade]?.label}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-bold text-purple-600">
                            {formatCurrency(creator.fee)}
                          </TableCell>
                          <TableCell className="text-gray-600">{formatDate(creator.contractStart)}</TableCell>
                          <TableCell>
                            <span className={isExpiringSoon ? 'text-red-600 font-medium' : 'text-gray-600'}>
                              {formatDate(creator.contractEnd)}
                            </span>
                            {isExpiringSoon && (
                              <Badge variant="outline" className="ml-2 text-xs text-red-500 border-red-200">
                                곧 만료
                              </Badge>
                            )}
                          </TableCell>
                          <TableCell className="text-center font-medium">{creator.campaigns}회</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button variant="ghost" size="icon" title="수정">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                onClick={() => handleDeleteCreator('affiliated', creator.id)}
                                title="삭제"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                    {affiliatedCreators.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={8} className="text-center py-12 text-gray-500">
                          <Award className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                          <p>등록된 소속 크리에이터가 없습니다.</p>
                          <Button variant="outline" className="mt-4" onClick={() => openAddModal('affiliated')}>
                            <Plus className="mr-2 h-4 w-4" />
                            크리에이터 추가
                          </Button>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 유튜브 지원 크리에이터 */}
        <TabsContent value="youtube" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-600">유튜브 지원 크리에이터를 관리하고 업로드 현황을 확인합니다.</p>
            </div>
            <Button onClick={() => openAddModal('youtube')} className="bg-gradient-to-r from-red-500 to-rose-500 hover:from-red-600 hover:to-rose-600">
              <Plus className="mr-2 h-4 w-4" />
              크리에이터 추가
            </Button>
          </div>

          {/* 경고 배너 */}
          {youtubeCreators.filter(c => c.weeklyUploads < 1).length > 0 && (
            <Card className="border-red-200 bg-gradient-to-r from-red-50 to-rose-50">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-red-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-red-800">
                      {youtubeCreators.filter(c => c.weeklyUploads < 1).length}명의 크리에이터가 주간 업로드를 완료하지 않았습니다.
                    </p>
                    <p className="text-sm text-red-600">알림을 발송하여 업로드를 독려하세요.</p>
                  </div>
                  <Button
                    variant="outline"
                    className="border-red-300 text-red-600 hover:bg-red-100"
                    onClick={() => {
                      toast.success('미업로드 크리에이터에게 일괄 알림이 발송되었습니다.')
                    }}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    일괄 알림 발송
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="border-0 shadow-lg overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table className="min-w-[1100px]">
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-red-50 to-rose-50">
                      <TableHead className="w-[200px] font-semibold">크리에이터</TableHead>
                      <TableHead className="w-[150px] font-semibold">유튜브 채널</TableHead>
                      <TableHead className="w-[100px] font-semibold text-right">원고비</TableHead>
                      <TableHead className="w-[100px] font-semibold">최근 업로드</TableHead>
                      <TableHead className="w-[100px] font-semibold text-center">주간 업로드</TableHead>
                      <TableHead className="w-[100px] font-semibold text-right">총 조회수</TableHead>
                      <TableHead className="w-[80px] font-semibold text-center">총 영상</TableHead>
                      <TableHead className="w-[80px] font-semibold text-center">경고</TableHead>
                      <TableHead className="w-[140px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {youtubeCreators.map((creator) => {
                      const needsWarning = creator.weeklyUploads < 1
                      return (
                        <TableRow
                          key={creator.id}
                          className={`transition-colors ${needsWarning ? 'bg-red-50/50 hover:bg-red-50' : 'hover:bg-gray-50/50'}`}
                        >
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10 border-2 border-white shadow">
                                <AvatarFallback className="bg-gradient-to-br from-red-400 to-rose-400 text-white font-semibold">
                                  {creator.name[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-semibold text-gray-900">{creator.name}</p>
                                <p className="text-sm text-gray-500">{creator.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <a
                              href={creator.youtubeChannelUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-red-600 hover:text-red-700 hover:underline"
                            >
                              <Youtube className="h-4 w-4" />
                              <span className="truncate max-w-[100px]">{creator.youtube}</span>
                              <ExternalLink className="h-3 w-3 flex-shrink-0" />
                            </a>
                          </TableCell>
                          <TableCell className="text-right font-bold text-red-600">
                            {formatCurrency(creator.fee)}
                          </TableCell>
                          <TableCell className="text-gray-600">
                            {creator.lastUpload ? formatDate(creator.lastUpload) : '-'}
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge className={needsWarning ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}>
                              {needsWarning && <AlertCircle className="h-3 w-3 mr-1" />}
                              {creator.weeklyUploads}개
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {(creator.totalViews / 1000000).toFixed(1)}M
                          </TableCell>
                          <TableCell className="text-center font-medium">{creator.totalVideos}개</TableCell>
                          <TableCell className="text-center">
                            <Badge className={creator.warningCount > 0 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'}>
                              {creator.warningCount}회
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => openYoutubeStatsModal(creator)}
                                title="통계 보기"
                              >
                                <BarChart3 className="h-4 w-4" />
                              </Button>
                              {needsWarning && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                  onClick={() => openNotificationModal(creator)}
                                  title="알림 발송"
                                >
                                  <Send className="h-4 w-4" />
                                </Button>
                              )}
                              <Button
                                variant="ghost"
                                size="icon"
                                className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                onClick={() => handleDeleteCreator('youtube', creator.id)}
                                title="삭제"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      )
                    })}
                    {youtubeCreators.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={9} className="text-center py-12 text-gray-500">
                          <Youtube className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                          <p>등록된 유튜브 지원 크리에이터가 없습니다.</p>
                          <Button variant="outline" className="mt-4" onClick={() => openAddModal('youtube')}>
                            <Plus className="mr-2 h-4 w-4" />
                            크리에이터 추가
                          </Button>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* 모달들 */}
      <AddCreatorModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        type={addModalType}
        creators={allCreators}
        onAdd={(creators) => handleAddCreators(addModalType, creators)}
      />

      <ExcelUploadModal
        isOpen={excelModalOpen}
        onClose={() => setExcelModalOpen(false)}
      />

      <CreatorDetailModal
        isOpen={detailModalOpen}
        onClose={() => setDetailModalOpen(false)}
        creator={selectedCreator}
      />

      <YoutubeStatsModal
        isOpen={youtubeStatsModalOpen}
        onClose={() => setYoutubeStatsModalOpen(false)}
        creator={selectedCreator}
      />

      <SendNotificationModal
        isOpen={notificationModalOpen}
        onClose={() => setNotificationModalOpen(false)}
        creator={notificationCreator}
      />
    </div>
  )
}
