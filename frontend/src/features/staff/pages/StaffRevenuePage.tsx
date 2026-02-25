import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shared/components/ui/select'
import { useRevenue } from '@/features/revenue/hooks/useRevenue'
import { useSchedule } from '@/features/schedule/hooks/useSchedule'
import { Loader2, CheckCircle2 } from 'lucide-react'

export default function StaffRevenuePage() {
    const navigate = useNavigate()
    const staffJson = localStorage.getItem('staffInfo')
    const staff = staffJson ? JSON.parse(staffJson) : null
    const date = new Date().toISOString().slice(0, 10)

    const { createRevenue, loading: revenueMutationLoading } = useRevenue()
    const { useSchedules, loading: scheduleMutationLoading } = useSchedule()

    const { data: allSchedules = [], isLoading: scheduleQueryLoading } = useSchedules(date)

    useEffect(() => {
        if (!staff) {
            navigate('/staff/login')
        }
    }, [staff, navigate])

    const mySchedules = allSchedules.filter(s => s.employeeId === staff?.id)

    const [revScheduleId, setRevScheduleId] = useState('')
    const [revOpening, setRevOpening] = useState('0')
    const [revCash, setRevCash] = useState('0')
    const [revBank, setRevBank] = useState('0')
    const [revIncome, setRevIncome] = useState('0')
    const [revExpenses, setRevExpenses] = useState('0')
    const [revNote, setRevNote] = useState('')
    const [submitted, setSubmitted] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!revScheduleId) return

        try {
            await createRevenue({
                scheduleId: Number(revScheduleId),
                openingBalance: Number(revOpening),
                cash: Number(revCash),
                bank: Number(revBank),
                income: Number(revIncome),
                expenses: Number(revExpenses),
                note: revNote,
            })
            setSubmitted(true)
        } catch (err) {
            // Handled by hook
        }
    }

    if (submitted) {
        return (
            <div className="pt-12 text-center space-y-6">
                <div className="bg-slate-100 dark:bg-white/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-10 w-10 text-slate-900 dark:text-white" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-slate-800">Report Submitted!</h2>
                    <p className="text-slate-500 px-6">Your shift revenue report has been successfully recorded.</p>
                </div>
                <Button className="bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-slate-200 w-full max-w-[200px]" onClick={() => navigate('/staff/menu')}>
                    Return to Menu
                </Button>
            </div>
        )
    }

    const isLoading = revenueMutationLoading || scheduleMutationLoading || scheduleQueryLoading

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 px-2">
                <Button variant="ghost" size="sm" onClick={() => navigate('/staff/menu')} className="hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-lg h-10 px-4 font-bold text-[11px] tracking-wide">
                    &larr; Back
                </Button>
            </div>

            <div className="px-2">
                <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                    Shift Report
                </h1>
                <p className="mt-1 text-[11px] font-bold text-slate-500 tracking-wide">
                    Revenue Submission
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Card className="border border-slate-200/60 dark:border-neutral-800/60 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-sm rounded-2xl overflow-hidden">
                    <CardContent className="p-0">
                        {/* Selected Shift */}
                        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-neutral-800">
                            <Label htmlFor="staffShift" className="text-xs font-bold text-slate-500 uppercase tracking-widest w-1/3">Select Shift</Label>
                            <div className="w-2/3">
                                <Select value={revScheduleId} onValueChange={setRevScheduleId}>
                                    <SelectTrigger id="staffShift" className="h-10 border-0 bg-transparent text-right font-black shadow-none focus:ring-0 text-slate-900 dark:text-white justify-end p-0">
                                        <SelectValue placeholder="Select current shift" />
                                    </SelectTrigger>
                                    <SelectContent align="end" className="rounded-xl border-slate-200 dark:border-neutral-800 shadow-xl">
                                        {mySchedules.map((s: any) => (
                                            <SelectItem key={s.id} value={String(s.id)} className="font-medium text-right">
                                                {s.shift?.name} ({s.shift?.startTime?.slice(0, 5)} - {s.shift?.endTime?.slice(0, 5)})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Opening Balance */}
                        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-neutral-800">
                            <Label htmlFor="staffOpening" className="text-xs font-bold text-slate-500 uppercase tracking-widest w-1/3">Đầu kỳ / Opening</Label>
                            <div className="w-2/3 relative flex items-center justify-end">
                                <Input
                                    id="staffOpening"
                                    type="number"
                                    value={revOpening}
                                    onChange={e => setRevOpening(e.target.value)}
                                    className="h-10 border-0 bg-transparent text-right font-black text-slate-900 dark:text-white shadow-none focus-visible:ring-0 pr-0 text-base"
                                />
                            </div>
                        </div>

                        {/* Cash */}
                        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-neutral-800 bg-slate-50/50 dark:bg-neutral-900/50">
                            <Label htmlFor="staffCash" className="text-xs font-bold text-slate-500 uppercase tracking-widest w-1/3">Tiền mặt / Cash</Label>
                            <div className="w-2/3">
                                <Input
                                    id="staffCash"
                                    type="number"
                                    value={revCash}
                                    onChange={e => setRevCash(e.target.value)}
                                    className="h-10 border-0 bg-transparent text-right font-black text-teal-600 dark:text-teal-400 shadow-none focus-visible:ring-0 pr-0 text-base"
                                />
                            </div>
                        </div>

                        {/* Bank/App Transfers */}
                        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-neutral-800">
                            <Label htmlFor="staffBank" className="text-xs font-bold text-slate-500 uppercase tracking-widest w-1/3">MOMO / VCB (Bank)</Label>
                            <div className="w-2/3">
                                <Input
                                    id="staffBank"
                                    type="number"
                                    value={revBank}
                                    onChange={e => setRevBank(e.target.value)}
                                    className="h-10 border-0 bg-transparent text-right font-black text-blue-600 dark:text-blue-400 shadow-none focus-visible:ring-0 pr-0 text-base"
                                />
                            </div>
                        </div>

                        {/* Income */}
                        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-neutral-800 bg-slate-50/50 dark:bg-neutral-900/50">
                            <Label htmlFor="staffIncome" className="text-xs font-bold text-slate-500 uppercase tracking-widest w-1/3">Thu khác / Income</Label>
                            <div className="w-2/3">
                                <Input
                                    id="staffIncome"
                                    type="number"
                                    value={revIncome}
                                    onChange={e => setRevIncome(e.target.value)}
                                    className="h-10 border-0 bg-transparent text-right font-black text-green-600 dark:text-green-400 shadow-none focus-visible:ring-0 pr-0 text-base"
                                />
                            </div>
                        </div>

                        {/* Expenses */}
                        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-neutral-800">
                            <Label htmlFor="staffExpenses" className="text-xs font-bold text-slate-500 uppercase tracking-widest w-1/3">Chi khác / Expenses</Label>
                            <div className="w-2/3">
                                <Input
                                    id="staffExpenses"
                                    type="number"
                                    value={revExpenses}
                                    onChange={e => setRevExpenses(e.target.value)}
                                    className="h-10 border-0 bg-transparent text-right font-black text-rose-600 dark:text-rose-400 shadow-none focus-visible:ring-0 pr-0 text-base"
                                />
                            </div>
                        </div>

                        {/* Calculated Net Revenue (Read-only for visual feedback as in legacy app) */}
                        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900/80">
                            <Label className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest w-1/2">Doanh thu NET</Label>
                            <div className="w-1/2 text-right font-black text-slate-900 dark:text-white text-base">
                                {(Number(revCash) + Number(revBank) + Number(revIncome) - Number(revExpenses)).toLocaleString()}
                            </div>
                        </div>

                        {/* Note */}
                        <div className="flex items-center justify-between p-4">
                            <Label htmlFor="staffNote" className="text-xs font-bold text-slate-500 uppercase tracking-widest w-1/3">Ghi chú / Note</Label>
                            <div className="w-2/3">
                                <Input
                                    id="staffNote"
                                    value={revNote}
                                    onChange={e => setRevNote(e.target.value)}
                                    placeholder="Optional notes..."
                                    className="h-10 border-0 bg-transparent text-right font-medium text-slate-700 dark:text-slate-300 shadow-none focus-visible:ring-0 pr-0 text-sm"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Button
                    type="submit"
                    className="w-full bg-black hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 h-14 text-sm font-bold tracking-wide shadow-lg rounded-2xl transition-all active:scale-[0.98]"
                    disabled={isLoading || !revScheduleId}
                >
                    {isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        'Submit Revenue Report'
                    )}
                </Button>
            </form>
        </div>
    )
}
