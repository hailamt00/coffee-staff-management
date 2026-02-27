import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { useActivityLog } from '../hooks/useActivityLog'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { DataTable } from '@/shared/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'
import type { ActivityLog } from '@/shared/types/api'
import { formatDateInVietnam, formatTimeInVietnam } from '@/shared/utils/datetime'

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
        accessorKey: 'action',
        header: 'Action',
        cell: ({ row }) => (
          <span className="text-xs text-slate-800 dark:text-slate-200 leading-snug">
            {row.original.action}
          </span>
        ),
      },
    ],
    []
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6 pb-10"
    >
      {/* Header */}
      <div className="px-2">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
          Activity Log
        </h1>
        <p className="mt-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          Audit_Trail & System_Pulse
        </p>
      </div>

      {/* Table */}
      <Card className="border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50/50 dark:bg-black/20 border-b border-slate-100 dark:border-neutral-800">
          <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-slate-900 dark:bg-white animate-pulse" />
            Log Entries — {logs.length} records
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <DataTable
            columns={columns}
            data={logs}
            loading={isLoading}
            defaultPageSize={50}
          />
        </CardContent>
      </Card>
    </motion.div>
  )
}
