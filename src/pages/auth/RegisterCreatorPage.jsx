import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuthStore } from '@/stores/authStore'
import { toast } from '@/stores/uiStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Progress } from '@/components/ui/progress'
import { ArrowLeft, ArrowRight, Eye, EyeOff, Check } from 'lucide-react'

const step1Schema = z.object({
  email: z.string().email('올바른 이메일 주소를 입력해 주세요.'),
  password: z
    .string()
    .min(8, '비밀번호는 8자 이상이어야 합니다.')
    .regex(/[A-Za-z]/, '영문자를 포함해야 합니다.')
    .regex(/[0-9]/, '숫자를 포함해야 합니다.'),
  passwordConfirm: z.string(),
  name: z.string().min(2, '이름을 입력해 주세요.'),
  nickname: z.string().min(2, '닉네임을 입력해 주세요.'),
  phone: z.string().regex(/^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/, '올바른 전화번호를 입력해 주세요.'),
}).refine((data) => data.password === data.passwordConfirm, {
  message: '비밀번호가 일치하지 않습니다.',
  path: ['passwordConfirm'],
})

const step2Schema = z.object({
  skinType: z.string().min(1, '피부 타입을 선택해 주세요.'),
  skinConcerns: z.array(z.string()).min(1, '최소 1개의 피부 고민을 선택해 주세요.'),
  categories: z.array(z.string()).min(1, '최소 1개의 카테고리를 선택해 주세요.'),
})

const step3Schema = z.object({
  instagram: z.string().optional(),
  tiktok: z.string().optional(),
  youtube: z.string().optional(),
}).refine((data) => data.instagram || data.tiktok || data.youtube, {
  message: '최소 1개의 SNS 계정을 연동해 주세요.',
})

const skinTypes = ['건성', '지성', '복합성', '중성', '민감성']
const skinConcerns = ['여드름', '모공', '주름', '미백', '탄력', '건조', '민감', '홍조', '잡티', '블랙헤드']
const categories = ['스킨케어', '메이크업', '헤어', '바디', '향수', '네일', '뷰티디바이스']

