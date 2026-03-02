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
                    className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-all shadow-sm active:scale-95"
                >
                    {row.getIsExpanded() ? (
                        <ChevronDown className="h-4 w-4 text-slate-900 dark:text-white" />
                    ) : (
                        <ChevronRight className="h-4 w-4 text-slate-400" />
                    )}
                </button>
            ),
        },
        {
            accessorKey: "name",
            header: "Role / Position",
            cell: ({ row }) => <div className="font-black text-slate-900 dark:text-white uppercase tracking-tighter text-sm">{row.getValue("name")}</div>
        },
        {
            id: "shifts_count",
            header: "Slots",
            cell: ({ row }) => {
                const shifts = row.original.shifts ?? []
                const enabledCount = shifts.filter(s => s.isEnabled).length
                return (
                    <div className="font-bold text-slate-500 text-xs tabular-nums">
                        {enabledCount} / {shifts.length}
                    </div>
                )
            }
        },
        {
            accessorKey: "status",
            header: "State",
            cell: ({ row }) => <StatusBadge active={row.getValue("status")} />
        },
        {
            id: "actions",
            header: () => <div className="text-right px-4">Actions</div>,
            cell: ({ row }) => (
                <div className="flex justify-end gap-2 pr-2">
                    <Button
                        size="icon"
                        variant="outline"
                        className="h-9 w-9 rounded-xl border-slate-200 hover:bg-black hover:text-white transition-all shadow-sm"
                        onClick={() => onEdit(row.original.id)}
                    >
                        <Pencil size={14} />
                    </Button>
                    <Button
                        size="icon"
                        variant="outline"
                        className="h-9 w-9 rounded-xl border-red-100 text-red-600 hover:bg-red-600 hover:text-white transition-all shadow-sm"
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
                            className="flex items-center justify-between px-6 py-4 border-t first:border-0 border-slate-100 dark:border-neutral-800/50 transition-colors hover:bg-white dark:hover:bg-white/5"
                        >
                            <div className="flex flex-col gap-0.5">
                                <span className="text-[11px] font-black text-slate-900 dark:text-white uppercase tracking-widest leading-none">
                                    {s.name}
                                </span>
                                <span className="text-[10px] font-bold text-slate-400 tabular-nums">
                                    {s.startTime?.slice(0, 5)} – {s.endTime?.slice(0, 5)}
                                </span>
                            </div>
                            <div className="flex items-center gap-4">
                                <StatusBadge active={s.isEnabled} />
                                <div className="w-10" />
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="p-8 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">
                        No operational shifts configured
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
            getRowCanExpand={() => true}
            renderSubComponent={renderShifts}
        />
    )
}
