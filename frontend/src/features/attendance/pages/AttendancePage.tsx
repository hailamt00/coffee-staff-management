import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useAttendance } from '../hooks/useAttendance'
import { useEmployee } from '@/features/employees/hooks/useEmployee'
import { MultiSelect } from '@/shared/components/ui/multi-select'
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
  Filter,
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/shared/components/ui/sheet'
import { SummaryCard } from '@/shared/components/ui/summary-card'
import { DataTable } from '@/shared/components/ui/data-table'
import type { ColumnDef } from '@tanstack/react-table'
import { AttendanceFormModal } from '../components/AttendanceFormModal'
import { formatDateInVietnam } from '@/shared/utils/datetime'
import { useTranslation } from 'react-i18next'

/* ================= HELPERS ================= */

function StatusBadge({ status }: { status: string }) {
  const { t } = useTranslation()
  switch (status) {
    case 'present':
      return <Badge className="bg-black text-white dark:bg-white dark:text-black border-black dark:border-white h-5 text-[9px] font-black uppercase tracking-widest px-2">{t('attendance.status.present')}</Badge>
    case 'late':
      return <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 h-5 text-[9px] font-black uppercase tracking-widest px-2">{t('attendance.status.late')}</Badge>
    case 'absent':
      return <Badge className="bg-red-500/10 text-red-600 border-red-500/20 h-5 text-[9px] font-black uppercase tracking-widest px-2">{t('attendance.status.absent')}</Badge>
    default:
      return <Badge variant="outline" className="h-5 text-[9px] font-black uppercase tracking-widest px-2">{status}</Badge>
  }
}

/* ================= PAGE ================= */

