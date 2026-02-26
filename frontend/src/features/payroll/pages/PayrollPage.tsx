import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { usePayroll } from '../hooks/usePayroll'
import { useEmployee } from '@/features/employees/hooks/useEmployee'
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
import { formatMoney } from '@/shared/utils/format'
import { DataTable } from '@/shared/components/ui/data-table'
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
  const { employees } = useEmployee()

  const loading = mutationLoading || queryLoading

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
        (queryPositionFilter === 'phache' && record.positionName?.toLowerCase() === 'pha chế') ||
        (queryPositionFilter === 'phucvu' && record.positionName?.toLowerCase() === 'phục vụ')
      return employeeMatch && positionMatch
    })
  }, [rawPayrolls, queryEmployeeIds, queryPositionFilter])

  // Flatten and filter details
  const allDetails = useMemo(() => {
    return payrolls.flatMap(p =>
      (p.details || []).map(d => ({
        ...d,
        computedEmployeeName: p.employeeName || `NV #${p.employeeId}`,
        employeeId: p.employeeId
      }))
    ).filter(record => {
      const positionMatch = queryPositionFilter === 'all' ||
        (queryPositionFilter === 'phache' && record.positionName?.toLowerCase() === 'pha chế') ||
        (queryPositionFilter === 'phucvu' && record.positionName?.toLowerCase() === 'phục vụ')

      const missingMatch = !queryMissingFilter || (!record.checkIn || !record.checkOut || record.status === 'Vắng')

      const workDate = new Date(record.workDate)
      const start = new Date(queryStartDate)
      const end = new Date(queryEndDate)
      end.setHours(23, 59, 59, 999)
      const dateMatch = workDate >= start && workDate <= end

      return positionMatch && missingMatch && dateMatch
    })
  }, [payrolls, queryPositionFilter, queryMissingFilter, queryStartDate, queryEndDate])


  // --- Detail Columns ---
  const detailColumns = useMemo<ColumnDef<PayrollDetail & { computedEmployeeName: string }>[]>(() => [
    {
      id: "index",
      header: "STT",
      cell: ({ row }) => <div className="text-center font-bold text-slate-500">{row.index + 1}</div>,
      size: 50
    },
    {
      accessorKey: "workDate",
      header: "Ngày",
      cell: ({ row }) => <div className="font-semibold text-slate-700 dark:text-slate-300">{row.getValue("workDate")}</div>
    },
    {
      accessorKey: "computedEmployeeName",
      header: "NV",
      cell: ({ row }) => <div className="font-medium">{row.getValue("computedEmployeeName")}</div>
    },
    {
      accessorKey: "positionName",
      header: "Vị trí",
      cell: ({ row }) => <div className="text-slate-500 font-medium text-xs uppercase">{row.getValue("positionName")}</div>
    },
    {
      id: "timeRange",
      header: () => <div className="text-center">Thời gian</div>,
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
      header: () => <div className="text-center">Số giờ</div>,
      cell: ({ row }) => <div className="text-center font-bold text-slate-700">{row.getValue("hours")}</div>
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-right">Lương</div>,
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
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-4">
          Báo cáo lương NV
        </h1>
      </div>

      {/* ===== Filters ===== */}
      <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 rounded-lg p-5 space-y-4 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 items-end justify-between">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 flex-1">
            <div className="space-y-1.5">
              <Label htmlFor="startDateFilter" className="text-xs font-semibold text-slate-600">Từ ngày</Label>
              <Input
                id="startDateFilter"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="h-9"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="endDateFilter" className="text-xs font-semibold text-slate-600">Đến ngày</Label>
              <Input
                id="endDateFilter"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="h-9"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="positionFilter" className="text-xs font-semibold text-slate-600">Chức vụ</Label>
              <Select value={positionFilter} onValueChange={setPositionFilter}>
                <SelectTrigger id="positionFilter" className="h-9">
                  <SelectValue placeholder="Tất cả" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả</SelectItem>
                  <SelectItem value="phache">Pha chế</SelectItem>
                  <SelectItem value="phucvu">Phục vụ</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5 min-w-[200px]">
              <div className="text-xs font-semibold text-slate-600 mb-1.5">Nhân viên</div>
              <div>
                <MultiSelect
                  options={employees.map(emp => ({ label: emp.name, value: String(emp.id) }))}
                  selectedValues={selectedEmployeeIds}
                  onChange={setSelectedEmployeeIds}
                  placeholder="Chọn nhân viên..."
                />
              </div>
            </div>
            <div className="flex items-center gap-2 h-9 mt-auto">
              <input
                type="checkbox"
                id="missingInOut"
                className="rounded border-slate-300 w-4 h-4 text-[#1a73e8] focus:ring-[#1a73e8]"
                checked={missingFilter}
                onChange={(e) => setMissingFilter(e.target.checked)}
              />
              <Label htmlFor="missingInOut" className="text-sm font-semibold text-slate-600 cursor-pointer">
                Quên check-in/out
              </Label>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              className="h-9 bg-[#1a73e8] hover:bg-blue-700 text-white border-none px-6"
              onClick={handleFilter}
            >
              Lọc
            </Button>
            <Button
              onClick={handleGenerate}
              disabled={loading}
              variant="outline"
              className="h-9 border-[#1e8e5f] text-[#1e8e5f] hover:bg-[#1e8e5f] hover:text-white dark:border-[#28bd80] dark:text-[#28bd80] dark:hover:bg-[#28bd80] dark:hover:text-black font-semibold px-4 transition-all"
            >
              <Play className="mr-2 h-4 w-4" />
              Tính Lương
            </Button>
          </div>
        </div>
      </div>

      {/* ===== BẢNG TỔNG HỢP ===== */}
      <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-sm rounded-2xl overflow-hidden">
        <div className="p-4 lg:p-5 border-b border-slate-100 dark:border-neutral-800 bg-slate-50/50 dark:bg-white/5">
          <h2 className="text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest">
            Summary
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#5ac1c9] text-white">
                <th className="text-left px-4 py-3 font-bold">Tên NV</th>
                <th className="text-right px-4 py-3 font-bold">Lương</th>
                <th className="text-right px-4 py-3 font-bold">Thưởng</th>
                <th className="text-right px-4 py-3 font-bold">Phạt</th>
                <th className="text-right px-4 py-3 font-bold">Tổng</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-10">
                    <div className="flex flex-col items-center gap-2">
                      <div className="h-8 w-8 border-4 border-slate-200 border-t-[#5ac1c9] rounded-full animate-spin" />
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Đang tải...</span>
                    </div>
                  </td>
                </tr>
              ) : payrolls.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-10 text-slate-400 font-semibold">
                    Chưa có dữ liệu lương
                  </td>
                </tr>
              ) : (
                payrolls.map((p) => (
                  <tr key={p.id} className="border-b border-slate-100 dark:border-neutral-800 hover:bg-slate-50/60 dark:hover:bg-neutral-800/30 transition-colors">
                    <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">
                      {p.employeeName}{p.employeePhone ? `-${p.employeePhone}` : ''}
                    </td>
                    <td className="px-4 py-3 text-right font-medium tabular-nums">
                      {formatMoney(p.baseSalary)}
                    </td>
                    <td className="px-4 py-3 text-right font-medium tabular-nums text-emerald-600">
                      {p.totalRewards > 0 ? formatMoney(p.totalRewards) : <span className="text-emerald-500">0</span>}
                    </td>
                    <td className="px-4 py-3 text-right font-medium tabular-nums text-rose-600">
                      {p.totalPenalties > 0 ? `-${formatMoney(p.totalPenalties)}` : <span className="text-rose-500">0</span>}
                    </td>
                    <td className="px-4 py-3 text-right font-bold tabular-nums">
                      {formatMoney(p.totalSalary)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
            {payrolls.length > 0 && (
              <tfoot>
                <tr className="bg-slate-50 dark:bg-neutral-900/60 border-t-2 border-slate-200 dark:border-neutral-700">
                  <td className="px-4 py-3 font-black text-slate-800 dark:text-white">Tổng lương</td>
                  <td className="px-4 py-3 text-right font-black tabular-nums">
                    {formatMoney(payrolls.reduce((s, p) => s + p.baseSalary, 0))}
                  </td>
                  <td className="px-4 py-3 text-right font-black tabular-nums text-emerald-600">
                    {formatMoney(payrolls.reduce((s, p) => s + p.totalRewards, 0))}
                  </td>
                  <td className="px-4 py-3 text-right font-black tabular-nums text-rose-600">
                    {(() => { const t = payrolls.reduce((s, p) => s + p.totalPenalties, 0); return t > 0 ? `-${formatMoney(t)}` : '0'; })()}
                  </td>
                  <td className="px-4 py-3 text-right font-black tabular-nums">
                    {formatMoney(payrolls.reduce((s, p) => s + p.totalSalary, 0))}
                  </td>
                </tr>
              </tfoot>
            )}
          </table>
        </div>
      </div>

      {/* ===== BẢNG CHI TIẾT ĐIỂM DANH ===== */}
      <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-sm rounded-2xl overflow-hidden mt-6">
        <div className="flex items-center justify-between p-4 lg:p-5 border-b border-slate-100 dark:border-neutral-800 bg-slate-50/50 dark:bg-white/5">
          <h2 className="text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest">
            Bảng Chấm Công Chi Tiết
          </h2>
          <Button
            className="h-8 bg-[#1e8e5f] hover:bg-[#15714a] text-white dark:bg-[#28bd80] dark:hover:bg-[#1e8e5f] dark:text-black border-none px-4 font-semibold shadow-md transition-all shadow-emerald-500/20"
          >
            <FileUp className="mr-2 h-4 w-4" />
            Xuất Excel
          </Button>
        </div>
        <div className="p-0">
          <DataTable
            columns={detailColumns}
            data={allDetails}
            loading={loading}
          />
        </div>
      </div>
    </motion.div>
  )
}
