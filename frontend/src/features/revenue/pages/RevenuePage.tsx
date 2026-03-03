import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useRevenue } from '../hooks/useRevenue'
import { useSchedule } from '@/features/schedule/hooks/useSchedule'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from '@/shared/components/ui/dialog'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shared/components/ui/select'
import { Plus, Calendar } from 'lucide-react'
import { formatMoney } from '@/shared/utils/format'
import { formatDateInVietnam, formatTimeInVietnam } from '@/shared/utils/datetime'
import { DataTable } from '@/shared/components/ui/data-table'
import type { ColumnDef } from '@tanstack/react-table'
import { Revenue, Schedule } from '@/shared/types/api'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/shared/components/ui/sheet'

export default function RevenuePage() {
    const now = new Date()
    const [month, setMonth] = useState(now.getMonth() + 1)
    const [year, setYear] = useState(now.getFullYear())

    const { useRevenuesByMonth, loading: mutationLoading, createRevenue } = useRevenue()
    const { data: revenues = [], isLoading } = useRevenuesByMonth(month, year)
    const loading = mutationLoading || isLoading

    const todayDate = now.toISOString().slice(0, 10)
    const { useSchedules } = useSchedule()
    const { data: schedules = [] } = useSchedules(todayDate)

    // === CREATE FORM STATE ===
    const [openCreate, setOpenCreate] = useState(false)
    const [revScheduleId, setRevScheduleId] = useState('')
    const [revOpening, setRevOpening] = useState('0')
    const [revCash, setRevCash] = useState('0')
    const [revBank, setRevBank] = useState('0')
    const [revNote, setRevNote] = useState('')

    const handleCreate = async () => {
        await createRevenue({
            scheduleId: Number(revScheduleId),
            openingBalance: Number(revOpening),
            cash: Number(revCash),
            bank: Number(revBank),
            note: revNote,
        })
        setOpenCreate(false)
        setRevScheduleId('')
        setRevOpening('0')
        setRevCash('0')
        setRevBank('0')
        setRevNote('')
    }

    // === COMPUTED TOTALS ===
    const totals = useMemo(() => {
        let totalRevenueSum = 0    // Sum of TotalRevenue (cash + bank)
        let totalExpensesSum = 0   // Sum of all Expense transactions
        let totalNetSum = 0         // Sum of Net (after Thu/Chi adjustments)
        let totalActualSum = 0      // cash + bank - opening + expenses - income
        let totalDeviationSum = 0    // Deviation

        revenues.forEach((r: Revenue) => {
            totalRevenueSum += r.totalRevenue
            totalNetSum += r.net
            totalDeviationSum += r.deviation
            totalExpensesSum += r.expenses
            totalActualSum += r.cash + r.bank - r.openingBalance + r.expenses - r.income
        })

        return { totalRevenueSum, totalExpensesSum, totalNetSum, totalActualSum, totalDeviationSum }
    }, [revenues])

    // === DETAIL COLUMNS ===
    const detailColumns = useMemo<ColumnDef<Revenue>[]>(() => [
        {
            accessorKey: "workDate",
            header: "Timeline",
            cell: ({ row }) => (
                <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-slate-900 dark:text-slate-100 whitespace-nowrap">
                        {formatDateInVietnam(row.original.workDate || row.original.createdAt)}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                        {formatTimeInVietnam(row.original.createdAt)}
                    </span>
                </div>
            )
        },
        {
            id: "financials",
            header: "TM / CK / NET",
            cell: ({ row }) => (
                <div className="flex flex-col gap-1 text-[11px] font-medium min-w-[120px]">
                    <div className="flex justify-between gap-4">
                        <span className="text-slate-400 text-[9px] font-black uppercase tracking-tighter">CASH</span>
                        <span className="tabular-nums font-bold">{formatMoney(row.original.cash)}</span>
                    </div>
                    <div className="flex justify-between gap-4 border-t border-slate-50 pt-0.5">
                        <span className="text-blue-400 text-[9px] font-black uppercase tracking-tighter">BANK</span>
                        <span className="tabular-nums font-bold text-blue-600">{formatMoney(row.original.bank)}</span>
                    </div>
                    <div className="flex justify-between gap-4 border-t border-slate-50 pt-0.5">
                        <span className="text-indigo-400 text-[9px] font-black uppercase tracking-tighter">NET</span>
                        <span className="tabular-nums font-black text-indigo-700">{formatMoney(row.original.net)}</span>
                    </div>
                </div>
            )
        },
        {
            id: "results",
            header: "Actual / Diff",
            cell: ({ row }) => {
                const actual = row.original.cash + row.original.bank - row.original.openingBalance + row.original.expenses - row.original.income
                const d = row.original.deviation
                const dColor = d > 0 ? 'text-emerald-600' : d < 0 ? 'text-rose-600' : 'text-slate-400'
                return (
                    <div className="flex flex-col gap-1 text-[11px] font-medium min-w-[100px]">
                        <div className="flex justify-between gap-4">
                            <span className="text-slate-400 text-[9px] font-black uppercase tracking-tighter">ACTUAL</span>
                            <span className="tabular-nums font-black text-emerald-600">{formatMoney(actual)}</span>
                        </div>
                        <div className="flex justify-between gap-4 border-t border-slate-50 pt-0.5">
                            <span className="text-slate-400 text-[9px] font-black uppercase tracking-tighter">DIFF</span>
                            <span className={`tabular-nums font-black ${dColor}`}>{formatMoney(d)}</span>
                        </div>
                    </div>
                )
            }
        },
        {
            id: "info",
            header: "Staff / Note",
            cell: ({ row }) => (
                <div className="flex flex-col gap-1 max-w-[200px]">
                    <span className="text-[10px] font-black text-slate-900 uppercase tracking-tighter truncate">
                        {row.original.employeeName || '—'}
                    </span>
                    <span className="text-[10px] text-slate-500 italic leading-none line-clamp-1">{row.original.note || 'No note'}</span>
                </div>
            )
        }
    ], [])

    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 pb-20"
        >
            {/* HEADER */}
            <div className="flex flex-col gap-6 px-1">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
                            Revenue
                        </h1>
                        <p className="mt-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            Closing Verification
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Mobile Range Filter */}
                        <div className="md:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline" size="icon" className="h-10 w-10 relative rounded-xl">
                                        <Calendar className="h-4 w-4" />
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="bottom" className="h-[300px] rounded-t-[2.5rem] border-none shadow-2xl">
                                    <SheetHeader className="mb-6">
                                        <SheetTitle className="text-left font-black tracking-tighter text-2xl px-2">Select Period</SheetTitle>
                                    </SheetHeader>
                                    <div className="space-y-6 px-2">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Month</Label>
                                                <Input
                                                    type="number"
                                                    min={1}
                                                    max={12}
                                                    value={month}
                                                    onChange={e => setMonth(Number(e.target.value))}
                                                    className="h-12 rounded-xl font-bold"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Year</Label>
                                                <Input
                                                    type="number"
                                                    min={2020}
                                                    max={2100}
                                                    value={year}
                                                    onChange={e => setYear(Number(e.target.value))}
                                                    className="h-12 rounded-xl font-bold"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>

                        {/* Desktop Range Filter */}
                        <div className="hidden md:flex items-center gap-2 bg-slate-100 dark:bg-neutral-800 p-1 rounded-xl">
                            <div className="flex items-center gap-3 px-3">
                                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Period:</span>
                                <div className="flex items-center gap-2">
                                    <Input
                                        type="number"
                                        min={1}
                                        max={12}
                                        value={month}
                                        onChange={e => setMonth(Number(e.target.value))}
                                        className="w-12 h-8 bg-white dark:bg-black border-none text-xs font-black p-0 text-center rounded-lg"
                                    />
                                    <span className="text-slate-300">/</span>
                                    <Input
                                        type="number"
                                        min={2020}
                                        max={2100}
                                        value={year}
                                        onChange={e => setYear(Number(e.target.value))}
                                        className="w-20 h-8 bg-white dark:bg-black border-none text-xs font-black p-0 text-center rounded-lg"
                                    />
                                </div>
                            </div>
                        </div>

                        <Dialog open={openCreate} onOpenChange={setOpenCreate}>
                            <DialogTrigger asChild>
                                <Button className="bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 border-none h-10 w-10 sm:w-auto sm:px-6 rounded-xl font-bold uppercase tracking-widest text-[10px]">
                                    <Plus className="sm:mr-2 h-4 w-4" />
                                    <span className="hidden sm:inline">Add Closing</span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md w-[95vw] rounded-[2rem] border-none shadow-2xl p-6">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-black tracking-tighter">Shift Closing</DialogTitle>
                                    <DialogDescription className="text-slate-500 font-medium">
                                        Enter revenue data to close current shift.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="revShift" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Staff Shift</Label>
                                        <Select value={revScheduleId} onValueChange={setRevScheduleId}>
                                            <SelectTrigger id="revShift" className="h-12 rounded-xl border-slate-200 font-bold">
                                                <SelectValue placeholder="Select working shift" />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-xl">
                                                {schedules.map((s: Schedule) => (
                                                    <SelectItem key={s.id} value={String(s.id)}>
                                                        {s.employeeName} - {s.shiftName}
                                                    </SelectItem>
                                                ))}
                                                {schedules.length === 0 && (
                                                    <div className="p-4 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">No active shifts today</div>
                                                )}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="revOpening" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Opening</Label>
                                            <Input id="revOpening" type="number" value={revOpening} onChange={e => setRevOpening(e.target.value)} className="h-12 rounded-xl font-bold" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="revCash" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Cash</Label>
                                            <Input id="revCash" type="number" value={revCash} onChange={e => setRevCash(e.target.value)} className="h-12 rounded-xl font-bold" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="revBank" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Bank Transfer</Label>
                                        <Input id="revBank" type="number" value={revBank} onChange={e => setRevBank(e.target.value)} className="h-12 rounded-xl font-bold" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="revNote2" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Note</Label>
                                        <Input id="revNote2" value={revNote} onChange={e => setRevNote(e.target.value)} placeholder="Optional..." className="h-12 rounded-xl font-bold" />
                                    </div>
                                    <Button onClick={handleCreate} disabled={!revScheduleId} className="w-full bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-slate-200 uppercase font-black text-[10px] tracking-[0.2em] h-14 rounded-2xl mt-4">
                                        Save Closing
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </div>

            {/* MONTHLY SUMMARY GRID */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 sm:gap-4 px-1">
                <div className="bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-slate-100 dark:border-neutral-800 shadow-sm flex flex-col gap-1">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Revenue</span>
                    <span className="text-base sm:text-lg font-black tabular-nums">{formatMoney(totals.totalRevenueSum)}</span>
                </div>
                <div className="bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-slate-100 dark:border-neutral-800 shadow-sm flex flex-col gap-1">
                    <span className="text-[10px] font-black text-rose-400 uppercase tracking-widest">Expenses</span>
                    <span className="text-base sm:text-lg font-black tabular-nums text-rose-600">{formatMoney(totals.totalExpensesSum)}</span>
                </div>
                <div className="bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-slate-100 dark:border-neutral-800 shadow-sm flex flex-col gap-1">
                    <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">Total Net</span>
                    <span className="text-base sm:text-lg font-black tabular-nums text-blue-600">{formatMoney(totals.totalNetSum)}</span>
                </div>
                <div className="bg-white dark:bg-neutral-900 p-4 rounded-2xl border border-slate-100 dark:border-neutral-800 shadow-sm flex flex-col gap-1">
                    <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">Total Actual</span>
                    <span className="text-base sm:text-lg font-black tabular-nums text-emerald-600">{formatMoney(totals.totalActualSum)}</span>
                </div>
                <div className="bg-black dark:bg-white p-4 rounded-2xl shadow-lg flex flex-col gap-1 col-span-2 md:col-span-1 border-none">
                    <span className="text-[10px] font-black text-white/50 dark:text-black/50 uppercase tracking-widest">Discrepancy</span>
                    <span className={`text-base sm:text-lg font-black tabular-nums ${totals.totalDeviationSum >= 0 ? 'text-emerald-400 dark:text-emerald-600' : 'text-rose-400 dark:text-rose-600'}`}>
                        {formatMoney(totals.totalDeviationSum)}
                    </span>
                </div>
            </div>

            {/* DETAIL DATA TABLE */}
            <div className="px-1">
                <div className="mb-4">
                    <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">
                        Daily_Logs_{month}/{year}
                    </h2>
                </div>
                <DataTable
                    columns={detailColumns}
                    data={[...revenues].sort((a: Revenue, b: Revenue) =>
                        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                    )}
                    loading={loading}
                    defaultPageSize={50}
                    hideToolbar={true}
                />
            </div>

        </motion.div>
    )
}
