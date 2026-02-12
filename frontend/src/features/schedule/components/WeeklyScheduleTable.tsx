import { useMemo } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/shared/components/ui/table'
import { Card, CardContent } from '@/shared/components/ui/card'
import { Badge } from '@/shared/components/ui/badge'
import { useSchedule } from '../hooks/useSchedule'
import { Loader2 } from 'lucide-react'

interface WeeklyScheduleTableProps {
    date: string
    shifts: any[]
}

export function WeeklyScheduleTable({ date, shifts }: WeeklyScheduleTableProps) {
    const { useWeeklySchedule } = useSchedule()

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
        const map = new Map<string, any[]>()
        if (!schedules) return map

        schedules.forEach(s => {
            // Key: "ShiftName-Date" e.g. "Ca Sáng-2023-10-23"
            const key = `${s.shiftName}-${s.workDate}`
            if (!map.has(key)) map.set(key, [])
            map.get(key)?.push(s)
        })
        return map
    }, [schedules])

    if (isLoading) {
        return (
            <div className="flex h-48 items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
        )
    }

    // Unique shifts for rows
    // We use the passed `shifts` prop which contains all available shifts from positions
    // We'll group by shift name to avoid duplicates if multiple positions have same shift name
    const uniqueShifts = Array.from(new Set(shifts.map(s => s.name)))
        .map(name => shifts.find(s => s.name === name))
        .sort((a, b) => a.startTime.localeCompare(b.startTime))

    return (
        <Card className="border border-slate-200 dark:border-neutral-800 shadow-sm overflow-hidden">
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50/50 dark:bg-black/20 hover:bg-transparent">
                                <TableHead className="w-[150px] font-bold text-slate-900 dark:text-slate-100">Shift</TableHead>
                                {weekDates.map(d => (
                                    <TableHead key={d.toISOString()} className="text-center min-w-[140px]">
                                        <div className="font-bold text-slate-700 dark:text-slate-300">
                                            {d.toLocaleDateString('en-US', { weekday: 'short' })}
                                        </div>
                                        <div className="text-[10px] text-slate-400 font-medium">
                                            {d.toLocaleDateString('en-US', { month: '2-digit', day: '2-digit' })}
                                        </div>
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {uniqueShifts.map(shift => (
                                <TableRow key={shift.id} className="hover:bg-slate-50/50 dark:hover:bg-neutral-900/50">
                                    <TableCell className="font-bold text-slate-800 dark:text-slate-200 align-top">
                                        <div className="flex flex-col">
                                            <span>{shift.name}</span>
                                        </div>
                                    </TableCell>
                                    {weekDates.map(d => {
                                        const dateStr = d.toISOString().slice(0, 10)
                                        const key = `${shift.name}-${dateStr}`
                                        const daySchedules = scheduleMap.get(key) || []

                                        return (
                                            <TableCell key={dateStr} className="p-2 align-top h-24 border-l border-slate-50 dark:border-neutral-800">
                                                <div className="flex flex-col gap-2">
                                                    {daySchedules.length === 0 ? (
                                                        <span className="text-[10px] text-slate-300 dark:text-neutral-700 text-center block pt-2">-</span>
                                                    ) : (
                                                        daySchedules.map(schedule => (
                                                            <div key={schedule.id} className="mb-1">
                                                                <Badge
                                                                    variant="outline"
                                                                    className="w-full text-[10px] justify-between p-2 font-normal bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-100 dark:bg-indigo-900/30 dark:text-indigo-300 dark:border-indigo-800"
                                                                >
                                                                    <div className="flex flex-col">
                                                                        <span className="font-bold">{schedule.positionName}</span>
                                                                        <span className="opacity-70 text-[9px]">{schedule.employeeName}</span>
                                                                    </div>
                                                                </Badge>
                                                            </div>
                                                        ))
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
            </CardContent>
        </Card>
    )
}
