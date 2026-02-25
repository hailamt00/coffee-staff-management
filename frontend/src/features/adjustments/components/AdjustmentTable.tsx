import { useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Badge } from '@/shared/components/ui/badge'
import { DataTable } from '@/shared/components/ui/data-table'
import { ColumnDef } from '@tanstack/react-table'
import type { Adjustment } from '../types'
import { formatMoney, formatDate } from '@/shared/utils/format'

interface Props {
  data: Adjustment[]
  loading?: boolean
}

export default function AdjustmentTable({ data, loading }: Props) {
  const columns = useMemo<ColumnDef<any>[]>(() => [
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
      header: "Lỗi vi phạm",
      cell: ({ row }) => {
        const type = row.getValue("typeName") as string
        const isBonus = type.toLowerCase().includes('thưởng') || type.toLowerCase().includes('bonus')
        return (
          <Badge
            variant={isBonus ? 'default' : 'destructive'}
            className={isBonus ? 'bg-emerald-500 hover:bg-emerald-600' : 'bg-red-500 hover:bg-red-600'}
          >
            {type}
          </Badge>
        )
      }
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-right">Số điểm (Tiền)</div>,
      cell: ({ row }) => {
        const amount = row.getValue("amount") as number
        const type = row.original.typeName
        const isBonus = type.toLowerCase().includes('thưởng') || type.toLowerCase().includes('bonus')
        return (
          <div className={`text-right font-mono font-bold ${isBonus ? 'text-emerald-600' : 'text-red-600'}`}>
            {isBonus ? '+' : '-'}{formatMoney(Math.abs(amount))}
          </div>
        )
      }
    },
    {
      id: "note",
      header: "Ghi Chú",
      cell: ({ row }) => <div className="text-xs text-muted-foreground">{row.original.note || "—"}</div>
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
