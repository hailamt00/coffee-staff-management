import { useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select'

import { Card, CardContent } from '@/shared/ui/card'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'

import type { Employee } from '@/shared/types/api'
import { useEmployee } from '../hooks/useEmployee'

import { sortData, SortState } from '@/shared/utils/sort'
import { formatMoney, formatDate } from '@/shared/utils/format'

/* ================= PAGE ================= */

export default function EmployeesPage() {
  const navigate = useNavigate()
  const { employees, deleteEmployee, loading } = useEmployee()

  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [sort, setSort] = useState<SortState<Employee> | null>(null)

  const [deleteTarget, setDeleteTarget] = useState<Employee | null>(null)

  /* ===== FILTER ===== */
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return employees
    return employees.filter(
      e =>
        e.name.toLowerCase().includes(q) ||
        e.code.toLowerCase().includes(q)
    )
  }, [employees, search])

  /* ===== SORT ===== */
  const sorted = useMemo(
    () => sortData(filtered, sort),
    [filtered, sort]
  )

  const toggleSort = (key: keyof Employee) => {
    setSort(prev =>
      prev?.key === key
        ? {
          key,
          direction: prev.direction === 'asc' ? 'desc' : 'asc',
        }
        : { key, direction: 'asc' }
    )
  }

  /* ===== PAGINATION ===== */
  useEffect(() => setPage(1), [search, pageSize])

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize))
  const paged = sorted.slice(
    (page - 1) * pageSize,
    page * pageSize
  )

  /* ===== DELETE FLOW ===== */
  const confirmDelete = async () => {
    if (!deleteTarget) return
    await deleteEmployee(deleteTarget.id)
    setDeleteTarget(null)
  }

  /* ================= UI ================= */

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="space-y-6"
      >
        {/* HEADER */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Employees</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage staff information and access
            </p>
          </div>

          <Button onClick={() => navigate('/employees/add')}>
            <Plus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        </div>

        {/* CONTENT */}
        <Card>
          <CardContent className="p-6 space-y-4">
            {/* TOOLBAR */}
            <div className="flex items-center justify-between">
              <h2 className="font-semibold">Employee List</h2>
              <Input
                className="w-64"
                placeholder="Search by name or code..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto rounded-lg border">
              {loading ? (
                <div className="py-20 text-center text-muted-foreground animate-pulse">
                  Loading employees...
                </div>
              ) : paged.length === 0 ? (
                <div className="py-20 text-center text-muted-foreground">
                  No employees found
                </div>
              ) : (
                <div className="min-w-[1200px]">
                  {/* HEADER */}
                  <div className="grid grid-cols-[50px_120px_1.5fr_1fr_1fr_1fr_1fr_1fr_1fr_110px] border-b bg-muted/40">
                    <HeaderCell label="#" />
                    <HeaderCell label="Code" sort={sort} sortKey="code" onClick={() => toggleSort('code')} />
                    <HeaderCell label="Name" sort={sort} sortKey="name" onClick={() => toggleSort('name')} />
                    <HeaderCell label="Phone" />
                    <HeaderCell label="CID" />
                    <HeaderCell label="Salary PV" right sort={sort} sortKey="salaryService" onClick={() => toggleSort('salaryService')} />
                    <HeaderCell label="Salary PC" right sort={sort} sortKey="salaryBar" onClick={() => toggleSort('salaryBar')} />
                    <HeaderCell label="DOB" />
                    <HeaderCell label="Hire Date" sort={sort} sortKey="hireDate" onClick={() => toggleSort('hireDate')} />
                    <HeaderCell label="Actions" center />
                  </div>

                  {/* ROWS */}
                  {paged.map((e, i) => (
                    <div
                      key={e.id}
                      className="grid grid-cols-[50px_120px_1.5fr_1fr_1fr_1fr_1fr_1fr_1fr_110px] border-b hover:bg-muted/30 transition"
                    >
                      <Cell muted>{(page - 1) * pageSize + i + 1}</Cell>
                      <Cell>{e.code}</Cell>
                      <Cell bold>{e.name}</Cell>
                      <Cell>{e.phone || '—'}</Cell>
                      <Cell>{e.cid || '—'}</Cell>
                      <Cell right>{formatMoney(e.salaryService)}</Cell>
                      <Cell right>{formatMoney(e.salaryBar)}</Cell>
                      <Cell>{formatDate(e.dob)}</Cell>
                      <Cell>{formatDate(e.hireDate)}</Cell>

                      <div className="px-3 py-2 flex justify-center gap-2">
                        <IconBtn onClick={() => navigate(`/employees/${e.id}/edit`)}>
                          <Pencil size={14} />
                        </IconBtn>
                        <IconBtn danger onClick={() => setDeleteTarget(e)}>
                          <Trash2 size={14} />
                        </IconBtn>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* FOOTER */}
            <div className="grid grid-cols-3 items-center pt-4 text-sm">
              {/* LEFT: SHOW ENTRIES */}
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span className="whitespace-nowrap">Show</span>

                <Select
                  value={String(pageSize)}
                  onValueChange={v => setPageSize(Number(v))}
                >
                  <SelectTrigger
                    className="
        h-7 w-[56px] 
        px-2 text-xs 
        rounded-md
      "
                  >
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    {[5, 10, 25, 50].map(v => (
                      <SelectItem key={v} value={String(v)} className="text-xs">
                        {v}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <span className="whitespace-nowrap">entries</span>
              </div>


              {/* CENTER: PAGINATION */}
              <div className="flex items-center justify-center gap-1">
                <PageBtn
                  disabled={page === 1}
                  onClick={() => setPage(p => p - 1)}
                >
                  <ChevronLeft size={16} />
                </PageBtn>

                {Array.from({ length: totalPages }).map((_, i) => (
                  <PageBtn
                    key={i}
                    active={page === i + 1}
                    onClick={() => setPage(i + 1)}
                  >
                    {i + 1}
                  </PageBtn>
                ))}

                <PageBtn
                  disabled={page === totalPages}
                  onClick={() => setPage(p => p + 1)}
                >
                  <ChevronRight size={16} />
                </PageBtn>
              </div>

              {/* RIGHT: SUMMARY */}
              <div className="text-right text-muted-foreground">
                Showing{' '}
                <span className="font-medium text-foreground">
                  {(page - 1) * pageSize + 1}
                </span>
                –
                <span className="font-medium text-foreground">
                  {Math.min(page * pageSize, sorted.length)}
                </span>{' '}
                of{' '}
                <span className="font-medium text-foreground">
                  {sorted.length}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* ===== DELETE CONFIRM (SHADCN) ===== */}
      <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete employee</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete{' '}
              <span className="font-semibold">
                {deleteTarget?.name}
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteTarget(null)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

/* ================= SMALL COMPONENTS ================= */

function HeaderCell<T>({
  label,
  sort,
  sortKey,
  right,
  center,
  onClick,
}: {
  label: string
  sort?: SortState<T> | null
  sortKey?: keyof T
  right?: boolean
  center?: boolean
  onClick?: () => void
}) {
  const active = sort && sortKey && sort.key === sortKey

  return (
    <div
      onClick={onClick}
      className={`px-3 py-3 text-sm font-semibold flex items-center gap-1
        ${onClick ? 'cursor-pointer hover:bg-muted' : ''}
        ${right ? 'justify-end text-right' : ''}
        ${center ? 'justify-center text-center' : ''}`}
    >
      {label}
      {active &&
        (sort!.direction === 'asc'
          ? <ArrowUp size={12} />
          : <ArrowDown size={12} />)}
    </div>
  )
}

function Cell({
  children,
  right,
  bold,
  muted,
}: {
  children: React.ReactNode
  right?: boolean
  bold?: boolean
  muted?: boolean
}) {
  return (
    <div
      className={`px-3 py-2 text-sm
        ${right ? 'text-right' : ''}
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
        ${danger
          ? 'hover:bg-destructive hover:text-destructive-foreground'
          : 'hover:bg-primary hover:text-primary-foreground'}`}
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
      className={`h-8 min-w-[32px] px-2 rounded-md border text-sm
        transition-colors
        ${active
          ? 'bg-primary text-primary-foreground'
          : 'hover:bg-muted'}
        disabled:opacity-40 disabled:pointer-events-none`}
    >
      {children}
    </button>
  )
}
