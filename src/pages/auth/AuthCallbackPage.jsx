import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/authStore'

export function AuthCallbackPage() {
  const navigate = useNavigate()
  const { fetchProfile } = useAuthStore()

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data: { session }, error } = await supabase.auth.getSession()

      if (error || !session) {
        navigate('/auth/login')
        return
      }

      // Fetch profile to determine user type
      await fetchProfile()
      const profile = useAuthStore.getState().profile

      // Redirect based on user type
      if (profile?.user_type === 'admin') {
        navigate('/admin')
      } else if (profile?.user_type === 'brand') {
        navigate('/brand')
      } else {
        navigate('/creator')
      }
    }

    handleAuthCallback()
  }, [navigate, fetchProfile])

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="text-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-cnec-blue border-t-transparent mx-auto mb-4" />
        <p className="text-gray-500">로그인 처리 중...</p>
      </div>
    </div>
  )
}
