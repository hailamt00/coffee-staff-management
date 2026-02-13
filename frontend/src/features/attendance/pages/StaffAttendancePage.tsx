import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'
import { useSchedule } from '@/features/schedule/hooks/useSchedule'
import { useAttendance } from '@/features/attendance/hooks/useAttendance'
import { Clock, MapPin, CheckCircle, Loader2 } from 'lucide-react'

export default function StaffAttendancePage() {
    const navigate = useNavigate()
    const staffJson = localStorage.getItem('staffInfo')
    const staff = staffJson ? JSON.parse(staffJson) : null
    const date = new Date().toISOString().slice(0, 10)

    const { useSchedules, loading: scheduleMutationLoading } = useSchedule()
    const { checkIn, checkOut, loading: attendanceMutationLoading } = useAttendance()

    const { data: allSchedules = [], isLoading: scheduleQueryLoading } = useSchedules(date)

    useEffect(() => {
        if (!staff) {
            navigate('/staff/login')
        }
    }, [staff, navigate])

    // Filter only schedules for THIS staff member
    const mySchedules = allSchedules.filter(s => s.employeeId === staff?.id)

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

    const isLoading = scheduleMutationLoading || attendanceMutationLoading || scheduleQueryLoading

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-2 px-2">
                <Button variant="ghost" size="sm" onClick={() => navigate('/staff/menu')} className="hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-lg h-10 px-4 font-bold uppercase tracking-widest text-[10px]">
                    &larr; Back
                </Button>
            </div>

            <div className="px-2">
                <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none uppercase">
                    Attendance
                </h1>
                <p className="mt-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Shift_Check_In_Out
                </p>
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

                {mySchedules.map((s) => (
                    <Card key={s.id} className="overflow-hidden border border-slate-200/60 dark:border-neutral-800/60 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-sm rounded-2xl">
                        <CardHeader className="pb-3 border-b border-slate-50 dark:border-neutral-800/30">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-lg font-black text-slate-900 dark:text-white uppercase tracking-tight">{s.shiftName || 'Assigned Shift'}</CardTitle>
                                    <div className="flex items-center gap-2 mt-1 px-2 py-0.5 bg-slate-100 dark:bg-neutral-800 rounded-full w-fit">
                                        <Clock className="h-3 w-3 text-slate-500" />
                                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{s.shiftStartTime} - {s.shiftEndTime}</span>
                                    </div>
                                </div>
                                <Badge variant="outline" className="bg-white/50 dark:bg-black/50 text-[9px] font-black uppercase tracking-widest border-slate-200 dark:border-neutral-800 rounded-lg h-6">
                                    Scheduled
                                </Badge>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-2">
                            <div className="flex items-center gap-2 text-xs text-slate-500">
                                <MapPin className="h-3 w-3" />
                                Main Coffee Shop Location
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <Button
                                    className="bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 font-black uppercase tracking-widest text-[10px] h-12 rounded-xl active:scale-[0.98] transition-all"
                                    onClick={() => handleCheckIn(s)}
                                    disabled={isLoading}
                                >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Check In
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-slate-200/60 dark:border-neutral-800/60 text-slate-600 dark:text-slate-400 font-black uppercase tracking-widest text-[10px] h-12 rounded-xl active:scale-[0.98] transition-all bg-transparent hover:bg-slate-50 dark:hover:bg-neutral-800"
                                    onClick={() => handleCheckOut(s)}
                                    disabled={isLoading}
                                >
                                    Check Out
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="p-4 bg-amber-50 border border-amber-100 rounded-xl">
                <h4 className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-1">Notice</h4>
                <p className="text-[11px] text-amber-700 leading-relaxed">
                    Please check in within 15 minutes of your shift start time. Late arrivals will be automatically noted by the system.
                </p>
            </div>
        </div>
    )
}
