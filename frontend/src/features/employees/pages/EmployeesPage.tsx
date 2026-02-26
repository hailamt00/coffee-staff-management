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

import { Card, CardContent } from '@/shared/components/ui/card'
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
      cell: ({ row }) => <div className="text-muted-foreground">{row.index + 1}</div>
    },
    {
      accessorKey: "code",
      header: "Code",
      cell: ({ row }) => <div className="font-medium">{row.getValue("code") || '—'}</div>
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div className="font-semibold text-slate-900 dark:text-slate-100">{row.getValue("name") || '—'}</div>
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) => <div>{row.getValue("phone") || '—'}</div>
    },
    {
      accessorKey: "cid",
      header: "CID",
      cell: ({ row }) => <div>{row.getValue("cid") || '—'}</div>
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ row }) => <div>{row.getValue("gender") || '—'}</div>
    },
    {
      accessorKey: "serviceSalary",
      header: "Service Salary",
      cell: ({ row }) => <div className="text-right">{formatMoney(row.getValue("serviceSalary"))}</div>
    },
    {
      accessorKey: "baristaSalary",
      header: "Barista Salary",
      cell: ({ row }) => <div className="text-right">{formatMoney(row.getValue("baristaSalary"))}</div>
    },
    {
      accessorKey: "dob",
      header: "DOB",
      cell: ({ row }) => <div>{formatDate(row.getValue("dob"))}</div>
    },
    {
      accessorKey: "hireDate",
      header: "Hire Date",
      cell: ({ row }) => <div>{formatDate(row.getValue("hireDate"))}</div>
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-full bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-slate-200"
              onClick={() => navigate(`/employees/${row.original.id}/edit`)}
            >
              <Pencil size={14} />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 rounded-full bg-red-500 hover:bg-red-600 text-white"
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
        className="space-y-6"
      >
        {/* HEADER */}
        <div className="flex flex-wrap items-end justify-between gap-4 px-2">
          <div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
              Employees
            </h1>
            <p className="mt-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              Staff_Directory
            </p>
          </div>

          <Button onClick={() => navigate('/employees/add')} className="bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 border-none h-10 px-6 rounded-lg font-bold uppercase tracking-widest text-[10px]">
            <Plus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </div>

        {/* STATS SECTION */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Employees"
            value={stats.total}
            description="Active workforce"
            icon={Users}
            iconColor="text-slate-900 dark:text-white"
          />
          <StatCard
            title="Active Staff"
            value={stats.activeCount}
            description="Currently employed"
            icon={UserCheck}
            iconColor="text-green-600 dark:text-green-400"
            trend="up"
            trendValue={`${stats.activeCount} of ${stats.total}`}
          />
          <StatCard
            title="Avg Service Salary"
            value={stats.avgServiceSalary}
            description="Per employee"
            icon={TrendingUp}
            iconColor="text-blue-600 dark:text-blue-400"
          />
          <StatCard
            title="Avg Barista Salary"
            value={stats.avgBaristaSalary}
            description="Per employee"
            icon={Briefcase}
            iconColor="text-purple-600 dark:text-purple-400"
          />
        </div>

        <Card className="border border-slate-200/60 dark:border-neutral-800/60 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-sm rounded-xl overflow-hidden">
          <CardContent className="p-0">
            <div className="p-6 border-b border-slate-100 dark:border-neutral-800/50 flex items-center justify-between">
              <h2 className="text-xs font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">
                Employee_Roster
              </h2>
            </div>

            <div className="p-2">
              <DataTable
                columns={columns}
                data={employees}
                searchKey="name"
                loading={loading}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ===== DELETE CONFIRM (SHADCN) ===== */}
      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete employee</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{' '}
              <span className="font-semibold">
                {deleteTarget?.name}
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

/* ================= SMALL COMPONENTS ================= */

