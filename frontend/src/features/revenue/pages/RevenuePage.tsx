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
import { formatMoney } from '@/shared/utils/format'
import { formatDateInVietnam, formatTimeInVietnam } from '@/shared/utils/datetime'
import { DataTable } from '@/shared/components/ui/data-table'
import type { ColumnDef } from '@tanstack/react-table'
import type { Revenue, Schedule, Transaction } from '@/shared/types/api'

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
        let tongDoanhThu = 0    // Sum of TotalRevenue (cash + bank)
        let tongChiTuKet = 0   // Sum of all Expense transactions
        let tongNet = 0         // Sum of Net (after Thu/Chi adjustments)
        let tongThucTe = 0      // cash + bank - opening + expenses - income
        let tongSaiLech = 0    // Deviation

        revenues.forEach((r: Revenue) => {
            tongDoanhThu += r.totalRevenue
            tongNet += r.net
            tongSaiLech += r.deviation
            tongChiTuKet += r.expenses
            tongThucTe += r.cash + r.bank - r.openingBalance + r.expenses - r.income
        })

        return { tongDoanhThu, tongChiTuKet, tongNet, tongThucTe, tongSaiLech }
    }, [revenues])

    // === EXPENSE BREAKDOWN (all transactions across all revenues) ===
    const allExpenses = useMemo(() => {
        const items: { date: string; reason: string; amount: number }[] = []
        revenues.forEach((r: Revenue) => {
            r.transactions?.forEach((t: Transaction) => {
                if (t.type === 'Expense') {
                    items.push({
                        date: r.workDate || r.createdAt,
                        reason: t.reason || '—',
                        amount: t.amount,
                    })
                }
            })
        })
        return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    }, [revenues])

    // === DETAIL COLUMNS ===
    const detailColumns = useMemo<ColumnDef<Revenue>[]>(() => [
        {
            accessorKey: "workDate",
            header: "Ngày",
            cell: ({ row }) => (
                <div className="flex flex-col gap-0.5">
                    <span className="font-bold text-slate-700 dark:text-slate-300 whitespace-nowrap">
                        {formatDateInVietnam(row.original.workDate || row.original.createdAt)}
                    </span>
                    <span className="text-[10px] text-slate-400 tabular-nums">
                        {formatTimeInVietnam(row.original.createdAt)}
                    </span>
                </div>
            )
        },
        {
            accessorKey: "openingBalance",
            header: () => <div className="text-right">Đầu kỳ</div>,
            cell: ({ row }) => <div className="text-right font-medium tabular-nums text-slate-600">{formatMoney(row.original.openingBalance)}</div>,
        },
        {
            id: "paymentMethods",
            header: "TM/CK",
            cell: ({ row }) => (
                <div className="flex flex-col gap-0.5 text-[11px] font-medium leading-tight">
                    <div className="flex justify-between gap-4">
                        <span className="text-slate-500 uppercase">TM:</span>
                        <span className="tabular-nums text-slate-900">{formatMoney(row.original.cash)}</span>
                    </div>
                    {row.original.bank > 0 && (
                        <div className="flex justify-between gap-4">
                            <span className="text-blue-600 uppercase font-bold">CK:</span>
                            <span className="tabular-nums text-blue-700">{formatMoney(row.original.bank)}</span>
                        </div>
                    )}
                </div>
            )
        },
        {
            id: "transactions",
            header: "Chi/Thu",
            cell: ({ row }) => (
                <div className="flex flex-col gap-1 max-w-[280px]">
                    {row.original.transactions?.map((t: Transaction, i: number) => (
                        <div key={i} className="flex flex-col border-b border-slate-50 last:border-0 pb-1 last:pb-0">
                            <div className="flex justify-between items-start gap-2">
                                <span className={`text-[10px] font-bold uppercase ${t.type === 'Income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                                    {t.type === 'Income' ? 'THU' : 'CHI'}:
                                </span>
                                <span className={`text-[11px] font-bold tabular-nums ${t.type === 'Income' ? 'text-emerald-700' : 'text-rose-700'}`}>
                                    {formatMoney(t.amount)}
                                </span>
                            </div>
                            <span className="text-[10px] text-slate-500 italic line-clamp-2 leading-none">{t.reason || '—'}</span>
                        </div>
                    ))}
                    {!row.original.transactions?.length && <span className="text-[10px] text-slate-400">Không có phát sinh</span>}
                </div>
            )
        },
        {
            accessorKey: "totalRevenue",
            header: () => <div className="text-right">Doanh thu</div>,
            cell: ({ row }) => <div className="text-right font-black tabular-nums text-slate-900">{formatMoney(row.original.totalRevenue)}</div>,
        },
        {
            accessorKey: "net",
            header: () => <div className="text-right">NET</div>,
            cell: ({ row }) => <div className="text-right font-black tabular-nums text-blue-600">{formatMoney(row.original.net)}</div>,
        },
        {
            id: "actualRevenue",
            header: () => <div className="text-right">Thuc te</div>,
            cell: ({ row }) => {
                const actual = row.original.cash + row.original.bank - row.original.openingBalance + row.original.expenses - row.original.income
                return <div className="text-right font-black tabular-nums text-emerald-600">{formatMoney(actual)}</div>
            }
        },
        {
            accessorKey: "deviation",
            header: () => <div className="text-right">Sai lệch</div>,
            cell: ({ row }) => {
                const d = row.original.deviation
                const color = d > 0 ? 'text-emerald-600' : d < 0 ? 'text-rose-600' : 'text-slate-400'
                return <div className={`text-right font-bold tabular-nums ${color}`}>{formatMoney(d)}</div>
            }
        },
        {
            id: "info",
            header: "Ghi chú",
            cell: ({ row }) => (
                <div className="flex flex-col gap-0.5">
                    <span className="text-[10px] text-slate-500 italic leading-tight">{row.original.note || '—'}</span>
                    <span className="text-[11px] font-bold text-slate-900 uppercase tracking-tighter">
                        {row.original.employeeName || '—'}
                    </span>
                </div>
            )
        }
    ], [])

    const expenseColumns = useMemo<ColumnDef<{ date: string; reason: string; amount: number }>[]>(() => [
        {
            accessorKey: 'date',
            header: 'Ngày',
            cell: ({ row }) => (
                <span className="text-xs font-bold text-slate-700 whitespace-nowrap">
                    {formatDateInVietnam(row.original.date)}
                </span>
            )
        },
        {
            accessorKey: 'reason',
            header: 'Nội dung chi',
            cell: ({ row }) => (
                <span className="text-xs text-slate-600">{row.original.reason}</span>
            )
        },
        {
            accessorKey: 'amount',
            header: () => <div className="text-right">Amount</div>,
            cell: ({ row }) => (
                <div className="text-right font-bold tabular-nums text-rose-600">
                    {formatMoney(row.original.amount)}
                </div>
            )
        }
    ], [])

    const saiLechColor = totals.tongSaiLech > 0 ? 'text-emerald-600' : totals.tongSaiLech < 0 ? 'text-rose-600' : 'text-slate-400'

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
                                            {schedules.map((s: Schedule) => (
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
                                <div className="space-y-2">
                                    <Label htmlFor="revBank">Chuyển khoản (CK/MM/VCB)</Label>
                                    <Input id="revBank" type="number" value={revBank} onChange={e => setRevBank(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="revNote2">Ghi chú</Label>
                                    <Input id="revNote2" value={revNote} onChange={e => setRevNote(e.target.value)} placeholder="Tùy chọn..." />
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
                        Tổng hợp tháng {month}/{year}
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="bg-[#5ac1c9] text-white">
                                <th className="text-right px-4 py-3 font-bold whitespace-nowrap">Tổng Doanh thu</th>
                                <th className="text-right px-4 py-3 font-bold whitespace-nowrap">Tổng Chi từ két</th>
                                <th className="text-right px-4 py-3 font-bold whitespace-nowrap">Tổng NET</th>
                                <th className="text-right px-4 py-3 font-bold whitespace-nowrap">Tong thuc te</th>
                                <th className="text-right px-4 py-3 font-bold whitespace-nowrap">#</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-slate-100 dark:border-neutral-800 hover:bg-slate-50/50">
                                <td className="px-4 py-3 text-right font-black tabular-nums text-slate-900">
                                    {formatMoney(totals.tongDoanhThu)}
                                </td>
                                <td className="px-4 py-3 text-right font-bold tabular-nums text-rose-600">
                                    {formatMoney(totals.tongChiTuKet)}
                                </td>
                                <td className="px-4 py-3 text-right font-bold tabular-nums text-blue-600">
                                    {formatMoney(totals.tongNet)}
                                </td>
                                <td className="px-4 py-3 text-right font-black tabular-nums text-emerald-600">
                                    {formatMoney(totals.tongThucTe)}
                                </td>
                                <td className={`px-4 py-3 text-right font-bold tabular-nums ${saiLechColor}`}>
                                    {formatMoney(totals.tongSaiLech)}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* ===== DETAIL TABLE ===== */}
            <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-sm rounded-2xl overflow-hidden">
                <div className="p-4 lg:p-5 border-b border-slate-100 dark:border-neutral-800 bg-slate-50/50 dark:bg-white/5">
                    <h2 className="text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest">
                        Doanh thu từng ngày
                    </h2>
                </div>
                <div className="p-0">
                    <DataTable
                        columns={detailColumns}
                        data={[...revenues].sort((a: Revenue, b: Revenue) =>
                            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
                        )}
                        loading={loading}
                        showFooter={true}
                        defaultPageSize={50}
                        hideToolbar={true}
                    />
                </div>
            </div>

            {/* ===== EXPENSE BREAKDOWN TABLE ===== */}
            {allExpenses.length > 0 && (
                <div className="bg-white dark:bg-neutral-900 border border-slate-200 dark:border-neutral-800 shadow-sm rounded-2xl overflow-hidden">
                    <div className="p-4 lg:p-5 border-b border-slate-100 dark:border-neutral-800 bg-slate-50/50 dark:bg-white/5 flex items-center justify-between">
                        <h2 className="text-sm font-black text-slate-800 dark:text-slate-200 uppercase tracking-widest">
                            Bảng chi chi tiết
                        </h2>
                        <span className="text-xs font-bold text-rose-600 tabular-nums">
                            Tổng: {formatMoney(allExpenses.reduce((s, e) => s + e.amount, 0))}
                        </span>
                    </div>
                    <div className="p-0">
                        <DataTable
                            columns={expenseColumns}
                            data={allExpenses}
                            loading={loading}
                            showFooter={false}
                            defaultPageSize={30}
                            hideToolbar={true}
                        />
                    </div>
                </div>
            )}
        </motion.div>
    )
}

