import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Plus,
  Pencil,
  Trash2,
  Users,
  UserCheck,
  TrendingUp,
  Briefcase,
} from 'lucide-react'
import type { ColumnDef } from '@tanstack/react-table'
import { DataTable } from '@/shared/components/ui/data-table'
import { StatCard } from '@/shared/components/StatCard'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/shared/components/ui/dialog'

import { Button } from '@/shared/components/ui/button'

import type { Employee } from '@/shared/types/api'
import { useEmployee } from '../hooks/useEmployee'

import { formatMoney, formatDate } from '@/shared/utils/format'

/* ================= PAGE ================= */

export default function EmployeesPage() {
  const navigate = useNavigate()
  const { employees, deleteEmployee, loading } = useEmployee()
  const [deleteTarget, setDeleteTarget] = useState<Employee | null>(null)

  // Calculate statistics
  const stats = useMemo(() => {
    const total = employees.length
    const activeCount = employees.filter(e => e.hireDate).length
    const avgServiceSalary = employees.reduce((sum, e) => sum + (e.serviceSalary || 0), 0) / (total || 1)
    const avgBaristaSalary = employees.reduce((sum, e) => sum + (e.baristaSalary || 0), 0) / (total || 1)

    return {
      total,
      activeCount,
      avgServiceSalary: formatMoney(avgServiceSalary),
      avgBaristaSalary: formatMoney(avgBaristaSalary),
    }
  }, [employees])

  /* ===== COLUMNS ===== */
  const columns = useMemo<ColumnDef<Employee>[]>(() => [
    {
      id: "index",
      header: "#",
      cell: ({ row, table }) => {
        const pageIndex = table.getState().pagination.pageIndex
        const pageSize = table.getState().pagination.pageSize
        const localIndex = table.getRowModel().rows.findIndex((r) => r.id === row.id)
        const displayIndex = pageIndex * pageSize + (localIndex >= 0 ? localIndex : row.index) + 1

        return <div className="text-muted-foreground">{displayIndex}</div>
      }
    },
    {
      accessorKey: "code",
      header: "Code",
      cell: ({ row }) => <div className="font-medium">{row.getValue("code") || '—'}</div>
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div className="font-bold text-slate-900 dark:text-slate-100">{row.getValue("name") || '—'}</div>
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => <div className="tabular-nums">{row.getValue("phone") || '—'}</div>
    },
    {
      accessorKey: "serviceSalary",
      header: "Service",
      cell: ({ row }) => <div className="text-right font-mono font-medium">{formatMoney(row.getValue("serviceSalary"))}</div>
    },
    {
      accessorKey: "baristaSalary",
      header: "Barista",
      cell: ({ row }) => <div className="text-right font-mono font-medium">{formatMoney(row.getValue("baristaSalary"))}</div>
    },
    {
      accessorKey: "hireDate",
      header: "Hired",
      cell: ({ row }) => <div className="text-right tabular-nums">{formatDate(row.getValue("hireDate"))}</div>
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-end gap-2">
            <Button
              size="icon"
              variant="outline"
              className="h-9 w-9 rounded-xl border-slate-200 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
              onClick={() => navigate(`/employees/${row.original.id}/edit`)}
            >
              <Pencil size={14} />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="h-9 w-9 rounded-xl border-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-all"
              onClick={() => setDeleteTarget(row.original)}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        )
      }
    }
  ], [navigate])


  const confirmDelete = async () => {
    if (!deleteTarget) return
    await deleteEmployee(deleteTarget.id)
    setDeleteTarget(null)
  }

  return (
    <>
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
                Employees
              </h1>
              <p className="mt-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden sm:block">
                Staff_Directory
              </p>
            </div>

            <Button onClick={() => navigate('/employees/add')} className="bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 border-none h-10 w-10 sm:w-auto sm:px-6 rounded-xl font-bold uppercase tracking-widest text-[10px]">
              <Plus className="sm:mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Add Employee</span>
            </Button>
          </div>
        </div>

        {/* STATS SECTION */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          <StatCard
            title="Total"
            value={stats.total}
            description="Staff members"
            icon={Users}
            iconColor="text-slate-900 dark:text-white"
          />
          <StatCard
            title="Active"
            value={stats.activeCount}
            description="Currently employed"
            icon={UserCheck}
            iconColor="text-emerald-600 dark:text-emerald-400"
          />
          <StatCard
            title="Avg Service"
            value={stats.avgServiceSalary}
            description="Base rate"
            icon={TrendingUp}
            iconColor="text-blue-600 dark:text-blue-400"
          />
          <StatCard
            title="Avg Barista"
            value={stats.avgBaristaSalary}
            description="Specialist rate"
            icon={Briefcase}
            iconColor="text-purple-600 dark:text-purple-400"
          />
        </div>

        <div className="px-1">
          <DataTable
            columns={columns}
            data={employees}
            searchKey="name"
            loading={loading}
          />
        </div>
      </motion.div>

      {/* ===== DELETE CONFIRM (SHADCN) ===== */}
      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent className="max-w-md w-[95vw] rounded-[2rem] border-none shadow-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black tracking-tighter text-red-600">Delete employee</DialogTitle>
            <DialogDescription className="text-slate-500 font-medium py-4">
              Are you sure you want to delete{' '}
              <span className="font-black text-slate-900 dark:text-white underline decoration-red-500/30">
                {deleteTarget?.name}
              </span>
              ? This action is irreversible and will remove all related records.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="flex sm:flex-row gap-2">
            <Button variant="ghost" onClick={() => setDeleteTarget(null)} className="flex-1 h-12 rounded-xl font-bold">
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete} className="flex-1 h-12 rounded-xl font-black uppercase tracking-widest text-[10px]">
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
