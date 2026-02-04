import { useState, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Plus,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ArrowUp,
  ArrowDown,
} from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/shared/ui/dialog'
import { Card, CardContent } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'

import type { Position } from '@/shared/types/api'
import { usePosition } from '../hooks/usePosition'
import { PositionFormDialog } from '../components/PositionFormDialog'
import { sortData, SortState } from '@/shared/utils/sort'

/* ================= PAGE ================= */

export default function PositionsPage() {
  const {
    positions,
    loading,
    createPosition,
    updatePosition,
    deletePosition,
  } = usePosition()

  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const pageSize = 10
  const [sort, setSort] = useState<SortState<Position> | null>(null)

  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState<Position | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<Position | null>(null)

  /* ===== FILTER ===== */
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return positions
    return positions.filter(p =>
      p.name.toLowerCase().includes(q)
    )
  }, [positions, search])

  /* ===== SORT ===== */
  const sorted = useMemo(
    () => sortData(filtered, sort),
    [filtered, sort]
  )

  const toggleSort = (key: keyof Position) => {
    setSort(prev =>
      prev?.key === key
        ? {
            key,
            direction:
              prev.direction === 'asc' ? 'desc' : 'asc',
          }
        : { key, direction: 'asc' }
    )
  }

  /* ===== PAGINATION ===== */
  useEffect(() => setPage(1), [search])

  const totalPages = Math.max(
    1,
    Math.ceil(sorted.length / pageSize)
  )

  const paged = sorted.slice(
    (page - 1) * pageSize,
    page * pageSize
  )

  /* ===== DELETE ===== */
  const confirmDelete = async () => {
    if (!deleteTarget) return
    await deletePosition(deleteTarget.id)
    setDeleteTarget(null)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="space-y-6"
      >
        <Header onAdd={() => setFormOpen(true)} />

        <Card>
          <CardContent className="p-6 space-y-4">
            <Toolbar search={search} onSearch={setSearch} />

            <div className="overflow-x-auto rounded-lg border">
              {loading && (
                <EmptyState label="Loading positions..." />
              )}

              {!loading && paged.length === 0 && (
                <EmptyState label="No positions found" />
              )}

              {!loading && paged.length > 0 && (
                <PositionTable
                  data={paged}
                  page={page}
                  pageSize={pageSize}
                  sort={sort}
                  onSort={toggleSort}
                  onEdit={p => {
                    setEditing(p)
                    setFormOpen(true)
                  }}
                  onDelete={setDeleteTarget}
                />
              )}
            </div>

            <Pagination
              page={page}
              total={sorted.length}
              pageSize={pageSize}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </CardContent>
        </Card>
      </motion.div>

      <PositionFormDialog
        open={formOpen}
        position={editing}
        onOpenChange={open => {
          if (!open) setEditing(null)
          setFormOpen(open)
        }}
        onSubmit={payload =>
          editing
            ? updatePosition(editing.id, payload)
            : createPosition(payload)
        }
      />

      <DeleteDialog
        target={deleteTarget}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={confirmDelete}
      />
    </>
  )
}

/* ================= COMPONENTS ================= */

function Header({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold">Positions</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage employee positions
        </p>
      </div>
      <Button onClick={onAdd}>
        <Plus className="mr-2 h-4 w-4" />
        Add Position
      </Button>
    </div>
  )
}

function Toolbar({
  search,
  onSearch,
}: {
  search: string
  onSearch: (v: string) => void
}) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="font-semibold">Position List</h2>
      <Input
        className="w-64"
        placeholder="Search by name..."
        value={search}
        onChange={e => onSearch(e.target.value)}
      />
    </div>
  )
}

function PositionTable({
  data,
  page,
  pageSize,
  sort,
  onSort,
  onEdit,
  onDelete,
}: {
  data: Position[]
  page: number
  pageSize: number
  sort: SortState<Position> | null
  onSort: (key: keyof Position) => void
  onEdit: (p: Position) => void
  onDelete: (p: Position) => void
}) {
  return (
    <div className="min-w-[600px]">
      <div className="grid grid-cols-[80px_100px_1fr_120px] border-b bg-muted/40">
        <HeaderCell label="#" />
        <HeaderCell label="ID" />
        <HeaderCell
          label="Name"
          sort={sort}
          sortKey="name"
          onClick={() => onSort('name')}
        />
        <HeaderCell label="Actions" center />
      </div>

      {data.map((p, i) => (
        <div
          key={`position-${p.id}`}
          className="grid grid-cols-[80px_100px_1fr_120px] border-b hover:bg-muted/30 transition"
        >
          <Cell muted>
            {(page - 1) * pageSize + i + 1}
          </Cell>
          <Cell muted>{p.id}</Cell>
          <Cell bold>{p.name}</Cell>

          <div className="px-3 py-2 flex justify-center gap-2">
            <IconBtn onClick={() => onEdit(p)}>
              <Pencil size={14} />
            </IconBtn>
            <IconBtn danger onClick={() => onDelete(p)}>
              <Trash2 size={14} />
            </IconBtn>
          </div>
        </div>
      ))}
    </div>
  )
}