export function RegisterCreatorPage() {
  const navigate = useNavigate()
  const { signUp } = useAuthStore()
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({})

  const totalSteps = 3
  const progress = (step / totalSteps) * 100

  const form1 = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
      name: '',
      nickname: '',
      phone: '',
    },
  })

  const form2 = useForm({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      skinType: '',
      skinConcerns: [],
      categories: [],
    },
  })

  const form3 = useForm({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      instagram: '',
      tiktok: '',
      youtube: '',
    },
  })

  const handleStep1Submit = (data) => {
    setFormData((prev) => ({ ...prev, ...data }))
    setStep(2)
  }

  const handleStep2Submit = (data) => {
    setFormData((prev) => ({ ...prev, ...data }))
    setStep(3)
  }

  const handleStep3Submit = async (data) => {
    const finalData = { ...formData, ...data }
    setIsLoading(true)

    const { data: signUpData, error } = await signUp({
      email: finalData.email,
      password: finalData.password,
      userType: 'creator',
      metadata: {
        name: finalData.name,
        nickname: finalData.nickname,
        phone: finalData.phone,
        skin_type: finalData.skinType,
        skin_concerns: finalData.skinConcerns,
        categories: finalData.categories,
        instagram_handle: finalData.instagram,
        tiktok_handle: finalData.tiktok,
        youtube_handle: finalData.youtube,
      },
    })

    setIsLoading(false)

    if (error) {
      let errorMessage = '회원가입에 실패했습니다.'
      if (error.message?.includes('already registered')) {
        errorMessage = '이미 등록된 이메일입니다.'
      } else if (error.message?.includes('User already registered')) {
        errorMessage = '이미 등록된 이메일입니다.'
      } else if (error.message?.includes('Password')) {
        errorMessage = '비밀번호 형식이 올바르지 않습니다.'
      } else if (error.message) {
        errorMessage = error.message
      }
      toast.error(errorMessage)
      return
    }

    // 이미 등록된 이메일인 경우
    if (signUpData?.user?.identities?.length === 0) {
      toast.error('이미 등록된 이메일입니다.')
      return
    }

    // 이메일 확인이 필요한 경우
    if (signUpData?.user && !signUpData?.session) {
      toast.success('가입 확인 이메일이 발송되었습니다. 이메일을 확인해 주세요.')
      navigate('/auth/login')
      return
    }

    toast.success('회원가입이 완료되었습니다!')
    navigate('/auth/login')
  }

  const toggleArrayValue = (form, field, value) => {
    const current = form.getValues(field) || []
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    form.setValue(field, updated, { shouldValidate: true })
  }

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-4">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="text-gray-400 hover:text-gray-600"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
          <span className="text-sm text-gray-500">
            {step}/{totalSteps} 단계
          </span>
        </div>
        <Progress value={progress} className="h-1" />
      </div>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {step === 1 && '기본 정보'}
          {step === 2 && '뷰티 프로필'}
          {step === 3 && 'SNS 연동'}
        </h1>
        <p className="text-gray-500 mt-2">
          {step === 1 && '계정 생성에 필요한 기본 정보를 입력해 주세요.'}
          {step === 2 && '더 정확한 캠페인 매칭을 위해 피부 정보를 알려주세요.'}
          {step === 3 && 'SNS 계정을 연동하여 포트폴리오를 완성해 주세요.'}
        </p>
      </div>

      {/* Step 1: Basic Info */}
      {step === 1 && (
        <form onSubmit={form1.handleSubmit(handleStep1Submit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" required>이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              error={!!form1.formState.errors.email}
              {...form1.register('email')}
            />
            {form1.formState.errors.email && (
              <p className="text-sm text-error">{form1.formState.errors.email.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" required>이름</Label>
              <Input
                id="name"
                placeholder="홍길동"
                error={!!form1.formState.errors.name}
                {...form1.register('name')}
              />
              {form1.formState.errors.name && (
                <p className="text-sm text-error">{form1.formState.errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="nickname" required>닉네임</Label>
              <Input
                id="nickname"
                placeholder="뷰티크리에이터"
                error={!!form1.formState.errors.nickname}
                {...form1.register('nickname')}
              />
              {form1.formState.errors.nickname && (
                <p className="text-sm text-error">{form1.formState.errors.nickname.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" required>휴대폰 번호</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="010-1234-5678"
              error={!!form1.formState.errors.phone}
              {...form1.register('phone')}
            />
            {form1.formState.errors.phone && (
              <p className="text-sm text-error">{form1.formState.errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" required>비밀번호</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="8자 이상, 영문+숫자 조합"
                error={!!form1.formState.errors.password}
                {...form1.register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>
            {form1.formState.errors.password && (
              <p className="text-sm text-error">{form1.formState.errors.password.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="passwordConfirm" required>비밀번호 확인</Label>
            <Input
              id="passwordConfirm"
              type="password"
              placeholder="비밀번호를 다시 입력하세요"
              error={!!form1.formState.errors.passwordConfirm}
              {...form1.register('passwordConfirm')}
            />
            {form1.formState.errors.passwordConfirm && (
              <p className="text-sm text-error">{form1.formState.errors.passwordConfirm.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" size="lg">
            다음 <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      )}

      {/* Step 2: Beauty Profile */}
      {step === 2 && (
        <form onSubmit={form2.handleSubmit(handleStep2Submit)} className="space-y-6">
          <div className="space-y-3">
            <Label required>피부 타입</Label>
            <div className="flex flex-wrap gap-2">
              {skinTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => form2.setValue('skinType', type, { shouldValidate: true })}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    form2.watch('skinType') === type
                      ? 'bg-cnec-blue text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            {form2.formState.errors.skinType && (
              <p className="text-sm text-error">{form2.formState.errors.skinType.message}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label required>피부 고민 (복수 선택)</Label>
            <div className="flex flex-wrap gap-2">
              {skinConcerns.map((concern) => (
                <button
                  key={concern}
                  type="button"
                  onClick={() => toggleArrayValue(form2, 'skinConcerns', concern)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    form2.watch('skinConcerns')?.includes(concern)
                      ? 'bg-cnec-blue text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {concern}
                </button>
              ))}
            </div>
            {form2.formState.errors.skinConcerns && (
              <p className="text-sm text-error">{form2.formState.errors.skinConcerns.message}</p>
            )}
          </div>

          <div className="space-y-3">
            <Label required>관심 카테고리 (복수 선택)</Label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => toggleArrayValue(form2, 'categories', category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    form2.watch('categories')?.includes(category)
                      ? 'bg-cnec-blue text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            {form2.formState.errors.categories && (
              <p className="text-sm text-error">{form2.formState.errors.categories.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" size="lg">
            다음 <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      )}

      {/* Step 3: SNS Connection */}
      {step === 3 && (
        <form onSubmit={form3.handleSubmit(handleStep3Submit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="instagram">Instagram</Label>
            <Input
              id="instagram"
              placeholder="@username"
              {...form3.register('instagram')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="tiktok">TikTok</Label>
            <Input
              id="tiktok"
              placeholder="@username"
              {...form3.register('tiktok')}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="youtube">YouTube</Label>
            <Input
              id="youtube"
              placeholder="채널 URL 또는 핸들"
              {...form3.register('youtube')}
            />
          </div>

          {form3.formState.errors.root && (
            <p className="text-sm text-error">{form3.formState.errors.root.message}</p>
          )}

          <div className="flex items-start gap-2 mt-6">
            <Checkbox id="terms" required />
            <label htmlFor="terms" className="text-sm text-gray-600">
              <Link to="/terms" className="text-cnec-blue hover:underline">이용약관</Link>
              {' '}및{' '}
              <Link to="/privacy" className="text-cnec-blue hover:underline">개인정보처리방침</Link>
              에 동의합니다.
            </label>
          </div>

          <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
            <Check className="mr-2 h-4 w-4" />
            회원가입 완료
          </Button>
        </form>
      )}

      <p className="mt-8 text-center text-sm text-gray-500">
        이미 계정이 있으신가요?{' '}
        <Link to="/auth/login" className="text-cnec-blue font-medium hover:underline">
          로그인
        </Link>
      </p>
    </div>
  )
}
