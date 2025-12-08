import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Layouts
import { AdminLayout, AdvertiserLayout, CreatorLayout } from './components/layout';

// Auth Pages
import { LoginPage, RegisterPage } from './pages/auth';

// Admin Pages
import {
  DashboardPage,
  StatisticsPage,
  ContractsPage,
  RecommendedCreatorsPage,
  AffiliatedCreatorsPage,
  YoutubeCreatorsPage,
  AllCreatorsPage,
  SalesPage,
  CostsPage,
  WithdrawalsPage,
} from './pages/admin';

// Advertiser Pages
import { AdvertiserDashboard, CampaignListPage, CampaignCreatePage, CreatorStatusPage } from './pages/advertiser';

// Creator Pages
import { CreatorDashboard, CreatorProfilePage, CampaignApplyPage } from './pages/creator';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">로딩중...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

// Public Route Component (redirect if already logged in)
const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">로딩중...</p>
        </div>
      </div>
    );
  }

  if (user) {
    return <Navigate to="/admin" replace />;
  }

  return children;
};

// Placeholder component for routes that need to be implemented
const PlaceholderPage = ({ title }) => (
  <div className="flex items-center justify-center h-64">
    <div className="text-center">
      <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
      <p className="mt-2 text-gray-500">이 페이지는 준비 중입니다.</p>
    </div>
  </div>
);

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Navigate to="/admin" replace />} />

          <Route
            path="/auth/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/auth/register"
            element={
              <PublicRoute>
                <RegisterPage />
              </PublicRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<DashboardPage />} />

            {/* Creator Management */}
            <Route path="creators/recommended" element={<RecommendedCreatorsPage />} />
            <Route path="creators/affiliated" element={<AffiliatedCreatorsPage />} />
            <Route path="creators/youtube" element={<YoutubeCreatorsPage />} />
            <Route path="creators/all" element={<AllCreatorsPage />} />

            {/* Finance */}
            <Route path="finance/sales" element={<SalesPage />} />
            <Route path="finance/costs" element={<CostsPage />} />
            <Route path="finance/withdrawals" element={<WithdrawalsPage />} />

            {/* Contracts */}
            <Route path="contracts" element={<ContractsPage />} />

            {/* Statistics */}
            <Route path="statistics" element={<StatisticsPage />} />

            {/* Site Management */}
            <Route path="site/portfolio" element={<PlaceholderPage title="포트폴리오 관리" />} />
            <Route path="site/posts" element={<PlaceholderPage title="게시판 관리" />} />
            <Route path="site/admins" element={<PlaceholderPage title="관리자 관리" />} />
            <Route path="site/seo" element={<PlaceholderPage title="SEO 설정" />} />
            <Route path="site/email-templates" element={<PlaceholderPage title="이메일 템플릿" />} />
            <Route path="site/kakao-templates" element={<PlaceholderPage title="카카오 알림톡 템플릿" />} />
            <Route path="site/contract-templates" element={<PlaceholderPage title="전자계약서 관리" />} />

            {/* Security */}
            <Route path="security/members" element={<PlaceholderPage title="회원 설정" />} />
            <Route path="security/excel" element={<PlaceholderPage title="엑셀 양식 관리" />} />
            <Route path="security/ip-block" element={<PlaceholderPage title="IP 차단 관리" />} />
            <Route path="security/password" element={<PlaceholderPage title="비밀번호 설정" />} />
          </Route>

          {/* Advertiser Routes */}
          <Route
            path="/advertiser"
            element={
              <ProtectedRoute>
                <AdvertiserLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdvertiserDashboard />} />
            <Route path="campaigns" element={<CampaignListPage />} />
            <Route path="campaigns/create" element={<CampaignCreatePage />} />
            <Route path="campaigns/:id" element={<PlaceholderPage title="캠페인 상세" />} />
            <Route path="creators" element={<CreatorStatusPage />} />
            <Route path="settings" element={<PlaceholderPage title="설정" />} />
          </Route>

          {/* Creator Routes */}
          <Route
            path="/creator"
            element={
              <ProtectedRoute>
                <CreatorLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<CreatorDashboard />} />
            <Route path="profile" element={<CreatorProfilePage />} />
            <Route path="campaigns" element={<CampaignApplyPage />} />
            <Route path="campaigns/:id" element={<PlaceholderPage title="캠페인 상세" />} />
            <Route path="earnings" element={<PlaceholderPage title="수익 관리" />} />
            <Route path="settings" element={<PlaceholderPage title="설정" />} />
          </Route>

          {/* 404 */}
          <Route path="*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
