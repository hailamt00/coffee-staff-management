import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from '@/app/App'
import LoginPage from '@/features/auth/pages/LoginPage'
import DashboardPage from '@/features/dashboard/pages/DashboardPage'
import AppLayout from '@/shared/layout/AppLayout'
import ProtectedLayout from '@/shared/components/ProtectedLayout'
import PublicRoute from '@/shared/components/PublicLayout'
import EmployeesPage from '@/features/employees/pages/EmployeesPage'
import PositionsPage from '@/features/positions/pages/PositionsPage'
import AttendancePage from '@/features/attendance/pages/AttendancePage'
import LeaveRequestsPage from '@/features/leave-requests/pages/LeaveRequestsPage'
import PayrollPage from '@/features/payroll/pages/PayrollPage'
import AdjustmentsPage from '@/features/adjustments/page/AdjustmentsPage'
import UsersPage from '@/features/users/pages/UsersPage'
import RolesPage from '@/features/roles/pages/RolesPage'
import SettingsPage from '@/features/settings/page/SettingsPage'
import ReportsPage from '@/features/reports/pages/ReportPage'
import ActivityLogPage from '@/features/activity-log/pages/ActivityPage'
import AttendanceQrPage from '@/features/attendance/pages/AttendanceQrPage'
import AddEmployeePage from '@/features/employees/pages/AddEmployeePage'
import EditEmployeePage from '@/features/employees/pages/EditEmployeePage'

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/login',
        element: (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        ),
      },
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
            element: <DashboardPage />,
          },
          {
            index: true,
            element: <Navigate to="/dashboard" replace />,
          },
          {
            path: '/employees',
            element: <EmployeesPage />,
          },
          {
            path: '/employees/add',
            element: <AddEmployeePage />,
          },
          {
            path: '/employees/:id/edit',
            element: <EditEmployeePage />,
          },
          {
            path: 'positions',
            element: <PositionsPage />,
          },
          {
            path: 'attendance',
            element: <AttendancePage />,
          },
          {
            path: 'leave-requests',
            element: <LeaveRequestsPage />,
          },
          {
            path: 'payroll',
            element: <PayrollPage />,
          },
          {
            path: 'adjustments',
            element: <AdjustmentsPage />,
          },
          {
            path: 'users',
            element: <UsersPage />,
          },
          {
            path: 'roles',
            element: <RolesPage />,
          },
          {
            path: 'settings',
            element: <SettingsPage />,
          },
          {
            path: 'reports',
            element: <ReportsPage />,
          },
          {
            path: 'activity-logs',
            element: <ActivityLogPage />,
          },
          {
            path: 'attendance-qr',
            element: <AttendanceQrPage />,
          }
        ],
      },
    ],
  },
])
