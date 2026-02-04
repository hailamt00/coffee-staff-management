import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { Badge } from '@/shared/ui/badge'
import { Input } from '@/shared/ui/input'
import {
  CalendarDays,
  Clock,
  CheckCircle,
  XCircle,
  Users,
  MoreHorizontal,
} from 'lucide-react'

/* ================= TYPES ================= */

type AttendanceStatus = 'on-time' | 'late' | 'absent'

type Attendance = {
  id: string
  employee: string
  shift: string
  checkIn?: string
  checkOut?: string
  status: AttendanceStatus
}

/* ================= MOCK DATA ================= */

const MOCK_ATTENDANCE: Attendance[] = [
  {
    id: '1',
    employee: 'Nguyen Van A',
    shift: 'Morning',
    checkIn: '07:02',
    checkOut: '12:00',
    status: 'late',
  },
  {
    id: '2',
    employee: 'Tran Thi B',
    shift: 'Morning',
    checkIn: '06:58',
    checkOut: '12:00',
    status: 'on-time',
  },
  {
    id: '3',
    employee: 'Le Van C',
    shift: 'Afternoon',
    status: 'absent',
  },
]

/* ================= HELPERS ================= */

function StatusBadge({ status }: { status: AttendanceStatus }) {
  switch (status) {
    case 'on-time':
      return <Badge className="bg-emerald-500/10 text-emerald-600">On time</Badge>
    case 'late':
      return <Badge className="bg-amber-500/10 text-amber-600">Late</Badge>
    case 'absent':
      return <Badge className="bg-red-500/10 text-red-600">Absent</Badge>
  }
}

/* ================= PAGE ================= */

export default function AttendancePage() {
  const [date] = useState(() =>
    new Date().toISOString().slice(0, 10)
  )

  return (
    <div className="space-y-8">
      {/* ===== Header ===== */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-black dark:text-white">
            Attendance
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Daily check-in and check-out tracking
          </p>
        </div>

        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-slate-400" />
          <Input type="date" defaultValue={date} className="w-40" />
        </div>
      </div>

      {/* ===== Summary ===== */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard title="Total" value={12} icon={Users} />
        <SummaryCard title="On time" value={8} icon={CheckCircle} />
        <SummaryCard title="Late" value={3} icon={Clock} />
        <SummaryCard title="Absent" value={1} icon={XCircle} />
      </div>

      {/* ===== List ===== */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <Card className="border border-slate-200 dark:border-neutral-800 bg-white dark:bg-black">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Attendance list
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
            {MOCK_ATTENDANCE.map((item) => (
              <div
                key={item.id}
                className="
                  flex items-center justify-between
                  rounded-lg border border-slate-100 dark:border-neutral-900
                  p-4 transition
                  hover:bg-slate-50 dark:hover:bg-neutral-900
                "
              >
                {/* LEFT */}
                <div>
                  <p className="font-medium text-black dark:text-white">
                    {item.employee}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {item.shift} shift
                  </p>
                </div>

                {/* CENTER */}
                <div className="hidden sm:block text-sm text-slate-500 dark:text-slate-400">
                  {item.checkIn
                    ? `${item.checkIn} → ${item.checkOut}`
                    : '—'}
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-4">
                  <StatusBadge status={item.status} />

                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

/* ================= SMALL COMPONENT ================= */

function SummaryCard({
  title,
  value,
  icon: Icon,
}: {
  title: string
  value: number
  icon: React.ElementType
}) {
  return (
    <Card className="border border-slate-200 dark:border-neutral-800 bg-white dark:bg-black">
      <CardContent className="flex items-center justify-between p-4">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {title}
          </p>
          <p className="mt-1 text-2xl font-semibold text-black dark:text-white">
            {value}
          </p>
        </div>
        <Icon className="h-5 w-5 text-slate-400 dark:text-slate-500" />
      </CardContent>
    </Card>
  )
}
