/* ======================================================
   AUTH / ADMIN
====================================================== */

export type AdminRole = 'Admin'

export interface Admin {
  id: number
  username: string
  role: AdminRole
  createdAt?: string
}

export interface AuthState {
  admin: Admin | null
  token: string | null
  refreshToken: string | null
  isAuthenticated: boolean
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
  refreshToken: string
  admin: Admin
}

/* ======================================================
   COMMON
====================================================== */

export type ApiErrorResponse = {
  message: string
}

/* ======================================================
/* ======================================================
   EMPLOYEE
====================================================== */

export type Gender = 'Male' | 'Female' | 'Other' | null

/**
 * Employee trả về từ backend (EmployeeDto)
 */
export interface Employee {
  id: number
  code: string
  name: string
  phone: string
  cid?: string | null
  gender?: Gender
  serviceSalary: number
  baristaSalary: number
  dob?: string | null
  hireDate: string
  createdAt: string
}

/**
 * Request tạo employee
 * - KHÔNG có code (server tự sinh)
 * - name + phone bắt buộc
 */
export interface CreateEmployeeRequest {
  name: string
  phone: string
  cid?: string | null
  gender?: Gender
  dob?: string | null
  hireDate?: string | null
  serviceSalary?: number
  baristaSalary?: number
}

/**
 * Request update employee
 * - Dùng cho PUT /employees/{id}
 */
export interface UpdateEmployeeRequest {
  name: string
  phone: string
  cid?: string | null
  gender?: Gender
  dob?: string | null
  hireDate?: string | null
  serviceSalary?: number
  baristaSalary?: number
}

/* ======================================================
/* ========= SHIFT ========= */
export interface Shift {
  id: number
  name: string
  startTime: string
  endTime: string
  isEnabled: boolean
}

/* ========= POSITION ========= */
export interface Position {
  id: number
  name: string
  status: boolean
  shifts?: Shift[]
}

/* ========= REQUEST ========= */
export interface SaveShiftRequest {
  id?: number
  name: string
  startTime: string
  endTime: string
  isEnabled: boolean
}

export interface CreatePositionRequest {
  name: string
  shifts: SaveShiftRequest[]
}

export interface UpdatePositionRequest {
  name: string
  shifts: SaveShiftRequest[]
}

/* ======================================================
   ATTENDANCE
====================================================== */

export type AttendanceStatus = 'present' | 'absent' | 'late'

export interface Attendance {
  id: number
  employeeId: number
  shiftId: number
  workDate: string
  checkIn?: string | null
  checkOut?: string | null
  status: AttendanceStatus
  createdAt: string
}

export interface CheckInRequest {
  employeeId: number
  shiftId: number
  workDate: string
}

export interface CheckOutRequest {
  employeeId: number
  shiftId: number
  workDate: string
}

/* ======================================================
   PAYROLL
====================================================== */

export interface Payroll {
  id: number
  employeeId: number
  employeeName?: string
  month: number
  year: number
  totalSalary: number
  createdAt: string
}

export interface PayrollAdjustment {
  id: number
  payrollId: number
  amount: number
  reason?: string
  createdAt: string
}

/* ======================================================
   ACTIVITY LOG
====================================================== */

export type ActivityAction =
  | 'CREATE'
  | 'UPDATE'
  | 'DELETE'
  | 'LOGIN'
  | 'LOGOUT'
  | 'APPROVE'
  | 'REJECT'

export interface ActivityLog {
  id: number
  adminId: number
  action: ActivityAction
  targetTable?: string
  targetId?: number
  createdAt: string
}

/* ======================================================
   SCHEDULE
====================================================== */

export interface Schedule {
  employeeCode: string
  employeeName: string
  shiftName: string
  workDate: string
}

export type ScheduleStatus = 'pending' | 'approved' | 'rejected'

export interface ScheduleRequest {
  requestId: number
  employeeCode: string
  employeeName: string
  shiftName: string
  workDate: string
  status: string
}

export interface CreateShiftRequest {
  employeeId: number
  shiftId: number
  workDate: string
  note?: string
}

export interface ApproveShiftRequest {
  requestId: number
  isApproved: boolean
}
/* ======================================================
   REVENUE & TRANSACTIONS
====================================================== */

export interface Transaction {
  id: number
  revenueId: number
  type: 'Income' | 'Expense'
  amount: number
  reason?: string
  createdAt: string
}

export interface Revenue {
  id: number
  scheduleId: number
  employeeId: number
  openingBalance: number
  cash: number
  bank: number
  net: number
  totalRevenue: number
  deviation: number
  note?: string
  createdAt: string
  transactions?: Transaction[]
}

export interface CreateTransactionRequest {
  revenueId: number
  type: 'Income' | 'Expense'
  amount: number
  reason?: string
}

export interface CreateRevenueRequest {
  scheduleId: number
  openingBalance: number
  cash: number
  bank: number
  note?: string
}
