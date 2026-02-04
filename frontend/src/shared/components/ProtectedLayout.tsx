import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { RootState } from '@/app/store'
import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function ProtectedLayout({ children }: Props) {
  const isAuthenticated = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  )

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}
