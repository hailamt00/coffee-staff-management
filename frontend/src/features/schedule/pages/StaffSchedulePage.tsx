import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/shared/components/ui/button'
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/shared/components/ui/table'
import { useSchedule } from '@/features/schedule/hooks/useSchedule'
import { usePosition } from '@/features/positions/hooks/usePosition'
import { Clock, Plus, CalendarDays, Info } from 'lucide-react'
import { formatDate } from '@/shared/utils/format'
import { useMemo } from 'react'

export default function StaffSchedulePage() {
    const navigate = useNavigate()
    const staffJson = localStorage.getItem('staffInfo')
    const staff = staffJson ? JSON.parse(staffJson) : null
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10))

    const {
        useWeeklySchedule,
        useMyRequests,
        createRequest,
        updateRequest,
        deleteRequest,
    } = useSchedule()
    const { positions } = usePosition()

    // Week Calculation
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
            toDate: new Date(new Date(monday).setDate(monday.getDate() + 6)).toISOString().slice(0, 10),
            weekDates: dates
        }
    }, [date])

    const { data: schedules = [] } = useWeeklySchedule(fromDate, toDate)
    const { data: requests = [] } = useMyRequests(staff?.id)

    useEffect(() => {
        if (!staff) {
            navigate('/staff/login')
        }
    }, [staff, navigate])

    // Filtered schedule map for THIS staff member (including requests)
    const myScheduleMap = useMemo(() => {
        const map = new Map<string, any>()

        // 1. Add official schedules
        schedules
            .filter(s => s.employeeCode === staff?.code || s.employeeName === staff?.name)
            .forEach(s => {
                const key = `${s.shiftName}-${s.workDate}`
                map.set(key, { ...s, type: 'official' })
            })

        // 2. Add requests (they might override or complement schedules)
        requests.forEach((r: any) => {
            const key = `${r.shiftName}-${r.workDate}`
            // Show only pending requests. 
            // Approved requests should match official schedules.
            // Rejected requests are hidden as requested.
            if (r.status.toLowerCase() === 'pending') {
                map.set(key, { ...r, id: r.requestId, type: 'request' })
            }
        })

        return map
    }, [schedules, requests, staff])

    const allPositions = useMemo(() => positions || [], [positions])

    const allShifts = useMemo(() => {
        return allPositions.flatMap(p => (p.shifts || []).map(s => ({ ...s, positionName: p.name, positionId: p.id })))
    }, [allPositions])

    /* ================= REQUEST DIALOG ================= */
    const [openRequest, setOpenRequest] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null)
    const [reqPositionId, setReqPositionId] = useState('')
    const [reqShiftId, setReqShiftId] = useState('')
    const [reqDate, setReqDate] = useState(date)
    const [reqNote, setReqNote] = useState('')

    const filteredShifts = useMemo(() => {
        if (!reqPositionId) return []
        return allShifts.filter(s => s.positionId === Number(reqPositionId))
    }, [reqPositionId, allShifts])

    const resetDialog = () => {
        setOpenRequest(false)
        setEditMode(false)
        setSelectedRequestId(null)
        setReqShiftId('')
        setReqPositionId('')
        setReqNote('')
    }

    const handleCreateRequest = async () => {
        if (!reqShiftId) return

        if (editMode && selectedRequestId) {
            await updateRequest({
                id: selectedRequestId,
                data: {
                    id: selectedRequestId,
                    shiftId: Number(reqShiftId),
                    workDate: reqDate,
                    note: reqNote
                }
            })
        } else {
            await createRequest({
                employeeId: staff.id,
                shiftId: Number(reqShiftId),
                workDate: reqDate,
                note: reqNote
            })
        }
        resetDialog()
    }

    const handleDeleteRequest = async () => {
        if (selectedRequestId) {
            await deleteRequest(selectedRequestId)
            resetDialog()
        }
    }

    const handleCellClick = (item: any, dateStr: string) => {
        setReqDate(dateStr)
        if (!item) {
            // Empty cell - create new request
            setEditMode(false)
            setOpenRequest(true)
        } else if (item.type === 'request') {
            // Pending/Rejected request - edit/delete
            setEditMode(true)
            setSelectedRequestId(item.requestId)
            setReqPositionId(String(allPositions.find(p => p.name === item.positionName)?.id || ''))
            setReqShiftId(String(allShifts.find(s => s.name === item.shiftName && s.positionName === item.positionName)?.id || ''))
            setReqNote(item.note || '')
            setOpenRequest(true)
        } else if (item.type === 'official') {
            // Approved schedule - Re-request (edit)
            setEditMode(false) // It's a new request but based on old one
            setReqPositionId(String(allPositions.find(p => p.name === item.positionName)?.id || ''))
            setReqShiftId(String(item.shiftId || allShifts.find(s => s.name === item.shiftName && s.positionName === item.positionName)?.id || ''))
            setReqNote(item.note || '')
            setOpenRequest(true)
        }
    }

    return (
        <div className="space-y-6 pb-20">
            <div className="flex items-center gap-2 px-2">
                <Button variant="ghost" size="sm" onClick={() => navigate('/staff/menu')} className="hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-lg h-10 px-4 font-bold uppercase tracking-widest text-[10px]">
                    &larr; Back
                </Button>
            </div>

            <div className="flex items-center justify-between px-2">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none uppercase">
                        My_Schedule
                    </h1>
                    <p className="mt-1 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        Roster_Management
                    </p>
                </div>

                <Dialog open={openRequest} onOpenChange={setOpenRequest}>
                    <DialogTrigger asChild>
                        <Button className="bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 size-12 rounded-xl p-0 flex items-center justify-center shadow-lg transition-transform hover:scale-105 active:scale-95 group">
                            <Plus className="h-6 w-6 transition-transform group-hover:rotate-90" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[400px] rounded-2xl border border-slate-200/60 dark:border-neutral-800/60 backdrop-blur-xl bg-white/90 dark:bg-neutral-900/90 shadow-2xl p-0 overflow-hidden">
                        <DialogHeader className="p-6 border-b border-slate-100 dark:border-neutral-800/50">
                            <DialogTitle className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight">
                                {editMode ? 'Edit_Request' : 'Request_Shift'}
                            </DialogTitle>
                        </DialogHeader>
                        <div className="p-6 space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="requestDate" className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date</Label>
                                <Input
                                    id="requestDate"
                                    type="date"
                                    value={reqDate}
                                    onChange={e => setReqDate(e.target.value)}
                                    className="h-11 rounded-xl border-slate-200/60 dark:border-neutral-800/60 bg-white/50 dark:bg-neutral-900/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="requestPosition" className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Position</Label>
                                <Select value={reqPositionId} onValueChange={setReqPositionId}>
                                    <SelectTrigger id="requestPosition" className="h-11 rounded-xl border-slate-200/60 dark:border-neutral-800/60 bg-white/50 dark:bg-neutral-900/50">
                                        <SelectValue placeholder="Select Position" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        {allPositions.map(p => (
                                            <SelectItem key={p.id} value={String(p.id)}>{p.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="requestShift" className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Shift</Label>
                                <Select value={reqShiftId} onValueChange={setReqShiftId} disabled={!reqPositionId}>
                                    <SelectTrigger id="requestShift" className="h-11 rounded-xl border-slate-200/60 dark:border-neutral-800/60 bg-white/50 dark:bg-neutral-900/50">
                                        <SelectValue placeholder={reqPositionId ? "Select Shift" : "Choose Position First"} />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl">
                                        {filteredShifts.map(s => (
                                            <SelectItem key={s.id} value={String(s.id)}>
                                                {s.name} ({s.startTime?.slice(0, 5)} - {s.endTime?.slice(0, 5)})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="requestNote" className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Note (Optional)</Label>
                                <Input
                                    id="requestNote"
                                    value={reqNote}
                                    onChange={e => setReqNote(e.target.value)}
                                    placeholder="Reason or special request..."
                                    className="h-11 rounded-xl border-slate-200/60 dark:border-neutral-800/60 bg-white/50 dark:bg-neutral-900/50"
                                />
                            </div>
                            <div className="flex gap-2 pt-2">
                                {editMode && (
                                    <Button
                                        onClick={handleDeleteRequest}
                                        variant="ghost"
                                        className="flex-1 h-12 rounded-xl border border-red-200/50 text-red-500 hover:bg-red-50 uppercase font-black text-[10px] tracking-widest"
                                    >
                                        Delete
                                    </Button>
                                )}
                                <Button
                                    onClick={handleCreateRequest}
                                    className="flex-[2] bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 h-12 rounded-xl uppercase font-black text-[10px] tracking-widest"
                                >
                                    {editMode ? 'Update_Request' : 'Submit_Request'}
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex items-center gap-3 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-md p-4 rounded-xl border border-slate-200/60 dark:border-neutral-800/60 shadow-sm mx-2 group hover:border-slate-300 dark:hover:border-neutral-700 transition-all">
                <CalendarDays className="h-4 w-4 text-slate-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                <Label htmlFor="mainScheduleDate" className="sr-only">Schedule Date</Label>
                <Input
                    id="mainScheduleDate"
                    type="date"
                    value={date}
                    onChange={e => setDate(e.target.value)}
                    className="border-none shadow-none focus-visible:ring-0 p-0 h-auto font-black text-[10px] uppercase tracking-widest bg-transparent cursor-pointer"
                />
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-auto">
                    Week View
                </span>
            </div>

            <div className="mx-2 overflow-hidden border border-slate-200/60 dark:border-neutral-800/60 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-sm rounded-2xl">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-slate-50/50 dark:bg-white/5 border-b border-slate-100 dark:border-neutral-800">
                                <TableHead className="w-[100px] text-[10px] font-black text-slate-400 uppercase tracking-widest p-4 text-center border-r border-slate-100 dark:border-neutral-800">Shift</TableHead>
                                {weekDates.map(d => (
                                    <TableHead key={d.toISOString()} className="text-center p-3 border-r border-slate-100 dark:border-neutral-800 last:border-r-0">
                                        <div className="flex flex-col items-center gap-0.5">
                                            <span className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">
                                                {d.toLocaleDateString('en-US', { weekday: 'short' })}
                                            </span>
                                            <span className="text-[9px] font-bold text-slate-400 uppercase">
                                                {d.toLocaleDateString('en-US', { day: '2-digit', month: '2-digit' })}
                                            </span>
                                        </div>
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from(new Set(allShifts.map(s => s.name))).map((shiftName, idx) => (
                                <TableRow key={shiftName} className={`hover:bg-slate-50/30 dark:hover:bg-white/5 transition-colors ${idx !== 2 ? 'border-b border-slate-50 dark:border-neutral-800/50' : ''}`}>
                                    <TableCell className="p-4 text-center font-black text-[10px] text-slate-500 uppercase tracking-widest border-r border-slate-100 dark:border-neutral-800 bg-slate-50/20 dark:bg-white/5">
                                        {shiftName}
                                    </TableCell>
                                    {weekDates.map(d => {
                                        const dateStr = d.toISOString().slice(0, 10)
                                        const key = `${shiftName}-${dateStr}`
                                        const item = myScheduleMap.get(key)

                                        // Status visualization
                                        let statusLabel = 'Empty'
                                        let statusStyles = 'opacity-10'
                                        let dotColor = 'bg-slate-300 dark:bg-neutral-600'

                                        if (item) {
                                            if (item.type === 'official') {
                                                statusLabel = 'Assigned'
                                                statusStyles = 'bg-slate-900 dark:bg-white text-white dark:text-black shadow-lg scale-100 opacity-100'
                                            } else if (item.status?.toLowerCase() === 'pending') {
                                                statusLabel = 'Pending'
                                                statusStyles = 'bg-white dark:bg-neutral-900 text-slate-900 dark:text-white border-2 border-dashed border-slate-200 dark:border-neutral-800 opacity-100'
                                            } else if (item.status?.toLowerCase() === 'rejected') {
                                                statusLabel = 'Rejected'
                                                statusStyles = 'bg-red-50 dark:bg-red-950/30 text-red-600 border border-red-100 dark:border-red-900/50 opacity-90'
                                            }
                                        }

                                        return (
                                            <TableCell
                                                key={d.toISOString()}
                                                className="p-2 h-20 border-r border-slate-100 dark:border-neutral-800 last:border-r-0 align-middle cursor-pointer hover:bg-slate-50/50 dark:hover:bg-white/5 transition-colors"
                                                onClick={() => handleCellClick(item, dateStr)}
                                            >
                                                {item ? (
                                                    <div className={`rounded-lg p-2 flex flex-col items-center justify-center gap-1 group relative animate-in fade-in zoom-in duration-200 ${statusStyles}`}>
                                                        <span className="text-[9px] font-black uppercase tracking-widest text-center">{statusLabel}</span>
                                                        <div className="flex items-center gap-1 text-[8px] font-bold opacity-70">
                                                            <Clock size={8} />
                                                            {(item.shiftStartTime || item.startTime)?.slice(0, 5)}
                                                        </div>
                                                        {(item.note) && (
                                                            <div className="absolute -top-1 -right-1">
                                                                <div className="bg-amber-500 w-2 h-2 rounded-full border border-white" title={item.note} />
                                                            </div>
                                                        )}
                                                    </div>
                                                ) : (
                                                    <div className="flex flex-col items-center justify-center h-full group">
                                                        <div className={`w-1.5 h-1.5 rounded-full ${dotColor} group-hover:scale-150 group-hover:bg-black dark:group-hover:bg-white transition-all`} />
                                                    </div>
                                                )}
                                            </TableCell>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>

            <div className="px-2 space-y-3">
                <div className="flex items-center gap-2 text-slate-400">
                    <Info size={14} />
                    <p className="text-[10px] font-bold uppercase tracking-widest">Schedule Policy</p>
                </div>
                <div className="bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-neutral-800 rounded-xl p-4">
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed font-medium capitalize">
                        this table shows your confirmed shifts for the current week. red dots on assigned cards indicate active shift notes from management.
                    </p>
                </div>
            </div>

            <div className="fixed bottom-6 left-4 right-4 bg-white/80 dark:bg-neutral-950/80 backdrop-blur-xl border border-slate-200/60 dark:border-neutral-800/60 p-5 rounded-2xl shadow-2xl flex items-center justify-between z-50">
                <div>
                    <p className="text-[10px] text-slate-400 uppercase font-black tracking-[0.2em] mb-0.5">Focus_Date</p>
                    <p className="text-slate-900 dark:text-white font-black tracking-tight leading-none text-lg uppercase">{formatDate(date)}</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="ghost" size="sm" className="h-10 px-4 rounded-lg bg-slate-50 dark:bg-white/5 text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-neutral-800 transition-all active:scale-95" onClick={() => {
                        const d = new Date(date)
                        d.setDate(d.getDate() - 1)
                        setDate(d.toISOString().slice(0, 10))
                    }}>Prev</Button>
                    <Button variant="ghost" size="sm" className="h-10 px-4 rounded-lg bg-slate-50 dark:bg-white/5 text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 dark:hover:bg-neutral-800 transition-all active:scale-95" onClick={() => {
                        const d = new Date(date)
                        d.setDate(d.getDate() + 1)
                        setDate(d.toISOString().slice(0, 10))
                    }}>Next</Button>
                </div>
            </div>
        </div>
    )
}
