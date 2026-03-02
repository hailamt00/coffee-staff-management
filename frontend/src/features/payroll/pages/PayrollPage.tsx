import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { usePayroll } from '../hooks/usePayroll'
import { useEmployee } from '@/features/employees/hooks/useEmployee'
import { useAdjustment } from '@/features/adjustments/hooks/useAdjustment'
import { MultiSelect } from '@/shared/components/ui/multi-select'

import { Button } from '@/shared/components/ui/button'
import { Label } from '@/shared/components/ui/label'
import { Input } from '@/shared/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import { FileUp, Play } from 'lucide-react'
import { formatDate, formatMoney } from '@/shared/utils/format'
import { DataTable } from '@/shared/components/ui/data-table'
import { Card } from '@/shared/components/ui/card'
import type { ColumnDef } from '@tanstack/react-table'
import type { PayrollDetail } from '@/shared/types/api'

export default function PayrollPage() {
  const [startDate, setStartDate] = useState(() => {
    const today = new Date()
    const firstDay = new Date(today.getFullYear(), today.getMonth(), 1)
    return `${firstDay.getFullYear()}-${String(firstDay.getMonth() + 1).padStart(2, '0')}-01`
  })
  const [endDate, setEndDate] = useState(() => {
    const today = new Date()
    const lastDay = new Date(today.getFullYear(), today.getMonth() + 1, 0)
    return `${lastDay.getFullYear()}-${String(lastDay.getMonth() + 1).padStart(2, '0')}-${String(lastDay.getDate()).padStart(2, '0')}`
  })
  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([])
  const [positionFilter, setPositionFilter] = useState('all')
  const [missingFilter, setMissingFilter] = useState(false)

  const [queryStartDate, setQueryStartDate] = useState(startDate)
  const [queryEndDate, setQueryEndDate] = useState(endDate)
  const [queryEmployeeIds, setQueryEmployeeIds] = useState<string[]>([])
  const [queryPositionFilter, setQueryPositionFilter] = useState('all')
  const [queryMissingFilter, setQueryMissingFilter] = useState(false)

  // Derive month/year from queryStartDate explicitly for the backend
  const queryMonthParam = new Date(queryStartDate).getMonth() + 1
  const queryYearParam = new Date(queryStartDate).getFullYear()

  const { usePayrolls, loading: mutationLoading, generatePayroll } = usePayroll()
  const { data: rawPayrolls = [], isLoading: queryLoading } = usePayrolls(queryMonthParam, queryYearParam)
  const { useAdjustments } = useAdjustment()
  const { data: rawAdjustments = [], isLoading: adjustmentsLoading } = useAdjustments(queryMonthParam, queryYearParam)
  const { employees } = useEmployee()

  const loading = mutationLoading || queryLoading || adjustmentsLoading


  const handleGenerate = async () => {
    const genMonth = new Date(startDate).getMonth() + 1
    const genYear = new Date(startDate).getFullYear()
    await generatePayroll(0, genMonth, genYear)
  }

  const handleFilter = () => {
    setQueryStartDate(startDate)
    setQueryEndDate(endDate)
    setQueryEmployeeIds(selectedEmployeeIds)
    setQueryPositionFilter(positionFilter)
    setQueryMissingFilter(missingFilter)
  }

  // Filter payroll records
  const payrolls = useMemo(() => {
    return rawPayrolls.filter(record => {
      const employeeMatch = queryEmployeeIds.length === 0 || queryEmployeeIds.includes(String(record.employeeId))
      const positionMatch = queryPositionFilter === 'all' ||
        (queryPositionFilter === 'phache' && (record.positionName?.toLowerCase().includes('pha chế') || record.positionName?.toLowerCase().includes('barista'))) ||
        (queryPositionFilter === 'phucvu' && (record.positionName?.toLowerCase().includes('phục vụ') || record.positionName?.toLowerCase().includes('server')))
      return employeeMatch && positionMatch
    })
  }, [rawPayrolls, queryEmployeeIds, queryPositionFilter])

  // Flatten and filter details
  const allDetails = useMemo(() => {
    return payrolls.flatMap(p =>
      (p.details || []).map(d => ({
        ...d,
        computedEmployeeName: p.employeeName || `Staff #${p.employeeId}`,
        employeeId: p.employeeId
      }))
    ).filter(record => {
      const positionMatch = queryPositionFilter === 'all' ||
        (queryPositionFilter === 'phache' && (record.positionName?.toLowerCase().includes('pha chế') || record.positionName?.toLowerCase().includes('barista'))) ||
        (queryPositionFilter === 'phucvu' && (record.positionName?.toLowerCase().includes('phục vụ') || record.positionName?.toLowerCase().includes('server')))

      const missingMatch = !queryMissingFilter || (!record.checkIn || !record.checkOut || record.status === 'Vắng' || record.status === 'Absent')

      const workDate = new Date(record.workDate)
      const start = new Date(queryStartDate)
      const end = new Date(queryEndDate)
      end.setHours(23, 59, 59, 999)
      const dateMatch = workDate >= start && workDate <= end

      return positionMatch && missingMatch && dateMatch
    })
  }, [payrolls, queryPositionFilter, queryMissingFilter, queryStartDate, queryEndDate])

  // Filter adjustments by range
  const filteredAdjustments = useMemo(() => {
    return rawAdjustments.filter(adj => {
      const adjDate = new Date(adj.createdAt)
      const start = new Date(queryStartDate)
      const end = new Date(queryEndDate)
      end.setHours(23, 59, 59, 999)

      const dateMatch = adjDate >= start && adjDate <= end
      const employeeMatch = queryEmployeeIds.length === 0 || queryEmployeeIds.includes(String(adj.employeeId))

      return dateMatch && employeeMatch
    })
  }, [rawAdjustments, queryStartDate, queryEndDate, queryEmployeeIds])

  // Aggregated Summary Data for the Range
  const summaryData = useMemo(() => {
    const summaryMap = new Map<number, {
      employeeId: number;
      employeeName: string;
      employeePhone: string;
      baseSalary: number;
      rewards: number;
      penalties: number;
      total: number;
    }>()

    // 1. Aggregate Base Salary from allDetails (which is already range-filtered)
    allDetails.forEach(detail => {
      const empId = detail.employeeId
      if (!summaryMap.has(empId)) {
        summaryMap.set(empId, {
          employeeId: empId,
          employeeName: detail.computedEmployeeName,
          employeePhone: employees.find(e => e.id === empId)?.phone || '',
          baseSalary: 0,
          rewards: 0,
          penalties: 0,
          total: 0
        })
      }
      summaryMap.get(empId)!.baseSalary += detail.amount
    })

    // 2. Aggregate Rewards and Penalties
    filteredAdjustments.forEach(adj => {
      const empId = adj.employeeId
      if (!summaryMap.has(empId)) {
        summaryMap.set(empId, {
          employeeId: empId,
          employeeName: adj.employeeName || `Staff #${empId}`,
          employeePhone: employees.find(e => e.id === empId)?.phone || '',
          baseSalary: 0,
          rewards: 0,
          penalties: 0,
          total: 0
        })
      }
      const entry = summaryMap.get(empId)!
      if (adj.kind === 'Reward') {
        entry.rewards += adj.amount
      } else {
        entry.penalties += adj.amount
      }
    })

    // 3. Compute Totals
    return Array.from(summaryMap.values()).map(item => ({
      ...item,
      total: item.baseSalary + item.rewards - item.penalties
    })).sort((a, b) => a.employeeName.localeCompare(b.employeeName))
  }, [allDetails, filteredAdjustments, employees])



  // --- Detail Columns ---
  const detailColumns = useMemo<ColumnDef<PayrollDetail & { computedEmployeeName: string }>[]>(() => [
    {
      id: "index",
      header: "No.",
      cell: ({ row, table }) => {
        const pageIndex = table.getState().pagination.pageIndex
        const pageSize = table.getState().pagination.pageSize
        const localIndex = table.getRowModel().rows.findIndex((r) => r.id === row.id)
        const displayIndex = pageIndex * pageSize + (localIndex >= 0 ? localIndex : row.index) + 1

        return <div className="text-center font-bold text-slate-500">{displayIndex}</div>
      },
      size: 50
    },
    {
      accessorKey: "workDate",
      header: "Date",
      cell: ({ row }) => <div className="font-semibold text-slate-700 dark:text-slate-300">{formatDate(String(row.getValue("workDate") ?? ""))}</div>
    },
    {
      accessorKey: "computedEmployeeName",
      header: "Employee",
      cell: ({ row }) => <div className="font-medium">{row.getValue("computedEmployeeName")}</div>
    },
    {
      accessorKey: "positionName",
      header: "Position",
      cell: ({ row }) => <div className="text-slate-500 font-medium text-xs uppercase">{row.getValue("positionName")}</div>
    },
    {
      id: "timeRange",
      header: () => <div className="text-center">Time</div>,
      cell: ({ row }) => (
        <div className="text-center font-medium font-mono">
          <span className="text-emerald-600">{row.original.checkIn || '--:--'}</span>
          <span className="mx-1 text-slate-400">-</span>
          <span className="text-blue-600">{row.original.checkOut || '--:--'}</span>
        </div>
      )
    },
    {
      accessorKey: "hours",
      header: () => <div className="text-center">Hours</div>,
      cell: ({ row }) => <div className="text-center font-bold text-slate-700">{row.getValue("hours")}</div>
    },
    {
      accessorKey: "rate",
      header: () => <div className="text-right">Rate</div>,
      cell: ({ row }) => <div className="text-right font-medium text-slate-500 text-xs italic">{formatMoney(row.getValue("rate"))}/hr</div>
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-right">Salary</div>,
      cell: ({ row }) => <div className="text-right font-bold text-emerald-600">{formatMoney(row.getValue("amount"))}</div>
    }
  ], [])


  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6 pb-20 max-w-7xl mx-auto"
    >
      {/* ===== Header ===== */}
      <div className="flex flex-wrap items-end justify-between gap-4 px-2">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
            Staff_Payroll_Report
          </h1>
          <p className="mt-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Payroll_Reports
          </p>
        </div>
      </div>

      {/* ===== Filters ===== */}
      <Card className="border border-slate-200/60 dark:border-neutral-800/60 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-sm rounded-xl p-5 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-end justify-between">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 flex-1 w-full">
            <div className="space-y-1.5">
              <Label htmlFor="startDateFilter" className="text-[10px] font-black uppercase tracking-widest text-slate-400">From Date</Label>
              <Input
                id="startDateFilter"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="h-9 bg-white/50 dark:bg-black/50 border-slate-200 dark:border-neutral-800 font-bold text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="endDateFilter" className="text-[10px] font-black uppercase tracking-widest text-slate-400">To Date</Label>
              <Input
                id="endDateFilter"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="h-9 bg-white/50 dark:bg-black/50 border-slate-200 dark:border-neutral-800 font-bold text-xs"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="positionFilter" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Position</Label>
              <Select value={positionFilter} onValueChange={setPositionFilter}>
                <SelectTrigger id="positionFilter" className="h-9 bg-white/50 dark:bg-black/50 border-slate-200 dark:border-neutral-800 font-bold text-xs">
                  <SelectValue placeholder="All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="phache">Barista</SelectItem>
                  <SelectItem value="phucvu">Server</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5 min-w-[200px]">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1.5">Employee</div>
              <div>
                <MultiSelect
                  options={employees.map(emp => ({ label: emp.name, value: String(emp.id) }))}
                  selectedValues={selectedEmployeeIds}
                  onChange={setSelectedEmployeeIds}
                  placeholder="Select employees..."
                />
              </div>
            </div>
            <div className="flex items-center gap-2 h-9 mt-auto">
              <input
                type="checkbox"
                id="missingInOut"
                className="rounded border-slate-300 w-4 h-4 text-black dark:text-white focus:ring-black dark:focus:ring-white"
                checked={missingFilter}
                onChange={(e) => setMissingFilter(e.target.checked)}
              />
              <Label htmlFor="missingInOut" className="text-[10px] font-black uppercase tracking-widest text-slate-400 cursor-pointer">
                Missing check-in/out
              </Label>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              className="h-9 bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-slate-200 border-none px-6 font-bold text-[10px] uppercase tracking-widest"
              onClick={handleFilter}
            >
              Filter
            </Button>
            <Button
              onClick={handleGenerate}
              disabled={loading}
              variant="outline"
              className="h-9 border-emerald-500 text-emerald-600 hover:bg-emerald-50 dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-950 font-bold text-[10px] uppercase tracking-widest px-4 transition-all"
            >
              <Play className="mr-2 h-3 w-3" />
              Calculate Payroll
            </Button>
          </div>
        </div>
      </Card>

      {/* ===== SUMMARY TABLE ===== */}
      <Card className="border border-slate-200/60 dark:border-neutral-800/60 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-sm rounded-xl overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-neutral-800/50 flex items-center justify-between">
          <h2 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
            Payroll_Summary
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-900 text-white dark:bg-white dark:text-black">
                <th className="text-left px-6 py-4 font-black uppercase tracking-widest text-[10px]">Name</th>
                <th className="text-right px-6 py-4 font-black uppercase tracking-widest text-[10px]">Salary</th>
                <th className="text-right px-6 py-4 font-black uppercase tracking-widest text-[10px]">Reward</th>
                <th className="text-right px-6 py-4 font-black uppercase tracking-widest text-[10px]">Penalty</th>
                <th className="text-right px-6 py-4 font-black uppercase tracking-widest text-[10px]">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-neutral-800">
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-10">
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-8 w-8 border-4 border-slate-200 border-t-black dark:border-t-white rounded-full animate-spin" />
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Loading...</span>
                    </div>
                  </td>
                </tr>
              ) : summaryData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-slate-400 font-bold uppercase tracking-widest text-[10px]">
                    No payroll data available
                  </td>
                </tr>
              ) : (
                summaryData.map((p) => (
                  <tr key={p.employeeId} className="hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-slate-900 dark:text-white">{p.employeeName}</div>
                      <div className="text-[10px] font-bold text-slate-400">{p.employeePhone}</div>
                    </td>
                    <td className="px-6 py-4 text-right font-medium tabular-nums">
                      {formatMoney(p.baseSalary)}
                    </td>
                    <td className="px-6 py-4 text-right font-bold tabular-nums text-emerald-600">
                      {p.rewards > 0 ? `+${formatMoney(p.rewards)}` : <span className="text-slate-300 dark:text-slate-700">0</span>}
                    </td>
                    <td className="px-6 py-4 text-right font-bold tabular-nums text-rose-600">
                      {p.penalties > 0 ? `-${formatMoney(p.penalties)}` : <span className="text-slate-300 dark:text-slate-700">0</span>}
                    </td>
                    <td className="px-6 py-4 text-right font-black tabular-nums text-slate-900 dark:text-white">
                      {formatMoney(p.total)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            {summaryData.length > 0 && (
              <tfoot className="bg-slate-50/50 dark:bg-white/5">
                <tr>
                  <td className="px-6 py-4 font-black text-slate-900 dark:text-white uppercase tracking-widest text-[10px]">Grand Total</td>
                  <td className="px-6 py-4 text-right font-black tabular-nums">
                    {formatMoney(summaryData.reduce((s, p) => s + p.baseSalary, 0))}
                  </td>
                  <td className="px-6 py-4 text-right font-black tabular-nums text-emerald-600">
                    {formatMoney(summaryData.reduce((s, p) => s + p.rewards, 0))}
                  </td>
                  <td className="px-6 py-4 text-right font-black tabular-nums text-rose-600">
                    {(() => { const t = summaryData.reduce((s, p) => s + p.penalties, 0); return t > 0 ? `-${formatMoney(t)}` : '0'; })()}
                  </td>
                  <td className="px-6 py-4 text-right font-black tabular-nums underline decoration-2 underline-offset-4">
                    {formatMoney(summaryData.reduce((s, p) => s + p.total, 0))}
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </Card>

      {/* ===== TIMEKEEPING DETAILS TABLE ===== */}
      <Card className="border border-slate-200/60 dark:border-neutral-800/60 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-sm rounded-xl overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-neutral-800/50">
          <h2 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
            Timekeeping_Details
          </h2>
          <Button
            className="h-8 bg-emerald-600 hover:bg-emerald-700 text-white dark:bg-emerald-500 dark:text-black dark:hover:bg-emerald-400 border-none px-4 font-bold text-[10px] uppercase tracking-widest shadow-md transition-all shadow-emerald-500/20"
          >
            <FileUp className="mr-2 h-4 w-4" />
            Export Excel
          </Button>
        </div>
        <div className="p-2">
          <DataTable
            columns={detailColumns}
            data={allDetails}
            loading={loading}
            initialSorting={[{ id: 'workDate', desc: false }]}
          />
        </div>
      </Card>
    </motion.div>
  )
}
