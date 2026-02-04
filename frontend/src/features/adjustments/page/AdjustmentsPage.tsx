import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  ClipboardList,
} from 'lucide-react'
import AdjustmentStatCard from '../components/AdjustmentStatCard'
import AdjustmentTable from '../components/AdjustmentTable'

export default function AdjustmentsPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-black dark:text-white">
          Adjustments
        </h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Bonuses, penalties and salary adjustments
        </p>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AdjustmentStatCard
          title="Total Adjustments"
          value={32}
          note="This month"
          icon={ClipboardList}
        />
        <AdjustmentStatCard
          title="Bonuses"
          value={18}
          note="Approved"
          icon={TrendingUp}
        />
        <AdjustmentStatCard
          title="Penalties"
          value={9}
          note="Applied"
          icon={TrendingDown}
        />
        <AdjustmentStatCard
          title="Total Amount"
          value={12000000}
          note="VND"
          icon={DollarSign}
        />
      </div>

      {/* Table */}
      <AdjustmentTable />
    </div>
  )
}
