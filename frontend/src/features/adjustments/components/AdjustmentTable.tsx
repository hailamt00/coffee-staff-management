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
  const columns = useMemo<ColumnDef<Adjustment>[]>(() => [
    {
      accessorKey: "employeeName",
      header: "Employee",
      cell: ({ row }) => <div className="font-medium text-slate-900 dark:text-slate-100">{row.getValue("employeeName")}</div>
    },
    {
      accessorKey: "typeName",
      header: "Type",
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
      accessorKey: "createdAt",
      header: "Date",
      cell: ({ row }) => <span className="text-sm text-slate-500">{formatDate(row.getValue("createdAt"))}</span>
    },
    {
      accessorKey: "amount",
      header: () => <div className="text-right">Amount</div>,
      cell: ({ row }) => {
        const amount = row.getValue("amount") as number
        const type = row.original.typeName
        const isBonus = type.toLowerCase().includes('thưởng') || type.toLowerCase().includes('bonus')
        return (
          <div className={`text-right font-mono font-bold ${isBonus ? 'text-emerald-600' : 'text-red-600'}`}>
            {isBonus ? '+' : '-'}{formatMoney(amount)}
          </div>
        )
      }
    },
    {
      // We don't have explicit "Reason" field in DTO yet, unless Type Name covers it or we add it. 
      // DTO has TypeName.
      // Let's hide Reason for now or use TypeName as Reason.
      accessorKey: "typeName",
      header: "Reason/Type",
      id: "reason"
    },
    // We don't have Status in Adjustment DTO. It's usually "Applied" or "Pending" but here we fetch applied ones?
    // RewardsPenaltiesController Apply -> Immediately applied.
    // So status is effectively "Approved/Applied".
  ], [])

  return (
    <Card className="border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm overflow-hidden">
      <CardHeader className="bg-slate-50/50 dark:bg-black/20 border-b border-slate-100 dark:border-neutral-800">
        <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Recent Adjustments
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
