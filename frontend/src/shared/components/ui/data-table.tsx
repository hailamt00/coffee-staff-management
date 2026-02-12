import * as React from "react"
import { useState } from 'react'
import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    getFilteredRowModel,
    ExpandedState,
    getExpandedRowModel,
} from '@tanstack/react-table'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/shared/components/ui/table'
import { Pagination } from '@/shared/components/ui/pagination'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shared/components/ui/select'
import { Search, SlidersHorizontal } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    searchKey?: string
    loading?: boolean
    renderSubComponent?: (props: { row: any }) => React.ReactNode
    getRowCanExpand?: (row: any) => boolean
}

export const DataTable = <TData, TValue>({
    columns,
    data,
    searchKey,
    loading = false,
    renderSubComponent,
    getRowCanExpand,
}: DataTableProps<TData, TValue>) => {
    const [sorting, setSorting] = useState<SortingState>([])
    const [globalFilter, setGlobalFilter] = useState('')
    const [expanded, setExpanded] = useState<ExpandedState>({})
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    })

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onGlobalFilterChange: setGlobalFilter,
        getFilteredRowModel: getFilteredRowModel(),
        onPaginationChange: setPagination,
        onExpandedChange: setExpanded,
        getExpandedRowModel: getExpandedRowModel(),
        getRowCanExpand,
        state: {
            sorting,
            globalFilter,
            pagination,
            expanded,
        },
    })

    const totalRows = table.getFilteredRowModel().rows.length
    const pageIndex = table.getState().pagination.pageIndex
    const pageSize = table.getState().pagination.pageSize
    const startRow = pageIndex * pageSize + 1
    const endRow = Math.min((pageIndex + 1) * pageSize, totalRows)

    return (
        <div className="space-y-4">
            {/* TOOLBAR */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between bg-slate-50/50 dark:bg-neutral-900/30 p-3 rounded-2xl border border-slate-200 dark:border-neutral-800 backdrop-blur-sm shadow-sm transition-all focus-within:shadow-md">
                <div className="flex items-center gap-4 pl-2">
                    <div className="h-9 w-9 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black shadow-lg">
                        <SlidersHorizontal size={14} />
                    </div>
                    <div className="flex items-center gap-3">
                        <Label htmlFor="pageSize" className="text-[11px] font-bold uppercase text-slate-500 tracking-widest cursor-pointer">Entry /</Label>
                        <Select
                            value={`${table.getState().pagination.pageSize}`}
                            onValueChange={(value) => {
                                table.setPageSize(Number(value))
                            }}
                        >
                            <SelectTrigger id="pageSize" className="h-8 w-[65px] text-xs font-black border-none bg-transparent hover:bg-slate-200/50 dark:hover:bg-white/5 rounded-lg transition-colors">
                                <SelectValue placeholder={table.getState().pagination.pageSize} />
                            </SelectTrigger>
                            <SelectContent side="top">
                                {[5, 10, 20, 50].map((pageSize) => (
                                    <SelectItem key={pageSize} value={`${pageSize}`} className="text-xs">
                                        {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                {searchKey && (
                    <div className="relative group flex-1 max-w-sm">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" />
                        <Input
                            id="globalSearch"
                            aria-label="Search data"
                            placeholder="Type to filter data..."
                            value={globalFilter ?? ''}
                            onChange={(event) => setGlobalFilter(event.target.value)}
                            className="h-11 w-full border-none bg-white dark:bg-black rounded-xl pl-11 pr-5 text-[13px] font-semibold focus:ring-1 focus:ring-black dark:focus:ring-white shadow-inner transition-all"
                        />
                    </div>
                )}
            </div>

            {/* TABLE */}
            <div className="rounded-md border bg-white dark:bg-black overflow-hidden">
                <Table>
                    <TableHeader className="bg-slate-50 dark:bg-neutral-900/50">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="hover:bg-transparent border-b">
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="font-black uppercase text-[10px] text-slate-500 tracking-wider h-12 py-0">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        <AnimatePresence>
                            {loading ? (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="h-10 w-10 border-4 border-slate-200 border-t-black dark:border-neutral-800 dark:border-t-white rounded-full animate-spin" />
                                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-[0.2em] animate-pulse">Syncing...</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row, i) => (
                                    <React.Fragment key={row.id}>
                                        <motion.tr
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="group border-b last:border-0 even:bg-slate-50/30 dark:even:bg-white/[0.02] hover:bg-slate-50/80 dark:hover:bg-neutral-800/40 transition-colors"
                                        >
                                            {row.getVisibleCells().map((cell) => (
                                                <TableCell key={cell.id} className="py-4 px-4 text-xs font-semibold first:pl-6 last:pr-6 whitespace-nowrap">
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </TableCell>
                                            ))}
                                        </motion.tr>
                                        {row.getIsExpanded() && renderSubComponent && (
                                            <TableRow>
                                                <TableCell colSpan={row.getVisibleCells().length} className="p-0 bg-slate-50/30 dark:bg-white/[0.01]">
                                                    {renderSubComponent({ row })}
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </React.Fragment>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-32 text-center">
                                        <div className="flex flex-col items-center gap-1">
                                            <Search className="h-8 w-8 text-slate-200 mb-2" />
                                            <p className="font-black text-slate-900 dark:text-white uppercase tracking-tighter">Zero results found</p>
                                            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Adjust your filters</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}
                        </AnimatePresence>
                    </TableBody>
                </Table>
            </div>

            {/* PAGINATION */}
            <div className="flex items-center justify-between px-2 pt-4 border-t border-slate-100 dark:border-neutral-800">
                <div className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                    {totalRows > 0 ? (
                        <>Record {startRow} - {endRow} / TR {totalRows}</>
                    ) : 'No entries'}
                </div>

                <Pagination
                    page={table.getState().pagination.pageIndex + 1}
                    totalPages={table.getPageCount() || 1}
                    onPageChange={(p) => table.setPageIndex(p - 1)}
                />
            </div>
        </div>
    )
}
