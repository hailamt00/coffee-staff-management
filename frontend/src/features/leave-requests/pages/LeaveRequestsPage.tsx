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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'
import {
  CalendarDays,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
} from 'lucide-react'

/* ================= TYPES ================= */

type LeaveStatus = 'pending' | 'approved' | 'rejected'

type LeaveRequest = {
  id: string
  employee: string
  from: string
  to: string
  reason: string
  status: LeaveStatus
}

/* ================= MOCK DATA ================= */

const MOCK_LEAVE_REQUESTS: LeaveRequest[] = [
  {
    id: '1',
    employee: 'Nguyen Van A',
    from: '2026-02-01',
    to: '2026-02-03',
    reason: 'Personal matter',
    status: 'pending',
  },
  {
    id: '2',
    employee: 'Tran Thi B',
    from: '2026-01-28',
    to: '2026-01-28',
    reason: 'Medical appointment',
    status: 'approved',
  },
  {
    id: '3',
    employee: 'Le Van C',
    from: '2026-01-20',
    to: '2026-01-22',
    reason: 'Family event',
    status: 'rejected',
  },
]

/* ================= HELPERS ================= */

function StatusBadge({ status }: { status: LeaveStatus }) {
  switch (status) {
    case 'pending':
      return (
        <Badge className="bg-amber-500/10 text-amber-600">
          Pending
        </Badge>
      )
    case 'approved':
      return (
        <Badge className="bg-emerald-500/10 text-emerald-600">
          Approved
        </Badge>
      )
    case 'rejected':
      return (
        <Badge className="bg-red-500/10 text-red-600">
          Rejected
        </Badge>
      )
  }
}

/* ================= PAGE ================= */

export default function LeaveRequestsPage() {
  const [filter, setFilter] = useState<'all' | LeaveStatus>('all')

  const filteredData =
    filter === 'all'
      ? MOCK_LEAVE_REQUESTS
      : MOCK_LEAVE_REQUESTS.filter(
          (r) => r.status === filter
        )

  return (
    <div className="space-y-8">
      {/* ===== Header ===== */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-black dark:text-white">
            Leave Requests
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage employee leave approvals
          </p>
        </div>

        <Select
          value={filter}
          onValueChange={(v) =>
            setFilter(v as typeof filter)
          }
        >
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* ===== Summary ===== */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard title="Total" value={6} icon={FileText} />
        <SummaryCard title="Pending" value={2} icon={Clock} />
        <SummaryCard title="Approved" value={3} icon={CheckCircle} />
        <SummaryCard title="Rejected" value={1} icon={XCircle} />
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
              Requests
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-2">
            {filteredData.map((item) => (
              <div
                key={item.id}
                className="
                  flex flex-col gap-4
                  rounded-lg border border-slate-100 dark:border-neutral-900
                  p-4 transition
                  hover:bg-slate-50 dark:hover:bg-neutral-900
                  sm:flex-row sm:items-center sm:justify-between
                "
              >
                {/* LEFT */}
                <div>
                  <p className="font-medium text-black dark:text-white">
                    {item.employee}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1">
                    <CalendarDays className="h-3 w-3" />
                    {item.from} → {item.to}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {item.reason}
                  </p>
                </div>

                {/* RIGHT */}
                <div className="flex items-center gap-3">
                  <StatusBadge status={item.status} />

                  {item.status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        className="bg-emerald-600 hover:bg-emerald-700"
                      >
                        Approve
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                      >
                        Reject
                      </Button>
                    </>
                  )}
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
