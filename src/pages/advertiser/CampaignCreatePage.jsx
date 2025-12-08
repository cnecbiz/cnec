import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Save,
  Send,
  Upload,
  Plus,
  X,
} from 'lucide-react';
import {
  Card,
  CardTitle,
  CardContent,
  Button,
  Input,
  Select,
  Badge,
} from '../../components/common';
import {
  PRODUCT_CATEGORIES,
  SKIN_CONCERNS,
  VIDEO_CONCEPTS,
  VIDEO_SPEEDS,
  VIDEO_LENGTHS,
  REQUIRED_SCENES,
  PLANNED_SHORTFORM_FEES,
  FOUR_WEEK_CHALLENGE_FEES,
  GENDER_OPTIONS,
  AGE_GROUPS,
} from '../../constants';

const steps = [
  { id: 1, name: '캠페인 유형' },
  { id: 2, name: '기본 정보' },
  { id: 3, name: '제품 정보' },
  { id: 4, name: '콘텐츠 설정' },
  { id: 5, name: '일정 및 예산' },
  { id: 6, name: '확인' },
];

export const CampaignCreatePage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const initialType = searchParams.get('type') || '';

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1
    category: initialType,

    // Step 2
    campaignName: '',
    advertiserName: '',
    brandName: '',

    // Step 3
    productCategory: '',
    productName: '',
    productUrl: '',
    productPrice: '',
    productImage: null,
    targetGender: '',
    targetAgeGroups: [],
    painPoints: [],

    // Step 4
    videoConceptst: [],
    videoSpeed: '',
    videoLength: '',
    hookingPoint: '',
    referenceUrl: '',
    emphasisPoints: '',
    requiredScenes: [],
    channelPromotion: '',
    hasNarration: '',
    forbiddenKeywords: '',
    hashtags: '',
    hasPartnershipAd: '',

    // Step 5
    targetCount: '',
    manuscriptFee: '',
    recruitmentStartDate: '',
    recruitmentEndDate: '',
    selectionStartDate: '',
    selectionEndDate: '',
    uploadStartDate: '',
    uploadEndDate: '',
    hasSpecificUploadDate: false,
    specificUploadDate: '',

    // Premium specific
    influencerUrl: '',
    desiredFee: '',
  });

  const [loading, setLoading] = useState(false);

  const updateFormData = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const toggleArrayField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveDraft = async () => {
    setLoading(true);
    try {
      // TODO: Save to Supabase
      console.log('Saving draft:', formData);
      alert('임시저장되었습니다.');
    } catch (error) {
      console.error('Error saving draft:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // TODO: Submit to Supabase
      console.log('Submitting campaign:', formData);
      alert('캠페인이 등록되었습니다.');
      navigate('/advertiser/campaigns');
    } catch (error) {
      console.error('Error submitting:', error);
    } finally {
      setLoading(false);
    }
  };

  const getFeeOptions = () => {
    if (formData.category === 'planned_shortform') {
      return PLANNED_SHORTFORM_FEES.map((fee) => ({
        value: fee.toString(),
        label: `${(fee / 10000).toLocaleString()}만원`,
      }));
    }
    if (formData.category === 'four_week_challenge') {
      return FOUR_WEEK_CHALLENGE_FEES.map((fee) => ({
        value: fee.toString(),
        label: `${(fee / 10000).toLocaleString()}만원`,
      }));
    }
    return [];
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">캠페인 유형을 선택하세요</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  value: 'planned_shortform',
                  title: '기획 숏폼',
                  description: '컨셉에 맞는 기획영상, 기획안 제공, 수정 1회 가능',
                },
                {
                  value: 'four_week_challenge',
                  title: '4주 챌린지',
                  description: '1주일에 1개 숏폼을 4주동안 업로드, 드라마틱한 비포&애프터',
                },
                {
                  value: 'premium',
                  title: '프리미엄',
                  description: '메가 인플루언서 섭외',
                },
              ].map((type) => (
                <button
                  key={type.value}
                  onClick={() => updateFormData('category', type.value)}
                  className={`p-6 border-2 rounded-lg text-left transition-colors ${
                    formData.category === type.value
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <h3 className="font-semibold text-gray-900">{type.title}</h3>
                  <p className="text-sm text-gray-500 mt-2">{type.description}</p>
                </button>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">기본 정보</h2>
            <Input
              label="캠페인명"
              value={formData.campaignName}
              onChange={(e) => updateFormData('campaignName', e.target.value)}
              placeholder="캠페인명을 입력하세요"
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="광고주명"
                value={formData.advertiserName}
                onChange={(e) => updateFormData('advertiserName', e.target.value)}
                placeholder="광고주명을 입력하세요"
                required
              />
              <Input
                label="브랜드명"
                value={formData.brandName}
                onChange={(e) => updateFormData('brandName', e.target.value)}
                placeholder="브랜드명을 입력하세요"
                required
              />
            </div>

            {formData.category === 'premium' && (
              <>
                <Input
                  label="섭외 인플루언서 SNS URL"
                  value={formData.influencerUrl}
                  onChange={(e) => updateFormData('influencerUrl', e.target.value)}
                  placeholder="https://instagram.com/..."
                  required
                />
                <Input
                  label="희망 원고비"
                  type="number"
                  value={formData.desiredFee}
                  onChange={(e) => updateFormData('desiredFee', e.target.value)}
                  placeholder="희망 원고비를 입력하세요"
                  required
                />
              </>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">제품 정보</h2>
            <Select
              label="카테고리"
              value={formData.productCategory}
              onChange={(e) => updateFormData('productCategory', e.target.value)}
              options={Object.entries(PRODUCT_CATEGORIES).map(([key, value]) => ({
                value: key,
                label: value,
              }))}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="제품명"
                value={formData.productName}
                onChange={(e) => updateFormData('productName', e.target.value)}
                placeholder="제품명을 입력하세요"
                required
              />
              <Input
                label="제품 가격"
                type="number"
                value={formData.productPrice}
                onChange={(e) => updateFormData('productPrice', e.target.value)}
                placeholder="제품 가격을 입력하세요"
              />
            </div>
            <Input
              label="제품 URL"
              value={formData.productUrl}
              onChange={(e) => updateFormData('productUrl', e.target.value)}
              placeholder="https://..."
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                제품 이미지
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-10 w-10 text-gray-400 mx-auto" />
                <p className="mt-2 text-sm text-gray-500">클릭하여 파일을 업로드하세요</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="주요 고객 성별"
                value={formData.targetGender}
                onChange={(e) => updateFormData('targetGender', e.target.value)}
                options={Object.entries(GENDER_OPTIONS).map(([key, value]) => ({
                  value: key,
                  label: value,
                }))}
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  주요 고객 연령대
                </label>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(AGE_GROUPS).map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() => toggleArrayField('targetAgeGroups', key)}
                      className={`px-3 py-1 rounded-full text-sm ${
                        formData.targetAgeGroups.includes(key)
                          ? 'bg-primary-100 text-primary-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {value}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                페인포인트
              </label>
              <div className="flex flex-wrap gap-2">
                {Object.entries(SKIN_CONCERNS).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => toggleArrayField('painPoints', key)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      formData.painPoints.includes(key)
                        ? 'bg-primary-100 text-primary-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">콘텐츠 설정</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                영상 콘셉트
              </label>
              <div className="flex flex-wrap gap-2">
                {Object.entries(VIDEO_CONCEPTS).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => toggleArrayField('videoConcepts', key)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      formData.videoConcepts?.includes(key)
                        ? 'bg-primary-100 text-primary-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="영상 속도"
                value={formData.videoSpeed}
                onChange={(e) => updateFormData('videoSpeed', e.target.value)}
                options={Object.entries(VIDEO_SPEEDS).map(([key, value]) => ({
                  value: key,
                  label: value,
                }))}
              />
              <Select
                label="영상 길이"
                value={formData.videoLength}
                onChange={(e) => updateFormData('videoLength', e.target.value)}
                options={Object.entries(VIDEO_LENGTHS).map(([key, value]) => ({
                  value: key,
                  label: value,
                }))}
              />
            </div>

            <Input
              label="2초 후킹 포인트"
              value={formData.hookingPoint}
              onChange={(e) => updateFormData('hookingPoint', e.target.value)}
              placeholder="숏폼에서는 처음 2초가 구매 전환에 정말 중요해요"
              helperText="숏폼에서는 처음 2초가 구매 전환에 정말 중요해요"
            />

            <Input
              label="레퍼런스 URL"
              value={formData.referenceUrl}
              onChange={(e) => updateFormData('referenceUrl', e.target.value)}
              placeholder="https://..."
            />

            <Input
              label="강조 포인트"
              value={formData.emphasisPoints}
              onChange={(e) => updateFormData('emphasisPoints', e.target.value)}
              placeholder="강조되었으면 하는 포인트를 입력하세요"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                필수 장면
              </label>
              <p className="text-xs text-gray-500 mb-2">
                숏폼에서는 빠른 화면 전환이 중요합니다. 최소 3곳 이상의 각도가 다르거나 배경이 다르게 촬영을 하셔야 합니다.
              </p>
              <div className="flex flex-wrap gap-2">
                {Object.entries(REQUIRED_SCENES).map(([key, value]) => (
                  <button
                    key={key}
                    onClick={() => toggleArrayField('requiredScenes', key)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      formData.requiredScenes.includes(key)
                        ? 'bg-primary-100 text-primary-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="나레이션 여부"
                value={formData.hasNarration}
                onChange={(e) => updateFormData('hasNarration', e.target.value)}
                options={[
                  { value: 'yes', label: '있음' },
                  { value: 'no', label: '없음' },
                ]}
              />
              <Select
                label="파트너십 광고 코드 발급"
                value={formData.hasPartnershipAd}
                onChange={(e) => updateFormData('hasPartnershipAd', e.target.value)}
                options={[
                  { value: 'yes', label: '예' },
                  { value: 'no', label: '아니오' },
                ]}
              />
            </div>

            <Input
              label="사용금지 키워드 및 표현"
              value={formData.forbiddenKeywords}
              onChange={(e) => updateFormData('forbiddenKeywords', e.target.value)}
              placeholder="사용하면 안 되는 키워드나 표현을 입력하세요"
            />

            <Input
              label="해시태그"
              value={formData.hashtags}
              onChange={(e) => updateFormData('hashtags', e.target.value)}
              placeholder="#브랜드명 #제품명 형식으로 입력하세요"
            />
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">일정 및 예산</h2>

            {formData.category !== 'premium' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="목표 인원"
                    type="number"
                    value={formData.targetCount}
                    onChange={(e) => updateFormData('targetCount', e.target.value)}
                    placeholder="목표 인원수"
                    required
                  />
                  <Select
                    label="원고비"
                    value={formData.manuscriptFee}
                    onChange={(e) => updateFormData('manuscriptFee', e.target.value)}
                    options={getFeeOptions()}
                    required
                  />
                </div>

                {formData.targetCount && formData.manuscriptFee && (
                  <Card className="bg-primary-50">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">총 원고료</span>
                      <span className="text-xl font-bold text-primary-600">
                        {(parseInt(formData.targetCount) * parseInt(formData.manuscriptFee)).toLocaleString()}원
                      </span>
                    </div>
                  </Card>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    캠페인 모집 기간
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="date"
                      value={formData.recruitmentStartDate}
                      onChange={(e) => updateFormData('recruitmentStartDate', e.target.value)}
                    />
                    <Input
                      type="date"
                      value={formData.recruitmentEndDate}
                      onChange={(e) => updateFormData('recruitmentEndDate', e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    크리에이터 선정 기간
                  </label>
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      type="date"
                      value={formData.selectionStartDate}
                      onChange={(e) => updateFormData('selectionStartDate', e.target.value)}
                    />
                    <Input
                      type="date"
                      value={formData.selectionEndDate}
                      onChange={(e) => updateFormData('selectionEndDate', e.target.value)}
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                제작 및 업로드 완료 기한
              </label>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="date"
                  value={formData.uploadStartDate}
                  onChange={(e) => updateFormData('uploadStartDate', e.target.value)}
                />
                <Input
                  type="date"
                  value={formData.uploadEndDate}
                  onChange={(e) => updateFormData('uploadEndDate', e.target.value)}
                />
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="specificUpload"
                checked={formData.hasSpecificUploadDate}
                onChange={(e) => updateFormData('hasSpecificUploadDate', e.target.checked)}
                className="h-4 w-4 text-primary-600 border-gray-300 rounded"
              />
              <label htmlFor="specificUpload" className="text-sm text-gray-700">
                특정일 필수 업로드 및 스토리링크 추가 (+5만원)
              </label>
            </div>

            {formData.hasSpecificUploadDate && (
              <Input
                label="특정 업로드 날짜"
                type="date"
                value={formData.specificUploadDate}
                onChange={(e) => updateFormData('specificUploadDate', e.target.value)}
              />
            )}
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold">캠페인 정보 확인</h2>

            <Card>
              <CardTitle>기본 정보</CardTitle>
              <CardContent className="mt-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">캠페인 유형</span>
                  <span className="font-medium">
                    {formData.category === 'planned_shortform' && '기획 숏폼'}
                    {formData.category === 'four_week_challenge' && '4주 챌린지'}
                    {formData.category === 'premium' && '프리미엄'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">캠페인명</span>
                  <span className="font-medium">{formData.campaignName || '-'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">광고주/브랜드</span>
                  <span className="font-medium">{formData.advertiserName} / {formData.brandName}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardTitle>예산</CardTitle>
              <CardContent className="mt-4 space-y-2">
                {formData.category !== 'premium' ? (
                  <>
                    <div className="flex justify-between">
                      <span className="text-gray-500">목표 인원</span>
                      <span className="font-medium">{formData.targetCount}명</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">원고비</span>
                      <span className="font-medium">{parseInt(formData.manuscriptFee).toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span className="text-gray-700 font-medium">총 원고료</span>
                      <span className="font-bold text-primary-600">
                        {(parseInt(formData.targetCount || 0) * parseInt(formData.manuscriptFee || 0)).toLocaleString()}원
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="flex justify-between">
                    <span className="text-gray-500">희망 원고비</span>
                    <span className="font-medium">{parseInt(formData.desiredFee || 0).toLocaleString()}원</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-sm text-yellow-800">
                캠페인 등록 후 결제가 진행됩니다. 등록된 내용을 다시 한번 확인해주세요.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate('/advertiser/campaigns')}
          className="p-2 hover:bg-gray-100 rounded-lg"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">캠페인 등록</h1>
          <p className="text-gray-500 mt-1">새로운 캠페인을 등록합니다</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div
              className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                currentStep >= step.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {step.id}
            </div>
            <span
              className={`ml-2 text-sm hidden md:block ${
                currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
              }`}
            >
              {step.name}
            </span>
            {index < steps.length - 1 && (
              <div
                className={`w-12 h-0.5 mx-4 ${
                  currentStep > step.id ? 'bg-primary-600' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* Form Content */}
      <Card>
        {renderStep()}
      </Card>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between">
        <div>
          {currentStep > 1 && (
            <Button variant="outline" icon={ArrowLeft} onClick={handlePrev}>
              이전
            </Button>
          )}
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" icon={Save} onClick={handleSaveDraft} loading={loading}>
            임시저장
          </Button>
          {currentStep < steps.length ? (
            <Button icon={ArrowRight} iconPosition="right" onClick={handleNext}>
              다음
            </Button>
          ) : (
            <Button icon={Send} onClick={handleSubmit} loading={loading}>
              캠페인 등록
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignCreatePage;
