import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Button } from '@/shared/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { formatMoney } from '@/shared/utils/format'

export default function PayrollExportPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const data = location.state?.data || []
    const summaryData = location.state?.summaryData || []
    const startDate = location.state?.startDate || ''
    const endDate = location.state?.endDate || ''

    const [activePrintId, setActivePrintId] = useState<number | null>(null)

    useEffect(() => {
        const handleAfterPrint = () => setActivePrintId(null)
        window.addEventListener('afterprint', handleAfterPrint)
        return () => window.removeEventListener('afterprint', handleAfterPrint)
    }, [])

    const handlePrintAll = () => {
        setActivePrintId(null)
        setTimeout(() => window.print(), 100)
    }

    const handlePrintSlip = (id: number) => {
        setActivePrintId(id)
        setTimeout(() => {
            window.print()
        }, 150)
    }

    const formatTimeStr = (t: string) => {
        if (!t) return '--:--'
        const match = t.match(/(\d{2}:\d{2})/)
        return match ? match[1] : '--:--'
    }

    const formatNumber = (val: number) => {
        return formatMoney(val).replace(/\s?VNĐ$/, '')
    }

    if (!location.state) {
        return (
            <div className="p-10 text-center">
                <h2 className="text-xl font-bold mb-4">Không tìm thấy dữ liệu</h2>
                <Button onClick={() => navigate('/payroll')}>Quay lại Bảng lương</Button>
            </div>
        )
    }

    const employeeSlips = summaryData.map((summary: any) => ({
        summary,
        logs: data.filter((log: any) => log.employeeId === summary.employeeId)
            .sort((a: any, b: any) => new Date(a.workDate).getTime() - new Date(b.workDate).getTime())
    }))

    const GreenButtonStyle = "bg-[#28a745] hover:bg-[#218838] text-white border-none text-[11px] h-6 px-3 rounded-md font-medium transition-colors cursor-pointer"

    return (
        <div className="min-h-screen bg-white text-black font-sans leading-normal print:overflow-visible print:h-auto overflow-auto">
            <style dangerouslySetInnerHTML={{
                __html: `
        @media print {
          @page { margin: 15mm; size: auto; }
          
          html, body, #root, #root > div { 
            background: white !important; 
            margin: 0 !important; 
            padding: 0 !important;
            height: auto !important; 
            min-height: 0 !important;
            overflow: visible !important; 
            font-family: Arial, sans-serif !important; 
          }
          
          /* Force ALL containers to not scroll or clip */
          * { 
            overflow: visible !important; 
            height: auto !important; 
            min-height: 0 !important;
            max-height: none !important;
          }

          /* Explicitly hide scrollbars just in case browsers ignore the above */
          ::-webkit-scrollbar { display: none !important; }

          .no-print, .print-hidden, .print\\:hidden, nav, header, footer, aside, button, .back-btn-container { 
            display: none !important; 
            visibility: hidden !important;
          }
          
          .is-hidden-slip { 
            display: none !important; 
          }

          .no-page-break {
            page-break-after: auto !important;
            break-after: auto !important;
          }

          .page-break { 
            page-break-after: always !important; 
            display: block !important; 
          }
          
          * { 
            -webkit-print-color-adjust: exact !important; 
            print-color-adjust: exact !important; 
            box-shadow: none !important; 
          }
          
          .border-table, .border-table th, .border-table td { 
            border: 1px solid #dee2e6 !important; 
            border-collapse: collapse !important; 
          }
        }
        
        .border-table, .border-table th, .border-table td { border: 1px solid #dee2e6; border-collapse: collapse; }
        ::-webkit-scrollbar { display: none; }
        body { font-family: Arial, Helvetica, sans-serif; }
      `}} />

            {/* Global Actions Header */}
            <div className="no-print p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center gap-4">
                    <Button onClick={() => navigate('/payroll')} variant="ghost" size="icon" className="h-8 w-8 text-slate-400">
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <button onClick={handlePrintAll} className={GreenButtonStyle}>
                        PrintAll
                    </button>
                    <span className="text-[11px] text-slate-400 font-medium">Nhấn PrintAll để in tất cả, hoặc nhấn print tại mỗi bảng để in riêng.</span>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-4 pb-20 overflow-visible h-auto">
                {employeeSlips.map((slip: any, slipIdx: number) => {
                    const isTarget = activePrintId === null || activePrintId === slip.summary.employeeId
                    const isHidden = !isTarget

                    return (
                        <div
                            key={slip.summary.employeeId}
                            className={`slip-container relative py-8 ${isHidden ? 'is-hidden-slip' : ''} ${activePrintId === null && slipIdx < employeeSlips.length - 1 ? 'page-break' : 'no-page-break'} border-b border-dashed border-slate-200 print:border-none last:border-none overflow-visible h-auto`}
                        >
                            {/* Individual print button */}
                            <div className="no-print absolute top-4 right-0">
                                <button onClick={() => handlePrintSlip(slip.summary.employeeId)} className={GreenButtonStyle}>
                                    print
                                </button>
                            </div>

                            {/* Centered Title Section */}
                            <div className="text-center mb-6">
                                <h1 className="text-2xl font-normal leading-tight">Bảng lương nhân viên</h1>
                                <h2 className="text-xl font-normal">({slip.summary.employeeName}{slip.summary.phone ? ` - ${slip.summary.phone}` : ''})</h2>
                            </div>

                            {/* Info & Total Row */}
                            <div className="flex justify-between items-start mb-4 text-[14px]">
                                <div className="space-y-0.5">
                                    <p><span className="font-bold">Tổng giờ:</span> {slip.logs.reduce((acc: number, log: any) => acc + (log.hours || 0), 0).toFixed(2)}</p>
                                    <p><span className="font-bold">Lương:</span> {formatNumber(slip.summary.baseSalary)}</p>
                                    <p><span className="font-bold">Thưởng:</span> <span className="text-blue-600 font-bold">{slip.summary.rewards || 0}</span></p>
                                    <p><span className="font-bold">Phạt:</span> <span className="text-red-500 font-bold">{slip.summary.penalties || 0}</span></p>
                                </div>
                                <div className="text-right">
                                    <p className="text-slate-600 mb-1">From: <span className="italic">{startDate}</span> To: <span className="italic">{endDate}</span></p>
                                    <p className="text-2xl font-bold">Tổng lương: {formatNumber(slip.summary.total)}</p>
                                </div>
                            </div>

                            {/* Legacy Table */}
                            <div className="overflow-visible h-auto">
                                <table className="w-full border-table text-[14px]">
                                    <thead>
                                        <tr className="bg-slate-50/50">
                                            <th className="py-2 px-3 text-left font-bold w-[14%]">Ngày</th>
                                            <th className="py-2 px-3 text-left font-bold w-[14%]">Vị trí</th>
                                            <th className="py-2 px-3 text-left font-bold w-[20%]">Thời gian</th>
                                            <th className="py-2 px-3 text-left font-bold w-[12%]">Số giờ</th>
                                            <th className="py-2 px-3 text-left font-bold w-[15%]">Lương/giờ</th>
                                            <th className="py-2 px-3 text-left font-bold w-[15%]">Lương</th>
                                            <th className="py-2 px-3 text-left font-bold">Ghi chú</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {slip.logs.map((item: any, idx: number) => (
                                            <tr key={idx}>
                                                <td className="py-2 px-3">{item.workDate}</td>
                                                <td className="py-2 px-3">{item.positionName || 'Phục vụ'}</td>
                                                <td className="py-2 px-3 tabular-nums">{formatTimeStr(item.checkIn)} - {formatTimeStr(item.checkOut)}</td>
                                                <td className="py-2 px-3 font-normal">{item.hours.toFixed(2)} Giờ</td>
                                                <td className="py-2 px-3">{formatNumber(item.rate)}/Giờ</td>
                                                <td className="py-2 px-3">{formatNumber(item.amount)}</td>
                                                <td className="py-2 px-3 text-[13px] italic">{item.note || ''}</td>
                                            </tr>
                                        ))}
                                        {slip.logs.length === 0 && (
                                            <tr>
                                                <td colSpan={7} className="py-12 text-center text-slate-300 italic">Không có dữ liệu ca làm việc</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
