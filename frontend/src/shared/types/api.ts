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
  salaryService: number
  salaryBar: number
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
  salaryService?: number
  salaryBar?: number
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
  salaryService?: number
  salaryBar?: number
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
  isActive: boolean
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
  checkIn?: string
  checkOut?: string
  status: AttendanceStatus
  createdAt: string
}

/* ======================================================
   PAYROLL
====================================================== */

export interface Payroll {
  id: number
  employeeId: number
  month: string
  totalHours: number
  baseSalary: number
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
