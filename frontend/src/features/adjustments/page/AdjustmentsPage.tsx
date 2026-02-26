import { useState, useMemo } from 'react'
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import ViolationForm from '../components/ViolationForm'

export default function AdjustmentsPage() {
  const [month, setMonth] = useState('02') // Default Feb
  const [year, setYear] = useState('2026')

  const { useAdjustments, loading: mutationLoading } = useAdjustment()
  const { data: adjustments = [], isLoading: queryLoading } = useAdjustments(Number(month), Number(year))

  const loading = mutationLoading || queryLoading

  const stats = useMemo(() => {
    const bonuses = adjustments.filter(a => a.kind === 'Reward')
    const penalties = adjustments.filter(a => a.kind === 'Penalty')

    const bonusAmount = bonuses.reduce((sum, a) => sum + a.amount, 0)
    const penaltyAmount = penalties.reduce((sum, a) => sum + a.amount, 0)

    return {
      totalCount: adjustments.length,
      bonusCount: bonuses.length,
      penaltyCount: penalties.length,
      bonusAmount,
      penaltyAmount,
      netAmount: bonusAmount - penaltyAmount
    }
  }, [adjustments])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4 px-2">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
            Khen Thưởng & Vi Phạm
          </h1>
          <p className="mt-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Employee Adjustments
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

      {/* Tabs Layout */}
      <Tabs defaultValue="form" className="w-full space-y-6">
        <TabsList className="bg-slate-100 dark:bg-neutral-900 p-1">
          <TabsTrigger value="form" className="px-6 font-semibold">Ghi Nhận Thưởng/Phạt</TabsTrigger>
          <TabsTrigger value="report" className="px-6 font-semibold">Báo Cáo Tổng Hợp</TabsTrigger>
        </TabsList>

        <TabsContent value="form">
          <ViolationForm />
        </TabsContent>

        <TabsContent value="report" className="space-y-6">
          {/* KPI */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SummaryCard
              title="Tổng lượt"
              value={stats.totalCount}
              description="Xử lý trong tháng"
              icon={ClipboardList}
              color="cyan"
            />
            <SummaryCard
              title="Khen thưởng"
              value={stats.bonusCount}
              description={`${formatMoney(stats.bonusAmount)} VND`}
              icon={TrendingUp}
              color="green"
            />
            <SummaryCard
              title="Vi phạm"
              value={stats.penaltyCount}
              description={`${formatMoney(stats.penaltyAmount)} VND`}
              icon={TrendingDown}
              color="red"
            />
            <SummaryCard
              title="Thực nhận"
              value={formatMoney(stats.netAmount)}
              description="VND (Sau bù trừ)"
              icon={DollarSign}
              color="cyan"
            />
          </div>

          <AdjustmentTable data={adjustments} loading={loading} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
