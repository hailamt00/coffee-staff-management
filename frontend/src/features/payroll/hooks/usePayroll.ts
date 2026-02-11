import { useState, useCallback } from 'react'
import { payrollApi } from '../api/payroll.api'
import type { Payroll } from '@/shared/types/api'
import { useDispatch } from 'react-redux'
import { addNotification } from '@/features/ui/slices/uiSlice'

export function usePayroll() {
    const dispatch = useDispatch()
    const [payrolls, setPayrolls] = useState<Payroll[]>([])
    const [loading, setLoading] = useState(false)

    const loadPayrolls = useCallback(async (month: number, year: number) => {
        setLoading(true)
        try {
            const data = await payrollApi.getByMonth(month, year)
            setPayrolls(data)
        } catch {
            dispatch(
                addNotification({
                    type: 'error',
                    title: 'Load failed',
                    message: 'Cannot load payrolls',
                })
            )
        } finally {
            setLoading(false)
        }
    }, [dispatch])

    const generatePayroll = async (
        employeeId: number,
        month: number,
        year: number
    ) => {
        try {
            await payrollApi.generate(employeeId, month, year)
            dispatch(
                addNotification({
                    type: 'success',
                    title: 'Success',
                    message: 'Payroll generated',
                })
            )
            // Reload list
            await loadPayrolls(month, year)
        } catch {
            dispatch(
                addNotification({
                    type: 'error',
                    title: 'Error',
                    message: 'Generation failed',
                })
            )
        }
    }

    return {
        payrolls,
        loading,
        loadPayrolls,
        generatePayroll,
    }
}
