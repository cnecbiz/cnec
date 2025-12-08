import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Users,
  Star,
  Building2,
  Youtube,
  UserCircle,
  DollarSign,
  Receipt,
  Wallet,
  FileText,
  Settings,
  BarChart3,
  Shield,
  Globe,
  ChevronDown,
  ChevronRight,
  LayoutDashboard,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const menuItems = [
  {
    id: 'dashboard',
    label: '대시보드',
    icon: LayoutDashboard,
    path: '/admin',
  },
  {
    id: 'creators',
    label: '크리에이터 관리',
    icon: Users,
    subItems: [
      { id: 'recommended', label: '추천 크리에이터', path: '/admin/creators/recommended', icon: Star },
      { id: 'affiliated', label: '소속 크리에이터', path: '/admin/creators/affiliated', icon: Building2 },
      { id: 'youtube', label: '유튜브 지원 크리에이터', path: '/admin/creators/youtube', icon: Youtube },
      { id: 'all', label: '전체 크리에이터', path: '/admin/creators/all', icon: UserCircle },
    ],
  },
  {
    id: 'finance',
    label: '재무 관리',
    icon: DollarSign,
    subItems: [
      { id: 'sales', label: '매출 관리', path: '/admin/finance/sales', icon: DollarSign },
      { id: 'costs', label: '비용 관리', path: '/admin/finance/costs', icon: Receipt },
      { id: 'withdrawals', label: '포인트 출금 현황', path: '/admin/finance/withdrawals', icon: Wallet },
    ],
  },
  {
    id: 'contracts',
    label: '계약서 관리',
    icon: FileText,
    path: '/admin/contracts',
  },
  {
    id: 'site',
    label: '사이트 관리',
    icon: Globe,
    subItems: [
      { id: 'portfolio', label: '포트폴리오', path: '/admin/site/portfolio' },
      { id: 'posts', label: '게시판 관리', path: '/admin/site/posts' },
      { id: 'admins', label: '관리자 관리', path: '/admin/site/admins' },
      { id: 'seo', label: 'SEO 설정', path: '/admin/site/seo' },
      { id: 'email-templates', label: '이메일 템플릿', path: '/admin/site/email-templates' },
      { id: 'kakao-templates', label: '카카오 알림톡 템플릿', path: '/admin/site/kakao-templates' },
      { id: 'contract-templates', label: '전자계약서 관리', path: '/admin/site/contract-templates' },
    ],
  },
  {
    id: 'security',
    label: '보안 설정',
    icon: Shield,
    subItems: [
      { id: 'members', label: '회원 설정', path: '/admin/security/members' },
      { id: 'excel', label: '엑셀 양식 관리', path: '/admin/security/excel' },
      { id: 'ip-block', label: 'IP 차단 관리', path: '/admin/security/ip-block' },
      { id: 'password', label: '비밀번호 설정', path: '/admin/security/password' },
    ],
  },
  {
    id: 'statistics',
    label: '통계',
    icon: BarChart3,
    path: '/admin/statistics',
  },
];

export const AdminSidebar = () => {
  const [expandedMenus, setExpandedMenus] = useState(['creators', 'finance']);
  const location = useLocation();
  const { signOut } = useAuth();

  const toggleMenu = (menuId) => {
    setExpandedMenus(prev =>
      prev.includes(menuId)
        ? prev.filter(id => id !== menuId)
        : [...prev, menuId]
    );
  };

  const isActiveParent = (subItems) => {
    return subItems?.some(item => location.pathname === item.path);
  };

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <aside className="w-64 flex-shrink-0 bg-gray-900 min-h-screen flex flex-col fixed left-0 top-0 z-40">
      {/* Logo */}
      <div className="px-6 py-4 border-b border-gray-800">
        <h1 className="text-xl font-bold text-white">CNEC Admin</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {menuItems.map((item) => (
            <li key={item.id}>
              {item.subItems ? (
                <div>
                  <button
                    onClick={() => toggleMenu(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActiveParent(item.subItems)
                        ? 'bg-gray-800 text-white'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center">
                      <item.icon className="h-5 w-5 mr-3" />
                      {item.label}
                    </span>
                    {expandedMenus.includes(item.id) ? (
                      <ChevronDown className="h-4 w-4" />
                    ) : (
                      <ChevronRight className="h-4 w-4" />
                    )}
                  </button>
                  {expandedMenus.includes(item.id) && (
                    <ul className="mt-1 ml-4 space-y-1">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.id}>
                          <NavLink
                            to={subItem.path}
                            className={({ isActive }) =>
                              `flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
                                isActive
                                  ? 'bg-primary-600 text-white'
                                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                              }`
                            }
                          >
                            {subItem.icon && <subItem.icon className="h-4 w-4 mr-2" />}
                            {subItem.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ) : (
                <NavLink
                  to={item.path}
                  end={item.path === '/admin'}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-primary-600 text-white'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`
                  }
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.label}
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* Logout */}
      <div className="px-3 py-4 border-t border-gray-800">
        <button
          onClick={handleSignOut}
          className="w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <LogOut className="h-5 w-5 mr-3" />
          로그아웃
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
