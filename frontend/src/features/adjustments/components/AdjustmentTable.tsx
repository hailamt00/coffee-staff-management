import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Badge } from '@/shared/components/ui/badge'
import { DataTable } from '@/shared/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'
import type { RewardPenalty } from '@/shared/types/api'
import { formatMoney, formatDate } from '@/shared/utils/format'

interface Props {
  data: RewardPenalty[]
  loading?: boolean
}

export default function AdjustmentTable({ data, loading }: Props) {
  const columns = useMemo<ColumnDef<RewardPenalty>[]>(() => [
    {
      accessorKey: "createdAt",
      header: "Ngày",
      cell: ({ row }) => <span className="text-sm font-medium text-slate-700">{formatDate(row.getValue("createdAt"))}</span>
    },
    {
      accessorKey: "employeeName",
      header: "Nhân Viên",
      cell: ({ row }) => <div className="font-semibold text-slate-900 dark:text-slate-100">{row.getValue("employeeName")}</div>
    },
    {
      accessorKey: "typeName",
      header: "Nội dung",
      cell: ({ row }) => {
        const typeOrig = row.original.typeName
        const isBonus = row.original.kind === 'Reward'
        return (
          <Badge
            variant={isBonus ? 'default' : 'destructive'}
            className={isBonus ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-red-500 hover:bg-red-600'}
          >
            {typeOrig}
          </Badge>
        )
      }
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-right">Số tiền (VNĐ)</div>,
      cell: ({ row }) => {
        const amount = row.getValue("amount") as number
        const isBonus = row.original.kind === 'Reward'
        const isWarning = amount === 0

        return (
          <div className={`text-right font-mono font-bold ${isWarning ? 'text-slate-400' : isBonus ? 'text-emerald-600' : 'text-red-600'}`}>
            {isWarning ? 'Nhắc nhở' : `${isBonus ? '+' : '-'}${formatMoney(Math.abs(amount))}`}
          </div>
        )
      }
    },
    {
      accessorKey: "reason",
      header: "Lý do / Ghi chú",
      cell: ({ row }) => <div className="text-xs text-muted-foreground whitespace-normal min-w-[150px]">{row.original.reason || "—"}</div>
    }
  ], [])

  return (
    <Card className="border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm overflow-hidden">
      <CardHeader className="bg-slate-50/50 dark:bg-black/20 border-b border-slate-100 dark:border-neutral-800">
        <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Lịch sử vi phạm / khen thưởng
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
  )
}
