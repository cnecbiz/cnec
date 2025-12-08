import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
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
import { formatCurrency, getDDay } from '@/lib/utils'
import {
  Search,
  Filter,
  Calendar,
  Users,
  Heart,
  Clock,
  Package,
  FileText,
  Upload,
  Check,
  AlertCircle,
  ChevronRight,
  X,
  ExternalLink,
} from 'lucide-react'

// Sample campaign data
const allCampaigns = [
  {
    id: '1',
    name: '설화수 자음생크림 체험단',
    brand: '설화수',
    category: 'skincare',
    categoryLabel: '스킨케어',
    campaignType: 'shortform',
    fee: 600000,
    deadline: '2024-12-22',
    applicants: 45,
    maxApplicants: 10,
    image: null,
    description: '설화수의 대표 안티에이징 크림 자음생크림의 사용 후기 콘텐츠를 제작해주세요.',
    productInfo: '자음생크림 60ml + 자음생수 25ml',
    contentGuide: '비포앤애프터 또는 루틴 영상 형식으로 제작해주세요. 최소 30초 이상, 제품 효과 강조',
    videoStyle: 'before_after',
    recruitStart: '2024-12-01',
    recruitEnd: '2024-12-22',
    uploadDeadline: '2025-01-05',
    hashtags: ['#설화수', '#자음생크림', '#안티에이징', '#광고'],
  },
  {
    id: '2',
    name: '이니스프리 그린티 세럼 4주 챌린지',
    brand: '이니스프리',
    category: 'skincare',
    categoryLabel: '스킨케어',
    campaignType: 'challenge_4week',
    fee: 800000,
    deadline: '2024-12-28',
    applicants: 23,
    maxApplicants: 15,
    image: null,
    description: '4주간 그린티 씨드 세럼을 사용하며 매주 1개의 콘텐츠를 업로드해주세요.',
    productInfo: '그린티 씨드 세럼 80ml + 폼 클렌저 150ml',
    contentGuide: '1주차: 언박싱, 2주차: 첫인상 리뷰, 3주차: 비포앤애프터, 4주차: 최종 후기',
    videoStyle: 'vlog',
    recruitStart: '2024-12-10',
    recruitEnd: '2024-12-28',
    uploadDeadline: '2025-02-01',
    hashtags: ['#이니스프리', '#그린티세럼', '#4주챌린지', '#광고'],
  },
  {
    id: '3',
    name: '롬앤 쥬시래스팅 틴트',
    brand: '롬앤',
    category: 'makeup',
    categoryLabel: '메이크업',
    campaignType: 'shortform',
    fee: 300000,
    deadline: '2024-12-30',
    applicants: 67,
    maxApplicants: 20,
    image: null,
    description: '롬앤 쥬시래스팅 틴트 신상 컬러 리뷰 콘텐츠를 제작해주세요.',
    productInfo: '쥬시래스팅 틴트 3종 세트',
    contentGuide: '스와치 + 립 메이크업 룩 영상으로 제작해주세요.',
    videoStyle: 'humor',
    recruitStart: '2024-12-15',
    recruitEnd: '2024-12-30',
    uploadDeadline: '2025-01-10',
    hashtags: ['#롬앤', '#틴트', '#립메이크업', '#광고'],
  },
  {
    id: '4',
    name: '라네즈 네오쿠션 프리미엄 협찬',
    brand: '아모레퍼시픽',
    category: 'makeup',
    categoryLabel: '메이크업',
    campaignType: 'premium',
    fee: 1500000,
    deadline: '2024-12-25',
    applicants: 38,
    maxApplicants: 5,
    image: null,
    description: '라네즈 네오쿠션 프리미엄 협찬 캠페인입니다. 콘텐츠 방향 협의 후 진행됩니다.',
    productInfo: '네오쿠션 + 립라이너 풀세트',
    contentGuide: '협의 후 결정',
    videoStyle: null,
    recruitStart: '2024-12-10',
    recruitEnd: '2024-12-25',
    uploadDeadline: '협의 후 결정',
    hashtags: ['#라네즈', '#네오쿠션', '#광고'],
  },
  {
    id: '5',
    name: 'COSRX 스네일 무신 에센스',
    brand: 'COSRX',
    category: 'skincare',
    categoryLabel: '스킨케어',
    campaignType: 'shortform',
    fee: 400000,
    deadline: '2024-12-27',
    applicants: 56,
    maxApplicants: 15,
    image: null,
    description: 'COSRX 인기 제품 스네일 무신 에센스 리뷰 콘텐츠를 제작해주세요.',
    productInfo: '스네일 무신 에센스 100ml',
    contentGuide: '텍스처 포커싱 + 흡수력 테스트 영상으로 제작해주세요.',
    videoStyle: 'before_after',
    recruitStart: '2024-12-12',
    recruitEnd: '2024-12-27',
    uploadDeadline: '2025-01-08',
    hashtags: ['#COSRX', '#스네일에센스', '#달팽이크림', '#광고'],
  },
  {
    id: '6',
    name: '클리오 킬커버 파운데이션',
    brand: '클리오',
    category: 'makeup',
    categoryLabel: '메이크업',
    campaignType: 'shortform',
    fee: 500000,
    deadline: '2024-12-24',
    applicants: 82,
    maxApplicants: 10,
    image: null,
    description: '클리오 킬커버 파운데이션 리뷰 콘텐츠를 제작해주세요.',
    productInfo: '킬커버 더 뉴 파운데이션 + 프라이머',
    contentGuide: '베이스 메이크업 풀 과정을 담은 영상으로 제작해주세요.',
    videoStyle: 'vlog',
    recruitStart: '2024-12-08',
    recruitEnd: '2024-12-24',
    uploadDeadline: '2025-01-05',
    hashtags: ['#클리오', '#킬커버', '#파운데이션', '#광고'],
  },
]

