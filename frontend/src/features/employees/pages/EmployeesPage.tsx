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
import { SummaryCard } from '@/shared/components/ui/summary-card'

import { DeleteConfirmDialog } from '@/shared/components/ui/delete-confirm-dialog'

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
      meta: { align: 'center', hideSortIcon: true },
      cell: ({ row, table }) => {
        const pageIndex = table.getState().pagination.pageIndex
        const pageSize = table.getState().pagination.pageSize
        const localIndex = table.getRowModel().rows.findIndex((r) => r.id === row.id)
        const displayIndex = pageIndex * pageSize + (localIndex >= 0 ? localIndex : row.index) + 1

        return <span className="text-slate-500">{displayIndex}</span>
      }
    },
    {
      accessorKey: "code",
      header: "Code",
      meta: { align: 'center', hideSortIcon: true },
      cell: ({ row }) => <span>{row.getValue("code") || '—'}</span>
    },
    {
      accessorKey: "name",
      header: "Name",
      meta: { align: 'left', hideSortIcon: true },
      cell: ({ row }) => <span className="font-semibold text-slate-900 dark:text-slate-100">{row.getValue("name") || '—'}</span>
    },
    {
      accessorKey: "cid",
      header: "CID",
      meta: { align: 'center', hideSortIcon: true },
      cell: ({ row }) => <span>{row.getValue("cid") || '—'}</span>
    },
    {
      accessorKey: "dob",
      header: "DOB",
      meta: { align: 'center', hideSortIcon: true },
      cell: ({ row }) => <span>{row.getValue("dob") ? formatDate(row.getValue("dob")) : '—'}</span>
    },
    {
      accessorKey: "phone",
      header: "Phone",
      meta: { align: 'center', hideSortIcon: true },
      cell: ({ row }) => <span>{row.getValue("phone") || '—'}</span>
    },
    {
      accessorKey: "serviceSalary",
      header: "Service",
      meta: { align: 'right', hideSortIcon: true },
      cell: ({ row }) => <span>{formatMoney(row.getValue("serviceSalary"))}</span>
    },
    {
      accessorKey: "baristaSalary",
      header: "Barista",
      meta: { align: 'right', hideSortIcon: true },
      cell: ({ row }) => <span>{formatMoney(row.getValue("baristaSalary"))}</span>
    },
    {
      accessorKey: "hireDate",
      header: "Hired",
      meta: { align: 'center', hideSortIcon: true },
      cell: ({ row }) => <span>{formatDate(row.getValue("hireDate"))}</span>
    },
    {
      id: "actions",
      header: "Actions",
      meta: { align: 'center', hideSortIcon: true },
      cell: ({ row }) => {
        return (
          <div className="flex items-center justify-center gap-2">
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
                Staff Directory
              </p>
            </div>

            <Button onClick={() => navigate('/employees/add')} className="bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 border-none h-10 w-10 sm:w-auto sm:px-6 rounded-xl font-bold uppercase tracking-widest text-[10px]">
              <Plus className="sm:mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Add Employee</span>
            </Button>
          </div>
        </div>

        {/* STATS SECTION */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <SummaryCard
            title="Total"
            value={stats.total.toLocaleString()}
            description="Staff members"
            icon={Users}
            color="cyan"
          />
          <SummaryCard
            title="Active"
            value={stats.activeCount.toLocaleString()}
            description="Currently employed"
            icon={UserCheck}
            color="green"
          />
          <SummaryCard
            title="Avg Service"
            value={stats.avgServiceSalary}
            description="Base rate"
            icon={TrendingUp}
            color="blue"
          />
          <SummaryCard
            title="Avg Barista"
            value={stats.avgBaristaSalary}
            description="Specialist rate"
            icon={Briefcase}
            color="orange"
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
      <DeleteConfirmDialog
        open={!!deleteTarget}
        onOpenChange={(open) => !open && setDeleteTarget(null)}
        title="Delete employee"
        description={deleteTarget ? `Are you sure you want to delete ${deleteTarget.name}? This action is irreversible and will remove all related records.` : undefined}
        onConfirm={confirmDelete}
      />
    </>
  )
}
