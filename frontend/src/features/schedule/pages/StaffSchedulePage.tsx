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
import { Checkbox } from '@/shared/components/ui/checkbox'
import { useSchedule } from '@/features/schedule/hooks/useSchedule'
import { usePosition } from '@/features/positions/hooks/usePosition'
import { Clock, Plus, Info } from 'lucide-react'
import { formatDate } from '@/shared/utils/format'
import { useMemo } from 'react'
import { DeleteConfirmDialog } from '@/shared/components/ui/delete-confirm-dialog'

export default function StaffSchedulePage() {
    const navigate = useNavigate()
    const staffJson = localStorage.getItem('staffInfo')
    const staff = staffJson ? JSON.parse(staffJson) : null
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
    const [filterPosition, setFilterPosition] = useState('all')

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
        let filtered = allPositions
        if (filterPosition !== 'all') {
            filtered = allPositions.filter(p => p.name === filterPosition)
        }
        return filtered.flatMap(p => (p.shifts || []).map(s => ({ ...s, positionName: p.name, positionId: p.id })))
    }, [allPositions, filterPosition])

    /* ================= REQUEST DIALOG ================= */
    const [openRequest, setOpenRequest] = useState(false)
    const [editMode, setEditMode] = useState(false)
    const [selectedRequestId, setSelectedRequestId] = useState<number | null>(null)
    const [reqPositionId, setReqPositionId] = useState('')
    const [selectedCells, setSelectedCells] = useState<string[]>([])
    const [reqNote, setReqNote] = useState('')
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

    const filteredShifts = useMemo(() => {
        if (!reqPositionId) return []
        return allShifts.filter(s => s.positionId === Number(reqPositionId))
    }, [reqPositionId, allShifts])

    const resetDialog = () => {
        setOpenRequest(false)
        setEditMode(false)
        setSelectedRequestId(null)
        setReqPositionId('')
        setSelectedCells([])
        setReqNote('')
        setIsDeleteDialogOpen(false)
    }

    const handleCreateRequest = async () => {
        if (selectedCells.length === 0) return

        if (editMode && selectedRequestId) {
            const [shiftId, dateStr] = selectedCells[0].split('|')
            await updateRequest({
                id: selectedRequestId,
                data: {
                    id: selectedRequestId,
                    shiftId: Number(shiftId),
                    workDate: dateStr,
                    note: reqNote
                }
            })
        } else {
            // Process sequentially for safety
            for (const cell of selectedCells) {
                const [shiftId, dateStr] = cell.split('|')
                await createRequest({
                    employeeId: staff.id,
                    shiftId: Number(shiftId),
                    workDate: dateStr,
                    note: reqNote
                })
            }
        }
        resetDialog()
    }

    const handleDeleteRequest = async () => {
        if (selectedRequestId) {
            await deleteRequest(selectedRequestId)
            setIsDeleteDialogOpen(false)
            resetDialog()
        }
    }

    const handleCellClick = (item: any, dateStr: string) => {
        if (!item) {
            // Empty cell - create new request
            setEditMode(false)
            setReqPositionId('')
            setSelectedCells([])
            setReqNote('')
            setOpenRequest(true)
        } else if (item.type === 'request') {
            // Pending/Rejected request - edit/delete
            setEditMode(true)
            setSelectedRequestId(item.requestId)
            setReqPositionId(String(allPositions.find(p => p.name === item.positionName)?.id || ''))
            const shiftId = String(allShifts.find(s => s.name === item.shiftName && s.positionName === item.positionName)?.id || '')
            setSelectedCells([`${shiftId}|${dateStr}`])
            setReqNote(item.note || '')
            setOpenRequest(true)
        } else if (item.type === 'official') {
            // Approved schedule - Re-request (edit)
            setEditMode(false)
            setReqPositionId(String(allPositions.find(p => p.name === item.positionName)?.id || ''))
            const shiftId = String(item.shiftId || allShifts.find(s => s.name === item.shiftName && s.positionName === item.positionName)?.id || '')
            setSelectedCells([`${shiftId}|${dateStr}`])
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
                <div className="flex flex-wrap items-end gap-12">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
                            My Schedule
                        </h1>
                        <p className="mt-1 text-[11px] font-bold text-slate-500 tracking-wide">
                            Roster Management
                        </p>
                    </div>

                    {/* Filter UI */}
                    <div className="flex items-center gap-3">
                        <Label htmlFor="positionFilter" className="text-[11px] font-bold tracking-wide text-slate-400">Filter By:</Label>
                        <Select value={filterPosition} onValueChange={setFilterPosition}>
                            <SelectTrigger id="positionFilter" className="w-[180px] h-9 bg-slate-50 border-slate-200 dark:bg-neutral-800 dark:border-neutral-700 text-xs font-bold">
                                <SelectValue placeholder="All Positions" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Positions</SelectItem>
                                {allPositions.map(p => (
                                    <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-neutral-800 p-1 rounded-lg">
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => {
                                const d = new Date(date)
                                d.setDate(d.getDate() - 7)
                                setDate(d.toISOString().slice(0, 10))
                            }}
                        >
                            &lt;
                        </Button>
                        <div className="px-2 text-sm font-bold min-w-[140px] text-center">
                            {(() => {
                                const curr = new Date(date)
                                const day = curr.getDay()
                                const diff = curr.getDate() - day + (day === 0 ? -6 : 1)
                                const monday = new Date(curr.setDate(diff))
                                const sunday = new Date(curr.setDate(diff + 6))
                                return `${formatDate(monday.toISOString().slice(0, 10))} - ${formatDate(sunday.toISOString().slice(0, 10))}`
                            })()}
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => {
                                const d = new Date(date)
                                d.setDate(d.getDate() + 7)
                                setDate(d.toISOString().slice(0, 10))
                            }}
                        >
                            &gt;
                        </Button>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-end px-2">
                <Dialog open={openRequest} onOpenChange={setOpenRequest}>
                    <DialogTrigger asChild>
                        <Button className="bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 border-none h-10 px-6 rounded-lg font-bold tracking-wide text-sm">
                            <Plus className="mr-2 h-4 w-4" />
                            Request Shift
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-[400px] rounded-2xl border border-slate-200/60 dark:border-neutral-800/60 backdrop-blur-xl bg-white/90 dark:bg-neutral-900/90 shadow-2xl p-0 overflow-hidden">
                        <DialogHeader className="p-6 border-b border-slate-100 dark:border-neutral-800/50">
                            <DialogTitle className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                                {editMode ? 'Edit Request' : 'Request Shift'}
                            </DialogTitle>
                        </DialogHeader>
                        <div className="p-6 space-y-4 max-h-[85vh] overflow-y-auto custom-scrollbar">
                            <div className="space-y-2">
                                <Label htmlFor="requestPosition" className="text-[11px] font-bold text-slate-500 tracking-wide">Position</Label>
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

                            <div className="space-y-2 pt-2">
                                <div className="text-[11px] font-bold text-slate-500 tracking-wide">Select Shifts {editMode && '(Edit limits to single selection)'}</div>
                                {reqPositionId ? (
                                    <div className="border border-slate-200 dark:border-neutral-800 rounded-xl overflow-hidden overflow-x-auto shadow-sm">
                                        <Table>
                                            <TableHeader className="bg-slate-50 dark:bg-white/5 border-b border-slate-100 dark:border-neutral-800">
                                                <TableRow>
                                                    <TableHead className="text-[10px] w-[90px] p-3 text-center border-r border-slate-100 dark:border-neutral-800 text-slate-400 font-bold uppercase tracking-widest">Shift / Day</TableHead>
                                                    {weekDates.map(d => (
                                                        <TableHead key={d.toISOString()} className="text-[10px] text-center p-2 border-r border-slate-100 dark:border-neutral-800 last:border-r-0">
                                                            <div className="font-bold text-slate-800 dark:text-slate-200">{d.toLocaleDateString('vi-VN', { weekday: 'short' })}</div>
                                                            <div className="text-slate-400 font-medium">{d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}</div>
                                                        </TableHead>
                                                    ))}
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {filteredShifts.map((s, idx) => (
                                                    <TableRow key={s.id} className={idx !== filteredShifts.length - 1 ? "border-b border-slate-50 dark:border-neutral-800/50" : ""}>
                                                        <TableCell className="text-[10px] font-black text-slate-700 dark:text-slate-300 p-3 text-center border-r border-slate-100 dark:border-neutral-800 bg-slate-50/30 dark:bg-white/5">
                                                            {s.name}
                                                        </TableCell>
                                                        {weekDates.map(d => {
                                                            const dateStr = d.toISOString().slice(0, 10)
                                                            const key = `${s.id}|${dateStr}`
                                                            const isSelected = selectedCells.includes(key)

                                                            const existing = myScheduleMap.get(`${s.name}-${dateStr}`)
                                                            const isAssigned = existing?.type === 'official'
                                                            const isPending = existing?.type === 'request' && existing.status.toLowerCase() === 'pending'

                                                            // For edit mode, we can only update the single request we clicked. For create mode, disable assigned/pending slots.
                                                            const isDisabled = (editMode && !isSelected) || (!editMode && (isAssigned || isPending))

                                                            return (
                                                                <TableCell key={dateStr} className={`text-center p-2 border-r border-slate-100 dark:border-neutral-800 last:border-r-0 ${isSelected ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}>
                                                                    {isAssigned ? (
                                                                        <div className="w-4 h-4 rounded-full bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center mx-auto" title="Already officially assigned">
                                                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                                                                        </div>
                                                                    ) : (isPending && !isSelected) ? (
                                                                        <div className="w-4 h-4 rounded-full bg-slate-100 dark:bg-neutral-800 border-2 border-dashed border-slate-300 dark:border-neutral-600 flex items-center justify-center mx-auto" title="Pending request" />
                                                                    ) : (
                                                                        <div className="flex justify-center">
                                                                            <Checkbox
                                                                                checked={isSelected}
                                                                                onCheckedChange={(checked) => {
                                                                                    if (editMode) {
                                                                                        if (checked) setSelectedCells([key]) // Toggle radio-like behavior
                                                                                        else setSelectedCells([]) // Allow unselecting, technically they should select *something* if submitting
                                                                                    } else {
                                                                                        if (checked) setSelectedCells(prev => [...prev, key])
                                                                                        else setSelectedCells(prev => prev.filter(k => k !== key))
                                                                                    }
                                                                                }}
                                                                                disabled={isDisabled}
                                                                                className={`w-5 h-5 ${editMode ? 'rounded-full' : 'rounded-md shadow-sm'}`}
                                                                            />
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
                                ) : (
                                    <div className="text-center p-8 border border-dashed border-slate-200 dark:border-neutral-800 rounded-xl text-slate-400 text-[11px] font-bold uppercase tracking-widest bg-slate-50/50 dark:bg-white/5">
                                        Please select a position first
                                    </div>
                                )}
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="requestNote" className="text-[11px] font-bold text-slate-500 tracking-wide">Note (Optional)</Label>
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
                                    <>
                                        <DeleteConfirmDialog
                                            open={isDeleteDialogOpen}
                                            onOpenChange={setIsDeleteDialogOpen}
                                            onConfirm={handleDeleteRequest}
                                            title="Delete Shift Request"
                                            description="Are you sure you want to delete this shift request? This action cannot be undone."
                                        />
                                        <Button
                                            onClick={(e) => { e.preventDefault(); setIsDeleteDialogOpen(true); }}
                                            variant="ghost"
                                            className="flex-1 h-12 rounded-xl border border-red-200/50 text-red-500 hover:bg-red-50 font-bold text-xs tracking-wide w-full"
                                        >
                                            Delete
                                        </Button>
                                    </>
                                )}
                                <Button
                                    onClick={handleCreateRequest}
                                    disabled={selectedCells.length === 0}
                                    className="flex-[2] bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 h-12 rounded-xl font-bold text-xs tracking-wide"
                                >
                                    {editMode ? 'Update Request' : `Submit Request (${selectedCells.length})`}
                                </Button>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
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
                                                {d.toLocaleDateString('vi-VN', { weekday: 'short' })}
                                            </span>
                                            <span className="text-[9px] font-bold text-slate-400 uppercase">
                                                {d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}
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
                                        const dotColor = 'bg-slate-300 dark:bg-neutral-600'

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

            {/* Bottom floating nav removed in favor of top unified nav */}
        </div>
    )
}
