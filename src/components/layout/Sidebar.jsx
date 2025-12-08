import { NavLink, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/stores/uiStore'
import { useAuthStore } from '@/stores/authStore'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Megaphone,
  Wallet,
  FileText,
  Building2,
  Settings,
  BarChart3,
  Shield,
  Search,
  Heart,
  Bell,
  CreditCard,
  UserCircle,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react'

// 어드민용 네비게이션
const adminNavItems = [
  { name: '대시보드', href: '/admin', icon: LayoutDashboard },
  { name: '크리에이터 관리', href: '/admin/creators', icon: Users },
  { name: '캠페인 관리', href: '/admin/campaigns', icon: Megaphone },
  { name: '매출 관리', href: '/admin/revenue', icon: Wallet },
  { name: '포인트/출금', href: '/admin/points', icon: CreditCard },
  { name: '계약서 관리', href: '/admin/contracts', icon: FileText },
  { name: '기업 관리', href: '/admin/companies', icon: Building2 },
  { name: '사이트 관리', href: '/admin/site', icon: Settings },
  { name: '보안 설정', href: '/admin/security', icon: Shield },
  { name: '통계', href: '/admin/statistics', icon: BarChart3 },
]

// 광고주용 네비게이션
const brandNavItems = [
  { name: '대시보드', href: '/brand', icon: LayoutDashboard },
  { name: '캠페인 등록', href: '/brand/campaigns/new', icon: Megaphone },
  { name: '캠페인 관리', href: '/brand/campaigns', icon: Briefcase },
  { name: '크리에이터 현황', href: '/brand/creators', icon: Users },
  { name: '찜한 크리에이터', href: '/brand/favorites', icon: Heart },
  { name: '결제 내역', href: '/brand/payments', icon: CreditCard },
  { name: '계정 설정', href: '/brand/settings', icon: Settings },
]

// 크리에이터용 네비게이션
const creatorNavItems = [
  { name: '대시보드', href: '/creator', icon: LayoutDashboard },
  { name: '캠페인 탐색', href: '/creator/campaigns', icon: Search },
  { name: '내 캠페인', href: '/creator/my-campaigns', icon: Briefcase },
  { name: '포인트/정산', href: '/creator/points', icon: Wallet },
  { name: '알림', href: '/creator/notifications', icon: Bell },
  { name: '프로필 설정', href: '/creator/profile', icon: UserCircle },
]

function NavItem({ item, collapsed }) {
  const Icon = item.icon

  if (collapsed) {
    return (
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild>
            <NavLink
              to={item.href}
              end={item.href.split('/').length <= 2}
              className={({ isActive }) =>
                cn(
                  'flex h-10 w-10 items-center justify-center rounded-lg transition-colors',
                  isActive
                    ? 'bg-cnec-blue text-white'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                )
              }
            >
              <Icon className="h-5 w-5" />
            </NavLink>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{item.name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }

  return (
    <NavLink
      to={item.href}
      end={item.href.split('/').length <= 2}
      className={({ isActive }) =>
        cn(
          'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
          isActive
            ? 'bg-cnec-blue text-white'
            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        )
      }
    >
      <Icon className="h-5 w-5" />
      <span>{item.name}</span>
    </NavLink>
  )
}

export function Sidebar({ portalType = 'admin' }) {
  const { sidebarCollapsed, toggleSidebarCollapse } = useUIStore()
  const { signOut, profile } = useAuthStore()
  const location = useLocation()

  const navItems =
    portalType === 'admin'
      ? adminNavItems
      : portalType === 'brand'
      ? brandNavItems
      : creatorNavItems

  return (
    <aside
      className={cn(
        'fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-gray-200 bg-white transition-all duration-300',
        sidebarCollapsed ? 'w-20' : 'w-72'
      )}
    >
      {/* Logo */}
      <div
        className={cn(
          'flex h-16 items-center border-b border-gray-200 px-4',
          sidebarCollapsed ? 'justify-center' : 'justify-between'
        )}
      >
        {!sidebarCollapsed && (
          <NavLink to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cnec-blue text-white font-bold">
              C
            </div>
            <span className="text-xl font-bold text-gray-900">CNEC</span>
          </NavLink>
        )}
        {sidebarCollapsed && (
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cnec-blue text-white font-bold">
            C
          </div>
        )}
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <NavItem key={item.href} item={item} collapsed={sidebarCollapsed} />
          ))}
        </nav>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t border-gray-200 p-3">
        {!sidebarCollapsed && (
          <div className="mb-3 flex items-center gap-3 px-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-sm font-medium">
              {profile?.name?.[0] || 'U'}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium">{profile?.name || '사용자'}</p>
              <p className="truncate text-xs text-gray-500">
                {portalType === 'admin'
                  ? '관리자'
                  : portalType === 'brand'
                  ? '광고주'
                  : '크리에이터'}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center gap-2">
          {!sidebarCollapsed && (
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 justify-start text-gray-600"
              onClick={signOut}
            >
              <LogOut className="mr-2 h-4 w-4" />
              로그아웃
            </Button>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={toggleSidebarCollapse}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </aside>
  )
}
