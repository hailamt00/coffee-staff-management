import { useState, useEffect } from "react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/shared/components/ui/dialog"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shared/components/ui/select"
import { useEmployee } from "@/features/employees/hooks/useEmployee"
import { usePosition } from "@/features/positions/hooks/usePosition"
import { useTranslation } from 'react-i18next'

const formatTimeMask = (val: string) => {
    const raw = val.replace(/[^0-9]/g, '')
    if (raw.length >= 3) {
        return `${raw.slice(0, 2)}:${raw.slice(2, 4)}`
    }
    return raw
}

interface AttendanceFormModalProps {
    isOpen: boolean
    onClose: () => void
    onSave: (payload: any) => Promise<void>
    initialData?: any // Optional, present if editing
}

export function AttendanceFormModal({
    isOpen,
    onClose,
    onSave,
    initialData,
}: AttendanceFormModalProps) {
    const { employees } = useEmployee()
    const { positions } = usePosition()
    const { t } = useTranslation()
    const [loading, setLoading] = useState(false)

    // Form State
    const [employeeId, setEmployeeId] = useState("")
    const [positionId, setPositionId] = useState("")
    const [shiftId, setShiftId] = useState("")
    const [workDate, setWorkDate] = useState("")
    const [checkIn, setCheckIn] = useState("")
    const [checkOut, setCheckOut] = useState("")
    const [note, setNote] = useState("")

    useEffect(() => {
        if (isOpen) {
            if (initialData) {
                setEmployeeId(String(initialData.employeeId))

                // Find position based on the returned string name since ID isn't provided directly on DTO
                const matchedPos = positions.find(p => p.name === initialData.positionName)
                if (matchedPos && matchedPos.shifts) {
                    setPositionId(String(matchedPos.id))
                    const matchedShift = matchedPos.shifts.find(s => s.name === initialData.shiftName)
                    if (matchedShift) setShiftId(String(matchedShift.id))
                }

                setWorkDate(initialData.workDate ? initialData.workDate.slice(0, 10) : "")
                // Time extracting (CheckIn is full ISO, we just need HH:mm)
                setCheckIn(initialData.checkIn ? new Date(initialData.checkIn).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : "")
                setCheckOut(initialData.checkOut ? new Date(initialData.checkOut).toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : "")
                setNote(initialData.note || "")
            } else {
                setEmployeeId("")
                setPositionId("")
                setShiftId("")
                setWorkDate(new Date().toISOString().slice(0, 10))
                setCheckIn("")
                setCheckOut("")
                setNote("")
            }
        }
    }, [isOpen, initialData, positions])

    const handleSubmit = async () => {
        try {
            setLoading(true)

            const payload: any = {
                employeeId: parseInt(employeeId),
                shiftId: parseInt(shiftId),
                workDate: workDate,
                note: note || undefined,
            }

            // Convert HH:mm to full local ISO datetime string (without Z offset)
            if (checkIn && workDate) {
                payload.checkIn = `${workDate}T${checkIn}:00`
            }
            if (checkOut && workDate) {
                payload.checkOut = `${workDate}T${checkOut}:00`
            }

            if (initialData) {
                payload.attendanceId = initialData.id
            }

            await onSave(payload)
            onClose()
        } catch (e) {
            console.error(e)
        } finally {
            setLoading(false)
        }
    }

    const isEditMode = !!initialData

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{isEditMode ? t('attendance.form.editTitle') : t('attendance.form.addTitle')}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">

                    <div className="space-y-2">
                        <Label htmlFor="employeeForm">{t('employees.table.name')}</Label>
                        <Select value={employeeId} onValueChange={setEmployeeId}>
                            <SelectTrigger id="employeeForm">
                                <SelectValue placeholder={t('attendance.form.selectEmployee')} />
                            </SelectTrigger>
                            <SelectContent>
                                {employees.map(emp => (
                                    <SelectItem key={emp.id} value={String(emp.id)}>{emp.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="positionForm">{t('schedule.fields.position')}</Label>
                        <Select
                            value={positionId}
                            onValueChange={(val) => {
                                setPositionId(val)
                                setShiftId("") // Reset shift if position changes
                            }}
                        >
                            <SelectTrigger id="positionForm">
                                <SelectValue placeholder={t('schedule.dialog.selectPosition', 'Select Position')} />
                            </SelectTrigger>
                            <SelectContent>
                                {positions.map(pos => (
                                    <SelectItem key={pos.id} value={String(pos.id)}>{pos.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="shiftForm">{t('schedule.fields.shifts')}</Label>
                        <Select value={shiftId} onValueChange={setShiftId} disabled={!positionId}>
                            <SelectTrigger id="shiftForm">
                                <SelectValue placeholder={t('schedule.dialog.selectShift', 'Select Shift')} />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    positions
                                        .find(p => String(p.id) === positionId)?.shifts?.map(shift => (
                                            <SelectItem key={shift.id} value={String(shift.id)}>
                                                {shift.name} ({shift.startTime.slice(0, 5)} - {shift.endTime.slice(0, 5)})
                                            </SelectItem>
                                        )) || <div className="p-2 text-sm text-gray-500">{t('schedule.dialog.selectPositionFirst', 'Position not selected')}</div>
                                }
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="dateForm">{t('schedule.fields.date')}</Label>
                        <Input
                            id="dateForm"
                            type="date"
                            value={workDate}
                            onChange={e => setWorkDate(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="checkInForm">{t('attendance.table.checkIn')} (24h)</Label>
                            <Input
                                id="checkInForm"
                                type="text"
                                placeholder="00:00"
                                maxLength={5}
                                value={checkIn}
                                onChange={e => setCheckIn(formatTimeMask(e.target.value))}
                                className="font-mono"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="checkOutForm">{t('attendance.table.checkOut')} (24h)</Label>
                            <Input
                                id="checkOutForm"
                                type="text"
                                placeholder="00:00"
                                maxLength={5}
                                value={checkOut}
                                onChange={e => setCheckOut(formatTimeMask(e.target.value))}
                                className="font-mono"
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="noteForm">{t('schedule.fields.note')}</Label>
                        <Input
                            id="noteForm"
                            placeholder={t('schedule.fields.notePlaceholder')}
                            value={note}
                            onChange={e => setNote(e.target.value)}
                        />
                    </div>

                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={loading}>{t('common.cancel')}</Button>
                    <Button onClick={handleSubmit} disabled={loading || !employeeId || !shiftId || !workDate}>
                        {loading ? t('common.loading') : t('schedule.dialog.saveChanges', 'Save Changes')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
