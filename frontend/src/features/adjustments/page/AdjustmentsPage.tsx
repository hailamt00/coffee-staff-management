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
            Ghi Nhận Vi Phạm
          </h1>
          <p className="mt-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Employee Violations
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
          <TabsTrigger value="form" className="px-6 font-semibold">Ghi Nhận Vi Phạm</TabsTrigger>
          <TabsTrigger value="report" className="px-6 font-semibold">Báo Cáo Vi Phạm</TabsTrigger>
        </TabsList>

        <TabsContent value="form">
          <ViolationForm />
        </TabsContent>

        <TabsContent value="report" className="space-y-6">
          {/* KPI */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <SummaryCard
              title="Tổng số lỗi"
              value={stats.totalCount}
              description="Tháng này"
              icon={ClipboardList}
              color="cyan"
            />
            <SummaryCard
              title="Khen thưởng"
              value={stats.bonusCount}
              description="Số lượt"
              icon={TrendingUp}
              color="green"
            />
            <SummaryCard
              title="Vi phạm"
              value={stats.penaltyCount}
              description="Đã phạt"
              icon={TrendingDown}
              color="red"
            />
            <SummaryCard
              title="Tổng tiền phạt"
              value={formatMoney(Math.abs(stats.totalAmount))}
              description="VND"
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
