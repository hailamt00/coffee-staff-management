import { useMemo, useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/shared/components/ui/table'
import { Button } from '@/shared/components/ui/button'
import { XCircle, Loader2, Trash2 } from 'lucide-react'
import { useSchedule } from '../hooks/useSchedule'

interface WeeklyRequestTableProps {
    date: string
    shifts: any[]
    filterPosition?: string
}

export function WeeklyRequestTable({ date, shifts, filterPosition }: WeeklyRequestTableProps) {
    const [showHandled, setShowHandled] = useState(false)

    const { fromDate, toDate, weekDates } = useMemo(() => {
        const curr = new Date(date)
        const day = curr.getDay()
        const diff = curr.getDate() - day + (day === 0 ? -6 : 1)
        const monday = new Date(curr.setDate(diff))

        const dates = []
        for (let i = 0; i < 7; i++) {
            const d = new Date(monday)
            d.setDate(monday.getDate() + i)
            dates.push(d)
        }

        return {
            fromDate: monday.toISOString().slice(0, 10),
            toDate: dates[6].toISOString().slice(0, 10),
            weekDates: dates
        }
    }, [date])

    const { useWeeklyRequests, approveRequest, deleteRequest } = useSchedule()
    const weeklyRequestsQuery = useWeeklyRequests(fromDate, toDate)

    const { data: requests = [], isLoading } = weeklyRequestsQuery

    // Helper to get color based on position name
    const getPositionColor = (positionName: string) => {
        const name = positionName.toLowerCase()
        if (name.includes('phục vụ') || name.includes('server'))
            return 'bg-emerald-50/60 border-emerald-200 text-emerald-800'
        if (name.includes('pha chế') || name.includes('barista'))
            return 'bg-amber-50/60 border-amber-200 text-amber-800'
        if (name.includes('thu ngân') || name.includes('cashier'))
            return 'bg-blue-50/60 border-blue-200 text-blue-800'
        return 'bg-indigo-50/60 border-indigo-200 text-indigo-800'
    }

    // Sort positions helper
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

    const uniqueShifts = useMemo(() => {
        let filteredShifts = shifts
        if (filterPosition && filterPosition !== 'all') {
            filteredShifts = shifts.filter(s => s.positionName === filterPosition)
        }

        return Array.from(new Set(filteredShifts.map((s: any) => s.name)))
            .map(name => filteredShifts.find((s: any) => s.name === name))
            .filter((s): s is any => !!s)
            .sort((a, b) => a.startTime.localeCompare(b.startTime))
    }, [shifts, filterPosition])

    const requestMap = useMemo(() => {
        const map = new Map<string, any[]>()
        requests.forEach(r => {
            const key = `${r.shiftName}-${r.workDate}`

            // Only show handled if toggled
            if (!showHandled && r.status !== 'pending') return

            if (!map.has(key)) map.set(key, [])

            if (filterPosition && filterPosition !== 'all') {
                if (r.positionName === filterPosition) {
                    map.get(key)!.push(r)
                }
            } else {
                map.get(key)!.push(r)
            }
        })
        return map
    }, [requests, filterPosition, showHandled])

    if (isLoading) {
        return (
            <div className="flex items-center justify-center p-12 bg-white dark:bg-neutral-900 rounded-2xl border border-slate-200 dark:border-neutral-800">
                <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
            </div>
        )
    }

    return (
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-slate-200/60 dark:border-neutral-800/60 shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
                <Table className="min-w-[1000px] border-collapse">
                    <TableHeader>
                        <TableRow className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-200 dark:border-neutral-800">
                            <TableHead className="w-[180px] border-r border-slate-200 dark:border-neutral-800 py-6 px-4">
                                <div className="flex flex-col gap-2">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Request_Grp</span>
                                        <span className="text-sm font-black text-slate-900 dark:text-white uppercase tracking-tight">Timeline</span>
                                    </div>
                                    <div className="flex items-center gap-2 mt-1">
                                        <input
                                            type="checkbox"
                                            id="showHandled"
                                            checked={showHandled}
                                            onChange={(e) => setShowHandled(e.target.checked)}
                                            className="h-3 w-3 rounded border-slate-300"
                                        />
                                        <label htmlFor="showHandled" className="text-[9px] font-bold text-slate-500 uppercase tracking-tighter cursor-pointer whitespace-nowrap">
                                            Show Handled
                                        </label>
                                    </div>
                                </div>
                            </TableHead>
                            {weekDates.map((d) => (
                                <TableHead key={d.toISOString()} className="text-center min-w-[140px] border-r border-slate-200 dark:border-neutral-800 last:border-r-0 p-3">
                                    <div className="flex flex-col items-center gap-1">
                                        <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[11px]">
                                            {d.toLocaleDateString('en-US', { weekday: 'short' })}
                                        </span>
                                        <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                                            {d.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit' })}
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
                                    const slotRequests = requestMap.get(key) || []

                                    const groupedByPosition: Record<string, any[]> = {}
                                    slotRequests.forEach(r => {
                                        const pos = r.positionName || 'Unknown'
                                        if (!groupedByPosition[pos]) groupedByPosition[pos] = []
                                        groupedByPosition[pos].push(r)
                                    })

                                    const sortedPositions = Object.keys(groupedByPosition).sort(sortPositions)

                                    return (
                                        <TableCell key={dateStr} className="p-2 align-top h-32 border-r border-slate-200 dark:border-neutral-800 last:border-r-0 relative">
                                            <div className="flex flex-col gap-2 h-full">
                                                {slotRequests.length === 0 ? (
                                                    <div className="flex-1 flex items-center justify-center opacity-10">
                                                        <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-neutral-700"></div>
                                                    </div>
                                                ) : (
                                                    sortedPositions.map(posName => {
                                                        const reqs = groupedByPosition[posName]
                                                        const colorClass = getPositionColor(posName)
                                                        return (
                                                            <div key={posName} className={`rounded-md px-2 py-1.5 shadow-sm border mb-2 ${colorClass}`}>
                                                                <div className="flex flex-col gap-1">
                                                                    {reqs.map((req, idx) => (
                                                                        <div key={req.requestId} className="relative group/req">
                                                                            {idx > 0 && (
                                                                                <div className="h-px bg-slate-200 dark:bg-neutral-700 my-1 mx-auto w-[90%] opacity-50"></div>
                                                                            )}
                                                                            <div className="flex flex-col gap-1">
                                                                                <div className="flex justify-between items-start gap-1">
                                                                                    <div className="flex flex-col overflow-hidden">
                                                                                        <span className="text-xs font-bold leading-tight line-clamp-1">{req.employeeName}</span>
                                                                                        {req.note && (
                                                                                            <span className="text-[9px] italic opacity-70 line-clamp-2 mt-0.5" title={req.note}>
                                                                                                "{req.note}"
                                                                                            </span>
                                                                                        )}
                                                                                    </div>
                                                                                    <div className="flex flex-col items-end shrink-0">
                                                                                        <span className="text-[10px] font-medium opacity-60">
                                                                                            {req.startTime?.slice(0, 5) || req.shiftStartTime?.slice(0, 5)}
                                                                                        </span>
                                                                                        <Button
                                                                                            size="sm"
                                                                                            variant="ghost"
                                                                                            className="h-4 w-4 p-0 text-slate-400 hover:text-red-500 opacity-0 group-hover/req:opacity-100 transition-opacity"
                                                                                            onClick={() => deleteRequest(req.requestId)}
                                                                                        >
                                                                                            <Trash2 className="h-3 w-3" />
                                                                                        </Button>
                                                                                    </div>
                                                                                </div>

                                                                                {req.status === 'pending' ? (
                                                                                    <div className="flex items-center gap-1 mt-1">
                                                                                        <Button
                                                                                            size="sm"
                                                                                            variant="ghost"
                                                                                            className="h-6 w-full p-0 bg-white/50 hover:bg-emerald-200 text-emerald-700 rounded text-[10px] font-bold"
                                                                                            onClick={() => approveRequest({ requestId: req.requestId, isApproved: true })}
                                                                                        >
                                                                                            Accept
                                                                                        </Button>
                                                                                        <Button
                                                                                            size="sm"
                                                                                            variant="ghost"
                                                                                            className="h-6 w-8 p-0 bg-white/50 hover:bg-red-200 text-red-700 rounded"
                                                                                            onClick={() => approveRequest({ requestId: req.requestId, isApproved: false })}
                                                                                        >
                                                                                            <XCircle className="h-3 w-3" />
                                                                                        </Button>
                                                                                    </div>
                                                                                ) : (
                                                                                    <div className={`mt-1 text-[8px] font-black uppercase tracking-tighter text-center py-0.5 rounded ${req.status === 'approved' ? 'bg-emerald-200/50 text-emerald-800' : 'bg-red-200/50 text-red-800'}`}>
                                                                                        {req.status}
                                                                                    </div>
                                                                                )}
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
    )
}
