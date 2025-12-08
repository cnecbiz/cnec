import { useState } from 'react'
import './AdminSite.css'

function AdminSite() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeMenu, setActiveMenu] = useState('dashboard')
  const [darkMode, setDarkMode] = useState(true)

  const menuItems = [
    { id: 'dashboard', icon: '📊', label: '대시보드' },
    { id: 'users', icon: '👥', label: '사용자 관리' },
    { id: 'products', icon: '📦', label: '상품 관리' },
    { id: 'orders', icon: '🛒', label: '주문 관리' },
    { id: 'analytics', icon: '📈', label: '분석' },
    { id: 'settings', icon: '⚙️', label: '설정' },
  ]

  const stats = [
    { title: '총 매출', value: '₩128,430,000', change: '+12.5%', positive: true, icon: '💰' },
    { title: '신규 주문', value: '1,284', change: '+8.2%', positive: true, icon: '📦' },
    { title: '활성 사용자', value: '12,847', change: '+23.1%', positive: true, icon: '👥' },
    { title: '반품률', value: '2.4%', change: '-0.8%', positive: true, icon: '↩️' },
  ]

  const recentOrders = [
    { id: '#ORD-2024001', customer: '김민수', product: 'Premium Package A', amount: '₩1,250,000', status: '완료', date: '2024-01-15' },
    { id: '#ORD-2024002', customer: '이서연', product: 'Standard Package B', amount: '₩580,000', status: '배송중', date: '2024-01-15' },
    { id: '#ORD-2024003', customer: '박지훈', product: 'Enterprise Suite', amount: '₩3,200,000', status: '처리중', date: '2024-01-14' },
    { id: '#ORD-2024004', customer: '최유나', product: 'Basic Plan', amount: '₩120,000', status: '완료', date: '2024-01-14' },
    { id: '#ORD-2024005', customer: '정현우', product: 'Premium Package A', amount: '₩1,250,000', status: '대기중', date: '2024-01-13' },
  ]

  const topProducts = [
    { name: 'Premium Package A', sales: 847, revenue: '₩1,058,750,000', growth: '+15%' },
    { name: 'Enterprise Suite', sales: 234, revenue: '₩748,800,000', growth: '+22%' },
    { name: 'Standard Package B', sales: 1203, revenue: '₩697,740,000', growth: '+8%' },
    { name: 'Basic Plan', sales: 3421, revenue: '₩410,520,000', growth: '+5%' },
  ]

  const getStatusClass = (status) => {
    switch (status) {
      case '완료': return 'status-completed'
      case '배송중': return 'status-shipping'
      case '처리중': return 'status-processing'
      case '대기중': return 'status-pending'
      default: return ''
    }
  }

  return (
    <div className={`admin-container ${darkMode ? 'dark' : 'light'}`}>
      {/* Sidebar */}
      <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">
            <span className="logo-icon">◆</span>
            {!sidebarCollapsed && <span className="logo-text">CNEC Admin</span>}
          </div>
          <button
            className="collapse-btn"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? '→' : '←'}
          </button>
        </div>

        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <button
              key={item.id}
              className={`nav-item ${activeMenu === item.id ? 'active' : ''}`}
              onClick={() => setActiveMenu(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              {!sidebarCollapsed && <span className="nav-label">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
            <span className="nav-icon">{darkMode ? '☀️' : '🌙'}</span>
            {!sidebarCollapsed && <span className="nav-label">{darkMode ? '라이트 모드' : '다크 모드'}</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
        <header className="header">
          <div className="header-left">
            <h1 className="page-title">대시보드</h1>
            <p className="page-subtitle">비즈니스 현황을 한눈에 확인하세요</p>
          </div>
          <div className="header-right">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input type="text" placeholder="검색..." className="search-input" />
            </div>
            <button className="header-btn notification-btn">
              <span>🔔</span>
              <span className="notification-badge">3</span>
            </button>
            <div className="user-profile">
              <div className="avatar">관</div>
              <div className="user-info">
                <span className="user-name">관리자</span>
                <span className="user-role">Super Admin</span>
              </div>
            </div>
          </div>
        </header>

        {/* Stats Cards */}
        <section className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <div className="stat-header">
                <span className="stat-icon">{stat.icon}</span>
                <span className={`stat-change ${stat.positive ? 'positive' : 'negative'}`}>
                  {stat.change}
                </span>
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-title">{stat.title}</div>
              <div className="stat-bar">
                <div className="stat-bar-fill" style={{ width: `${60 + index * 10}%` }}></div>
              </div>
            </div>
          ))}
        </section>

        {/* Content Grid */}
        <section className="content-grid">
          {/* Recent Orders */}
          <div className="card orders-card">
            <div className="card-header">
              <h2 className="card-title">최근 주문</h2>
              <button className="view-all-btn">전체 보기 →</button>
            </div>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>주문번호</th>
                    <th>고객</th>
                    <th>상품</th>
                    <th>금액</th>
                    <th>상태</th>
                    <th>날짜</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order, index) => (
                    <tr key={index}>
                      <td className="order-id">{order.id}</td>
                      <td>{order.customer}</td>
                      <td>{order.product}</td>
                      <td className="amount">{order.amount}</td>
                      <td>
                        <span className={`status-badge ${getStatusClass(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="date">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Top Products */}
          <div className="card products-card">
            <div className="card-header">
              <h2 className="card-title">인기 상품</h2>
              <button className="view-all-btn">전체 보기 →</button>
            </div>
            <div className="products-list">
              {topProducts.map((product, index) => (
                <div key={index} className="product-item">
                  <div className="product-rank">#{index + 1}</div>
                  <div className="product-info">
                    <div className="product-name">{product.name}</div>
                    <div className="product-stats">
                      <span className="product-sales">{product.sales} 판매</span>
                      <span className="product-growth">{product.growth}</span>
                    </div>
                  </div>
                  <div className="product-revenue">{product.revenue}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="quick-actions">
          <h2 className="section-title">빠른 작업</h2>
          <div className="actions-grid">
            <button className="action-btn">
              <span className="action-icon">➕</span>
              <span className="action-label">상품 추가</span>
            </button>
            <button className="action-btn">
              <span className="action-icon">📝</span>
              <span className="action-label">주문 생성</span>
            </button>
            <button className="action-btn">
              <span className="action-icon">👤</span>
              <span className="action-label">사용자 추가</span>
            </button>
            <button className="action-btn">
              <span className="action-icon">📊</span>
              <span className="action-label">리포트 생성</span>
            </button>
            <button className="action-btn">
              <span className="action-icon">📤</span>
              <span className="action-label">데이터 내보내기</span>
            </button>
            <button className="action-btn">
              <span className="action-icon">🔧</span>
              <span className="action-label">시스템 설정</span>
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}

export default AdminSite
