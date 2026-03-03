import { useMemo, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Badge } from '@/shared/components/ui/badge'
import { DataTable } from '@/shared/components/ui/data-table'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { DeleteConfirmDialog } from '@/shared/components/ui/delete-confirm-dialog'
import { Pencil, Trash2 } from 'lucide-react'
import { ColumnDef } from '@tanstack/react-table'
import type { RewardPenalty, UpdateRewardPenaltyRequest } from '@/shared/types/api'
import { formatMoney, formatDate } from '@/shared/utils/format'

interface Props {
  data: RewardPenalty[]
  loading?: boolean
  onEdit: (id: number, payload: UpdateRewardPenaltyRequest) => Promise<void>
  onDelete: (id: number) => Promise<void>
}

export default function AdjustmentTable({ data, loading, onEdit, onDelete }: Props) {
  const [editingItem, setEditingItem] = useState<RewardPenalty | null>(null)
  const [amount, setAmount] = useState('0')
  const [reason, setReason] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const [deletingItem, setDeletingItem] = useState<RewardPenalty | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

  const openEditDialog = (item: RewardPenalty) => {
    setEditingItem(item)
    setAmount(String(item.amount ?? 0))
    setReason(item.reason ?? '')
  }

  const handleSaveEdit = async () => {
    if (!editingItem) return

    const parsedAmount = Number(amount)
    if (!Number.isFinite(parsedAmount) || parsedAmount < 0) {
      return
    }

    setIsSaving(true)
    try {
      await onEdit(editingItem.id, {
        amount: parsedAmount,
        reason: reason.trim() || undefined,
      })
      setEditingItem(null)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!deletingItem) return
    if (isDeleting) return

    setIsDeleting(true)
    try {
      await onDelete(deletingItem.id)
      setDeletingItem(null)
    } finally {
      setIsDeleting(false)
    }
  }

  const columns = useMemo<ColumnDef<RewardPenalty>[]>(() => [
    {
      accessorKey: 'createdAt',
      header: 'Date',
      cell: ({ row }) => (
        <span className="text-sm font-medium text-slate-700">
          {formatDate(String(row.getValue('createdAt') ?? ''))}
        </span>
      )
    },
    {
      accessorKey: 'employeeName',
      header: 'Employee',
      cell: ({ row }) => <div className="font-semibold text-slate-900 dark:text-slate-100">{row.getValue('employeeName')}</div>
    },
    {
      accessorKey: 'typeName',
      header: 'Type',
      cell: ({ row }) => {
        const isBonus = row.original.kind === 'Reward'
        return (
          <Badge
            variant={isBonus ? 'default' : 'destructive'}
            className={isBonus ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-red-500 hover:bg-red-600'}
          >
            {row.original.typeName}
          </Badge>
        )
      }
    },
    {
      accessorKey: 'amount',
      header: () => <div className="text-right">Amount (VND)</div>,
      cell: ({ row }) => {
        const rowAmount = Number(row.getValue('amount') ?? 0)
        const isBonus = row.original.kind === 'Reward'
        const isWarning = rowAmount === 0

        return (
          <div className={`text-right font-mono font-bold ${isWarning ? 'text-slate-400' : isBonus ? 'text-emerald-600' : 'text-red-600'}`}>
            {isWarning ? 'Warning' : `${isBonus ? '+' : '-'}${formatMoney(Math.abs(rowAmount))}`}
          </div>
        )
      }
    },
    {
      accessorKey: 'reason',
      header: 'Reason / Note',
      cell: ({ row }) => (
        <div className="text-xs text-muted-foreground whitespace-normal min-w-[150px]">
          {row.original.reason || '-'}
        </div>
      )
    },
    {
      id: 'actions',
      header: () => <div className="text-right">Actions</div>,
      cell: ({ row }) => (
        <div className="flex items-center justify-end gap-2">
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-slate-200"
            onClick={() => openEditDialog(row.original)}
          >
            <Pencil size={14} />
          </Button>
          <Button
            size="icon"
            variant="ghost"
            className="h-8 w-8 rounded-full bg-red-500 hover:bg-red-600 text-white"
            onClick={() => setDeletingItem(row.original)}
          >
            <Trash2 size={14} />
          </Button>
        </div>
      )
    }
  ], [])

  return (
    <>
      <Card className="border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm overflow-hidden">
        <CardHeader className="bg-slate-50/50 dark:bg-black/20 border-b border-slate-100 dark:border-neutral-800">
          <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Adjustment History
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <DataTable
            columns={columns}
            data={data}
            loading={loading}
            searchKey="employeeName"
          />
        </CardContent>
      </Card>

      <Dialog open={!!editingItem} onOpenChange={(open) => !open && setEditingItem(null)}>
        <DialogContent className="sm:max-w-[420px] rounded-[2rem] p-6 border-none shadow-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl font-black tracking-tighter text-slate-900 dark:text-white">Edit Adjustment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="adjustmentAmount" className="text-sm font-bold text-slate-500 uppercase tracking-widest">Amount (VND)</Label>
              <Input
                id="adjustmentAmount"
                type="number"
                min={0}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="h-12 border-slate-200 dark:border-neutral-800 rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="adjustmentReason" className="text-sm font-bold text-slate-500 uppercase tracking-widest">Reason / Note</Label>
              <Input
                id="adjustmentReason"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Enter note..."
                className="h-12 border-slate-200 dark:border-neutral-800 rounded-xl"
              />
            </div>
          </div>
          <DialogFooter className="flex sm:flex-row gap-2 pt-4">
            <Button variant="ghost" onClick={() => setEditingItem(null)} disabled={isSaving} className="flex-1 h-12 rounded-xl font-bold bg-slate-100 hover:bg-slate-200 dark:bg-neutral-800 dark:hover:bg-neutral-700">
              Cancel
            </Button>
            <Button onClick={handleSaveEdit} disabled={isSaving} className="flex-1 h-12 rounded-xl font-black uppercase tracking-widest text-[10px] bg-black hover:bg-slate-800 text-white">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DeleteConfirmDialog
        open={!!deletingItem}
        onOpenChange={(open) => !open && setDeletingItem(null)}
        title="Delete Adjustment"
        description={deletingItem ? `Are you sure you want to delete "${deletingItem.typeName}"?` : undefined}
        onConfirm={handleDelete}
      />
    </>
  )
}
