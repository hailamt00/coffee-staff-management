import { createBrowserRouter, Navigate } from 'react-router-dom'
import App from '@/app/App'
import AppLayout from '@/shared/layout/AppLayout'
import ProtectedLayout from '@/shared/components/ProtectedLayout'
import PublicRoute from '@/shared/components/PublicLayout'
import StaffLayout from '@/shared/layout/StaffLayout'

// Auth Pages
import LoginPage from '@/features/auth/pages/LoginPage'
import StaffLoginPage from '@/features/auth/pages/StaffLoginPage'

// Admin Pages
import DashboardPage from '@/features/dashboard/pages/DashboardPage'
import EmployeesPage from '@/features/employees/pages/EmployeesPage'
import AddEmployeePage from '@/features/employees/pages/AddEmployeePage'
import EditEmployeePage from '@/features/employees/pages/EditEmployeePage'
import PositionsPage from '@/features/positions/pages/PositionsPage'
import SchedulePage from '@/features/schedule/pages/SchedulePage'
import AttendancePage from '@/features/attendance/pages/AttendancePage'
import PayrollPage from '@/features/payroll/pages/PayrollPage'
import AdjustmentsPage from '@/features/adjustments/page/AdjustmentsPage'
import RevenuePage from '@/features/revenue/pages/RevenuePage'
import ActivityLogPage from '@/features/activity-log/pages/ActivityPage'

// Staff Pages
import StaffMenuPage from '@/features/staff/pages/StaffMenuPage'
import StaffAttendancePage from '@/features/attendance/pages/StaffAttendancePage'
import StaffSchedulePage from '@/features/schedule/pages/StaffSchedulePage'
import StaffRevenuePage from '@/features/staff/pages/StaffRevenuePage'

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
            element: <StaffMenuPage />,
          },
          {
            path: 'attendance',
            element: <StaffAttendancePage />,
          },
          {
            path: 'schedule',
            element: <StaffSchedulePage />,
          },
          {
            path: 'revenue',
            element: <StaffRevenuePage />,
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
            element: <DashboardPage />,
          },
          {
            index: true,
            element: <Navigate to="/dashboard" replace />,
          },
          {
            path: 'employees',
            element: <EmployeesPage />,
          },
          {
            path: 'employees/add',
            element: <AddEmployeePage />,
          },
          {
            path: 'employees/:id/edit',
            element: <EditEmployeePage />,
          },
          {
            path: 'positions',
            element: <PositionsPage />,
          },
          {
            path: 'schedule',
            element: <SchedulePage />,
          },
          {
            path: 'attendance',
            element: <AttendancePage />,
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
            path: 'revenue',
            element: <RevenuePage />,
          },
          {
            path: 'activity-logs',
            element: <ActivityLogPage />,
          },
        ],
      },
    ],
  },
])
