import { useState, useEffect, useMemo } from 'react'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from '@/shared/components/ui/dialog'
import { Button } from '@/shared/components/ui/button'
import { Label } from '@/shared/components/ui/label'
import { Textarea } from '@/shared/components/ui/textarea'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shared/components/ui/select'
import { Loader2, Trash2 } from 'lucide-react'
import { format } from 'date-fns'
import type { Schedule, UpdateScheduleRequest } from '@/shared/types/api'
import { usePosition } from '../../positions/hooks/usePosition'

interface EditScheduleDialogProps {
    schedule: Schedule | null
    isOpen: boolean
    onClose: () => void
    onSave: (params: { id: number; data: UpdateScheduleRequest }) => Promise<void>
    onDelete: (id: number) => Promise<void>
}

export function EditScheduleDialog({
    schedule,
    isOpen,
    onClose,
    onSave,
    onDelete
}: EditScheduleDialogProps) {
    const { positions } = usePosition()

    const [selectedPositionId, setSelectedPositionId] = useState<string>('')
    const [shiftId, setShiftId] = useState<string>('')
    const [note, setNote] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    // Determine available shifts based on selected position
    const availableShifts = useMemo(() => {
        if (!selectedPositionId) return []
        const pos = positions.find(p => p.id.toString() === selectedPositionId)
        return pos?.shifts || []
    }, [selectedPositionId, positions])

    useEffect(() => {
        if (schedule && isOpen) {
            setShiftId(schedule.shiftId.toString())
            setNote(schedule.note || '')

            // Find the position that contains this shift
            // We search through all positions to find which one includes this shiftId
            // OR use schedule.positionName if available to find ID? 
            // Better to match by shiftId because positionName might be ambiguous or we want exact ID match.
            if (positions.length > 0) {
                const foundPos = positions.find(p => p.shifts?.some(s => s.id === schedule.shiftId))
                if (foundPos) {
                    setSelectedPositionId(foundPos.id.toString())
                } else {
                    // Fallback: try to match by name if possible or just leave empty
                    const foundByName = positions.find(p => p.name === schedule.positionName)
                    if (foundByName) setSelectedPositionId(foundByName.id.toString())
                }
            }
        }
    }, [schedule, isOpen, positions])

    const handleSave = async () => {
        if (!schedule) return
        setIsLoading(true)
        try {
            await onSave({
                id: schedule.id,
                data: {
                    shiftId: parseInt(shiftId),
                    workDate: schedule.workDate,
                    note: note
                }
            })
            onClose()
        } catch (error) {
            console.error(error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleDelete = async () => {
        if (!schedule) return
        if (!confirm('Are you sure you want to delete this schedule?')) return

        setIsDeleting(true)
        try {
            await onDelete(schedule.id)
            onClose()
        } catch (error) {
            console.error(error)
        } finally {
            setIsDeleting(false)
        }
    }

    if (!schedule) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Schedule</DialogTitle>
                    <DialogDescription>
                        Modify shift assignment or update notes for this schedule entry.
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right font-bold text-slate-500">Employee</Label>
                        <div className="col-span-3 font-semibold text-lg">
                            {schedule.employeeName}
                        </div>
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right font-bold text-slate-500">Date</Label>
                        <div className="col-span-3">
                            {format(new Date(schedule.workDate), 'EEEE, dd/MM/yyyy')}
                        </div>
                    </div>

                    {/* Position Selection */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right font-bold text-slate-500">Position</Label>
                        <Select value={selectedPositionId} onValueChange={(val) => {
                            setSelectedPositionId(val)
                            setShiftId('') // Reset shift when position changes
                        }}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder="Select position" />
                            </SelectTrigger>
                            <SelectContent>
                                {positions.map((p) => (
                                    <SelectItem key={p.id} value={p.id.toString()}>
                                        {p.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Shift Selection */}
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="shift" className="text-right font-bold text-slate-500">Shift</Label>
                        <Select value={shiftId} onValueChange={setShiftId} disabled={!selectedPositionId}>
                            <SelectTrigger className="col-span-3">
                                <SelectValue placeholder={selectedPositionId ? "Select shift" : "Select position first"} />
                            </SelectTrigger>
                            <SelectContent>
                                {availableShifts.map((s) => (
                                    <SelectItem key={s.id} value={s.id.toString()}>
                                        {s.name} ({s.startTime.slice(0, 5)} - {s.endTime.slice(0, 5)})
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="grid grid-cols-4 items-start gap-4">
                        <Label htmlFor="note" className="text-right font-bold text-slate-500 mt-2">Note</Label>
                        <Textarea
                            id="note"
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            className="col-span-3 min-h-[80px]"
                            placeholder="Add a note (optional)"
                        />
                    </div>
                </div>
                <DialogFooter className="flex justify-between sm:justify-between w-full">
                    <Button
                        variant="destructive"
                        size="icon"
                        onClick={handleDelete}
                        disabled={isDeleting || isLoading}
                        type="button"
                    >
                        {isDeleting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                    </Button>
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={onClose} disabled={isLoading}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave} disabled={isLoading || !shiftId}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Save Changes
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
