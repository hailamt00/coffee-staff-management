import { createBrowserRouter, Navigate } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import App from '@/app/App'
import AppLayout from '@/shared/layout/AppLayout'
import ProtectedLayout from '@/shared/components/ProtectedLayout'
import StaffProtectedLayout from '@/shared/components/StaffProtectedLayout'
import PublicRoute from '@/shared/components/PublicLayout'
import StaffLayout from '@/shared/layout/StaffLayout'

// Auth Pages (eager — small, needed immediately)
import LoginPage from '@/features/auth/pages/LoginPage'
import StaffLoginPage from '@/features/auth/pages/StaffLoginPage'

// Admin Pages (lazy — code-split per route)
const DashboardPage = lazy(() => import('@/features/dashboard/pages/DashboardPage'))
const EmployeesPage = lazy(() => import('@/features/employees/pages/EmployeesPage'))
const AddEmployeePage = lazy(() => import('@/features/employees/pages/AddEmployeePage'))
const EditEmployeePage = lazy(() => import('@/features/employees/pages/EditEmployeePage'))
const PositionsPage = lazy(() => import('@/features/positions/pages/PositionsPage'))
const SchedulePage = lazy(() => import('@/features/schedule/pages/SchedulePage'))
const AttendancePage = lazy(() => import('@/features/attendance/pages/AttendancePage'))
const PayrollPage = lazy(() => import('@/features/payroll/pages/PayrollPage'))
const PayrollExportPage = lazy(() => import('@/features/payroll/pages/PayrollExportPage'))
const AdjustmentsPage = lazy(() => import('@/features/adjustments/page/AdjustmentsPage'))
const RevenuePage = lazy(() => import('@/features/revenue/pages/RevenuePage'))
const ActivityLogPage = lazy(() => import('@/features/activity-log/pages/ActivityPage'))

// Staff Pages (lazy)
const StaffMenuPage = lazy(() => import('@/features/staff/pages/StaffMenuPage'))
const StaffAttendancePage = lazy(() => import('@/features/attendance/pages/StaffAttendancePage'))
const StaffSchedulePage = lazy(() => import('@/features/schedule/pages/StaffSchedulePage'))
const StaffRevenuePage = lazy(() => import('@/features/staff/pages/StaffRevenuePage'))
const StaffRevenueResultPage = lazy(() => import('@/features/staff/pages/StaffRevenueResultPage'))

// Minimal loading fallback — no extra component, just null
const LazyPage = ({ children }: { children: React.ReactNode }) => (
  <Suspense fallback={null}>{children}</Suspense>
)

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      // Public Routes
      {
        path: '/login',
        element: (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        ),
      },
      {
        path: '/staff/login',
        element: <StaffLoginPage />,
      },

      // Staff Routes
      {
        path: '/staff',
        element: <StaffLayout />,
        children: [
          {
            path: 'menu',
            element: (
              <StaffProtectedLayout>
                <LazyPage><StaffMenuPage /></LazyPage>
              </StaffProtectedLayout>
            ),
          },
          {
            path: 'attendance',
            element: (
              <StaffProtectedLayout>
                <LazyPage><StaffAttendancePage /></LazyPage>
              </StaffProtectedLayout>
            ),
          },
          {
            path: 'schedule',
            element: (
              <StaffProtectedLayout>
                <LazyPage><StaffSchedulePage /></LazyPage>
              </StaffProtectedLayout>
            ),
          },
          {
            path: 'revenue',
            element: (
              <StaffProtectedLayout>
                <LazyPage><StaffRevenuePage /></LazyPage>
              </StaffProtectedLayout>
            ),
          },
          {
            path: 'revenue/result',
            element: (
              <StaffProtectedLayout>
                <LazyPage><StaffRevenueResultPage /></LazyPage>
              </StaffProtectedLayout>
            ),
          },
          {
            index: true,
            element: <Navigate to="/staff/menu" replace />,
          },
        ],
      },

      // Admin Routes
      {
        path: '/',
        element: (
          <ProtectedLayout>
            <AppLayout />
          </ProtectedLayout>
        ),
        children: [
          {
            path: 'dashboard',
            element: <LazyPage><DashboardPage /></LazyPage>,
          },
          {
            index: true,
            element: <Navigate to="/dashboard" replace />,
          },
          {
            path: 'employees',
            element: <LazyPage><EmployeesPage /></LazyPage>,
          },
          {
            path: 'employees/add',
            element: <LazyPage><AddEmployeePage /></LazyPage>,
          },
          {
            path: 'employees/:id/edit',
            element: <LazyPage><EditEmployeePage /></LazyPage>,
          },
          {
            path: 'positions',
            element: <LazyPage><PositionsPage /></LazyPage>,
          },
          {
            path: 'schedule',
            element: <LazyPage><SchedulePage /></LazyPage>,
          },
          {
            path: 'attendance',
            element: <LazyPage><AttendancePage /></LazyPage>,
          },
          {
            path: 'payroll',
            element: <LazyPage><PayrollPage /></LazyPage>,
          },
          {
            path: 'adjustments',
            element: <LazyPage><AdjustmentsPage /></LazyPage>,
          },
          {
            path: 'revenue',
            element: <LazyPage><RevenuePage /></LazyPage>,
          },
          {
            path: 'activity-logs',
            element: <LazyPage><ActivityLogPage /></LazyPage>,
          },
        ],
      },
      {
        path: '/payroll/export',
        element: (
          <ProtectedLayout>
            <LazyPage><PayrollExportPage /></LazyPage>
          </ProtectedLayout>
        ),
      },
    ],
  },
])