const campaignTypeLabels = {
  shortform: { label: '기획 숏폼', color: 'bg-blue-100 text-blue-700' },
  challenge_4week: { label: '4주 챌린지', color: 'bg-purple-100 text-purple-700' },
  premium: { label: '프리미엄', color: 'bg-amber-100 text-amber-700' },
}

const videoStyleLabels = {
  before_after: '비포&애프터',
  vlog: '브이로그',
  humor: '유머/밈',
}

export function CreatorCampaigns() {
  const [searchQuery, setSearchQuery] = useState('')
  const [category, setCategory] = useState('all')
  const [campaignType, setCampaignType] = useState('all')
  const [sortBy, setSortBy] = useState('latest')
  const [favorites, setFavorites] = useState(['1', '3'])

  // Detail modal
  const [detailModalOpen, setDetailModalOpen] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState(null)

  // Apply modal
  const [applyModalOpen, setApplyModalOpen] = useState(false)
  const [applyForm, setApplyForm] = useState({
    message: '',
    portfolioUrl: '',
    portfolioFile: null,
    agreedToTerms: false,
  })
  const [applySuccess, setApplySuccess] = useState(false)

  // Filter and sort campaigns
  const filteredCampaigns = allCampaigns
    .filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.brand.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = category === 'all' || c.category === category
      const matchesType = campaignType === 'all' || c.campaignType === campaignType
      return matchesSearch && matchesCategory && matchesType
    })
    .sort((a, b) => {
      if (sortBy === 'deadline') {
        return new Date(a.deadline) - new Date(b.deadline)
      }
      if (sortBy === 'fee') {
        return b.fee - a.fee
      }
      return 0 // latest - keep original order
    })

  // Toggle favorite
  const toggleFavorite = (campaignId) => {
    setFavorites((prev) =>
      prev.includes(campaignId)
        ? prev.filter((id) => id !== campaignId)
        : [...prev, campaignId]
    )
  }

  // Open detail modal
  const openDetail = (campaign) => {
    setSelectedCampaign(campaign)
    setDetailModalOpen(true)
  }

  // Open apply modal
  const openApply = (campaign) => {
    setSelectedCampaign(campaign)
    setApplyForm({
      message: '',
      portfolioUrl: '',
      portfolioFile: null,
      agreedToTerms: false,
    })
    setApplySuccess(false)
    setApplyModalOpen(true)
  }

  // Submit application
  const submitApplication = () => {
    // In real app, would submit to Supabase
    console.log('Submitting application:', {
      campaignId: selectedCampaign.id,
      ...applyForm,
    })
    setApplySuccess(true)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">캠페인 탐색</h1>
        <p className="text-gray-500">지금 모집 중인 캠페인에 지원해 보세요.</p>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[200px]">
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
            <Select value={campaignType} onValueChange={setCampaignType}>
              <SelectTrigger className="w-36">
                <SelectValue placeholder="캠페인 유형" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">전체 유형</SelectItem>
                <SelectItem value="shortform">기획 숏폼</SelectItem>
                <SelectItem value="challenge_4week">4주 챌린지</SelectItem>
                <SelectItem value="premium">프리미엄</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sortBy} onValueChange={setSortBy}>
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
        {filteredCampaigns.map((campaign) => (
          <Card
            key={campaign.id}
            className="overflow-hidden hover:border-cnec-blue transition-colors group"
          >
            {/* Image placeholder */}
            <div
              className="h-40 bg-gradient-to-br from-cnec-blue-light to-gray-100 flex items-center justify-center cursor-pointer"
              onClick={() => openDetail(campaign)}
            >
              <span className="text-4xl font-bold text-cnec-blue/20">
                {campaign.brand[0]}
              </span>
            </div>

            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-2">
                <div
                  className="flex-1 cursor-pointer"
                  onClick={() => openDetail(campaign)}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {campaign.categoryLabel}
                    </Badge>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${campaignTypeLabels[campaign.campaignType].color}`}
                    >
                      {campaignTypeLabels[campaign.campaignType].label}
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-cnec-blue transition-colors">
                    {campaign.name}
                  </h3>
                  <p className="text-sm text-gray-500">{campaign.brand}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="shrink-0"
                  onClick={() => toggleFavorite(campaign.id)}
                >
                  <Heart
                    className={`h-4 w-4 ${
                      favorites.includes(campaign.id)
                        ? 'fill-red-500 text-red-500'
                        : ''
                    }`}
                  />
                </Button>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mt-4 mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {getDDay(campaign.deadline)}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  {campaign.applicants}/{campaign.maxApplicants}명
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-cnec-blue">
                  {formatCurrency(campaign.fee)}
                </span>
                <Button size="sm" onClick={() => openApply(campaign)}>
                  지원하기
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCampaigns.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center text-gray-500">
            검색 조건에 맞는 캠페인이 없습니다.
          </CardContent>
        </Card>
      )}

      {/* Campaign Detail Modal */}
      <Dialog open={detailModalOpen} onOpenChange={setDetailModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>캠페인 상세 정보</DialogTitle>
          </DialogHeader>
          {selectedCampaign && (
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-cnec-blue-light to-gray-100 flex items-center justify-center shrink-0">
                  <span className="text-2xl font-bold text-cnec-blue/30">
                    {selectedCampaign.brand[0]}
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline">{selectedCampaign.categoryLabel}</Badge>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${campaignTypeLabels[selectedCampaign.campaignType].color}`}
                    >
                      {campaignTypeLabels[selectedCampaign.campaignType].label}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {selectedCampaign.name}
                  </h2>
                  <p className="text-gray-500">{selectedCampaign.brand}</p>
                </div>
              </div>

              {/* Info Cards */}
              <div className="grid grid-cols-3 gap-4">
                <div className="border rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-500">원고비</p>
                  <p className="text-lg font-bold text-cnec-blue">
                    {formatCurrency(selectedCampaign.fee)}
                  </p>
                </div>
                <div className="border rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-500">모집 마감</p>
                  <p className="text-lg font-bold">
                    {getDDay(selectedCampaign.deadline)}
                  </p>
                </div>
                <div className="border rounded-lg p-3 text-center">
                  <p className="text-sm text-gray-500">모집 현황</p>
                  <p className="text-lg font-bold">
                    {selectedCampaign.applicants}/{selectedCampaign.maxApplicants}명
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  캠페인 소개
                </h3>
                <p className="text-gray-600">{selectedCampaign.description}</p>
              </div>

              {/* Product Info */}
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  제공 제품
                </h3>
                <p className="text-gray-600">{selectedCampaign.productInfo}</p>
              </div>

              {/* Content Guide */}
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  콘텐츠 가이드
                </h3>
                <p className="text-gray-600">{selectedCampaign.contentGuide}</p>
                {selectedCampaign.videoStyle && (
                  <Badge variant="outline">
                    {videoStyleLabels[selectedCampaign.videoStyle]}
                  </Badge>
                )}
              </div>

              {/* Schedule */}
              <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  일정
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">모집 기간</p>
                    <p>
                      {selectedCampaign.recruitStart} ~ {selectedCampaign.recruitEnd}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">업로드 마감</p>
                    <p>{selectedCampaign.uploadDeadline}</p>
                  </div>
                </div>
              </div>

              {/* Hashtags */}
              <div className="flex flex-wrap gap-2">
                {selectedCampaign.hashtags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDetailModalOpen(false)}>
              닫기
            </Button>
            <Button
              onClick={() => {
                setDetailModalOpen(false)
                openApply(selectedCampaign)
              }}
            >
              지원하기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Apply Modal */}
      <Dialog open={applyModalOpen} onOpenChange={setApplyModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>캠페인 지원</DialogTitle>
          </DialogHeader>
          {selectedCampaign && !applySuccess && (
            <div className="space-y-4">
              {/* Campaign Summary */}
              <div className="p-4 bg-gray-50 rounded-lg">
                <h3 className="font-semibold">{selectedCampaign.name}</h3>
                <p className="text-sm text-gray-500">{selectedCampaign.brand}</p>
                <p className="text-lg font-bold text-cnec-blue mt-1">
                  {formatCurrency(selectedCampaign.fee)}
                </p>
              </div>

              {/* Application Form */}
              <div className="space-y-2">
                <Label>자기 소개 및 지원 동기</Label>
                <Textarea
                  value={applyForm.message}
                  onChange={(e) =>
                    setApplyForm({ ...applyForm, message: e.target.value })
                  }
                  placeholder="이 캠페인에 지원하는 이유와 본인의 콘텐츠 스타일을 소개해주세요..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label>포트폴리오 URL (선택)</Label>
                <Input
                  value={applyForm.portfolioUrl}
                  onChange={(e) =>
                    setApplyForm({ ...applyForm, portfolioUrl: e.target.value })
                  }
                  placeholder="https://instagram.com/your_profile"
                />
              </div>

              <div className="space-y-2">
                <Label>포트폴리오 파일 (선택)</Label>
                <div className="border-2 border-dashed rounded-lg p-4 text-center">
                  {applyForm.portfolioFile ? (
                    <div className="flex items-center justify-center gap-2">
                      <span className="text-sm">{applyForm.portfolioFile.name}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          setApplyForm({ ...applyForm, portfolioFile: null })
                        }
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        className="hidden"
                        accept="video/*,image/*,.pdf"
                        onChange={(e) =>
                          setApplyForm({
                            ...applyForm,
                            portfolioFile: e.target.files[0],
                          })
                        }
                      />
                      <div className="flex flex-col items-center gap-2 text-gray-500">
                        <Upload className="h-8 w-8" />
                        <span className="text-sm">파일을 선택하거나 드래그하세요</span>
                        <span className="text-xs">영상, 이미지, PDF (최대 50MB)</span>
                      </div>
                    </label>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={applyForm.agreedToTerms}
                  onChange={(e) =>
                    setApplyForm({ ...applyForm, agreedToTerms: e.target.checked })
                  }
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  캠페인 가이드라인을 확인했으며, 선정 시 약속된 일정 내에 콘텐츠를
                  제작하고 업로드할 것을 동의합니다.
                </label>
              </div>
            </div>
          )}

          {applySuccess && (
            <div className="py-8 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">지원이 완료되었습니다!</h3>
              <p className="text-gray-500">
                선정 결과는 모집 마감 후 알림으로 안내드립니다.
              </p>
            </div>
          )}

          <DialogFooter>
            {!applySuccess ? (
              <>
                <Button variant="outline" onClick={() => setApplyModalOpen(false)}>
                  취소
                </Button>
                <Button
                  onClick={submitApplication}
                  disabled={!applyForm.message || !applyForm.agreedToTerms}
                >
                  지원하기
                </Button>
              </>
            ) : (
              <Button onClick={() => setApplyModalOpen(false)}>확인</Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
