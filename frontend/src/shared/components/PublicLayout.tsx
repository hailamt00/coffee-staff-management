import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootState } from '@/app/store'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function PublicRoute({ children }: Props) {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  )

  // ✅ Already logged in, redirect to dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  return <>{children}</>
}
