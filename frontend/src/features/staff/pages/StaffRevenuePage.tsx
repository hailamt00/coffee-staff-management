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
import { DollarSign, ArrowLeft, Loader2, CheckCircle2 } from 'lucide-react'

export default function StaffRevenuePage() {
    const navigate = useNavigate()
    const { createRevenue, loading: revenueLoading } = useRevenue()
    const { schedules, loading: scheduleLoading, loadSchedule } = useSchedule()

    const staffJson = localStorage.getItem('staffInfo')
    const staff = staffJson ? JSON.parse(staffJson) : null
    const date = new Date().toISOString().slice(0, 10)

    useEffect(() => {
        if (!staff) {
            navigate('/staff/login')
            return
        }
        loadSchedule(date)
    }, [date, staff, loadSchedule, navigate])

    const mySchedules = schedules.filter(s => s.employeeId === staff?.id)

    const [revScheduleId, setRevScheduleId] = useState('')
    const [revOpening, setRevOpening] = useState('0')
    const [revExpected, setRevExpected] = useState('0')
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
                expectedRevenue: Number(revExpected),
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

    const isLoading = revenueLoading || scheduleLoading

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => navigate('/staff/menu')}>
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back
                </Button>
            </div>

            <div>
                <h1 className="text-2xl font-bold text-slate-800">Shift Report</h1>
                <p className="text-sm text-slate-500">Submit your end-of-shift revenue</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <Card className="shadow-sm border-none">
                    <CardContent className="p-5 space-y-4">
                        <div className="space-y-2">
                            <Label>Select Shift</Label>
                            <Select value={revScheduleId} onValueChange={setRevScheduleId}>
                                <SelectTrigger className="h-11">
                                    <SelectValue placeholder="Select your shift" />
                                </SelectTrigger>
                                <SelectContent>
                                    {mySchedules.map((s: any) => (
                                        <SelectItem key={s.id} value={String(s.id)}>
                                            {s.shift?.name} ({s.shift?.startTime} - {s.shift?.endTime})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Opening Balance</Label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <Input
                                    type="number"
                                    value={revOpening}
                                    onChange={e => setRevOpening(e.target.value)}
                                    className="pl-10 h-11"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Expected Revenue (POS/Goal)</Label>
                            <div className="relative">
                                <DollarSign className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                                <Input
                                    type="number"
                                    value={revExpected}
                                    onChange={e => setRevExpected(e.target.value)}
                                    className="pl-10 h-11 border-slate-200 focus:ring-black dark:focus:ring-white"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Cash Collected</Label>
                                <Input
                                    type="number"
                                    value={revCash}
                                    onChange={e => setRevCash(e.target.value)}
                                    className="h-11 font-bold text-slate-800"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Bank/Transfer</Label>
                                <Input
                                    type="number"
                                    value={revBank}
                                    onChange={e => setRevBank(e.target.value)}
                                    className="h-11 font-bold text-slate-800"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label>Note (Optional)</Label>
                            <Input
                                value={revNote}
                                onChange={e => setRevNote(e.target.value)}
                                placeholder="Discrepancies, etc..."
                                className="h-11"
                            />
                        </div>
                    </CardContent>
                </Card>

                <Button
                    type="submit"
                    className="w-full bg-black hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-slate-200 h-12 text-lg font-bold shadow-lg"
                    disabled={isLoading || !revScheduleId}
                >
                    {isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        'Submit Report'
                    )}
                </Button>
            </form>
        </div>
    )
}
