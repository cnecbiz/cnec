import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { formatCurrency, getDDay } from '@/lib/utils'
import {
  Calendar,
  Package,
  Upload,
  Clock,
  CheckCircle,
  ExternalLink,
  FileVideo,
  FileCheck,
  Link2,
  Copy,
  Check,
  AlertCircle,
  X,
  Eye,
  Download,
} from 'lucide-react'

const initialCampaigns = [
  {
    id: 1,
    name: '라네즈 립슬리핑마스크 리뷰',
    brand: '아모레퍼시픽',
    status: 'delivery',
    fee: 400000,
    deadline: '2024-12-25',
    trackingNumber: '1234567890',
    step: 2,
    totalSteps: 5,
    originalFile: null,
    cleanFile: null,
    partnershipCode: '',
    contentUrl: '',
    uploadDeadline: '2025-01-05',
  },
  {
    id: 2,
    name: '에스티로더 더블웨어 파운데이션',
    brand: '에스티로더',
    status: 'production',
    fee: 500000,
    deadline: '2024-12-20',
    step: 3,
    totalSteps: 5,
    originalFile: null,
    cleanFile: null,
    partnershipCode: '',
    contentUrl: '',
    uploadDeadline: '2025-01-10',
    guidelines: {
      concept: '비포&애프터',
      length: '30초 내외',
      hashtags: ['#에스티로더', '#더블웨어', '#광고'],
      hookingPoint: '커버력 강조',
    },
  },
  {
    id: 3,
    name: '헤라 블랙쿠션 리뷰',
    brand: '헤라',
    status: 'review',
    fee: 350000,
    deadline: '2024-12-15',
    step: 4,
    totalSteps: 5,
    uploadedAt: '2024-12-10',
    originalFile: { name: 'hera_original.mp4', size: '45MB' },
    cleanFile: { name: 'hera_clean.mp4', size: '42MB' },
    partnershipCode: 'HERA2024DEC',
    contentUrl: 'https://instagram.com/reel/abc123',
  },
]

const appliedCampaigns = [
  {
    id: 4,
    name: '설화수 자음생크림 체험단',
    brand: '설화수',
    status: 'applied',
    fee: 600000,
    appliedAt: '2024-12-08',
    resultDate: '2024-12-22',
  },
  {
    id: 5,
    name: '이니스프리 그린티 세럼',
    brand: '이니스프리',
    status: 'applied',
    fee: 350000,
    appliedAt: '2024-12-10',
    resultDate: '2024-12-28',
  },
]

const completedCampaigns = [
  {
    id: 6,
    name: '클리오 킬커버 파운데이션',
    brand: '클리오',
    status: 'completed',
    fee: 400000,
    completedAt: '2024-11-30',
    rating: 5,
    views: 45678,
    contentUrl: 'https://instagram.com/reel/xyz789',
  },
]

const statusConfig = {
  applied: { label: '지원 중', icon: Clock, color: 'secondary' },
  selected: { label: '선정됨', icon: CheckCircle, color: 'success' },
  delivery: { label: '제품 수령 대기', icon: Package, color: 'warning' },
  production: { label: '콘텐츠 제작', icon: Upload, color: 'blue' },
  review: { label: '검수 대기', icon: Clock, color: 'secondary' },
  completed: { label: '완료', icon: CheckCircle, color: 'success' },
  rejected: { label: '미선정', icon: Clock, color: 'error' },
}

