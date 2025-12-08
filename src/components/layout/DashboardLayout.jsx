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
          'min-h-screen pt-20 transition-all duration-300',
          sidebarCollapsed ? 'ml-20' : 'ml-72'
        )}
      >
        <div className="mx-auto max-w-7xl px-6 py-6">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
