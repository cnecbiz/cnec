import { create } from 'zustand'

/**
 * UI 상태 관리 스토어
 */
export const useUIStore = create((set, get) => ({
  // Sidebar state
  sidebarOpen: true,
  sidebarCollapsed: false,

  // Modal state
  modals: {},

  // Toast notifications
  toasts: [],

  // Loading states
  globalLoading: false,
  loadingStates: {},

  // Theme
  theme: 'light',

  // Actions
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  setSidebarOpen: (open) => set({ sidebarOpen: open }),
  toggleSidebarCollapse: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),

  // Modal actions
  openModal: (modalId, data = null) =>
    set((state) => ({
      modals: { ...state.modals, [modalId]: { isOpen: true, data } },
    })),
  closeModal: (modalId) =>
    set((state) => ({
      modals: { ...state.modals, [modalId]: { isOpen: false, data: null } },
    })),
  getModalState: (modalId) => get().modals[modalId] || { isOpen: false, data: null },

  // Toast actions
  addToast: (toast) => {
    const id = Date.now().toString()
    const newToast = { id, ...toast }
    set((state) => ({ toasts: [...state.toasts, newToast] }))

    // 자동 제거 (duration이 지정된 경우)
    if (toast.duration !== 0) {
      setTimeout(() => {
        get().removeToast(id)
      }, toast.duration || 5000)
    }

    return id
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
  clearToasts: () => set({ toasts: [] }),

  // Loading actions
  setGlobalLoading: (loading) => set({ globalLoading: loading }),
  setLoading: (key, loading) =>
    set((state) => ({
      loadingStates: { ...state.loadingStates, [key]: loading },
    })),
  isLoading: (key) => get().loadingStates[key] || false,

  // Theme actions
  setTheme: (theme) => {
    set({ theme })
    document.documentElement.setAttribute('data-theme', theme)
  },
  toggleTheme: () => {
    const newTheme = get().theme === 'light' ? 'dark' : 'light'
    get().setTheme(newTheme)
  },
}))

/**
 * Toast 헬퍼 함수
 */
export const toast = {
  success: (message, options = {}) =>
    useUIStore.getState().addToast({ type: 'success', message, ...options }),
  error: (message, options = {}) =>
    useUIStore.getState().addToast({ type: 'error', message, ...options }),
  warning: (message, options = {}) =>
    useUIStore.getState().addToast({ type: 'warning', message, ...options }),
  info: (message, options = {}) =>
    useUIStore.getState().addToast({ type: 'info', message, ...options }),
}
