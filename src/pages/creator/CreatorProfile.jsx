import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  User,
  Lock,
  CreditCard,
  Truck,
  Bell,
  Camera,
  Instagram,
  Youtube,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Palette,
  Heart,
  LinkIcon,
} from 'lucide-react'

function TiktokIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  )
}

// Skin types with detailed descriptions
const skinTypes = [
  { id: 'dry', label: '건성', description: '당김, 각질, 거친 피부결' },
  { id: 'oily', label: '지성', description: '번들거림, 넓은 모공' },
  { id: 'combination', label: '복합성', description: 'T존 지성, U존 건성' },
  { id: 'normal', label: '중성', description: '균형 잡힌 피부' },
  { id: 'sensitive', label: '민감성', description: '쉽게 자극받는 피부' },
]

// Skin concerns
const skinConcerns = [
  { id: 'acne', label: '여드름', icon: '🔴' },
  { id: 'pores', label: '모공', icon: '⚫' },
  { id: 'wrinkles', label: '주름', icon: '〰️' },
  { id: 'whitening', label: '미백', icon: '✨' },
  { id: 'elasticity', label: '탄력', icon: '💪' },
  { id: 'dryness', label: '건조', icon: '🏜️' },
  { id: 'sensitivity', label: '민감', icon: '❤️‍🩹' },
  { id: 'redness', label: '홍조', icon: '🌹' },
  { id: 'pigmentation', label: '색소침착', icon: '🟤' },
  { id: 'darkCircles', label: '다크서클', icon: '👁️' },
]

// Content categories
const categories = [
  { id: 'skincare', label: '스킨케어', icon: Sparkles },
  { id: 'makeup', label: '메이크업', icon: Palette },
  { id: 'haircare', label: '헤어케어', icon: Heart },
  { id: 'bodycare', label: '바디케어', icon: Heart },
  { id: 'fragrance', label: '향수/향기', icon: Heart },
  { id: 'nailart', label: '네일아트', icon: Palette },
  { id: 'diet', label: '다이어트/이너뷰티', icon: Heart },
  { id: 'lifestyle', label: '라이프스타일', icon: Heart },
]

