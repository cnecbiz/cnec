import { Outlet, Link } from 'react-router-dom'

export function AuthLayout() {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-cnec-blue flex-col justify-between p-12">
        <div>
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-cnec-blue font-bold text-xl">
              C
            </div>
            <span className="text-2xl font-bold text-white">CNEC</span>
          </Link>
        </div>

        <div className="text-white">
          <h1 className="text-4xl font-bold mb-4">
            뷰티 크리에이터와<br />
            브랜드를 연결합니다
          </h1>
          <p className="text-lg text-white/80">
            10년 이상의 마케팅 노하우, 400개 이상의 브랜드 협업,<br />
            1,000개 이상의 숏폼 콘텐츠 제작 실적
          </p>
        </div>

        <div className="flex items-center gap-8">
          <div className="text-white">
            <p className="text-3xl font-bold">400+</p>
            <p className="text-sm text-white/70">협업 브랜드</p>
          </div>
          <div className="text-white">
            <p className="text-3xl font-bold">1,000+</p>
            <p className="text-sm text-white/70">콘텐츠 제작</p>
          </div>
          <div className="text-white">
            <p className="text-3xl font-bold">10+</p>
            <p className="text-sm text-white/70">Years</p>
          </div>
        </div>
      </div>

      {/* Right side - Auth form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link to="/" className="inline-flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cnec-blue text-white font-bold text-xl">
                C
              </div>
              <span className="text-2xl font-bold text-gray-900">CNEC</span>
            </Link>
          </div>

          <Outlet />
        </div>
      </div>
    </div>
  )
}
