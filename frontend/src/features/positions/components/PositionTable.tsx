import { useMemo } from 'react'
import {
    ChevronDown,
    ChevronRight,
    Pencil,
    Trash2,
} from 'lucide-react'
import type { Position } from '@/shared/types/api'
import { StatusBadge } from '@/shared/components/ui/status-badge'
import { DataTable } from '@/shared/components/ui/data-table'
import { Button } from '@/shared/components/ui/button'
import { ColumnDef } from '@tanstack/react-table'

type Props = {
    data: Position[]
    loading?: boolean
    onEdit: (id: number) => void
    onDelete: (id: number, name: string) => void
}

export function PositionTable({
    data,
    loading,
    onEdit,
    onDelete,
}: Props) {
    const columns = useMemo<ColumnDef<Position>[]>(() => [
        {
            id: "expander",
            header: () => null,
            cell: ({ row }) => (
                <button
                    onClick={() => row.toggleExpanded()}
                    className="flex h-8 w-8 items-center justify-center rounded-md hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                >
                    {row.getIsExpanded() ? (
                        <ChevronDown className="h-4 w-4 text-slate-800 dark:text-white" />
                    ) : (
                        <ChevronRight className="h-4 w-4 text-slate-400" />
                    )}
                </button>
            ),
        },
        {
            accessorKey: "name",
            header: "Position Name",
            cell: ({ row }) => <div className="font-bold text-slate-900 dark:text-white uppercase tracking-tight">{row.getValue("name")}</div>
        },
        {
            id: "shifts_count",
            header: "Shifts",
            cell: ({ row }) => {
                const shifts = row.original.shifts ?? []
                const enabledCount = shifts.filter(s => s.isEnabled).length
                return (
                    <div className="font-bold text-slate-500">
                        {enabledCount} / {shifts.length}
                    </div>
                )
            }
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => <StatusBadge active={row.getValue("status")} />
        },
        {
            id: "actions",
            header: () => <div className="text-center">Actions</div>,
            cell: ({ row }) => (
                <div className="flex justify-center gap-2">
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-lg bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200"
                        onClick={() => onEdit(row.original.id)}
                    >
                        <Pencil size={14} />
                    </Button>
                    <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 rounded-lg bg-red-500 hover:bg-red-600 text-white"
                        onClick={() => onDelete(row.original.id, row.original.name)}
                    >
                        <Trash2 size={14} />
                    </Button>
                </div>
            )
        }
    ], [onEdit, onDelete])

    const renderShifts = ({ row }: { row: any }) => {
        const shifts = row.original.shifts ?? []
        return (
            <div className="bg-slate-50/50 dark:bg-black/40 border-y border-slate-100 dark:border-neutral-800">
                {shifts.length > 0 ? (
                    shifts.map((s: any, i: number) => (
                        <div
                            key={i}
                            className="grid grid-cols-[3fr_2fr_2fr_120px] items-center px-12 py-3 border-t first:border-0 border-slate-100 dark:border-neutral-800/50 transition-colors hover:bg-white dark:hover:bg-white/5"
                        >
                            <div className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-wider">
                                {s.name}
                            </div>
                            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                                {s.startTime} – {s.endTime}
                            </div>
                            <div>
                                <StatusBadge active={s.isEnabled} />
                            </div>
                            <div />
                        </div>
                    ))
                ) : (
                    <div className="p-4 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        No shifts configured for this position
                    </div>
                )}
            </div>
        )
    }

    return (
        <DataTable
            columns={columns}
            data={data}
            loading={loading}
            searchKey="name"
            getRowCanExpand={() => true}
            renderSubComponent={renderShifts}
        />
    )
}
