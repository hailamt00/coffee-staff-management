import { useState, useMemo } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/shared/components/ui/table'
import { useSchedule } from '../hooks/useSchedule'
import { Loader2, Plus } from 'lucide-react'
import { EditScheduleDialog } from './EditScheduleDialog'
import { Button } from '@/shared/components/ui/button'
import type { Schedule, Shift, UpdateScheduleRequest } from '@/shared/types/api'

interface WeeklyScheduleTableProps {
    date: string
    shifts: Shift[]
    onCellClick?: (date: string, shift: Shift) => void
    filterPosition?: string
}

export function WeeklyScheduleTable({ date, shifts, onCellClick, filterPosition }: WeeklyScheduleTableProps) {
    const { useWeeklySchedule, updateSchedule, deleteSchedule } = useSchedule()

    // Edit Dialog State
    const [selectedSchedule, setSelectedSchedule] = useState<Schedule | null>(null)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

    // Calculate start (Monday) and end (Sunday) of the week
    const { fromDate, toDate, weekDates } = useMemo(() => {
        const curr = new Date(date)
        const day = curr.getDay()
        const diff = curr.getDate() - day + (day === 0 ? -6 : 1) // adjust when day is sunday

        const monday = new Date(curr.setDate(diff))
        const sunday = new Date(curr.setDate(diff + 6))

        const dates = []
        for (let i = 0; i < 7; i++) {
            const d = new Date(monday)
            d.setDate(monday.getDate() + i)
            dates.push(d)
        }

        return {
            fromDate: monday.toISOString().slice(0, 10),
            toDate: sunday.toISOString().slice(0, 10),
            weekDates: dates
        }
    }, [date])

    const { data: schedules = [], isLoading } = useWeeklySchedule(fromDate, toDate)

    const scheduleMap = useMemo(() => {
        const map = new Map<string, Schedule[]>()
        if (!schedules) return map

        schedules.forEach(s => {
            // Key: "ShiftName-Date" e.g. "Ca Sáng-2023-10-23"
            const key = `${s.shiftName}-${s.workDate}`
            if (!map.has(key)) map.set(key, [])
            map.get(key)?.push(s)
        })
        return map
    }, [schedules])

    // Unique shifts for rows
    const uniqueShifts = useMemo(() => {
        let filteredShifts = shifts
        if (filterPosition && filterPosition !== 'all') {
            filteredShifts = shifts.filter(s => s.positionName === filterPosition)
        }

        return Array.from(new Set(filteredShifts.map(s => s.name)))
            .map(name => filteredShifts.find(s => s.name === name))
            .filter((s): s is Shift => !!s)
            .sort((a, b) => a.startTime.localeCompare(b.startTime))
    }, [shifts, filterPosition])

    if (isLoading) {
        return (
            <div className="flex h-48 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
        )
    }


    // Helper to get color based on position name
    const getPositionColor = (positionName: string) => {
        const name = positionName.toLowerCase()
        if (name.includes('bảo vệ') || name.includes('security')) return 'bg-slate-50 border-slate-200 text-slate-700'
        if (name.includes('thu ngân') || name.includes('cashier')) return 'bg-emerald-50/60 border-emerald-200 text-emerald-800'
        if (name.includes('pha chế') || name.includes('barista')) return 'bg-amber-50/60 border-amber-200 text-amber-800'
        if (name.includes('phục vụ') || name.includes('server') || name.includes('waiter')) return 'bg-blue-50/60 border-blue-200 text-blue-800'
        if (name.includes('quản lý') || name.includes('manager')) return 'bg-purple-50/60 border-purple-200 text-purple-800'
        return 'bg-indigo-50/60 border-indigo-200 text-indigo-800' // default
    }

    // Helper to sort positions: Phục vụ > Pha chế > Others
    const sortPositions = (posA: string, posB: string) => {
        const a = posA.toLowerCase()
        const b = posB.toLowerCase()

        const isServA = a.includes('phục vụ') || a.includes('server')
        const isServB = b.includes('phục vụ') || b.includes('server')

        if (isServA && !isServB) return -1
        if (!isServA && isServB) return 1

        const isBaristaA = a.includes('pha chế') || a.includes('barista')
        const isBaristaB = b.includes('pha chế') || b.includes('barista')

        if (isBaristaA && !isBaristaB) return -1
        if (!isBaristaA && isBaristaB) return 1

        return posA.localeCompare(posB)
    }

    const handleScheduleClick = (schedule: Schedule) => {
        setSelectedSchedule(schedule)
        setIsEditDialogOpen(true)
    }

    const handleUpdate = async (params: { id: number, data: UpdateScheduleRequest }) => {
        await updateSchedule(params)
        setIsEditDialogOpen(false)
    }

    const handleDelete = async (scheduleId: number) => {
        await deleteSchedule(scheduleId)
        setIsEditDialogOpen(false)
    }

    return (
        <div className="space-y-4">
            <EditScheduleDialog
                schedule={selectedSchedule}
                isOpen={isEditDialogOpen}
                onClose={() => setIsEditDialogOpen(false)}
                onSave={handleUpdate}
                onDelete={handleDelete}
            />

            {/* Desktop View */}
            <div className="hidden md:block bg-white dark:bg-neutral-900 rounded-2xl border border-slate-200/60 dark:border-neutral-800 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <Table className="min-w-[1000px] border-collapse">
                        <TableHeader>
                            <TableRow className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-200 dark:border-neutral-800">
                                <TableHead className="w-[180px] border-r border-slate-200 dark:border-neutral-800 py-6 px-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[11px] font-bold tracking-wide text-slate-400">Shift Info</span>
                                        <span className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">Timeline</span>
                                    </div>
                                </TableHead>
                                {weekDates.map((d) => (
                                    <TableHead key={d.toISOString()} className="text-center min-w-[140px] border-r border-slate-200 dark:border-neutral-800 last:border-r-0 p-3">
                                        <div className="flex flex-col items-center gap-1">
                                            <span className="font-bold text-slate-700 dark:text-slate-300 capitalize tracking-wide text-sm">
                                                {d.toLocaleDateString('en-US', { weekday: 'short' })}
                                            </span>
                                            <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                                                {d.getDate().toString().padStart(2, '0')}/{((d.getMonth() + 1)).toString().padStart(2, '0')}
                                            </span>
                                        </div>
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {uniqueShifts.map((shift, index) => (
                                <TableRow key={shift.id} className={`hover:bg-slate-50/50 dark:hover:bg-neutral-900/50 transition-colors ${index !== uniqueShifts.length - 1 ? 'border-b border-slate-200 dark:border-neutral-800' : ''}`}>
                                    <TableCell className="font-bold text-slate-800 dark:text-slate-200 align-middle border-r border-slate-200 dark:border-neutral-800 bg-slate-50/30 dark:bg-neutral-900/10 p-4 text-center">
                                        <div className="flex flex-col gap-1 items-center justify-center">
                                            <span className="text-sm font-bold block">{shift.name}</span>
                                        </div>
                                    </TableCell>

                                    {weekDates.map(d => {
                                        const dateStr = d.toISOString().slice(0, 10)
                                        const key = `${shift.name}-${dateStr}`
                                        const daySchedules = scheduleMap.get(key) || []

                                        const groupedByPosition: Record<string, Schedule[]> = {}
                                        daySchedules.forEach(s => {
                                            const pos = s.positionName || 'Unknown'
                                            if (filterPosition && filterPosition !== 'all' && pos !== filterPosition) {
                                                return; // Skip if it doesn't match the current filter
                                            }
                                            if (!groupedByPosition[pos]) groupedByPosition[pos] = []
                                            groupedByPosition[pos].push(s)
                                        })

                                        const sortedPositions = Object.keys(groupedByPosition).sort(sortPositions)

                                        const totalSchedulesInCell = Object.values(groupedByPosition).flat().length;

                                        return (
                                            <TableCell key={dateStr} className="p-2 align-top h-32 border-r border-slate-200 dark:border-neutral-800 last:border-r-0 relative">
                                                <div className="flex flex-col gap-2 h-full">
                                                    {totalSchedulesInCell === 0 ? (
                                                        <div
                                                            className="flex-1 flex items-center justify-center opacity-40 hover:opacity-100 transition-opacity cursor-pointer group/add"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                onCellClick?.(dateStr, shift);
                                                            }}
                                                        >
                                                            <div className="w-1.5 h-1.5 rounded-full bg-slate-300 dark:bg-neutral-700 group-hover/add:scale-150 group-hover/add:bg-black dark:group-hover/add:bg-white transition-all transform-gpu"></div>
                                                        </div>
                                                    ) : (
                                                        sortedPositions.map(posName => {
                                                            const scheds = groupedByPosition[posName]
                                                            const colorClass = getPositionColor(posName)
                                                            return (
                                                                <div key={posName} className={`rounded-md px-2 py-1.5 shadow-sm border mb-2 ${colorClass}`}>
                                                                    <div className="flex flex-col gap-1">
                                                                        {scheds.map((schedule, idx) => (
                                                                            <div key={schedule.id} className="relative">
                                                                                {idx > 0 && (
                                                                                    <div className="h-px bg-slate-200 dark:bg-neutral-700 my-1 mx-auto w-[90%]"></div>
                                                                                )}
                                                                                <div
                                                                                    className="flex items-center justify-between gap-2 cursor-pointer hover:opacity-75 transition-opacity"
                                                                                    onClick={() => handleScheduleClick(schedule)}
                                                                                >
                                                                                    <div className="flex flex-col overflow-hidden">
                                                                                        <span className="text-[11px] font-bold leading-tight line-clamp-1">{schedule.employeeName}</span>
                                                                                        <span className="text-[9px] font-mono font-semibold bg-white/40 dark:bg-black/20 px-1 py-0.5 rounded w-max mt-1 text-slate-600 dark:text-slate-300">
                                                                                            {schedule.shiftStartTime?.slice(0, 5) || '--:--'} - {schedule.shiftEndTime?.slice(0, 5) || '--:--'}
                                                                                        </span>
                                                                                        {(schedule.checkIn || schedule.checkOut) && (
                                                                                            <span className="text-[9px] font-mono font-bold text-green-700 dark:text-green-400 bg-green-500/20 px-1 py-0.5 rounded w-max mt-1">
                                                                                                Thực tế: {schedule.checkIn ? new Date(schedule.checkIn).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) : '--:--'} - {schedule.checkOut ? new Date(schedule.checkOut).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) : '--:--'}
                                                                                            </span>
                                                                                        )}
                                                                                        {schedule.note && (
                                                                                            <span className="text-[9px] italic opacity-70 line-clamp-2 mt-0.5" title={schedule.note}>
                                                                                                "{schedule.note}"
                                                                                            </span>
                                                                                        )}
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            )
                                                        })
                                                    )}
                                                </div>
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Mobile View */}
            <div className="md:hidden space-y-4">
                {weekDates.map(d => {
                    const dateStr = d.toISOString().slice(0, 10)
                    const dayName = d.toLocaleDateString('en-US', { weekday: 'long' })
                    const displayDay = `${d.getDate().toString().padStart(2, '0')}/${((d.getMonth() + 1)).toString().padStart(2, '0')}`

                    // Get all schedules for this day across all unique shifts
                    const daySchedules: Schedule[] = []
                    uniqueShifts.forEach(shift => {
                        const key = `${shift.name}-${dateStr}`
                        const slotSchedules = scheduleMap.get(key) || []
                        slotSchedules.forEach(s => {
                            const pos = s.positionName || 'Unknown'
                            if (filterPosition && filterPosition !== 'all' && pos !== filterPosition) return
                            daySchedules.push(s)
                        })
                    })

                    return (
                        <div key={dateStr} className="space-y-3">
                            <div className="flex items-center gap-2 px-1">
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{dayName}</span>
                                <span className="h-px flex-1 bg-slate-100 dark:bg-neutral-800"></span>
                                <span className="text-[10px] font-black text-slate-900 dark:text-white tabular-nums bg-slate-100 dark:bg-neutral-800 px-2 py-0.5 rounded-full">{displayDay}</span>
                            </div>

                            <div className="grid grid-cols-1 gap-3">
                                {daySchedules.length === 0 ? (
                                    <div
                                        className="p-8 border border-dashed border-slate-200 dark:border-neutral-800 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-400 hover:bg-slate-50 dark:hover:bg-white/5 transition-colors cursor-pointer"
                                        onClick={() => onCellClick?.(dateStr, uniqueShifts[0])} // Default to first shift if empty
                                    >
                                        <div className="w-8 h-8 rounded-full bg-slate-50 dark:bg-neutral-800 flex items-center justify-center">
                                            <Plus className="w-4 h-4" />
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-widest">No shifts assigned</span>
                                    </div>
                                ) : (
                                    daySchedules.map(s => {
                                        const colorClass = getPositionColor(s.positionName || '')
                                        return (
                                            <div
                                                key={s.id}
                                                onClick={() => handleScheduleClick(s)}
                                                className={`p-4 rounded-2xl border shadow-sm transition-all active:scale-[0.98] ${colorClass}`}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-[10px] font-black uppercase tracking-wider opacity-60">{s.positionName}</span>
                                                        <span className="text-sm font-black tracking-tight">{s.employeeName}</span>
                                                    </div>
                                                    <div className="text-right flex flex-col items-end gap-1">
                                                        <span className="text-[10px] font-black bg-white/50 dark:bg-black/20 px-2 py-1 rounded-lg">
                                                            {s.shiftName}
                                                        </span>
                                                        <span className="text-[10px] font-mono font-bold opacity-70 tabular-nums">
                                                            {s.shiftStartTime?.slice(0, 5)} - {s.shiftEndTime?.slice(0, 5)}
                                                        </span>
                                                    </div>
                                                </div>

                                                {(s.checkIn || s.checkOut) && (
                                                    <div className="mt-3 pt-3 border-t border-black/5 flex flex-col gap-1">
                                                        <span className="text-[9px] font-black uppercase tracking-widest opacity-40">Actual Attendance</span>
                                                        <span className="text-[10px] font-mono font-black text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg w-fit">
                                                            {s.checkIn ? new Date(s.checkIn).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) : '--:--'} - {s.checkOut ? new Date(s.checkOut).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }) : '--:--'}
                                                        </span>
                                                    </div>
                                                )}

                                                {s.note && (
                                                    <div className="mt-2 text-[10px] italic opacity-70 leading-relaxed font-medium">
                                                        "{s.note}"
                                                    </div>
                                                )}
                                            </div>
                                        )
                                    })
                                )}

                                <Button
                                    variant="outline"
                                    className="w-full h-11 rounded-xl border-dashed border-slate-200 dark:border-neutral-800 text-[10px] font-black uppercase tracking-widest gap-2 bg-transparent hover:bg-slate-50 dark:hover:bg-white/5"
                                    onClick={() => onCellClick?.(dateStr, uniqueShifts[0])}
                                >
                                    <Plus className="w-3 h-3" />
                                    Quick Add Shift
                                </Button>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
