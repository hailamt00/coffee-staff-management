import { useState } from 'react'
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

const VIOLATION_TYPES = [
    { id: 1, name: 'Đi làm muộn', deduction: 50 },
    { id: 2, name: 'Làm hỏng đồ', deduction: 100 },
    { id: 3, name: 'Không dọn vệ sinh', deduction: 50 },
    { id: 4, name: 'Thái độ lồi lõm với khách', deduction: 200 },
    { id: 5, name: 'Quên chấm công', deduction: 50 },
    { id: 6, name: 'Tự ý đổi ca không báo quản lý', deduction: 100 },
    { id: 7, name: 'Thiếu đồng phục', deduction: 50 },
]

export default function ViolationForm() {
    const [employeeId, setEmployeeId] = useState<string>('')

    // In a real app, this would be fetched from API
    const staffList = [
        { id: '1', name: 'Nguyễn Văn A' },
        { id: '2', name: 'Trần Thị B' },
        { id: '3', name: 'Lê Văn C' }
    ]

    const handleWarning = (typeId: number) => {
        if (!employeeId) return alert('Vui lòng chọn nhân viên trước')
        console.log('Warning applied for type', typeId, 'to employee', employeeId)
    }

    const handlePenalize = (typeId: number) => {
        if (!employeeId) return alert('Vui lòng chọn nhân viên trước')
        console.log('Penalty applied for type', typeId, 'to employee', employeeId)
    }

    return (
        <div className="space-y-6">
            <div className="max-w-md space-y-2">
                <Label className="text-sm font-semibold text-slate-700 dark:text-slate-300">Tên Nhân Viên</Label>
                <Select value={employeeId} onValueChange={setEmployeeId}>
                    <SelectTrigger className="w-full h-10 bg-white dark:bg-neutral-900 border-slate-200 dark:border-neutral-800">
                        <SelectValue placeholder="Chọn nhân viên" />
                    </SelectTrigger>
                    <SelectContent>
                        {staffList.map(staff => (
                            <SelectItem key={staff.id} value={staff.id}>
                                {staff.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <Card className="border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm overflow-hidden">
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-slate-50/50 dark:bg-black/20 text-slate-500 uppercase text-[10px] font-bold tracking-wider">
                                <tr>
                                    <th className="px-6 py-4 font-medium border-b border-slate-100 dark:border-neutral-800">Loại vi phạm</th>
                                    <th className="px-6 py-4 font-medium border-b border-slate-100 dark:border-neutral-800">Trừ (k)</th>
                                    <th className="px-6 py-4 text-right font-medium border-b border-slate-100 dark:border-neutral-800">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 dark:divide-neutral-800">
                                {VIOLATION_TYPES.map((type) => (
                                    <tr key={type.id} className="hover:bg-slate-50 dark:hover:bg-white/[0.02] transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900 dark:text-slate-100">{type.name}</td>
                                        <td className="px-6 py-4 font-mono text-red-500">{type.deduction}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    className="bg-yellow-50 text-yellow-600 border-yellow-200 hover:bg-yellow-100 dark:bg-yellow-900/20 dark:border-yellow-900/50 dark:text-yellow-500 dark:hover:bg-yellow-900/40"
                                                    onClick={() => handleWarning(type.id)}
                                                >
                                                    Nhắc nhở
                                                </Button>
                                                <Button
                                                    size="sm"
                                                    className="bg-red-500 hover:bg-red-600 text-white border-none"
                                                    onClick={() => handlePenalize(type.id)}
                                                >
                                                    Phạt
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
