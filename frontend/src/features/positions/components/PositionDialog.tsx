import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/shared/components/ui/dialog'
import { Input } from '@/shared/components/ui/input'
import { Button } from '@/shared/components/ui/button'
import { Label } from '@/shared/components/ui/label'
import { ShiftEditor } from './ShiftEditor'
import type {
  CreatePositionRequest,
  UpdatePositionRequest,
  SaveShiftRequest,
  Position,
} from '@/shared/types/api'
import { DialogDescription } from '@radix-ui/react-dialog'

const DEFAULT_SHIFTS: SaveShiftRequest[] = [
  { name: 'Morning Shift', startTime: '06:00', endTime: '12:00', isEnabled: true },
  { name: 'Afternoon Shift', startTime: '12:00', endTime: '18:00', isEnabled: true },
  { name: 'Evening Shift', startTime: '18:00', endTime: '22:00', isEnabled: true },
]

export function PositionDialog({
  open,
  position,
  onClose,
  onCreate,
  onUpdate,
}: {
  open: boolean
  position?: Position | null
  onClose: () => void
  onCreate: (p: CreatePositionRequest) => void
  onUpdate: (id: number, p: UpdatePositionRequest) => void
}) {
  const [name, setName] = useState('')
  const [shifts, setShifts] = useState<SaveShiftRequest[]>(DEFAULT_SHIFTS)

  useEffect(() => {
    if (!open) return

    if (!position) {
      setName('')
      setShifts(DEFAULT_SHIFTS)
      return
    }

    setName(position.name)
    setShifts(
      (position.shifts ?? []).map(s => ({
        id: s.id,
        name: s.name,
        startTime: s.startTime,
        endTime: s.endTime,
        isEnabled: s.isEnabled,
      }))
    )
  }, [open, position])

  const submit = () => {
    if (!name.trim()) return

    const payload = {
      name: name.trim(),
      shifts,
    }

    if (position) {
      onUpdate(position.id, payload)
    } else {
      onCreate(payload)
    }

    onClose()
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {position ? 'Edit Position' : 'Add Position'}
          </DialogTitle>
          <DialogDescription>
            Configure position, hourly rate and working shifts
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="posName">Position Name</Label>
            <Input
              id="posName"
              placeholder="Position name"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <ShiftEditor shifts={shifts} onChange={setShifts} />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={submit}>
            {position ? 'Update' : 'Create'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
