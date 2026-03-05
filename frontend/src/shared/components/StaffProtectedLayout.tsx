import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

export default function StaffProtectedLayout({ children }: Props) {
    const staffInfo = localStorage.getItem('staffInfo')

    if (!staffInfo) {
        return <Navigate to="/staff/login" replace />
    }

    return <>{children}</>
}
