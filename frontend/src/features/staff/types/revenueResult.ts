export const STAFF_REVENUE_RESULT_KEY = 'staffRevenueResult'

export interface StaffRevenueResultData {
  revenueId: number
  submittedAt: string
  employeeName: string
  openingBalance: number
  cash: number
  bank: number
  totalExpenses: number
  totalIncomes: number
  expenseReasons: string[]
  incomeReasons: string[]
  actualRevenue: number
  netRevenue: number
  deviation: number
  note?: string
}
