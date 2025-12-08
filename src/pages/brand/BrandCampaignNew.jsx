import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from '@/stores/uiStore'
import { formatCurrency } from '@/lib/utils'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  Upload,
  Plus,
  X,
  Loader2,
  Save,
  Calendar,
  Package,
  Users,
  Video,
  Settings,
  CreditCard,
  Info,
} from 'lucide-react'

// 캠페인 유형
const campaignTypes = [
  {
    id: 'shortform',
    name: '기획 숏폼',
    description: '컨셉에 맞는 기획영상, 기획안 제공, 수정 1회 가능',
    fees: [300000, 400000, 500000, 600000],
  },
  {
    id: 'challenge_4week',
    name: '4주 챌린지',
    description: '1주일에 1개 숏폼을 4주동안 업로드, 드라마틱한 비포&애프터',
    fees: [600000, 800000, 1000000, 1200000],
  },
  {
    id: 'premium',
    name: '프리미엄',
    description: '메가 인플루언서 섭외',
    fees: [],
  },
]

// 제품 카테고리
const productCategories = ['기초', '색조', '디바이스', '이너뷰티', '기타']

// 페인포인트
const painPoints = ['모공', '주름', '기미', '여드름', '건조']

// 연령대
const ageGroups = ['10대', '20대', '30대', '40대', '50대+']

// 영상 콘셉트
const videoConcepts = ['비포&애프터', '브이로그', '유머']

// 영상 속도
const videoSpeeds = [
  { value: 'fast', label: '빠른전개' },
  { value: 'normal', label: '보통' },
  { value: 'slow', label: '느리게' },
]

// 영상 길이
const videoLengths = [
  { value: '15', label: '15초 이내' },
  { value: '30', label: '30초 내외' },
  { value: '45', label: '45초 내외' },
  { value: '60', label: '60초 내외' },
]

// 필수 장면
const requiredSceneOptions = ['비포&애프터', '제품 사용', '제품 단독', '제형', '화장대', '집', '야외']

