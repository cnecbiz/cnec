import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/authStore'

export function LandingPage() {
  const navigate = useNavigate()
  const { isAuthenticated, profile, signOut, initializeAuth } = useAuthStore()
  const [portfolios, setPortfolios] = useState([])
  const [activeVideo, setActiveVideo] = useState(0)

  // 인증 상태 초기화
  useEffect(() => {
    initializeAuth()
  }, [])

  const handleLogout = async () => {
    await signOut()
    navigate('/')
  }

  useEffect(() => {
    // 포트폴리오 영상 로드 (관리자가 등록한 영상)
    async function loadPortfolios() {
      try {
        const { data, error } = await supabase
          .from('portfolios')
          .select('*')
          .eq('is_featured', true)
          .order('created_at', { ascending: false })
          .limit(6)

        if (error) {
          console.warn('포트폴리오 로드 실패:', error.message)
          // 테이블이 없거나 에러 시 기본 데이터 사용
          setPortfolios([
            { id: 1, title: '뷰티 브랜드 A 캠페인', thumbnail: '/placeholder-1.jpg', video_url: '#' },
            { id: 2, title: '스킨케어 런칭 캠페인', thumbnail: '/placeholder-2.jpg', video_url: '#' },
            { id: 3, title: '메이크업 튜토리얼', thumbnail: '/placeholder-3.jpg', video_url: '#' },
            { id: 4, title: '4주 챌린지 캠페인', thumbnail: '/placeholder-4.jpg', video_url: '#' },
          ])
          return
        }

        if (data && data.length > 0) {
          setPortfolios(data)
        } else {
          // 기본 샘플 데이터
          setPortfolios([
            { id: 1, title: '뷰티 브랜드 A 캠페인', thumbnail: '/placeholder-1.jpg', video_url: '#' },
            { id: 2, title: '스킨케어 런칭 캠페인', thumbnail: '/placeholder-2.jpg', video_url: '#' },
            { id: 3, title: '메이크업 튜토리얼', thumbnail: '/placeholder-3.jpg', video_url: '#' },
            { id: 4, title: '4주 챌린지 캠페인', thumbnail: '/placeholder-4.jpg', video_url: '#' },
          ])
        }
      } catch (err) {
        console.warn('포트폴리오 로드 에러:', err)
        setPortfolios([
          { id: 1, title: '뷰티 브랜드 A 캠페인', thumbnail: '/placeholder-1.jpg', video_url: '#' },
          { id: 2, title: '스킨케어 런칭 캠페인', thumbnail: '/placeholder-2.jpg', video_url: '#' },
          { id: 3, title: '메이크업 튜토리얼', thumbnail: '/placeholder-3.jpg', video_url: '#' },
          { id: 4, title: '4주 챌린지 캠페인', thumbnail: '/placeholder-4.jpg', video_url: '#' },
        ])
      }
    }
    loadPortfolios()
  }, [])

  return (
    <div style={{ width: '100%', minHeight: '100vh', backgroundColor: '#fff' }}>
      {/* Header */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '64px',
        backgroundColor: 'rgba(255,255,255,0.95)',
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
            <a href="#portfolio" style={{ fontSize: '14px', color: '#757575', textDecoration: 'none' }}>포트폴리오</a>
            <a href="#services" style={{ fontSize: '14px', color: '#757575', textDecoration: 'none' }}>서비스 안내</a>
            <a href="#campaigns" style={{ fontSize: '14px', color: '#757575', textDecoration: 'none' }}>캠페인 유형</a>
            <a href="#process" style={{ fontSize: '14px', color: '#757575', textDecoration: 'none' }}>진행 과정</a>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {isAuthenticated ? (
              <>
                <span style={{ fontSize: '14px', color: '#212121' }}>
                  {profile?.name || '사용자'}님
                </span>
                <Link to={
                  profile?.user_type === 'admin'
                    ? '/admin'
                    : profile?.user_type === 'brand'
                    ? '/brand'
                    : '/creator'
                } style={{
                  padding: '8px 16px',
                  fontSize: '14px',
                  color: '#0066FF',
                  textDecoration: 'none',
                  fontWeight: '500',
                }}>
                  마이페이지
                </Link>
                <button
                  onClick={handleLogout}
                  style={{
                    padding: '10px 24px',
                    fontSize: '14px',
                    color: '#fff',
                    backgroundColor: '#FF4444',
                    borderRadius: '8px',
                    border: 'none',
                    fontWeight: '500',
                    cursor: 'pointer',
                  }}
                >
                  로그아웃
                </button>
              </>
            ) : (
              <>
                <Link to="/auth/login" style={{
                  padding: '8px 16px',
                  fontSize: '14px',
                  color: '#212121',
                  textDecoration: 'none',
                }}>
                  로그인
                </Link>
                <Link to="/auth/register/brand" style={{
                  padding: '10px 24px',
                  fontSize: '14px',
                  color: '#fff',
                  backgroundColor: '#0066FF',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '500',
                }}>
                  캠페인 신청하기
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section with Portfolio Videos */}
      <section id="portfolio" style={{
        paddingTop: '100px',
        paddingBottom: '60px',
        backgroundColor: '#000',
        color: '#fff',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span style={{
              display: 'inline-block',
              padding: '6px 16px',
              backgroundColor: 'rgba(0,102,255,0.3)',
              color: '#6BA5FF',
              fontSize: '14px',
              fontWeight: '500',
              borderRadius: '9999px',
              marginBottom: '16px',
            }}>
              CNEC Portfolio
            </span>
            <h1 style={{
              fontSize: '42px',
              fontWeight: 'bold',
              marginBottom: '16px',
              lineHeight: '1.2',
            }}>
              검증된 뷰티 크리에이터와<br />
              <span style={{ color: '#0066FF' }}>고품질 숏폼 콘텐츠</span>를 만나보세요
            </h1>
            <p style={{
              fontSize: '16px',
              color: '#9E9E9E',
              maxWidth: '600px',
              margin: '0 auto',
            }}>
              10년 이상의 마케팅 노하우와 1,000개 이상의 콘텐츠 제작 경험을 바탕으로<br />
              브랜드에 최적화된 인플루언서 마케팅을 제공합니다.
            </p>
          </div>

          {/* Portfolio Video Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
            marginBottom: '40px',
          }}>
            {portfolios.map((portfolio, index) => (
              <div
                key={portfolio.id}
                onClick={() => setActiveVideo(index)}
                style={{
                  aspectRatio: '9/16',
                  backgroundColor: '#1a1a1a',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  border: activeVideo === index ? '2px solid #0066FF' : '2px solid transparent',
                  transition: 'all 0.3s',
                  position: 'relative',
                }}
              >
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#2a2a2a',
                  color: '#666',
                  fontSize: '14px',
                }}>
                  {portfolio.thumbnail ? (
                    <img
                      src={portfolio.thumbnail}
                      alt={portfolio.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      onError={(e) => {
                        e.target.style.display = 'none'
                        e.target.parentElement.innerHTML = `<div style="display:flex;align-items:center;justify-content:center;height:100%;color:#666">▶ ${portfolio.title}</div>`
                      }}
                    />
                  ) : (
                    <span>▶ {portfolio.title}</span>
                  )}
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '12px',
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
                }}>
                  <p style={{ fontSize: '13px', margin: 0 }}>{portfolio.title}</p>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link to="/auth/register/brand" style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '16px 32px',
              backgroundColor: '#0066FF',
              color: '#fff',
              fontSize: '16px',
              fontWeight: '600',
              borderRadius: '8px',
              textDecoration: 'none',
            }}>
              캠페인 신청하기 →
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ padding: '60px 24px', backgroundColor: '#FAFAFA' }}>
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '32px',
        }}>
          {[
            { value: '400+', label: '협업 브랜드', desc: '다양한 뷰티 브랜드와 협업' },
            { value: '1,000+', label: '콘텐츠 제작', desc: '숏폼 콘텐츠 제작 완료' },
            { value: '5,000+', label: '등록 크리에이터', desc: '검증된 뷰티 크리에이터' },
            { value: '10년+', label: '마케팅 경력', desc: '뷰티 마케팅 전문성' },
          ].map((stat) => (
            <div key={stat.label} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '36px', fontWeight: 'bold', color: '#0066FF', margin: 0 }}>{stat.value}</p>
              <p style={{ fontSize: '16px', fontWeight: '600', color: '#212121', margin: '8px 0 4px' }}>{stat.label}</p>
              <p style={{ fontSize: '13px', color: '#9E9E9E', margin: 0 }}>{stat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services Section */}
      <section id="services" style={{ padding: '80px 24px' }}>
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
              광고주를 위한 서비스
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#212121', marginBottom: '16px' }}>
              왜 CNEC인가요?
            </h2>
            <p style={{ fontSize: '16px', color: '#757575' }}>
              브랜드 마케팅에 최적화된 서비스를 제공합니다.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
          }}>
            {[
              {
                icon: '👥',
                title: '검증된 크리에이터 풀',
                desc: '팔로워 수, 참여율, 콘텐츠 품질 등 다양한 기준으로 검증된 5,000명 이상의 뷰티 크리에이터를 보유하고 있습니다.'
              },
              {
                icon: '🎬',
                title: '고품질 숏폼 제작',
                desc: '틱톡, 인스타그램 릴스, 유튜브 쇼츠 등 플랫폼에 최적화된 고퀄리티 숏폼 콘텐츠를 제작합니다.'
              },
              {
                icon: '✨',
                title: 'AI 기획안 자동 생성',
                desc: '제품 정보만 입력하면 AI가 자동으로 콘텐츠 기획안을 생성해 드립니다. 빠르고 효율적인 캠페인 시작!'
              },
              {
                icon: '📊',
                title: '실시간 성과 분석',
                desc: '조회수, 참여율, 도달률 등 캠페인 성과를 실시간으로 분석하고 상세 리포트를 제공합니다.'
              },
            ].map((feature) => (
              <div key={feature.title} style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                padding: '28px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                border: '1px solid #f0f0f0',
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  backgroundColor: '#EBF5FF',
                  borderRadius: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '28px',
                  marginBottom: '20px',
                }}>
                  {feature.icon}
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#212121', marginBottom: '12px' }}>
                  {feature.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#757575', lineHeight: '1.7', margin: 0 }}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campaign Types */}
      <section id="campaigns" style={{ padding: '80px 24px', backgroundColor: '#FAFAFA' }}>
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
              캠페인 유형 안내
            </h2>
            <p style={{ fontSize: '16px', color: '#757575' }}>
              브랜드의 목적과 예산에 맞는 최적의 캠페인을 선택하세요.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px',
          }}>
            {[
              {
                title: '기획 숏폼',
                subtitle: '단일 콘텐츠',
                desc: '컨셉 기획영상, 기획안 제공',
                price: '30~60만원',
                features: [
                  '스토리보드 기획 제공',
                  '30초 이내 숏폼 영상',
                  '수정 1회 포함',
                  '인스타/틱톡 업로드'
                ]
              },
              {
                title: '4주 챌린지',
                subtitle: '시리즈 콘텐츠',
                desc: '1주 1개 × 4주 콘텐츠',
                price: '60~120만원',
                features: [
                  '4개 연속 콘텐츠 제작',
                  '비포&애프터 구성',
                  '장기 노출 효과',
                  '해시태그 챌린지 참여'
                ],
                popular: true
              },
              {
                title: '프리미엄',
                subtitle: '메가 인플루언서',
                desc: '메가 인플루언서 지정 섭외',
                price: '협의',
                features: [
                  '50만+ 팔로워 크리에이터',
                  '맞춤형 기획 & 연출',
                  '전담 매니저 배정',
                  '상세 성과 리포트'
                ]
              },
            ].map((campaign) => (
              <div key={campaign.title} style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                padding: '36px',
                border: campaign.popular ? '2px solid #0066FF' : '1px solid #E0E0E0',
                position: 'relative',
              }}>
                {campaign.popular && (
                  <span style={{
                    position: 'absolute',
                    top: '-14px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    padding: '6px 16px',
                    backgroundColor: '#0066FF',
                    color: '#fff',
                    fontSize: '13px',
                    fontWeight: '600',
                    borderRadius: '9999px',
                  }}>
                    BEST
                  </span>
                )}
                <p style={{ fontSize: '13px', color: '#0066FF', fontWeight: '500', marginBottom: '4px' }}>
                  {campaign.subtitle}
                </p>
                <h3 style={{ fontSize: '24px', fontWeight: 'bold', color: '#212121', marginBottom: '8px' }}>
                  {campaign.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#9E9E9E', marginBottom: '20px' }}>
                  {campaign.desc}
                </p>
                <p style={{ fontSize: '28px', fontWeight: 'bold', color: '#0066FF', marginBottom: '24px' }}>
                  {campaign.price}
                </p>
                <ul style={{ listStyle: 'none', marginBottom: '28px', padding: 0 }}>
                  {campaign.features.map((f) => (
                    <li key={f} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '14px',
                      color: '#616161',
                      marginBottom: '14px',
                    }}>
                      <span style={{ color: '#00C853', fontWeight: 'bold' }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/auth/register/brand" style={{
                  display: 'block',
                  textAlign: 'center',
                  padding: '14px',
                  backgroundColor: campaign.popular ? '#0066FF' : '#fff',
                  color: campaign.popular ? '#fff' : '#212121',
                  border: campaign.popular ? 'none' : '1px solid #E0E0E0',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  fontWeight: '600',
                  fontSize: '15px',
                }}>
                  캠페인 신청하기
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section id="process" style={{ padding: '80px 24px' }}>
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
              Process
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#212121', marginBottom: '16px' }}>
              캠페인 진행 과정
            </h2>
            <p style={{ fontSize: '16px', color: '#757575' }}>
              간단한 4단계로 캠페인을 진행하세요.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px',
          }}>
            {[
              { step: '01', title: '캠페인 신청', desc: '제품 정보와 캠페인 목표를 입력하고 신청서를 제출합니다.' },
              { step: '02', title: '크리에이터 매칭', desc: '브랜드에 적합한 크리에이터를 선별하여 제안드립니다.' },
              { step: '03', title: '콘텐츠 제작', desc: '기획안 확정 후 크리에이터가 콘텐츠를 제작합니다.' },
              { step: '04', title: '업로드 & 리포트', desc: '콘텐츠 업로드 후 성과 리포트를 제공합니다.' },
            ].map((item, index) => (
              <div key={item.step} style={{ position: 'relative' }}>
                {index < 3 && (
                  <div style={{
                    position: 'absolute',
                    top: '40px',
                    left: '60%',
                    width: '80%',
                    height: '2px',
                    backgroundColor: '#E0E0E0',
                    zIndex: 0,
                  }} />
                )}
                <div style={{
                  width: '80px',
                  height: '80px',
                  backgroundColor: '#0066FF',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                  position: 'relative',
                  zIndex: 1,
                }}>
                  <span style={{ color: '#fff', fontSize: '24px', fontWeight: 'bold' }}>{item.step}</span>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#212121', marginBottom: '8px', textAlign: 'center' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#757575', lineHeight: '1.6', textAlign: 'center', margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '80px 24px',
        backgroundColor: '#0066FF',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#fff', marginBottom: '16px' }}>
            지금 바로 캠페인을 시작하세요
          </h2>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', marginBottom: '32px' }}>
            CNEC과 함께 효과적인 뷰티 인플루언서 마케팅을 경험해 보세요.
          </p>
          <Link to="/auth/register/brand" style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '16px 40px',
            backgroundColor: '#fff',
            color: '#0066FF',
            fontSize: '18px',
            fontWeight: '600',
            borderRadius: '8px',
            textDecoration: 'none',
          }}>
            캠페인 신청하기 →
          </Link>
          <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginTop: '16px' }}>
            문의: contact@cnec.kr | 02-1234-5678
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#212121', color: '#fff', padding: '48px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '2fr 1fr 1fr 1fr',
            gap: '48px',
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
                뷰티 브랜드와 크리에이터를 연결하는<br />
                인플루언서 마케팅 플랫폼
              </p>
            </div>
            <div>
              <h4 style={{ fontWeight: '600', marginBottom: '16px', fontSize: '15px' }}>서비스</h4>
              <ul style={{ listStyle: 'none', fontSize: '14px', color: '#9E9E9E', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '10px' }}><a href="#campaigns" style={{ color: 'inherit', textDecoration: 'none' }}>캠페인 유형</a></li>
                <li style={{ marginBottom: '10px' }}><a href="#services" style={{ color: 'inherit', textDecoration: 'none' }}>서비스 안내</a></li>
                <li><a href="#process" style={{ color: 'inherit', textDecoration: 'none' }}>진행 과정</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontWeight: '600', marginBottom: '16px', fontSize: '15px' }}>회사</h4>
              <ul style={{ listStyle: 'none', fontSize: '14px', color: '#9E9E9E', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>회사 소개</a></li>
                <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>공지사항</a></li>
                <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>문의하기</a></li>
              </ul>
            </div>
            <div>
              <h4 style={{ fontWeight: '600', marginBottom: '16px', fontSize: '15px' }}>고객지원</h4>
              <ul style={{ listStyle: 'none', fontSize: '14px', color: '#9E9E9E', padding: 0, margin: 0 }}>
                <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>자주 묻는 질문</a></li>
                <li style={{ marginBottom: '10px' }}><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>이용약관</a></li>
                <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>개인정보처리방침</a></li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #424242', paddingTop: '24px' }}>
            <p style={{ fontSize: '13px', color: '#757575', margin: 0, lineHeight: '1.8' }}>
              (주)CNEC | 대표: 홍길동 | 사업자등록번호: 123-45-67890<br />
              서울특별시 강남구 테헤란로 123, 4층<br />
              © 2024 CNEC. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
