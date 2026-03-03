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
    TableFooter,
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
import { ArrowDown, ArrowUp, ArrowUpDown, Search, SlidersHorizontal } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
    searchKey?: string
    loading?: boolean
    defaultPageSize?: number
    searchPosition?: 'top' | 'bottom'
    renderSubComponent?: (props: { row: any }) => React.ReactNode
    getRowCanExpand?: (row: any) => boolean
    showFooter?: boolean
    hideToolbar?: boolean
    initialSorting?: SortingState
}

export const DataTable = <TData, TValue>({
    columns,
    data,
    searchKey,
    loading = false,
    defaultPageSize = 10,
    searchPosition = 'top',
    renderSubComponent,
    getRowCanExpand,
    showFooter = false,
    hideToolbar = false,
    initialSorting = [],
}: DataTableProps<TData, TValue>) => {
    const [sorting, setSorting] = useState<SortingState>(initialSorting)
    const [globalFilter, setGlobalFilter] = useState('')
    const [expanded, setExpanded] = useState<ExpandedState>({})
    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: defaultPageSize,
    })

    // eslint-disable-next-line react-hooks/incompatible-library
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
            {!hideToolbar && (
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-slate-50/50 dark:bg-neutral-900/30 p-4 rounded-2xl border border-slate-200 dark:border-neutral-800 backdrop-blur-sm shadow-sm transition-all focus-within:shadow-md">
                    <div className="flex items-center justify-between sm:justify-start gap-4 w-full sm:w-auto">
                        <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-black dark:bg-white flex items-center justify-center text-white dark:text-black shadow-lg shrink-0">
                                <SlidersHorizontal size={14} />
                            </div>
                            <div className="flex items-center gap-2">
                                <Label htmlFor="pageSize" className="text-[10px] font-bold uppercase text-slate-500 tracking-wider cursor-pointer">Show</Label>
                                <Select
                                    value={`${table.getState().pagination.pageSize}`}
                                    onValueChange={(value) => {
                                        table.setPageSize(Number(value))
                                    }}
                                >
                                    <SelectTrigger id="pageSize" className="h-8 w-[65px] text-xs font-black border-none bg-white dark:bg-neutral-800 rounded-lg shadow-sm hover:shadow-md transition-all">
                                        <SelectValue placeholder={table.getState().pagination.pageSize} />
                                    </SelectTrigger>
                                    <SelectContent side="top">
                                        {[5, 10, 20, 50, 100].map((pageSize) => (
                                            <SelectItem key={pageSize} value={`${pageSize}`} className="text-xs">
                                                {pageSize}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {searchKey && searchPosition === 'top' && (
                            <div className="sm:hidden relative group">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" />
                                <Input
                                    aria-label="Search data"
                                    placeholder="Filter..."
                                    value={globalFilter ?? ''}
                                    onChange={(event) => setGlobalFilter(event.target.value)}
                                    className="h-10 w-28 bg-white dark:bg-black border-slate-200 dark:border-neutral-800 rounded-lg pl-9 pr-3 text-xs font-semibold focus:ring-1 focus:ring-black dark:focus:ring-white transition-all shadow-sm"
                                />
                            </div>
                        )}
                    </div>

                    {searchKey && searchPosition === 'top' && (
                        <div className="hidden sm:block relative group flex-1 max-w-sm">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" />
                            <Input
                                id="globalSearchTop"
                                aria-label="Search data"
                                placeholder="Type to filter data..."
                                value={globalFilter ?? ''}
                                onChange={(event) => setGlobalFilter(event.target.value)}
                                className="h-11 w-full border-none bg-white dark:bg-black rounded-xl pl-11 pr-5 text-[13px] font-semibold focus:ring-1 focus:ring-black dark:focus:ring-white shadow-inner transition-all"
                            />
                        </div>
                    )}
                </div>
            )}

            {/* TABLE / CARD VIEW */}
            <div className="rounded-2xl border border-slate-200 dark:border-neutral-800 bg-white/50 dark:bg-[#050505]/50 backdrop-blur-sm shadow-sm overflow-hidden">
                {/* Desktop Table View */}
                <div className="hidden md:block">
                    <Table>
                        <TableHeader className="bg-slate-50 dark:bg-neutral-900/50">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id} className="hover:bg-transparent border-b">
                                    {headerGroup.headers.map((header) => {
                                        const align = (header.column.columnDef.meta as any)?.align || 'left';
                                        return (
                                            <TableHead key={header.id} className={`font-black uppercase text-[10px] text-slate-500 tracking-wider h-12 py-0 px-6 ${align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left'}`}>
                                                {header.isPlaceholder ? null : header.column.getCanSort() ? (
                                                    <button
                                                        type="button"
                                                        onClick={header.column.getToggleSortingHandler()}
                                                        className={`w-full inline-flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors ${align === 'right' ? 'justify-end' : align === 'center' ? 'justify-center' : 'justify-start'}`}
                                                    >
                                                        <span className="inline-flex items-center">
                                                            {flexRender(
                                                                header.column.columnDef.header,
                                                                header.getContext()
                                                            )}
                                                        </span>
                                                        {!(header.column.columnDef.meta as any)?.hideSortIcon && (
                                                            header.column.getIsSorted() === 'asc' ? (
                                                                <ArrowUp className="h-3.5 w-3.5 shrink-0" />
                                                            ) : header.column.getIsSorted() === 'desc' ? (
                                                                <ArrowDown className="h-3.5 w-3.5 shrink-0" />
                                                            ) : (
                                                                <ArrowUpDown className="h-3.5 w-3.5 shrink-0 opacity-60" />
                                                            )
                                                        )}
                                                    </button>
                                                ) : (
                                                    <div className={`w-full flex items-center ${align === 'right' ? 'justify-end' : align === 'center' ? 'justify-center' : 'justify-start'}`}>
                                                        {flexRender(
                                                            header.column.columnDef.header,
                                                            header.getContext()
                                                        )}
                                                    </div>
                                                )}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            <AnimatePresence mode="popLayout">
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
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2, delay: i * 0.03 }}
                                                className="group border-b last:border-0 even:bg-slate-50/20 dark:even:bg-white/[0.01] hover:bg-slate-100/50 dark:hover:bg-neutral-800/40 transition-colors"
                                            >
                                                {row.getVisibleCells().map((cell) => {
                                                    const align = (cell.column.columnDef.meta as any)?.align || 'left';
                                                    const width = (cell.column.columnDef.meta as any)?.width;
                                                    return (
                                                        <TableCell key={cell.id} style={{ width }} className={`py-4 px-6 text-xs font-medium whitespace-nowrap ${align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left'}`}>
                                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                        </TableCell>
                                                    )
                                                })}
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
                        {showFooter && (
                            <TableFooter className="bg-slate-50 dark:bg-neutral-900/50">
                                {table.getFooterGroups().map((footerGroup) => (
                                    <TableRow key={footerGroup.id}>
                                        {footerGroup.headers.map((header) => {
                                            const align = (header.column.columnDef.meta as any)?.align || 'left';
                                            return (
                                                <TableCell key={header.id} className={`py-3 px-6 text-xs font-black border-t ${align === 'right' ? 'text-right' : align === 'center' ? 'text-center' : 'text-left'}`}>
                                                    {header.isPlaceholder
                                                        ? null
                                                        : flexRender(
                                                            header.column.columnDef.footer,
                                                            header.getContext()
                                                        )}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                ))}
                            </TableFooter>
                        )}
                    </Table>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden divide-y divide-slate-100 dark:divide-neutral-800">
                    <AnimatePresence mode="popLayout">
                        {loading ? (
                            <div className="p-12 text-center">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="h-10 w-10 border-4 border-slate-200 border-t-black dark:border-neutral-800 dark:border-t-white rounded-full animate-spin" />
                                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Loading...</span>
                                </div>
                            </div>
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row, i) => (
                                <motion.div
                                    key={row.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.2, delay: i * 0.03 }}
                                    className="p-5 space-y-4 hover:bg-slate-50/50 dark:hover:bg-neutral-800/20 transition-colors"
                                >
                                    {row.getVisibleCells().map((cell) => {
                                        const header = cell.column.columnDef.header
                                        const isAction = cell.column.id === 'actions' || String(header).toLowerCase().includes('action')

                                        if (isAction) return (
                                            <div key={cell.id} className="pt-2 border-t border-slate-100 dark:border-neutral-800 flex justify-end">
                                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                            </div>
                                        )

                                        return (
                                            <div key={cell.id} className="flex justify-between items-start gap-4">
                                                <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider pt-0.5">
                                                    {typeof header === 'string' ? header : cell.column.id}
                                                </span>
                                                <div className="text-xs font-bold text-slate-900 dark:text-white text-right">
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </div>
                                            </div>
                                        )
                                    })}
                                    {row.getIsExpanded() && renderSubComponent && (
                                        <div className="mt-4 p-4 rounded-xl bg-slate-50/50 dark:bg-white/[0.02] border border-slate-100 dark:border-neutral-800">
                                            {renderSubComponent({ row })}
                                        </div>
                                    )}
                                </motion.div>
                            ))
                        ) : (
                            <div className="p-12 text-center">
                                <Search className="h-8 w-8 text-slate-200 mx-auto mb-3" />
                                <p className="text-xs font-black text-slate-900 dark:text-white uppercase">No results</p>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* PAGINATION */}
            <div className="flex flex-col gap-4 pt-4 border-t border-slate-100 dark:border-neutral-800">
                {searchKey && searchPosition === 'bottom' && (
                    <div className="relative group w-full sm:max-w-sm">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-black dark:group-focus-within:text-white transition-colors" />
                        <Input
                            id="globalSearchBottom"
                            aria-label="Search data"
                            placeholder="Type to filter data..."
                            value={globalFilter ?? ''}
                            onChange={(event) => setGlobalFilter(event.target.value)}
                            className="h-11 w-full border border-slate-200 dark:border-neutral-800 bg-white dark:bg-black rounded-xl pl-11 pr-5 text-[13px] font-semibold focus:ring-1 focus:ring-black dark:focus:ring-white shadow-sm transition-all"
                        />
                    </div>
                )}

                <div className="flex items-center justify-between px-2">
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
        </div>
    )
}