export function CreatorMyCampaigns() {
  const [campaigns, setCampaigns] = useState(initialCampaigns)
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [selectedCampaign, setSelectedCampaign] = useState(null)
  const [uploadData, setUploadData] = useState({
    originalFile: null,
    cleanFile: null,
    partnershipCode: '',
    contentUrl: '',
  })
  const [copiedCode, setCopiedCode] = useState(false)

  // Open upload modal
  const openUploadModal = (campaign) => {
    setSelectedCampaign(campaign)
    setUploadData({
      originalFile: campaign.originalFile,
      cleanFile: campaign.cleanFile,
      partnershipCode: campaign.partnershipCode || '',
      contentUrl: campaign.contentUrl || '',
    })
    setUploadModalOpen(true)
  }

  // Handle file upload
  const handleFileUpload = (type, file) => {
    setUploadData((prev) => ({
      ...prev,
      [type]: file ? { name: file.name, size: `${(file.size / 1024 / 1024).toFixed(1)}MB` } : null,
    }))
  }

  // Save upload data
  const saveUpload = () => {
    if (selectedCampaign) {
      setCampaigns((prev) =>
        prev.map((c) =>
          c.id === selectedCampaign.id
            ? {
                ...c,
                originalFile: uploadData.originalFile,
                cleanFile: uploadData.cleanFile,
                partnershipCode: uploadData.partnershipCode,
                contentUrl: uploadData.contentUrl,
                status: uploadData.contentUrl ? 'review' : c.status,
                step: uploadData.contentUrl ? 4 : c.step,
              }
            : c
        )
      )
    }
    setUploadModalOpen(false)
  }

  // Copy partnership code
  const copyPartnershipCode = (code) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(true)
    setTimeout(() => setCopiedCode(false), 2000)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">내 캠페인</h1>
        <p className="text-gray-500">지원한 캠페인과 진행 상황을 확인하세요.</p>
      </div>

      <Tabs defaultValue="ongoing">
        <TabsList>
          <TabsTrigger value="ongoing">진행 중 ({campaigns.length})</TabsTrigger>
          <TabsTrigger value="applied">지원 중 ({appliedCampaigns.length})</TabsTrigger>
          <TabsTrigger value="completed">완료 ({completedCampaigns.length})</TabsTrigger>
        </TabsList>

        {/* 진행 중 */}
        <TabsContent value="ongoing" className="mt-4">
          <div className="space-y-4">
            {campaigns.map((campaign) => {
              const status = statusConfig[campaign.status]
              const StatusIcon = status?.icon || Clock
              return (
                <Card key={campaign.id}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                        <p className="text-gray-500">{campaign.brand}</p>
                      </div>
                      <Badge variant="blue">{formatCurrency(campaign.fee)}</Badge>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <Badge variant={status?.color}>
                        <StatusIcon className="h-3 w-3 mr-1" />
                        {status?.label}
                      </Badge>
                      <span className="text-sm text-gray-500 flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        마감 {getDDay(campaign.deadline)}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">진행률</span>
                        <span className="font-medium">{campaign.step}/{campaign.totalSteps} 단계</span>
                      </div>
                      <Progress value={(campaign.step / campaign.totalSteps) * 100} />
                    </div>

                    {/* 제품 수령 대기 상태 */}
                    {campaign.status === 'delivery' && campaign.trackingNumber && (
                      <div className="p-3 bg-gray-50 rounded-lg mb-4">
                        <p className="text-sm text-gray-500">운송장 번호</p>
                        <div className="flex items-center justify-between">
                          <p className="font-mono font-medium">{campaign.trackingNumber}</p>
                          <Button variant="link" size="sm" className="text-cnec-blue">
                            배송 조회 <ExternalLink className="ml-1 h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* 콘텐츠 제작 상태 */}
                    {campaign.status === 'production' && (
                      <div className="space-y-4">
                        {/* Guidelines */}
                        {campaign.guidelines && (
                          <div className="p-4 bg-gray-50 rounded-lg space-y-2">
                            <p className="font-medium text-sm">콘텐츠 가이드라인</p>
                            <div className="grid grid-cols-2 gap-2 text-sm">
                              <div>
                                <span className="text-gray-500">콘셉트: </span>
                                <span>{campaign.guidelines.concept}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">영상 길이: </span>
                                <span>{campaign.guidelines.length}</span>
                              </div>
                              <div className="col-span-2">
                                <span className="text-gray-500">후킹 포인트: </span>
                                <span>{campaign.guidelines.hookingPoint}</span>
                              </div>
                              <div className="col-span-2 flex flex-wrap gap-1">
                                {campaign.guidelines.hashtags.map((tag) => (
                                  <Badge key={tag} variant="secondary" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* File upload status */}
                        <div className="grid grid-cols-2 gap-3">
                          <div className={`p-3 rounded-lg border ${campaign.originalFile ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
                            <div className="flex items-center gap-2 mb-1">
                              <FileVideo className={`h-4 w-4 ${campaign.originalFile ? 'text-green-600' : 'text-gray-400'}`} />
                              <span className="text-sm font-medium">원본 파일</span>
                            </div>
                            {campaign.originalFile ? (
                              <p className="text-xs text-green-600">{campaign.originalFile.name}</p>
                            ) : (
                              <p className="text-xs text-gray-400">업로드 필요</p>
                            )}
                          </div>
                          <div className={`p-3 rounded-lg border ${campaign.cleanFile ? 'border-green-200 bg-green-50' : 'border-gray-200'}`}>
                            <div className="flex items-center gap-2 mb-1">
                              <FileCheck className={`h-4 w-4 ${campaign.cleanFile ? 'text-green-600' : 'text-gray-400'}`} />
                              <span className="text-sm font-medium">클린본 파일</span>
                            </div>
                            {campaign.cleanFile ? (
                              <p className="text-xs text-green-600">{campaign.cleanFile.name}</p>
                            ) : (
                              <p className="text-xs text-gray-400">업로드 필요</p>
                            )}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button className="flex-1" onClick={() => openUploadModal(campaign)}>
                            <Upload className="mr-2 h-4 w-4" />
                            파일 업로드 / 정보 입력
                          </Button>
                          <Button variant="outline">가이드라인 보기</Button>
                        </div>
                      </div>
                    )}

                    {/* 검수 대기 상태 */}
                    {campaign.status === 'review' && (
                      <div className="space-y-4">
                        <div className="p-3 bg-cnec-blue-light rounded-lg">
                          <p className="text-sm text-cnec-blue">
                            업로드한 콘텐츠를 검수 중입니다. 검수가 완료되면 알림을 보내드립니다.
                          </p>
                        </div>

                        {/* Uploaded files info */}
                        <div className="grid grid-cols-2 gap-3">
                          {campaign.originalFile && (
                            <div className="p-3 rounded-lg border border-green-200 bg-green-50">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <FileVideo className="h-4 w-4 text-green-600" />
                                  <span className="text-sm">{campaign.originalFile.name}</span>
                                </div>
                                <Button variant="ghost" size="icon">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          )}
                          {campaign.cleanFile && (
                            <div className="p-3 rounded-lg border border-green-200 bg-green-50">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                  <FileCheck className="h-4 w-4 text-green-600" />
                                  <span className="text-sm">{campaign.cleanFile.name}</span>
                                </div>
                                <Button variant="ghost" size="icon">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          )}
                        </div>

                        {campaign.partnershipCode && (
                          <div className="p-3 bg-gray-50 rounded-lg">
                            <p className="text-sm text-gray-500 mb-1">파트너십 광고 코드</p>
                            <div className="flex items-center gap-2">
                              <code className="flex-1 px-2 py-1 bg-white rounded border text-sm font-mono">
                                {campaign.partnershipCode}
                              </code>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => copyPartnershipCode(campaign.partnershipCode)}
                              >
                                {copiedCode ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                              </Button>
                            </div>
                          </div>
                        )}

                        {campaign.contentUrl && (
                          <a
                            href={campaign.contentUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-sm text-cnec-blue hover:underline"
                          >
                            <Link2 className="h-4 w-4" />
                            게시물 보기
                          </a>
                        )}
                      </div>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* 지원 중 */}
        <TabsContent value="applied" className="mt-4">
          <div className="space-y-4">
            {appliedCampaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                      <p className="text-gray-500">{campaign.brand}</p>
                    </div>
                    <Badge variant="blue">{formatCurrency(campaign.fee)}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>지원일: {campaign.appliedAt}</span>
                    <span>결과 발표: {campaign.resultDate}</span>
                  </div>
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600">
                      <AlertCircle className="h-4 w-4 inline mr-1" />
                      {campaign.resultDate}에 선정 결과가 발표됩니다.
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* 완료 */}
        <TabsContent value="completed" className="mt-4">
          <div className="space-y-4">
            {completedCampaigns.map((campaign) => (
              <Card key={campaign.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{campaign.name}</h3>
                      <p className="text-gray-500">{campaign.brand}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="success">완료</Badge>
                      <p className="text-lg font-bold text-cnec-blue mt-1">
                        {formatCurrency(campaign.fee)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <span>완료일: {campaign.completedAt}</span>
                    <span>조회수: {campaign.views.toLocaleString()}</span>
                    <span className="flex items-center">
                      평점:
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star} className={star <= campaign.rating ? 'text-yellow-400' : 'text-gray-300'}>
                          ★
                        </span>
                      ))}
                    </span>
                  </div>
                  <a
                    href={campaign.contentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm text-cnec-blue hover:underline"
                  >
                    <Link2 className="h-4 w-4" />
                    게시물 보기
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Upload Modal */}
      <Dialog open={uploadModalOpen} onOpenChange={setUploadModalOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>콘텐츠 업로드</DialogTitle>
          </DialogHeader>
          {selectedCampaign && (
            <div className="space-y-4">
              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="font-medium">{selectedCampaign.name}</p>
                <p className="text-sm text-gray-500">{selectedCampaign.brand}</p>
              </div>

              {/* Original File */}
              <div className="space-y-2">
                <Label>원본 파일</Label>
                <div className="border-2 border-dashed rounded-lg p-4">
                  {uploadData.originalFile ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileVideo className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="text-sm font-medium">{uploadData.originalFile.name}</p>
                          <p className="text-xs text-gray-500">{uploadData.originalFile.size}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleFileUpload('originalFile', null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <label className="cursor-pointer block text-center">
                      <input
                        type="file"
                        className="hidden"
                        accept="video/*"
                        onChange={(e) => handleFileUpload('originalFile', e.target.files[0])}
                      />
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">원본 영상 파일 업로드</p>
                      <p className="text-xs text-gray-400">MP4, MOV (최대 500MB)</p>
                    </label>
                  )}
                </div>
              </div>

              {/* Clean File */}
              <div className="space-y-2">
                <Label>클린본 파일 (로고/자막 없는 버전)</Label>
                <div className="border-2 border-dashed rounded-lg p-4">
                  {uploadData.cleanFile ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileCheck className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="text-sm font-medium">{uploadData.cleanFile.name}</p>
                          <p className="text-xs text-gray-500">{uploadData.cleanFile.size}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleFileUpload('cleanFile', null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <label className="cursor-pointer block text-center">
                      <input
                        type="file"
                        className="hidden"
                        accept="video/*"
                        onChange={(e) => handleFileUpload('cleanFile', e.target.files[0])}
                      />
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-500">클린본 영상 파일 업로드</p>
                      <p className="text-xs text-gray-400">MP4, MOV (최대 500MB)</p>
                    </label>
                  )}
                </div>
              </div>

              {/* Partnership Code */}
              <div className="space-y-2">
                <Label>파트너십 광고 코드</Label>
                <Input
                  placeholder="브랜드에서 발급받은 광고 코드 입력"
                  value={uploadData.partnershipCode}
                  onChange={(e) =>
                    setUploadData({ ...uploadData, partnershipCode: e.target.value })
                  }
                />
                <p className="text-xs text-gray-500">
                  파트너십 광고 코드가 필요한 캠페인의 경우 입력해주세요.
                </p>
              </div>

              {/* Content URL */}
              <div className="space-y-2">
                <Label>게시물 URL</Label>
                <Input
                  placeholder="https://instagram.com/reel/..."
                  value={uploadData.contentUrl}
                  onChange={(e) =>
                    setUploadData({ ...uploadData, contentUrl: e.target.value })
                  }
                />
                <p className="text-xs text-gray-500">
                  SNS에 업로드한 게시물 링크를 입력해주세요.
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setUploadModalOpen(false)}>
              취소
            </Button>
            <Button onClick={saveUpload}>저장</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
