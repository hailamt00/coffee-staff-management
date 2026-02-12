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
import { Button } from '@/shared/components/ui/button'
import { CheckCircle, XCircle, Loader2 } from 'lucide-react'
import { useSchedule } from '../hooks/useSchedule'

interface WeeklyRequestTableProps {
    date: string
    shifts: any[]
}

export function WeeklyRequestTable({ date, shifts }: WeeklyRequestTableProps) {
    const { useRequests, approveRequest } = useSchedule()

    // Calculate start (Monday) and end (Sunday) of the week
    const { weekDates } = useMemo(() => {
        const curr = new Date(date)
        const day = curr.getDay()
        const diff = curr.getDate() - day + (day === 0 ? -6 : 1) // adjust when day is sunday

        const monday = new Date(curr.setDate(diff))

        const dates = []
        for (let i = 0; i < 7; i++) {
            const d = new Date(monday)
            d.setDate(monday.getDate() + i)
            dates.push(d)
        }

        return {
            weekDates: dates
        }
    }, [date])

    const { data: requests = [], isLoading } = useRequests(date)

    const requestMap = useMemo(() => {
        const map = new Map<string, any[]>()
        if (!requests) return map

        requests.forEach(r => {
            // Key: "ShiftName-Date" e.g. "Ca Sáng-2023-10-23"
            const key = `${r.shiftName}-${r.workDate}`
            if (!map.has(key)) map.set(key, [])
            map.get(key)?.push(r)
        })
        return map
    }, [requests])

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
                                        const slotRequests = requestMap.get(key) || []

                                        return (
                                            <TableCell key={dateStr} className="p-2 align-top h-24 border-l border-slate-50 dark:border-neutral-800">
                                                <div className="flex flex-col gap-2">
                                                    {slotRequests.length === 0 ? (
                                                        <span className="text-[10px] text-slate-300 dark:text-neutral-700 text-center block pt-2">-</span>
                                                    ) : (
                                                        slotRequests.map(req => (
                                                            <div key={req.requestId} className="mb-1">
                                                                <Badge
                                                                    variant="outline"
                                                                    className={`w-full text-[10px] justify-between p-2 font-normal
                                                                        ${req.status === 'pending' ? 'bg-amber-50 border-amber-200' :
                                                                            req.status === 'approved' ? 'bg-emerald-50 border-emerald-200' : 'bg-red-50 border-red-200'}
                                                                    `}
                                                                >
                                                                    <div className="flex flex-col">
                                                                        <span className="font-bold">{req.employeeName}</span>
                                                                        <span className="opacity-70 dark:text-slate-400">{req.shiftName}</span>
                                                                    </div>

                                                                    {req.status === 'pending' && (
                                                                        <div className="flex flex-col gap-1 ml-2">
                                                                            <Button
                                                                                size="sm"
                                                                                variant="ghost"
                                                                                className="h-5 w-5 p-0 text-emerald-600 hover:bg-emerald-100"
                                                                                onClick={() => approveRequest({ requestId: req.requestId, isApproved: true })}
                                                                            >
                                                                                <CheckCircle className="h-3 w-3" />
                                                                            </Button>
                                                                            <Button
                                                                                size="sm"
                                                                                variant="ghost"
                                                                                className="h-5 w-5 p-0 text-red-600 hover:bg-red-100"
                                                                                onClick={() => approveRequest({ requestId: req.requestId, isApproved: false })}
                                                                            >
                                                                                <XCircle className="h-3 w-3" />
                                                                            </Button>
                                                                        </div>
                                                                    )}
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
