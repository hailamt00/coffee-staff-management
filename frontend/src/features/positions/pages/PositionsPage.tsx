import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { usePosition } from '../hooks/usePosition'
import { PositionTable } from '../components/PositionTable'
import { PositionDialog } from '../components/PositionDialog'
import { Button } from '@/shared/components/ui/button'
import { Card, CardContent } from '@/shared/components/ui/card'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from '@/shared/components/ui/alert-dialog'
import { Plus, Briefcase, Users, Clock } from 'lucide-react'
import { StatCard } from '@/shared/components/StatCard'

export default function PositionPage() {
  const { positions, loading, createPosition, updatePosition, deletePosition } =
    usePosition()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [deleteTarget, setDeleteTarget] =
    useState<{ id: number; name: string } | null>(null)
  const editingPosition = positions.find(p => p.id === editingId)

  // Calculate statistics
  const stats = useMemo(() => {
    const totalPositions = positions.length
    const totalShifts = positions.reduce((sum, p) => sum + (p.shifts?.length || 0), 0)

    return {
      totalPositions,
      totalShifts,
    }
  }, [positions])

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6"
    >
      {/* HEADER */}
      <div className="flex items-end justify-between px-2">
        <div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
            Positions
          </h1>
          <p className="mt-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            Role & Shift Configuration
          </p>
        </div>

        <Button
          className="bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 border-none h-10 px-6 rounded-lg font-bold uppercase tracking-widest text-[10px]"
          onClick={() => {
            setEditingId(null)
            setDialogOpen(true)
          }}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Position
        </Button>
      </div>

      {/* STATS SECTION */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <StatCard
          title="Total Positions"
          value={stats.totalPositions}
          description="Job roles defined"
          icon={Briefcase}
          iconColor="text-slate-900 dark:text-white"
        />
        <StatCard
          title="Total Shifts"
          value={stats.totalShifts}
          description="Across all positions"
          icon={Clock}
          iconColor="text-blue-600 dark:text-blue-400"
        />
        <StatCard
          title="Configuration"
          value={stats.totalPositions > 0 ? "Active" : "Empty"}
          description="System status"
          icon={Users}
          iconColor="text-green-600 dark:text-green-400"
          trend={stats.totalPositions > 0 ? 'up' : 'neutral'}
          trendValue={stats.totalPositions > 0 ? 'Configured' : 'Setup needed'}
        />
      </div>

      <Card className="border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
        <CardContent className="p-6">
          <h2 className="mb-4 text-sm font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
            Position Details
          </h2>
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
        </CardContent>
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
    </motion.div>
  )
}
