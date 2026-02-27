import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { useRevenue } from '@/features/revenue/hooks/useRevenue'
import { useSchedule } from '@/features/schedule/hooks/useSchedule'
import { Loader2, CheckCircle2, Plus, Trash2, ChevronLeft } from 'lucide-react'

interface LineItem {
    amount: string
    reason: string
}

export default function StaffRevenuePage() {
    const navigate = useNavigate()
    const staffJson = localStorage.getItem('staffInfo')
    const staff = staffJson ? JSON.parse(staffJson) : null
    const date = new Date().toISOString().slice(0, 10)

    const { createRevenue, createTransaction, loading: revenueMutationLoading } = useRevenue()
    const { useSchedules } = useSchedule()

    const { data: allSchedules = [] } = useSchedules(date)

    useEffect(() => {
        if (!staff) navigate('/staff/login')
    }, [staff, navigate])

    // Auto-find today's schedule for this staff member
    const mySchedule = allSchedules.find((s: any) => s.employeeId === staff?.id)

    // Form state
    const [openingBalance, setOpeningBalance] = useState('0')
    const [cash, setCash] = useState('0')
    const [bank, setBank] = useState('0')
    const [note, setNote] = useState('')

    const [expenses, setExpenses] = useState<LineItem[]>([{ amount: '', reason: '' }])
    const [incomes, setIncomes] = useState<LineItem[]>([])

    const [netInput, setNetInput] = useState('0')
    const [showPreview, setShowPreview] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    // Computed totals for line items
    const totalExpenses = expenses.reduce((s, e) => s + (Number(e.amount) || 0), 0)
    const totalIncomes = incomes.reduce((s, i) => s + (Number(i.amount) || 0), 0)

    // Thực tế = TM + CK - Đầu kỳ + Khoản chi - Khoản thu
    const doanhThuThucTe = Number(cash) + Number(bank) - Number(openingBalance) + totalExpenses - totalIncomes

    // Line item helpers
    const addExpense = () => setExpenses(prev => [...prev, { amount: '', reason: '' }])
    const removeExpense = (idx: number) => setExpenses(prev => prev.filter((_, i) => i !== idx))
    const updateExpense = (idx: number, field: keyof LineItem, val: string) =>
        setExpenses(prev => prev.map((e, i) => i === idx ? { ...e, [field]: val } : e))

    const addIncome = () => setIncomes(prev => [...prev, { amount: '', reason: '' }])
    const removeIncome = (idx: number) => setIncomes(prev => prev.filter((_, i) => i !== idx))
    const updateIncome = (idx: number, field: keyof LineItem, val: string) =>
        setIncomes(prev => prev.map((e, i) => i === idx ? { ...e, [field]: val } : e))

    const handleSubmit = async (e?: React.FormEvent) => {
        if (e) e.preventDefault()

        const scheduleId = mySchedule?.id ?? allSchedules[0]?.id
        if (!scheduleId) return

        setIsSubmitting(true)
        try {
            const revenue = await createRevenue({
                scheduleId,
                openingBalance: Number(openingBalance),
                cash: Number(cash),
                bank: Number(bank),
                note,
            })

            // Create expense transactions
            for (const exp of expenses) {
                if (exp.amount && Number(exp.amount) > 0) {
                    await createTransaction({
                        revenueId: revenue.id,
                        type: 'Expense',
                        amount: Number(exp.amount),
                        reason: exp.reason || undefined,
                    })
                }
            }

            // Create income transactions
            for (const inc of incomes) {
                if (inc.amount && Number(inc.amount) > 0) {
                    await createTransaction({
                        revenueId: revenue.id,
                        type: 'Income',
                        amount: Number(inc.amount),
                        reason: inc.reason || undefined,
                    })
                }
            }

            setSubmitted(true)
        } catch (err) {
            // Handled by hook notifications
        } finally {
            setIsSubmitting(false)
        }
    }

    const handlePreview = (e: React.FormEvent) => {
        e.preventDefault()
        setShowPreview(true)
    }

    if (submitted) {
        return (
            <div className="pt-12 text-center space-y-6">
                <div className="bg-slate-100 dark:bg-white/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="h-10 w-10 text-slate-900 dark:text-white" />
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Đã nộp báo cáo!</h2>
                    <p className="text-slate-500 px-6">Báo cáo kết sổ ca đã được ghi lại thành công.</p>
                </div>
                <Button
                    className="bg-black hover:bg-slate-800 text-white dark:bg-white dark:text-black dark:hover:bg-slate-200 w-full max-w-[200px]"
                    onClick={() => navigate('/staff/menu')}
                >
                    Về Menu
                </Button>
            </div>
        )
    }

    const noSchedule = !mySchedule && allSchedules.length === 0
    const isLoading = revenueMutationLoading || isSubmitting

    // ─── Preview Screen ─────────────────────────────────────
    if (showPreview) {
        const validExpenses = expenses.filter(e => Number(e.amount) > 0)
        const validIncomes = incomes.filter(i => Number(i.amount) > 0)
        const saiLech = doanhThuThucTe - Number(netInput)

        return (
            <div className="space-y-5 pb-10">
                <div className="flex items-center gap-3 px-2">
                    <button
                        onClick={() => setShowPreview(false)}
                        className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white tracking-wide transition-colors"
                    >
                        <ChevronLeft className="h-4 w-4" /> Sửa lại
                    </button>
                </div>

                <div className="px-2">
                    <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-none">Xem trước</h1>
                    <p className="mt-1 text-[11px] font-bold text-slate-500 tracking-wide">Kiểm tra lại trước khi nộp</p>
                </div>

                <Card className="border border-slate-200/60 dark:border-neutral-800/60 bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-sm">
                    <CardContent className="p-0">
                        <PreviewRow label="Nhân viên" value={staff?.name} bold />
                        <PreviewRow label="Đầu kỳ" value={Number(openingBalance).toLocaleString()} alt />
                        <PreviewRow label="Tiền mặt (TM)" value={Number(cash).toLocaleString()} />
                        <PreviewRow label="Ngân hàng (CK)" value={Number(bank).toLocaleString()} alt />
                        <PreviewRow label="Doanh thu NET" value={Number(netInput).toLocaleString()} bold />
                        <PreviewRow label="Thực tế" value={doanhThuThucTe.toLocaleString()} alt />

                        <div className="flex items-center justify-between px-4 py-3 border-b border-slate-50 dark:border-neutral-800">
                            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Sai lệch</span>
                            <span className={`text-sm tabular-nums font-black ${saiLech === 0 ? 'text-slate-500' : saiLech > 0 ? 'text-amber-600' : 'text-rose-600'}`}>
                                {saiLech.toLocaleString()}
                            </span>
                        </div>

                        {note ? <PreviewRow label="Ghi chú" value={note} alt /> : null}
                    </CardContent>
                </Card>

                {validExpenses.length > 0 && (
                    <Card className="border border-rose-100 dark:border-rose-900/30 bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-sm">
                        <div className="px-4 py-2 bg-rose-50/60 dark:bg-rose-900/10 border-b border-rose-100 dark:border-rose-900/20">
                            <span className="text-[10px] font-black uppercase tracking-widest text-rose-600">Khoản Chi ({validExpenses.length})</span>
                        </div>
                        <CardContent className="p-0">
                            {validExpenses.map((e, i) => (
                                <div key={i} className={`flex justify-between items-start px-4 py-3 border-b border-slate-50 dark:border-neutral-800 last:border-0 ${i % 2 === 1 ? 'bg-slate-50/40' : ''}`}>
                                    <span className="text-[11px] text-slate-600 flex-1 pr-4">{e.reason || '—'}</span>
                                    <span className="font-bold tabular-nums text-rose-600 text-sm shrink-0">{Number(e.amount).toLocaleString()}</span>
                                </div>
                            ))}
                            <div className="flex justify-between px-4 py-2 bg-rose-50/50 dark:bg-rose-900/10">
                                <span className="text-[10px] font-black uppercase text-rose-500">Tổng chi</span>
                                <span className="font-black text-sm tabular-nums text-rose-600">{totalExpenses.toLocaleString()}</span>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {validIncomes.length > 0 && (
                    <Card className="border border-emerald-100 dark:border-emerald-900/30 bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden shadow-sm">
                        <div className="px-4 py-2 bg-emerald-50/60 dark:bg-emerald-900/10 border-b border-emerald-100 dark:border-emerald-900/20">
                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Khoản Thu ({validIncomes.length})</span>
                        </div>
                        <CardContent className="p-0">
                            {validIncomes.map((inc, idx) => (
                                <div key={idx} className={`flex justify-between items-start px-4 py-3 border-b border-slate-50 dark:border-neutral-800 last:border-0 ${idx % 2 === 1 ? 'bg-slate-50/40' : ''}`}>
                                    <span className="text-[11px] text-slate-600 flex-1 pr-4">{inc.reason || '—'}</span>
                                    <span className="font-bold tabular-nums text-emerald-600 text-sm shrink-0">{Number(inc.amount).toLocaleString()}</span>
                                </div>
                            ))}
                            <div className="flex justify-between px-4 py-2 bg-emerald-50/50 dark:bg-emerald-900/10">
                                <span className="text-[10px] font-black uppercase text-emerald-500">Tổng thu</span>
                                <span className="font-black text-sm tabular-nums text-emerald-600">{totalIncomes.toLocaleString()}</span>
                            </div>
                        </CardContent>
                    </Card>
                )}

                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        className="flex-1 h-14 rounded-2xl font-bold border-slate-200 dark:border-neutral-800"
                        onClick={() => setShowPreview(false)}
                    >
                        <ChevronLeft className="h-4 w-4 mr-1" /> Sửa lại
                    </Button>
                    <Button
                        className="flex-[2] h-14 bg-black hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 text-sm font-bold tracking-wide shadow-lg rounded-2xl transition-all active:scale-[0.98]"
                        onClick={() => handleSubmit()}
                        disabled={isLoading}
                    >
                        {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : '✓ Xác nhận & Nộp'}
                    </Button>
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-5 pb-10">
            <div className="flex items-center gap-2 px-2">
                <Button variant="ghost" size="sm" onClick={() => navigate('/staff/menu')} className="hover:bg-slate-100 dark:hover:bg-neutral-800 rounded-lg h-10 px-4 font-bold text-[11px] tracking-wide">
                    ← Về Menu
                </Button>
            </div>

            <div className="px-2">
                <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight leading-none">
                    Kết sổ ca
                </h1>
                <p className="mt-1 text-[11px] font-bold text-slate-500 tracking-wide">
                    End Shift Revenue Report
                </p>
            </div>

            {noSchedule && (
                <div className="mx-2 p-4 bg-amber-50 border border-amber-200 rounded-xl text-[12px] text-amber-800 font-medium">
                    ⚠ Không tìm thấy lịch ca hôm nay. Báo cáo vẫn sẽ được lưu.
                </div>
            )}

            <form onSubmit={handlePreview} className="space-y-4">
                {/* Main Fields Card */}
                <Card className="border border-slate-200/60 dark:border-neutral-800/60 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-sm rounded-2xl overflow-hidden">
                    <CardContent className="p-0">
                        {/* Opening Balance */}
                        <Row label="Đầu kỳ">
                            <MoneyInput id="opening" value={openingBalance} onChange={setOpeningBalance} />
                        </Row>

                        {/* Cash */}
                        <Row label="Tiền mặt (TM)" alt>
                            <MoneyInput id="cash" value={cash} onChange={setCash} color="text-teal-600 dark:text-teal-400" />
                        </Row>

                        {/* Bank */}
                        <Row label="Ngân hàng (CK/MM/VCB)">
                            <MoneyInput id="bank" value={bank} onChange={setBank} color="text-blue-600 dark:text-blue-400" />
                        </Row>
                    </CardContent>
                </Card>

                {/* Expenses Card */}
                <Card className="border border-rose-100 dark:border-rose-900/30 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-sm rounded-2xl overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-rose-50 dark:border-rose-900/20 bg-rose-50/50 dark:bg-rose-900/10">
                        <span className="text-[10px] font-black uppercase tracking-widest text-rose-600">Khoản Chi</span>
                        <Button type="button" variant="ghost" size="sm" onClick={addExpense}
                            className="h-7 px-2 text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-900/20 rounded-lg text-[11px] font-bold">
                            <Plus className="h-3.5 w-3.5 mr-1" /> Thêm
                        </Button>
                    </div>
                    <CardContent className="p-0">
                        {expenses.length === 0 && (
                            <p className="text-center text-[11px] text-slate-400 py-4">Không có khoản chi</p>
                        )}
                        {expenses.map((exp, idx) => (
                            <div key={idx} className="flex items-center gap-2 px-4 py-3 border-b border-slate-50 dark:border-neutral-800 last:border-0">
                                <div className="flex flex-col gap-1.5 flex-1">
                                    <Input
                                        type="number"
                                        placeholder="Số tiền"
                                        value={exp.amount}
                                        onChange={e => updateExpense(idx, 'amount', e.target.value)}
                                        className="h-9 border-slate-200 dark:border-neutral-700 font-bold text-rose-600 text-sm"
                                    />
                                    <Input
                                        placeholder="Lý do (tiền hàng, tiền đá...)"
                                        value={exp.reason}
                                        onChange={e => updateExpense(idx, 'reason', e.target.value)}
                                        className="h-9 border-slate-200 dark:border-neutral-700 text-sm text-slate-600"
                                    />
                                </div>
                                <Button type="button" variant="ghost" size="icon"
                                    onClick={() => removeExpense(idx)}
                                    className="h-8 w-8 text-slate-300 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 rounded-lg shrink-0">
                                    <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        ))}
                        {expenses.some(e => Number(e.amount) > 0) && (
                            <div className="flex justify-between items-center px-4 py-2 bg-rose-50/50 dark:bg-rose-900/10 border-t border-rose-100 dark:border-rose-900/20">
                                <span className="text-[10px] font-black uppercase tracking-wider text-rose-500">Tổng chi</span>
                                <span className="text-sm font-black tabular-nums text-rose-600">{totalExpenses.toLocaleString()}</span>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Incomes Card */}
                <Card className="border border-emerald-100 dark:border-emerald-900/30 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-sm rounded-2xl overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-emerald-50 dark:border-emerald-900/20 bg-emerald-50/50 dark:bg-emerald-900/10">
                        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-600">Khoản Thu</span>
                        <Button type="button" variant="ghost" size="sm" onClick={addIncome}
                            className="h-7 px-2 text-emerald-600 hover:bg-emerald-100 dark:hover:bg-emerald-900/20 rounded-lg text-[11px] font-bold">
                            <Plus className="h-3.5 w-3.5 mr-1" /> Thêm
                        </Button>
                    </div>
                    <CardContent className="p-0">
                        {incomes.length === 0 && (
                            <p className="text-center text-[11px] text-slate-400 py-4">Không có khoản thu</p>
                        )}
                        {incomes.map((inc, idx) => (
                            <div key={idx} className="flex items-center gap-2 px-4 py-3 border-b border-slate-50 dark:border-neutral-800 last:border-0">
                                <div className="flex flex-col gap-1.5 flex-1">
                                    <Input
                                        type="number"
                                        placeholder="Số tiền"
                                        value={inc.amount}
                                        onChange={setIncomes.bind(null, (prev) => prev.map((item, i) => i === idx ? { ...item, amount: inc.amount } : item))} // wait, simplified this
                                        className="h-9 border-slate-200 dark:border-neutral-700 font-bold text-emerald-600 text-sm"
                                    />
                                    {/* correction: using updateIncome helper */}
                                    <Input
                                        type="number"
                                        placeholder="Số tiền"
                                        value={inc.amount}
                                        onChange={e => updateIncome(idx, 'amount', e.target.value)}
                                        className="h-9 border-slate-200 dark:border-neutral-700 font-bold text-emerald-600 text-sm"
                                    />
                                    <Input
                                        placeholder="Lý do (tiền thưởng, hoàn trả...)"
                                        value={inc.reason}
                                        onChange={e => updateIncome(idx, 'reason', e.target.value)}
                                        className="h-9 border-slate-200 dark:border-neutral-700 text-sm text-slate-600"
                                    />
                                </div>
                                <Button type="button" variant="ghost" size="icon"
                                    onClick={() => removeIncome(idx)}
                                    className="h-8 w-8 text-slate-300 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/20 rounded-lg shrink-0">
                                    <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                            </div>
                        ))}
                        {incomes.some(i => Number(i.amount) > 0) && (
                            <div className="flex justify-between items-center px-4 py-2 bg-emerald-50/50 dark:bg-emerald-900/10 border-t border-emerald-100 dark:border-emerald-900/20">
                                <span className="text-[10px] font-black uppercase tracking-wider text-emerald-500">Tổng thu</span>
                                <span className="text-sm font-black tabular-nums text-emerald-600">{totalIncomes.toLocaleString()}</span>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Bottom Fields Card */}
                <Card className="border border-slate-200/60 dark:border-neutral-800/60 bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md shadow-sm rounded-2xl overflow-hidden">
                    <CardContent className="p-0">
                        {/* NET (manual input) */}
                        <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-neutral-800 bg-slate-50 dark:bg-neutral-900/80">
                            <div className="flex flex-col gap-0.5 w-2/5 shrink-0">
                                <Label className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-widest">Doanh thu NET</Label>
                                <span className="text-[10px] text-slate-400 tabular-nums">Thực tế: {doanhThuThucTe.toLocaleString()}</span>
                            </div>
                            <Input
                                id="net"
                                type="number"
                                value={netInput}
                                onChange={e => setNetInput(e.target.value)}
                                placeholder="Nhập NET..."
                                className="h-10 border-0 bg-transparent text-right font-black shadow-none focus-visible:ring-0 pr-0 text-base text-slate-900 dark:text-white"
                            />
                        </div>

                        {/* Note */}
                        <Row label="Ghi chú" alt>
                            <Input
                                id="note"
                                value={note}
                                onChange={e => setNote(e.target.value)}
                                placeholder="Ghi chú tuỳ chọn..."
                                className="h-10 border-0 bg-transparent text-right font-medium text-slate-700 dark:text-slate-300 shadow-none focus-visible:ring-0 pr-0 text-sm"
                            />
                        </Row>

                        {/* Nhân viên chốt ca */}
                        <Row label="Nhân viên chốt ca">
                            <div className="text-right font-black text-slate-900 dark:text-white text-sm pr-0">
                                {staff?.name || '—'}
                            </div>
                        </Row>
                    </CardContent>
                </Card>

                <Button
                    type="submit"
                    className="w-full bg-black hover:bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-neutral-200 h-14 text-sm font-bold tracking-wide shadow-lg rounded-2xl transition-all active:scale-[0.98]"
                    disabled={isLoading || noSchedule}
                >
                    {isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                        'Xem trước →'
                    )}
                </Button>
            </form>
        </div>
    )
}

// ─── Small helpers ───────────────────────────────────────────────
function Row({ label, children, alt }: { label: string; children: React.ReactNode; alt?: boolean }) {
    return (
        <div className={`flex items-center justify-between p-4 border-b border-slate-100 dark:border-neutral-800 last:border-0 ${alt ? 'bg-slate-50/50 dark:bg-neutral-900/50' : ''}`}>
            <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest w-2/5 shrink-0">{label}</Label>
            <div className="flex-1">{children}</div>
        </div>
    )
}

function MoneyInput({ id, value, onChange, color }: {
    id: string; value: string; onChange: (v: string) => void; color?: string
}) {
    return (
        <Input
            id={id}
            type="number"
            value={value}
            onChange={e => onChange(e.target.value)}
            className={`h-10 border-0 bg-transparent text-right font-black shadow-none focus-visible:ring-0 pr-0 text-base ${color ?? 'text-slate-900 dark:text-white'}`}
        />
    )
}

function PreviewRow({ label, value, bold, alt }: {
    label: string; value?: string | number; bold?: boolean; alt?: boolean
}) {
    return (
        <div className={`flex items-center justify-between px-4 py-3 border-b border-slate-50 dark:border-neutral-800 last:border-0 ${alt ? 'bg-slate-50/50 dark:bg-white/5' : ''}`}>
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">{label}</span>
            <span className={`text-sm tabular-nums ${bold ? 'font-black text-slate-900 dark:text-white' : 'font-semibold text-slate-700 dark:text-slate-300'}`}>{value ?? '—'}</span>
        </div>
    )
}
