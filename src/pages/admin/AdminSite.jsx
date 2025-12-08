import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Settings,
  FileText,
  Bell,
  Users,
  Code,
  Plus,
  Pencil,
  Trash2,
  Video,
  Mail,
  MessageSquare,
  Eye,
  ExternalLink,
  Save,
  Copy,
  Check,
} from 'lucide-react'

// Sample data - would come from Supabase
const initialPortfolios = [
  {
    id: '1',
    title: '뷰티 브이로그 숏폼',
    youtubeUrl: 'https://youtube.com/shorts/abc123',
    thumbnailUrl: 'https://img.youtube.com/vi/abc123/maxresdefault.jpg',
    category: 'beauty',
    isActive: true,
    order: 1,
    createdAt: '2024-12-01',
  },
  {
    id: '2',
    title: '스킨케어 루틴 챌린지',
    youtubeUrl: 'https://youtube.com/shorts/def456',
    thumbnailUrl: 'https://img.youtube.com/vi/def456/maxresdefault.jpg',
    category: 'skincare',
    isActive: true,
    order: 2,
    createdAt: '2024-12-03',
  },
  {
    id: '3',
    title: '메이크업 비포앤애프터',
    youtubeUrl: 'https://youtube.com/shorts/ghi789',
    thumbnailUrl: 'https://img.youtube.com/vi/ghi789/maxresdefault.jpg',
    category: 'makeup',
    isActive: false,
    order: 3,
    createdAt: '2024-12-05',
  },
]

const initialEmailTemplates = [
  {
    id: '1',
    name: '캠페인 선정 안내',
    subject: '[CNEC] {{campaign_name}} 캠페인에 선정되셨습니다!',
    body: '안녕하세요 {{creator_name}}님,\n\n{{campaign_name}} 캠페인에 선정되셨습니다.\n\n캠페인 상세 정보를 확인하시고, {{deadline}}까지 제품을 수령해주세요.\n\n감사합니다.',
    type: 'email',
    isActive: true,
  },
  {
    id: '2',
    name: '콘텐츠 업로드 요청',
    subject: '[CNEC] 콘텐츠 업로드 마감 D-3 안내',
    body: '안녕하세요 {{creator_name}}님,\n\n{{campaign_name}} 캠페인 콘텐츠 업로드 마감일이 3일 남았습니다.\n\n마감일: {{deadline}}\n\n감사합니다.',
    type: 'email',
    isActive: true,
  },
  {
    id: '3',
    name: '정산 완료 안내',
    subject: '[CNEC] {{month}}월 정산이 완료되었습니다',
    body: '안녕하세요 {{creator_name}}님,\n\n{{month}}월 정산금 {{amount}}원이 입금 처리되었습니다.\n\n감사합니다.',
    type: 'email',
    isActive: true,
  },
]

const initialKakaoTemplates = [
  {
    id: '4',
    name: '캠페인 선정 알림',
    body: '[CNEC] {{creator_name}}님, {{campaign_name}} 캠페인에 선정되셨습니다! 상세 내용은 대시보드에서 확인해주세요.',
    type: 'kakao',
    templateCode: 'CNEC_001',
    isActive: true,
  },
  {
    id: '5',
    name: '유튜브 업로드 독촉',
    body: '[CNEC] {{creator_name}}님, 이번 주 유튜브 영상 업로드가 아직 확인되지 않았습니다. 빠른 업로드 부탁드립니다.',
    type: 'kakao',
    templateCode: 'CNEC_002',
    isActive: true,
  },
  {
    id: '6',
    name: '콘텐츠 마감 알림',
    body: '[CNEC] {{creator_name}}님, {{campaign_name}} 캠페인 콘텐츠 제출 마감이 {{days}}일 남았습니다.',
    type: 'kakao',
    templateCode: 'CNEC_003',
    isActive: true,
  },
]

const initialAdmins = [
  {
    id: '1',
    name: '관리자',
    email: 'admin@cnec.kr',
    role: 'super',
    lastLogin: '2024-12-08 09:30',
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    name: '운영팀',
    email: 'ops@cnec.kr',
    role: 'manager',
    lastLogin: '2024-12-07 18:45',
    createdAt: '2024-03-15',
  },
  {
    id: '3',
    name: '마케팅팀',
    email: 'marketing@cnec.kr',
    role: 'viewer',
    lastLogin: '2024-12-06 14:20',
    createdAt: '2024-06-01',
  },
]

