import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Checkbox } from '@/components/ui/checkbox'
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
  Shield,
  Lock,
  Key,
  FileText,
  Users,
  Download,
  Plus,
  Trash2,
  Pencil,
  Save,
  AlertTriangle,
  Check,
  X,
} from 'lucide-react'

// Sample data
const initialBlockedIPs = [
  { id: '1', ip: '192.168.1.100', reason: '비정상 접근 시도', blockedAt: '2024-12-01', status: 'active' },
  { id: '2', ip: '10.0.0.55', reason: '스팸 등록 시도', blockedAt: '2024-11-28', status: 'active' },
  { id: '3', ip: '172.16.0.20', reason: '해킹 시도', blockedAt: '2024-11-15', status: 'inactive' },
]

const excelTemplates = [
  { id: '1', name: '크리에이터 목록', description: '전체 크리에이터 정보 엑셀', fields: ['이름', '이메일', 'SNS', '팔로워', '캠페인수'], lastUpdated: '2024-12-05' },
  { id: '2', name: '캠페인 리포트', description: '캠페인별 상세 리포트', fields: ['캠페인명', '브랜드', '크리에이터', '상태', '매출'], lastUpdated: '2024-12-03' },
  { id: '3', name: '정산 내역', description: '크리에이터 정산 내역', fields: ['이름', '계좌', '금액', '정산일', '상태'], lastUpdated: '2024-12-01' },
  { id: '4', name: '송장 관리', description: '제품 발송 송장 목록', fields: ['캠페인', '크리에이터', '주소', '송장번호', '배송상태'], lastUpdated: '2024-11-30' },
]

const memberSettings = {
  signupApproval: true,
  emailVerification: true,
  phoneVerification: false,
  minPasswordLength: 8,
  requireUppercase: true,
  requireNumber: true,
  requireSpecialChar: false,
  passwordExpireDays: 90,
  maxLoginAttempts: 5,
  lockoutDuration: 30,
}

