import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { useRevenue } from '../hooks/useRevenue'
import { useSchedule } from '@/features/schedule/hooks/useSchedule'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
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
import { DollarSign, TrendingUp, ClipboardList, Plus } from 'lucide-react'
import { formatMoney } from '@/shared/utils/format'
import { SummaryCard } from '@/shared/components/ui/summary-card'
import { DataTable } from '@/shared/components/ui/data-table'
import type { ColumnDef } from '@tanstack/react-table'

export default function RevenuePage() {
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
    const { useRevenues, loading: revenueLoading, createRevenue, createTransaction } = useRevenue()
    const { useSchedules, loading: scheduleLoading } = useSchedule()

    const { data: revenues = [], isLoading: revenuesQueryLoading } = useRevenues(date)
    const { data: schedules = [], isLoading: schedulesQueryLoading } = useSchedules(date)

    const loading = revenueLoading || scheduleLoading || revenuesQueryLoading || schedulesQueryLoading

    // === CREATE REVENUE FORM ===
    const [openRevenue, setOpenRevenue] = useState(false)
    const [revScheduleId, setRevScheduleId] = useState('')
    const [revOpening, setRevOpening] = useState('0')
    const [revCash, setRevCash] = useState('0')
    const [revBank, setRevBank] = useState('0')
    const [revNote, setRevNote] = useState('')

    const handleCreateRevenue = async () => {
        await createRevenue({
            scheduleId: Number(revScheduleId),
            openingBalance: Number(revOpening),
            cash: Number(revCash),
            bank: Number(revBank),
            note: revNote,
        })
        setOpenRevenue(false)
    }

    // === CREATE TRANSACTION FORM ===
    const [openTransaction, setOpenTransaction] = useState(false)
    const [transRevenueId, setTransRevenueId] = useState('') // Need a Revenue ID to link to
    const [transType, setTransType] = useState<'Income' | 'Expense'>('Expense')
    const [transAmount, setTransAmount] = useState('')
    const [transReason, setTransReason] = useState('')

    const handleCreateTransaction = async () => {
        await createTransaction({
            revenueId: Number(transRevenueId),
            type: transType,
            amount: Number(transAmount),
            reason: transReason,
        })
        setOpenTransaction(false)
    }

    const totalRevenue = revenues.reduce((sum: number, r: any) => sum + r.totalRevenue, 0)
    const totalNet = revenues.reduce((sum: number, r: any) => sum + r.net, 0)

    const columns = useMemo<ColumnDef<any>[]>(() => [
        {
            accessorKey: "id",
            header: "ID",
            cell: ({ row }) => <span className="text-xs font-mono">#{row.getValue("id")}</span>
        },
        {
            accessorKey: "scheduleId",
            header: "Shift",
            cell: ({ row }) => <span className="text-sm">Shift #{row.getValue("scheduleId")}</span>
        },

        {
            accessorKey: "totalRevenue",
            header: () => <div className="text-right">Actual Sum</div>,
            cell: ({ row }) => <div className="text-right font-bold text-slate-900 dark:text-slate-100">{formatMoney(row.getValue("totalRevenue"))}</div>
        },
        {
            accessorKey: "net",
            header: () => <div className="text-right">Net Profit</div>,
            cell: ({ row }) => {
                const deviation = row.original.deviation;
                const isPositive = deviation >= 0;
                return (
                    <div className="text-right">
                        <span className="font-semibold text-black dark:text-white">{formatMoney(row.getValue("net"))}</span>
                        <p className={`text-[10px] font-medium uppercase ${isPositive ? 'text-black dark:text-white font-bold' : 'text-rose-500'}`}>
                            {isPositive ? '+' : ''}{formatMoney(deviation)}
                        </p>
                    </div>
                )
            }
        },
        {
            id: "actions",
            header: "Transactions",
            cell: ({ row }) => {
                const trans = row.original.transactions || []
                return (
                    <div className="flex flex-wrap gap-1">
                        {trans.slice(0, 2).map((t: any) => (
                            <span key={t.id} className="text-[10px] bg-slate-100 dark:bg-slate-800 px-1 rounded truncate max-w-[80px]">
                                {t.type === 'Expense' ? '-' : '+'}{formatMoney(t.amount)}
                            </span>
                        ))}
                        {trans.length > 2 && <span className="text-[10px] text-muted-foreground">+{trans.length - 2} more</span>}
                    </div>
                )
            }
        }
    ], [])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8 pb-10"
        >
            {/* HEADER */}
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
                        Revenue
                    </h1>
                    <p className="mt-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        Financial Tracking
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Label htmlFor="revenue-date" className="sr-only">Select Date</Label>
                    <Input
                        id="revenue-date"
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        className="w-40 h-9"
                    />
                </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <SummaryCard title="Total Revenue" value={formatMoney(totalRevenue)} icon={DollarSign} color="cyan" />
                <SummaryCard title="Net Profit" value={formatMoney(totalNet)} icon={TrendingUp} color="green" />
                <SummaryCard title="Reports" value={String(revenues.length)} icon={ClipboardList} color="blue" />
            </div>

            {/* ACTIONS & LIST */}
            <div className="space-y-4">
                <div className="flex gap-2">
                    <Dialog open={openRevenue} onOpenChange={setOpenRevenue}>
                        <DialogTrigger asChild>
                            <Button className="bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-slate-200 border-none">
                                <Plus className="mr-2 h-4 w-4" />
                                End Shift Report
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>End Shift Revenue Report</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="revShift">Select Shift</Label>
                                        <Select value={revScheduleId} onValueChange={setRevScheduleId}>
                                            <SelectTrigger id="revShift">
                                                <SelectValue placeholder="Select a shift" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {schedules.map((s: any) => (
                                                    <SelectItem key={s.id} value={String(s.id)}>
                                                        {s.employee?.name || 'Unknown'} - {s.shift?.name}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="revOpening">Opening Balance</Label>
                                        <Input id="revOpening" type="number" value={revOpening} onChange={e => setRevOpening(e.target.value)} />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="revCash">Cash Collected</Label>
                                        <Input id="revCash" type="number" value={revCash} onChange={e => setRevCash(e.target.value)} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="revBank">Bank/Transfer</Label>
                                        <Input id="revBank" type="number" value={revBank} onChange={e => setRevBank(e.target.value)} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="revNote">Note</Label>
                                    <Input id="revNote" value={revNote} onChange={e => setRevNote(e.target.value)} placeholder="Optional note..." />
                                </div>
                                <Button onClick={handleCreateRevenue} className="w-full bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-slate-200">Submit Report</Button>
                            </div>
                        </DialogContent>
                    </Dialog>

                    <Dialog open={openTransaction} onOpenChange={setOpenTransaction}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="border-slate-200">
                                <Plus className="mr-2 h-4 w-4" />
                                Add Transaction
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Record Transaction</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label htmlFor="transRevId">Revenue Report ID</Label>
                                    <Input id="transRevId" value={transRevenueId} onChange={e => setTransRevenueId(e.target.value)} placeholder="Link to Report ID" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="transType">Type</Label>
                                    <Select value={transType} onValueChange={(v: any) => setTransType(v)}>
                                        <SelectTrigger id="transType">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Income">Income</SelectItem>
                                            <SelectItem value="Expense">Expense</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="transAmount">Amount</Label>
                                    <Input id="transAmount" type="number" value={transAmount} onChange={e => setTransAmount(e.target.value)} />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="transReason">Reason</Label>
                                    <Input id="transReason" value={transReason} onChange={e => setTransReason(e.target.value)} placeholder="e.g. Buying milk" />
                                </div>
                                <Button onClick={handleCreateTransaction} className="w-full bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-slate-200">Record</Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                <Card className="border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm overflow-hidden">
                    <CardHeader>
                        <CardTitle className="text-sm font-semibold text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                            Daily Reports
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <DataTable
                            columns={columns}
                            data={revenues}
                            loading={loading}
                            searchKey="id"
                        />
                    </CardContent>
                </Card>
            </div>
        </motion.div>
    )
}
