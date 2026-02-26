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
    DialogTrigger,
} from '@/shared/components/ui/dialog'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shared/components/ui/select'
import { Plus } from 'lucide-react'
import { formatMoney, formatDate } from '@/shared/utils/format'
import { DataTable } from '@/shared/components/ui/data-table'
import type { ColumnDef } from '@tanstack/react-table'
import type { Revenue } from '@/shared/types/api'

export default function RevenuePage() {
    const now = new Date()
    const [month, setMonth] = useState(now.getMonth() + 1)
    const [year, setYear] = useState(now.getFullYear())

    const { useRevenuesByMonth, loading: mutationLoading, createRevenue } = useRevenue()
    const { data: revenues = [], isLoading } = useRevenuesByMonth(month, year)
    const loading = mutationLoading || isLoading

    // For the "create" dialog, we still need today's schedules
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
            income: 0,
            expenses: 0,
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
        const t = { cash: 0, bank: 0, income: 0, expenses: 0, revenue: 0, deviation: 0 }
        revenues.forEach((r: Revenue) => {
            t.cash += r.cash
            t.bank += r.bank
            t.income += r.income
            t.expenses += r.expenses
            t.revenue += r.totalRevenue
            t.deviation += r.deviation
        })
        return t
    }, [revenues])

    // === DETAIL COLUMNS ===
    const detailColumns = useMemo<ColumnDef<Revenue>[]>(() => [
        {
            accessorKey: "workDate",
            header: "Ngày",
            cell: ({ row }) => (
                <span className="font-medium text-slate-700 dark:text-slate-300 whitespace-nowrap">
                    {row.original.workDate ? formatDate(row.original.workDate) : formatDate(row.original.createdAt)}
                </span>
            )
        },
        {
            accessorKey: "shiftName",
            header: "Ca",
            cell: ({ row }) => (
                <div>
                    <p className="font-semibold text-slate-900 dark:text-slate-100 text-xs">
                        {row.original.employeeName || `NV #${row.original.employeeId}`}
                    </p>
                    <p className="text-[10px] text-muted-foreground uppercase">
                        {row.original.shiftName || '—'} · {row.original.positionName || ''}
                    </p>
                </div>
            )
        },
        {
            accessorKey: "cash",
            header: () => <div className="text-right">TM doanh thu</div>,
            cell: ({ row }) => <div className="text-right font-medium tabular-nums">{formatMoney(row.original.cash)}</div>,
            footer: () => <div className="text-right font-black tabular-nums">{formatMoney(totals.cash)}</div>
        },
        {
            accessorKey: "bank",
            header: () => <div className="text-right">CK</div>,
            cell: ({ row }) => <div className="text-right font-medium tabular-nums">{formatMoney(row.original.bank)}</div>,
            footer: () => <div className="text-right font-black tabular-nums">{formatMoney(totals.bank)}</div>
        },
        {
            accessorKey: "income",
            header: () => <div className="text-right">Thu</div>,
            cell: ({ row }) => <div className="text-right font-medium tabular-nums text-emerald-600">{formatMoney(row.original.income)}</div>,
            footer: () => <div className="text-right font-black tabular-nums text-emerald-600">{formatMoney(totals.income)}</div>
        },
        {
            accessorKey: "expenses",
            header: () => <div className="text-right">Chi</div>,
            cell: ({ row }) => (
                <div className="text-right font-medium tabular-nums text-rose-600">
                    {row.original.expenses > 0 ? formatMoney(row.original.expenses) : '0'}
                </div>
            ),
            footer: () => <div className="text-right font-black tabular-nums text-rose-600">{formatMoney(totals.expenses)}</div>
        },
        {
            accessorKey: "totalRevenue",
            header: () => <div className="text-right">Doanh thu</div>,
            cell: ({ row }) => <div className="text-right font-bold tabular-nums">{formatMoney(row.original.totalRevenue)}</div>,
            footer: () => <div className="text-right font-black tabular-nums">{formatMoney(totals.revenue)}</div>
        },
        {
            accessorKey: "deviation",
            header: () => <div className="text-right">Chênh lệch</div>,
            cell: ({ row }) => {
                const d = row.original.deviation
                const color = d > 0 ? 'text-emerald-600' : d < 0 ? 'text-rose-600' : ''
                return <div className={`text-right font-bold tabular-nums ${color}`}>{formatMoney(d)}</div>
            },
            footer: () => {
                const color = totals.deviation > 0 ? 'text-emerald-600' : totals.deviation < 0 ? 'text-rose-600' : ''
                return <div className={`text-right font-black tabular-nums ${color}`}>{formatMoney(totals.deviation)}</div>
            }
        },
        {
            accessorKey: "note",
            header: "Ghi chú",
            cell: ({ row }) => (
                <span className="text-xs text-muted-foreground truncate max-w-[150px] inline-block" title={row.original.note || ''}>
                    {row.original.note || '—'}
                </span>
            )
        }
    ], [totals])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 pb-10"
        >
            {/* HEADER */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
                        Báo cáo kết sổ
                    </h1>
                    <p className="mt-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        Revenue Report
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    {/* Month Filter */}
                    <div className="flex items-center gap-2">
                        <Label htmlFor="revMonth" className="text-xs font-bold text-slate-500 uppercase">Tháng</Label>
                        <Input
                            id="revMonth"
                            type="number"
                            min={1}
                            max={12}
                            value={month}
                            onChange={e => setMonth(Number(e.target.value))}
                            className="w-20 h-9 text-center"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Label htmlFor="revYear" className="text-xs font-bold text-slate-500 uppercase">Năm</Label>
                        <Input
                            id="revYear"
                            type="number"
                            min={2020}
                            max={2100}
                            value={year}
                            onChange={e => setYear(Number(e.target.value))}
                            className="w-24 h-9 text-center"
                        />
                    </div>

                    {/* Create Revenue */}
                    <Dialog open={openCreate} onOpenChange={setOpenCreate}>
                        <DialogTrigger asChild>
                            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white border-none h-9">
                                <Plus className="mr-2 h-4 w-4" />
                                Thêm kết sổ
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Kết sổ ca làm</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="revShift">Chọn ca</Label>
                                    <Select value={revScheduleId} onValueChange={setRevScheduleId}>
                                        <SelectTrigger id="revShift">
                                            <SelectValue placeholder="Chọn ca làm việc" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {schedules.map((s: any) => (
                                                <SelectItem key={s.id} value={String(s.id)}>
                                                    {s.employeeName || 'NV'} - {s.shiftName || `Ca #${s.shiftId}`}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="revOpening">Tiền đầu ca</Label>
                                        <Input id="revOpening" type="number" value={revOpening} onChange={e => setRevOpening(e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="revCash">Tiền mặt (TM)</Label>
                                        <Input id="revCash" type="number" value={revCash} onChange={e => setRevCash(e.target.value)} />
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="revBank">Chuyển khoản (CK)</Label>
                                        <Input id="revBank" type="number" value={revBank} onChange={e => setRevBank(e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="revNote2">Ghi chú</Label>
                                        <Input id="revNote2" value={revNote} onChange={e => setRevNote(e.target.value)} placeholder="Tùy chọn..." />
                                    </div>
                                </div>
                                <Button onClick={handleCreate} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white">
                                    Lưu kết sổ
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* ===== SUMMARY TABLE ===== */}
            <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-sm rounded-2xl overflow-hidden">
                <div className="p-4 lg:p-5 border-b border-slate-100 dark:border-neutral-800 bg-slate-50/50 dark:bg-white/5">
                    <h2 className="text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest">
                        Summary
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-[#5ac1c9] text-white">
                                <th className="text-right px-4 py-3 font-bold">Tổng TM</th>
                                <th className="text-right px-4 py-3 font-bold">Tổng CK</th>
                                <th className="text-right px-4 py-3 font-bold">Tổng Thu</th>
                                <th className="text-right px-4 py-3 font-bold">Tổng Chi</th>
                                <th className="text-right px-4 py-3 font-bold">Tổng Doanh thu</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-slate-100 dark:border-neutral-800">
                                <td className="px-4 py-3 text-right font-bold tabular-nums">{formatMoney(totals.cash)}</td>
                                <td className="px-4 py-3 text-right font-bold tabular-nums">{formatMoney(totals.bank)}</td>
                                <td className="px-4 py-3 text-right font-bold tabular-nums text-emerald-600">{formatMoney(totals.income)}</td>
                                <td className="px-4 py-3 text-right font-bold tabular-nums text-rose-600">{formatMoney(totals.expenses)}</td>
                                <td className="px-4 py-3 text-right font-black tabular-nums text-blue-600">{formatMoney(totals.revenue)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ===== DETAIL TABLE ===== */}
            <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-sm rounded-2xl overflow-hidden">
                <div className="p-4 lg:p-5 border-b border-slate-100 dark:border-neutral-800 bg-slate-50/50 dark:bg-white/5">
                    <h2 className="text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest">
                        Danh sách chi tiết
                    </h2>
                </div>
                <div className="p-0">
                    <DataTable
                        columns={detailColumns}
                        data={revenues}
                        loading={loading}
                        showFooter={true}
                        defaultPageSize={50}
                        hideToolbar={true}
                    />
                </div>
            </div>
        </motion.div>
    )
}
