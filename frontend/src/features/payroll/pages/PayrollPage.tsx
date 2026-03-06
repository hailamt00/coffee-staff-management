import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { usePayroll } from '../hooks/usePayroll'
import { useEmployee } from '@/features/employees/hooks/useEmployee'
import { useAdjustment } from '@/features/adjustments/hooks/useAdjustment'
import { useAttendance } from '@/features/attendance/hooks/useAttendance'
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
import { FileUp, Calculator, Users, TrendingUp, TrendingDown, DollarSign, Filter } from 'lucide-react'
import { SummaryCard } from '@/shared/components/ui/summary-card'
import { formatDate, formatMoney } from '@/shared/utils/format'
import { useTranslation } from 'react-i18next'
import { DataTable } from '@/shared/components/ui/data-table'
import type { ColumnDef } from '@tanstack/react-table'

// Helper for Vietnamese title case
const toTitleCase = (str: string) => {
  return str.toLowerCase().split(' ').map(word =>
    word.charAt(0).toUpperCase() + word.slice(1)
  ).join(' ')
}

// Fixed robust time formatting instead of fragile new Date()
const formatTimeStr = (t: string) => {
  if (!t) return '--:--'
  // Most reliable: match HH:MM pattern directly
  const match = t.match(/(\d{2}:\d{2})/)
  return match ? match[1] : '--:--'
}

