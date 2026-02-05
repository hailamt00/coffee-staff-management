import { useMemo, useState } from 'react'
import {
    ChevronDown,
    ChevronRight,
    Pencil,
    Trash2,
    Search,
} from 'lucide-react'
import type { Position } from '@/shared/types/api'
import { StatusBadge } from '@/shared/components/StatusBadge'
import { cn } from '@/lib/utils'

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
    const [openRow, setOpenRow] = useState<number | null>(null)
    const [search, setSearch] = useState('')
    const [filter, setFilter] = useState<'all' | 'active' | 'inactive'>('all')

    /* ===== FILTERED DATA ===== */
    const filtered = useMemo(() => {
        return data.filter(p => {
            const shifts = p.shifts ?? []
            const enabled = shifts.some(s => s.isEnabled)

            if (filter === 'active' && !enabled) return false
            if (filter === 'inactive' && enabled) return false

            if (search) {
                return p.name.toLowerCase().includes(search.toLowerCase())
            }

            return true
        })
    }, [data, search, filter])

    return (
        <div className="space-y-4 text-sm">

            {/* ===== TOOLBAR ===== */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                {/* search */}
                <div className="relative w-[260px]">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <input
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search position..."
                        className="h-9 w-full rounded-md border bg-background pl-8 pr-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                </div>

                {/* filter */}
                <div className="flex rounded-md border overflow-hidden">
                    {(['all', 'active', 'inactive'] as const).map(x => (
                        <button
                            key={x}
                            onClick={() => setFilter(x)}
                            className={cn(
                                'px-3 py-1.5 text-sm capitalize transition',
                                filter === x
                                    ? 'bg-primary text-primary-foreground'
                                    : 'hover:bg-muted'
                            )}
                        >
                            {x}
                        </button>
                    ))}
                </div>
            </div>

            {/* ===== TABLE ===== */}
            <div className="rounded-lg border overflow-hidden">

                {/* header */}
                <div className="grid grid-cols-[40px_40px_3fr_2fr_2fr_120px] px-3 py-3 font-semibold text-muted-foreground bg-muted/40">
                    <div>#</div>
                    <div />
                    <div>Name</div>
                    <div>Shifts</div>
                    <div>Status</div>
                    <div className="text-center">Actions</div>
                </div>

                {/* loading */}
                {loading && (
                    <div className="py-10 text-center text-muted-foreground">
                        Loading positions...
                    </div>
                )}

                {/* empty */}
                {!loading && filtered.length === 0 && (
                    <div className="py-10 text-center text-muted-foreground">
                        No positions found
                    </div>
                )}

                {/* rows */}
                {filtered.map((p, index) => {
                    const shifts = p.shifts ?? []
                    const enabledCount = shifts.filter(s => s.isEnabled).length
                    const expanded = openRow === p.id

                    return (
                        <div key={p.id} className="border-t">

                            {/* ===== POSITION ROW ===== */}
                            <div
                                className={cn(
                                    'grid grid-cols-[40px_40px_3fr_2fr_2fr_120px] items-center px-3 py-3 transition cursor-pointer',
                                    expanded ? 'bg-muted/40' : 'hover:bg-muted/30'
                                )}
                                onClick={() =>
                                    setOpenRow(expanded ? null : p.id)
                                }
                            >
                                <div className="text-muted-foreground">{index + 1}</div>

                                <div className="flex justify-center">
                                    {expanded ? (
                                        <ChevronDown size={16} />
                                    ) : (
                                        <ChevronRight size={16} />
                                    )}
                                </div>

                                <div className="font-medium">{p.name}</div>

                                <div>
                                    {enabledCount} / {shifts.length}
                                </div>

                                <div>
                                    <StatusBadge active={enabledCount > 0} />
                                </div>

                                <div
                                    className="flex justify-center gap-2"
                                    onClick={e => e.stopPropagation()}
                                >
                                    <IconBtn onClick={() => onEdit(p.id)}>
                                        <Pencil size={14} />
                                    </IconBtn>
                                    <IconBtn danger onClick={() => onDelete(p.id, p.name)}>
                                        <Trash2 size={14} />
                                    </IconBtn>
                                </div>
                            </div>

                            {/* ===== SHIFT ROWS ===== */}
                            <div
                                className={cn(
                                    'grid transition-all overflow-hidden',
                                    expanded ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                                )}
                            >
                                <div className="overflow-hidden ml-10">
                                    {shifts.map((s, i) => (
                                        <div
                                            key={i}
                                            className="grid grid-cols-[40px_3fr_2fr_2fr_120px] items-center px-3 py-2 border-t text-muted-foreground"
                                        >
                                            <div />
                                            <div className="font-medium text-foreground">
                                                {s.name}
                                            </div>
                                            <div>
                                                {s.startTime} – {s.endTime}
                                            </div>
                                            <div>
                                                <StatusBadge active={s.isEnabled} />
                                            </div>
                                            <div />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

/* ===== ICON BUTTON ===== */
function IconBtn({
    children,
    danger,
    ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
    danger?: boolean
}) {
    return (
        <button
            {...props}
            className={cn(
                'h-8 w-8 rounded-md border flex items-center justify-center transition',
                danger
                    ? 'hover:bg-destructive hover:text-destructive-foreground'
                    : 'hover:bg-primary hover:text-primary-foreground'
            )}
        >
            {children}
        </button>
    )
}
