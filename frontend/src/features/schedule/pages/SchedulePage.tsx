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
import { Plus, Filter } from 'lucide-react'
import { formatDate } from '@/shared/utils/format'
import { useEmployee } from '@/features/employees/hooks/useEmployee'
import { usePosition } from '@/features/positions/hooks/usePosition'
import { WeeklyScheduleTable } from '../components/WeeklyScheduleTable'
import { WeeklyRequestTable } from '../components/WeeklyRequestTable'
import type { Shift } from '@/shared/types/api'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/shared/components/ui/sheet'
import { Badge } from '@/shared/components/ui/badge'
import { useTranslation } from 'react-i18next'

export default function SchedulePage() {
    const { t } = useTranslation()
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

    const handleQuickAdd = (clickedDate: string, shift: Shift) => {
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
        <div className="space-y-6 pb-20">
            {/* HEADER */}
            <div className="flex flex-col gap-6 px-1">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
                            {t('schedule.title')}
                        </h1>
                        <p className="mt-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            {t('schedule.subtitle')}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Mobile Filter Drawer */}
                        <div className="md:hidden">
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button variant="outline" size="icon" className="h-10 w-10 relative rounded-xl">
                                        <Filter className="h-4 w-4" />
                                        {filterPosition !== 'all' && (
                                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-black dark:bg-white rounded-full border-2 border-white dark:border-neutral-900" />
                                        )}
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="bottom" className="h-[300px] rounded-t-[2.5rem] border-none shadow-2xl">
                                    <SheetHeader className="mb-6">
                                        <SheetTitle className="text-left font-black tracking-tighter text-2xl px-2">{t('schedule.filters.title')}</SheetTitle>
                                    </SheetHeader>
                                    <div className="space-y-6 px-2">
                                        <div className="space-y-3">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('schedule.filters.position')}</Label>
                                            <div className="flex flex-wrap gap-2">
                                                <Badge
                                                    variant={filterPosition === 'all' ? 'default' : 'outline'}
                                                    className="px-5 py-2 cursor-pointer text-xs font-bold rounded-xl border-slate-200"
                                                    onClick={() => setFilterPosition('all')}
                                                >
                                                    {t('schedule.filters.all')}
                                                </Badge>
                                                {positions.map(p => (
                                                    <Badge
                                                        key={p.id}
                                                        variant={filterPosition === p.name ? 'default' : 'outline'}
                                                        className="px-5 py-2 cursor-pointer text-xs font-bold rounded-xl border-slate-200"
                                                        onClick={() => setFilterPosition(p.name)}
                                                    >
                                                        {p.name}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>

                        {/* Desktop Filter */}
                        <div className="hidden md:flex items-center gap-3">
                            <Label htmlFor="positionFilter" className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('schedule.filters.label')}</Label>
                            <Select value={filterPosition} onValueChange={setFilterPosition}>
                                <SelectTrigger id="positionFilter" className="w-[160px] h-10 bg-slate-50 border-slate-200 dark:bg-neutral-900 dark:border-neutral-800 text-xs font-bold rounded-xl">
                                    <SelectValue placeholder={t('schedule.filters.all')} />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">{t('schedule.filters.all')}</SelectItem>
                                    {positions.map(p => (
                                        <SelectItem key={p.id} value={p.name}>{p.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <Dialog open={openAdd} onOpenChange={setOpenAdd}>
                            <DialogTrigger asChild>
                                <Button className="bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 border-none h-10 w-10 sm:w-auto sm:px-6 rounded-xl font-bold uppercase tracking-widest text-[10px]">
                                    <Plus className="sm:mr-2 h-4 w-4" />
                                    <span className="hidden sm:inline">{t('schedule.add')}</span>
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-md w-[95vw] rounded-[2rem] border-none shadow-2xl p-6">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-black tracking-tighter">{t('schedule.dialog.title')}</DialogTitle>
                                    <DialogDescription className="text-slate-500 font-medium">
                                        {t('schedule.dialog.description')}
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="addDate" className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('schedule.fields.date')}</Label>
                                        <Input
                                            id="addDate"
                                            type="date"
                                            value={addDate}
                                            onChange={e => setAddDate(e.target.value)}
                                            className="h-12 rounded-xl border-slate-200 font-bold"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="addEmployee" className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('schedule.fields.employee')}</Label>
                                        <Select value={addEmployeeId} onValueChange={setAddEmployeeId}>
                                            <SelectTrigger id="addEmployee" className="h-12 rounded-xl border-slate-200 font-bold">
                                                <SelectValue placeholder={t('schedule.fields.employee')} />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-xl">
                                                {employees.map(e => (
                                                    <SelectItem key={e.id} value={String(e.id)}>
                                                        {e.name} ({e.code})
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="addPosition" className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('schedule.fields.position')}</Label>
                                        <Select value={addPositionId} onValueChange={setAddPositionId}>
                                            <SelectTrigger id="addPosition" className="h-12 rounded-xl border-slate-200 font-bold">
                                                <SelectValue placeholder={t('schedule.fields.position')} />
                                            </SelectTrigger>
                                            <SelectContent className="rounded-xl">
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
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('schedule.fields.shifts')}</Label>
                                            <div className="grid grid-cols-1 gap-2 border border-slate-100 rounded-2xl p-4 bg-slate-50/50">
                                                {availableShifts.map(s => (
                                                    <div key={s.id} className="flex items-center gap-3">
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
                                                            className="h-5 w-5 rounded-lg border-slate-300 text-black focus:ring-black accent-black"
                                                        />
                                                        <Label htmlFor={`shift-${s.id}`} className="text-sm font-bold cursor-pointer">
                                                            {s.name} <span className="text-[10px] opacity-50 ml-1">({s.startTime?.slice(0, 5)} - {s.endTime?.slice(0, 5)})</span>
                                                        </Label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    <div className="space-y-2">
                                        <Label htmlFor="addNote" className="text-[10px] font-black uppercase tracking-widest text-slate-400">{t('schedule.fields.note')}</Label>
                                        <Input
                                            id="addNote"
                                            value={addNote}
                                            onChange={e => setAddNote(e.target.value)}
                                            placeholder={t('schedule.fields.notePlaceholder')}
                                            className="h-12 rounded-xl border-slate-200 font-bold"
                                        />
                                    </div>

                                    <Button onClick={handleAdd} className="w-full bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-slate-200 uppercase font-black text-[10px] tracking-[0.2em] h-14 rounded-2xl mt-4">
                                        {t('schedule.dialog.confirm')}
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2 bg-slate-100 dark:bg-neutral-800 p-1.5 rounded-2xl w-full sm:w-auto">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 p-0 hover:bg-white dark:hover:bg-black rounded-xl shadow-none"
                            onClick={() => {
                                const d = new Date(date)
                                d.setDate(d.getDate() - 7)
                                setDate(d.toISOString().slice(0, 10))
                            }}
                        >
                            &lt;
                        </Button>
                        <div className="flex-1 sm:flex-none px-4 text-[11px] sm:text-[10px] font-black uppercase tracking-[0.2em] min-w-[160px] text-center">
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
                            size="icon"
                            className="h-10 w-10 p-0 hover:bg-white dark:hover:bg-black rounded-xl shadow-none"
                            onClick={() => {
                                const d = new Date(date)
                                d.setDate(d.getDate() + 7)
                                setDate(d.toISOString().slice(0, 10))
                            }}
                        >
                            &gt;
                        </Button>
                    </div>

                    <div className="hidden sm:block">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="bg-slate-100 dark:bg-neutral-800 p-1 rounded-2xl">
                            <TabsList className="bg-transparent border-none">
                                <TabsTrigger value="weekly" className="h-10 px-6 data-[state=active]:bg-white data-[state=active]:text-black dark:data-[state=active]:bg-black dark:data-[state=active]:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">{t('schedule.tabs.roster') || "Roster"}</TabsTrigger>
                                <TabsTrigger value="requests" className="h-10 px-6 data-[state=active]:bg-white data-[state=active]:text-black dark:data-[state=active]:bg-black dark:data-[state=active]:text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all">{t('schedule.tabs.requests') || "Requests"}</TabsTrigger>
                            </TabsList>
                        </Tabs>
                    </div>
                </div>

                <div className="sm:hidden">
                    <Tabs value={activeTab} onValueChange={setActiveTab} className="bg-slate-100/50 dark:bg-neutral-800/50 border border-slate-100 dark:border-neutral-800 p-1 rounded-[1.5rem] w-full">
                        <TabsList className="bg-transparent border-none w-full grid grid-cols-2 gap-1 h-12">
                            <TabsTrigger value="weekly" className="h-10 data-[state=active]:bg-white data-[state=active]:text-black dark:data-[state=active]:bg-black dark:data-[state=active]:text-white rounded-[1.25rem] text-[10px] font-black uppercase tracking-widest shadow-none">{t('schedule.tabs.roster')}</TabsTrigger>
                            <TabsTrigger value="requests" className="h-10 data-[state=active]:bg-white data-[state=active]:text-black dark:data-[state=active]:bg-black dark:data-[state=active]:text-white rounded-[1.25rem] text-[10px] font-black uppercase tracking-widest shadow-none">{t('schedule.tabs.requests')}</TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </div>

            <div className="mt-2">
                <Tabs value={activeTab} className="w-full">
                    <TabsContent value="weekly" className="space-y-4 focus-visible:outline-none">
                        <div className="px-1">
                            <WeeklyScheduleTable
                                date={date}
                                shifts={allWeeklyShifts}
                                filterPosition={filterPosition}
                                onCellClick={handleQuickAdd}
                            />
                        </div>
                    </TabsContent>

                    <TabsContent value="requests" className="space-y-4 focus-visible:outline-none">
                        <div className="px-1">
                            <WeeklyRequestTable
                                date={date}
                                shifts={allWeeklyShifts}
                                filterPosition={filterPosition}
                            />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}
