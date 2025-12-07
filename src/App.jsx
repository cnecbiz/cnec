import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAuthStore } from '@/stores/authStore'
import { Toaster } from '@/components/ui/toast'
import { TooltipProvider } from '@/components/ui/tooltip'

// Layouts
import { AuthLayout } from '@/components/layout/AuthLayout'
import { DashboardLayout } from '@/components/layout/DashboardLayout'

// Auth Pages
import { LoginPage } from '@/pages/auth/LoginPage'
import { RegisterPage } from '@/pages/auth/RegisterPage'
import { RegisterCreatorPage } from '@/pages/auth/RegisterCreatorPage'
import { RegisterBrandPage } from '@/pages/auth/RegisterBrandPage'
import { ForgotPasswordPage } from '@/pages/auth/ForgotPasswordPage'
import { AuthCallbackPage } from '@/pages/auth/AuthCallbackPage'

// Landing Pages
import { LandingPage } from '@/pages/landing/LandingPage'
import { CreatorLandingPage } from '@/pages/landing/CreatorLandingPage'

// Admin Pages
import { AdminDashboard } from '@/pages/admin/AdminDashboard'
import { AdminCreators } from '@/pages/admin/AdminCreators'
import { AdminCampaigns } from '@/pages/admin/AdminCampaigns'
import { AdminRevenue } from '@/pages/admin/AdminRevenue'
import { AdminPoints } from '@/pages/admin/AdminPoints'
import { AdminContracts } from '@/pages/admin/AdminContracts'
import { AdminCompanies } from '@/pages/admin/AdminCompanies'
import { AdminSite } from '@/pages/admin/AdminSite'
import { AdminSecurity } from '@/pages/admin/AdminSecurity'
import { AdminStatistics } from '@/pages/admin/AdminStatistics'

// Brand Pages
import { BrandDashboard } from '@/pages/brand/BrandDashboard'
import { BrandCampaigns } from '@/pages/brand/BrandCampaigns'
import { BrandCampaignNew } from '@/pages/brand/BrandCampaignNew'
import { BrandCreators } from '@/pages/brand/BrandCreators'
import { BrandFavorites } from '@/pages/brand/BrandFavorites'
import { BrandPayments } from '@/pages/brand/BrandPayments'
import { BrandSettings } from '@/pages/brand/BrandSettings'

// Creator Pages
import { CreatorDashboard } from '@/pages/creator/CreatorDashboard'
import { CreatorCampaigns } from '@/pages/creator/CreatorCampaigns'
import { CreatorMyCampaigns } from '@/pages/creator/CreatorMyCampaigns'
import { CreatorPoints } from '@/pages/creator/CreatorPoints'
import { CreatorNotifications } from '@/pages/creator/CreatorNotifications'
import { CreatorProfile } from '@/pages/creator/CreatorProfile'

// Query Client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

// Protected Route
function ProtectedRoute({ children, allowedRoles = [] }) {
  const { isAuthenticated, isLoading, profile } = useAuthStore()

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-cnec-blue border-t-transparent" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(profile?.user_type)) {
    return <Navigate to="/" replace />
  }

  return children
}

// Public Route (redirect if authenticated)
function PublicRoute({ children }) {
  const { isAuthenticated, isLoading, profile } = useAuthStore()

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-cnec-blue border-t-transparent" />
      </div>
    )
  }

  if (isAuthenticated) {
    // Redirect based on user type
    const redirectPath =
      profile?.user_type === 'admin'
        ? '/admin'
        : profile?.user_type === 'brand'
        ? '/brand'
        : '/creator'
    return <Navigate to={redirectPath} replace />
  }

  return children
}

function App() {
  const { initializeAuth } = useAuthStore()

  useEffect(() => {
    initializeAuth()
  }, [initializeAuth])

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router>
          <Routes>
            {/* Landing - 광고주용 메인 페이지 */}
            <Route path="/" element={<LandingPage />} />

            {/* Creator Landing - 크리에이터용 비공개 페이지 */}
            <Route path="/join" element={<CreatorLandingPage />} />

            {/* Auth Routes */}
            <Route
              path="/auth"
              element={
                <PublicRoute>
                  <AuthLayout />
                </PublicRoute>
              }
            >
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
              <Route path="register/creator" element={<RegisterCreatorPage />} />
              <Route path="register/brand" element={<RegisterBrandPage />} />
              <Route path="forgot-password" element={<ForgotPasswordPage />} />
            </Route>
            <Route path="/auth/callback" element={<AuthCallbackPage />} />

            {/* Admin Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <DashboardLayout portalType="admin" />
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminDashboard />} />
              <Route path="creators" element={<AdminCreators />} />
              <Route path="campaigns" element={<AdminCampaigns />} />
              <Route path="revenue" element={<AdminRevenue />} />
              <Route path="points" element={<AdminPoints />} />
              <Route path="contracts" element={<AdminContracts />} />
              <Route path="companies" element={<AdminCompanies />} />
              <Route path="site" element={<AdminSite />} />
              <Route path="security" element={<AdminSecurity />} />
              <Route path="statistics" element={<AdminStatistics />} />
            </Route>

            {/* Brand Routes */}
            <Route
              path="/brand"
              element={
                <ProtectedRoute allowedRoles={['brand']}>
                  <DashboardLayout portalType="brand" />
                </ProtectedRoute>
              }
            >
              <Route index element={<BrandDashboard />} />
              <Route path="campaigns" element={<BrandCampaigns />} />
              <Route path="campaigns/new" element={<BrandCampaignNew />} />
              <Route path="creators" element={<BrandCreators />} />
              <Route path="favorites" element={<BrandFavorites />} />
              <Route path="payments" element={<BrandPayments />} />
              <Route path="settings" element={<BrandSettings />} />
            </Route>

            {/* Creator Routes */}
            <Route
              path="/creator"
              element={
                <ProtectedRoute allowedRoles={['creator']}>
                  <DashboardLayout portalType="creator" />
                </ProtectedRoute>
              }
            >
              <Route index element={<CreatorDashboard />} />
              <Route path="campaigns" element={<CreatorCampaigns />} />
              <Route path="my-campaigns" element={<CreatorMyCampaigns />} />
              <Route path="points" element={<CreatorPoints />} />
              <Route path="notifications" element={<CreatorNotifications />} />
              <Route path="profile" element={<CreatorProfile />} />
            </Route>

            {/* 404 */}
            <Route
              path="*"
              element={
                <div className="flex h-screen flex-col items-center justify-center">
                  <h1 className="text-4xl font-bold text-gray-900">404</h1>
                  <p className="mt-2 text-gray-500">페이지를 찾을 수 없습니다.</p>
                  <a
                    href="/"
                    className="mt-4 text-cnec-blue hover:underline"
                  >
                    홈으로 돌아가기
                  </a>
                </div>
              }
            />
          </Routes>
        </Router>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
