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
import { generateCampaignPlan } from '@/lib/ai'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Sparkles,
  Upload,
  Plus,
  X,
  Loader2,
  RefreshCw,
} from 'lucide-react'

const steps = [
  { id: 1, name: '기본 정보' },
  { id: 2, name: '제품 정보' },
  { id: 3, name: '모집 정보' },
  { id: 4, name: '콘텐츠 가이드' },
  { id: 5, name: '추가 옵션' },
  { id: 6, name: 'AI 기획안' },
  { id: 7, name: '결제' },
]

const categories = ['스킨케어', '메이크업', '헤어케어', '바디케어', '향수', '네일', '뷰티디바이스']
const skinConcerns = ['여드름', '모공', '주름', '미백', '탄력', '건조', '민감', '홍조']
const campaignTypes = [
  { id: 'short', name: '기획 숏폼', prices: [300000, 400000, 500000, 600000] },
  { id: 'challenge', name: '4주 챌린지', prices: [600000, 800000, 1000000, 1200000] },
  { id: 'premium', name: '프리미엄', prices: [] },
]

export function BrandCampaignNew() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [isGeneratingAI, setIsGeneratingAI] = useState(false)
  const [aiPlan, setAiPlan] = useState(null)
  const [formData, setFormData] = useState({
    campaignType: 'short',
    campaignName: '',
    category: '',
    productName: '',
    productUrl: '',
    productPrice: '',
    productImages: [],
    targetGender: 'all',
    targetAge: [],
    skinConcerns: [],
    fee: 400000,
    recruitCount: 10,
    uploadDeadline: '',
    contentConcept: '',
    contentSpeed: 'normal',
    contentLength: '30',
    hookingPoint: '',
    references: [],
    requiredScenes: [''],
    discount: '',
    narration: false,
    forbiddenKeywords: '',
    hashtags: '',
    partnershipCode: '',
    specificUploadDate: false,
    specificDate: '',
  })

  const progress = (currentStep / steps.length) * 100

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addRequiredScene = () => {
    setFormData((prev) => ({
      ...prev,
      requiredScenes: [...prev.requiredScenes, ''],
    }))
  }

  const updateRequiredScene = (index, value) => {
    setFormData((prev) => {
      const scenes = [...prev.requiredScenes]
      scenes[index] = value
      return { ...prev, requiredScenes: scenes }
    })
  }

  const removeRequiredScene = (index) => {
    setFormData((prev) => ({
      ...prev,
      requiredScenes: prev.requiredScenes.filter((_, i) => i !== index),
    }))
  }

  const handleGenerateAI = async () => {
    setIsGeneratingAI(true)
    try {
      const plan = await generateCampaignPlan(formData, { provider: 'mock' })
      setAiPlan(plan)
      toast.success('AI 기획안이 생성되었습니다.')
    } catch (error) {
      console.error('AI plan generation failed:', error)
      toast.error('AI 기획안 생성에 실패했습니다. 다시 시도해 주세요.')
    } finally {
      setIsGeneratingAI(false)
    }
  }

  const handleRegenerateAI = async () => {
    setAiPlan(null)
    await handleGenerateAI()
  }

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

  const handleSubmit = () => {
    toast.success('캠페인이 등록되었습니다.')
    navigate('/brand/campaigns')
  }

  const totalAmount = formData.fee * formData.recruitCount + (formData.specificUploadDate ? 50000 * formData.recruitCount : 0)

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/brand/campaigns')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">새 캠페인 등록</h1>
          <p className="text-gray-500">캠페인 정보를 입력하고 크리에이터를 모집하세요.</p>
        </div>
      </div>

      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">
            {currentStep}/{steps.length} 단계: {steps[currentStep - 1].name}
          </span>
          <span className="font-medium">{Math.round(progress)}%</span>
        </div>
        <Progress value={progress} />
      </div>

      {/* Step Content */}
      <Card>
        <CardContent className="p-6">
          {/* Step 1: 기본 정보 */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-lg font-semibold mb-4">캠페인 유형 선택</h2>
                <div className="grid grid-cols-3 gap-4">
                  {campaignTypes.map((type) => (
                    <div
                      key={type.id}
                      onClick={() => updateFormData('campaignType', type.id)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                        formData.campaignType === type.id
                          ? 'border-cnec-blue bg-cnec-blue-light'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <p className="font-medium">{type.name}</p>
                      <p className="text-sm text-gray-500 mt-1">
                        {type.prices.length > 0
                          ? `${formatCurrency(type.prices[0])} ~ ${formatCurrency(type.prices[type.prices.length - 1])}`
                          : '협의'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label required>캠페인명</Label>
                <Input
                  placeholder="예: 에스티로더 더블웨어 파운데이션 숏폼 리뷰"
                  value={formData.campaignName}
                  onChange={(e) => updateFormData('campaignName', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 2: 제품 정보 */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label required>카테고리</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => updateFormData('category', value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="선택하세요" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>제품 URL</Label>
                  <Input
                    placeholder="제품 상세 페이지 링크"
                    value={formData.productUrl}
                    onChange={(e) => updateFormData('productUrl', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>제품 가격</Label>
                  <Input
                    placeholder="정가 (원)"
                    value={formData.productPrice}
                    onChange={(e) => updateFormData('productPrice', e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>제품 이미지</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-cnec-blue transition-colors cursor-pointer">
                  <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-600">클릭하여 이미지 업로드</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG (최대 10MB)</p>
                </div>
              </div>

              <div className="space-y-3">
                <Label>타겟 피부 고민 (복수 선택)</Label>
                <div className="flex flex-wrap gap-2">
                  {skinConcerns.map((concern) => (
                    <button
                      key={concern}
                      type="button"
                      onClick={() => {
                        const current = formData.skinConcerns
                        const updated = current.includes(concern)
                          ? current.filter((c) => c !== concern)
                          : [...current, concern]
                        updateFormData('skinConcerns', updated)
                      }}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        formData.skinConcerns.includes(concern)
                          ? 'bg-cnec-blue text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {concern}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: 모집 정보 */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
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
                      {[300000, 400000, 500000, 600000].map((price) => (
                        <SelectItem key={price} value={price.toString()}>
                          {formatCurrency(price)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label required>모집 인원</Label>
                  <Input
                    type="number"
                    min={1}
                    value={formData.recruitCount}
                    onChange={(e) => updateFormData('recruitCount', parseInt(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label required>업로드 마감일</Label>
                <Input
                  type="date"
                  value={formData.uploadDeadline}
                  onChange={(e) => updateFormData('uploadDeadline', e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="specificDate"
                  checked={formData.specificUploadDate}
                  onCheckedChange={(checked) => updateFormData('specificUploadDate', checked)}
                />
                <label htmlFor="specificDate" className="text-sm">
                  특정일 업로드 옵션 (+5만원/인)
                </label>
              </div>

              {formData.specificUploadDate && (
                <div className="space-y-2 ml-6">
                  <Label>업로드 지정일</Label>
                  <Input
                    type="date"
                    value={formData.specificDate}
                    onChange={(e) => updateFormData('specificDate', e.target.value)}
                  />
                </div>
              )}
            </div>
          )}

          {/* Step 4: 콘텐츠 가이드 */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>영상 콘셉트</Label>
                <Textarea
                  placeholder="원하는 영상 분위기나 스타일을 설명해 주세요"
                  value={formData.contentConcept}
                  onChange={(e) => updateFormData('contentConcept', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>영상 속도</Label>
                  <Select
                    value={formData.contentSpeed}
                    onValueChange={(value) => updateFormData('contentSpeed', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="slow">느리게</SelectItem>
                      <SelectItem value="normal">보통</SelectItem>
                      <SelectItem value="fast">빠르게</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>영상 길이</Label>
                  <Select
                    value={formData.contentLength}
                    onValueChange={(value) => updateFormData('contentLength', value)}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15초 이내</SelectItem>
                      <SelectItem value="30">30초 이내</SelectItem>
                      <SelectItem value="60">60초 이내</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>2초 후킹 포인트</Label>
                <Input
                  placeholder="시청자의 관심을 끌 첫 2초의 핵심 메시지"
                  value={formData.hookingPoint}
                  onChange={(e) => updateFormData('hookingPoint', e.target.value)}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>필수 장면 (최소 3개)</Label>
                  <Button type="button" variant="outline" size="sm" onClick={addRequiredScene}>
                    <Plus className="h-4 w-4 mr-1" />
                    추가
                  </Button>
                </div>
                {formData.requiredScenes.map((scene, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      placeholder={`필수 장면 ${index + 1}`}
                      value={scene}
                      onChange={(e) => updateRequiredScene(index, e.target.value)}
                    />
                    {formData.requiredScenes.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeRequiredScene(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: 추가 옵션 */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="space-y-2">
                <Label>할인/프로모션 정보</Label>
                <Input
                  placeholder="예: 10% 할인 코드 제공"
                  value={formData.discount}
                  onChange={(e) => updateFormData('discount', e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  id="narration"
                  checked={formData.narration}
                  onCheckedChange={(checked) => updateFormData('narration', checked)}
                />
                <label htmlFor="narration" className="text-sm">나레이션 포함</label>
              </div>

              <div className="space-y-2">
                <Label>금지 키워드</Label>
                <Input
                  placeholder="콘텐츠에 포함되면 안 되는 단어 (쉼표로 구분)"
                  value={formData.forbiddenKeywords}
                  onChange={(e) => updateFormData('forbiddenKeywords', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>필수 해시태그</Label>
                <Input
                  placeholder="#브랜드명 #제품명 (쉼표로 구분)"
                  value={formData.hashtags}
                  onChange={(e) => updateFormData('hashtags', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>파트너십 코드</Label>
                <Input
                  placeholder="광고 표시에 사용할 파트너십 코드"
                  value={formData.partnershipCode}
                  onChange={(e) => updateFormData('partnershipCode', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 6: AI 기획안 */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div className="text-center py-4">
                <Sparkles className="h-12 w-12 mx-auto text-cnec-blue mb-4" />
                <h2 className="text-lg font-semibold mb-2">AI 기획안 생성</h2>
                <p className="text-gray-500 mb-6">
                  입력하신 정보를 바탕으로 크리에이터용 콘텐츠 기획안을 자동으로 생성합니다.
                </p>
                <Button onClick={handleGenerateAI} disabled={isGeneratingAI}>
                  {isGeneratingAI ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      생성 중...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-4 w-4" />
                      AI 기획안 생성
                    </>
                  )}
                </Button>
              </div>

              {aiPlan && (
                <div className="space-y-6 mt-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg text-cnec-blue">생성된 기획안</h3>
                    <Button variant="outline" size="sm" onClick={handleRegenerateAI} disabled={isGeneratingAI}>
                      <RefreshCw className={`h-4 w-4 mr-1 ${isGeneratingAI ? 'animate-spin' : ''}`} />
                      다시 생성
                    </Button>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-3">스토리보드</h3>
                    <div className="space-y-2">
                      {aiPlan.storyboard.map((item) => (
                        <div key={item.scene} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                          <span className="w-8 h-8 rounded-full bg-cnec-blue text-white flex items-center justify-center text-sm font-medium">
                            {item.scene}
                          </span>
                          <div className="flex-1">
                            <p className="font-medium">{item.description}</p>
                            <p className="text-sm text-gray-500">{item.duration}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">추천 후킹 멘트</h3>
                    <div className="space-y-2">
                      {aiPlan.hookingMents.map((ment, i) => (
                        <p key={i} className="p-3 bg-white rounded-lg text-cnec-blue">{ment}</p>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">추천 해시태그</h3>
                    <div className="flex flex-wrap gap-2">
                      {aiPlan.hashtags.map((tag) => (
                        <span key={tag} className="px-3 py-1 bg-cnec-blue-light text-cnec-blue rounded-full text-sm">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">촬영 팁</h3>
                    <ul className="space-y-2">
                      {aiPlan.shootingTips.map((tip, i) => (
                        <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                          <Check className="h-4 w-4 text-success mt-0.5 shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 7: 결제 */}
          {currentStep === 7 && (
            <div className="space-y-6">
              <div className="p-4 bg-gray-50 rounded-lg space-y-3">
                <h3 className="font-semibold">결제 금액 요약</h3>
                <div className="flex justify-between text-sm">
                  <span>원고비 ({formatCurrency(formData.fee)} x {formData.recruitCount}명)</span>
                  <span>{formatCurrency(formData.fee * formData.recruitCount)}</span>
                </div>
                {formData.specificUploadDate && (
                  <div className="flex justify-between text-sm">
                    <span>특정일 업로드 옵션 ({formatCurrency(50000)} x {formData.recruitCount}명)</span>
                    <span>{formatCurrency(50000 * formData.recruitCount)}</span>
                  </div>
                )}
                <div className="border-t pt-3 flex justify-between font-semibold">
                  <span>총 결제 금액</span>
                  <span className="text-cnec-blue text-lg">{formatCurrency(totalAmount)}</span>
                </div>
              </div>

              <div className="space-y-3">
                <Label>결제 수단</Label>
                <div className="grid grid-cols-2 gap-3">
                  {['신용카드', '계좌이체', '카카오페이', '네이버페이'].map((method) => (
                    <div
                      key={method}
                      className="p-4 border border-gray-200 rounded-lg text-center cursor-pointer hover:border-cnec-blue transition-colors"
                    >
                      {method}
                    </div>
                  ))}
                </div>
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
          <Button onClick={handleSubmit}>
            <Check className="mr-2 h-4 w-4" />
            캠페인 등록
          </Button>
        )}
      </div>
    </div>
  )
}
