import { Employee } from '@/shared/types/api'
import { formatMoney, formatDate } from '@/shared/utils/format'

export function EmployeeTable({
    data,
    onEdit,
    onDelete,
}: {
    data: Employee[]
    onEdit: (id: number) => void
    onDelete: (id: number, name: string) => void
}) {
    return (
        <div className="border rounded-lg overflow-x-auto">
            <div className="min-w-[1200px]">
                {data.map(e => (
                    <div
                        key={e.id}
                        className="grid grid-cols-[120px_1.5fr_1fr_1fr_1fr_1fr_1fr_110px] border-b hover:bg-slate-100"
                    >
                        <Cell>{e.code}</Cell>
                        <Cell bold>{e.name}</Cell>
                        <Cell>{e.phone}</Cell>
                        <Cell>{e.cid ?? '—'}</Cell>
                        <Cell right>{formatMoney(e.salaryService)}</Cell>
                        <Cell right>{formatMoney(e.salaryBar)}</Cell>
                        <Cell>{formatDate(e.hireDate)}</Cell>
                        <Cell>
                            <button onClick={() => onEdit(e.id)}>✏️</button>
                            <button onClick={() => onDelete(e.id, e.name)}>🗑</button>
                        </Cell>
                    </div>
                ))}
            </div>
        </div>
    )
}

function Cell({
    children,
    bold,
    right,
}: {
    children: React.ReactNode
    bold?: boolean
    right?: boolean
}) {
    return (
        <div className={`px-3 py-2 text-sm
      ${bold ? 'font-semibold' : ''}
      ${right ? 'text-right' : ''}
    `}>
            {children}
        </div>
    )
}