export function BrandCampaignNew() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // 폼 데이터
  const [formData, setFormData] = useState({
    // 기본 정보
    campaignType: 'shortform',
    campaignName: '',

    // 광고주 정보 (가입 데이터 연동)
    advertiserName: '',
    brandName: '',

    // 제품 정보
    productCategory: '',
    productName: '',
    productUrl: '',
    productPrice: '',
    productImages: [],
    targetGender: 'all',
    targetAgeGroups: [],
    painPoints: [],

    // 모집 정보
    recruitCount: 1,
    fee: 300000,
    productQuantity: 1,
    recruitStartDate: '',
    recruitEndDate: '',
    selectionStartDate: '',
    selectionEndDate: '',
    uploadStartDate: '',
    uploadEndDate: '',

    // 특정일 업로드
    specificUploadDate: '',
    specificUploadEnabled: false,
    storyLinkRequired: false,

    // 콘텐츠 가이드
    videoConcept: '',
    videoSpeed: 'normal',
    videoLength: '30',
    hookingPoint: '',
    referenceUrls: [''],
    emphasisPoints: '',
    requiredScenes: [],

    // 추가 옵션
    channelPromotion: '',
    narrationRequired: false,
    forbiddenKeywords: '',
    hashtags: [''],
    instagramHandle: '',
    partnershipCodeRequired: false,

    // 프리미엄 전용
    influencerUrl: '',
    desiredFee: '',
  })

  // 현재 캠페인 유형 정보
  const currentCampaignType = campaignTypes.find(t => t.id === formData.campaignType)

  // 스텝 설정 (캠페인 유형에 따라 다름)
  const getSteps = () => {
    if (formData.campaignType === 'premium') {
      return [
        { id: 1, name: '캠페인 유형', icon: Sparkles },
        { id: 2, name: '인플루언서 정보', icon: Users },
        { id: 3, name: '콘텐츠 가이드', icon: Video },
        { id: 4, name: '추가 옵션', icon: Settings },
        { id: 5, name: '결제', icon: CreditCard },
      ]
    }
    return [
      { id: 1, name: '캠페인 유형', icon: Sparkles },
      { id: 2, name: '제품 정보', icon: Package },
      { id: 3, name: '모집 정보', icon: Calendar },
      { id: 4, name: '콘텐츠 가이드', icon: Video },
      { id: 5, name: '추가 옵션', icon: Settings },
      { id: 6, name: '결제', icon: CreditCard },
    ]
  }

  const steps = getSteps()
  const progress = (currentStep / steps.length) * 100

  // 폼 업데이트
  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // 배열 토글
  const toggleArrayItem = (field, item) => {
    const current = formData[field]
    const updated = current.includes(item)
      ? current.filter(i => i !== item)
      : [...current, item]
    updateFormData(field, updated)
  }

  // 레퍼런스 URL 관리
  const addReferenceUrl = () => {
    updateFormData('referenceUrls', [...formData.referenceUrls, ''])
  }

  const updateReferenceUrl = (index, value) => {
    const urls = [...formData.referenceUrls]
    urls[index] = value
    updateFormData('referenceUrls', urls)
  }

  const removeReferenceUrl = (index) => {
    updateFormData('referenceUrls', formData.referenceUrls.filter((_, i) => i !== index))
  }

  // 해시태그 관리
  const addHashtag = () => {
    updateFormData('hashtags', [...formData.hashtags, ''])
  }

  const updateHashtag = (index, value) => {
    const tags = [...formData.hashtags]
    tags[index] = value
    updateFormData('hashtags', tags)
  }

  const removeHashtag = (index) => {
    updateFormData('hashtags', formData.hashtags.filter((_, i) => i !== index))
  }

  // 총 금액 계산
  const calculateTotal = () => {
    const baseFee = formData.fee * formData.recruitCount
    const specificUploadFee = formData.specificUploadEnabled ? 50000 * formData.recruitCount : 0
    return baseFee + specificUploadFee
  }

  // 네비게이션
  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // 임시저장
  const handleSaveDraft = () => {
    toast.success('캠페인이 임시저장되었습니다.')
  }

  // 제출
  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      // API 호출 시뮬레이션
      await new Promise(resolve => setTimeout(resolve, 1500))
      toast.success('캠페인이 등록되었습니다.')
      navigate('/brand/campaigns')
    } catch (error) {
      toast.error('캠페인 등록에 실패했습니다.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-12">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/brand/campaigns')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">새 캠페인 등록</h1>
            <p className="text-gray-500">캠페인 정보를 입력하고 크리에이터를 모집하세요.</p>
          </div>
        </div>
        <Button variant="outline" onClick={handleSaveDraft}>
          <Save className="mr-2 h-4 w-4" />
          임시저장
        </Button>
      </div>

      {/* Progress */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">
            {currentStep}/{steps.length} 단계: {steps[currentStep - 1].name}
          </span>
          <span className="font-medium text-cnec-blue">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} />
        <div className="flex justify-between">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = currentStep === step.id
            const isCompleted = currentStep > step.id
            return (
              <div
                key={step.id}
                className={`flex flex-col items-center ${
                  isActive ? 'text-cnec-blue' : isCompleted ? 'text-success' : 'text-gray-400'
                }`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-1 ${
                  isActive ? 'bg-cnec-blue text-white' : isCompleted ? 'bg-success text-white' : 'bg-gray-200'
                }`}>
                  {isCompleted ? <Check className="h-4 w-4" /> : <Icon className="h-4 w-4" />}
                </div>
                <span className="text-xs hidden md:block">{step.name}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* Content */}
      <Card>
        <CardContent className="p-6">
          {/* Step 1: 캠페인 유형 */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">캠페인 유형 선택</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {campaignTypes.map((type) => (
                    <div
                      key={type.id}
                      onClick={() => updateFormData('campaignType', type.id)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        formData.campaignType === type.id
                          ? 'border-cnec-blue bg-cnec-blue-light shadow-md'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
                      }`}
                    >
                      <p className="font-semibold text-lg">{type.name}</p>
                      <p className="text-sm text-gray-500 mt-1 mb-3">{type.description}</p>
                      <p className="text-cnec-blue font-medium">
                        {type.fees.length > 0
                          ? `${formatCurrency(type.fees[0])} ~ ${formatCurrency(type.fees[type.fees.length - 1])}`
                          : '협의'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label required>캠페인명</Label>
                  <Input
                    placeholder="예: 에스티로더 더블웨어 파운데이션 숏폼 리뷰"
                    value={formData.campaignName}
                    onChange={(e) => updateFormData('campaignName', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>광고주명</Label>
                  <Input
                    placeholder="회사명"
                    value={formData.advertiserName}
                    onChange={(e) => updateFormData('advertiserName', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>브랜드명</Label>
                <Input
                  placeholder="브랜드명"
                  value={formData.brandName}
                  onChange={(e) => updateFormData('brandName', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 2: 제품 정보 (일반) or 인플루언서 정보 (프리미엄) */}
          {currentStep === 2 && formData.campaignType !== 'premium' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">제품 정보</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label required>카테고리</Label>
                  <Select
                    value={formData.productCategory}
                    onValueChange={(value) => updateFormData('productCategory', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {productCategories.map((cat) => (
                        <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label required>제품명</Label>
                  <Input
                    placeholder="정확한 제품명을 입력하세요"
                    value={formData.productName}
                    onChange={(e) => updateFormData('productName', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>제품 URL</Label>
                  <Input
                    placeholder="제품 상세 페이지 링크"
                    value={formData.productUrl}
                    onChange={(e) => updateFormData('productUrl', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>제품 가격 (원)</Label>
                  <Input
                    type="number"
                    placeholder="정가"
                    value={formData.productPrice}
                    onChange={(e) => updateFormData('productPrice', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>제품 이미지</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-cnec-blue transition-colors cursor-pointer">
                  <Upload className="h-10 w-10 mx-auto text-gray-400 mb-3" />
                  <p className="text-sm text-gray-600 font-medium">클릭하여 이미지 업로드</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG (최대 10MB)</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label>주요 고객 (성별)</Label>
                  <div className="flex gap-2">
                    {[
                      { value: 'all', label: '전체' },
                      { value: 'female', label: '여성' },
                      { value: 'male', label: '남성' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => updateFormData('targetGender', option.value)}
                        className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                          formData.targetGender === option.value
                            ? 'bg-cnec-blue text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>주요 고객 (연령대)</Label>
                  <div className="flex flex-wrap gap-2">
                    {ageGroups.map((age) => (
                      <button
                        key={age}
                        type="button"
                        onClick={() => toggleArrayItem('targetAgeGroups', age)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors ${
                          formData.targetAgeGroups.includes(age)
                            ? 'bg-cnec-blue text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {age}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label>페인포인트 (복수 선택)</Label>
                <div className="flex flex-wrap gap-2">
                  {painPoints.map((point) => (
                    <button
                      key={point}
                      type="button"
                      onClick={() => toggleArrayItem('painPoints', point)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        formData.painPoints.includes(point)
                          ? 'bg-cnec-blue text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {point}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: 프리미엄 - 인플루언서 정보 */}
          {currentStep === 2 && formData.campaignType === 'premium' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">인플루언서 정보</h2>

              <div className="space-y-2">
                <Label required>섭외 인플루언서 SNS URL</Label>
                <Input
                  placeholder="https://instagram.com/..."
                  value={formData.influencerUrl}
                  onChange={(e) => updateFormData('influencerUrl', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label required>희망 원고비 (원)</Label>
                <Input
                  type="number"
                  placeholder="협의 금액"
                  value={formData.desiredFee}
                  onChange={(e) => updateFormData('desiredFee', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label required>제작 시작일</Label>
                  <Input
                    type="date"
                    value={formData.uploadStartDate}
                    onChange={(e) => updateFormData('uploadStartDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label required>업로드 완료 기한</Label>
                  <Input
                    type="date"
                    value={formData.uploadEndDate}
                    onChange={(e) => updateFormData('uploadEndDate', e.target.value)}
                  />
                </div>
              </div>

              <div className="p-4 bg-cnec-blue-light rounded-lg">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-cnec-blue mt-0.5" />
                  <div>
                    <p className="font-medium text-cnec-blue">프리미엄 캠페인 안내</p>
                    <p className="text-sm text-gray-600 mt-1">
                      메가 인플루언서 섭외는 CNEC 담당자가 직접 연락하여 진행됩니다.
                      원하시는 인플루언서의 SNS URL과 희망 원고비를 입력해 주세요.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: 모집 정보 */}
          {currentStep === 3 && formData.campaignType !== 'premium' && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">모집 정보</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label required>원고비</Label>
                  <Select
                    value={formData.fee.toString()}
                    onValueChange={(value) => updateFormData('fee', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currentCampaignType?.fees.map((fee) => (
                        <SelectItem key={fee} value={fee.toString()}>
                          {formatCurrency(fee)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label required>제품 수량</Label>
                  <Input
                    type="number"
                    min={1}
                    value={formData.productQuantity}
                    onChange={(e) => updateFormData('productQuantity', parseInt(e.target.value) || 1)}
                  />
                </div>
                <div className="space-y-2">
                  <Label required>목표 인원</Label>
                  <Input
                    type="number"
                    min={1}
                    value={formData.recruitCount}
                    onChange={(e) => updateFormData('recruitCount', parseInt(e.target.value) || 1)}
                  />
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">총 원고료</span>
                  <span className="text-xl font-bold text-cnec-blue">
                    {formatCurrency(formData.fee * formData.recruitCount)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label required>캠페인 모집 시작일</Label>
                  <Input
                    type="date"
                    value={formData.recruitStartDate}
                    onChange={(e) => updateFormData('recruitStartDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label required>캠페인 모집 종료일</Label>
                  <Input
                    type="date"
                    value={formData.recruitEndDate}
                    onChange={(e) => updateFormData('recruitEndDate', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label required>크리에이터 선정 시작일</Label>
                  <Input
                    type="date"
                    value={formData.selectionStartDate}
                    onChange={(e) => updateFormData('selectionStartDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label required>크리에이터 선정 종료일</Label>
                  <Input
                    type="date"
                    value={formData.selectionEndDate}
                    onChange={(e) => updateFormData('selectionEndDate', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label required>제작 및 업로드 시작일</Label>
                  <Input
                    type="date"
                    value={formData.uploadStartDate}
                    onChange={(e) => updateFormData('uploadStartDate', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label required>제작 및 업로드 완료 기한</Label>
                  <Input
                    type="date"
                    value={formData.uploadEndDate}
                    onChange={(e) => updateFormData('uploadEndDate', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-4 p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Checkbox
                    id="specificUpload"
                    checked={formData.specificUploadEnabled}
                    onCheckedChange={(checked) => updateFormData('specificUploadEnabled', checked)}
                  />
                  <div>
                    <label htmlFor="specificUpload" className="font-medium cursor-pointer">
                      특정일 필수 업로드 및 스토리링크 추가
                    </label>
                    <p className="text-sm text-gray-500">(+50,000원/인)</p>
                  </div>
                </div>

                {formData.specificUploadEnabled && (
                  <div className="ml-7 space-y-2">
                    <Label>업로드 지정일</Label>
                    <Input
                      type="date"
                      value={formData.specificUploadDate}
                      onChange={(e) => updateFormData('specificUploadDate', e.target.value)}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Step 3/4: 콘텐츠 가이드 */}
          {((currentStep === 4 && formData.campaignType !== 'premium') ||
            (currentStep === 3 && formData.campaignType === 'premium')) && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">콘텐츠 가이드</h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>영상 콘셉트</Label>
                  <Select
                    value={formData.videoConcept}
                    onValueChange={(value) => updateFormData('videoConcept', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {videoConcepts.map((concept) => (
                        <SelectItem key={concept} value={concept}>{concept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>영상 속도</Label>
                  <Select
                    value={formData.videoSpeed}
                    onValueChange={(value) => updateFormData('videoSpeed', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {videoSpeeds.map((speed) => (
                        <SelectItem key={speed.value} value={speed.value}>{speed.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>영상 길이</Label>
                  <Select
                    value={formData.videoLength}
                    onValueChange={(value) => updateFormData('videoLength', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {videoLengths.map((length) => (
                        <SelectItem key={length.value} value={length.value}>{length.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>2초 후킹 포인트</Label>
                <Input
                  placeholder="숏폼에서는 처음 2초가 구매 전환에 정말 중요해요"
                  value={formData.hookingPoint}
                  onChange={(e) => updateFormData('hookingPoint', e.target.value)}
                />
                <p className="text-xs text-gray-500">시청자의 관심을 끌 첫 2초의 핵심 메시지를 입력하세요</p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>레퍼런스 URL</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addReferenceUrl}>
                    <Plus className="h-4 w-4 mr-1" />
                    추가
                  </Button>
                </div>
                {formData.referenceUrls.map((url, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="참고 영상 URL"
                      value={url}
                      onChange={(e) => updateReferenceUrl(index, e.target.value)}
                    />
                    {formData.referenceUrls.length > 1 && (
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeReferenceUrl(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label>강조 포인트</Label>
                <Textarea
                  placeholder="강조되었으면 하는 포인트를 입력하세요"
                  value={formData.emphasisPoints}
                  onChange={(e) => updateFormData('emphasisPoints', e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <Label>필수 장면 (복수 선택)</Label>
                <p className="text-xs text-gray-500">
                  숏폼에서는 빠른 화면 전환이 중요합니다. 최소 3곳 이상의 각도가 다르거나 배경이 다르게 촬영을 하셔야 합니다.
                </p>
                <div className="flex flex-wrap gap-2">
                  {requiredSceneOptions.map((scene) => (
                    <button
                      key={scene}
                      type="button"
                      onClick={() => toggleArrayItem('requiredScenes', scene)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        formData.requiredScenes.includes(scene)
                          ? 'bg-cnec-blue text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {scene}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4/5: 추가 옵션 */}
          {((currentStep === 5 && formData.campaignType !== 'premium') ||
            (currentStep === 4 && formData.campaignType === 'premium')) && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">추가 옵션</h2>

              <div className="space-y-2">
                <Label>채널 할인 및 프로모션</Label>
                <Input
                  placeholder="예: 10% 할인 코드 제공"
                  value={formData.channelPromotion}
                  onChange={(e) => updateFormData('channelPromotion', e.target.value)}
                />
              </div>

              <div className="flex items-center gap-3">
                <Checkbox
                  id="narration"
                  checked={formData.narrationRequired}
                  onCheckedChange={(checked) => updateFormData('narrationRequired', checked)}
                />
                <label htmlFor="narration" className="cursor-pointer">나레이션 필요 (O)</label>
              </div>

              <div className="space-y-2">
                <Label>사용금지 키워드 및 표현</Label>
                <Input
                  placeholder="콘텐츠에 포함되면 안 되는 단어 (선택)"
                  value={formData.forbiddenKeywords}
                  onChange={(e) => updateFormData('forbiddenKeywords', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>브랜드 인스타그램 주소</Label>
                <Input
                  placeholder="@brandname"
                  value={formData.instagramHandle}
                  onChange={(e) => updateFormData('instagramHandle', e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>해시태그</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addHashtag}>
                    <Plus className="h-4 w-4 mr-1" />
                    추가
                  </Button>
                </div>
                {formData.hashtags.map((tag, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder="#키워드"
                      value={tag}
                      onChange={(e) => updateHashtag(index, e.target.value)}
                    />
                    {formData.hashtags.length > 1 && (
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeHashtag(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <Checkbox
                  id="partnershipCode"
                  checked={formData.partnershipCodeRequired}
                  onCheckedChange={(checked) => updateFormData('partnershipCodeRequired', checked)}
                />
                <label htmlFor="partnershipCode" className="cursor-pointer">파트너십 광고 코드 발급 필요</label>
              </div>
            </div>
          )}

          {/* 마지막 스텝: 결제 */}
          {currentStep === steps.length && (
            <div className="space-y-6">
              <h2 className="text-lg font-semibold">결제 정보</h2>

              <div className="p-6 bg-gray-50 rounded-xl space-y-4">
                <h3 className="font-medium text-gray-800">결제 금액 요약</h3>

                {formData.campaignType !== 'premium' ? (
                  <>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">
                        원고비 ({formatCurrency(formData.fee)} × {formData.recruitCount}명)
                      </span>
                      <span>{formatCurrency(formData.fee * formData.recruitCount)}</span>
                    </div>
                    {formData.specificUploadEnabled && (
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">
                          특정일 업로드 옵션 ({formatCurrency(50000)} × {formData.recruitCount}명)
                        </span>
                        <span>{formatCurrency(50000 * formData.recruitCount)}</span>
                      </div>
                    )}
                    <div className="border-t pt-4 flex justify-between">
                      <span className="font-semibold text-lg">총 결제 금액</span>
                      <span className="font-bold text-2xl text-cnec-blue">
                        {formatCurrency(calculateTotal())}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-4">
                    <p className="text-gray-600">프리미엄 캠페인은 담당자 협의 후 결제가 진행됩니다.</p>
                    <p className="text-xl font-bold text-cnec-blue mt-2">
                      희망 원고비: {formatCurrency(parseInt(formData.desiredFee) || 0)}
                    </p>
                  </div>
                )}
              </div>

              {formData.campaignType !== 'premium' && (
                <div className="space-y-3">
                  <Label>결제 수단</Label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['신용카드', '계좌이체', '카카오페이', '네이버페이'].map((method) => (
                      <div
                        key={method}
                        className="p-4 border-2 border-gray-200 rounded-xl text-center cursor-pointer hover:border-cnec-blue hover:bg-cnec-blue-light transition-all"
                      >
                        <p className="font-medium">{method}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-4 bg-warning-light rounded-lg">
                <p className="text-sm text-warning font-medium">
                  결제 후 캠페인 등록이 완료되며, 선정된 크리에이터에게 제품 발송 후 송장번호를 입력해야 합니다.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={handlePrev} disabled={currentStep === 1}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          이전
        </Button>
        {currentStep < steps.length ? (
          <Button onClick={handleNext}>
            다음
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                처리 중...
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                캠페인 등록
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  )
}
