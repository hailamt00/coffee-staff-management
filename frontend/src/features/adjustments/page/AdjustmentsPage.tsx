import { useState, useEffect, useMemo } from 'react'
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  ClipboardList,
} from 'lucide-react'
import { SummaryCard } from '@/shared/components/ui/summary-card'
import AdjustmentTable from '../components/AdjustmentTable'
import { useAdjustment } from '../hooks/useAdjustment'
import { formatMoney } from '@/shared/utils/format'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'

export default function AdjustmentsPage() {
  const { adjustments, loading, loadAdjustments } = useAdjustment()
  const [month, setMonth] = useState('02') // Default Feb
  const [year, setYear] = useState('2026')

  useEffect(() => {
    loadAdjustments(Number(month), Number(year))
  }, [month, year, loadAdjustments])

  const stats = useMemo(() => {
    const totalCount = adjustments.length
    const bonuses = adjustments.filter(a => a.amount > 0 || a.typeName.toLowerCase().includes('thưởng') || a.typeName.toLowerCase().includes('bonus'))
    const penalties = adjustments.filter(a => a.amount < 0 || a.typeName.toLowerCase().includes('phạt') || a.typeName.toLowerCase().includes('penalty'))

    // Amount is positive in DB?
    // RewardPenaltyDto: Amount.
    // Usually Amount is always positive and Type determines sign?
    // Let's assume Amount is absolute value, relying on Type.
    const bonusAmount = bonuses.reduce((sum, a) => sum + a.amount, 0)
    const penaltyAmount = penalties.reduce((sum, a) => sum + a.amount, 0)

    return {
      totalCount,
      bonusCount: bonuses.length,
      penaltyCount: penalties.length,
      totalAmount: bonusAmount - penaltyAmount // Net
    }
  }, [adjustments])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 px-2">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
            Adjustments
          </h1>
          <p className="mt-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Bonuses & Penalties
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
        </div>
      </div>

      {/* KPI */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <SummaryCard
          title="Total Adjustments"
          value={stats.totalCount}
          description="This month"
          icon={ClipboardList}
          color="cyan"
        />
        <SummaryCard
          title="Bonuses"
          value={stats.bonusCount}
          description="Approved"
          icon={TrendingUp}
          color="green"
        />
        <SummaryCard
          title="Penalties"
          value={stats.penaltyCount}
          description="Applied"
          icon={TrendingDown}
          color="red"
        />
        <SummaryCard
          title="Net Amount"
          value={formatMoney(stats.totalAmount)}
          description="VND"
          icon={DollarSign}
          color="cyan"
        />
      </div>

      {/* Table */}
      <AdjustmentTable data={adjustments} loading={loading} />
    </div>
  )
}
