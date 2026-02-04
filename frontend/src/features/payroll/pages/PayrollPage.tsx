import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'
import { Badge } from '@/shared/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'
import {
  DollarSign,
  Users,
  CheckCircle,
  Clock,
} from 'lucide-react'

/* ================= TYPES ================= */

type PayrollStatus = 'paid' | 'pending'

type PayrollItem = {
  id: string
  employee: string
  baseSalary: number
  overtime: number
  deduction: number
  status: PayrollStatus
}

/* ================= MOCK DATA ================= */

const MOCK_PAYROLL: PayrollItem[] = [
  {
    id: '1',
    employee: 'Nguyen Van A',
    baseSalary: 1200,
    overtime: 150,
    deduction: 50,
    status: 'paid',
  },
  {
    id: '2',
    employee: 'Tran Thi B',
    baseSalary: 1000,
    overtime: 0,
    deduction: 0,
    status: 'pending',
  },
  {
    id: '3',
    employee: 'Le Van C',
    baseSalary: 900,
    overtime: 80,
    deduction: 30,
    status: 'paid',
  },
]

/* ================= HELPERS ================= */

function StatusBadge({ status }: { status: PayrollStatus }) {
  return status === 'paid' ? (
    <Badge className="bg-emerald-500/10 text-emerald-600">
      Paid
    </Badge>
  ) : (
    <Badge className="bg-amber-500/10 text-amber-600">
      Pending
    </Badge>
  )
}

function formatMoney(value: number) {
  return `$${value.toLocaleString()}`
}

/* ================= PAGE ================= */

export default function PayrollPage() {
  const [month, setMonth] = useState('01')
  const [year, setYear] = useState('2026')

  return (
    <div className="space-y-8">
      {/* ===== Header ===== */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-black dark:text-white">
            Payroll
          </h1>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Monthly salary overview and payment status
          </p>
        </div>

        <div className="flex gap-2">
          <Select value={month} onValueChange={setMonth}>
            <SelectTrigger className="w-24">
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
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2025">2025</SelectItem>
              <SelectItem value="2026">2026</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* ===== Summary ===== */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total Payroll"
          value="$3,350"
          icon={DollarSign}
        />
        <SummaryCard
          title="Paid"
          value="$2,380"
          icon={CheckCircle}
        />
        <SummaryCard
          title="Pending"
          value="$970"
          icon={Clock}
        />
        <SummaryCard
          title="Employees"
          value="3"
          icon={Users}
        />
      </div>

      {/* ===== Table ===== */}
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
      >
        <Card className="border border-slate-200 dark:border-neutral-800 bg-white dark:bg-black">
          <CardHeader>
            <CardTitle className="text-base font-semibold">
              Payroll Details
            </CardTitle>
          </CardHeader>

          <CardContent className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-200 dark:border-neutral-800 text-slate-500 dark:text-slate-400">
                  <th className="py-3 text-left">Employee</th>
                  <th className="py-3 text-right">Base</th>
                  <th className="py-3 text-right">Overtime</th>
                  <th className="py-3 text-right">Deduction</th>
                  <th className="py-3 text-right">Net</th>
                  <th className="py-3 text-right">Status</th>
                </tr>
              </thead>

              <tbody>
                {MOCK_PAYROLL.map((item) => {
                  const net =
                    item.baseSalary +
                    item.overtime -
                    item.deduction

                  return (
                    <tr
                      key={item.id}
                      className="border-b border-slate-100 dark:border-neutral-900 hover:bg-slate-50 dark:hover:bg-neutral-900"
                    >
                      <td className="py-3 font-medium text-black dark:text-white">
                        {item.employee}
                      </td>
                      <td className="py-3 text-right">
                        {formatMoney(item.baseSalary)}
                      </td>
                      <td className="py-3 text-right">
                        {formatMoney(item.overtime)}
                      </td>
                      <td className="py-3 text-right">
                        {formatMoney(item.deduction)}
                      </td>
                      <td className="py-3 text-right font-semibold">
                        {formatMoney(net)}
                      </td>
                      <td className="py-3 text-right">
                        <StatusBadge status={item.status} />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

/* ================= SUMMARY CARD ================= */

function SummaryCard({
  title,
  value,
  icon: Icon,
}: {
  title: string
  value: string
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
