import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'
import { useUIStore } from '@/stores/uiStore'
import { cn } from '@/lib/utils'

export function DashboardLayout({ portalType = 'admin' }) {
  const { sidebarCollapsed } = useUIStore()

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar portalType={portalType} />
      <Header portalType={portalType} />

      <main
        className={cn(
          'pt-16 transition-all duration-300',
          sidebarCollapsed ? 'ml-16' : 'ml-64'
        )}
      >
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
