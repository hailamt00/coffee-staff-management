import { useState } from 'react'
import { usePosition } from '../hooks/usePosition'
import { PositionTable } from '../components/PositionTable'
import { PositionDialog } from '../components/PositionDialog'
import { Button } from '@/shared/ui/button'
import { Card } from '@/shared/ui/card'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from '@/shared/ui/alert-dialog'
import { Plus } from 'lucide-react'

export default function PositionPage() {
  const { positions, loading, createPosition, updatePosition, deletePosition } =
    usePosition()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [deleteTarget, setDeleteTarget] =
    useState<{ id: number; name: string } | null>(null)
  const editingPosition = positions.find(p => p.id === editingId)

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Positions</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Manage working positions and shifts
          </p>
        </div>

        <Button
          onClick={() => {
            setEditingId(null)
            setDialogOpen(true)
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Position
        </Button>
      </div>

      <Card className="p-6">
        {loading ? 'Loading...' : (
          <PositionTable
            data={positions}
            onEdit={id => {
              setEditingId(id)
              setDialogOpen(true)
            }}
            onDelete={(id, name) => setDeleteTarget({ id, name })}
          />
        )}
      </Card>

      <PositionDialog
        open={dialogOpen}
        position={editingPosition}
        onClose={() => setDialogOpen(false)}
        onCreate={createPosition}
        onUpdate={updatePosition}
      />

      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete position</AlertDialogTitle>
            <AlertDialogDescription>
              Delete <b>{deleteTarget?.name}</b>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => {
                deletePosition(deleteTarget!.id)
                setDeleteTarget(null)
              }}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
