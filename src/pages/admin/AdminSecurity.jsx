import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield, Lock, Key, FileText } from 'lucide-react'

export function AdminSecurity() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">보안 설정</h1>
        <p className="text-gray-500">플랫폼 보안 설정을 관리하세요.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              IP 차단
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 text-sm mb-4">
              블랙리스트 IP 및 국가별 접근을 제한합니다.
            </p>
            <Button variant="outline">IP 차단 관리</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              비밀번호 정책
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 text-sm mb-4">
              최소 길이, 복잡도, 만료 주기를 설정합니다.
            </p>
            <Button variant="outline">정책 설정</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              2단계 인증
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 text-sm mb-4">
              관리자 계정에 대한 2FA를 설정합니다.
            </p>
            <Button variant="outline">2FA 설정</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              감사 로그
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-500 text-sm mb-4">
              모든 관리자 활동 로그를 확인합니다.
            </p>
            <Button variant="outline">로그 보기</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
