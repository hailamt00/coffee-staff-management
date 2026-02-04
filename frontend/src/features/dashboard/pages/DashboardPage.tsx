import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/ui/card'
import {
  Users,
  UserCheck,
  UserX,
  Shield,
  ArrowUpRight,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { useCountUp } from '@/shared/hooks/useCountUp'
import type { ElementType } from 'react'

type StatCardProps = {
  title: string
  value: number
  note: string
  icon: ElementType
}

function StatCard({ title, value, note, icon: Icon }: StatCardProps) {
  const animatedValue = useCountUp(value)

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
    >
      <Card
        className="
          relative
          border border-slate-200 dark:border-neutral-800
          bg-white dark:bg-black
          transition-all duration-300
          hover:shadow-md
          dark:hover:shadow-[0_0_0_1px_var(--accent-glow),0_12px_32px_-12px_var(--accent-glow)]
        "
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {title}
          </CardTitle>
          <Icon className="h-4 w-4 text-slate-400 dark:text-slate-500" />
        </CardHeader>

        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-semibold text-black dark:text-white">
                {animatedValue}
              </div>
              <p className="mt-1 text-xs text-slate-400 dark:text-slate-500">
                {note}
              </p>
            </div>

            <ArrowUpRight className="h-4 w-4 text-slate-300 dark:text-slate-600" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-black dark:text-white">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Overview of staff activity and system access
        </p>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Staff"
          value={24}
          note="All employees"
          icon={Users}
        />
        <StatCard
          title="Active Today"
          value={18}
          note="Checked-in"
          icon={UserCheck}
        />
        <StatCard
          title="On Leave"
          value={4}
          note="Approved leave"
          icon={UserX}
        />
        <StatCard
          title="Admins"
          value={2}
          note="System access"
          icon={Shield}
        />
      </div>

      {/* Overview */}
      <Card className="border border-slate-200 dark:border-neutral-800 bg-white dark:bg-black">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-black dark:text-white">
            Overview
          </CardTitle>
        </CardHeader>

        <CardContent className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
          <p>
            Welcome back,
            <span className="ml-1 font-medium text-black dark:text-white">
              Admin
            </span>
            .
          </p>
          <p className="mt-2">
            This dashboard gives you a quick snapshot of staff
            attendance, leave status, and system access.
            <br />
            Use the sidebar to navigate through management features.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
