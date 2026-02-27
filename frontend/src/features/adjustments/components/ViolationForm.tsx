import { useMemo, useState } from 'react'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { Card, CardContent } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select'
import { Label } from '@/shared/components/ui/label'
import { Input } from '@/shared/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/shared/components/ui/dialog'
import { DeleteConfirmDialog } from '@/shared/components/ui/delete-confirm-dialog'
import { useEmployee } from '@/features/employees/hooks/useEmployee'
import { useAdjustment } from '../hooks/useAdjustment'
import { formatMoney } from '@/shared/utils/format'
import type { RewardPenaltyType } from '@/shared/types/api'

type AdjustmentKind = 'Reward' | 'Penalty'

export default function ViolationForm() {
  const [employeeId, setEmployeeId] = useState<string>('')
  const [reason, setReason] = useState<string>('')
  const [activeTab, setActiveTab] = useState<'reward' | 'penalty'>('penalty')

  const [editingType, setEditingType] = useState<RewardPenaltyType | null>(null)
  const [typeDialogOpen, setTypeDialogOpen] = useState(false)
  const [typeName, setTypeName] = useState('')
  const [typeAmount, setTypeAmount] = useState('0')
  const [typeKind, setTypeKind] = useState<AdjustmentKind>('Penalty')
  const [savingType, setSavingType] = useState(false)

  const [deletingType, setDeletingType] = useState<RewardPenaltyType | null>(null)
  const [deletingTypeLoading, setDeletingTypeLoading] = useState(false)

  const { employees = [] } = useEmployee()
  const {
    useRewardPenaltyTypes,
    applyAdjustment,
    createRewardPenaltyType,
    updateRewardPenaltyType,
    deleteRewardPenaltyType,
    loading,
  } = useAdjustment()
  const { data: allTypes = [] } = useRewardPenaltyTypes()

  const penaltyTypes = useMemo(() => allTypes.filter((t) => t.type === 'Penalty'), [allTypes])
  const rewardTypes = useMemo(() => allTypes.filter((t) => t.type === 'Reward'), [allTypes])

  const openCreateTypeDialog = (kind: AdjustmentKind) => {
    setEditingType(null)
    setTypeKind(kind)
    setTypeName('')
    setTypeAmount('0')
    setTypeDialogOpen(true)
  }

  const openEditTypeDialog = (type: RewardPenaltyType) => {
    setEditingType(type)
    setTypeKind(type.type)
    setTypeName(type.name)
    setTypeAmount(String(type.amount ?? 0))
    setTypeDialogOpen(true)
  }

  const resetTypeDialog = () => {
    setEditingType(null)
    setTypeDialogOpen(false)
    setTypeName('')
    setTypeAmount('0')
    setTypeKind('Penalty')
  }

  const handleAction = async (typeId: number, amount: number, isWarning: boolean) => {
    if (!employeeId) {
      alert('Vui long chon nhan vien truoc')
      return
    }

    try {
      await applyAdjustment({
        employeeId: Number(employeeId),
        typeId,
        amount: isWarning ? 0 : amount,
        reason: reason.trim() || (isWarning ? 'Nhac nho' : undefined),
      })
      setReason('')
    } catch (error) {
      console.error(error)
    }
  }

  const handleSaveType = async () => {
    const normalizedName = typeName.trim()
    const parsedAmount = Number(typeAmount)

    if (!normalizedName) {
      alert('Vui long nhap ten loai thuong/phat')
      return
    }

    if (!Number.isFinite(parsedAmount) || parsedAmount < 0) {
      alert('So tien khong hop le')
      return
    }

    setSavingType(true)
    try {
      const payload = {
        name: normalizedName,
        type: typeKind,
        amount: parsedAmount,
      } as const

      if (editingType) {
        await updateRewardPenaltyType({ id: editingType.id, payload })
      } else {
        await createRewardPenaltyType(payload)
      }

      resetTypeDialog()
    } catch (error) {
      console.error(error)
    } finally {
      setSavingType(false)
    }
  }

  const handleDeleteType = async () => {
    if (!deletingType || deletingTypeLoading) return

    setDeletingTypeLoading(true)
    try {
      await deleteRewardPenaltyType(deletingType.id)
      setDeletingType(null)
    } catch (error) {
      console.error(error)
    } finally {
      setDeletingTypeLoading(false)
    }
  }

  return (
    <>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="employeeSelect" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Ten Nhan Vien
            </Label>
            <Select value={employeeId} onValueChange={setEmployeeId}>
              <SelectTrigger
                id="employeeSelect"
                className="w-full h-10 bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800"
              >
                <SelectValue placeholder="Chon nhan vien" />
              </SelectTrigger>
              <SelectContent>
                {employees.map((staff) => (
                  <SelectItem key={staff.id} value={String(staff.id)}>
                    {staff.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="reasonInput" className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Ly do / Ghi chu (Tuy chon)
            </Label>
            <Input
              id="reasonInput"
              placeholder="Nhap ly do cu the..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="h-10 border-slate-200 dark:border-neutral-800"
            />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as 'reward' | 'penalty')} className="w-full space-y-4">
          <TabsList className="bg-slate-100 dark:bg-neutral-900/50 p-1">
            <TabsTrigger
              value="reward"
              className="px-6 font-semibold data-[state=active]:bg-emerald-500 data-[state=active]:text-white"
            >
              Khen Thuong
            </TabsTrigger>
            <TabsTrigger
              value="penalty"
              className="px-6 font-semibold data-[state=active]:bg-red-500 data-[state=active]:text-white"
            >
              Vi Pham
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reward" className="space-y-3">
            <div className="flex justify-end">
              <Button
                size="sm"
                className="bg-emerald-500 hover:bg-emerald-600 text-white"
                onClick={() => openCreateTypeDialog('Reward')}
                disabled={loading || savingType}
              >
                <Plus size={14} className="mr-1" />
                Them loai khen thuong
              </Button>
            </div>

            <Card className="border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm overflow-hidden text-sm">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50/50 dark:bg-black/20 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
                      <tr>
                        <th className="px-6 py-4 font-medium border-b border-slate-100 dark:border-neutral-800">Loai khen thuong</th>
                        <th className="px-6 py-4 font-medium border-b border-slate-100 dark:border-neutral-800">Tien thuong (VND)</th>
                        <th className="px-6 py-4 text-right font-medium border-b border-slate-100 dark:border-neutral-800">Hanh dong</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-neutral-800">
                      {rewardTypes.map((type) => (
                        <tr key={type.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">{type.name}</td>
                          <td className="px-6 py-4 font-mono text-emerald-500">{formatMoney(type.amount)}</td>
                          <td className="px-6 py-4">
                            <div className="flex justify-end gap-2">
                              <Button
                                size="sm"
                                disabled={loading}
                                className="bg-emerald-500 hover:bg-emerald-600 text-white border-none"
                                onClick={() => handleAction(type.id, type.amount, false)}
                              >
                                Thuong
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 rounded-full bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-slate-200"
                                onClick={() => openEditTypeDialog(type)}
                                disabled={loading || savingType}
                              >
                                <Pencil size={14} />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 rounded-full bg-red-500 hover:bg-red-600 text-white"
                                onClick={() => setDeletingType(type)}
                                disabled={loading || deletingTypeLoading}
                              >
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {rewardTypes.length === 0 && (
                        <tr>
                          <td colSpan={3} className="px-6 py-8 text-center text-slate-400 italic">
                            Chua co loai khen thuong nao.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="penalty" className="space-y-3">
            <div className="flex justify-end">
              <Button
                size="sm"
                className="bg-red-500 hover:bg-red-600 text-white"
                onClick={() => openCreateTypeDialog('Penalty')}
                disabled={loading || savingType}
              >
                <Plus size={14} className="mr-1" />
                Them loai vi pham
              </Button>
            </div>

            <Card className="border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm overflow-hidden text-sm">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50/50 dark:bg-black/20 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
                      <tr>
                        <th className="px-6 py-4 font-medium border-b border-slate-100 dark:border-neutral-800">Loai vi pham</th>
                        <th className="px-6 py-4 font-medium border-b border-slate-100 dark:border-neutral-800">So tien (VND)</th>
                        <th className="px-6 py-4 text-right font-medium border-b border-slate-100 dark:border-neutral-800">Hanh dong</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-neutral-800">
                      {penaltyTypes.map((type) => (
                        <tr key={type.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">{type.name}</td>
                          <td className="px-6 py-4 font-mono text-red-500">{formatMoney(type.amount)}</td>
                          <td className="px-6 py-4">
                            <div className="flex justify-end gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                disabled={loading}
                                className="bg-yellow-50 text-yellow-600 border-yellow-200 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:border-yellow-900/50 dark:text-yellow-500 dark:hover:bg-yellow-900/40"
                                onClick={() => handleAction(type.id, 0, true)}
                              >
                                Nhac nho
                              </Button>
                              <Button
                                size="sm"
                                disabled={loading}
                                className="bg-red-500 hover:bg-red-600 text-white border-none"
                                onClick={() => handleAction(type.id, type.amount, false)}
                              >
                                Phat
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 rounded-full bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-slate-200"
                                onClick={() => openEditTypeDialog(type)}
                                disabled={loading || savingType}
                              >
                                <Pencil size={14} />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-8 w-8 rounded-full bg-red-500 hover:bg-red-600 text-white"
                                onClick={() => setDeletingType(type)}
                                disabled={loading || deletingTypeLoading}
                              >
                                <Trash2 size={14} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                      {penaltyTypes.length === 0 && (
                        <tr>
                          <td colSpan={3} className="px-6 py-8 text-center text-slate-400 italic">
                            Chua co loai vi pham nao.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={typeDialogOpen} onOpenChange={(open) => !open && resetTypeDialog()}>
        <DialogContent className="sm:max-w-[420px]">
          <DialogHeader>
            <DialogTitle>{editingType ? 'Chinh sua loai thuong/phat' : 'Them loai thuong/phat'}</DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="typeKind">Loai</Label>
              <Select value={typeKind} onValueChange={(value) => setTypeKind(value as AdjustmentKind)}>
                <SelectTrigger id="typeKind">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Reward">Khen thuong</SelectItem>
                  <SelectItem value="Penalty">Vi pham</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="typeName">Ten loai</Label>
              <Input id="typeName" value={typeName} onChange={(e) => setTypeName(e.target.value)} placeholder="Nhap ten loai..." />
            </div>

            <div className="space-y-2">
              <Label htmlFor="typeAmount">So tien</Label>
              <Input
                id="typeAmount"
                type="number"
                min={0}
                value={typeAmount}
                onChange={(e) => setTypeAmount(e.target.value)}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={resetTypeDialog} disabled={savingType}>
              Huy
            </Button>
            <Button onClick={handleSaveType} disabled={savingType}>
              Luu
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <DeleteConfirmDialog
        open={!!deletingType}
        onOpenChange={(open) => !open && setDeletingType(null)}
        title="Xac nhan xoa loai thuong/phat"
        description={deletingType ? `Ban co chac muon xoa "${deletingType.name}"?` : undefined}
        onConfirm={handleDeleteType}
      />
    </>
  )
}
