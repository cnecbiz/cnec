import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { formatDate } from '@/lib/utils'
import {
  Plus,
  FileText,
  Send,
  CheckCircle,
  Clock,
  XCircle,
  Mail,
  Eye,
  Download,
  MoreHorizontal,
  Search,
  Copy,
  RefreshCw,
  AlertCircle,
} from 'lucide-react'

// Contract templates
const templates = [
  {
    id: 1,
    name: '기획 숏폼 크리에이터 계약서',
    type: 'creator',
    description: '기획 숏폼 캠페인 참여 크리에이터용 표준 계약서',
    version: '2.1',
    lastModified: '2024-12-01',
    usageCount: 256,
  },
  {
    id: 2,
    name: '4주 챌린지 크리에이터 계약서',
    type: 'creator',
    description: '4주 챌린지 캠페인 참여 크리에이터용 계약서',
    version: '1.3',
    lastModified: '2024-11-15',
    usageCount: 89,
  },
  {
    id: 3,
    name: '광고주 서비스 이용 계약서',
    type: 'brand',
    description: '광고주(기업) 서비스 이용 약관 및 계약서',
    version: '3.0',
    lastModified: '2024-10-20',
    usageCount: 156,
  },
  {
    id: 4,
    name: '소속 크리에이터 전속 계약서',
    type: 'exclusive',
    description: '소속 크리에이터 전속 계약용',
    version: '1.0',
    lastModified: '2024-12-05',
    usageCount: 12,
  },
  {
    id: 5,
    name: '유튜브 지원 크리에이터 계약서',
    type: 'youtube',
    description: '유튜브 채널 지원 프로그램 참여 계약서',
    version: '1.2',
    lastModified: '2024-11-28',
    usageCount: 34,
  },
]

// Contract records
const contracts = [
  {
    id: 1,
    templateName: '기획 숏폼 크리에이터 계약서',
    recipientName: '뷰티민지',
    recipientEmail: 'minji@email.com',
    recipientType: 'creator',
    campaignName: '비타민C 세럼 런칭',
    status: 'completed',
    sentDate: '2024-12-01',
    signedDate: '2024-12-02',
    expiryDate: '2025-12-02',
  },
  {
    id: 2,
    templateName: '4주 챌린지 크리에이터 계약서',
    recipientName: '스킨케어요정',
    recipientEmail: 'skincare@email.com',
    recipientType: 'creator',
    campaignName: '히알루론산 4주 챌린지',
    status: 'pending',
    sentDate: '2024-12-05',
    signedDate: null,
    expiryDate: null,
  },
  {
    id: 3,
    templateName: '광고주 서비스 이용 계약서',
    recipientName: '(주)에스티로더 코리아',
    recipientEmail: 'marketing@esteelauder.kr',
    recipientType: 'brand',
    campaignName: null,
    status: 'completed',
    sentDate: '2024-11-20',
    signedDate: '2024-11-21',
    expiryDate: '2025-11-21',
  },
  {
    id: 4,
    templateName: '기획 숏폼 크리에이터 계약서',
    recipientName: '메이크업하늘',
    recipientEmail: 'sky@email.com',
    recipientType: 'creator',
    campaignName: '프리미엄 파운데이션',
    status: 'expired',
    sentDate: '2024-11-01',
    signedDate: null,
    expiryDate: null,
  },
  {
    id: 5,
    templateName: '소속 크리에이터 전속 계약서',
    recipientName: '뷰티소희',
    recipientEmail: 'sohee@email.com',
    recipientType: 'creator',
    campaignName: null,
    status: 'completed',
    sentDate: '2024-10-15',
    signedDate: '2024-10-16',
    expiryDate: '2025-10-16',
  },
]

