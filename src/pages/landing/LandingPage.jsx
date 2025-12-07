import { Link } from 'react-router-dom'

export function LandingPage() {
  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#fff' }}>
      {/* Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '64px',
        backgroundColor: 'rgba(255,255,255,0.9)',
        backdropFilter: 'blur(8px)',
        borderBottom: '1px solid #eee',
        zIndex: 50,
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '0 24px',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
            <div style={{
              width: '32px',
              height: '32px',
              backgroundColor: '#0066FF',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontWeight: 'bold',
            }}>
              C
            </div>
            <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#212121' }}>CNEC</span>
          </Link>

          <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <a href="#features" style={{ fontSize: '14px', color: '#757575', textDecoration: 'none' }}>서비스 소개</a>
            <a href="#campaigns" style={{ fontSize: '14px', color: '#757575', textDecoration: 'none' }}>캠페인 유형</a>
            <a href="#creators" style={{ fontSize: '14px', color: '#757575', textDecoration: 'none' }}>크리에이터</a>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link to="/login" style={{
              padding: '8px 16px',
              fontSize: '14px',
              color: '#212121',
              textDecoration: 'none',
            }}>
              로그인
            </Link>
            <Link to="/register" style={{
              padding: '8px 20px',
              fontSize: '14px',
              color: '#fff',
              backgroundColor: '#0066FF',
              borderRadius: '8px',
              textDecoration: 'none',
            }}>
              시작하기
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        paddingTop: '160px',
        paddingBottom: '80px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <span style={{
            display: 'inline-block',
            padding: '6px 16px',
            backgroundColor: '#EBF5FF',
            color: '#0066FF',
            fontSize: '14px',
            fontWeight: '500',
            borderRadius: '9999px',
            marginBottom: '24px',
          }}>
            뷰티 인플루언서 마케팅 플랫폼
          </span>

          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#212121',
            marginBottom: '24px',
            lineHeight: '1.2',
          }}>
            뷰티 크리에이터와<br />
            브랜드를 <span style={{ color: '#0066FF' }}>연결</span>합니다
          </h1>

          <p style={{
            fontSize: '18px',
            color: '#757575',
            maxWidth: '640px',
            margin: '0 auto 32px',
            lineHeight: '1.6',
          }}>
            CNEC 마케팅 에이전시의 10년 이상 노하우와 400개 이상의 브랜드 협업 경험을 바탕으로
            고품질 숏폼 콘텐츠 제작을 지원합니다.
          </p>

          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/register" style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '14px 28px',
              backgroundColor: '#0066FF',
              color: '#fff',
              fontSize: '16px',
              fontWeight: '500',
              borderRadius: '8px',
              textDecoration: 'none',
            }}>
              광고주로 시작하기 →
            </Link>
            <Link to="/register" style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '14px 28px',
              backgroundColor: '#fff',
              color: '#212121',
              fontSize: '16px',
              fontWeight: '500',
              borderRadius: '8px',
              border: '1px solid #E0E0E0',
              textDecoration: 'none',
            }}>
              크리에이터로 시작하기
            </Link>
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '32px',
            marginTop: '80px',
            maxWidth: '800px',
            margin: '80px auto 0',
          }}>
            {[
              { value: '400+', label: '협업 브랜드' },
              { value: '1,000+', label: '콘텐츠 제작' },
              { value: '5,000+', label: '등록 크리에이터' },
              { value: '10년+', label: '마케팅 경력' },
            ].map((stat) => (
              <div key={stat.label} style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#0066FF' }}>{stat.value}</p>
                <p style={{ fontSize: '14px', color: '#9E9E9E', marginTop: '4px' }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" style={{ padding: '80px 24px', backgroundColor: '#FAFAFA' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{
              display: 'inline-block',
              padding: '6px 16px',
              backgroundColor: '#EBF5FF',
              color: '#0066FF',
              fontSize: '14px',
              fontWeight: '500',
              borderRadius: '9999px',
              marginBottom: '16px',
            }}>
              Features
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#212121', marginBottom: '16px' }}>
              왜 CNEC인가요?
            </h2>
            <p style={{ fontSize: '16px', color: '#757575' }}>
              브랜드와 크리에이터 모두를 위한 최적의 마케팅 솔루션을 제공합니다.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
          }}>
            {[
              { icon: '👥', title: '검증된 크리에이터', desc: '팔로워 수, 참여율, 콘텐츠 품질 등 다양한 기준으로 검증된 뷰티 크리에이터를 만나보세요.' },
              { icon: '📣', title: '효율적인 캠페인 관리', desc: '캠페인 등록부터 크리에이터 선정, 콘텐츠 검수까지 한 곳에서 관리할 수 있습니다.' },
              { icon: '✨', title: 'AI 기획안 생성', desc: '제품 정보만 입력하면 AI가 자동으로 콘텐츠 기획안을 생성해 드립니다.' },
              { icon: '📈', title: '성과 분석', desc: '조회수, 참여율, ROI 등 캠페인 성과를 실시간으로 분석하고 리포트를 제공합니다.' },
            ].map((feature) => (
              <div key={feature.title} style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                padding: '24px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  backgroundColor: '#EBF5FF',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  marginBottom: '16px',
                }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#212121', marginBottom: '8px' }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#757575', lineHeight: '1.6' }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campaign Types */}
      <section id="campaigns" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '64px' }}>
            <span style={{
              display: 'inline-block',
              padding: '6px 16px',
              backgroundColor: '#EBF5FF',
              color: '#0066FF',
              fontSize: '14px',
              fontWeight: '500',
              borderRadius: '9999px',
              marginBottom: '16px',
            }}>
              Campaign Types
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#212121', marginBottom: '16px' }}>
              캠페인 유형
            </h2>
            <p style={{ fontSize: '16px', color: '#757575' }}>
              브랜드의 목적에 맞는 다양한 캠페인 유형을 선택하세요.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px',
          }}>
            {[
              { title: '기획 숏폼', desc: '컨셉 기획영상, 기획안 제공', price: '30~60만원', features: ['스토리보드 제공', '수정 1회 포함', '30초 이내 영상'] },
              { title: '4주 챌린지', desc: '1주 1개 × 4주 콘텐츠', price: '60~120만원', features: ['비포&애프터 콘텐츠', '4개 영상 제작', '장기 노출 효과'], popular: true },
              { title: '프리미엄', desc: '메가 인플루언서 지정 섭외', price: '협의', features: ['50만+ 팔로워', '맞춤형 기획', '전담 매니저 배정'] },
            ].map((campaign) => (
              <div key={campaign.title} style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                padding: '32px',
                border: campaign.popular ? '2px solid #0066FF' : '1px solid #E0E0E0',
                position: 'relative',
              }}>
                {campaign.popular && (
                  <span style={{
                    position: 'absolute',
                    top: '-12px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '4px 12px',
                    backgroundColor: '#0066FF',
                    color: '#fff',
                    fontSize: '12px',
                    fontWeight: '500',
                    borderRadius: '9999px',
                  }}>
                    인기
                  </span>
                )}
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#212121', marginBottom: '8px' }}>
                  {campaign.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#9E9E9E', marginBottom: '16px' }}>
                  {campaign.desc}
                </p>
                <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#0066FF', marginBottom: '24px' }}>
                  {campaign.price}
                </p>
                <ul style={{ listStyle: 'none', marginBottom: '24px', padding: 0 }}>
                  {campaign.features.map((f) => (
                    <li key={f} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px',
                      color: '#757575',
                      marginBottom: '12px',
                    }}>
                      <span style={{ color: '#00C853' }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/register" style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '12px',
                  backgroundColor: campaign.popular ? '#0066FF' : '#fff',
                  color: campaign.popular ? '#fff' : '#212121',
                  border: campaign.popular ? 'none' : '1px solid #E0E0E0',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '500',
                }}>
                  시작하기
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Creator CTA */}
      <section id="creators" style={{ padding: '80px 24px', backgroundColor: '#0066FF' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '48px',
            alignItems: 'center',
          }}>
            <div style={{ color: '#fff' }}>
              <span style={{
                display: 'inline-block',
                padding: '6px 16px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                fontSize: '14px',
                fontWeight: '500',
                borderRadius: '9999px',
                marginBottom: '16px',
              }}>
                For Creators
              </span>
              <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '16px', lineHeight: '1.3' }}>
                뷰티 크리에이터라면<br />지금 바로 합류하세요
              </h2>
              <p style={{ fontSize: '16px', opacity: 0.8, marginBottom: '32px', lineHeight: '1.6' }}>
                브랜드와의 협업 기회, 원고비 수익, 그리고 세일즈 크리에이터로 성장할 수 있는 다양한 혜택이 기다리고 있습니다.
              </p>
              <ul style={{ listStyle: 'none', marginBottom: '32px', padding: 0 }}>
                {['검증된 브랜드와의 안전한 협업', '투명한 원고비 지급 시스템', '공동구매 매칭 수익 기회', '브랜드 창업 지원 프로그램'].map((item) => (
                  <li key={item} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '16px',
                  }}>
                    <span>✓</span> {item}
                  </li>
                ))}
              </ul>
              <Link to="/register" style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '14px 28px',
                backgroundColor: '#fff',
                color: '#0066FF',
                fontSize: '16px',
                fontWeight: '500',
                borderRadius: '8px',
                textDecoration: 'none',
              }}>
                크리에이터 등록하기 →
              </Link>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
            }}>
              {[
                { icon: '📸', value: '2,000+', label: '인스타그램 크리에이터' },
                { icon: '🎵', value: '1,500+', label: '틱톡 크리에이터' },
                { icon: '📺', value: '500+', label: '유튜브 크리에이터' },
                { icon: '⭐', value: '4.8', label: '평균 평점' },
              ].map((stat, i) => (
                <div key={stat.label} style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '12px',
                  padding: '20px',
                  marginTop: i % 2 === 1 ? '32px' : 0,
                }}>
                  <div style={{ fontSize: '24px', marginBottom: '8px' }}>{stat.icon}</div>
                  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#fff', margin: 0 }}>{stat.value}</p>
                  <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.7)', margin: 0 }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '80px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#212121', marginBottom: '16px' }}>
          지금 바로 시작하세요
        </h2>
        <p style={{ fontSize: '16px', color: '#757575', marginBottom: '32px' }}>
          CNEC과 함께 효과적인 뷰티 마케팅을 경험해 보세요.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
          <Link to="/register" style={{
            padding: '14px 28px',
            backgroundColor: '#0066FF',
            color: '#fff',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '500',
          }}>
            무료로 시작하기
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#212121', color: '#fff', padding: '48px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '32px',
            marginBottom: '32px',
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  backgroundColor: '#fff',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#0066FF',
                  fontWeight: 'bold',
                }}>
                  C
                </div>
                <span style={{ fontSize: '20px', fontWeight: 'bold' }}>CNEC</span>
              </div>
              <p style={{ fontSize: '14px', color: '#9E9E9E', lineHeight: '1.6', margin: 0 }}>
                뷰티 크리에이터와 브랜드를 연결하는 마케팅 플랫폼
              </p>
            </div>
            <div>
              <h4 style={{ fontWeight: '600', marginBottom: '16px' }}>서비스</h4>
              <ul style={{ listStyle: 'none', fontSize: '14px', color: '#9E9E9E', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>캠페인 등록</a></li>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>크리에이터 찾기</a></li>
                <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>AI 기획안</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontWeight: '600', marginBottom: '16px' }}>회사</h4>
              <ul style={{ listStyle: 'none', fontSize: '14px', color: '#9E9E9E', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>회사 소개</a></li>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>채용</a></li>
                <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>블로그</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontWeight: '600', marginBottom: '16px' }}>고객지원</h4>
              <ul style={{ listStyle: 'none', fontSize: '14px', color: '#9E9E9E', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>자주 묻는 질문</a></li>
                <li style={{ marginBottom: '8px' }}><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>이용약관</a></li>
                <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>개인정보처리방침</a></li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #424242', paddingTop: '32px', textAlign: 'center' }}>
            <p style={{ fontSize: '14px', color: '#9E9E9E', margin: 0 }}>© 2024 CNEC. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
