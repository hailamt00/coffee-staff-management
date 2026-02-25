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
                    <DialogTitle>{isEditMode ? "Sửa Điểm Danh" : "Thêm mới Điểm Danh"}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">

                    <div className="space-y-2">
                        <Label>Nhân viên</Label>
                        <Select value={employeeId} onValueChange={setEmployeeId} disabled={isEditMode}>
                            <SelectTrigger>
                                <SelectValue placeholder="Chọn nhân viên" />
                            </SelectTrigger>
                            <SelectContent>
                                {employees.map(emp => (
                                    <SelectItem key={emp.id} value={String(emp.id)}>{emp.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Chức vụ (Vị trí)</Label>
                        <Select
                            value={positionId}
                            onValueChange={(val) => {
                                setPositionId(val)
                                setShiftId("") // Reset shift if position changes
                            }}
                            disabled={isEditMode}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Chọn chức vụ" />
                            </SelectTrigger>
                            <SelectContent>
                                {positions.map(pos => (
                                    <SelectItem key={pos.id} value={String(pos.id)}>{pos.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Ca làm việc (Mặc định)</Label>
                        <Select value={shiftId} onValueChange={setShiftId} disabled={isEditMode || !positionId}>
                            <SelectTrigger>
                                <SelectValue placeholder="Chọn ca làm" />
                            </SelectTrigger>
                            <SelectContent>
                                {
                                    positions
                                        .find(p => String(p.id) === positionId)?.shifts?.map(shift => (
                                            <SelectItem key={shift.id} value={String(shift.id)}>
                                                {shift.name} ({shift.startTime.slice(0, 5)} - {shift.endTime.slice(0, 5)})
                                            </SelectItem>
                                        )) || <div className="p-2 text-sm text-gray-500">Chưa chọn chức vụ</div>
                                }
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Ngày làm việc</Label>
                        <Input
                            type="date"
                            value={workDate}
                            onChange={e => setWorkDate(e.target.value)}
                            disabled={isEditMode}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Giờ Bắt đầu (Check-in)</Label>
                            <Input type="time" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
                        </div>
                        <div className="space-y-2">
                            <Label>Giờ Kết thúc (Check-out)</Label>
                            <Input type="time" value={checkOut} onChange={e => setCheckOut(e.target.value)} />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Ghi chú</Label>
                        <Input
                            placeholder="Nhập ghi chú..."
                            value={note}
                            onChange={e => setNote(e.target.value)}
                        />
                    </div>

                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={onClose} disabled={loading}>Hủy</Button>
                    <Button onClick={handleSubmit} disabled={loading || !employeeId || !shiftId || !workDate}>
                        {loading ? "Đang xử lý..." : "Lưu thay đổi"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
