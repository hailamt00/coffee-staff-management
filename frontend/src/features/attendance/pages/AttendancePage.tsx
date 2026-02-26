import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useAttendance } from '../hooks/useAttendance'
import { useEmployee } from '@/features/employees/hooks/useEmployee'
import { MultiSelect } from '@/shared/components/ui/multi-select'
import {
  Card,
  CardContent,
} from '@/shared/components/ui/card'
import { Badge } from '@/shared/components/ui/badge'
import { Input } from '@/shared/components/ui/input'
import {
  CheckCircle,
  XCircle,
  Users,
  AlertCircle,
  Edit2,
  Trash2,
  Plus,
} from 'lucide-react'
import { Label } from '@/shared/components/ui/label'
import { Button } from '@/shared/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import { StatCard } from '@/shared/components/StatCard'
import { DataTable } from '@/shared/components/ui/data-table'
import type { ColumnDef } from '@tanstack/react-table'
import { AttendanceFormModal } from '../components/AttendanceFormModal'
// Removed unused Attendance import

/* ================= HELPERS ================= */

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case 'present':
      return <Badge className="bg-black text-white dark:bg-white dark:text-black border-black dark:border-white">Present</Badge>
    case 'late':
      return <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20">Late</Badge>
    case 'absent':
      return <Badge className="bg-red-500/10 text-red-600 border-red-500/20">Absent</Badge>
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

/* ================= PAGE ================= */

