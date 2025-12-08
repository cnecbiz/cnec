import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Bell, CheckCircle, Package, Upload, Wallet, Megaphone, Settings } from 'lucide-react'

const notifications = [
  { id: 1, type: 'selected', title: '캠페인 선정 알림', message: '라네즈 립슬리핑마스크 캠페인에 선정되었습니다!', time: '5분 전', read: false },
  { id: 2, type: 'delivery', title: '제품 발송 완료', message: '에스티로더 더블웨어 캠페인 제품이 발송되었습니다.', time: '2시간 전', read: false },
  { id: 3, type: 'reminder', title: '업로드 리마인더', message: '헤라 블랙쿠션 리뷰 업로드 마감이 3일 남았습니다.', time: '1일 전', read: true },
  { id: 4, type: 'approved', title: '콘텐츠 승인', message: '설화수 자음생크림 콘텐츠가 승인되었습니다.', time: '2일 전', read: true },
  { id: 5, type: 'points', title: '포인트 적립', message: '500,000 포인트가 적립되었습니다.', time: '3일 전', read: true },
]

const notificationIcons = {
  selected: { icon: CheckCircle, color: 'text-success bg-success-light' },
  delivery: { icon: Package, color: 'text-warning bg-warning-light' },
  reminder: { icon: Bell, color: 'text-cnec-blue bg-cnec-blue-light' },
  approved: { icon: Upload, color: 'text-success bg-success-light' },
  points: { icon: Wallet, color: 'text-cnec-blue bg-cnec-blue-light' },
  campaign: { icon: Megaphone, color: 'text-gray-600 bg-gray-100' },
}

export function CreatorNotifications() {
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">알림</h1>
          <p className="text-gray-500">캠페인 진행 상황과 중요한 알림을 확인하세요.</p>
        </div>
        <div className="flex gap-2">
          {unreadCount > 0 && (
            <Button variant="outline" size="sm">
              모두 읽음 처리
            </Button>
          )}
          <Button variant="ghost" size="icon">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="flex items-center gap-2">
            알림 목록
            {unreadCount > 0 && (
              <Badge variant="error">{unreadCount}개의 새 알림</Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-gray-100">
            {notifications.map((notification) => {
              const config = notificationIcons[notification.type] || notificationIcons.campaign
              const Icon = config.icon
              return (
                <div
                  key={notification.id}
                  className={`flex items-start gap-4 p-4 hover:bg-gray-50 cursor-pointer ${
                    !notification.read ? 'bg-cnec-blue-light/30' : ''
                  }`}
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${config.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-gray-900">{notification.title}</p>
                      {!notification.read && (
                        <span className="w-2 h-2 rounded-full bg-cnec-blue" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
