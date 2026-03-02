import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { usePosition } from '../hooks/usePosition'
import { PositionTable } from '../components/PositionTable'
import { PositionDialog } from '../components/PositionDialog'
import { Button } from '@/shared/components/ui/button'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from '@/shared/components/ui/alert-dialog'
import { Plus, Briefcase, Clock, Settings2 } from 'lucide-react'
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
      className="space-y-6 pb-20"
    >
      {/* HEADER */}
      <div className="flex flex-col gap-6 px-1">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
              Positions
            </h1>
            <p className="mt-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden sm:block">
              Role & Shift_Blueprint
            </p>
          </div>

          <Button
            className="bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 border-none h-10 w-10 sm:w-auto sm:px-6 rounded-xl font-bold uppercase tracking-widest text-[10px]"
            onClick={() => {
              setEditingId(null)
              setDialogOpen(true)
            }}
          >
            <Plus className="sm:mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Add Position</span>
          </Button>
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
        <StatCard
          title="Positions"
          value={stats.totalPositions}
          description="Job roles"
          icon={Briefcase}
          iconColor="text-slate-900 dark:text-white"
        />
        <StatCard
          title="Total Shifts"
          value={stats.totalShifts}
          description="Active slots"
          icon={Clock}
          iconColor="text-blue-600 dark:text-blue-400"
        />
        <StatCard
          title="Status"
          value={stats.totalPositions > 0 ? "Active" : "Setup"}
          description="System config"
          icon={Settings2}
          iconColor="text-emerald-600 dark:text-emerald-400"
          className="col-span-2 lg:col-span-1"
        />
      </div>

      <div className="px-1">
        <div className="mb-4">
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">
            Position_Architecture
          </h2>
        </div>

        {loading ? (
          <div className="p-12 text-center rounded-3xl border border-dashed border-slate-200">
            <div className="inline-block h-8 w-8 border-4 border-slate-200 border-t-black rounded-full animate-spin mb-4" />
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Hydrating Positions...</p>
          </div>
        ) : (
          <PositionTable
            data={positions}
            onEdit={id => {
              setEditingId(id)
              setDialogOpen(true)
            }}
            onDelete={(id, name) => setDeleteTarget({ id, name })}
          />
        )}
      </div>

      <PositionDialog
        open={dialogOpen}
        position={editingPosition}
        onClose={() => setDialogOpen(false)}
        onCreate={createPosition}
        onUpdate={updatePosition}
      />

      <AlertDialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <AlertDialogContent className="max-w-md w-[95vw] rounded-[2rem] border-none shadow-2xl p-6">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-2xl font-black tracking-tighter text-red-600">Delete configuration</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500 font-medium py-4">
              Delete the <b>{deleteTarget?.name}</b> role? This will impact all assigned staff and historical logs.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex sm:flex-row gap-2">
            <Button variant="ghost" onClick={() => setDeleteTarget(null)} className="flex-1 h-12 rounded-xl font-bold">
              Cancel
            </Button>
            <Button
              variant="destructive"
              className="flex-1 h-12 rounded-xl font-black uppercase tracking-widest text-[10px]"
              onClick={() => {
                deletePosition(deleteTarget!.id)
                setDeleteTarget(null)
              }}
            >
              Confirm Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  )
}