const getStatusBadge = (status) => {
  switch (status) {
    case 'completed':
      return (
        <Badge variant="success" className="gap-1">
          <CheckCircle className="h-3 w-3" />
          서명완료
        </Badge>
      )
    case 'pending':
      return (
        <Badge variant="warning" className="gap-1">
          <Clock className="h-3 w-3" />
          서명대기
        </Badge>
      )
    case 'expired':
      return (
        <Badge variant="destructive" className="gap-1">
          <XCircle className="h-3 w-3" />
          만료됨
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

const getTypeLabel = (type) => {
  switch (type) {
    case 'creator':
      return <Badge variant="blue">크리에이터</Badge>
    case 'brand':
      return <Badge variant="purple">광고주</Badge>
    case 'exclusive':
      return <Badge variant="orange">전속</Badge>
    case 'youtube':
      return <Badge variant="red">유튜브</Badge>
    default:
      return <Badge variant="outline">{type}</Badge>
  }
}

export function AdminContracts() {
  const [selectedContracts, setSelectedContracts] = useState([])
  const [sendDialogOpen, setSendDialogOpen] = useState(false)
  const [templateDialogOpen, setTemplateDialogOpen] = useState(false)
  const [sendForm, setSendForm] = useState({
    templateId: '',
    recipientEmail: '',
    recipientName: '',
    campaignName: '',
    message: '',
  })

  const stats = {
    totalTemplates: templates.length,
    pendingSignatures: contracts.filter((c) => c.status === 'pending').length,
    completedThisMonth: contracts.filter(
      (c) =>
        c.status === 'completed' &&
        new Date(c.signedDate).getMonth() === new Date().getMonth()
    ).length,
    expiredCount: contracts.filter((c) => c.status === 'expired').length,
  }

  const toggleSelectContract = (id) => {
    setSelectedContracts((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    )
  }

  const toggleSelectAll = () => {
    if (selectedContracts.length === contracts.length) {
      setSelectedContracts([])
    } else {
      setSelectedContracts(contracts.map((c) => c.id))
    }
  }

  const sendReminder = (contractIds) => {
    alert(`${contractIds.length}건의 계약서에 리마인더를 발송했습니다.`)
  }

  const handleSendContract = () => {
    alert(`계약서를 ${sendForm.recipientEmail}로 발송했습니다.`)
    setSendDialogOpen(false)
    setSendForm({
      templateId: '',
      recipientEmail: '',
      recipientName: '',
      campaignName: '',
      message: '',
    })
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">계약서 관리</h1>
          <p className="text-gray-500">
            전자계약서 템플릿을 관리하고 서명을 발송하세요.
          </p>
        </div>
        <div className="flex gap-2">
          <Dialog open={templateDialogOpen} onOpenChange={setTemplateDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                템플릿 추가
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>새 계약서 템플릿</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>템플릿 이름</Label>
                  <Input placeholder="계약서 템플릿 이름 입력" />
                </div>
                <div className="space-y-2">
                  <Label>계약서 유형</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="유형 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="creator">크리에이터</SelectItem>
                      <SelectItem value="brand">광고주</SelectItem>
                      <SelectItem value="exclusive">전속</SelectItem>
                      <SelectItem value="youtube">유튜브 지원</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>설명</Label>
                  <Input placeholder="템플릿 설명 입력" />
                </div>
                <div className="space-y-2">
                  <Label>계약서 파일 (PDF)</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50">
                    <FileText className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      PDF 파일을 업로드하거나 드래그하세요
                    </p>
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setTemplateDialogOpen(false)}
                  >
                    취소
                  </Button>
                  <Button onClick={() => setTemplateDialogOpen(false)}>
                    저장
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={sendDialogOpen} onOpenChange={setSendDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Send className="mr-2 h-4 w-4" />
                계약서 발송
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>전자계약서 발송</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>계약서 템플릿</Label>
                  <Select
                    value={sendForm.templateId}
                    onValueChange={(v) =>
                      setSendForm({ ...sendForm, templateId: v })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="템플릿 선택" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map((t) => (
                        <SelectItem key={t.id} value={String(t.id)}>
                          {t.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>수신자 이름</Label>
                    <Input
                      placeholder="이름 입력"
                      value={sendForm.recipientName}
                      onChange={(e) =>
                        setSendForm({ ...sendForm, recipientName: e.target.value })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>수신자 이메일</Label>
                    <Input
                      type="email"
                      placeholder="이메일 입력"
                      value={sendForm.recipientEmail}
                      onChange={(e) =>
                        setSendForm({
                          ...sendForm,
                          recipientEmail: e.target.value,
                        })
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>관련 캠페인 (선택)</Label>
                  <Input
                    placeholder="캠페인명 입력"
                    value={sendForm.campaignName}
                    onChange={(e) =>
                      setSendForm({ ...sendForm, campaignName: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label>추가 메시지 (선택)</Label>
                  <textarea
                    className="w-full px-3 py-2 border rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-cnec-blue"
                    rows={3}
                    placeholder="계약서와 함께 전달할 메시지를 입력하세요"
                    value={sendForm.message}
                    onChange={(e) =>
                      setSendForm({ ...sendForm, message: e.target.value })
                    }
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setSendDialogOpen(false)}
                  >
                    취소
                  </Button>
                  <Button onClick={handleSendContract}>
                    <Mail className="mr-2 h-4 w-4" />
                    이메일 발송
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cnec-blue-light flex items-center justify-center">
              <FileText className="h-5 w-5 text-cnec-blue" />
            </div>
            <div>
              <p className="text-sm text-gray-500">등록된 템플릿</p>
              <p className="text-xl font-bold">{stats.totalTemplates}개</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning-light flex items-center justify-center">
              <Clock className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-sm text-gray-500">서명 대기중</p>
              <p className="text-xl font-bold">{stats.pendingSignatures}건</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-success-light flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-success" />
            </div>
            <div>
              <p className="text-sm text-gray-500">이번 달 완료</p>
              <p className="text-xl font-bold">{stats.completedThisMonth}건</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
              <AlertCircle className="h-5 w-5 text-red-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500">만료됨</p>
              <p className="text-xl font-bold">{stats.expiredCount}건</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="contracts">
        <TabsList>
          <TabsTrigger value="contracts">계약서 현황</TabsTrigger>
          <TabsTrigger value="templates">템플릿 관리</TabsTrigger>
        </TabsList>

        <TabsContent value="contracts" className="mt-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle>전자계약서 현황</CardTitle>
              <div className="flex items-center gap-2">
                {selectedContracts.length > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => sendReminder(selectedContracts)}
                  >
                    <RefreshCw className="mr-2 h-4 w-4" />
                    리마인더 발송 ({selectedContracts.length})
                  </Button>
                )}
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input placeholder="수신자, 캠페인 검색..." className="pl-9" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedContracts.length === contracts.length}
                        onCheckedChange={toggleSelectAll}
                      />
                    </TableHead>
                    <TableHead>계약서</TableHead>
                    <TableHead>수신자</TableHead>
                    <TableHead>관련 캠페인</TableHead>
                    <TableHead>발송일</TableHead>
                    <TableHead>서명일</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {contracts.map((contract) => (
                    <TableRow key={contract.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedContracts.includes(contract.id)}
                          onCheckedChange={() => toggleSelectContract(contract.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{contract.templateName}</p>
                          <p className="text-xs text-gray-500">
                            {contract.recipientType === 'creator'
                              ? '크리에이터'
                              : '광고주'}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p>{contract.recipientName}</p>
                          <p className="text-sm text-gray-500">
                            {contract.recipientEmail}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        {contract.campaignName || (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-gray-500">
                        {formatDate(contract.sentDate)}
                      </TableCell>
                      <TableCell className="text-gray-500">
                        {contract.signedDate ? (
                          formatDate(contract.signedDate)
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </TableCell>
                      <TableCell>{getStatusBadge(contract.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" title="보기">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="다운로드">
                            <Download className="h-4 w-4" />
                          </Button>
                          {contract.status === 'pending' && (
                            <Button
                              variant="ghost"
                              size="icon"
                              title="리마인더"
                              onClick={() => sendReminder([contract.id])}
                            >
                              <RefreshCw className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>계약서 템플릿</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>템플릿명</TableHead>
                    <TableHead>유형</TableHead>
                    <TableHead>설명</TableHead>
                    <TableHead>버전</TableHead>
                    <TableHead>수정일</TableHead>
                    <TableHead>사용 횟수</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {templates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell className="font-medium">
                        {template.name}
                      </TableCell>
                      <TableCell>{getTypeLabel(template.type)}</TableCell>
                      <TableCell className="text-gray-500 max-w-xs truncate">
                        {template.description}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">v{template.version}</Badge>
                      </TableCell>
                      <TableCell className="text-gray-500">
                        {formatDate(template.lastModified)}
                      </TableCell>
                      <TableCell>{template.usageCount}회</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Button variant="ghost" size="icon" title="미리보기">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" title="복제">
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Integration Info */}
          <Card className="mt-4">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-cnec-blue-light flex items-center justify-center flex-shrink-0">
                  <Mail className="h-6 w-6 text-cnec-blue" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    전자서명 서비스 연동
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    모두싸인, 이싸인 등 전자서명 서비스와 연동하여 법적 효력이
                    있는 전자계약을 진행할 수 있습니다.
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Button variant="outline" size="sm">
                      모두싸인 연동
                    </Button>
                    <Button variant="outline" size="sm">
                      이싸인 연동
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
