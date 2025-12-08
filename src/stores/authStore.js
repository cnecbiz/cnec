import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { supabase } from '@/lib/supabase'

/**
 * 인증 상태 관리 스토어
 */
export const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      profile: null,
      session: null,
      isLoading: true,
      isAuthenticated: false,

      // Actions
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setProfile: (profile) => set({ profile }),
      setSession: (session) => set({ session }),
      setLoading: (isLoading) => set({ isLoading }),

      // 로그인
      signIn: async ({ email, password }) => {
        set({ isLoading: true })
        try {
          const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
          })
          if (error) throw error

          set({
            user: data.user,
            session: data.session,
            isAuthenticated: true,
            isLoading: false,
          })

          // 프로필 정보 가져오기
          await get().fetchProfile()

          return { data, error: null }
        } catch (error) {
          set({ isLoading: false })
          return { data: null, error }
        }
      },

      // 회원가입
      signUp: async ({ email, password, userType, metadata }) => {
        set({ isLoading: true })
        try {
          const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                user_type: userType,
                ...metadata,
              },
            },
          })
          if (error) throw error

          // 회원가입 성공 후 프로필 직접 생성
          if (data.user) {
            // profiles 테이블에 삽입
            const { error: profileError } = await supabase.from('profiles').insert({
              id: data.user.id,
              user_type: userType,
              name: metadata?.name || metadata?.manager_name || '',
              email: email,
              status: 'pending',
            })

            if (profileError) {
              console.error('Profile creation error:', profileError)
            }

            // 광고주인 경우 brand_profiles도 생성
            if (userType === 'brand') {
              const { error: brandError } = await supabase.from('brand_profiles').insert({
                user_id: data.user.id,
                company_name: metadata?.company_name || '',
                ceo_name: metadata?.ceo_name || '',
                business_number: metadata?.business_number || '',
                manager_name: metadata?.manager_name || '',
                manager_phone: metadata?.manager_phone || '',
                brand_name: metadata?.brand_name || '',
                category: metadata?.category || '',
              })

              if (brandError) {
                console.error('Brand profile creation error:', brandError)
              }
            }

            // 크리에이터인 경우 creator_profiles 생성
            if (userType === 'creator') {
              const { error: creatorError } = await supabase.from('creator_profiles').insert({
                user_id: data.user.id,
                skin_type: metadata?.skin_type || '',
                instagram_handle: metadata?.instagram_handle || '',
                tiktok_handle: metadata?.tiktok_handle || '',
                youtube_handle: metadata?.youtube_handle || '',
              })

              if (creatorError) {
                console.error('Creator profile creation error:', creatorError)
              }
            }
          }

          set({ isLoading: false })
          return { data, error: null }
        } catch (error) {
          set({ isLoading: false })
          return { data: null, error }
        }
      },

      // 소셜 로그인
      signInWithProvider: async (provider) => {
        try {
          const { data, error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
              redirectTo: `${window.location.origin}/auth/callback`,
            },
          })
          if (error) throw error
          return { data, error: null }
        } catch (error) {
          return { data: null, error }
        }
      },

      // 로그아웃
      signOut: async () => {
        set({ isLoading: true })
        try {
          const { error } = await supabase.auth.signOut()
          if (error) throw error

          set({
            user: null,
            profile: null,
            session: null,
            isAuthenticated: false,
            isLoading: false,
          })

          return { error: null }
        } catch (error) {
          set({ isLoading: false })
          return { error }
        }
      },

      // 프로필 가져오기
      fetchProfile: async () => {
        const { user } = get()
        if (!user) return

        try {
          const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single()

          if (error && error.code !== 'PGRST116') throw error

          set({ profile: data })
          return { data, error: null }
        } catch (error) {
          return { data: null, error }
        }
      },

      // 프로필 업데이트
      updateProfile: async (updates) => {
        const { user } = get()
        if (!user) return { data: null, error: new Error('Not authenticated') }

        try {
          const { data, error } = await supabase
            .from('profiles')
            .upsert({
              id: user.id,
              ...updates,
              updated_at: new Date().toISOString(),
            })
            .select()
            .single()

          if (error) throw error

          set({ profile: data })
          return { data, error: null }
        } catch (error) {
          return { data: null, error }
        }
      },

      // 세션 초기화
      initializeAuth: async () => {
        set({ isLoading: true })
        try {
          const { data: { session } } = await supabase.auth.getSession()

          if (session) {
            set({
              user: session.user,
              session,
              isAuthenticated: true,
            })
            await get().fetchProfile()
          }

          set({ isLoading: false })

          // 인증 상태 변경 리스너
          supabase.auth.onAuthStateChange(async (event, session) => {
            if (event === 'SIGNED_IN' && session) {
              set({
                user: session.user,
                session,
                isAuthenticated: true,
              })
              await get().fetchProfile()
            } else if (event === 'SIGNED_OUT') {
              set({
                user: null,
                profile: null,
                session: null,
                isAuthenticated: false,
              })
            } else if (event === 'TOKEN_REFRESHED' && session) {
              set({ session })
            }
          })
        } catch (error) {
          console.error('Auth initialization error:', error)
          set({ isLoading: false })
        }
      },

      // 비밀번호 재설정 이메일
      resetPassword: async (email) => {
        try {
          const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/auth/reset-password`,
          })
          if (error) throw error
          return { error: null }
        } catch (error) {
          return { error }
        }
      },

      // 비밀번호 업데이트
      updatePassword: async (newPassword) => {
        try {
          const { error } = await supabase.auth.updateUser({
            password: newPassword,
          })
          if (error) throw error
          return { error: null }
        } catch (error) {
          return { error }
        }
      },
    }),
    {
      name: 'cnec-auth',
      partialize: (state) => ({
        // persist할 필드만 선택
      }),
    }
  )
)
