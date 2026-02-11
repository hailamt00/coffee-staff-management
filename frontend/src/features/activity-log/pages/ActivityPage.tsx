import { useMemo } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { Button } from '@/shared/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import { DataTable } from '@/shared/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'

const logs = [
  {
    time: '2026-01-26 09:12',
    user: 'admin',
    action: 'LOGIN',
    resource: 'Auth',
    description: 'Admin logged in',
    status: 'SUCCESS',
  },
  {
    time: '2026-01-26 09:20',
    user: 'admin',
    action: 'UPDATE',
    resource: 'Staff',
    description: 'Updated staff salary',
    status: 'SUCCESS',
  },
  {
    time: '2026-01-26 09:25',
    user: 'admin',
    action: 'DELETE',
    resource: 'Attendance',
    description: 'Deleted attendance record',
    status: 'FAILED',
  },
]

export default function ActivityLogPage() {
  const columns = useMemo<ColumnDef<any>[]>(
    () => [
      {
        accessorKey: 'time',
        header: 'Time',
      },
      {
        accessorKey: 'user',
        header: 'User',
      },
      {
        accessorKey: 'action',
        header: 'Action',
        cell: ({ row }) => (
          <span className="font-medium text-black dark:text-white">
            {row.original.action}
          </span>
        ),
      },
      {
        accessorKey: 'resource',
        header: 'Resource',
      },
      {
        accessorKey: 'description',
        header: 'Description',
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => (
          <span
            className={
              row.original.status === 'SUCCESS'
                ? 'text-green-600 font-medium'
                : 'text-red-600 font-medium'
            }
          >
            {row.original.status}
          </span>
        ),
      },
    ],
    []
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="px-2">
        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
          Activity Log
        </h1>
        <p className="mt-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
          Audit_Trail & System_Pulse
        </p>
      </div>

      {/* Filters */}
      <Card className="border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50/50 dark:bg-black/20 border-b border-slate-100 dark:border-neutral-800">
          <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-slate-900 dark:bg-white animate-pulse" />
            Live Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">From Date</Label>
              <Input type="date" className="h-11 rounded-xl bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-white/10" />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">To Date</Label>
              <Input type="date" className="h-11 rounded-xl bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-white/10" />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">User Identity</Label>
              <Input placeholder="Search identity..." className="h-11 rounded-xl bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-white/10" />
            </div>

            <div className="space-y-2">
              <Label className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Action Type</Label>
              <Select defaultValue="ALL">
                <SelectTrigger className="h-11 rounded-xl bg-slate-50 dark:bg-white/5 border-slate-100 dark:border-white/10">
                  <SelectValue placeholder="Select action" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-100 dark:border-white/10">
                  <SelectItem value="ALL">ALL_OPERATIONS</SelectItem>
                  <SelectItem value="LOGIN">SYSTEM_LOGIN</SelectItem>
                  <SelectItem value="CREATE">RESOURCE_CREATE</SelectItem>
                  <SelectItem value="UPDATE">RESOURCE_UPDATE</SelectItem>
                  <SelectItem value="DELETE">RESOURCE_DELETE</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button className="w-full bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 border-none h-11 rounded-xl font-black uppercase tracking-widest text-[10px] shadow-lg shadow-black/5">
                Execute Filter
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50/50 dark:bg-black/20 border-b border-slate-100 dark:border-neutral-800">
          <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Log Entries</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={logs} />
        </CardContent>
      </Card>
    </div>
  )
}
