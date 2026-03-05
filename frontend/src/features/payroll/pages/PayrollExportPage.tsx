import { useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Button } from '@/shared/components/ui/button'
import { formatMoney } from '@/shared/utils/format'

export default function PayrollExportPage() {
    const location = useLocation()
    const [exportData, setExportData] = useState<any>(null)

    useEffect(() => {
        let loadedData = null;
        if (location.state) {
            loadedData = location.state;
        } else {
            const stored = localStorage.getItem('payrollExportData');
            if (stored) {
                try {
                    loadedData = JSON.parse(stored);
                } catch (e) {
                    console.error("Failed to parse payroll export data", e);
                }
            }
        }
        if (loadedData) {
            setExportData(loadedData);
        }
    }, [location]);

    const data = exportData?.data || []
    const summaryData = exportData?.summaryData || []
    const startDate = exportData?.startDate || ''
    const endDate = exportData?.endDate || ''

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

    if (!exportData) {
        return (
            <div className="p-10 text-center">
                <h2 className="text-xl font-bold mb-4">No data found</h2>
                <Button onClick={() => window.close()}>Close Tab</Button>
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
                    <button onClick={handlePrintAll} className={GreenButtonStyle}>
                        Print All
                    </button>
                    <span className="text-[11px] text-slate-400 font-medium">Click "Print All" to print all slips, or click "Print" on each slip to print individually.</span>
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
                                    Print
                                </button>
                            </div>

                            {/* Centered Title Section */}
                            <div className="text-center mb-6">
                                <h1 className="text-2xl font-normal leading-tight">Payslip</h1>
                                <h2 className="text-xl font-normal">({slip.summary.employeeName}{slip.summary.phone ? ` - ${slip.summary.phone}` : ''})</h2>
                            </div>

                            {/* Info & Total Row */}
                            <div className="flex justify-between items-start mb-4 text-[14px]">
                                <div className="space-y-0.5">
                                    <p><span className="font-bold">Total Hours:</span> {slip.logs.reduce((acc: number, log: any) => acc + (log.hours || 0), 0).toFixed(2)}</p>
                                    <p><span className="font-bold">Base Salary:</span> {formatNumber(slip.summary.baseSalary)}</p>
                                    <p><span className="font-bold">Reward:</span> <span className="text-blue-600 font-bold">{slip.summary.rewards || 0}</span></p>
                                    <p><span className="font-bold">Penalty:</span> <span className="text-red-500 font-bold">{slip.summary.penalties || 0}</span></p>
                                </div>
                                <div className="text-right">
                                    <p className="text-slate-600 mb-1">From: <span className="italic">{startDate}</span> To: <span className="italic">{endDate}</span></p>
                                    <p className="text-2xl font-bold">Total Net Pay: {formatNumber(slip.summary.total)}</p>
                                </div>
                            </div>

                            {/* Legacy Table */}
                            <div className="overflow-visible h-auto">
                                <table className="w-full border-table text-[14px]">
                                    <thead>
                                        <tr className="bg-slate-50/50">
                                            <th className="py-2 px-3 text-left font-bold w-[14%]">Date</th>
                                            <th className="py-2 px-3 text-left font-bold w-[14%]">Position</th>
                                            <th className="py-2 px-3 text-left font-bold w-[20%]">Time</th>
                                            <th className="py-2 px-3 text-left font-bold w-[12%]">Hours</th>
                                            <th className="py-2 px-3 text-left font-bold w-[15%]">Rate/Hour</th>
                                            <th className="py-2 px-3 text-left font-bold w-[15%]">Amount</th>
                                            <th className="py-2 px-3 text-left font-bold">Note</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {slip.logs.map((item: any, idx: number) => (
                                            <tr key={idx}>
                                                <td className="py-2 px-3">{item.workDate}</td>
                                                <td className="py-2 px-3">{item.positionName || 'Server'}</td>
                                                <td className="py-2 px-3 tabular-nums">{formatTimeStr(item.checkIn)} - {formatTimeStr(item.checkOut)}</td>
                                                <td className="py-2 px-3 font-normal">{item.hours.toFixed(2)} hrs</td>
                                                <td className="py-2 px-3">{formatNumber(item.rate)}/hr</td>
                                                <td className="py-2 px-3">{formatNumber(item.amount)}</td>
                                                <td className="py-2 px-3 text-[13px] italic">{item.note || ''}</td>
                                            </tr>
                                        ))}
                                        {slip.logs.length === 0 && (
                                            <tr>
                                                <td colSpan={7} className="py-12 text-center text-slate-300 italic">No shift data available</td>
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