export function AdminSecurity() {
  const [blockedIPs, setBlockedIPs] = useState(initialBlockedIPs)
  const [settings, setSettings] = useState(memberSettings)
  const [settingsSaved, setSettingsSaved] = useState(false)

  // IP Block Dialog
  const [ipDialogOpen, setIpDialogOpen] = useState(false)
  const [newIP, setNewIP] = useState({ ip: '', reason: '' })

  // Add new IP block
  const addIPBlock = () => {
    if (newIP.ip && newIP.reason) {
      setBlockedIPs([
        ...blockedIPs,
        {
          id: String(Date.now()),
          ip: newIP.ip,
          reason: newIP.reason,
          blockedAt: new Date().toISOString().split('T')[0],
          status: 'active',
        },
      ])
      setNewIP({ ip: '', reason: '' })
      setIpDialogOpen(false)
    }
  }

  // Remove IP block
  const removeIPBlock = (id) => {
    if (confirm('정말 해제하시겠습니까?')) {
      setBlockedIPs(blockedIPs.filter((ip) => ip.id !== id))
    }
  }

  // Toggle IP status
  const toggleIPStatus = (id) => {
    setBlockedIPs(
      blockedIPs.map((ip) =>
        ip.id === id
          ? { ...ip, status: ip.status === 'active' ? 'inactive' : 'active' }
          : ip
      )
    )
  }

  // Save settings
  const saveSettings = () => {
    setSettingsSaved(true)
    setTimeout(() => setSettingsSaved(false), 2000)
  }

  // Download excel template
  const downloadTemplate = (templateName) => {
    alert(`${templateName} 엑셀 양식이 다운로드됩니다.`)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">보안 설정</h1>
        <p className="text-gray-500">플랫폼 보안 및 회원 관련 설정을 관리하세요.</p>
      </div>

      <Tabs defaultValue="member">
        <TabsList>
          <TabsTrigger value="member">회원 설정</TabsTrigger>
          <TabsTrigger value="password">비밀번호 정책</TabsTrigger>
          <TabsTrigger value="ip">IP 차단 관리</TabsTrigger>
          <TabsTrigger value="excel">엑셀 양식 관리</TabsTrigger>
        </TabsList>

        {/* 회원 설정 */}
        <TabsContent value="member" className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                회원 가입 설정
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">가입 승인 필요</p>
                      <p className="text-sm text-gray-500">관리자 승인 후 회원 활성화</p>
                    </div>
                    <Checkbox
                      checked={settings.signupApproval}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, signupApproval: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">이메일 인증 필수</p>
                      <p className="text-sm text-gray-500">가입 시 이메일 인증 요구</p>
                    </div>
                    <Checkbox
                      checked={settings.emailVerification}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, emailVerification: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">휴대폰 인증 필수</p>
                      <p className="text-sm text-gray-500">가입 시 SMS 인증 요구</p>
                    </div>
                    <Checkbox
                      checked={settings.phoneVerification}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, phoneVerification: checked })
                      }
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>최대 로그인 시도 횟수</Label>
                    <Input
                      type="number"
                      value={settings.maxLoginAttempts}
                      onChange={(e) =>
                        setSettings({ ...settings, maxLoginAttempts: parseInt(e.target.value) })
                      }
                    />
                    <p className="text-xs text-gray-500">초과 시 계정 잠금</p>
                  </div>
                  <div className="space-y-2">
                    <Label>계정 잠금 시간 (분)</Label>
                    <Input
                      type="number"
                      value={settings.lockoutDuration}
                      onChange={(e) =>
                        setSettings({ ...settings, lockoutDuration: parseInt(e.target.value) })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <Button onClick={saveSettings}>
                  {settingsSaved ? (
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

        {/* 비밀번호 정책 */}
        <TabsContent value="password" className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                비밀번호 정책
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>최소 비밀번호 길이</Label>
                    <Select
                      value={settings.minPasswordLength.toString()}
                      onValueChange={(value) =>
                        setSettings({ ...settings, minPasswordLength: parseInt(value) })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="6">6자</SelectItem>
                        <SelectItem value="8">8자</SelectItem>
                        <SelectItem value="10">10자</SelectItem>
                        <SelectItem value="12">12자</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>비밀번호 만료 주기 (일)</Label>
                    <Select
                      value={settings.passwordExpireDays.toString()}
                      onValueChange={(value) =>
                        setSettings({ ...settings, passwordExpireDays: parseInt(value) })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="30">30일</SelectItem>
                        <SelectItem value="60">60일</SelectItem>
                        <SelectItem value="90">90일</SelectItem>
                        <SelectItem value="180">180일</SelectItem>
                        <SelectItem value="0">만료 없음</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="font-medium text-sm">필수 포함 문자</p>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>대문자 포함</span>
                    <Checkbox
                      checked={settings.requireUppercase}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, requireUppercase: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>숫자 포함</span>
                    <Checkbox
                      checked={settings.requireNumber}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, requireNumber: checked })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span>특수문자 포함</span>
                    <Checkbox
                      checked={settings.requireSpecialChar}
                      onCheckedChange={(checked) =>
                        setSettings({ ...settings, requireSpecialChar: checked })
                      }
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>현재 정책:</strong> 최소 {settings.minPasswordLength}자,
                  {settings.requireUppercase && ' 대문자 필수,'}
                  {settings.requireNumber && ' 숫자 필수,'}
                  {settings.requireSpecialChar && ' 특수문자 필수,'}
                  {settings.passwordExpireDays > 0
                    ? ` ${settings.passwordExpireDays}일마다 변경`
                    : ' 만료 없음'}
                </p>
              </div>

              <div className="flex justify-end">
                <Button onClick={saveSettings}>
                  <Save className="mr-2 h-4 w-4" />
                  설정 저장
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* IP 차단 관리 */}
        <TabsContent value="ip" className="mt-4 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                IP 차단 목록
              </CardTitle>
              <Button onClick={() => setIpDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                IP 추가
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>IP 주소</TableHead>
                    <TableHead>차단 사유</TableHead>
                    <TableHead>차단일</TableHead>
                    <TableHead>상태</TableHead>
                    <TableHead className="text-right">관리</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {blockedIPs.map((ip) => (
                    <TableRow key={ip.id}>
                      <TableCell className="font-mono">{ip.ip}</TableCell>
                      <TableCell>{ip.reason}</TableCell>
                      <TableCell className="text-gray-500">{ip.blockedAt}</TableCell>
                      <TableCell>
                        <Badge
                          variant={ip.status === 'active' ? 'destructive' : 'secondary'}
                          className="cursor-pointer"
                          onClick={() => toggleIPStatus(ip.id)}
                        >
                          {ip.status === 'active' ? '차단중' : '해제됨'}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeIPBlock(ip.id)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {blockedIPs.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  차단된 IP가 없습니다.
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-yellow-500" />
                자동 차단 설정
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">로그인 실패 자동 차단</p>
                  <p className="text-sm text-gray-500">10회 이상 실패 시 IP 자동 차단</p>
                </div>
                <Checkbox defaultChecked />
              </div>
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p className="font-medium">비정상 트래픽 차단</p>
                  <p className="text-sm text-gray-500">분당 100회 이상 요청 시 차단</p>
                </div>
                <Checkbox defaultChecked />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 엑셀 양식 관리 */}
        <TabsContent value="excel" className="mt-4 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                엑셀 다운로드 양식
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {excelTemplates.map((template) => (
                  <div
                    key={template.id}
                    className="p-4 border rounded-lg hover:border-cnec-blue transition-colors"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-medium">{template.name}</h3>
                        <p className="text-sm text-gray-500">{template.description}</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => downloadTemplate(template.name)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {template.fields.map((field) => (
                        <Badge key={field} variant="secondary" className="text-xs">
                          {field}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-2">
                      마지막 수정: {template.lastUpdated}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>엑셀 업로드 양식</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-medium">크리에이터 일괄 등록</h3>
                    <p className="text-sm text-gray-500">엑셀로 크리에이터 정보 일괄 업로드</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      양식 다운로드
                    </Button>
                    <Button size="sm">
                      업로드
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  필수 컬럼: 이름, 이메일, 휴대폰, 피부타입, SNS 링크
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-medium">기업 일괄 등록</h3>
                    <p className="text-sm text-gray-500">엑셀로 기업 정보 일괄 업로드</p>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      양식 다운로드
                    </Button>
                    <Button size="sm">
                      업로드
                    </Button>
                  </div>
                </div>
                <p className="text-xs text-gray-500">
                  필수 컬럼: 회사명, 사업자번호, 담당자명, 이메일, 연락처
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* IP 추가 다이얼로그 */}
      <Dialog open={ipDialogOpen} onOpenChange={setIpDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>IP 차단 추가</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>IP 주소</Label>
              <Input
                placeholder="예: 192.168.1.100"
                value={newIP.ip}
                onChange={(e) => setNewIP({ ...newIP, ip: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>차단 사유</Label>
              <Input
                placeholder="차단 사유를 입력하세요"
                value={newIP.reason}
                onChange={(e) => setNewIP({ ...newIP, reason: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIpDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={addIPBlock}>추가</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
