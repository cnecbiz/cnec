import { Link, Navigate } from 'react-router-dom'

export function RegisterPage() {
  // 광고주 회원가입 페이지로 바로 이동
  return <Navigate to="/auth/register/brand" replace />
}
