import { Link } from 'react-router-dom'
import { useAuthStore } from '@/stores/authStore'
import { useUIStore } from '@/stores/uiStore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { Bell, Search, Menu, Settings, LogOut, User } from 'lucide-react'

export function Header({ portalType = 'admin' }) {
  const { sidebarCollapsed, toggleSidebar, sidebarOpen, setSidebarOpen } = useUIStore()
  const { profile, signOut, isAuthenticated } = useAuthStore()

  const portalTitle =
    portalType === 'admin'
      ? '통합 관리자'
      : portalType === 'brand'
      ? '광고주 포털'
      : '크리에이터 포털'

  return (
    <header
      className={cn(
        'fixed top-0 z-30 flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 transition-all duration-300',
        sidebarCollapsed ? 'left-20' : 'left-72',
        sidebarCollapsed ? 'w-[calc(100%-5rem)]' : 'w-[calc(100%-18rem)]'
      )}
    >
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Search */}
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="search"
            placeholder="검색..."
            className="w-64 pl-9"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-error text-[10px] text-white">
                3
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel className="flex items-center justify-between">
              알림
              <Badge variant="blue">3개의 새 알림</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-80 overflow-y-auto">
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <p className="text-sm font-medium">새 캠페인 지원자</p>
                <p className="text-xs text-gray-500">
                  뷰티 캠페인에 5명의 크리에이터가 지원했습니다.
                </p>
                <span className="text-xs text-gray-400">5분 전</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <p className="text-sm font-medium">출금 요청</p>
                <p className="text-xs text-gray-500">
                  3건의 출금 요청이 대기 중입니다.
                </p>
                <span className="text-xs text-gray-400">1시간 전</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 py-3">
                <p className="text-sm font-medium">신규 가입</p>
                <p className="text-xs text-gray-500">
                  오늘 10명의 크리에이터가 가입했습니다.
                </p>
                <span className="text-xs text-gray-400">3시간 전</span>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-cnec-blue">
              모든 알림 보기
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* User menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2">
              <Avatar className="h-8 w-8">
                <AvatarImage src={profile?.avatar_url} />
                <AvatarFallback name={profile?.name}>
                  {profile?.name?.[0] || 'U'}
                </AvatarFallback>
              </Avatar>
              <div className="hidden flex-col items-start text-left md:flex">
                <span className="text-sm font-medium">{profile?.name || '사용자'}</span>
                <span className="text-xs text-gray-500">{portalTitle}</span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>내 계정</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link
                to={
                  portalType === 'creator'
                    ? '/creator/profile'
                    : portalType === 'brand'
                    ? '/brand/settings'
                    : '/admin/site'
                }
                className="flex items-center"
              >
                <User className="mr-2 h-4 w-4" />
                {portalType === 'creator' ? '프로필' : '계정 설정'}
              </Link>
            </DropdownMenuItem>
            {portalType !== 'admin' && (
              <DropdownMenuItem asChild>
                <Link to={`/${portalType}/settings`} className="flex items-center">
                  <Settings className="mr-2 h-4 w-4" />
                  설정
                </Link>
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut} className="text-error">
              <LogOut className="mr-2 h-4 w-4" />
              로그아웃
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
