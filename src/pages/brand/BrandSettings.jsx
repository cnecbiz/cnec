import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Building2, User, Lock, Bell } from 'lucide-react'

export function BrandSettings() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">계정 설정</h1>
        <p className="text-gray-500">회사 정보, 담당자 정보, 비밀번호를 관리하세요.</p>
      </div>

      <Tabs defaultValue="company">
        <TabsList>
          <TabsTrigger value="company">
            <Building2 className="h-4 w-4 mr-2" />
            회사 정보
          </TabsTrigger>
          <TabsTrigger value="manager">
            <User className="h-4 w-4 mr-2" />
            담당자 정보
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="h-4 w-4 mr-2" />
            비밀번호
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            알림 설정
          </TabsTrigger>
        </TabsList>

        <TabsContent value="company" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>회사 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>회사명</Label>
                  <Input defaultValue="(주)에스티로더 코리아" />
                </div>
                <div className="space-y-2">
                  <Label>대표자명</Label>
                  <Input defaultValue="김대표" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>사업자등록번호</Label>
                <Input defaultValue="123-45-67890" disabled />
              </div>
              <div className="space-y-2">
                <Label>브랜드명</Label>
                <Input defaultValue="에스티로더" />
              </div>
              <Button>저장</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="manager" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>담당자 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>담당자명</Label>
                  <Input defaultValue="이마케터" />
                </div>
                <div className="space-y-2">
                  <Label>연락처</Label>
                  <Input defaultValue="010-1234-5678" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>이메일</Label>
                <Input defaultValue="marketing@esteelauder.kr" />
              </div>
              <Button>저장</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>비밀번호 변경</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>현재 비밀번호</Label>
                <Input type="password" />
              </div>
              <div className="space-y-2">
                <Label>새 비밀번호</Label>
                <Input type="password" />
              </div>
              <div className="space-y-2">
                <Label>새 비밀번호 확인</Label>
                <Input type="password" />
              </div>
              <Button>비밀번호 변경</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>알림 설정</CardTitle>
            </CardHeader>
            <CardContent className="p-8 text-center text-gray-500">
              알림 설정 기능이 곧 추가됩니다.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
