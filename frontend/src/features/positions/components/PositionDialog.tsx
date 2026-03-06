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
import { useTranslation } from 'react-i18next'

const DEFAULT_SHIFTS: SaveShiftRequest[] = [
  { name: 'Shift 1', startTime: '06:00', endTime: '14:00', isEnabled: true },
  { name: 'Shift 2', startTime: '14:00', endTime: '22:00', isEnabled: true },
  { name: 'Shift 3', startTime: '22:00', endTime: '06:00', isEnabled: false },
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
  const { t } = useTranslation()

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
            {position ? t('positions.edit') : t('positions.add')}
          </DialogTitle>
          <DialogDescription>
            {t('positions.dialog.configure', 'Configure position and working shifts')}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="posName">{t('positions.table.name')}</Label>
            <Input
              id="posName"
              placeholder={t('positions.table.name')}
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>

          <ShiftEditor shifts={shifts} onChange={setShifts} />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            {t('common.cancel')}
          </Button>
          <Button onClick={submit}>
            {position ? t('common.update') : t('common.create')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
