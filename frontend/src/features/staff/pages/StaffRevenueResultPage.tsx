import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import {
  formatDateTimeInVietnam,
  formatRevenueHeaderDateTime,
} from '@/shared/utils/datetime'
import {
  STAFF_REVENUE_RESULT_KEY,
  type StaffRevenueResultData,
} from '@/features/staff/types/revenueResult'

function parseStoredResult(): StaffRevenueResultData | null {
  const raw = localStorage.getItem(STAFF_REVENUE_RESULT_KEY)
  if (!raw) return null

  try {
    return JSON.parse(raw) as StaffRevenueResultData
  } catch {
    return null
  }
}

export default function StaffRevenueResultPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const stateResult = (location.state as StaffRevenueResultData | null) ?? null
  const result = stateResult ?? parseStoredResult()

  const staffJson = localStorage.getItem('staffInfo')
  const staff = staffJson ? JSON.parse(staffJson) : null

  useEffect(() => {
    if (!staff) navigate('/staff/login')
  }, [staff, navigate])

  useEffect(() => {
    if (stateResult) {
      localStorage.setItem(STAFF_REVENUE_RESULT_KEY, JSON.stringify(stateResult))
    }
  }, [stateResult])

  if (!result) {
    return (
      <div className="space-y-4 pb-10">
        <Card className="border border-slate-200/60 dark:border-neutral-800/60 bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-sm">
          <CardContent className="p-6 space-y-3">
            <h2 className="text-xl font-black text-slate-900 dark:text-white">No result data</h2>
            <p className="text-sm text-slate-500">Please complete the confirmation step on the End Shift Report page first.</p>
            <Button onClick={() => navigate('/staff/revenue')} className="bg-black text-white hover:bg-slate-800">
              Back to End Shift Report
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const titleTime = formatRevenueHeaderDateTime(result.submittedAt)
  const fullTime = formatDateTimeInVietnam(result.submittedAt)
  const expenseReasonText = result.expenseReasons.length > 0 ? result.expenseReasons.join(' + ') : '—'
  const incomeReasonText = result.incomeReasons.length > 0 ? result.incomeReasons.join(' + ') : '—'
  const deviationClass =
    result.deviation === 0
      ? 'text-slate-500'
      : result.deviation > 0
        ? 'text-amber-600'
        : 'text-rose-600'

  return (
    <div className="space-y-5 pb-10">
      <div className="px-2">
        <h1 className="text-2xl font-black tracking-tight text-blue-600">
          Shift Results [{titleTime}]
        </h1>
      </div>

      <Card className="border border-slate-200/60 dark:border-neutral-800/60 bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <tbody>
                <ResultRow label="Date & Time" value={fullTime} />
                <ResultRow label="Opening" value={result.openingBalance.toLocaleString()} />
                <ResultRow label="Cash" value={result.cash.toLocaleString()} />
                <ResultRow label="Bank" value={result.bank.toLocaleString()} />
                <ResultRow
                  label="Expenses"
                  value={(
                    <div className="space-y-1">
                      <div className="font-semibold">{result.totalExpenses.toLocaleString()}</div>
                      <div className="text-xs text-slate-500 leading-relaxed">{expenseReasonText}</div>
                    </div>
                  )}
                />
                <ResultRow
                  label="Incomes"
                  value={(
                    <div className="space-y-1">
                      <div className="font-semibold">{result.totalIncomes.toLocaleString()}</div>
                      <div className="text-xs text-slate-500 leading-relaxed">{incomeReasonText}</div>
                    </div>
                  )}
                />
                <ResultRow label="Net Revenue" value={result.netRevenue.toLocaleString()} />
                <ResultRow label="Actual Revenue" value={result.actualRevenue.toLocaleString()} />
                <ResultRow label="Deviation" value={result.deviation.toLocaleString()} valueClassName={`font-black ${deviationClass}`} />
                <ResultRow label="Notes" value={result.note || '—'} />
                <ResultRow label="Closing Staff" value={result.employeeName} />
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-xl border border-emerald-200 bg-emerald-50 text-emerald-700 p-4 text-sm font-semibold">
        Shift results have been saved and synced to the Admin Revenue module.
      </div>

      <div className="flex gap-3">
        <Button
          variant="outline"
          className="flex-1 h-12 rounded-xl font-bold border-slate-200 dark:border-neutral-800"
          onClick={() => navigate('/staff/revenue')}
        >
          New Report
        </Button>
        <Button
          className="flex-1 h-12 bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-slate-200 rounded-xl font-bold"
          onClick={() => navigate('/staff/menu')}
        >
          Back to Menu
        </Button>
      </div>
    </div>
  )
}

function ResultRow({ label, value, valueClassName }: {
  label: string
  value: React.ReactNode
  valueClassName?: string
}) {
  return (
    <tr className="border-b border-slate-100 dark:border-neutral-800 last:border-0">
      <td className="px-4 py-4 text-[13px] font-bold text-slate-600 uppercase tracking-wide whitespace-nowrap w-[36%]">
        {label}
      </td>
      <td className={`px-4 py-4 text-right text-base tabular-nums ${valueClassName ?? 'font-semibold text-slate-800 dark:text-slate-200'}`}>
        {value}
      </td>
    </tr>
  )
}
