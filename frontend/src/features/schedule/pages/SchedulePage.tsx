import { useState, useEffect, useMemo } from 'react'
import { useSchedule } from '../hooks/useSchedule'
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Badge } from '@/shared/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui/tabs'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/shared/components/ui/dialog'
import { Label } from '@/shared/components/ui/label'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/shared/components/ui/select'
import { CheckCircle, XCircle, Plus, Clock } from 'lucide-react'
import { formatDate } from '@/shared/utils/format'
import { DataTable } from '@/shared/components/ui/data-table'
import type { ColumnDef } from '@tanstack/react-table'
import { useEmployee } from '@/features/employees/hooks/useEmployee'
import { usePosition } from '@/features/positions/hooks/usePosition'

export default function SchedulePage() {
    const {
        schedules,
        requests,
        loading: scheduleLoading,
        loadSchedule,
        loadRequests,
        createRequest,
        approveRequest,
    } = useSchedule()
    const { employees, loading: empLoading } = useEmployee()
    const { positions, loading: posLoading } = usePosition()
    const loading = scheduleLoading || empLoading || posLoading

    const [date, setDate] = useState(new Date().toISOString().slice(0, 10))
    const [activeTab, setActiveTab] = useState('schedule')

    // Load data when date or tab changes
    useEffect(() => {
        if (activeTab === 'schedule') {
            loadSchedule(date)
        } else {
            loadRequests(date)
        }
    }, [date, activeTab, loadSchedule, loadRequests])

    /* ================= CREATE REQUEST DIALOG ================= */
    const [openRequest, setOpenRequest] = useState(false)
    const [reqEmployeeId, setReqEmployeeId] = useState('')
    const [reqShiftId, setReqShiftId] = useState('')
    const [reqDate, setReqDate] = useState(date)

    const handleCreateRequest = async () => {
        if (!reqEmployeeId || !reqShiftId) return
        await createRequest({
            employeeId: Number(reqEmployeeId),
            shiftId: Number(reqShiftId),
            workDate: reqDate,
        })
        setOpenRequest(false)
        loadRequests(date)
    }

    const allSlifts = useMemo(() => {
        return positions.flatMap(p => (p.shifts || []).map(s => ({ ...s, positionName: p.name })))
    }, [positions])

    /* ================= COLUMNS ================= */
    const scheduleColumns = useMemo<ColumnDef<any>[]>(() => [
        {
            accessorKey: "employeeName",
            header: "Employee",
            cell: ({ row }) => <div className="font-medium text-slate-900 dark:text-slate-100">{row.getValue("employeeName")}</div>
        },
        {
            accessorKey: "shiftName",
            header: "Shift",
            cell: ({ row }) => (
                <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3 text-slate-400" />
                    <span>{row.getValue("shiftName")}</span>
                </div>
            )
        },
        {
            id: "status",
            header: "Status",
            cell: () => <Badge variant="outline" className="text-slate-800 border-slate-200 bg-slate-50">Scheduled</Badge>
        }
    ], [])

    const requestColumns = useMemo<ColumnDef<any>[]>(() => [
        {
            accessorKey: "employeeName",
            header: "Employee",
            cell: ({ row }) => <div className="font-medium text-slate-900 dark:text-slate-100">{row.getValue("employeeName")}</div>
        },
        {
            accessorKey: "workDate",
            header: "Date",
            cell: ({ row }) => <span className="text-sm text-slate-500">{formatDate(row.getValue("workDate"))}</span>
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => {
                const status = row.getValue("status") as string
                return (
                    <Badge
                        className={
                            status === 'approved'
                                ? 'bg-slate-100 text-black border-slate-200 shadow-sm'
                                : status === 'rejected'
                                    ? 'bg-red-500/10 text-red-600 border-red-500/20'
                                    : 'bg-amber-500/10 text-amber-600 border-amber-500/20'
                        }
                        variant="secondary"
                    >
                        {status}
                    </Badge>
                )
            }
        },
        {
            accessorKey: "note",
            header: "Note",
            cell: ({ row }) => <span className="text-xs italic text-slate-400">{row.getValue("note") || "—"}</span>
        },
        {
            id: "actions",
            header: () => <div className="text-right">Actions</div>,
            cell: ({ row }) => {
                const status = row.original.status
                if (status !== 'pending') return null
                return (
                    <div className="flex justify-end gap-1">
                        <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                            onClick={() => approveRequest({ requestId: row.original.requestId, isApproved: true })}
                        >
                            <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                            onClick={() => approveRequest({ requestId: row.original.requestId, isApproved: false })}
                        >
                            <XCircle className="h-4 w-4" />
                        </Button>
                    </div>
                )
            }
        }
    ], [approveRequest])

    return (
        <div className="space-y-6">
            {/* HEADER */}
            <div className="flex flex-wrap items-end justify-between gap-4 px-2">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter leading-none">
                        Schedule
                    </h1>
                    <p className="mt-1 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                        Shift_Operations
                    </p>
                </div>

                <div className="flex items-center gap-2">
                    <Input
                        type="date"
                        value={date}
                        onChange={e => setDate(e.target.value)}
                        className="w-40 h-10 border-slate-200 dark:border-neutral-800 rounded-lg"
                    />
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="flex items-center justify-between mb-4">
                    <TabsList className="bg-slate-100/50 dark:bg-neutral-900/50 border">
                        <TabsTrigger value="schedule" className="data-[state=active]:bg-white data-[state=active]:text-black dark:data-[state=active]:bg-black dark:data-[state=active]:text-white">Daily Schedule</TabsTrigger>
                        <TabsTrigger value="requests" className="data-[state=active]:bg-white data-[state=active]:text-black dark:data-[state=active]:bg-black dark:data-[state=active]:text-white">Shift Requests</TabsTrigger>
                    </TabsList>

                    <Dialog open={openRequest} onOpenChange={setOpenRequest}>
                        <DialogTrigger asChild>
                            <Button className="bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-neutral-200 border-none h-10 px-6 rounded-lg font-bold uppercase tracking-widest text-[10px]">
                                <Plus className="mr-2 h-4 w-4" />
                                Request Shift
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Request a Shift</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                    <Label>Date</Label>
                                    <Input
                                        type="date"
                                        value={reqDate}
                                        onChange={e => setReqDate(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Employee</Label>
                                    <Select value={reqEmployeeId} onValueChange={setReqEmployeeId}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Employee" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {employees.map(e => (
                                                <SelectItem key={e.id} value={String(e.id)}>
                                                    {e.name} ({e.code})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label>Shift</Label>
                                    <Select value={reqShiftId} onValueChange={setReqShiftId}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Shift" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {allSlifts.map(s => (
                                                <SelectItem key={s.id} value={String(s.id)}>
                                                    {s.positionName} - {s.name} ({s.startTime} - {s.endTime})
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <Button onClick={handleCreateRequest} className="w-full bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-slate-200 uppercase font-black text-[10px] tracking-[0.2em] py-6 rounded-xl">
                                    Submit Schedule Request
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* ===== TAB: SCHEDULE ===== */}
                <TabsContent value="schedule" className="space-y-4">
                    <Card className="border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm overflow-hidden">
                        <CardHeader className="bg-slate-50/50 dark:bg-black/20 border-b border-slate-100 dark:border-neutral-800">
                            <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                Daily Lineup for {formatDate(date)}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <DataTable
                                columns={scheduleColumns}
                                data={schedules}
                                loading={loading}
                                searchKey="employeeName"
                            />
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* ===== TAB: REQUESTS ===== */}
                <TabsContent value="requests" className="space-y-4">
                    <Card className="border border-slate-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm overflow-hidden">
                        <CardHeader className="bg-slate-50/50 dark:bg-black/20 border-b border-slate-100 dark:border-neutral-800">
                            <CardTitle className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                Pending Requests
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <DataTable
                                columns={requestColumns}
                                data={requests}
                                loading={loading}
                                searchKey="employee.name"
                            />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
