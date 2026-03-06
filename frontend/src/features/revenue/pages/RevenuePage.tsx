import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useRevenue } from '../hooks/useRevenue'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { formatMoney } from '@/shared/utils/format'
import { formatDateInVietnam } from '@/shared/utils/datetime'
import { DataTable } from '@/shared/components/ui/data-table'
import type { ColumnDef } from '@tanstack/react-table'
import { Revenue } from '@/shared/types/api'
import { SummaryCard } from '@/shared/components/ui/summary-card'
import { FileText, TrendingUp, TrendingDown, DollarSign, Wallet } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function RevenuePage() {
    const { t } = useTranslation()
    const [tempStartDate, setTempStartDate] = useState('01/03/2026')
    const [tempEndDate, setTempEndDate] = useState('31/03/2026')
    const [appliedRange, setAppliedRange] = useState({ from: '2026-03-01', to: '2026-03-31' })

    const { useRevenuesByRange, loading: mutationLoading } = useRevenue()
    const { data: revenues = [], isLoading } = useRevenuesByRange(appliedRange.from, appliedRange.to)
    const loading = mutationLoading || isLoading

    const parseVNToISO = (vnDate: string) => {
        const [d, m, y] = vnDate.split('/')
        if (!d || !m || !y) return ''
        return `${y}-${m.padStart(2, '0')}-${d.padStart(2, '0')}`
    }

    const handleSearch = () => {
        const from = parseVNToISO(tempStartDate)
        const to = parseVNToISO(tempEndDate)
        if (from && to) {
            setAppliedRange({ from, to })
        }
    }

    // === COMPUTED TOTALS ===
    const totals = useMemo(() => {
        let totalRevenueSum = 0
        let totalExpensesSum = 0
        let totalNetSum = 0
        let totalActualSum = 0
        let totalDeviationSum = 0
        let totalIncomeSum = 0

        revenues.forEach((r: Revenue) => {
            totalRevenueSum += r.totalRevenue
            totalNetSum += r.net
            totalDeviationSum += r.deviation
            totalExpensesSum += r.expenses
            totalIncomeSum += r.income
            // Doanh thu thực tế sau thu/chi = cash + bank - openingBalance
            totalActualSum += r.cash + r.bank - r.openingBalance
        })

        return { totalRevenueSum, totalExpensesSum, totalNetSum, totalActualSum, totalDeviationSum, totalIncomeSum }
    }, [revenues])


    // === DETAIL COLUMNS (Daily Revenue Details) ===
    const detailColumns = useMemo<ColumnDef<Revenue>[]>(() => [
        {
            accessorKey: "workDate",
            header: t('revenue.table.date'),
            cell: ({ row }) => {
                const date = row.original.workDate || row.original.createdAt;
                return (
                    <div className="text-slate-500 whitespace-nowrap text-[13px]">
                        {formatDateInVietnam(date)}
                    </div>
                )
            }
        },
        {
            accessorKey: "openingBalance",
            header: t('revenue.table.opening'),
            cell: ({ row }) => (
                <div className="tabular-nums text-slate-500 text-[13px]">
                    {formatMoney(row.original.openingBalance)}
                </div>
            )
        },
        {
            id: "tm_ck",
            header: t('revenue.table.tm_ck'),
            cell: ({ row }) => (
                <div className="flex flex-col tabular-nums text-slate-500 text-[13px] leading-relaxed">
                    <span><strong className="text-slate-700 dark:text-slate-300">{t('staff.revenue.fields.cash').split(' ')[0]}:</strong> {formatMoney(row.original.cash)}</span>
                    <span><strong className="text-slate-700 dark:text-slate-300">{t('staff.revenue.fields.bank').split(' ')[0]}:</strong> {formatMoney(row.original.bank)}</span>
                </div>
            )
        },
        {
            id: "chi_thu",
            header: t('revenue.table.chi_thu'),
            cell: ({ row }) => {
                const { expenses, income, exNote, inNote } = row.original;
                return (
                    <div className="flex flex-col text-[13px] leading-relaxed min-w-[120px]">
                        {expenses > 0 && (
                            <div className="flex flex-col">
                                <span className="text-rose-600 font-medium"><strong className="text-slate-700 dark:text-slate-300">-{t('staff.revenue.sections.expenses').toUpperCase().slice(0, 3)}:</strong> {formatMoney(expenses)}</span>
                                {exNote && <span className="text-[11px] text-slate-500 leading-tight italic ml-4 mb-1">{exNote}</span>}
                            </div>
                        )}
                        {income > 0 && (
                            <div className="flex flex-col">
                                <span className="text-emerald-600 font-medium"><strong className="text-slate-700 dark:text-slate-300">+{t('staff.revenue.sections.incomes').toUpperCase().slice(0, 3)}:</strong> {formatMoney(income)}</span>
                                {inNote && <span className="text-[11px] text-slate-500 leading-tight italic ml-4 mb-1">{inNote}</span>}
                            </div>
                        )}
                        {!expenses && !income && <span className="text-slate-400">—</span>}
                    </div>
                )
            }
        },


        {
            accessorKey: "totalRevenue",
            header: t('revenue.table.revenue'),
            cell: ({ row }) => (
                <div className="tabular-nums text-slate-500 text-[13px] font-bold">
                    {formatMoney(row.original.totalRevenue)}
                </div>
            )
        },
        {
            accessorKey: "net",
            header: t('revenue.table.net'),
            cell: ({ row }) => (
                <div className="tabular-nums text-slate-500 text-[13px]">
                    {formatMoney(row.original.net)}
                </div>
            )
        },
        {
            accessorKey: "deviation",
            header: t('revenue.table.diff'),
            cell: ({ row }) => {
                const d = row.original.deviation;
                return (
                    <div className={`tabular-nums text-[13px] font-medium ${d < 0 ? 'text-rose-500' : d > 0 ? 'text-emerald-500' : 'text-slate-500'}`}>
                        {formatMoney(d)}
                    </div>
                )
            }
        },
        {
            accessorKey: "note",
            header: t('revenue.table.staff'),
            cell: ({ row }) => {
                return (
                    <div className="flex flex-col text-[13px] text-slate-700 dark:text-slate-300">
                        <strong className="text-slate-400 dark:text-slate-500 text-[11px] uppercase tracking-wider">{row.original.employeeName}</strong>
                    </div>
                )
            }
        }

    ], [])


    // === EXPENSES SUMMARY COLUMNS (Detailed Expenses Table) ===
    const expenseColumns = useMemo<ColumnDef<Revenue>[]>(() => [
        {
            accessorKey: "workDate",
            header: t('revenue.table.date'),
            cell: ({ row }) => (
                <div className="font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap text-xs">
                    {formatDateInVietnam(row.original.workDate || row.original.createdAt)}
                </div>
            )
        },
        {
            id: "reason",
            header: t('revenue.table.desc'),
            cell: ({ row }) => (
                <div className="text-xs font-medium text-slate-700 dark:text-slate-300">
                    {row.original.exNote || row.original.note || ''}
                </div>
            )
        },

        {
            id: "amount",
            header: t('revenue.table.amount'),
            cell: ({ row }) => {
                const hasExpenses = row.original.expenses > 0;
                return (
                    <div className="text-right tabular-nums font-bold text-rose-600 dark:text-rose-500 text-xs">
                        {hasExpenses ? formatMoney(row.original.expenses) : '—'}
                    </div>
                )
            }
        }
    ], [])

    // Filter for the Summary Table
    const expenseRows = useMemo(() => {
        return revenues.filter((r: Revenue) => r.expenses > 0 || (r.note && r.note.trim() !== ''));
    }, [revenues])

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 pb-20"
        >
            {/* HEADER */}
            <div className="flex flex-col gap-6 px-1">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
                            {t('revenue.title')}
                        </h1>
                        <p className="mt-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden sm:block">
                            {t('revenue.subtitle')} {tempStartDate} - {tempEndDate}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <div className="flex items-center gap-2 bg-slate-100 dark:bg-neutral-900 p-1.5 rounded-2xl border border-transparent dark:border-neutral-800">
                            <div className="flex items-center gap-2 sm:gap-4 px-2">
                                <div className="hidden sm:flex flex-col text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-tighter leading-[1.1]">
                                    <span>{t('revenue.actions.from').split(' ')[0]}</span>
                                    <span>{t('revenue.actions.from').split(' ')[1]}</span>
                                </div>
                                <Input
                                    type="text"
                                    placeholder="dd/mm/yyyy"
                                    value={tempStartDate}
                                    onChange={e => setTempStartDate(e.target.value)}
                                    className="h-10 bg-white dark:bg-black border-none text-sm font-bold px-4 rounded-xl w-[120px] sm:w-[150px] shadow-sm tabular-nums text-center"
                                />

                                <div className="hidden sm:flex flex-col text-[10px] font-black uppercase text-slate-400 dark:text-slate-500 tracking-tighter leading-[1.1] ml-2">
                                    <span>{t('revenue.actions.to').split(' ')[0]}</span>
                                    <span>{t('revenue.actions.to').split(' ')[1]}</span>
                                </div>
                                <Input
                                    type="text"
                                    placeholder="dd/mm/yyyy"
                                    value={tempEndDate}
                                    onChange={e => setTempEndDate(e.target.value)}
                                    className="h-10 bg-white dark:bg-black border-none text-sm font-bold px-4 rounded-xl w-[120px] sm:w-[150px] shadow-sm tabular-nums text-center"
                                />
                            </div>
                        </div>

                        <Button
                            onClick={handleSearch}
                            className="bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 border-none h-10 px-6 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-sm"
                        >
                            {t('revenue.actions.view')}
                        </Button>
                        <Button className="bg-slate-100 dark:bg-neutral-800 hover:bg-slate-200 dark:hover:bg-neutral-700 text-slate-900 dark:text-white border-none h-10 px-6 rounded-xl font-bold uppercase tracking-widest text-[10px] shadow-sm hidden md:flex">
                            {t('revenue.actions.print')}
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6 px-1">
                {/* SUMMARY SECTION 1 (Vertical layout) */}
                <div className="space-y-4">
                    <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest">
                        {t('revenue.summary.title')}
                    </h2>
                    <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-slate-100 dark:border-neutral-800 shadow-sm overflow-hidden">
                        <div className="flex justify-between items-center p-4 border-b border-slate-50 dark:border-neutral-800/50">
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{t('revenue.summary.actual')}</span>
                            <span className="text-sm font-black tabular-nums">{formatMoney(totals.totalActualSum)}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 border-b border-slate-50 dark:border-neutral-800/50">
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{t('revenue.summary.expenses')}</span>
                            <span className="text-sm font-black tabular-nums text-rose-600">-{formatMoney(totals.totalExpensesSum)}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-neutral-800/20">
                            <span className="text-sm font-bold text-slate-700 dark:text-slate-300">{t('revenue.summary.remaining')}</span>
                            <span className="text-sm font-black tabular-nums text-emerald-600">{formatMoney(totals.totalActualSum - totals.totalExpensesSum)}</span>
                        </div>
                    </div>
                </div>

                {/* Expense Categories Section */}
                <div className="space-y-4">
                    <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest">
                        {t('revenue.summary.categories')}
                    </h2>
                    <div className="bg-emerald-600 dark:bg-emerald-700 rounded-2xl shadow-sm overflow-hidden flex flex-col justify-center p-6 text-white min-h-[140px] relative">
                        <div className="flex justify-between items-center">
                            <span className="text-xs font-bold uppercase tracking-widest opacity-90">{t('revenue.summary.totalExpenses')}</span>
                            <span className="text-4xl font-black tabular-nums">{formatMoney(totals.totalExpensesSum)}</span>
                        </div>
                        <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center opacity-80">
                            <span className="text-[10px] font-bold uppercase tracking-widest">{t('revenue.summary.totalIncome')}</span>
                            <span className="text-sm font-black tabular-nums">{formatMoney(totals.totalIncomeSum)}</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* SUMMARY SECTION 2 (SummaryCards) */}
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6 mt-6 px-1">
                <SummaryCard
                    title={t('revenue.totalRevenue')}
                    value={formatMoney(totals.totalRevenueSum)}
                    icon={TrendingUp}
                    color="blue"
                />
                <SummaryCard
                    title={t('revenue.totalExpenses')}
                    value={formatMoney(totals.totalExpensesSum)}
                    icon={TrendingDown}
                    color="red"
                />
                <SummaryCard
                    title={t('revenue.totalNet')}
                    value={formatMoney(totals.totalNetSum)}
                    icon={DollarSign}
                    color="green"
                />
                <SummaryCard
                    title={t('revenue.totalActual')}
                    value={formatMoney(totals.totalActualSum - totals.totalExpensesSum)}
                    icon={Wallet}
                    color="cyan"
                />
                <SummaryCard
                    title={t('revenue.totalDiff')}
                    value={formatMoney(totals.totalDeviationSum)}
                    icon={FileText}
                    color={totals.totalDeviationSum < 0 ? "red" : "green"}
                    className="col-span-2 lg:col-span-1"
                />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mt-12 px-1">
                {/* DETAIL DATA TABLE */}
                <div className="xl:col-span-2 space-y-4">
                    <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">
                        {t('revenue.table.breakdown')}
                    </h2>
                    <div className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-neutral-800 shadow-sm">
                        <DataTable
                            columns={detailColumns}
                            data={[...revenues].sort((a: Revenue, b: Revenue) =>
                                new Date(b.workDate || b.createdAt).getTime() - new Date(a.workDate || a.createdAt).getTime()
                            )}
                            loading={loading}
                            defaultPageSize={50}
                            hideToolbar={true}
                        />
                    </div>
                </div>

                {/* EXPENSES SUMMARY TABLE */}
                <div className="space-y-4">
                    <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">
                        {t('revenue.table.expenseLog')}
                    </h2>
                    <div className="bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-neutral-800 shadow-sm">
                        <DataTable
                            columns={expenseColumns}
                            data={[...expenseRows].sort((a: Revenue, b: Revenue) =>
                                new Date(b.workDate || b.createdAt).getTime() - new Date(a.workDate || a.createdAt).getTime()
                            )}
                            loading={loading}
                            defaultPageSize={50}
                            hideToolbar={true}
                        />
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

