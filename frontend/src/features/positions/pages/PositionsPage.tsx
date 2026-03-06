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
import { SummaryCard } from '@/shared/components/ui/summary-card'
import { useTranslation } from 'react-i18next'

export default function PositionPage() {
  const { t } = useTranslation()
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
              {t('positions.title')}
            </h1>
            <p className="mt-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest hidden sm:block">
              {t('positions.subtitle')}
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
            <span className="hidden sm:inline">{t('positions.add')}</span>
          </Button>
        </div>
      </div>

      {/* STATS SECTION */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <SummaryCard
          title={t('positions.stats.title')}
          value={stats.totalPositions}
          description={t('positions.stats.roles')}
          icon={Briefcase}
          color="cyan"
        />
        <SummaryCard
          title={t('positions.stats.shifts')}
          value={stats.totalShifts}
          description={t('positions.stats.activeSlots')}
          icon={Clock}
          color="blue"
        />
        <SummaryCard
          title={t('positions.stats.status')}
          value={stats.totalPositions > 0 ? t('dashboard.active') : t('positions.stats.setup')}
          description={t('positions.stats.config')}
          icon={Settings2}
          color="green"
          className="col-span-2 lg:col-span-1"
        />
      </div>

      <div className="px-1">
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-slate-100 dark:border-neutral-800 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block h-8 w-8 border-4 border-slate-200 border-t-black rounded-full animate-spin mb-4" />
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">{t('positions.messages.loading')}</p>
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
            <AlertDialogTitle className="text-2xl font-black tracking-tighter text-red-600">{t('common.delete') || "Delete configuration"}</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500 font-medium py-4">
              {t('positions.deleteConfirm', { name: deleteTarget?.name }) || `Delete the ${deleteTarget?.name} role? This will impact all assigned staff and historical logs.`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex sm:flex-row gap-2">
            <Button variant="ghost" onClick={() => setDeleteTarget(null)} className="flex-1 h-12 rounded-xl font-bold">
              {t('common.cancel') || "Cancel"}
            </Button>
            <Button
              variant="destructive"
              className="flex-1 h-12 rounded-xl font-semibold text-[12px]"
              onClick={() => {
                deletePosition(deleteTarget!.id)
                setDeleteTarget(null)
              }}
            >
              {t('common.confirm') || "Confirm Delete"}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  )
}
