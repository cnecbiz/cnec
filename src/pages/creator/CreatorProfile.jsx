import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { User, Lock, CreditCard, Truck, Bell, Camera, Instagram, Youtube } from 'lucide-react'

function TiktokIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )
}

export function CreatorProfile() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">프로필 설정</h1>
        <p className="text-gray-500">프로필 정보를 관리하고 계정 설정을 변경하세요.</p>
      </div>

      {/* Profile Header */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarFallback name="뷰티민지" className="text-2xl" />
              </Avatar>
              <button className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-cnec-blue text-white flex items-center justify-center hover:bg-cnec-blue-dark transition-colors">
                <Camera className="h-4 w-4" />
              </button>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">뷰티민지</h2>
              <p className="text-gray-500">minji@email.com</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="blue">Gold</Badge>
                <span className="text-sm text-gray-500">15회 캠페인 완료</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">
            <User className="h-4 w-4 mr-2" />
            기본 정보
          </TabsTrigger>
          <TabsTrigger value="social">
            <Instagram className="h-4 w-4 mr-2" />
            SNS 연동
          </TabsTrigger>
          <TabsTrigger value="payment">
            <CreditCard className="h-4 w-4 mr-2" />
            정산 계좌
          </TabsTrigger>
          <TabsTrigger value="shipping">
            <Truck className="h-4 w-4 mr-2" />
            배송지
          </TabsTrigger>
          <TabsTrigger value="security">
            <Lock className="h-4 w-4 mr-2" />
            보안
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            알림
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>기본 정보</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>이름</Label>
                  <Input defaultValue="홍길동" />
                </div>
                <div className="space-y-2">
                  <Label>닉네임</Label>
                  <Input defaultValue="뷰티민지" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>이메일</Label>
                  <Input defaultValue="minji@email.com" disabled />
                </div>
                <div className="space-y-2">
                  <Label>휴대폰</Label>
                  <Input defaultValue="010-1234-5678" />
                </div>
              </div>
              <div className="space-y-3">
                <Label>피부 타입</Label>
                <div className="flex flex-wrap gap-2">
                  {['건성', '지성', '복합성', '중성', '민감성'].map((type) => (
                    <Badge
                      key={type}
                      variant={type === '복합성' ? 'default' : 'outline'}
                      className="cursor-pointer"
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <Label>피부 고민</Label>
                <div className="flex flex-wrap gap-2">
                  {['여드름', '모공', '주름', '미백', '탄력', '건조', '민감', '홍조'].map((concern) => (
                    <Badge
                      key={concern}
                      variant={['모공', '건조'].includes(concern) ? 'default' : 'outline'}
                      className="cursor-pointer"
                    >
                      {concern}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button>저장</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>SNS 계정 연동</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Instagram className="h-6 w-6 text-pink-500" />
                  <div>
                    <p className="font-medium">Instagram</p>
                    <p className="text-sm text-gray-500">@beautyminji</p>
                  </div>
                </div>
                <Badge variant="success">연동됨</Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <TiktokIcon className="h-6 w-6" />
                  <div>
                    <p className="font-medium">TikTok</p>
                    <p className="text-sm text-gray-500">@beautyminji</p>
                  </div>
                </div>
                <Badge variant="success">연동됨</Badge>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <Youtube className="h-6 w-6 text-red-500" />
                  <div>
                    <p className="font-medium">YouTube</p>
                    <p className="text-sm text-gray-500">연동되지 않음</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">연동하기</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>정산 계좌</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>은행</Label>
                  <Input defaultValue="카카오뱅크" />
                </div>
                <div className="space-y-2">
                  <Label>계좌번호</Label>
                  <Input defaultValue="3333-01-1234567" />
                </div>
                <div className="space-y-2">
                  <Label>예금주</Label>
                  <Input defaultValue="홍길동" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>신분증 사본</Label>
                <div className="p-4 border-2 border-dashed rounded-lg text-center">
                  <p className="text-sm text-gray-500">신분증이 등록되어 있습니다.</p>
                  <Button variant="link" size="sm">재업로드</Button>
                </div>
              </div>
              <Button>저장</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="shipping" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>기본 배송지</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>수령인</Label>
                  <Input defaultValue="홍길동" />
                </div>
                <div className="space-y-2">
                  <Label>연락처</Label>
                  <Input defaultValue="010-1234-5678" />
                </div>
              </div>
              <div className="space-y-2">
                <Label>주소</Label>
                <div className="flex gap-2">
                  <Input defaultValue="06234" className="w-32" disabled />
                  <Button variant="outline">주소 검색</Button>
                </div>
                <Input defaultValue="서울특별시 강남구 테헤란로 123" disabled />
                <Input defaultValue="101동 1001호" placeholder="상세주소" />
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
