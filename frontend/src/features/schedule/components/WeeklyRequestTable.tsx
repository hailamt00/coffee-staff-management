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
import { useSelector } from 'react-redux'
import type { RootState } from '@/app/store'
import type { ScheduleRequest, Shift } from '@/shared/types/api'
import { useTranslation } from 'react-i18next'

interface WeeklyRequestTableProps {
    date: string
    shifts: Shift[]
    filterPosition?: string
}

export function WeeklyRequestTable({ date, shifts, filterPosition }: WeeklyRequestTableProps) {
    const [showHandled, setShowHandled] = useState(false)
    const adminId = useSelector((state: RootState) => state.auth.admin?.id)
    const { t } = useTranslation()

    const getShiftLabel = (name?: string | null) => {
        if (!name) return ''
        const n = name.toLowerCase()
        if (n.includes('sáng') || n.includes('sang')) return t('attendance.shifts.morning')
        if (n.includes('chiều') || n.includes('chieu')) return t('attendance.shifts.afternoon')
        if (n.includes('tối') || n.includes('toi')) return t('attendance.shifts.evening')
        return name
    }

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
        if (name.includes('server') || name.includes('phục vụ'))
            return 'bg-emerald-50/60 border-emerald-200 text-emerald-800'
        if (name.includes('barista') || name.includes('pha chế'))
            return 'bg-amber-50/60 border-amber-200 text-amber-800'
        if (name.includes('cashier') || name.includes('thu ngân'))
            return 'bg-blue-50/60 border-blue-200 text-blue-800'
        return 'bg-indigo-50/60 border-indigo-200 text-indigo-800'
    }

    // Sort positions helper
    const sortPositions = (posA: string, posB: string) => {
        const a = posA.toLowerCase()
        const b = posB.toLowerCase()
        const isServA = a.includes('server') || a.includes('waiter') || a.includes('phục vụ')
        const isServB = b.includes('server') || b.includes('waiter') || b.includes('phục vụ')
        if (isServA && !isServB) return -1
        if (!isServA && isServB) return 1
        const isBaristaA = a.includes('barista') || a.includes('pha chế')
        const isBaristaB = b.includes('barista') || b.includes('pha chế')
        if (isBaristaA && !isBaristaB) return -1
        if (!isBaristaA && isBaristaB) return 1
        return posA.localeCompare(posB)
    }

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

    const requestMap = useMemo(() => {
        const map = new Map<string, ScheduleRequest[]>()
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
        <div className="space-y-4">
            {/* Desktop View */}
            <div className="hidden md:block bg-white dark:bg-neutral-900 rounded-2xl border border-slate-200/60 dark:border-neutral-800/60 shadow-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <Table className="min-w-[1000px] border-collapse">
                        <TableHeader>
                            <TableRow className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-200 dark:border-neutral-800">
                                <TableHead className="w-[180px] border-r border-slate-200 dark:border-neutral-800 py-6 px-4">
                                    <div className="flex flex-col gap-2">
                                        <div className="flex flex-col gap-1">
                                            <span className="text-[11px] font-bold tracking-wide text-slate-400">{t('schedule.table.requestGroup')}</span>
                                            <span className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">{t('schedule.table.timeline')}</span>
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <input
                                                type="checkbox"
                                                id="showHandled"
                                                checked={showHandled}
                                                onChange={(e) => setShowHandled(e.target.checked)}
                                                className="h-3 w-3 rounded border-slate-300"
                                            />
                                            <label htmlFor="showHandled" className="text-[11px] font-bold text-slate-500 tracking-wide cursor-pointer whitespace-nowrap">
                                                {t('schedule.table.showHandled')}
                                            </label>
                                        </div>
                                    </div>
                                </TableHead>
                                {weekDates.map((d) => (
                                    <TableHead key={d.toISOString()} className="text-center min-w-[140px] border-r border-slate-200 dark:border-neutral-800 last:border-r-0 p-3">
                                        <div className="flex flex-col items-center gap-1">
                                            <span className="font-bold text-slate-700 dark:text-slate-300 capitalize tracking-wide text-sm">
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
                                            <span className="text-sm font-bold block">
                                                {getShiftLabel(shift.name)}
                                            </span>
                                        </div>
                                    </TableCell>

                                    {weekDates.map(d => {
                                        const dateStr = d.toISOString().slice(0, 10)
                                        const key = `${shift.name}-${dateStr}`
                                        const slotRequests = requestMap.get(key) || []

                                        const groupedByPosition: Record<string, ScheduleRequest[]> = {}
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
                                                                                                {req.startTime?.slice(0, 5)}
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
                                                                                                onClick={() =>
                                                                                                    approveRequest({
                                                                                                        requestId: req.requestId,
                                                                                                        isApproved: true,
                                                                                                        approvedBy: adminId,
                                                                                                    })
                                                                                                }
                                                                                            >
                                                                                                {t('schedule.table.accept')}
                                                                                            </Button>
                                                                                            <Button
                                                                                                size="sm"
                                                                                                variant="ghost"
                                                                                                className="h-6 w-8 p-0 bg-white/50 hover:bg-red-200 text-red-700 rounded"
                                                                                                onClick={() =>
                                                                                                    approveRequest({
                                                                                                        requestId: req.requestId,
                                                                                                        isApproved: false,
                                                                                                        approvedBy: adminId,
                                                                                                    })
                                                                                                }
                                                                                            >
                                                                                                <XCircle className="h-3 w-3" />
                                                                                            </Button>
                                                                                        </div>
                                                                                    ) : (
                                                                                        <div className={`mt-1 text-[10px] font-bold capitalize tracking-wide text-center py-0.5 rounded ${req.status === 'approved' ? 'bg-emerald-200/50 text-emerald-800' : 'bg-red-200/50 text-red-800'}`}>
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

            {/* Mobile View */}
            <div className="md:hidden space-y-4">
                <div className="flex items-center justify-between px-2 mb-2">
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="showHandledMob"
                            checked={showHandled}
                            onChange={(e) => setShowHandled(e.target.checked)}
                            className="h-4 w-4 rounded border-slate-300"
                        />
                        <label htmlFor="showHandledMob" className="text-xs font-bold text-slate-500 tracking-wide cursor-pointer">
                            {t('schedule.table.showHandled')}
                        </label>
                    </div>
                </div>

                {weekDates.map(d => {
                    const dateStr = d.toISOString().slice(0, 10)
                    const dayName = d.toLocaleDateString('en-US', { weekday: 'long' })
                    const displayDay = d.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit' })

                    // Get all requests for this day
                    const dayRequests: ScheduleRequest[] = []
                    uniqueShifts.forEach(shift => {
                        const key = `${shift.name}-${dateStr}`
                        const slotRequests = requestMap.get(key) || []
                        slotRequests.forEach(r => {
                            dayRequests.push(r)
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
                                {dayRequests.length === 0 ? (
                                    <div className="p-8 border border-dashed border-slate-200 dark:border-neutral-800 rounded-2xl flex flex-col items-center justify-center gap-2 text-slate-400">
                                        <span className="text-[10px] font-bold uppercase tracking-widest">{t('schedule.table.noRequests')}</span>
                                    </div>
                                ) : (
                                    dayRequests.map(r => {
                                        const colorClass = getPositionColor(r.positionName || '')
                                        return (
                                            <div
                                                key={r.requestId}
                                                className={`p-4 rounded-2xl border shadow-sm ${colorClass}`}
                                            >
                                                <div className="flex justify-between items-start">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="text-[10px] font-black uppercase tracking-wider opacity-60">{r.positionName}</span>
                                                        <span className="text-sm font-black tracking-tight">{r.employeeName}</span>
                                                    </div>
                                                    <div className="text-right flex flex-col items-end gap-1">
                                                        <span className="text-[10px] font-black bg-white/50 dark:bg-black/20 px-2 py-1 rounded-lg">
                                                            {getShiftLabel(r.shiftName)}
                                                        </span>
                                                        <span className="text-[10px] font-mono font-bold opacity-70 tabular-nums">
                                                            {r.startTime?.slice(0, 5)} - {r.endTime?.slice(0, 5)}
                                                        </span>
                                                    </div>
                                                </div>

                                                {r.note && (
                                                    <div className="mt-2 text-[10px] italic opacity-70 leading-relaxed font-medium">
                                                        "{r.note}"
                                                    </div>
                                                )}

                                                <div className="mt-4 pt-4 border-t border-black/5">
                                                    {r.status === 'pending' ? (
                                                        <div className="flex items-center gap-2">
                                                            <Button
                                                                className="flex-1 h-10 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-[10px] font-black uppercase tracking-widest"
                                                                onClick={() => approveRequest({
                                                                    requestId: r.requestId,
                                                                    isApproved: true,
                                                                    approvedBy: adminId,
                                                                })}
                                                            >
                                                                {t('schedule.table.approve')}
                                                            </Button>
                                                            <Button
                                                                variant="outline"
                                                                className="h-10 px-4 bg-white hover:bg-red-50 text-red-600 border-red-200 rounded-xl"
                                                                onClick={() => approveRequest({
                                                                    requestId: r.requestId,
                                                                    isApproved: false,
                                                                    approvedBy: adminId,
                                                                })}
                                                            >
                                                                <XCircle className="w-5 h-5" />
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-10 w-10 text-slate-400 hover:text-red-500 rounded-xl"
                                                                onClick={() => deleteRequest(r.requestId)}
                                                            >
                                                                <Trash2 className="w-4 h-4" />
                                                            </Button>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center justify-between">
                                                            <div className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${r.status === 'approved' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                                                {r.status}
                                                            </div>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="h-8 w-8 text-slate-400 hover:text-red-500 rounded-lg"
                                                                onClick={() => deleteRequest(r.requestId)}
                                                            >
                                                                <Trash2 className="w-3 h-3" />
                                                            </Button>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )
                                    })
                                )}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
