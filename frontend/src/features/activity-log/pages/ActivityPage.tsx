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
import { useTranslation } from 'react-i18next'

export default function ActivityLogPage() {
  const { t } = useTranslation()
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
        header: t('activity.table.time') || 'Time',
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
        header: t('activity.table.type') || 'Type',
        cell: ({ row }) => {
          const raw = row.original.action || ''
          let type = t('activity.types.system') || 'System'
          let colorClass = 'bg-slate-100 text-slate-600 border-slate-200'

          if (raw.includes('Employee')) { type = t('activity.types.employee') || 'Employee'; colorClass = 'bg-blue-100 text-blue-700 border-blue-200' }
          else if (raw.includes('Shift')) { type = t('activity.types.shift') || 'Shift'; colorClass = 'bg-indigo-100 text-indigo-700 border-indigo-200' }
          else if (raw.includes('Schedule')) { type = t('activity.types.schedule') || 'Schedule'; colorClass = 'bg-purple-100 text-purple-700 border-purple-200' }
          else if (raw.includes('RewardPenalty')) { type = t('activity.types.adjustment') || 'Adjustment'; colorClass = 'bg-orange-100 text-orange-700 border-orange-200' }
          else if (raw.includes('Revenue')) { type = t('activity.types.revenue') || 'Revenue'; colorClass = 'bg-emerald-100 text-emerald-700 border-emerald-200' }
          else if (raw.includes('Login') || raw.includes('Logout')) { type = t('activity.types.auth') || 'Auth'; colorClass = 'bg-slate-800 text-slate-100 border-slate-700 dark:bg-slate-100 dark:text-slate-800' }

          let actionWord = t('activity.actions.process') || 'Process'
          if (raw.startsWith('Create')) actionWord = t('activity.actions.create') || 'Create'
          if (raw.startsWith('Update')) actionWord = t('activity.actions.update') || 'Update'
          if (raw.startsWith('Delete')) actionWord = t('activity.actions.delete') || 'Delete'
          if (raw.startsWith('Login')) actionWord = t('activity.actions.login') || 'Login'
          if (raw.startsWith('Logout')) actionWord = t('activity.actions.logout') || 'Logout'
          if (raw.startsWith('Approve')) actionWord = t('activity.actions.approve') || 'Approve'
          if (raw.startsWith('Reject')) actionWord = t('activity.actions.reject') || 'Reject'

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
        header: t('activity.table.details') || 'Details',
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
        header: t('activity.table.userSource') || 'User / Source',
        cell: ({ row }) => {
          const raw = row.original.action || ''
          let userString = t('activity.source.system') || 'System Auto'
          if (raw.includes('- user: ')) {
            userString = t('activity.source.admin', { id: raw.split('- user: ')[1] }) || `Admin ID: ${raw.split('- user: ')[1]}`
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
    [t]
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
              {t('activity.title')}
            </h1>
            <p className="mt-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden sm:block">
              {t('activity.subtitle')}
            </p>
          </div>
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <SummaryCard
          title={t('activity.totalLogs')}
          value={logs.length.toLocaleString()}
          description={t('activity.recordedEvents')}
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
