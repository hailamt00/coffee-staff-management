import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { payrollApi } from '../api/payroll.api'
import { useDispatch } from 'react-redux'
import { addNotification } from '@/features/ui/slices/uiSlice'

export function usePayroll() {
    const dispatch = useDispatch()
    const queryClient = useQueryClient()

    /* ================= QUERIES ================= */

    const usePayrollsQuery = (month: number, year: number) => useQuery({
        queryKey: ['payrolls', month, year],
        queryFn: () => payrollApi.getByMonth(month, year),
        enabled: month > 0 && year > 0,
    })

    /* ================= COMMANDS ================= */

    const generateMutation = useMutation({
        mutationFn: ({ employeeId, month, year }: { employeeId: number, month: number, year: number }) =>
            payrollApi.generate(employeeId, month, year),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['payrolls', variables.month, variables.year] })
            dispatch(
                addNotification({
                    type: 'success',
                    title: 'Success',
                    message: 'Payroll generated',
                })
            )
        },
        onError: () => {
            dispatch(
                addNotification({
                    type: 'error',
                    title: 'Error',
                    message: 'Generation failed',
                })
            )
        }
    })

    return {
        // Compatibility
        loadPayrolls: (month: number, year: number) => queryClient.prefetchQuery({
            queryKey: ['payrolls', month, year],
            queryFn: () => payrollApi.getByMonth(month, year)
        }),

        // Hooks
        usePayrolls: (month: number, year: number) => usePayrollsQuery(month, year),

        // Commands
        generatePayroll: (employeeId: number, month: number, year: number) =>
            generateMutation.mutateAsync({ employeeId, month, year }),

        // Legacy states
        payrolls: [],
        loading: generateMutation.isPending,
    }
}
