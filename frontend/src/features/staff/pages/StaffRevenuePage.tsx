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
import { DollarSign, Loader2, CheckCircle2 } from 'lucide-react'

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
                <Button variant="ghost" size="sm" onClick={() => navigate('/staff/menu')} className="hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-lg h-10 px-4 font-bold uppercase tracking-widest text-[10px]">
                    &larr; Back
                </Button>
            </div>

            <div className="px-2">
                <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none uppercase">
                    Shift_Report
                </h1>
                <p className="mt-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Revenue_Submission
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Card className="border border-slate-200/60 dark:border-neutral-800/60 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-sm rounded-2xl overflow-hidden">
                    <CardContent className="p-6 space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="staffShift" className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Select Shift</Label>
                            <Select value={revScheduleId} onValueChange={setRevScheduleId}>
                                <SelectTrigger id="staffShift" className="h-12 rounded-xl border-slate-200/60 dark:border-neutral-800/60 bg-white/50 dark:bg-neutral-900/50">
                                    <SelectValue placeholder="Select your current shift" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-slate-200 dark:border-neutral-800">
                                    {mySchedules.map((s: any) => (
                                        <SelectItem key={s.id} value={String(s.id)}>
                                            {s.shift?.name} ({s.shift?.startTime?.slice(0, 5)} - {s.shift?.endTime?.slice(0, 5)})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="staffOpening" className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Opening Balance</Label>
                            <div className="relative">
                                <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                                <Input
                                    id="staffOpening"
                                    type="number"
                                    value={revOpening}
                                    onChange={e => setRevOpening(e.target.value)}
                                    className="pl-12 h-12 rounded-xl border-slate-200/60 dark:border-neutral-800/60 bg-white/50 dark:bg-neutral-900/50 font-bold"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="staffCash" className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Cash Collected</Label>
                                <Input
                                    id="staffCash"
                                    type="number"
                                    value={revCash}
                                    onChange={e => setRevCash(e.target.value)}
                                    className="h-12 rounded-xl border-slate-200/60 dark:border-neutral-800/60 bg-white/50 dark:bg-neutral-900/50 font-black text-slate-900 dark:text-white"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="staffBank" className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Bank/Transfer</Label>
                                <Input
                                    id="staffBank"
                                    type="number"
                                    value={revBank}
                                    onChange={e => setRevBank(e.target.value)}
                                    className="h-12 rounded-xl border-slate-200/60 dark:border-neutral-800/60 bg-white/50 dark:bg-neutral-900/50 font-black text-slate-900 dark:text-white"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="staffNote" className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">Note (Optional)</Label>
                            <Input
                                id="staffNote"
                                value={revNote}
                                onChange={e => setRevNote(e.target.value)}
                                placeholder="Any discrepancies or observations..."
                                className="h-12 rounded-xl border-slate-200/60 dark:border-neutral-800/60 bg-white/50 dark:bg-neutral-900/50 text-xs"
                            />
                        </div>
                    </CardContent>
                </Card>

                <Button
                    type="submit"
                    className="w-full bg-black hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 h-14 text-sm font-black uppercase tracking-[0.2em] shadow-lg rounded-2xl transition-all active:scale-[0.98]"
                    disabled={isLoading || !revScheduleId}
                >
                    {isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        'Submit_Revenue_Report'
                    )}
                </Button>
            </form>
        </div>
    )
}
