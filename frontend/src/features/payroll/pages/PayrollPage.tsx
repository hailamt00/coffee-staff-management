import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { usePayroll } from '../hooks/usePayroll'
import {
  Card,
  CardContent,
} from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import {
  DollarSign,
  Users,
  Play,
  Wallet,
} from 'lucide-react'
import { formatMoney } from '@/shared/utils/format'
import { StatCard } from '@/shared/components/StatCard'
import { DataTable } from '@/shared/components/ui/data-table'
import type { ColumnDef } from '@tanstack/react-table'
import type { Payroll } from '@/shared/types/api'

/* ================= PAGE ================= */

export default function PayrollPage() {
  const [month, setMonth] = useState('02') // Default to current month
  const [year, setYear] = useState('2026')

  const { usePayrolls, loading: mutationLoading, generatePayroll } = usePayroll()
  const { data: payrolls = [], isLoading: queryLoading } = usePayrolls(Number(month), Number(year))

  const loading = mutationLoading || queryLoading

  const handleGenerate = async () => {
    await generatePayroll(1, Number(month), Number(year))
  }

  // Calculate statistics
  const stats = useMemo(() => {
    const totalPayroll = payrolls.reduce((sum, p) => sum + p.totalSalary, 0)
    const totalEmployees = payrolls.length
    const avgSalary = totalEmployees > 0 ? totalPayroll / totalEmployees : 0

    return {
      totalPayroll: formatMoney(totalPayroll),
      totalEmployees,
      avgSalary: formatMoney(avgSalary),
    }
  }, [payrolls])

  const columns = useMemo<ColumnDef<Payroll>[]>(() => [
    {
      accessorKey: "employeeName",
      header: "Employee",
      cell: ({ row }) => <div className="font-medium text-slate-900 dark:text-slate-100">{row.original.employeeName || `Employee #${row.original.employeeId}`}</div>
    },
    {
      accessorKey: "totalSalary",
      header: () => <div className="text-right">Total Salary</div>,
      cell: ({ row }) => <div className="text-right font-semibold text-emerald-600">{formatMoney(row.getValue("totalSalary"))}</div>
    },
    {
      accessorKey: "createdAt",
      header: () => <div className="text-right">Created At</div>,
      cell: ({ row }) => <div className="text-right text-slate-500">{new Date(row.getValue("createdAt")).toLocaleDateString()}</div>
    }
  ], [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-8"
    >
      {/* ===== Header ===== */}
      <div className="flex flex-wrap items-end justify-between gap-4 px-2">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
            Payroll
          </h1>
          <p className="mt-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Compensation Analysis
          </p>
        </div>

        <div className="flex gap-2 items-center">
          <Select value={month} onValueChange={setMonth}>
            <SelectTrigger className="w-20 h-10 rounded-lg border-slate-200 dark:border-neutral-800">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 12 }).map((_, i) => {
                const m = String(i + 1).padStart(2, '0')
                return (
                  <SelectItem key={m} value={m}>
                    {m}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>

          <Select value={year} onValueChange={setYear}>
            <SelectTrigger className="w-24 h-10 rounded-lg border-slate-200 dark:border-neutral-800">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {['2024', '2025', '2026', '2027'].map((y) => (
                <SelectItem key={y} value={y}>
                  {y}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            onClick={handleGenerate}
            className="bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-slate-200 border-none h-10 px-6 rounded-lg font-bold uppercase tracking-widest text-[10px]"
          >
            <Play className="mr-2 h-4 w-4" />
            Generate Payroll
          </Button>
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Payroll"
          value={stats.totalPayroll}
          description={`${month}/${year}`}
          icon={DollarSign}
          iconColor="text-emerald-600 dark:text-emerald-400"
          trend="up"
          trendValue="Monthly disbursement"
        />
        <StatCard
          title="Employees Paid"
          value={stats.totalEmployees}
          description="Total recipients"
          icon={Users}
          iconColor="text-blue-600 dark:text-blue-400"
        />
        <StatCard
          title="Average Salary"
          value={stats.avgSalary}
          description="Per employee"
          icon={Wallet}
          iconColor="text-purple-600 dark:text-purple-400"
        />
      </div>

      {/* ===== TABLE ===== */}
      <Card className="border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
        <CardContent className="p-6">
          <h2 className="mb-4 text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            Payroll Records
          </h2>

          <DataTable
            columns={columns}
            data={payrolls}
            searchKey="employeeName"
            loading={loading}
          />
        </CardContent>
      </Card>
    </motion.div>
  )
}