function Pagination({
  page,
  total,
  pageSize,
  totalPages,
  onPageChange,
}: {
  page: number
  total: number
  pageSize: number
  totalPages: number
  onPageChange: (p: number) => void
}) {
  return (
    <div className="grid grid-cols-3 items-center pt-4 text-sm">
      <div className="text-muted-foreground">
        Showing{' '}
        <span className="font-medium text-foreground">
          {(page - 1) * pageSize + 1}
        </span>
        –{' '}
        <span className="font-medium text-foreground">
          {Math.min(page * pageSize, total)}
        </span>{' '}
        of{' '}
        <span className="font-medium text-foreground">
          {total}
        </span>
      </div>

      <div className="flex items-center justify-center gap-1">
        <PageBtn
          disabled={page === 1}
          onClick={() => onPageChange(page - 1)}
        >
          <ChevronLeft size={16} />
        </PageBtn>

        {Array.from({ length: totalPages }, (_, i) => {
          const pageNum = i + 1
          return (
            <PageBtn
              key={`page-${pageNum}`}
              active={page === pageNum}
              onClick={() => onPageChange(pageNum)}
            >
              {pageNum}
            </PageBtn>
          )
        })}

        <PageBtn
          disabled={page === totalPages}
          onClick={() => onPageChange(page + 1)}
        >
          <ChevronRight size={16} />
        </PageBtn>
      </div>
    </div>
  )
}

/* ================= SHARED ================= */

function DeleteDialog({
  target,
  onCancel,
  onConfirm,
}: {
  target: Position | null
  onCancel: () => void
  onConfirm: () => void
}) {
  return (
    <Dialog open={!!target} onOpenChange={onCancel}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete position</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete{' '}
            <span className="font-semibold">
              {target?.name}
            </span>
            ?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={onConfirm}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function EmptyState({ label }: { label: string }) {
  return (
    <div className="py-20 text-center text-muted-foreground animate-pulse">
      {label}
    </div>
  )
}

function HeaderCell<T>({
  label,
  sort,
  sortKey,
  center,
  onClick,
}: {
  label: string
  sort?: SortState<T> | null
  sortKey?: keyof T
  center?: boolean
  onClick?: () => void
}) {
  const active = sort && sortKey && sort.key === sortKey

  return (
    <div
      onClick={onClick}
      className={`px-3 py-3 text-sm font-semibold flex items-center gap-1
        ${onClick ? 'cursor-pointer hover:bg-muted' : ''}
        ${center ? 'justify-center text-center' : ''}`}
    >
      {label}
      {active &&
        (sort.direction === 'asc'
          ? <ArrowUp size={12} />
          : <ArrowDown size={12} />)}
    </div>
  )
}

function Cell({
  children,
  bold,
  muted,
}: {
  children: React.ReactNode
  bold?: boolean
  muted?: boolean
}) {
  return (
    <div
      className={`px-3 py-2 text-sm
        ${bold ? 'font-semibold' : ''}
        ${muted ? 'text-muted-foreground' : ''}`}
    >
      {children}
    </div>
  )
}

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
      className={`h-8 w-8 rounded-md border flex items-center justify-center transition
        ${
          danger
            ? 'hover:bg-destructive hover:text-destructive-foreground'
            : 'hover:bg-primary hover:text-primary-foreground'
        }`}
    >
      {children}
    </button>
  )
}

function PageBtn({
  children,
  active,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  active?: boolean
}) {
  return (
    <button
      {...props}
      className={`h-8 min-w-[32px] px-2 rounded-md border text-sm transition-colors
        ${
          active
            ? 'bg-primary text-primary-foreground'
            : 'hover:bg-muted'
        }
        disabled:opacity-40 disabled:pointer-events-none`}
    >
      {children}
    </button>
  )
}
