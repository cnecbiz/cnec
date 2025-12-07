import { Link } from 'react-router-dom'

export function CreatorLandingPage() {
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
          <Link to="/join" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
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
            <span style={{
              padding: '2px 8px',
              backgroundColor: '#EBF5FF',
              color: '#0066FF',
              fontSize: '11px',
              fontWeight: '600',
              borderRadius: '4px',
              marginLeft: '4px',
            }}>
              Creator
            </span>
          </Link>

          <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <a href="#benefits" style={{ fontSize: '14px', color: '#757575', textDecoration: 'none' }}>혜택</a>
            <a href="#how-it-works" style={{ fontSize: '14px', color: '#757575', textDecoration: 'none' }}>진행 방법</a>
            <a href="#faq" style={{ fontSize: '14px', color: '#757575', textDecoration: 'none' }}>FAQ</a>
          </nav>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Link to="/auth/login" style={{
              padding: '8px 16px',
              fontSize: '14px',
              color: '#212121',
              textDecoration: 'none',
            }}>
              로그인
            </Link>
            <Link to="/auth/register/creator" style={{
              padding: '10px 24px',
              fontSize: '14px',
              color: '#fff',
              backgroundColor: '#0066FF',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '500',
            }}>
              크리에이터 등록
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section style={{
        paddingTop: '140px',
        paddingBottom: '80px',
        background: 'linear-gradient(135deg, #0066FF 0%, #0052CC 100%)',
        color: '#fff',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '64px',
            alignItems: 'center',
          }}>
            <div>
              <span style={{
                display: 'inline-block',
                padding: '6px 16px',
                backgroundColor: 'rgba(255,255,255,0.2)',
                fontSize: '14px',
                fontWeight: '500',
                borderRadius: '9999px',
                marginBottom: '24px',
              }}>
                CNEC Creator Program
              </span>
              <h1 style={{
                fontSize: '44px',
                fontWeight: 'bold',
                marginBottom: '24px',
                lineHeight: '1.2',
              }}>
                뷰티 크리에이터로<br />
                수익을 창출하세요
              </h1>
              <p style={{
                fontSize: '18px',
                opacity: 0.9,
                marginBottom: '32px',
                lineHeight: '1.6',
              }}>
                검증된 브랜드와의 협업 기회, 안정적인 원고비,<br />
                그리고 다양한 성장 기회가 기다리고 있습니다.
              </p>
              <div style={{ display: 'flex', gap: '16px' }}>
                <Link to="/auth/register/creator" style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '16px 32px',
                  backgroundColor: '#fff',
                  color: '#0066FF',
                  fontSize: '16px',
                  fontWeight: '600',
                  borderRadius: '8px',
                  textDecoration: 'none',
                }}>
                  지금 등록하기 →
                </Link>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '16px',
            }}>
              {[
                { icon: '💰', value: '30~120만원', label: '캠페인당 원고비' },
                { icon: '🎯', value: '400+', label: '협업 가능 브랜드' },
                { icon: '📈', value: '5,000+', label: '활동 크리에이터' },
                { icon: '⚡', value: '7일', label: '평균 정산 기간' },
              ].map((stat, i) => (
                <div key={stat.label} style={{
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  padding: '24px',
                  marginTop: i % 2 === 1 ? '32px' : 0,
                }}>
                  <div style={{ fontSize: '32px', marginBottom: '8px' }}>{stat.icon}</div>
                  <p style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>{stat.value}</p>
                  <p style={{ fontSize: '14px', opacity: 0.8, margin: '4px 0 0' }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" style={{ padding: '80px 24px' }}>
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
              크리에이터 혜택
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#212121', marginBottom: '16px' }}>
              CNEC 크리에이터가 되면
            </h2>
            <p style={{ fontSize: '16px', color: '#757575' }}>
              다양한 혜택과 성장 기회를 제공합니다.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '32px',
          }}>
            {[
              {
                icon: '💵',
                title: '안정적인 수익',
                desc: '검증된 브랜드와의 협업으로 안정적인 원고비를 받을 수 있습니다. 캠페인 유형에 따라 30만원~120만원의 원고비가 지급됩니다.',
                features: ['캠페인당 30~120만원', '투명한 정산 시스템', '빠른 지급 (7일 이내)']
              },
              {
                icon: '🚀',
                title: '성장 기회',
                desc: '다양한 뷰티 브랜드와 협업하며 크리에이터로서 경험을 쌓고, 포트폴리오를 강화할 수 있습니다.',
                features: ['400+ 브랜드 협업 기회', '포트폴리오 구축 지원', '크리에이터 교육 프로그램']
              },
              {
                icon: '🛡️',
                title: '안전한 협업',
                desc: 'CNEC이 브랜드와 크리에이터 사이에서 계약, 정산, 분쟁 해결까지 모든 과정을 안전하게 관리합니다.',
                features: ['표준 계약서 제공', '정산 보장 시스템', '전담 매니저 지원']
              },
            ].map((benefit) => (
              <div key={benefit.title} style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                padding: '32px',
                border: '1px solid #E0E0E0',
              }}>
                <div style={{
                  width: '64px',
                  height: '64px',
                  backgroundColor: '#EBF5FF',
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '32px',
                  marginBottom: '20px',
                }}>
                  {benefit.icon}
                </div>
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#212121', marginBottom: '12px' }}>
                  {benefit.title}
                </h3>
                <p style={{ fontSize: '14px', color: '#757575', lineHeight: '1.7', marginBottom: '20px' }}>
                  {benefit.desc}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {benefit.features.map((f) => (
                    <li key={f} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '14px',
                      color: '#424242',
                      marginBottom: '10px',
                    }}>
                      <span style={{ color: '#0066FF' }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Campaign Types for Creators */}
      <section style={{ padding: '80px 24px', backgroundColor: '#FAFAFA' }}>
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
              캠페인 유형
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#212121', marginBottom: '16px' }}>
              참여 가능한 캠페인
            </h2>
            <p style={{ fontSize: '16px', color: '#757575' }}>
              나에게 맞는 캠페인을 선택하여 참여하세요.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '24px',
          }}>
            {[
              {
                type: '기획 숏폼',
                reward: '30~60만원',
                duration: '2주',
                desc: '브랜드 제품을 활용한 숏폼 콘텐츠 1개 제작',
                tasks: ['제품 수령 및 사용', '30초 이내 숏폼 제작', '인스타/틱톡 업로드']
              },
              {
                type: '4주 챌린지',
                reward: '60~120만원',
                duration: '4주',
                desc: '4주간 매주 1개씩 총 4개의 숏폼 콘텐츠 제작',
                tasks: ['비포&애프터 콘텐츠', '주 1회 콘텐츠 업로드', '해시태그 챌린지 참여'],
                popular: true
              },
              {
                type: '프리미엄',
                reward: '협의',
                duration: '협의',
                desc: '메가 인플루언서 전용 맞춤형 캠페인',
                tasks: ['맞춤형 기획 참여', '고품질 콘텐츠 제작', '전담 매니저 소통']
              },
            ].map((campaign) => (
              <div key={campaign.type} style={{
                backgroundColor: '#fff',
                borderRadius: '16px',
                padding: '28px',
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
                    fontWeight: '600',
                    borderRadius: '9999px',
                  }}>
                    인기 캠페인
                  </span>
                )}
                <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#212121', marginBottom: '8px' }}>
                  {campaign.type}
                </h3>
                <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                  <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#0066FF' }}>{campaign.reward}</span>
                  <span style={{
                    padding: '4px 10px',
                    backgroundColor: '#F5F5F5',
                    color: '#757575',
                    fontSize: '13px',
                    borderRadius: '4px',
                    alignSelf: 'center',
                  }}>
                    {campaign.duration}
                  </span>
                </div>
                <p style={{ fontSize: '14px', color: '#757575', marginBottom: '16px' }}>
                  {campaign.desc}
                </p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {campaign.tasks.map((task) => (
                    <li key={task} style={{
                      fontSize: '13px',
                      color: '#616161',
                      marginBottom: '8px',
                      paddingLeft: '16px',
                      position: 'relative',
                    }}>
                      <span style={{ position: 'absolute', left: 0, color: '#BDBDBD' }}>•</span>
                      {task}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" style={{ padding: '80px 24px' }}>
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
              진행 방법
            </span>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#212121', marginBottom: '16px' }}>
              캠페인 참여 과정
            </h2>
            <p style={{ fontSize: '16px', color: '#757575' }}>
              간단한 과정으로 캠페인에 참여하세요.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(5, 1fr)',
            gap: '16px',
          }}>
            {[
              { step: '1', title: '회원가입', desc: '크리에이터 정보 등록' },
              { step: '2', title: '캠페인 탐색', desc: '참여할 캠페인 선택' },
              { step: '3', title: '지원 & 선정', desc: '브랜드 승인 대기' },
              { step: '4', title: '콘텐츠 제작', desc: '가이드에 맞춰 제작' },
              { step: '5', title: '정산 수령', desc: '업로드 후 7일 이내' },
            ].map((item, index) => (
              <div key={item.step} style={{ textAlign: 'center', position: 'relative' }}>
                {index < 4 && (
                  <div style={{
                    position: 'absolute',
                    top: '28px',
                    left: '60%',
                    width: '80%',
                    height: '2px',
                    backgroundColor: '#E0E0E0',
                    zIndex: 0,
                  }} />
                )}
                <div style={{
                  width: '56px',
                  height: '56px',
                  backgroundColor: '#0066FF',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 16px',
                  position: 'relative',
                  zIndex: 1,
                }}>
                  <span style={{ color: '#fff', fontSize: '20px', fontWeight: 'bold' }}>{item.step}</span>
                </div>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#212121', marginBottom: '4px' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '13px', color: '#9E9E9E', margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section style={{ padding: '80px 24px', backgroundColor: '#FAFAFA' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#212121', marginBottom: '16px' }}>
              가입 조건
            </h2>
            <p style={{ fontSize: '16px', color: '#757575' }}>
              아래 조건을 충족하는 크리에이터라면 누구나 가입할 수 있습니다.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
          }}>
            {[
              { icon: '📱', title: 'SNS 계정 보유', desc: '인스타그램, 틱톡, 유튜브 중 1개 이상의 활성 계정' },
              { icon: '👥', title: '팔로워 1,000명 이상', desc: '최소 1개 플랫폼에서 팔로워 1,000명 이상' },
              { icon: '💄', title: '뷰티 콘텐츠 제작', desc: '뷰티/메이크업/스킨케어 관련 콘텐츠 제작 경험' },
              { icon: '✨', title: '콘텐츠 품질', desc: '영상 촬영 및 편집이 가능한 크리에이터' },
            ].map((req) => (
              <div key={req.title} style={{
                backgroundColor: '#fff',
                borderRadius: '12px',
                padding: '24px',
                display: 'flex',
                gap: '16px',
                alignItems: 'flex-start',
                border: '1px solid #E0E0E0',
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
                  flexShrink: 0,
                }}>
                  {req.icon}
                </div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#212121', marginBottom: '4px' }}>
                    {req.title}
                  </h3>
                  <p style={{ fontSize: '14px', color: '#757575', margin: 0 }}>
                    {req.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
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
              FAQ
            </span>
            <h2 style={{ fontSize: '28px', fontWeight: 'bold', color: '#212121', marginBottom: '16px' }}>
              자주 묻는 질문
            </h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {[
              {
                q: '가입 후 바로 캠페인에 참여할 수 있나요?',
                a: '네, 가입 심사 완료 후 바로 진행 중인 캠페인에 지원하실 수 있습니다. 심사는 보통 1-2일 내에 완료됩니다.'
              },
              {
                q: '원고비는 언제 지급되나요?',
                a: '콘텐츠가 업로드되고 브랜드의 검수가 완료되면 7일 이내에 원고비가 지급됩니다. 정산은 매주 금요일에 진행됩니다.'
              },
              {
                q: '여러 캠페인에 동시에 참여할 수 있나요?',
                a: '네, 가능합니다. 단, 동일 카테고리의 경쟁 브랜드 캠페인에는 동시 참여가 제한될 수 있습니다.'
              },
              {
                q: '제품은 무료로 제공되나요?',
                a: '네, 캠페인에 선정되시면 제품이 무료로 제공됩니다. 제품은 개봉 후에도 소유하실 수 있습니다.'
              },
              {
                q: '콘텐츠 수정 요청이 올 수 있나요?',
                a: '캠페인 가이드라인을 벗어난 경우 수정 요청이 있을 수 있습니다. 수정은 최대 1회까지이며, 그 이상의 수정에 대해서는 추가 비용이 지급됩니다.'
              },
            ].map((faq, i) => (
              <div key={i} style={{
                backgroundColor: '#FAFAFA',
                borderRadius: '12px',
                padding: '24px',
              }}>
                <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#212121', marginBottom: '8px' }}>
                  Q. {faq.q}
                </h3>
                <p style={{ fontSize: '14px', color: '#616161', margin: 0, lineHeight: '1.6' }}>
                  A. {faq.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: '80px 24px',
        backgroundColor: '#0066FF',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: 'bold', color: '#fff', marginBottom: '16px' }}>
            지금 CNEC 크리에이터가 되세요
          </h2>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.8)', marginBottom: '32px' }}>
            뷰티 브랜드와의 협업 기회, 안정적인 수익, 성장의 기회가 기다립니다.
          </p>
          <Link to="/auth/register/creator" style={{
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
            크리에이터 등록하기 →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#212121', color: '#fff', padding: '48px 24px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
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
              <span style={{
                padding: '2px 8px',
                backgroundColor: '#0066FF',
                color: '#fff',
                fontSize: '11px',
                fontWeight: '600',
                borderRadius: '4px',
                marginLeft: '4px',
              }}>
                Creator
              </span>
            </div>
            <div style={{ display: 'flex', gap: '24px', fontSize: '14px', color: '#9E9E9E' }}>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>이용약관</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>개인정보처리방침</a>
              <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>문의하기</a>
            </div>
          </div>
          <div style={{ borderTop: '1px solid #424242', paddingTop: '24px' }}>
            <p style={{ fontSize: '13px', color: '#757575', margin: 0 }}>
              © 2024 CNEC. All rights reserved. | 크리에이터 문의: creator@cnec.kr
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