const categoryLabels = {
  beauty: '뷰티',
  skincare: '스킨케어',
  makeup: '메이크업',
  haircare: '헤어케어',
  lifestyle: '라이프스타일',
}

const roleLabels = {
  super: { label: '슈퍼관리자', variant: 'destructive' },
  manager: { label: '매니저', variant: 'default' },
  viewer: { label: '뷰어', variant: 'secondary' },
}

export function AdminSite() {
  // Portfolios
  const [portfolios, setPortfolios] = useState(initialPortfolios)
  const [portfolioModalOpen, setPortfolioModalOpen] = useState(false)
  const [editingPortfolio, setEditingPortfolio] = useState(null)
  const [portfolioForm, setPortfolioForm] = useState({
    title: '',
    youtubeUrl: '',
    category: 'beauty',
    isActive: true,
  })

  // Templates
  const [emailTemplates, setEmailTemplates] = useState(initialEmailTemplates)
  const [kakaoTemplates, setKakaoTemplates] = useState(initialKakaoTemplates)
  const [templateModalOpen, setTemplateModalOpen] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState(null)
  const [templateForm, setTemplateForm] = useState({
    name: '',
    subject: '',
    body: '',
    type: 'email',
    templateCode: '',
  })

  // Admins
  const [admins, setAdmins] = useState(initialAdmins)
  const [adminModalOpen, setAdminModalOpen] = useState(false)
  const [editingAdmin, setEditingAdmin] = useState(null)
  const [adminForm, setAdminForm] = useState({
    name: '',
    email: '',
    role: 'viewer',
    password: '',
  })

  // SEO Settings
  const [seoSettings, setSeoSettings] = useState({
    googleAnalyticsId: 'G-XXXXXXXXXX',
    googleTagManagerId: 'GTM-XXXXXXX',
    metaPixelId: '1234567890',
    naverSiteVerification: 'abc123def456',
    robotsTxt: 'User-agent: *\nAllow: /',
    sitemapUrl: 'https://cnec.kr/sitemap.xml',
  })
  const [seoSaved, setSeoSaved] = useState(false)

  // Portfolio handlers
  const openPortfolioModal = (portfolio = null) => {
    if (portfolio) {
      setEditingPortfolio(portfolio)
      setPortfolioForm({
        title: portfolio.title,
        youtubeUrl: portfolio.youtubeUrl,
        category: portfolio.category,
        isActive: portfolio.isActive,
      })
    } else {
      setEditingPortfolio(null)
      setPortfolioForm({
        title: '',
        youtubeUrl: '',
        category: 'beauty',
        isActive: true,
      })
    }
    setPortfolioModalOpen(true)
  }

  const savePortfolio = () => {
    if (editingPortfolio) {
      setPortfolios(
        portfolios.map((p) =>
          p.id === editingPortfolio.id
            ? { ...p, ...portfolioForm }
            : p
        )
      )
    } else {
      setPortfolios([
        ...portfolios,
        {
          id: String(Date.now()),
          ...portfolioForm,
          thumbnailUrl: '',
          order: portfolios.length + 1,
          createdAt: new Date().toISOString().split('T')[0],
        },
      ])
    }
    setPortfolioModalOpen(false)
  }

  const deletePortfolio = (id) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      setPortfolios(portfolios.filter((p) => p.id !== id))
    }
  }

  const togglePortfolioActive = (id) => {
    setPortfolios(
      portfolios.map((p) =>
        p.id === id ? { ...p, isActive: !p.isActive } : p
      )
    )
  }

  // Template handlers
  const openTemplateModal = (template = null, type = 'email') => {
    if (template) {
      setEditingTemplate(template)
      setTemplateForm({
        name: template.name,
        subject: template.subject || '',
        body: template.body,
        type: template.type,
        templateCode: template.templateCode || '',
      })
    } else {
      setEditingTemplate(null)
      setTemplateForm({
        name: '',
        subject: '',
        body: '',
        type: type,
        templateCode: '',
      })
    }
    setTemplateModalOpen(true)
  }

  const saveTemplate = () => {
    const newTemplate = {
      id: editingTemplate?.id || String(Date.now()),
      ...templateForm,
      isActive: true,
    }

    if (templateForm.type === 'email') {
      if (editingTemplate) {
        setEmailTemplates(
          emailTemplates.map((t) =>
            t.id === editingTemplate.id ? newTemplate : t
          )
        )
      } else {
        setEmailTemplates([...emailTemplates, newTemplate])
      }
    } else {
      if (editingTemplate) {
        setKakaoTemplates(
          kakaoTemplates.map((t) =>
            t.id === editingTemplate.id ? newTemplate : t
          )
        )
      } else {
        setKakaoTemplates([...kakaoTemplates, newTemplate])
      }
    }
    setTemplateModalOpen(false)
  }

  const deleteTemplate = (id, type) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      if (type === 'email') {
        setEmailTemplates(emailTemplates.filter((t) => t.id !== id))
      } else {
        setKakaoTemplates(kakaoTemplates.filter((t) => t.id !== id))
      }
    }
  }

  // Admin handlers
  const openAdminModal = (admin = null) => {
    if (admin) {
      setEditingAdmin(admin)
      setAdminForm({
        name: admin.name,
        email: admin.email,
        role: admin.role,
        password: '',
      })
    } else {
      setEditingAdmin(null)
      setAdminForm({
        name: '',
        email: '',
        role: 'viewer',
        password: '',
      })
    }
    setAdminModalOpen(true)
  }

  const saveAdmin = () => {
    if (editingAdmin) {
      setAdmins(
        admins.map((a) =>
          a.id === editingAdmin.id
            ? { ...a, name: adminForm.name, email: adminForm.email, role: adminForm.role }
            : a
        )
      )
    } else {
      setAdmins([
        ...admins,
        {
          id: String(Date.now()),
          name: adminForm.name,
          email: adminForm.email,
          role: adminForm.role,
          lastLogin: '-',
          createdAt: new Date().toISOString().split('T')[0],
        },
      ])
    }
    setAdminModalOpen(false)
  }

  const deleteAdmin = (id) => {
    const admin = admins.find((a) => a.id === id)
    if (admin?.role === 'super') {
      alert('슈퍼관리자는 삭제할 수 없습니다.')
      return
    }
    if (confirm('정말 삭제하시겠습니까?')) {
      setAdmins(admins.filter((a) => a.id !== id))
    }
  }

  // SEO handlers
  const saveSeoSettings = () => {
    // Would save to Supabase
    setSeoSaved(true)
    setTimeout(() => setSeoSaved(false), 2000)
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">사이트 관리</h1>
        <p className="text-gray-500">
          사이트 콘텐츠, 관리자 계정, 자동화 설정을 관리하세요.
        </p>
      </div>

      <Tabs defaultValue="portfolio">
        <TabsList>
          <TabsTrigger value="portfolio">포트폴리오</TabsTrigger>
          <TabsTrigger value="templates">템플릿 관리</TabsTrigger>
          <TabsTrigger value="admins">관리자 계정</TabsTrigger>
          <TabsTrigger value="seo">SEO/스크립트</TabsTrigger>
        </TabsList>

        {/* Portfolio Tab */}
        <TabsContent value="portfolio" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Video className="h-5 w-5" />
                포트폴리오 영상 관리
              </CardTitle>
              <Button onClick={() => openPortfolioModal()}>
                <Plus className="mr-2 h-4 w-4" />
                영상 추가
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                메인 페이지에 표시할 포트폴리오 영상을 관리합니다. 드래그하여 순서를 변경할 수 있습니다.
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>순서</TableHead>
                    <TableHead>제목</TableHead>
                    <TableHead>카테고리</TableHead>
                    <TableHead>YouTube URL</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead>등록일</TableHead>
                    <TableHead className="text-right">관리</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {portfolios.map((portfolio) => (
                    <TableRow key={portfolio.id}>
                      <TableCell>{portfolio.order}</TableCell>
                      <TableCell className="font-medium">{portfolio.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {categoryLabels[portfolio.category]}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <a
                          href={portfolio.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline flex items-center gap-1"
                        >
                          <ExternalLink className="h-3 w-3" />
                          보기
                        </a>
                      </TableCell>
                      <TableCell>
                        <Button
                          variant={portfolio.isActive ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => togglePortfolioActive(portfolio.id)}
                        >
                          {portfolio.isActive ? '활성' : '비활성'}
                        </Button>
                      </TableCell>
                      <TableCell>{portfolio.createdAt}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openPortfolioModal(portfolio)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deletePortfolio(portfolio.id)}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Templates Tab */}
        <TabsContent value="templates" className="mt-4 space-y-6">
          {/* Email Templates */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                이메일 템플릿
              </CardTitle>
              <Button onClick={() => openTemplateModal(null, 'email')}>
                <Plus className="mr-2 h-4 w-4" />
                템플릿 추가
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>템플릿명</TableHead>
                    <TableHead>제목</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead className="text-right">관리</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {emailTemplates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell className="font-medium">{template.name}</TableCell>
                      <TableCell className="text-gray-500">{template.subject}</TableCell>
                      <TableCell>
                        <Badge variant={template.isActive ? 'default' : 'secondary'}>
                          {template.isActive ? '활성' : '비활성'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openTemplateModal(template)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openTemplateModal(template)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteTemplate(template.id, 'email')}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Kakao Templates */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                카카오 알림톡 템플릿
              </CardTitle>
              <Button onClick={() => openTemplateModal(null, 'kakao')}>
                <Plus className="mr-2 h-4 w-4" />
                템플릿 추가
              </Button>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                카카오 비즈니스 채널에서 승인받은 템플릿만 사용할 수 있습니다.
              </p>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>템플릿명</TableHead>
                    <TableHead>템플릿 코드</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead className="text-right">관리</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {kakaoTemplates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell className="font-medium">{template.name}</TableCell>
                      <TableCell>
                        <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                          {template.templateCode}
                        </code>
                      </TableCell>
                      <TableCell>
                        <Badge variant={template.isActive ? 'default' : 'secondary'}>
                          {template.isActive ? '활성' : '비활성'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openTemplateModal(template)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openTemplateModal(template)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteTemplate(template.id, 'kakao')}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Admins Tab */}
        <TabsContent value="admins" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                관리자 계정
              </CardTitle>
              <Button onClick={() => openAdminModal()}>
                <Plus className="mr-2 h-4 w-4" />
                관리자 추가
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>이름</TableHead>
                    <TableHead>이메일</TableHead>
                    <TableHead>권한</TableHead>
                    <TableHead>마지막 로그인</TableHead>
                    <TableHead>등록일</TableHead>
                    <TableHead className="text-right">관리</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {admins.map((admin) => (
                    <TableRow key={admin.id}>
                      <TableCell className="font-medium">{admin.name}</TableCell>
                      <TableCell>{admin.email}</TableCell>
                      <TableCell>
                        <Badge variant={roleLabels[admin.role].variant}>
                          {roleLabels[admin.role].label}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-gray-500">{admin.lastLogin}</TableCell>
                      <TableCell className="text-gray-500">{admin.createdAt}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => openAdminModal(admin)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteAdmin(admin.id)}
                            disabled={admin.role === 'super'}
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SEO Tab */}
        <TabsContent value="seo" className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                분석/추적 스크립트
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label>Google Analytics ID</Label>
                  <div className="flex gap-2">
                    <Input
                      value={seoSettings.googleAnalyticsId}
                      onChange={(e) =>
                        setSeoSettings({ ...seoSettings, googleAnalyticsId: e.target.value })
                      }
                      placeholder="G-XXXXXXXXXX"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(seoSettings.googleAnalyticsId)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Google Tag Manager ID</Label>
                  <div className="flex gap-2">
                    <Input
                      value={seoSettings.googleTagManagerId}
                      onChange={(e) =>
                        setSeoSettings({ ...seoSettings, googleTagManagerId: e.target.value })
                      }
                      placeholder="GTM-XXXXXXX"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(seoSettings.googleTagManagerId)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Meta Pixel ID</Label>
                  <div className="flex gap-2">
                    <Input
                      value={seoSettings.metaPixelId}
                      onChange={(e) =>
                        setSeoSettings({ ...seoSettings, metaPixelId: e.target.value })
                      }
                      placeholder="1234567890"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(seoSettings.metaPixelId)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>네이버 서치어드바이저 인증 코드</Label>
                  <div className="flex gap-2">
                    <Input
                      value={seoSettings.naverSiteVerification}
                      onChange={(e) =>
                        setSeoSettings({ ...seoSettings, naverSiteVerification: e.target.value })
                      }
                      placeholder="인증 코드"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => copyToClipboard(seoSettings.naverSiteVerification)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                SEO 설정
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Sitemap URL</Label>
                <Input
                  value={seoSettings.sitemapUrl}
                  onChange={(e) =>
                    setSeoSettings({ ...seoSettings, sitemapUrl: e.target.value })
                  }
                  placeholder="https://cnec.kr/sitemap.xml"
                />
              </div>
              <div className="space-y-2">
                <Label>robots.txt 내용</Label>
                <Textarea
                  value={seoSettings.robotsTxt}
                  onChange={(e) =>
                    setSeoSettings({ ...seoSettings, robotsTxt: e.target.value })
                  }
                  placeholder="User-agent: *&#10;Allow: /"
                  rows={5}
                  className="font-mono text-sm"
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={saveSeoSettings}>
                  {seoSaved ? (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      저장됨
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      설정 저장
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Portfolio Modal */}
      <Dialog open={portfolioModalOpen} onOpenChange={setPortfolioModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingPortfolio ? '포트폴리오 수정' : '포트폴리오 추가'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>제목</Label>
              <Input
                value={portfolioForm.title}
                onChange={(e) =>
                  setPortfolioForm({ ...portfolioForm, title: e.target.value })
                }
                placeholder="영상 제목"
              />
            </div>
            <div className="space-y-2">
              <Label>YouTube URL</Label>
              <Input
                value={portfolioForm.youtubeUrl}
                onChange={(e) =>
                  setPortfolioForm({ ...portfolioForm, youtubeUrl: e.target.value })
                }
                placeholder="https://youtube.com/shorts/..."
              />
            </div>
            <div className="space-y-2">
              <Label>카테고리</Label>
              <Select
                value={portfolioForm.category}
                onValueChange={(value) =>
                  setPortfolioForm({ ...portfolioForm, category: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(categoryLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setPortfolioModalOpen(false)}>
              취소
            </Button>
            <Button onClick={savePortfolio}>저장</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Template Modal */}
      <Dialog open={templateModalOpen} onOpenChange={setTemplateModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {editingTemplate ? '템플릿 수정' : '템플릿 추가'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>템플릿명</Label>
              <Input
                value={templateForm.name}
                onChange={(e) =>
                  setTemplateForm({ ...templateForm, name: e.target.value })
                }
                placeholder="템플릿 이름"
              />
            </div>
            {templateForm.type === 'email' && (
              <div className="space-y-2">
                <Label>이메일 제목</Label>
                <Input
                  value={templateForm.subject}
                  onChange={(e) =>
                    setTemplateForm({ ...templateForm, subject: e.target.value })
                  }
                  placeholder="[CNEC] {{campaign_name}} 캠페인 안내"
                />
              </div>
            )}
            {templateForm.type === 'kakao' && (
              <div className="space-y-2">
                <Label>카카오 템플릿 코드</Label>
                <Input
                  value={templateForm.templateCode}
                  onChange={(e) =>
                    setTemplateForm({ ...templateForm, templateCode: e.target.value })
                  }
                  placeholder="CNEC_001"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label>내용</Label>
              <Textarea
                value={templateForm.body}
                onChange={(e) =>
                  setTemplateForm({ ...templateForm, body: e.target.value })
                }
                placeholder="템플릿 내용을 입력하세요..."
                rows={8}
              />
              <p className="text-xs text-gray-500">
                사용 가능한 변수: {'{{creator_name}}'}, {'{{campaign_name}}'}, {'{{deadline}}'}, {'{{amount}}'}, {'{{month}}'}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setTemplateModalOpen(false)}>
              취소
            </Button>
            <Button onClick={saveTemplate}>저장</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Admin Modal */}
      <Dialog open={adminModalOpen} onOpenChange={setAdminModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingAdmin ? '관리자 수정' : '관리자 추가'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>이름</Label>
              <Input
                value={adminForm.name}
                onChange={(e) =>
                  setAdminForm({ ...adminForm, name: e.target.value })
                }
                placeholder="관리자 이름"
              />
            </div>
            <div className="space-y-2">
              <Label>이메일</Label>
              <Input
                type="email"
                value={adminForm.email}
                onChange={(e) =>
                  setAdminForm({ ...adminForm, email: e.target.value })
                }
                placeholder="admin@cnec.kr"
              />
            </div>
            {!editingAdmin && (
              <div className="space-y-2">
                <Label>비밀번호</Label>
                <Input
                  type="password"
                  value={adminForm.password}
                  onChange={(e) =>
                    setAdminForm({ ...adminForm, password: e.target.value })
                  }
                  placeholder="초기 비밀번호"
                />
              </div>
            )}
            <div className="space-y-2">
              <Label>권한</Label>
              <Select
                value={adminForm.role}
                onValueChange={(value) =>
                  setAdminForm({ ...adminForm, role: value })
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="super">슈퍼관리자</SelectItem>
                  <SelectItem value="manager">매니저</SelectItem>
                  <SelectItem value="viewer">뷰어</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAdminModalOpen(false)}>
              취소
            </Button>
            <Button onClick={saveAdmin}>저장</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
