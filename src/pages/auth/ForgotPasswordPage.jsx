import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useAuthStore } from '@/stores/authStore'
import { toast } from '@/stores/uiStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ArrowLeft, Mail, CheckCircle } from 'lucide-react'

const forgotPasswordSchema = z.object({
  email: z.string().email('올바른 이메일 주소를 입력해 주세요.'),
})

export function ForgotPasswordPage() {
  const { resetPassword } = useAuthStore()
  const [isLoading, setIsLoading] = useState(false)
  const [isEmailSent, setIsEmailSent] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (data) => {
    setIsLoading(true)
    const { error } = await resetPassword(data.email)
    setIsLoading(false)

    if (error) {
      toast.error(error.message || '이메일 전송에 실패했습니다.')
      return
    }

    setIsEmailSent(true)
  }

  if (isEmailSent) {
    return (
      <div className="animate-fade-in text-center">
        <div className="w-16 h-16 rounded-full bg-success-light flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="h-8 w-8 text-success" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">이메일을 확인해 주세요</h1>
        <p className="text-gray-500 mb-6">
          <span className="font-medium text-gray-900">{getValues('email')}</span>
          <br />
          위 이메일로 비밀번호 재설정 링크를 보냈습니다.
        </p>
        <div className="space-y-3">
          <Button variant="outline" className="w-full" asChild>
            <Link to="/auth/login">
              <ArrowLeft className="mr-2 h-4 w-4" />
              로그인으로 돌아가기
            </Link>
          </Button>
          <p className="text-sm text-gray-500">
            이메일을 받지 못하셨나요?{' '}
            <button
              onClick={() => setIsEmailSent(false)}
              className="text-cnec-blue hover:underline"
            >
              다시 보내기
            </button>
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="animate-fade-in">
      <Link
        to="/auth/login"
        className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 mb-6"
      >
        <ArrowLeft className="mr-1 h-4 w-4" />
        로그인으로 돌아가기
      </Link>

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">비밀번호 찾기</h1>
        <p className="text-gray-500 mt-2">
          가입한 이메일을 입력하시면 비밀번호 재설정 링크를 보내드립니다.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">이메일</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              id="email"
              type="email"
              placeholder="example@email.com"
              className="pl-10"
              error={!!errors.email}
              {...register('email')}
            />
          </div>
          {errors.email && (
            <p className="text-sm text-error">{errors.email.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full" size="lg" isLoading={isLoading}>
          비밀번호 재설정 링크 보내기
        </Button>
      </form>
    </div>
  )
}