export default function AttendancePage() {
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

  // Memoize employee options for MultiSelect to prevent re-renders
  const employeeOptions = useMemo(() => employees.map(emp => ({ label: emp.name, value: String(emp.id) })), [employees])

  // Client-side filtering
  const filteredAttendances = useMemo(() => {
    return attendances.filter(record => {
      // Logic for selected employees
      const employeeMatch = queryEmployeeIds.length === 0 || queryEmployeeIds.includes(String(record.employeeId))

      // Logic for position
      const positionMatch = queryPositionFilter === 'all' ||
        (queryPositionFilter === 'barista' && (record.positionName?.toLowerCase().includes('pha chế') || record.positionName?.toLowerCase().includes('barista') || record.positionName?.toLowerCase().includes('pha che'))) ||
        (queryPositionFilter === 'server' && (record.positionName?.toLowerCase().includes('phục vụ') || record.positionName?.toLowerCase().includes('server') || record.positionName?.toLowerCase().includes('phuc vu')))

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
      meta: { align: 'center', width: '50px' },
      cell: ({ row, table }) => {
        const pageIndex = table.getState().pagination.pageIndex
        const pageSize = table.getState().pagination.pageSize
        const localIndex = table.getRowModel().rows.findIndex((r) => r.id === row.id)
        const displayIndex = pageIndex * pageSize + (localIndex >= 0 ? localIndex : row.index) + 1

        return <span className="font-mono text-[10px] text-slate-400">{displayIndex}</span>
      }
    },
    {
      accessorKey: "workDate",
      header: t('attendance.table.timeline'),
      meta: { align: 'center', hideSortIcon: true },
      cell: ({ row }) => (
        <div className="flex flex-col gap-0.5 items-center">
          <span className="font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap">
            {formatDateInVietnam(row.original.workDate)}
          </span>
          <span className="text-[10px] text-slate-400 font-black tracking-tighter">
            {(() => {
              const name = row.original.shiftName?.toLowerCase() || "";
              if (name.includes('sáng') || name.includes('sang')) return t('attendance.shifts.morning') || "Morning Shift";
              if (name.includes('chiều') || name.includes('chieu')) return t('attendance.shifts.afternoon') || "Afternoon Shift";
              if (name.includes('tối') || name.includes('toi')) return t('attendance.shifts.evening') || "Evening Shift";
              return row.original.shiftName || "Unknown";
            })()}
          </span>
        </div>
      )
    },
    {
      id: "employee",
      accessorKey: "employeeName",
      header: t('attendance.table.employee'),
      meta: { align: 'center', hideSortIcon: true },
      cell: ({ row }) => (
        <span className="font-bold text-slate-900">{row.original.employeeName || "Unknown"}</span>
      )
    },
    {
      id: "position",
      accessorKey: "positionName",
      header: t('attendance.table.position'),
      meta: { align: 'center', hideSortIcon: true },
      cell: ({ row }) => {
        const pos = row.original.positionName?.toLowerCase() || "";
        if (pos.includes('pha chế') || pos.includes('barista') || pos.includes('pha che')) {
          return <span className="text-[11px] text-slate-500 font-medium">{t('dashboard.barista')}</span>
        }
        if (pos.includes('phục vụ') || pos.includes('server') || pos.includes('phuc vu')) {
          return <span className="text-[11px] text-slate-500 font-medium">{t('dashboard.service')}</span>
        }
        return <span className="text-[11px] text-slate-500 font-medium">{row.original.positionName || "—"}</span>
      }
    },
    {
      id: "checkIn",
      accessorKey: "checkIn",
      header: t('attendance.table.checkIn'),
      meta: { align: 'center', hideSortIcon: true },
      cell: ({ row }) => {
        const checkIn = row.original.checkIn;
        const formatTime = (t: string) => t ? new Date(t).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) : '—';
        return <span className={!checkIn ? "bg-amber-100 text-amber-700 px-1 rounded font-mono text-[11px] font-bold" : "font-mono text-[11px] font-bold"}>{formatTime(checkIn)}</span>
      }
    },
    {
      id: "checkOut",
      accessorKey: "checkOut",
      header: t('attendance.table.checkOut'),
      meta: { align: 'center', hideSortIcon: true },
      cell: ({ row }) => {
        const checkOut = row.original.checkOut;
        const formatTime = (t: string) => t ? new Date(t).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) : '—';
        return <span className={!checkOut ? "bg-amber-100 text-amber-700 px-1 rounded font-mono text-[11px] font-bold" : "font-mono text-[11px] font-bold"}>{formatTime(checkOut)}</span>
      }
    },
    {
      id: "diff",
      accessorKey: "totalHours",
      header: t('attendance.table.diff'),
      meta: { align: 'center', hideSortIcon: true },
      cell: ({ row }) => (
        <div className="font-black tabular-nums text-slate-900">
          {row.original.totalHours ? parseFloat(row.original.totalHours).toFixed(2) : "—"}
        </div>
      )
    },
    {
      id: "status",
      accessorKey: "status",
      header: t('attendance.table.status'),
      meta: { align: 'center', hideSortIcon: true },
      cell: ({ row }) => <StatusBadge status={row.original.status} />
    },
    {
      id: "note",
      accessorKey: "note",
      header: t('attendance.table.note'),
      meta: { align: 'center', hideSortIcon: true },
      cell: ({ row }) => (
        <span className="text-[10px] text-slate-400 font-medium italic truncate max-w-[150px] inline-block" title={row.original.note}>
          {row.original.note || "—"}
        </span>
      )
    },
    {
      id: "actions",
      header: t('attendance.table.actions'),
      meta: { align: 'center' },
      cell: ({ row }) => (
        <div className="flex gap-1 justify-center">
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8 rounded-lg border-slate-200"
            onClick={() => {
              setEditingAttendance(row.original)
              setIsModalOpen(true)
            }}
          >
            <Edit2 className="w-3.5 h-3.5" />
          </Button>
          <Button
            size="icon"
            variant="outline"
            className="h-8 w-8 rounded-lg border-red-100 text-red-600 hover:bg-red-600 hover:text-white"
            onClick={async () => {
              if (window.confirm("Are you sure?")) {
                await deleteAttendance(row.original.id)
              }
            }}
          >
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      )
    }
  ], [deleteAttendance])

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
              {t('attendance.title')}
            </h1>
            <p className="mt-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden sm:block">
              {t('attendance.subtitle')}
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Mobile Filter Sheet */}
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="h-10 w-10 relative rounded-xl">
                    <Filter className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[80vh] rounded-t-[2.5rem] border-none shadow-2xl p-0 overflow-hidden">
                  <SheetHeader className="p-6 border-b border-slate-100 dark:border-neutral-800">
                    <SheetTitle className="text-left font-black tracking-tighter text-2xl">{t('attendance.filters.title')}</SheetTitle>
                  </SheetHeader>
                  <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(80vh-100px)]">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('attendance.filters.start')}</Label>
                        <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="h-12 rounded-xl" />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('attendance.filters.end')}</Label>
                        <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="h-12 rounded-xl" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('attendance.filters.position')}</Label>
                      <Select value={positionFilter} onValueChange={setPositionFilter}>
                        <SelectTrigger className="h-12 rounded-xl">
                          <SelectValue placeholder={t('common.all') || "All"} />
                        </SelectTrigger>
                        <SelectContent className="rounded-xl">
                          <SelectItem value="all">{t('common.all') || "All"}</SelectItem>
                          <SelectItem value="barista">{t('dashboard.barista')}</SelectItem>
                          <SelectItem value="server">{t('dashboard.service')}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('attendance.filters.employees')}</Label>
                      <MultiSelect
                        options={employeeOptions}
                        selectedValues={selectedEmployeeIds}
                        onChange={setSelectedEmployeeIds}
                        placeholder={t('attendance.filters.employees') || "Select employees..."}
                      />
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-neutral-800 rounded-2xl">
                      <Label htmlFor="missingInOutMob" className="text-xs font-bold">{t('attendance.filters.forgot')}</Label>
                      <input
                        type="checkbox"
                        id="missingInOutMob"
                        className="rounded-full w-6 h-6 accent-black"
                        checked={missingFilter}
                        onChange={(e) => setMissingFilter(e.target.checked)}
                      />
                    </div>

                    <Button
                      className="w-full h-14 bg-black dark:bg-white text-white dark:text-black rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] mt-4"
                      onClick={() => {
                        setQueryStartDate(startDate)
                        setQueryEndDate(endDate)
                        setQueryEmployeeIds(selectedEmployeeIds)
                        setQueryPositionFilter(positionFilter)
                        setQueryMissingFilter(missingFilter)
                      }}
                    >
                      {t('attendance.filters.apply')}
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            <Button
              onClick={() => {
                setEditingAttendance(null)
                setIsModalOpen(true)
              }}
              className="h-10 w-10 rounded-xl border-none bg-black text-[10px] font-bold uppercase tracking-widest text-white hover:bg-slate-800 sm:w-auto sm:px-6 dark:bg-white dark:text-black dark:hover:bg-neutral-200"
            >
              <Plus className="h-4 w-4 sm:mr-2" />
              <span className="hidden sm:inline">{t('attendance.actions.add')}</span>
            </Button>
          </div>
        </div>

        {/* Desktop Filter Bar */}
        <div className="flex flex-col gap-3 bg-slate-50 dark:bg-neutral-900 border border-slate-100 dark:border-neutral-800 p-4 rounded-[1.5rem]">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 items-end">
            <div className="space-y-1.5">
              <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">{t('attendance.filters.start').split(' ')[0]}</Label>
              <Input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="h-10 rounded-xl bg-white dark:bg-black border-none text-xs text-center shadow-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">{t('attendance.filters.end').split(' ')[0]}</Label>
              <Input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="h-10 rounded-xl bg-white dark:bg-black border-none text-xs text-center shadow-sm" />
            </div>
            <div className="space-y-1.5">
              <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">{t('attendance.filters.position')}</Label>
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
              <Label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">{t('attendance.filters.employees')}</Label>
              <MultiSelect
                options={employeeOptions}
                selectedValues={selectedEmployeeIds}
                onChange={setSelectedEmployeeIds}
                placeholder="All staff"
              />
            </div>
            <div className="flex items-center gap-3 h-10 px-4 bg-white dark:bg-black border border-transparent dark:border-neutral-800 rounded-xl shadow-sm">
              <input
                type="checkbox"
                id="missingFilterDesk"
                className="w-4 h-4 accent-black dark:accent-white rounded-md cursor-pointer"
                checked={missingFilter}
                onChange={(e) => setMissingFilter(e.target.checked)}
              />
              <Label htmlFor="missingFilterDesk" className="text-[10px] font-black uppercase tracking-widest text-slate-500 dark:text-slate-400 cursor-pointer select-none">
                {t('attendance.filters.forgot')}
              </Label>
            </div>
            <Button
              className="h-10 bg-black text-white dark:bg-white dark:text-black hover:bg-slate-800 dark:hover:bg-neutral-200 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-sm"
              onClick={() => {
                setQueryStartDate(startDate)
                setQueryEndDate(endDate)
                setQueryEmployeeIds(selectedEmployeeIds)
                setQueryPositionFilter(positionFilter)
                setQueryMissingFilter(missingFilter)
              }}
            >
              {t('attendance.actions.apply')}
            </Button>
          </div>
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <SummaryCard
          title={t('attendance.stats.total') || "Total"}
          value={stats.total}
          description={t('attendance.stats.shiftEntries') || "Shift entries"}
          icon={Users}
          color="cyan"
        />
        <SummaryCard
          title={t('attendance.stats.present') || "Present"}
          value={stats.present}
          description={`${stats.presentRate}% rate`}
          icon={CheckCircle}
          color="green"
        />
        <SummaryCard
          title={t('attendance.stats.late') || "Late"}
          value={stats.late}
          description={t('attendance.stats.delayedStart') || "Delayed start"}
          icon={AlertCircle}
          color="orange"
        />
        <SummaryCard
          title={t('attendance.stats.absent') || "Absent"}
          value={stats.absent}
          description={t('attendance.stats.unexcused') || "Unexcused"}
          icon={XCircle}
          color="red"
        />
      </div >

      {/* DATA TABLE */}
      <div className="px-1">
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-slate-100 dark:border-neutral-800 shadow-sm overflow-hidden">
          <DataTable
            columns={columns}
            data={filteredAttendances}
            loading={loading}
            searchKey="employeeName"
            defaultPageSize={100}
            initialSorting={[{ id: 'workDate', desc: true }, { id: 'checkIn', desc: true }]}
          />
        </div>
      </div>

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
    </motion.div >
  )
}
