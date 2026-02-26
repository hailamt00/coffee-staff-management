import { useState, useMemo } from 'react'
import { useSchedule } from '../hooks/useSchedule'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from '@/shared/components/ui/dialog'
import { Label } from '@/shared/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shared/components/ui/select'
import { Plus } from 'lucide-react'
import { formatDate } from '@/shared/utils/format'
import { useEmployee } from '@/features/employees/hooks/useEmployee'
import { usePosition } from '@/features/positions/hooks/usePosition'
import { WeeklyScheduleTable } from '../components/WeeklyScheduleTable'
import { WeeklyRequestTable } from '../components/WeeklyRequestTable'

export default function SchedulePage() {
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
    const [activeTab, setActiveTab] = useState('weekly')
    const [filterPosition, setFilterPosition] = useState('all')

    const {
        addSchedule,
    } = useSchedule()
    const { employees } = useEmployee()
    const { positions } = usePosition()

    /* ================= ADD DIALOG ================= */
    const [openAdd, setOpenAdd] = useState(false)
    const [addEmployeeId, setAddEmployeeId] = useState('')
    const [addPositionId, setAddPositionId] = useState('')
    const [addSelectedShifts, setAddSelectedShifts] = useState<number[]>([])
    const [addDate, setAddDate] = useState(date)
    const [addNote, setAddNote] = useState('')

    const handleAdd = async () => {
        if (!addEmployeeId || addSelectedShifts.length === 0) return
        await addSchedule({
            employeeId: Number(addEmployeeId),
            shiftIds: addSelectedShifts,
            workDate: addDate,
            note: addNote,
        })
        setOpenAdd(false)
        setAddEmployeeId('')
        setAddPositionId('')
        setAddSelectedShifts([])
        setAddNote('')
    }

    const availableShifts = useMemo(() => {
        if (!addPositionId) return []
        const pos = positions.find(p => p.id === Number(addPositionId))
        return pos?.shifts || []
    }, [addPositionId, positions])

    const allWeeklyShifts = useMemo(() => {
        return positions.flatMap(p => (p.shifts || []).map(s => ({ ...s, positionName: p.name })))
    }, [positions])

    const handleQuickAdd = (clickedDate: string, shift: any) => {
        setAddDate(clickedDate)
        // Find position ID for this shift
        const pos = positions.find(p => p.name === shift.positionName)
        if (pos) {
            setAddPositionId(pos.id.toString())
            setAddSelectedShifts([shift.id])
        }
        setOpenAdd(true)
    }

    return (
        <div className="space-y-6">
            {/* HEADER */}
            <div className="flex flex-wrap items-end justify-between gap-4 px-2">
                <div className="flex items-end gap-12">
                    <div>
                        <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
                            Schedule
                        </h1>
                        <p className="mt-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            Shift_Operations
                        </p>
                    </div>

                    {/* Filter UI */}
                    <div className="flex items-center gap-3">
                        <Label htmlFor="positionFilter" className="text-[10px] font-black uppercase tracking-widest text-slate-400">Filter_By:</Label>
                        <Select value={filterPosition} onValueChange={setFilterPosition}>
                            <SelectTrigger id="positionFilter" className="w-[160px] h-9 bg-slate-50/50 border-slate-200 dark:bg-neutral-900/50 dark:border-neutral-800 text-xs font-bold">
                                <SelectValue placeholder="All Positions" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Positions</SelectItem>
                                {positions.map(p => (
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

            <div className="flex items-center justify-between">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="bg-slate-100/50 dark:bg-neutral-900/50 border h-10 p-1 rounded-lg">
                    <TabsList className="bg-transparent border-none">
                        <TabsTrigger value="weekly" className="h-8 px-4 data-[state=active]:bg-white data-[state=active]:text-black dark:data-[state=active]:bg-black dark:data-[state=active]:text-white">Weekly Schedule</TabsTrigger>
                        <TabsTrigger value="requests" className="h-8 px-4 data-[state=active]:bg-white data-[state=active]:text-black dark:data-[state=active]:bg-black dark:data-[state=active]:text-white">Requests</TabsTrigger>
                    </TabsList>
                </Tabs>

                <Dialog open={openAdd} onOpenChange={setOpenAdd}>
                    <DialogTrigger asChild>
                        <Button className="bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 border-none h-10 px-6 rounded-lg font-bold uppercase tracking-widest text-[10px]">
                            <Plus className="mr-2 h-4 w-4" />
                            Add
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-md">
                        <DialogHeader>
                            <DialogTitle>Add to Schedule</DialogTitle>
                            <DialogDescription>
                                Select employee, position, and shifts for the roster.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="addDate">Date</Label>
                                <Input
                                    id="addDate"
                                    type="date"
                                    value={addDate}
                                    onChange={e => setAddDate(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="addEmployee">Employee</Label>
                                <Select value={addEmployeeId} onValueChange={setAddEmployeeId}>
                                    <SelectTrigger id="addEmployee">
                                        <SelectValue placeholder="Select Employee" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {employees.map(e => (
                                            <SelectItem key={e.id} value={String(e.id)}>
                                                {e.name} ({e.code})
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="addPosition">Position</Label>
                                <Select value={addPositionId} onValueChange={setAddPositionId}>
                                    <SelectTrigger id="addPosition">
                                        <SelectValue placeholder="Select Position" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {positions.map(p => (
                                            <SelectItem key={p.id} value={String(p.id)}>
                                                {p.name}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {availableShifts.length > 0 && (
                                <div className="space-y-2">
                                    <div className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Shifts</div>
                                    <div className="grid grid-cols-1 gap-2 border rounded-lg p-3">
                                        {availableShifts.map(s => (
                                            <div key={s.id} className="flex items-center gap-2">
                                                <input
                                                    type="checkbox"
                                                    id={`shift-${s.id}`}
                                                    checked={addSelectedShifts.includes(s.id)}
                                                    onChange={e => {
                                                        if (e.target.checked) {
                                                            setAddSelectedShifts([...addSelectedShifts, s.id])
                                                        } else {
                                                            setAddSelectedShifts(addSelectedShifts.filter(id => id !== s.id))
                                                        }
                                                    }}
                                                    className="h-4 w-4 rounded border-gray-300 text-black focus:ring-black"
                                                />
                                                <Label htmlFor={`shift-${s.id}`} className="text-sm cursor-pointer">
                                                    {s.name} ({s.startTime?.slice(0, 5)} - {s.endTime?.slice(0, 5)})
                                                </Label>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="space-y-2">
                                <Label htmlFor="addNote">Note (Optional)</Label>
                                <Input
                                    id="addNote"
                                    value={addNote}
                                    onChange={e => setAddNote(e.target.value)}
                                    placeholder="Add a note..."
                                />
                            </div>

                            <Button onClick={handleAdd} className="w-full bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-slate-200 uppercase font-black text-[10px] tracking-[0.2em] py-6 rounded-xl">
                                Add to Schedule
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog >
            </div >


            <Tabs value={activeTab} className="w-full">
                {/* ===== TAB: WEEKLY ===== */}
                <TabsContent value="weekly" className="space-y-4">
                    <WeeklyScheduleTable
                        date={date}
                        shifts={allWeeklyShifts}
                        filterPosition={filterPosition}
                        onCellClick={handleQuickAdd}
                    />
                </TabsContent>

                {/* ===== TAB: REQUESTS ===== */}
                <TabsContent value="requests" className="space-y-4">
                    <WeeklyRequestTable
                        date={date}
                        shifts={allWeeklyShifts}
                        filterPosition={filterPosition}
                    />
                </TabsContent>
            </Tabs>
        </div >
    )
}
