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
 * Employee returned from backend (EmployeeDto)
 */
export interface Employee {
  id: number
  code: string
  name: string
  phone: string
  cid: string | null
  gender: Gender
  serviceSalary: number
  baristaSalary: number
  dob: string | null
  hireDate: string
  createdAt: string
}

/**
 * Request to create an employee
 * - NO code (server-generated)
 * - name + phone required
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
 * Request to update an employee
 * - Used for PUT /employees/{id}
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
  positionName?: string
}

export interface CreateAttendancePayload {
  employeeId: number
  shiftId: number
  workDate: string
  checkIn?: string
  checkOut?: string
  note?: string
}

export interface UpdateAttendancePayload {
  attendanceId: number
  checkIn?: string
  checkOut?: string
  note?: string
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
  employeeName?: string
  employeePhone?: string
  shiftId: number
  shiftName?: string
  positionName?: string
  workDate: string
  checkIn?: string | null
  checkOut?: string | null
  totalHours?: number
  note?: string
  status: AttendanceStatus
  createdAt?: string
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
  employeePhone?: string
  positionName?: string
  month: number
  year: number

  totalHours: number
  baseSalary: number
  totalRewards: number
  totalPenalties: number
  totalLateMinutes: number

  totalSalary: number
  createdAt: string

  details?: PayrollDetail[]
}

export interface PayrollDetail {
  id: number
  workDate: string
  shiftName: string
  positionName: string
  checkIn?: string
  checkOut?: string
  status: string
  hours: number
  rate: number
  amount: number

  note?: string
}

export interface PayrollAdjustment {
  id: number
  payrollId: number
  amount: number
  reason?: string
  createdAt: string
}

/* ======================================================
   REWARD & PENALTY (ADJUSTMENTS)
====================================================== */

export interface RewardPenaltyType {
  id: number
  name: string
  type: 'Reward' | 'Penalty'
  amount: number
}

export interface RewardPenalty {
  id: number
  employeeId: number
  employeeName: string
  typeId: number
  typeName: string
  kind: 'Reward' | 'Penalty'
  amount: number
  reason?: string
  createdAt: string
}

export interface ApplyRewardPenaltyRequest {
  employeeId: number
  typeId: number
  amount: number
  reason?: string
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
  action: ActivityAction
  createdAt: string
}

/* ======================================================
   SCHEDULE
====================================================== */

export interface Schedule {
  id: number
  employeeId: number
  employeeCode: string
  employeeName: string
  shiftId: number
  shiftName: string
  positionName: string
  shiftStartTime: string
  shiftEndTime: string
  workDate: string
  note?: string
  shift?: Shift
  checkIn?: string | null
  checkOut?: string | null
}

export interface AddScheduleRequest {
  employeeId: number
  shiftIds: number[]
  workDate: string
  note?: string
}

export interface UpdateScheduleRequest {
  id: number
  shiftId: number
  workDate: string
  note?: string
}

export type ScheduleStatus = 'pending' | 'approved' | 'rejected'

export interface ScheduleRequest {
  requestId: number
  workDate: string
  shiftName: string
  positionName: string
  startTime: string
  endTime: string
  status: string
  employeeName?: string
  employeeCode?: string
  employeePhone?: string
  note?: string
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
  employeeName?: string
  shiftName?: string
  positionName?: string
  workDate?: string
  openingBalance: number
  cash: number
  bank: number
  income: number
  expenses: number
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


/* ======================================================
   DASHBOARD
====================================================== */

export interface DailyRevenue {
  date: string
  revenue: number
  target: number
}

export interface DashboardStats {
  totalRevenue: number
  netProfit: number
  attendanceRate: number
  activeStaff: number
  liveShifts: number
  totalReports: number
  chartData: DailyRevenue[]
}
