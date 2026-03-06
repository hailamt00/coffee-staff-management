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
import { useTranslation } from 'react-i18next'

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
    const { t } = useTranslation()
    const columns = useMemo<ColumnDef<Position>[]>(() => [
        {
            id: "expander",
            header: () => null,
            meta: { width: '80px' },
            cell: ({ row }) => (
                <button
                    onClick={() => row.toggleExpanded()}
                    className="flex h-8 w-8 items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-white/10 transition-all shadow-sm active:scale-95"
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
            header: t('positions.table.role') || "Role / Position",
            meta: { align: 'left', hideSortIcon: true },
            cell: ({ row }) => <div className="font-semibold text-slate-900 dark:text-white text-sm">{row.getValue("name")}</div>
        },
        {
            id: "shifts_count",
            header: t('positions.table.slots') || "Slots",
            meta: { align: 'center', hideSortIcon: true, width: '150px' },
            cell: ({ row }) => {
                const shifts = row.original.shifts ?? []
                const enabledCount = shifts.filter(s => s.isEnabled).length
                return (
                    <div className="font-semibold text-slate-500 text-xs tabular-nums text-center">
                        {enabledCount} / {shifts.length}
                    </div>
                )
            }
        },
        {
            accessorKey: "status",
            header: t('positions.table.state') || "State",
            meta: { align: 'center', hideSortIcon: true, width: '150px' },
            cell: ({ row }) => (
                <div className="flex justify-center">
                    <StatusBadge active={row.getValue("status")} />
                </div>
            )
        },
        {
            id: "actions",
            header: t('common.actions') || "Actions",
            meta: { align: 'center', hideSortIcon: true, width: '150px' },
            cell: ({ row }) => (
                <div className="flex justify-center gap-2">
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
    ], [t, onEdit, onDelete])

    const renderShifts = ({ row }: { row: any }) => {
        const shifts = row.original.shifts ?? []
        return (
            <div className="bg-slate-50/50 dark:bg-black/40 border-y border-slate-100 dark:border-neutral-800">
                {shifts.length > 0 ? (
                    shifts.map((s: any, i: number) => (
                        <div
                            key={i}
                            className="relative flex items-center w-full py-4 transition-colors hover:bg-white dark:hover:bg-white/5"
                        >
                            {/* Centered Short Border Top */}
                            {i > 0 && (
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[85%] h-[1px] bg-slate-200 dark:bg-neutral-700/50" />
                            )}

                            {/* 1. Expander Ghost: Exactly 80px wide like the parent TableCell (due to meta.width) */}
                            <div style={{ width: '80px' }} className="flex-shrink-0" />

                            {/* 2. Name Column: Takes remaining space. Need px-6 padding to match TableCell. Added extra pl-4 so it indents slightly under the Role Name. */}
                            <div className="flex-1 px-6 pl-10">
                                <div className="flex flex-col gap-0.5 justify-center">
                                    <span className="text-[13px] font-semibold text-slate-900 dark:text-white capitalize">
                                        {s.name}
                                    </span>
                                    <span className="text-[11px] font-medium text-slate-500 tabular-nums">
                                        {s.startTime?.slice(0, 5)} – {s.endTime?.slice(0, 5)}
                                    </span>
                                </div>
                            </div>

                            {/* 3. Slots Ghost: Exactly 150px */}
                            <div style={{ width: '150px' }} className="flex-shrink-0" />

                            {/* 4. State Mirror: Exactly 150px. Uses justify-center to align perfectly with header. */}
                            <div style={{ width: '150px' }} className="flex-shrink-0 flex justify-center">
                                <StatusBadge active={s.isEnabled} />
                            </div>

                            {/* 5. Actions Ghost: Exactly 150px */}
                            <div style={{ width: '150px' }} className="flex-shrink-0" />
                        </div>
                    ))
                ) : (
                    <div className="p-8 text-center text-[10px] font-bold text-slate-400 uppercase tracking-widest italic">
                        {t('positions.noShifts') || "No operational shifts configured"}
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
