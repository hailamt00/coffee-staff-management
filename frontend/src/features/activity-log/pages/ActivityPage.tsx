import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useActivityLog } from '../hooks/useActivityLog'
import { DataTable } from '@/shared/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'
import type { ActivityLog } from '@/shared/types/api'
import { SummaryCard } from '@/shared/components/ui/summary-card'
import { Activity, User as UserIcon, ShieldAlert } from 'lucide-react'
import { formatDateInVietnam, formatTimeInVietnam } from '@/shared/utils/datetime'
import { Badge } from '@/shared/components/ui/badge'

export default function ActivityLogPage() {
  const { useActivityLogs } = useActivityLog()
  const { data: logs = [], isLoading } = useActivityLogs()

  const columns = useMemo<ColumnDef<ActivityLog>[]>(
    () => [
      {
        accessorKey: 'id',
        header: '#',
        cell: ({ row }) => (
          <span className="text-xs font-mono text-slate-400">
            {row.original.id}
          </span>
        ),
      },
      {
        accessorKey: 'createdAt',
        header: 'Time',
        cell: ({ row }) => {
          return (
            <div className="flex flex-col gap-0.5">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap tabular-nums">
                {formatDateInVietnam(row.original.createdAt)}
              </span>
              <span className="text-[10px] text-slate-400 tabular-nums">
                {formatTimeInVietnam(row.original.createdAt)}
              </span>
            </div>
          )
        },
      },
      {
        id: 'type',
        header: 'Type',
        cell: ({ row }) => {
          const raw = row.original.action || ''
          let type = 'System'
          let colorClass = 'bg-slate-100 text-slate-600 border-slate-200'

          if (raw.includes('Employee')) { type = 'Employee'; colorClass = 'bg-blue-100 text-blue-700 border-blue-200' }
          else if (raw.includes('Shift')) { type = 'Shift'; colorClass = 'bg-indigo-100 text-indigo-700 border-indigo-200' }
          else if (raw.includes('Schedule')) { type = 'Schedule'; colorClass = 'bg-purple-100 text-purple-700 border-purple-200' }
          else if (raw.includes('RewardPenalty')) { type = 'Adjustment'; colorClass = 'bg-orange-100 text-orange-700 border-orange-200' }
          else if (raw.includes('Revenue')) { type = 'Revenue'; colorClass = 'bg-emerald-100 text-emerald-700 border-emerald-200' }
          else if (raw.includes('Login') || raw.includes('Logout')) { type = 'Auth'; colorClass = 'bg-slate-800 text-slate-100 border-slate-700 dark:bg-slate-100 dark:text-slate-800' }

          let actionWord = 'Process'
          if (raw.startsWith('Create')) actionWord = 'Create'
          if (raw.startsWith('Update')) actionWord = 'Update'
          if (raw.startsWith('Delete')) actionWord = 'Delete'
          if (raw.startsWith('Login')) actionWord = 'Login'
          if (raw.startsWith('Logout')) actionWord = 'Logout'
          if (raw.startsWith('Approve')) actionWord = 'Approve'
          if (raw.startsWith('Reject')) actionWord = 'Reject'

          return (
            <div className="flex flex-col gap-1 items-start">
              <Badge variant="outline" className={`text-[9px] uppercase tracking-widest font-black h-5 px-1.5 ${colorClass}`}>
                {type}
              </Badge>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{actionWord}</span>
            </div>
          )
        },
      },
      {
        accessorKey: 'action',
        header: 'Details',
        cell: ({ row }) => {
          const raw = row.original.action || ''
          // Extract details before "- user:"
          const detailsPart = raw.split(' - user:')[0] || raw
          return (
            <span className="text-[11px] font-medium text-slate-800 dark:text-slate-200 leading-relaxed max-w-[400px] inline-block">
              {detailsPart}
            </span>
          )
        },
      },
      {
        id: 'user',
        header: 'User / Source',
        cell: ({ row }) => {
          const raw = row.original.action || ''
          let userString = 'System Auto'
          if (raw.includes('- user: ')) {
            userString = `Admin ID: ${raw.split('- user: ')[1]}`
          }
          return (
            <div className="flex items-center gap-1.5 text-slate-500">
              {userString.includes('System') ? <ShieldAlert className="w-3.5 h-3.5" /> : <UserIcon className="w-3.5 h-3.5" />}
              <span className="text-[10px] font-black uppercase tracking-wider tabular-nums">
                {userString}
              </span>
            </div>
          )
        },
      },
    ],
    []
  )

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
              Activity Log
            </h1>
            <p className="mt-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden sm:block">
              Audit Trail & System Pulse
            </p>
          </div>
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <SummaryCard
          title="Total Logs"
          value={logs.length.toLocaleString()}
          description="Recorded events"
          icon={Activity}
          color="cyan"
        />
      </div>

      <div className="px-1">
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-slate-100 dark:border-neutral-800 shadow-sm overflow-hidden">
          <DataTable
            columns={columns}
            data={logs}
            loading={isLoading}
            defaultPageSize={50}
            hideToolbar={true}
          />
        </div>
      </div>
    </motion.div>
  )
}