export function CreatorProfile() {
  const [profile, setProfile] = useState({
    name: '홍길동',
    nickname: '뷰티민지',
    email: 'minji@email.com',
    phone: '010-1234-5678',
    birthYear: '1995',
    gender: 'female',
    skinType: 'combination',
    skinConcerns: ['pores', 'dryness'],
    categories: ['skincare', 'makeup'],
  })

  const [snsAccounts, setSnsAccounts] = useState({
    instagram: { connected: true, username: '@beautyminji', followers: 125000 },
    tiktok: { connected: true, username: '@beautyminji', followers: 89000 },
    youtube: { connected: false, username: '', followers: 0 },
  })

  const [notificationSettings, setNotificationSettings] = useState({
    newCampaign: true,
    campaignStatus: true,
    pointsUpdate: true,
    marketing: false,
    sms: true,
    email: true,
    push: true,
  })

  // Calculate profile completion percentage
  const calculateCompletion = () => {
    let completed = 0
    const total = 8

    if (profile.name) completed++
    if (profile.nickname) completed++
    if (profile.phone) completed++
    if (profile.skinType) completed++
    if (profile.skinConcerns.length > 0) completed++
    if (profile.categories.length > 0) completed++
    if (snsAccounts.instagram.connected || snsAccounts.tiktok.connected)
      completed++
    if (snsAccounts.youtube.connected) completed++

    return Math.round((completed / total) * 100)
  }

  const toggleSkinConcern = (concernId) => {
    setProfile((prev) => ({
      ...prev,
      skinConcerns: prev.skinConcerns.includes(concernId)
        ? prev.skinConcerns.filter((c) => c !== concernId)
        : [...prev.skinConcerns, concernId],
    }))
  }

  const toggleCategory = (categoryId) => {
    setProfile((prev) => ({
      ...prev,
      categories: prev.categories.includes(categoryId)
        ? prev.categories.filter((c) => c !== categoryId)
        : [...prev.categories, categoryId],
    }))
  }

  const formatFollowers = (count) => {
    if (count >= 10000) {
      return (count / 10000).toFixed(1) + '만'
    }
    return count.toLocaleString()
  }

  const completion = calculateCompletion()

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">프로필 설정</h1>
        <p className="text-gray-500">
          프로필 정보를 관리하고 계정 설정을 변경하세요.
        </p>
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
            <div className="flex-1">
              <div className="flex items-center gap-3">
                <h2 className="text-xl font-bold text-gray-900">
                  {profile.nickname}
                </h2>
                <Badge variant="blue">Gold</Badge>
              </div>
              <p className="text-gray-500">{profile.email}</p>
              <div className="flex items-center gap-4 mt-2">
                <span className="text-sm text-gray-500">15회 캠페인 완료</span>
                <span className="text-sm text-gray-500">
                  총 팔로워{' '}
                  {formatFollowers(
                    snsAccounts.instagram.followers +
                      snsAccounts.tiktok.followers +
                      snsAccounts.youtube.followers
                  )}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500 mb-1">프로필 완성도</p>
              <div className="flex items-center gap-2">
                <Progress value={completion} className="w-32" />
                <span className="text-sm font-medium">{completion}%</span>
              </div>
              {completion < 100 && (
                <p className="text-xs text-orange-500 mt-1">
                  프로필을 완성하면 더 많은 캠페인에 참여할 수 있어요!
                </p>
              )}
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
          <TabsTrigger value="beauty">
            <Sparkles className="h-4 w-4 mr-2" />
            뷰티 프로필
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
                  <Input
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>닉네임 (활동명)</Label>
                  <Input
                    value={profile.nickname}
                    onChange={(e) =>
                      setProfile({ ...profile, nickname: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>이메일</Label>
                  <Input value={profile.email} disabled />
                </div>
                <div className="space-y-2">
                  <Label>휴대폰</Label>
                  <Input
                    value={profile.phone}
                    onChange={(e) =>
                      setProfile({ ...profile, phone: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>출생연도</Label>
                  <Select
                    value={profile.birthYear}
                    onValueChange={(v) =>
                      setProfile({ ...profile, birthYear: v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="출생연도 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 50 }, (_, i) => 2010 - i).map(
                        (year) => (
                          <SelectItem key={year} value={String(year)}>
                            {year}년
                          </SelectItem>
                        )
                      )}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>성별</Label>
                  <Select
                    value={profile.gender}
                    onValueChange={(v) =>
                      setProfile({ ...profile, gender: v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="성별 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="female">여성</SelectItem>
                      <SelectItem value="male">남성</SelectItem>
                      <SelectItem value="other">기타</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button>저장</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="beauty" className="mt-4 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>피부 타입</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                {skinTypes.map((type) => (
                  <div
                    key={type.id}
                    onClick={() =>
                      setProfile({ ...profile, skinType: type.id })
                    }
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      profile.skinType === type.id
                        ? 'border-cnec-blue bg-cnec-blue-light'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{type.label}</span>
                      {profile.skinType === type.id && (
                        <CheckCircle className="h-4 w-4 text-cnec-blue" />
                      )}
                    </div>
                    <p className="text-xs text-gray-500">{type.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>피부 고민</CardTitle>
              <p className="text-sm text-gray-500">
                해당하는 피부 고민을 모두 선택해주세요 (복수 선택 가능)
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {skinConcerns.map((concern) => (
                  <div
                    key={concern.id}
                    onClick={() => toggleSkinConcern(concern.id)}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all text-center ${
                      profile.skinConcerns.includes(concern.id)
                        ? 'border-cnec-blue bg-cnec-blue-light'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-xl mb-1 block">{concern.icon}</span>
                    <span className="text-sm font-medium">{concern.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>콘텐츠 카테고리</CardTitle>
              <p className="text-sm text-gray-500">
                주로 다루는 콘텐츠 카테고리를 선택해주세요
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {categories.map((category) => {
                  const Icon = category.icon
                  return (
                    <div
                      key={category.id}
                      onClick={() => toggleCategory(category.id)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        profile.categories.includes(category.id)
                          ? 'border-cnec-blue bg-cnec-blue-light'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Icon
                          className={`h-5 w-5 ${
                            profile.categories.includes(category.id)
                              ? 'text-cnec-blue'
                              : 'text-gray-400'
                          }`}
                        />
                        <span className="font-medium">{category.label}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
              <Button className="mt-4">저장</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>SNS 계정 연동</CardTitle>
              <p className="text-sm text-gray-500">
                SNS 계정을 연동하면 캠페인 매칭 확률이 높아집니다
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Instagram */}
              <div
                className={`p-4 border rounded-lg ${snsAccounts.instagram.connected ? 'border-pink-200 bg-pink-50' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${snsAccounts.instagram.connected ? 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600' : 'bg-gray-200'}`}
                    >
                      <Instagram className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Instagram</p>
                      {snsAccounts.instagram.connected ? (
                        <div>
                          <p className="text-sm text-gray-600">
                            {snsAccounts.instagram.username}
                          </p>
                          <p className="text-xs text-gray-500">
                            팔로워{' '}
                            {formatFollowers(snsAccounts.instagram.followers)}
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">연동되지 않음</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {snsAccounts.instagram.connected ? (
                      <>
                        <Badge variant="success" className="gap-1">
                          <CheckCircle className="h-3 w-3" />
                          연동됨
                        </Badge>
                        <Button variant="outline" size="sm">
                          재연동
                        </Button>
                      </>
                    ) : (
                      <Button size="sm">
                        <LinkIcon className="mr-2 h-4 w-4" />
                        연동하기
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* TikTok */}
              <div
                className={`p-4 border rounded-lg ${snsAccounts.tiktok.connected ? 'border-gray-300 bg-gray-50' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${snsAccounts.tiktok.connected ? 'bg-black' : 'bg-gray-200'}`}
                    >
                      <TiktokIcon
                        className={`h-6 w-6 ${snsAccounts.tiktok.connected ? 'text-white' : 'text-gray-400'}`}
                      />
                    </div>
                    <div>
                      <p className="font-medium">TikTok</p>
                      {snsAccounts.tiktok.connected ? (
                        <div>
                          <p className="text-sm text-gray-600">
                            {snsAccounts.tiktok.username}
                          </p>
                          <p className="text-xs text-gray-500">
                            팔로워{' '}
                            {formatFollowers(snsAccounts.tiktok.followers)}
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">연동되지 않음</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {snsAccounts.tiktok.connected ? (
                      <>
                        <Badge variant="success" className="gap-1">
                          <CheckCircle className="h-3 w-3" />
                          연동됨
                        </Badge>
                        <Button variant="outline" size="sm">
                          재연동
                        </Button>
                      </>
                    ) : (
                      <Button size="sm">
                        <LinkIcon className="mr-2 h-4 w-4" />
                        연동하기
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* YouTube */}
              <div
                className={`p-4 border rounded-lg ${snsAccounts.youtube.connected ? 'border-red-200 bg-red-50' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center ${snsAccounts.youtube.connected ? 'bg-red-600' : 'bg-gray-200'}`}
                    >
                      <Youtube
                        className={`h-6 w-6 ${snsAccounts.youtube.connected ? 'text-white' : 'text-gray-400'}`}
                      />
                    </div>
                    <div>
                      <p className="font-medium">YouTube</p>
                      {snsAccounts.youtube.connected ? (
                        <div>
                          <p className="text-sm text-gray-600">
                            {snsAccounts.youtube.username}
                          </p>
                          <p className="text-xs text-gray-500">
                            구독자{' '}
                            {formatFollowers(snsAccounts.youtube.followers)}
                          </p>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-500">연동되지 않음</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {snsAccounts.youtube.connected ? (
                      <>
                        <Badge variant="success" className="gap-1">
                          <CheckCircle className="h-3 w-3" />
                          연동됨
                        </Badge>
                        <Button variant="outline" size="sm">
                          재연동
                        </Button>
                      </>
                    ) : (
                      <Button size="sm">
                        <LinkIcon className="mr-2 h-4 w-4" />
                        연동하기
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900">SNS 연동 안내</p>
                  <p className="text-blue-700 mt-1">
                    SNS 계정을 연동하면 팔로워 수와 콘텐츠 분석 결과를 기반으로
                    더 적합한 캠페인을 추천받을 수 있습니다. 연동된 정보는 안전하게
                    보호됩니다.
                  </p>
                </div>
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
                  <Select defaultValue="kakao">
                    <SelectTrigger>
                      <SelectValue placeholder="은행 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kakao">카카오뱅크</SelectItem>
                      <SelectItem value="kb">국민은행</SelectItem>
                      <SelectItem value="shinhan">신한은행</SelectItem>
                      <SelectItem value="woori">우리은행</SelectItem>
                      <SelectItem value="hana">하나은행</SelectItem>
                      <SelectItem value="nh">농협은행</SelectItem>
                      <SelectItem value="toss">토스뱅크</SelectItem>
                    </SelectContent>
                  </Select>
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
                  <p className="text-sm text-gray-500">
                    신분증이 등록되어 있습니다.
                  </p>
                  <Button variant="link" size="sm">
                    재업로드
                  </Button>
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
              <div className="space-y-2">
                <Label>배송 요청사항</Label>
                <Select defaultValue="door">
                  <SelectTrigger>
                    <SelectValue placeholder="배송 요청사항 선택" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="door">문 앞에 놔주세요</SelectItem>
                    <SelectItem value="security">
                      경비실에 맡겨주세요
                    </SelectItem>
                    <SelectItem value="box">택배함에 넣어주세요</SelectItem>
                    <SelectItem value="call">배송 전 연락주세요</SelectItem>
                    <SelectItem value="direct">직접 입력</SelectItem>
                  </SelectContent>
                </Select>
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
                <p className="text-xs text-gray-500">
                  8자 이상, 영문 대소문자, 숫자 포함
                </p>
              </div>
              <div className="space-y-2">
                <Label>새 비밀번호 확인</Label>
                <Input type="password" />
              </div>
              <Button>비밀번호 변경</Button>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>계정 관리</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">로그인 기록</p>
                  <p className="text-sm text-gray-500">
                    최근 로그인 내역을 확인하세요
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  확인하기
                </Button>
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg border-red-200">
                <div>
                  <p className="font-medium text-red-600">계정 탈퇴</p>
                  <p className="text-sm text-gray-500">
                    탈퇴 시 모든 데이터가 삭제됩니다
                  </p>
                </div>
                <Button variant="destructive" size="sm">
                  탈퇴하기
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>알림 설정</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <h3 className="font-medium">알림 종류</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">새로운 캠페인</p>
                      <p className="text-sm text-gray-500">
                        나에게 맞는 새 캠페인 알림
                      </p>
                    </div>
                    <Checkbox
                      checked={notificationSettings.newCampaign}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          newCampaign: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">캠페인 상태 변경</p>
                      <p className="text-sm text-gray-500">
                        신청한 캠페인의 상태 변경 알림
                      </p>
                    </div>
                    <Checkbox
                      checked={notificationSettings.campaignStatus}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          campaignStatus: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">포인트 적립</p>
                      <p className="text-sm text-gray-500">
                        포인트 적립 및 사용 알림
                      </p>
                    </div>
                    <Checkbox
                      checked={notificationSettings.pointsUpdate}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          pointsUpdate: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">마케팅 정보</p>
                      <p className="text-sm text-gray-500">
                        이벤트 및 프로모션 정보
                      </p>
                    </div>
                    <Checkbox
                      checked={notificationSettings.marketing}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          marketing: checked,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <hr />

              <div className="space-y-4">
                <h3 className="font-medium">알림 수신 방법</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SMS</p>
                      <p className="text-sm text-gray-500">문자 메시지로 수신</p>
                    </div>
                    <Checkbox
                      checked={notificationSettings.sms}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          sms: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">이메일</p>
                      <p className="text-sm text-gray-500">이메일로 수신</p>
                    </div>
                    <Checkbox
                      checked={notificationSettings.email}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          email: checked,
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">앱 푸시</p>
                      <p className="text-sm text-gray-500">
                        앱 푸시 알림으로 수신
                      </p>
                    </div>
                    <Checkbox
                      checked={notificationSettings.push}
                      onCheckedChange={(checked) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          push: checked,
                        })
                      }
                    />
                  </div>
                </div>
              </div>

              <Button>저장</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
