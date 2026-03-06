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
import { motion } from 'framer-motion'
import ViolationForm from '../components/ViolationForm'
import { useTranslation } from 'react-i18next'

export default function AdjustmentsPage() {
  const { t } = useTranslation()
  const [month, setMonth] = useState('02') // Default Feb
  const [year, setYear] = useState('2026')

  const { useAdjustments, updateAdjustment, deleteAdjustment, loading: mutationLoading } = useAdjustment()
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
              {t('adjustments.title')}
            </h1>
            <p className="mt-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden sm:block">
              {t('adjustments.subtitle')}
            </p>
          </div>

          <div className="flex gap-2 items-center bg-slate-100 dark:bg-neutral-800 p-1.5 rounded-2xl">
            <Select value={month} onValueChange={setMonth}>
              <SelectTrigger className="w-20 h-10 bg-white dark:bg-black border-none text-sm font-bold px-4 rounded-xl shadow-sm tabular-nums">
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
              <SelectTrigger className="w-24 h-10 bg-white dark:bg-black border-none text-sm font-bold px-4 rounded-xl shadow-sm tabular-nums">
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
      </div>

      {/* Tabs Layout */}
      <Tabs defaultValue="form" className="w-full space-y-6 overflow-visible">
        <div className="px-1">
          <TabsList className="bg-slate-100 dark:bg-neutral-800 p-1 rounded-2xl">
            <TabsTrigger value="form" className="px-6 font-bold uppercase tracking-widest text-[10px] rounded-xl h-9">
              {t('adjustments.tabs.record')}
            </TabsTrigger>
            <TabsTrigger value="report" className="px-6 font-bold uppercase tracking-widest text-[10px] rounded-xl h-9">
              {t('adjustments.tabs.report')}
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="form">
          <ViolationForm />
        </TabsContent>

        <TabsContent value="report" className="space-y-6">
          {/* KPI */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <SummaryCard
              title={t('adjustments.kpi.total')}
              value={stats.totalCount.toLocaleString()}
              description={t('adjustments.kpi.totalDesc')}
              icon={ClipboardList}
              color="cyan"
            />
            <SummaryCard
              title={t('adjustments.kpi.rewards')}
              value={stats.bonusCount.toLocaleString()}
              description={`${formatMoney(stats.bonusAmount)} VND`}
              icon={TrendingUp}
              color="green"
            />
            <SummaryCard
              title={t('adjustments.kpi.penalties')}
              value={stats.penaltyCount.toLocaleString()}
              description={`${formatMoney(stats.penaltyAmount)} VND`}
              icon={TrendingDown}
              color="red"
            />
            <SummaryCard
              title={t('adjustments.kpi.netValue')}
              value={formatMoney(stats.netAmount)}
              description={t('adjustments.kpi.afterAdj')}
              icon={DollarSign}
              color="cyan"
            />
          </div>

          <div className="px-1">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-slate-100 dark:border-neutral-800 shadow-sm overflow-hidden">
              <AdjustmentTable
                data={adjustments}
                loading={loading}
                onEdit={(id, payload) => updateAdjustment({ id, payload })}
                onDelete={deleteAdjustment}
              />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </motion.div>
  )
}
