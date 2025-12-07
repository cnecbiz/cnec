import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Tailwind CSS 클래스 병합 유틸리티
 * clsx로 조건부 클래스를 처리하고 tailwind-merge로 충돌 해결
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * 날짜 포맷팅
 */
export function formatDate(date, options = {}) {
  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  }
  return new Intl.DateTimeFormat('ko-KR', defaultOptions).format(new Date(date))
}

/**
 * 숫자 포맷팅 (천 단위 콤마)
 */
export function formatNumber(num) {
  return new Intl.NumberFormat('ko-KR').format(num)
}

/**
 * 금액 포맷팅 (원화)
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat('ko-KR', {
    style: 'currency',
    currency: 'KRW',
  }).format(amount)
}

/**
 * 파일 크기 포맷팅
 */
export function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

/**
 * D-Day 계산
 */
export function getDDay(targetDate) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const target = new Date(targetDate)
  target.setHours(0, 0, 0, 0)
  const diff = Math.ceil((target - today) / (1000 * 60 * 60 * 24))

  if (diff === 0) return 'D-Day'
  if (diff > 0) return `D-${diff}`
  return `D+${Math.abs(diff)}`
}

/**
 * 팔로워 수 축약 (1만, 10만 등)
 */
export function formatFollowers(count) {
  if (count >= 100000000) {
    return (count / 100000000).toFixed(1).replace(/\.0$/, '') + '억'
  }
  if (count >= 10000) {
    return (count / 10000).toFixed(1).replace(/\.0$/, '') + '만'
  }
  if (count >= 1000) {
    return (count / 1000).toFixed(1).replace(/\.0$/, '') + '천'
  }
  return count.toString()
}

/**
 * 이메일 유효성 검사
 */
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * 전화번호 포맷팅 (010-1234-5678)
 */
export function formatPhoneNumber(phone) {
  const cleaned = phone.replace(/\D/g, '')
  if (cleaned.length === 11) {
    return cleaned.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3')
  }
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
  }
  return phone
}

/**
 * 사업자등록번호 포맷팅 (123-45-67890)
 */
export function formatBusinessNumber(num) {
  const cleaned = num.replace(/\D/g, '')
  if (cleaned.length === 10) {
    return cleaned.replace(/(\d{3})(\d{2})(\d{5})/, '$1-$2-$3')
  }
  return num
}

/**
 * 딜레이 함수
 */
export function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 디바운스
 */
export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * 쓰로틀
 */
export function throttle(func, limit) {
  let inThrottle
  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

/**
 * UUID 생성
 */
export function generateId() {
  return crypto.randomUUID()
}

/**
 * 텍스트 줄임 (말줄임표)
 */
export function truncate(str, length) {
  if (str.length <= length) return str
  return str.slice(0, length) + '...'
}

/**
 * 쿼리 파라미터 객체를 URL 문자열로 변환
 */
export function buildQueryString(params) {
  const searchParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, value)
    }
  })
  return searchParams.toString()
}

/**
 * 랜덤 색상 생성 (프로필 아바타용)
 */
export function getRandomColor(seed) {
  const colors = [
    '#0066FF', '#00C853', '#FF9500', '#FF3B30',
    '#5856D6', '#007AFF', '#34C759', '#FF2D55',
    '#AF52DE', '#5AC8FA', '#FFCC00', '#FF9F0A'
  ]
  const index = seed ? Math.abs(hashCode(seed)) % colors.length : Math.floor(Math.random() * colors.length)
  return colors[index]
}

function hashCode(str) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = ((hash << 5) - hash) + char
    hash = hash & hash
  }
  return hash
}
