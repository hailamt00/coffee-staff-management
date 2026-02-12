import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'
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
import { useSchedule } from '@/features/schedule/hooks/useSchedule'
import { usePosition } from '@/features/positions/hooks/usePosition'
import { Calendar, Clock, Plus, ArrowLeft, Loader2, CalendarDays } from 'lucide-react'
import { formatDate } from '@/shared/utils/format'
import { useMemo } from 'react'

export default function StaffSchedulePage() {
    const navigate = useNavigate()
    const staffJson = localStorage.getItem('staffInfo')
    const staff = staffJson ? JSON.parse(staffJson) : null
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10))

    const {
        useSchedules,
        loading: scheduleMutationLoading,
        createRequest
    } = useSchedule()
    const { positions, loading: posLoading } = usePosition()

    const { data: allSchedules = [], isLoading: scheduleQueryLoading } = useSchedules(date)

    useEffect(() => {
        if (!staff) {
            navigate('/staff/login')
        }
    }, [staff, navigate])

    const loading = scheduleMutationLoading || posLoading || scheduleQueryLoading

    // Filter for current staff using flat properties
    const mySchedules = useMemo(() => {
        return allSchedules.filter(s => s.employeeCode === staff?.code || s.employeeName === staff?.name)
    }, [allSchedules, staff])

    const allShifts = useMemo(() => {
        return positions.flatMap(p => (p.shifts || []).map(s => ({ ...s, positionName: p.name })))
    }, [positions])

    /* ================= REQUEST DIALOG ================= */
    const [openRequest, setOpenRequest] = useState(false)
    const [reqShiftId, setReqShiftId] = useState('')
    const [reqDate, setReqDate] = useState(date)

    const handleCreateRequest = async () => {
        if (!reqShiftId) return
        await createRequest({
            employeeId: staff.id,
            shiftId: Number(reqShiftId),
            workDate: reqDate,
        })
        setOpenRequest(false)
    }

    return (
        <div className="space-y-6 pb-20">
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => navigate('/staff/menu')}>
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back
                </Button>
            </div>

            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">My Schedule</h1>
                    <p className="text-sm text-slate-500">View and manage your shifts</p>
                </div>

                <Dialog open={openRequest} onOpenChange={setOpenRequest}>
                    <DialogTrigger asChild>
                        <Button className="bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-slate-200 size-10 rounded-full p-0 flex items-center justify-center shadow-lg">
                            <Plus className="h-6 w-6" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[90vw] rounded-2xl">
                        <DialogHeader>
                            <DialogTitle>Request a Shift</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="requestDate">Date</Label>
                                <Input
                                    id="requestDate"
                                    type="date"
                                    value={reqDate}
                                    onChange={e => setReqDate(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="requestShift">Shift</Label>
                                <Select value={reqShiftId} onValueChange={setReqShiftId}>
                                    <SelectTrigger id="requestShift">
                                        <SelectValue placeholder="Select Shift" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {allShifts.map(s => (
                                            <SelectItem key={s.id} value={String(s.id)}>
                                                {s.positionName} - {s.name} ({s.startTime} - {s.endTime})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button onClick={handleCreateRequest} className="w-full bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-slate-200 h-11">
                                Submit Request
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex items-center gap-2 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                <CalendarDays className="h-4 w-4 text-black dark:text-white" />
                <Label htmlFor="mainScheduleDate" className="sr-only">Schedule Date</Label>
                <Input
                    id="mainScheduleDate"
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="border-none shadow-none focus-visible:ring-0 p-0 h-auto font-medium"
                />
            </div>

            <div className="space-y-4">
                {loading && (
                    <div className="flex justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-black" />
                    </div>
                )}

                {!loading && mySchedules.length === 0 && (
                    <div className="py-20 text-center space-y-3">
                        <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto text-slate-400">
                            <Calendar className="h-8 w-8" />
                        </div>
                        <p className="text-slate-400 font-medium">No shifts found for this date</p>
                        <Button variant="outline" size="sm" onClick={() => setDate(new Date().toISOString().slice(0, 10))}>Today</Button>
                    </div>
                )}

                {mySchedules.map((s, index) => (
                    <Card key={index} className="border-none shadow-sm">
                        <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
                            <div className="flex items-center gap-4">
                                <div className="bg-slate-100 p-2.5 rounded-xl">
                                    <Clock className="h-5 w-5 text-black" />
                                </div>
                                <div>
                                    <p className="font-bold text-slate-800">{s.shiftName || 'Shift'}</p>
                                    <p className="text-xs text-slate-500">{formatDate(s.workDate)}</p>
                                </div>
                            </div>
                            <Badge variant="outline" className="bg-slate-50 text-slate-800 border-slate-100">
                                Assigned
                            </Badge>
                        </CardHeader>
                    </Card>
                ))}
            </div>

            <div className="fixed bottom-6 left-4 right-4 bg-slate-900 border border-slate-800 p-4 rounded-2xl shadow-2xl flex items-center justify-between">
                <div>
                    <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Selected Date</p>
                    <p className="text-white font-bold">{formatDate(date)}</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white" onClick={() => {
                        const d = new Date(date)
                        d.setDate(d.getDate() - 1)
                        setDate(d.toISOString().slice(0, 10))
                    }}>Prev</Button>
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white" onClick={() => {
                        const d = new Date(date)
                        d.setDate(d.getDate() + 1)
                        setDate(d.toISOString().slice(0, 10))
                    }}>Next</Button>
                </div>
            </div>
        </div>
    )
}