export default function AttendancePage() {
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

  const [queryStartDate, setQueryStartDate] = useState(startDate)
  const [queryEndDate, setQueryEndDate] = useState(endDate)

  const [selectedEmployeeIds, setSelectedEmployeeIds] = useState<string[]>([])
  const [positionFilter, setPositionFilter] = useState('all')
  const [missingFilter, setMissingFilter] = useState(false)

  const [queryEmployeeIds, setQueryEmployeeIds] = useState<string[]>([])
  const [queryPositionFilter, setQueryPositionFilter] = useState('all')
  const [queryMissingFilter, setQueryMissingFilter] = useState(false)

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [editingAttendance, setEditingAttendance] = useState<any>(null)

  const {
    useAttendanceRange,
    createAttendance,
    updateAttendance,
    deleteAttendance,
    loading: mutationLoading
  } = useAttendance()

  const { employees, loading: employeesLoading } = useEmployee()
  const { data: attendances = [], isLoading: queryLoading } = useAttendanceRange(queryStartDate, queryEndDate)
  const loading = mutationLoading || queryLoading || employeesLoading

  // Client-side filtering
  const filteredAttendances = useMemo(() => {
    return attendances.filter(record => {
      // Logic for selected employees
      const employeeMatch = queryEmployeeIds.length === 0 || queryEmployeeIds.includes(String(record.employeeId))

      // Logic for position
      const positionMatch = queryPositionFilter === 'all' ||
        (queryPositionFilter === 'phache' && record.positionName?.toLowerCase() === 'pha chế') ||
        (queryPositionFilter === 'phucvu' && record.positionName?.toLowerCase() === 'phục vụ')

      // Logic for missing check-in/out
      const missingMatch = !queryMissingFilter || (!record.checkIn || !record.checkOut)

      // Logic for filtering out future dates
      const isPastOrPresent = new Date(record.workDate) <= new Date()

      return employeeMatch && positionMatch && missingMatch && isPastOrPresent
    })
  }, [attendances, queryEmployeeIds, queryPositionFilter, queryMissingFilter])

  // Stats calculation
  const stats = useMemo(() => {
    const total = filteredAttendances.length
    const present = filteredAttendances.filter(a => a.status === 'present').length
    const late = filteredAttendances.filter(a => a.status === 'late').length
    const absent = filteredAttendances.filter(a => a.status === 'absent').length
    const presentRate = total > 0 ? ((present / total) * 100).toFixed(1) : '0.0'

    return { total, present, late, absent, presentRate }
  }, [filteredAttendances])

  const columns = useMemo<ColumnDef<any>[]>(() => [
    {
      id: "index",
      header: "#",
      cell: ({ row }) => <span className="font-mono text-xs text-slate-500">{row.index + 1}</span>
    },
    {
      accessorKey: "workDate",
      header: "Ngày",
      cell: ({ row }) => {
        const wDate = row.original.workDate;
        return <span className="text-sm">{wDate ? new Date(wDate).toLocaleDateString('vi-VN') : '—'}</span>
      }
    },
    {
      id: "employeeName",
      header: "Tên NV",
      cell: ({ row }) => {
        return <span className="font-semibold">{row.original.employeeName || "Unknown"}</span>
      }
    },
    {
      id: "employeePhone",
      header: "Sdt",
      cell: ({ row }) => {
        return <span className="font-mono text-xs text-slate-600 dark:text-slate-400">{row.original.employeePhone || "—"}</span>
      }
    },
    {
      id: "position",
      header: "Vị trí",
      cell: ({ row }) => {
        return (
          <div className="flex flex-col gap-1 items-start">
            <span className="font-semibold text-xs">{row.original.positionName || "—"}</span>
            <span className="text-[10px] text-muted-foreground">{row.original.shiftName || "—"}</span>
          </div>
        )
      }
    },
    {
      accessorKey: "checkIn",
      header: "Bắt đầu",
      cell: ({ row }) => {
        const checkIn = row.getValue("checkIn") as string;
        if (!checkIn) return <span className="font-mono text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded dark:bg-yellow-900/30">—</span>;
        return <span className="font-mono text-xs">{new Date(checkIn).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
      }
    },
    {
      accessorKey: "checkOut",
      header: "Kết thúc",
      cell: ({ row }) => {
        const checkOut = row.getValue("checkOut") as string;
        if (!checkOut) return <span className="font-mono text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded dark:bg-yellow-900/30">—</span>;
        return <span className="font-mono text-xs">{new Date(checkOut).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
      }
    },
    {
      id: "totalHours",
      header: () => <div className="text-right">Diff</div>,
      cell: ({ row }) => {
        const total = row.original.totalHours;
        return <div className="text-right font-medium">{total ? parseFloat(total).toFixed(2) : "—"}</div>
      }
    },
    {
      accessorKey: "note",
      header: "Note",
      cell: ({ row }) => <span className="text-xs text-muted-foreground">{row.original.note || "—"}</span>
    },
    {
      accessorKey: "status",
      header: "Actions",
      cell: ({ row }) => (
        <div className="flex items-center gap-3">
          <StatusBadge status={row.getValue("status")} />
          <div className="flex gap-1 ml-auto">
            <button
              onClick={() => {
                setEditingAttendance(row.original)
                setIsModalOpen(true)
              }}
              className="p-1.5 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full transition-colors"
            >
              <Edit2 className="w-4 h-4" />
            </button>
            <button
              onClick={async () => {
                if (window.confirm("Bạn có chắc chắn muốn xóa bản ghi điểm danh này?")) {
                  await deleteAttendance(row.original.id)
                }
              }}
              className="p-1.5 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )
    }
  ], [deleteAttendance])

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-8"
    >
      {/* ===== Header ===== */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none mb-4">
          Báo cáo lương NV (Điểm danh)
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
              onClick={() => {
                setQueryStartDate(startDate)
                setQueryEndDate(endDate)
                setQueryEmployeeIds(selectedEmployeeIds)
                setQueryPositionFilter(positionFilter)
                setQueryMissingFilter(missingFilter)
              }}
            >
              Lọc
            </Button>
          </div>
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Records"
          value={stats.total}
          description="Today's shifts"
          icon={Users}
          iconColor="text-slate-900 dark:text-white"
        />
        <StatCard
          title="Present"
          value={stats.present}
          description={`${stats.presentRate}% attendance`}
          icon={CheckCircle}
          iconColor="text-green-600 dark:text-green-400"
          trend="up"
          trendValue={`${stats.presentRate}%`}
        />
        <StatCard
          title="Late Arrivals"
          value={stats.late}
          description="Delayed check-ins"
          icon={AlertCircle}
          iconColor="text-amber-600 dark:text-amber-400"
          trend={stats.late > 0 ? 'down' : 'neutral'}
          trendValue={stats.late > 0 ? `${stats.late} late` : 'On time'}
        />
        <StatCard
          title="Absent"
          value={stats.absent}
          description="No show"
          icon={XCircle}
          iconColor="text-red-600 dark:text-red-400"
          trend={stats.absent > 0 ? 'down' : 'up'}
          trendValue={stats.absent === 0 ? 'Perfect' : `${stats.absent} absent`}
        />
      </div>

      {/* ===== Table ===== */}
      <Card className="border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
              Attendance Records
            </h2>
            <Button
              onClick={() => {
                setEditingAttendance(null)
                setIsModalOpen(true)
              }}
              className="h-9 bg-black hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-200 dark:text-black"
            >
              <Plus className="w-4 h-4 mr-2" />
              Thêm mới
            </Button>
          </div>

          <DataTable
            columns={columns}
            data={filteredAttendances}
            loading={loading}
            searchKey="employeeName"
            defaultPageSize={100}
            searchPosition="top"
          />
        </CardContent>
      </Card>

      <AttendanceFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setEditingAttendance(null)
        }}
        onSave={async (payload) => {
          if (editingAttendance) {
            await updateAttendance(payload)
          } else {
            await createAttendance(payload)
          }
        }}
        initialData={editingAttendance}
      />
    </motion.div>
  )
}
