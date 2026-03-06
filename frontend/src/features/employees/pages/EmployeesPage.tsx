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
import { useTranslation } from 'react-i18next'

/* ================= PAGE ================= */

export default function EmployeesPage() {
  const navigate = useNavigate()
  const { employees, deleteEmployee, loading } = useEmployee()
  const [deleteTarget, setDeleteTarget] = useState<Employee | null>(null)
  const { t } = useTranslation()

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
      header: t('employees.table.code'),
      meta: { align: 'center', hideSortIcon: true },
      cell: ({ row }) => <span>{row.getValue("code") || '—'}</span>
    },
    {
      accessorKey: "name",
      header: t('employees.table.name'),
      meta: { align: 'left', hideSortIcon: true },
      cell: ({ row }) => <span className="font-semibold text-slate-900 dark:text-slate-100">{row.getValue("name") || '—'}</span>
    },
    {
      accessorKey: "cid",
      header: t('employees.table.cid'),
      meta: { align: 'center', hideSortIcon: true },
      cell: ({ row }) => <span>{row.getValue("cid") || '—'}</span>
    },
    {
      accessorKey: "dob",
      header: t('employees.table.dob'),
      meta: { align: 'center', hideSortIcon: true },
      cell: ({ row }) => <span>{row.getValue("dob") ? formatDate(row.getValue("dob")) : '—'}</span>
    },
    {
      accessorKey: "phone",
      header: t('employees.table.phone'),
      meta: { align: 'center', hideSortIcon: true },
      cell: ({ row }) => <span>{row.getValue("phone") || '—'}</span>
    },
    {
      accessorKey: "serviceSalary",
      header: t('employees.table.service'),
      meta: { align: 'right', hideSortIcon: true },
      cell: ({ row }) => <span>{formatMoney(row.getValue("serviceSalary"))}</span>
    },
    {
      accessorKey: "baristaSalary",
      header: t('employees.table.barista'),
      meta: { align: 'right', hideSortIcon: true },
      cell: ({ row }) => <span>{formatMoney(row.getValue("baristaSalary"))}</span>
    },
    {
      accessorKey: "hireDate",
      header: t('employees.table.hired'),
      meta: { align: 'center', hideSortIcon: true },
      cell: ({ row }) => <span>{formatDate(row.getValue("hireDate"))}</span>
    },
    {
      id: "actions",
      header: t('employees.table.actions'),
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
                {t('employees.title')}
              </h1>
              <p className="mt-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden sm:block">
                {t('employees.subtitle')}
              </p>
            </div>

            <Button onClick={() => navigate('/employees/add')} className="bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 border-none h-10 w-10 sm:w-auto sm:px-6 rounded-xl font-bold uppercase tracking-widest text-[10px]">
              <Plus className="sm:mr-2 h-4 w-4" />
              <span className="hidden sm:inline">{t('employees.add')}</span>
            </Button>
          </div>
        </div>

        {/* STATS SECTION */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <SummaryCard
            title={t('employees.stats.total')}
            value={stats.total.toLocaleString()}
            description={t('employees.stats.staffMembers')}
            icon={Users}
            color="cyan"
          />
          <SummaryCard
            title={t('employees.stats.active')}
            value={stats.activeCount.toLocaleString()}
            description={t('employees.stats.currentlyEmployed')}
            icon={UserCheck}
            color="green"
          />
          <SummaryCard
            title={t('employees.stats.avgService')}
            value={stats.avgServiceSalary}
            description={t('employees.stats.baseRate')}
            icon={TrendingUp}
            color="blue"
          />
          <SummaryCard
            title={t('employees.stats.avgBarista')}
            value={stats.avgBaristaSalary}
            description={t('employees.stats.specialistRate')}
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
        title={t('employees.delete.title')}
        description={deleteTarget ? t('employees.delete.description', { name: deleteTarget.name }) : undefined}
        onConfirm={confirmDelete}
      />
    </>
  )
}
