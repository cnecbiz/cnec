import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Settings, FileText, Bell, Users, Code } from 'lucide-react'

export function AdminSite() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">사이트 관리</h1>
        <p className="text-gray-500">사이트 콘텐츠, 관리자 계정, 자동화 설정을 관리하세요.</p>
      </div>

      <Tabs defaultValue="content">
        <TabsList>
          <TabsTrigger value="content">콘텐츠 관리</TabsTrigger>
          <TabsTrigger value="admins">관리자 계정</TabsTrigger>
          <TabsTrigger value="automation">자동화</TabsTrigger>
          <TabsTrigger value="seo">SEO/스크립트</TabsTrigger>
        </TabsList>

        <TabsContent value="content" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  포트폴리오 영상
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-sm mb-4">메인 페이지에 표시할 포트폴리오 영상을 관리합니다.</p>
                <Button variant="outline">영상 관리</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  게시판 관리
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-sm mb-4">공지사항, FAQ 등의 게시판을 관리합니다.</p>
                <Button variant="outline">게시판 관리</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  배너/팝업
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-sm mb-4">사이트 배너와 팝업을 관리합니다.</p>
                <Button variant="outline">배너 관리</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="admins" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                관리자 계정
              </CardTitle>
              <Button>관리자 추가</Button>
            </CardHeader>
            <CardContent className="p-8 text-center text-gray-500">
              관리자 계정 관리 기능이 여기에 표시됩니다.
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automation" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                알림 템플릿
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 text-center text-gray-500">
              이메일 템플릿, 카카오 알림톡 템플릿 관리 기능이 여기에 표시됩니다.
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="seo" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                SEO/스크립트
              </CardTitle>
            </CardHeader>
            <CardContent className="p-8 text-center text-gray-500">
              Google Analytics, GTM, Meta Pixel, 네이버 서치어드바이저 설정이 여기에 표시됩니다.
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
