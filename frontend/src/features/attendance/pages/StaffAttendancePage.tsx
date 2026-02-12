import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'
import { useSchedule } from '@/features/schedule/hooks/useSchedule'
import { useAttendance } from '@/features/attendance/hooks/useAttendance'
import { Clock, MapPin, CheckCircle, ArrowLeft, Loader2 } from 'lucide-react'

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
            <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" onClick={() => navigate('/staff/menu')}>
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back
                </Button>
            </div>

            <div>
                <h1 className="text-2xl font-bold text-slate-800">Attendance</h1>
                <p className="text-sm text-slate-500">Check in/out for your shifts today</p>
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
                    <Card key={s.id} className="overflow-hidden border-l-4 border-l-black shadow-sm">
                        <CardHeader className="pb-2">
                            <div className="flex justify-between items-start">
                                <div>
                                    <CardTitle className="text-lg">{s.shiftName || 'Assigned Shift'}</CardTitle>
                                    <CardDescription className="flex items-center gap-1 mt-1">
                                        <Clock className="h-3 w-3" />
                                        {s.shiftStartTime} - {s.shiftEndTime}
                                    </CardDescription>
                                </div>
                                <Badge variant="outline" className="bg-slate-50 text-slate-700 border-slate-100">
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
                                    className="bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-slate-200 font-bold"
                                    onClick={() => handleCheckIn(s)}
                                    disabled={isLoading}
                                >
                                    <CheckCircle className="h-4 w-4 mr-2" />
                                    Check In
                                </Button>
                                <Button
                                    variant="outline"
                                    className="border-slate-200 text-slate-600 font-bold"
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
