import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'
import { useSchedule } from '@/features/schedule/hooks/useSchedule'
import { useAttendance } from '@/features/attendance/hooks/useAttendance'
import { usePosition } from '@/features/positions/hooks/usePosition'
import { Clock, MapPin, CheckCircle, Loader2, Plus } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/shared/components/ui/dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shared/components/ui/select'
import { Label } from '@/shared/components/ui/label'

export default function StaffAttendancePage() {
    const navigate = useNavigate()
    const staffJson = localStorage.getItem('staffInfo')
    const staff = staffJson ? JSON.parse(staffJson) : null
    const date = new Date().toISOString().slice(0, 10)

    const { useSchedules, loading: scheduleMutationLoading } = useSchedule()
    const { useAttendance: useAttendanceQuery, checkIn, checkOut, loading: attendanceMutationLoading } = useAttendance()
    const { positions } = usePosition()

    const { data: allSchedules = [], isLoading: scheduleQueryLoading } = useSchedules(date)
    const { data: allAttendances = [], isLoading: attendanceQueryLoading } = useAttendanceQuery(date)

    const [isSubstituteOpen, setIsSubstituteOpen] = useState(false)
    const [subPositionId, setSubPositionId] = useState('')
    const [subShiftId, setSubShiftId] = useState('')

    useEffect(() => {
        if (!staff) {
            navigate('/staff/login')
        }
    }, [staff, navigate])

    // Filter only schedules and attendances for THIS staff member
    const mySchedules = allSchedules.filter(s => s.employeeId === staff?.id)
    const myAttendances = allAttendances.filter(a => a.employeeId === staff?.id)

    const availableSubShifts = positions.find(p => p.id.toString() === subPositionId)?.shifts || []

    const handleCheckIn = async (s: any) => {
        try {
            await checkIn({
                employeeId: staff.id,
                shiftId: s.shiftId,
                workDate: date
            })
            // Refresh to show status update (though existing UI doesn't track status well yet)
        } catch (err) {
            // Error handled by hook
        }
    }

    const handleCheckOut = async (s: any) => {
        try {
            await checkOut({
                employeeId: staff.id,
                shiftId: s.shiftId,
                workDate: date
            })
        } catch (err) {
            // Error handled by hook
        }
    }

    const handleSubstituteCheckIn = async () => {
        if (!subShiftId) return
        try {
            await checkIn({
                employeeId: staff.id,
                shiftId: parseInt(subShiftId),
                workDate: date
            })
            setIsSubstituteOpen(false)
            setSubPositionId('')
            setSubShiftId('')
        } catch (err) {
            // Error handled by hook
        }
    }

    const isLoading = scheduleMutationLoading || attendanceMutationLoading || scheduleQueryLoading || attendanceQueryLoading

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 px-2">
                <Button variant="ghost" size="sm" onClick={() => navigate('/staff/menu')} className="hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-lg h-10 px-4 font-bold text-[11px] tracking-wide">
                    &larr; Back
                </Button>
            </div>

            <div className="px-2 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                        Attendance
                    </h1>
                    <p className="mt-1 text-[11px] font-bold text-slate-500 tracking-wide">
                        Shift Check In/Out
                    </p>
                </div>
                <Button
                    onClick={() => setIsSubstituteOpen(true)}
                    className="bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 font-bold tracking-wide text-xs rounded-xl h-9 px-3"
                >
                    <Plus className="h-4 w-4 mr-1" />
                    Substitute
                </Button>
            </div>

            <div className="space-y-4">
                {isLoading && (
                    <div className="flex justify-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-black" />
                    </div>
                )}

                {!isLoading && mySchedules.length === 0 && (
                    <Card className="bg-slate-50 border-dashed border-2">
                        <CardContent className="p-8 text-center text-slate-500">
                            No shifts scheduled for you today, {staff?.name}.
                        </CardContent>
                    </Card>
                )}

                {mySchedules.map((s) => {
                    const attendanceRecord = myAttendances.find(a => a.shiftId === s.shiftId)
                    const isCheckedIn = !!attendanceRecord?.checkIn
                    const isCheckedOut = !!attendanceRecord?.checkOut

                    return (
                        <Card key={s.id} className="overflow-hidden border border-slate-200/60 dark:border-neutral-800/60 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-sm rounded-2xl">
                            <CardHeader className="pb-3 border-b border-slate-50 dark:border-neutral-800/30">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="text-lg font-black text-slate-900 dark:text-white tracking-tight">{s.shiftName || 'Assigned Shift'}</CardTitle>
                                        <div className="flex items-center gap-2 mt-1 px-2 py-0.5 bg-slate-100 dark:bg-neutral-800 rounded-full w-fit">
                                            <Clock className="h-3 w-3 text-slate-500" />
                                            <span className="text-[11px] font-bold text-slate-500 tracking-wide">{s.shiftStartTime} - {s.shiftEndTime}</span>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className={`text-[10px] font-bold tracking-wide rounded-lg h-6 ${isCheckedOut ? 'bg-green-100 text-green-700 border-green-200' : isCheckedIn ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-white/50 dark:bg-black/50 border-slate-200 dark:border-neutral-800'}`}>
                                        {isCheckedOut ? 'Completed' : isCheckedIn ? 'In Progress' : 'Scheduled'}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-6 pt-5 pb-6">
                                <div className="flex items-center justify-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-50 dark:bg-neutral-800/50 py-2 rounded-xl border border-slate-100 dark:border-neutral-800">
                                    <MapPin className="h-3.5 w-3.5" />
                                    Main Coffee Shop
                                </div>

                                {!isCheckedOut && (
                                    <div className="flex flex-col items-center justify-center pt-2">
                                        {!isCheckedIn ? (
                                            <Button
                                                className="w-full bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 font-bold h-12 rounded-xl"
                                                onClick={() => handleCheckIn(s)}
                                                disabled={isLoading}
                                            >
                                                {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <Plus className="h-4 w-4 mr-2" />}
                                                Check In
                                            </Button>
                                        ) : (
                                            <Button
                                                className="w-full bg-slate-200 hover:bg-slate-300 text-slate-900 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:text-white font-bold h-12 rounded-xl border border-slate-300 dark:border-neutral-600"
                                                onClick={() => handleCheckOut(s)}
                                                disabled={isLoading}
                                            >
                                                {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <CheckCircle className="h-4 w-4 mr-2 text-green-600 dark:text-green-400" />}
                                                Check Out
                                            </Button>
                                        )}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
                <h4 className="text-[11px] font-bold text-amber-800 tracking-wide mb-1">Notice</h4>
                <p className="text-[11px] text-amber-700 leading-relaxed">
                    Please check in within 15 minutes of your shift start time. Late arrivals will be automatically noted by the system.
                </p>
            </div>

            <Dialog open={isSubstituteOpen} onOpenChange={setIsSubstituteOpen}>
                <DialogContent className="max-w-[400px] rounded-2xl border border-slate-200/60 dark:border-neutral-800/60 backdrop-blur-xl bg-white/90 dark:bg-neutral-900/90 shadow-2xl p-0 overflow-hidden">
                    <DialogHeader className="p-6 border-b border-slate-100 dark:border-neutral-800/50 bg-slate-50/50 dark:bg-neutral-900/50">
                        <DialogTitle className="text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
                            <Plus className="h-5 w-5 text-slate-500" />
                            Substitute Check-In
                        </DialogTitle>
                        <DialogDescription className="text-[11px] font-medium text-slate-500 mt-2 leading-relaxed">
                            Check in for a shift that you are covering for someone else.
                            The system will automatically generate a schedule record for your attendance.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="p-6 space-y-5">
                        <div className="space-y-2.5">
                            <Label className="text-[11px] font-bold text-slate-500 tracking-wide uppercase">Position</Label>
                            <Select value={subPositionId} onValueChange={(val) => {
                                setSubPositionId(val)
                                setSubShiftId('')
                            }}>
                                <SelectTrigger className="h-12 rounded-xl border-slate-200/60 dark:border-neutral-800/60 bg-white/50 dark:bg-neutral-900/50 transition-colors hover:bg-white dark:hover:bg-neutral-900 focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-0">
                                    <SelectValue placeholder="Select position" />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-slate-200/60 dark:border-neutral-800/60 shadow-xl">
                                    {positions.map((p) => (
                                        <SelectItem key={p.id} value={p.id.toString()} className="font-medium">
                                            {p.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2.5">
                            <Label className="text-[11px] font-bold text-slate-500 tracking-wide uppercase">Shift</Label>
                            <Select value={subShiftId} onValueChange={setSubShiftId} disabled={!subPositionId}>
                                <SelectTrigger className="h-12 rounded-xl border-slate-200/60 dark:border-neutral-800/60 bg-white/50 dark:bg-neutral-900/50 transition-colors hover:bg-white dark:hover:bg-neutral-900 focus:ring-2 focus:ring-black dark:focus:ring-white focus:ring-offset-0 disabled:opacity-50">
                                    <SelectValue placeholder={subPositionId ? "Select shift" : "Select position first"} />
                                </SelectTrigger>
                                <SelectContent className="rounded-xl border-slate-200/60 dark:border-neutral-800/60 shadow-xl">
                                    {availableSubShifts.map((s) => (
                                        <SelectItem key={s.id} value={s.id.toString()} className="font-medium">
                                            {s.name} <span className="text-slate-400 ml-1 font-normal">({s.startTime.slice(0, 5)} - {s.endTime.slice(0, 5)})</span>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex gap-2 pt-2">
                            <Button variant="ghost" onClick={() => setIsSubstituteOpen(false)} className="h-12 rounded-xl font-bold flex-1 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-neutral-800">
                                Cancel
                            </Button>
                            <Button
                                onClick={handleSubstituteCheckIn}
                                disabled={!subShiftId || isLoading}
                                className="bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 font-bold tracking-wide h-12 flex-[2] rounded-xl shadow-lg shadow-black/10 dark:shadow-white/10 transition-all active:scale-[0.98]"
                            >
                                {isLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <CheckCircle className="h-4 w-4 mr-2" />}
                                Confirm
                            </Button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
