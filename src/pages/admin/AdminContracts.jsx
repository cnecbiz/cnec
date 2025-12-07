import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Plus, FileText, Send, CheckCircle } from 'lucide-react'

export function AdminContracts() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">계약서 관리</h1>
          <p className="text-gray-500">계약서 템플릿을 관리하고 전자서명을 발송하세요.</p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          템플릿 추가
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-cnec-blue-light flex items-center justify-center">
              <FileText className="h-5 w-5 text-cnec-blue" />
            </div>
            <div>
              <p className="text-sm text-gray-500">등록된 템플릿</p>
              <p className="text-xl font-bold">5개</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-warning-light flex items-center justify-center">
              <Send className="h-5 w-5 text-warning" />
            </div>
            <div>
              <p className="text-sm text-gray-500">서명 대기중</p>
              <p className="text-xl font-bold">12건</p>
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
              <p className="text-xl font-bold">45건</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>계약서 템플릿</CardTitle>
        </CardHeader>
        <CardContent className="p-8 text-center text-gray-500">
          계약서 템플릿 관리 기능이 곧 추가됩니다.
          <br />
          <span className="text-sm">모두싸인/이싸인 연동을 지원할 예정입니다.</span>
        </CardContent>
      </Card>
    </div>
  )
}
