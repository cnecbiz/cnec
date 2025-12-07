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
import { ArrowLeft, ArrowRight, Eye, EyeOff, Check, Upload } from 'lucide-react'

const step1Schema = z.object({
  email: z.string().email('올바른 이메일 주소를 입력해 주세요.'),
  password: z
    .string()
    .min(8, '비밀번호는 8자 이상이어야 합니다.')
    .regex(/[A-Za-z]/, '영문자를 포함해야 합니다.')
    .regex(/[0-9]/, '숫자를 포함해야 합니다.'),
  passwordConfirm: z.string(),
}).refine((data) => data.password === data.passwordConfirm, {
  message: '비밀번호가 일치하지 않습니다.',
  path: ['passwordConfirm'],
})

const step2Schema = z.object({
  companyName: z.string().min(2, '회사명을 입력해 주세요.'),
  ceoName: z.string().min(2, '대표자명을 입력해 주세요.'),
  businessNumber: z.string().regex(/^\d{3}-?\d{2}-?\d{5}$/, '올바른 사업자등록번호를 입력해 주세요.'),
})

const step3Schema = z.object({
  managerName: z.string().min(2, '담당자명을 입력해 주세요.'),
  managerPhone: z.string().regex(/^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/, '올바른 전화번호를 입력해 주세요.'),
  brandName: z.string().min(2, '브랜드명을 입력해 주세요.'),
  category: z.string().min(1, '카테고리를 선택해 주세요.'),
})

const categories = [
  '스킨케어',
  '메이크업',
  '헤어케어',
  '바디케어',
  '향수',
  '네일',
  '뷰티디바이스',
  '건강기능식품',
  '기타',
]

export function RegisterBrandPage() {
  const navigate = useNavigate()
  const { signUp } = useAuthStore()
  const [step, setStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({})
  const [businessLicense, setBusinessLicense] = useState(null)

  const totalSteps = 3
  const progress = (step / totalSteps) * 100

  const form1 = useForm({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      email: '',
      password: '',
      passwordConfirm: '',
    },
  })

  const form2 = useForm({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      companyName: '',
      ceoName: '',
      businessNumber: '',
    },
  })

  const form3 = useForm({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      managerName: '',
      managerPhone: '',
      brandName: '',
      category: '',
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

    const { error } = await signUp({
      email: finalData.email,
      password: finalData.password,
      userType: 'brand',
      metadata: {
        company_name: finalData.companyName,
        ceo_name: finalData.ceoName,
        business_number: finalData.businessNumber,
        manager_name: finalData.managerName,
        manager_phone: finalData.managerPhone,
        brand_name: finalData.brandName,
        category: finalData.category,
      },
    })

    setIsLoading(false)

    if (error) {
      toast.error(error.message || '회원가입에 실패했습니다.')
      return
    }

    toast.success('회원가입이 완료되었습니다. 관리자 승인 후 이용 가능합니다.')
    navigate('/auth/login')
  }

  const handleFileChange = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      setBusinessLicense(file)
    }
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
          {step === 1 && '계정 정보'}
          {step === 2 && '회사 정보'}
          {step === 3 && '담당자 및 브랜드'}
        </h1>
        <p className="text-gray-500 mt-2">
          {step === 1 && '로그인에 사용할 계정 정보를 입력해 주세요.'}
          {step === 2 && '사업자 정보를 입력해 주세요.'}
          {step === 3 && '담당자와 브랜드 정보를 입력해 주세요.'}
        </p>
      </div>

      {/* Step 1: Account Info */}
      {step === 1 && (
        <form onSubmit={form1.handleSubmit(handleStep1Submit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" required>이메일</Label>
            <Input
              id="email"
              type="email"
              placeholder="example@company.com"
              error={!!form1.formState.errors.email}
              {...form1.register('email')}
            />
            {form1.formState.errors.email && (
              <p className="text-sm text-error">{form1.formState.errors.email.message}</p>
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

      {/* Step 2: Company Info */}
      {step === 2 && (
        <form onSubmit={form2.handleSubmit(handleStep2Submit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="companyName" required>회사명</Label>
            <Input
              id="companyName"
              placeholder="(주)회사명"
              error={!!form2.formState.errors.companyName}
              {...form2.register('companyName')}
            />
            {form2.formState.errors.companyName && (
              <p className="text-sm text-error">{form2.formState.errors.companyName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="ceoName" required>대표자명</Label>
            <Input
              id="ceoName"
              placeholder="홍길동"
              error={!!form2.formState.errors.ceoName}
              {...form2.register('ceoName')}
            />
            {form2.formState.errors.ceoName && (
              <p className="text-sm text-error">{form2.formState.errors.ceoName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="businessNumber" required>사업자등록번호</Label>
            <Input
              id="businessNumber"
              placeholder="123-45-67890"
              error={!!form2.formState.errors.businessNumber}
              {...form2.register('businessNumber')}
            />
            {form2.formState.errors.businessNumber && (
              <p className="text-sm text-error">{form2.formState.errors.businessNumber.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>사업자등록증</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-cnec-blue transition-colors cursor-pointer">
              <input
                type="file"
                id="businessLicense"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="businessLicense" className="cursor-pointer">
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                {businessLicense ? (
                  <p className="text-sm text-cnec-blue font-medium">{businessLicense.name}</p>
                ) : (
                  <>
                    <p className="text-sm text-gray-600">클릭하여 파일 업로드</p>
                    <p className="text-xs text-gray-400 mt-1">PDF, JPG, PNG (최대 10MB)</p>
                  </>
                )}
              </label>
            </div>
          </div>

          <Button type="submit" className="w-full" size="lg">
            다음 <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      )}

      {/* Step 3: Manager & Brand Info */}
      {step === 3 && (
        <form onSubmit={form3.handleSubmit(handleStep3Submit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="managerName" required>담당자명</Label>
              <Input
                id="managerName"
                placeholder="김담당"
                error={!!form3.formState.errors.managerName}
                {...form3.register('managerName')}
              />
              {form3.formState.errors.managerName && (
                <p className="text-sm text-error">{form3.formState.errors.managerName.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="managerPhone" required>담당자 연락처</Label>
              <Input
                id="managerPhone"
                type="tel"
                placeholder="010-1234-5678"
                error={!!form3.formState.errors.managerPhone}
                {...form3.register('managerPhone')}
              />
              {form3.formState.errors.managerPhone && (
                <p className="text-sm text-error">{form3.formState.errors.managerPhone.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="brandName" required>브랜드명</Label>
            <Input
              id="brandName"
              placeholder="뷰티브랜드"
              error={!!form3.formState.errors.brandName}
              {...form3.register('brandName')}
            />
            {form3.formState.errors.brandName && (
              <p className="text-sm text-error">{form3.formState.errors.brandName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label required>카테고리</Label>
            <Select
              onValueChange={(value) => form3.setValue('category', value, { shouldValidate: true })}
            >
              <SelectTrigger error={!!form3.formState.errors.category}>
                <SelectValue placeholder="카테고리를 선택해 주세요" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {form3.formState.errors.category && (
              <p className="text-sm text-error">{form3.formState.errors.category.message}</p>
            )}
          </div>

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
