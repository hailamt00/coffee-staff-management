import { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/shared/ui/dialog'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Label } from '@/shared/ui/label'
import type { Position } from '@/shared/types/api'

interface Props {
  open: boolean
  onOpenChange: (v: boolean) => void
  onSubmit: (payload: { name: string }) => Promise<void>
  position?: Position | null
}

export function PositionFormDialog({
  open,
  onOpenChange,
  onSubmit,
  position,
}: Props) {
  const [name, setName] = useState('')
  const [loading, setLoading] = useState(false)
  const isEdit = !!position

  useEffect(() => {
    setName(position?.name ?? '')
  }, [position])

  const handleSubmit = async () => {
    if (!name.trim()) return
    setLoading(true)
    await onSubmit({ name: name.trim() })
    setLoading(false)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? 'Edit position' : 'Add new position'}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? 'Update position information'
              : 'Create a new employee position'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="space-y-2">
            <Label>Position name</Label>
            <Input
              autoFocus
              placeholder="Ex: Pha chế (PartTime)"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
          <Button
            disabled={!name.trim() || loading}
            onClick={handleSubmit}
          >
            {isEdit ? 'Save changes' : 'Create'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