export default function PayrollPage() {
  const { t } = useTranslation()
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

  const queryMonthParam = new Date(queryStartDate).getMonth() + 1
  const queryYearParam = new Date(queryStartDate).getFullYear()

  const { usePayrolls, loading: mutationLoading, generatePayroll } = usePayroll()
  const { data: rawPayrolls = [], isLoading: payrollsLoading } = usePayrolls(queryMonthParam, queryYearParam)

  const { useAdjustments } = useAdjustment()
  const { data: rawAdjustments = [], isLoading: adjustmentsLoading } = useAdjustments(queryMonthParam, queryYearParam)

  const { useAttendanceRange } = useAttendance()
  const { data: rawAttendance = [], isLoading: attendanceLoading } = useAttendanceRange(queryStartDate, queryEndDate)

  const { employees } = useEmployee()

  const loading = mutationLoading || payrollsLoading || adjustmentsLoading || attendanceLoading

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

  const allDetails = useMemo(() => {
    const attendanceRecords = rawAttendance.map(a => {
      const emp = employees.find(e => e.id === a.employeeId)
      const isBarista = a.positionName?.toLowerCase().includes('pha chế') || a.positionName?.toLowerCase().includes('barista')
      const rate = isBarista ? (emp?.baristaSalary || 0) : (emp?.serviceSalary || 0)
      const hours = a.totalHours || 0
      return {
        workDate: a.workDate,
        shiftName: a.shiftName,
        positionName: a.positionName,
        checkIn: a.checkIn,
        checkOut: a.checkOut,
        status: a.status,
        hours: hours,
        rate: rate,
        amount: rate * hours,
        employeeId: a.employeeId,
        employeeName: a.employeeName,
        note: a.note
      }
    })

    const baseRecords = rawPayrolls.length > 0
      ? [
        ...rawPayrolls.flatMap(p => (p.details || []).map(d => ({ ...d, employeeId: p.employeeId, employeeName: p.employeeName }))),
        ...attendanceRecords.filter(a => !a.checkOut)
      ]
      : attendanceRecords

    return baseRecords.filter(record => {
      const employeeMatch = queryEmployeeIds.length === 0 || queryEmployeeIds.includes(String(record.employeeId))
      const positionMatch = queryPositionFilter === 'all' ||
        (queryPositionFilter === 'barista' && (record.positionName?.toLowerCase().includes('pha chế') || record.positionName?.toLowerCase().includes('barista'))) ||
        (queryPositionFilter === 'server' && (record.positionName?.toLowerCase().includes('phục vụ') || record.positionName?.toLowerCase().includes('server')))

      const missingMatch = !queryMissingFilter || (!record.checkIn || !record.checkOut || record.status === 'Vắng' || record.status === 'Absent')

      const workDate = new Date(record.workDate)
      const start = new Date(queryStartDate)
      const end = new Date(queryEndDate)
      end.setHours(23, 59, 59, 999)
      const dateMatch = workDate >= start && workDate <= end

      return employeeMatch && positionMatch && missingMatch && dateMatch
    })
  }, [rawPayrolls, rawAttendance, queryEmployeeIds, queryPositionFilter, queryMissingFilter, queryStartDate, queryEndDate, employees])

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

  const summaryData = useMemo(() => {
    const summaryMap = new Map<number, any>()
    allDetails.forEach(detail => {
      const empId = detail.employeeId
      if (!summaryMap.has(empId)) {
        summaryMap.set(empId, {
          employeeId: empId,
          employeeName: detail.employeeName || `Staff #${empId}`,
          employeePhone: employees.find(e => e.id === empId)?.phone || '',
          baseSalary: 0, rewards: 0, penalties: 0, total: 0
        })
      }
      summaryMap.get(empId).baseSalary += (detail.amount || 0)
    })
    filteredAdjustments.forEach(adj => {
      const empId = adj.employeeId
      if (!summaryMap.has(empId)) {
        summaryMap.set(empId, {
          employeeId: empId,
          employeeName: adj.employeeName || `Staff #${empId}`,
          employeePhone: employees.find(e => e.id === empId)?.phone || '',
          baseSalary: 0, rewards: 0, penalties: 0, total: 0
        })
      }
      const entry = summaryMap.get(empId)
      if (adj.kind === 'Reward') entry.rewards += adj.amount
      else entry.penalties += adj.amount
    })
    return Array.from(summaryMap.values()).map(item => ({
      ...item, total: item.baseSalary + item.rewards - item.penalties
    })).sort((a, b) => a.employeeName.localeCompare(b.employeeName))
  }, [allDetails, filteredAdjustments, employees])

  const globalStats = useMemo(() => {
    const base = summaryData.reduce((s, p) => s + p.baseSalary, 0)
    const rewards = summaryData.reduce((s, p) => s + p.rewards, 0)
    const penalties = summaryData.reduce((s, p) => s + p.penalties, 0)
    const total = base + rewards - penalties
    const count = summaryData.length
    return { total, base, rewards, penalties, count }
  }, [summaryData])

  const summaryColumns = useMemo<ColumnDef<any>[]>(() => [
    {
      accessorKey: "employeeName",
      header: t('payroll.table.staff'),
      footer: () => <div className="text-left py-2">{t('payroll.table.total')}</div>,
      meta: { hideSortIcon: true },
      cell: ({ row }) => (
        <div className="flex flex-col py-1">
          <span className="font-bold text-slate-900 leading-tight">{toTitleCase(row.original.employeeName)}</span>
          <span className="text-[10px] font-bold text-slate-400 font-mono tracking-tight">{row.original.employeePhone}</span>
        </div>
      )
    },
    {
      accessorKey: "baseSalary",
      header: t('payroll.table.base'),
      footer: () => <div className="text-right py-2">{formatMoney(globalStats.base)}</div>,
      meta: { align: 'right', hideSortIcon: true },
      cell: ({ row }) => <div className="text-right font-medium text-slate-600 tabular-nums">{formatMoney(row.original.baseSalary)}</div>
    },
    {
      accessorKey: "rewards",
      header: t('payroll.table.reward'),
      footer: () => <div className="text-right py-2 text-emerald-600">{formatMoney(globalStats.rewards)}</div>,
      meta: { align: 'right', hideSortIcon: true },
      cell: ({ row }) => <div className="text-right font-black text-emerald-600 tabular-nums">{row.original.rewards > 0 ? `+${formatMoney(row.original.rewards)}` : '0'}</div>
    },
    {
      accessorKey: "penalties",
      header: t('payroll.table.penalty'),
      footer: () => <div className="text-right py-2 text-rose-500">{formatMoney(globalStats.penalties)}</div>,
      meta: { align: 'right', hideSortIcon: true },
      cell: ({ row }) => <div className="text-right font-black text-rose-500 tabular-nums">{row.original.penalties > 0 ? `-${formatMoney(row.original.penalties)}` : '0'}</div>
    },
    {
      accessorKey: "total",
      header: t('payroll.table.netTotal'),
      footer: () => <div className="text-right py-2 border-t-2 border-indigo-500/20">{formatMoney(globalStats.total)}</div>,
      meta: { align: 'right', hideSortIcon: true },
      cell: ({ row }) => (
        <div className="text-right font-black text-slate-900 dark:text-white underline decoration-2 underline-offset-4 decoration-indigo-500/30 tabular-nums">
          {formatMoney(row.original.total)}
        </div>
      )
    }
  ], [globalStats, t])

  const detailColumns = useMemo<ColumnDef<any>[]>(() => [
    {
      id: "index",
      header: "#",
      meta: { hideSortIcon: true },
      cell: ({ row, table }) => {
        const pageIndex = table.getState().pagination.pageIndex
        const pageSize = table.getState().pagination.pageSize
        const localIndex = table.getRowModel().rows.findIndex((r) => r.id === row.id)
        const displayIndex = pageIndex * pageSize + (localIndex >= 0 ? localIndex : row.index) + 1
        return <span className="font-mono text-[10px] text-slate-400">{displayIndex}</span>
      },
      size: 50
    },
    {
      accessorKey: "workDate",
      header: t('payroll.table.timeline'),
      meta: { align: 'center', hideSortIcon: true },
      cell: ({ row }) => (
        <div className="flex flex-col gap-0.5 items-center">
          <span className="font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap">
            {formatDate(row.original.workDate)}
          </span>
          <span className="text-[10px] text-slate-400 font-black tracking-tighter uppercase">
            {row.original.shiftName}
          </span>
        </div>
      )
    },
    {
      accessorKey: "employeeName",
      header: t('payroll.table.staff'),
      meta: { hideSortIcon: true },
      cell: ({ row }) => <div className="font-bold text-slate-900">{toTitleCase(row.original.employeeName)}</div>
    },
    {
      accessorKey: "positionName",
      header: t('payroll.table.position'),
      meta: { hideSortIcon: true },
      cell: ({ row }) => <div className="text-[11px] text-slate-500 font-medium">{row.original.positionName}</div>
    },
    {
      accessorKey: "checkIn",
      id: "checkIn", // Ensure ID matches sorting field
      header: t('payroll.table.times'),
      meta: { align: 'center', hideSortIcon: true },
      cell: ({ row }) => {
        const checkIn = row.original.checkIn;
        const checkOut = row.original.checkOut;
        return (
          <div className="text-center font-mono text-[11px] font-bold text-slate-600">
            {formatTimeStr(checkIn)} - <span className={!checkOut ? "bg-amber-100 text-amber-700 px-1 rounded" : ""}>{formatTimeStr(checkOut)}</span>
          </div>
        )
      }
    },
    {
      accessorKey: "hours",
      header: t('payroll.table.hours'),
      meta: { align: 'center', hideSortIcon: true },
      cell: ({ row }) => (
        <div className="text-center font-black tabular-nums text-slate-900">
          {row.original.hours > 0 ? row.original.hours : "—"}
        </div>
      )
    },
    {
      accessorKey: "amount",
      header: t('payroll.table.earnings'),
      meta: { align: 'right', hideSortIcon: true },
      cell: ({ row }) => <div className="text-right font-bold text-emerald-600 tabular-nums">{formatMoney(row.original.amount || 0)}</div>
    }
  ], [t])

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6 pb-20"
    >
      {/* HEADER */}
      <div className="flex flex-col gap-6 px-1">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
              {t('payroll.title')}
            </h1>
            <div className="mt-1 flex items-center gap-2">
              <div className={`h-1.5 w-1.5 rounded-full ${rawPayrolls.length > 0 ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest leading-none">
                {rawPayrolls.length > 0 ? t('payroll.databaseVerified') : t('payroll.manualEstimation')}
              </p>
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={loading}
            className="h-10 border-none bg-black text-[10px] font-bold uppercase tracking-widest text-white hover:bg-slate-800 w-10 sm:w-auto sm:px-6 rounded-xl dark:bg-white dark:text-black dark:hover:bg-neutral-200 shadow-sm"
          >
            <Calculator className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">{t('payroll.actions.recalculate')}</span>
          </Button>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col gap-3 bg-slate-50 dark:bg-neutral-900 border border-slate-100 dark:border-neutral-800 p-4 rounded-[1.5rem]">
          <div className="flex items-center gap-2 mb-1">
            <Filter className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">{t('payroll.filters.title')}</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 items-end">
            <div className="space-y-1.5">
              <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">{t('payroll.filters.start')}</Label>
              <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="h-10 rounded-xl bg-white dark:bg-black border-none text-xs text-center shadow-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">{t('payroll.filters.end')}</Label>
              <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="h-10 rounded-xl bg-white dark:bg-black border-none text-xs text-center shadow-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">{t('payroll.filters.position')}</Label>
              <Select value={positionFilter} onValueChange={setPositionFilter}>
                <SelectTrigger className="h-10 rounded-xl bg-white dark:bg-black border-none text-xs shadow-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t('common.all') || "All"}</SelectItem>
                  <SelectItem value="barista">{t('dashboard.barista')}</SelectItem>
                  <SelectItem value="server">{t('dashboard.service')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="col-span-2 sm:col-span-1 space-y-1.5">
              <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">{t('payroll.filters.employees')}</Label>
              <MultiSelect
                options={employees.map(e => ({ label: e.name, value: String(e.id) }))}
                selectedValues={selectedEmployeeIds}
                onChange={setSelectedEmployeeIds}
                placeholder={t('payroll.filters.allStaff') || "All staff"}
              />
            </div>
            <div className="flex items-center gap-3 h-10 px-4 bg-white dark:bg-black border border-transparent dark:border-neutral-800 rounded-xl shadow-sm">
              <input
                type="checkbox"
                id="missingPayroll"
                className="w-4 h-4 accent-black dark:accent-white rounded-md cursor-pointer"
                checked={missingFilter}
                onChange={(e) => setMissingFilter(e.target.checked)}
              />
              <Label htmlFor="missingPayroll" className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 cursor-pointer select-none">
                {t('payroll.filters.exceptions')}
              </Label>
            </div>
            <Button
              className="h-10 bg-black text-white dark:bg-white dark:text-black hover:bg-slate-800 dark:hover:bg-neutral-200 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-sm"
              onClick={handleFilter}
            >
              {t('payroll.actions.apply')}
            </Button>
          </div>
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <SummaryCard
          title={t('payroll.stats.base')}
          value={formatMoney(globalStats.base)}
          description={t('payroll.stats.employees', { count: globalStats.count })}
          icon={Users}
          color="cyan"
        />
        <SummaryCard
          title={t('payroll.stats.rewards')}
          value={formatMoney(globalStats.rewards)}
          description={t('payroll.stats.incentives')}
          icon={TrendingUp}
          color="green"
        />
        <SummaryCard
          title={t('payroll.stats.penalties')}
          value={formatMoney(globalStats.penalties)}
          description={t('payroll.stats.deductions')}
          icon={TrendingDown}
          color="red"
        />
        <SummaryCard
          title={t('payroll.stats.net')}
          value={formatMoney(globalStats.total)}
          description={t('payroll.stats.payout')}
          icon={DollarSign}
          color="cyan"
        />
      </div>

      {/* PAYROLL SUMMARY */}
      <div className="px-1">
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-slate-100 dark:border-neutral-800 shadow-sm overflow-hidden">
          <DataTable
            columns={summaryColumns}
            data={summaryData}
            loading={loading}
            searchKey="employeeName"
            defaultPageSize={50}
            showFooter={true}
            hideToolbar={true}
          />
        </div>
      </div>

      {/* WORK LOGS */}
      <div className="px-1">
        <div className="mb-4 flex items-end justify-between">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">
            {t('payroll.table.workLogs')}
          </h2>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              const exportPayload = {
                data: allDetails,
                summaryData,
                startDate,
                endDate
              }
              localStorage.setItem('payrollExportData', JSON.stringify(exportPayload))
              window.open('/payroll/export', '_blank')
            }}
            className="h-9 rounded-xl border-none bg-[#28a745] text-white hover:bg-[#218838] text-[10px] font-bold uppercase tracking-widest px-4 transition-all shadow-sm"
          >
            <FileUp className="h-4 w-4 mr-2" /> {t('payroll.actions.generatePayslip')}
          </Button>
        </div>
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-slate-100 dark:border-neutral-800 shadow-sm overflow-hidden">
          <DataTable
            columns={detailColumns}
            data={allDetails}
            loading={loading}
            initialSorting={[{ id: 'workDate', desc: true }, { id: 'checkIn', desc: true }]}
            defaultPageSize={100}
          />
        </div>
      </div>
    </motion.div>
  )
}
