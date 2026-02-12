import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useAttendance } from '../hooks/useAttendance'
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
} from 'lucide-react'
import { Label } from '@/shared/components/ui/label'
import { StatCard } from '@/shared/components/StatCard'
import { DataTable } from '@/shared/components/ui/data-table'
import type { ColumnDef } from '@tanstack/react-table'
import type { Attendance } from '@/shared/types/api'

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
  const [date, setDate] = useState(() =>
    new Date().toISOString().slice(0, 10)
  )
  const { useAttendance: useAttendanceQuery, loading: mutationLoading } = useAttendance()

  const { data: attendances = [], isLoading: queryLoading } = useAttendanceQuery(date)
  const loading = mutationLoading || queryLoading

  // Stats calculation
  const stats = useMemo(() => {
    const total = attendances.length
    const present = attendances.filter(a => a.status === 'present').length
    const late = attendances.filter(a => a.status === 'late').length
    const absent = attendances.filter(a => a.status === 'absent').length
    const presentRate = total > 0 ? ((present / total) * 100).toFixed(1) : '0.0'

    return { total, present, late, absent, presentRate }
  }, [attendances])

  const columns = useMemo<ColumnDef<Attendance>[]>(() => [
    {
      accessorKey: "employeeId",
      header: "Employee",
      cell: ({ row }) => (
        <div>
          <p className="font-semibold text-slate-900 dark:text-slate-100">
            Employee #{row.getValue("employeeId")}
          </p>
          <p className="text-[10px] text-muted-foreground uppercase">
            ID: {row.original.id}
          </p>
        </div>
      )
    },
    {
      accessorKey: "shiftId",
      header: "Shift",
      cell: ({ row }) => <Badge variant="outline">Shift #{row.getValue("shiftId")}</Badge>
    },
    {
      accessorKey: "checkIn",
      header: "Check In",
      cell: ({ row }) => <span className="font-mono text-xs">{row.getValue("checkIn") || "—"}</span>
    },
    {
      accessorKey: "checkOut",
      header: "Check Out",
      cell: ({ row }) => <span className="font-mono text-xs">{row.getValue("checkOut") || "—"}</span>
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <StatusBadge status={row.getValue("status")} />
    }
  ], [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-8"
    >
      {/* ===== Header ===== */}
      <div className="flex items-end justify-between px-2">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
            Attendance
          </h1>
          <p className="mt-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Clock In/Out Tracking
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="attendance-date" className="sr-only">Select Date</Label>
          <Input
            id="attendance-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-40 h-10 rounded-lg border-slate-200 dark:border-neutral-800"
          />
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
          <h2 className="mb-4 text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            Attendance Records
          </h2>

          <DataTable
            columns={columns}
            data={attendances}
            loading={loading}
            searchKey="employeeId"
          />
        </CardContent>
      </Card>
    </motion.div>
  )
}
