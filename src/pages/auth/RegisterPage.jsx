import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Users, Building2, ArrowRight } from 'lucide-react'

export function RegisterPage() {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">회원가입</h1>
        <p className="text-gray-500 mt-2">가입 유형을 선택해 주세요.</p>
      </div>

      <div className="space-y-4">
        <Link to="/auth/register/creator">
          <Card className="cursor-pointer transition-all hover:border-cnec-blue hover:shadow-md group">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-cnec-blue-light flex items-center justify-center shrink-0">
                  <Users className="h-6 w-6 text-cnec-blue" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    크리에이터
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    뷰티 콘텐츠를 만들고 브랜드와 협업하고 싶다면
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-cnec-blue" />
                      브랜드 협업 캠페인 지원
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-cnec-blue" />
                      원고비 수익 정산
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-cnec-blue" />
                      세일즈 크리에이터 육성 프로그램
                    </li>
                  </ul>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-cnec-blue transition-colors" />
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link to="/auth/register/brand">
          <Card className="cursor-pointer transition-all hover:border-cnec-blue hover:shadow-md group">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-cnec-blue-light flex items-center justify-center shrink-0">
                  <Building2 className="h-6 w-6 text-cnec-blue" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    광고주 (브랜드)
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">
                    뷰티 크리에이터와 협업하여 마케팅을 진행하고 싶다면
                  </p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-cnec-blue" />
                      검증된 뷰티 크리에이터 매칭
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-cnec-blue" />
                      AI 자동 콘텐츠 기획안 생성
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1 h-1 rounded-full bg-cnec-blue" />
                      캠페인 통합 관리 시스템
                    </li>
                  </ul>
                </div>
                <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-cnec-blue transition-colors" />
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <p className="mt-8 text-center text-sm text-gray-500">
        이미 계정이 있으신가요?{' '}
        <Link to="/auth/login" className="text-cnec-blue font-medium hover:underline">
          로그인
        </Link>
      </p>
    </div>
  )
}
