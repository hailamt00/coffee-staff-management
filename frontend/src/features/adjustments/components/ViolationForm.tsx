import { useState, useMemo } from 'react'
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
import { useEmployee } from '@/features/employees/hooks/useEmployee'
import { useAdjustment } from '../hooks/useAdjustment'
import { formatMoney } from '@/shared/utils/format'

export default function ViolationForm() {
    const [employeeId, setEmployeeId] = useState<string>('')
    const [reason, setReason] = useState<string>('')
    const [activeTab, setActiveTab] = useState('penalty')

    const { employees = [] } = useEmployee()
    const { useRewardPenaltyTypes, applyAdjustment, loading } = useAdjustment()
    const { data: allTypes = [] } = useRewardPenaltyTypes()

    // Filter types
    const penaltyTypes = useMemo(() => allTypes.filter(t => t.type === 'Penalty'), [allTypes])
    const rewardTypes = useMemo(() => allTypes.filter(t => t.type === 'Reward'), [allTypes])

    const handleAction = async (typeId: number, amount: number, isWarning: boolean) => {
        if (!employeeId) return alert('Vui lòng chọn nhân viên trước')

        try {
            await applyAdjustment({
                employeeId: Number(employeeId),
                typeId,
                amount: isWarning ? 0 : amount,
                reason: reason.trim() || (isWarning ? 'Nhắc nhở' : undefined)
            })
            setReason('') // Clear reason on success
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label htmlFor="employeeSelect" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Tên Nhân Viên</Label>
                    <Select value={employeeId} onValueChange={setEmployeeId}>
                        <SelectTrigger id="employeeSelect" className="w-full h-10 bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800">
                            <SelectValue placeholder="Chọn nhân viên" />
                        </SelectTrigger>
                        <SelectContent>
                            {employees.map(staff => (
                                <SelectItem key={staff.id} value={String(staff.id)}>
                                    {staff.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="reasonInput" className="text-sm font-semibold text-slate-700 dark:text-slate-300">Lý do / Ghi chú (Tùy chọn)</Label>
                    <Input
                        id="reasonInput"
                        placeholder="Nhập lý do cụ thể..."
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        className="h-10 border-slate-200 dark:border-neutral-800"
                    />
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full space-y-4">
                <TabsList className="bg-slate-100 dark:bg-neutral-900/50 p-1">
                    <TabsTrigger value="reward" className="px-6 font-semibold data-[state=active]:bg-emerald-500 data-[state=active]:text-white">Khen Thưởng</TabsTrigger>
                    <TabsTrigger value="penalty" className="px-6 font-semibold data-[state=active]:bg-red-500 data-[state=active]:text-white">Vi Phạm</TabsTrigger>
                </TabsList>

                <TabsContent value="reward">
                    <Card className="border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm overflow-hidden text-sm">
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50/50 dark:bg-black/20 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
                                        <tr>
                                            <th className="px-6 py-4 font-medium border-b border-slate-100 dark:border-neutral-800">Loại khen thưởng</th>
                                            <th className="px-6 py-4 font-medium border-b border-slate-100 dark:border-neutral-800">Tiền thưởng (VNĐ)</th>
                                            <th className="px-6 py-4 text-right font-medium border-b border-slate-100 dark:border-neutral-800">Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-neutral-800">
                                        {rewardTypes.map((type) => (
                                            <tr key={type.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                                                <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">{type.name}</td>
                                                <td className="px-6 py-4 font-mono text-emerald-500">
                                                    {formatMoney(type.amount)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            size="sm"
                                                            disabled={loading}
                                                            className="bg-emerald-500 hover:bg-emerald-600 text-white border-none"
                                                            onClick={() => handleAction(type.id, type.amount, false)}
                                                        >
                                                            Thưởng
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {rewardTypes.length === 0 && (
                                            <tr><td colSpan={3} className="px-6 py-8 text-center text-slate-400 italic">Chưa có loại khen thưởng nào.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="penalty">
                    <Card className="border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm overflow-hidden text-sm">
                        <CardContent className="p-0">
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50/50 dark:bg-black/20 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
                                        <tr>
                                            <th className="px-6 py-4 font-medium border-b border-slate-100 dark:border-neutral-800">Loại vi phạm</th>
                                            <th className="px-6 py-4 font-medium border-b border-slate-100 dark:border-neutral-800">Số tiền (VNĐ)</th>
                                            <th className="px-6 py-4 text-right font-medium border-b border-slate-100 dark:border-neutral-800">Hành động</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 dark:divide-neutral-800">
                                        {penaltyTypes.map((type) => (
                                            <tr key={type.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                                                <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">{type.name}</td>
                                                <td className="px-6 py-4 font-mono text-red-500">
                                                    {formatMoney(type.amount)}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            disabled={loading}
                                                            className="bg-yellow-50 text-yellow-600 border-yellow-200 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:border-yellow-900/50 dark:text-yellow-500 dark:hover:bg-yellow-900/40"
                                                            onClick={() => handleAction(type.id, 0, true)}
                                                        >
                                                            Nhắc nhở
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            disabled={loading}
                                                            className="bg-red-500 hover:bg-red-600 text-white border-none"
                                                            onClick={() => handleAction(type.id, type.amount, false)}
                                                        >
                                                            Phạt
                                                        </Button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                        {penaltyTypes.length === 0 && (
                                            <tr><td colSpan={3} className="px-6 py-8 text-center text-slate-400 italic">Chưa có loại vi phạm nào.</td></tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}

