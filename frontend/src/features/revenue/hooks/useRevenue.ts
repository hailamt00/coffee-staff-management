import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { revenueApi } from '../api/revenue.api'
import type {
    CreateRevenueRequest,
    CreateTransactionRequest,
} from '@/shared/types/api'
import { useDispatch } from 'react-redux'
import { addNotification } from '@/features/ui/slices/uiSlice'

export function useRevenue() {
    const dispatch = useDispatch()
    const queryClient = useQueryClient()

    /* ================= QUERIES ================= */

    const useRevenuesQuery = (date: string) => useQuery({
        queryKey: ['revenues', date],
        queryFn: () => revenueApi.getByDate(date),
        enabled: !!date,
    })

    const useRevenuesByMonthQuery = (month: number, year: number) => useQuery({
        queryKey: ['revenues', 'month', month, year],
        queryFn: () => revenueApi.getByMonth(month, year),
        enabled: month > 0 && year > 0,
    })

    /* ================= COMMANDS ================= */

    const createRevenueMutation = useMutation({
        mutationFn: (payload: CreateRevenueRequest) => revenueApi.create(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['revenues'] })
            dispatch(
                addNotification({
                    type: 'success',
                    title: 'Success',
                    message: 'Revenue report created',
                })
            )
        },
        onError: () => {
            dispatch(
                addNotification({
                    type: 'error',
                    title: 'Error',
                    message: 'Failed to create revenue report',
                })
            )
        }
    })

    const createTransactionMutation = useMutation({
        mutationFn: (payload: CreateTransactionRequest) => revenueApi.createTransaction(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['revenues'] })
            dispatch(
                addNotification({
                    type: 'success',
                    title: 'Success',
                    message: 'Transaction recorded',
                })
            )
        },
        onError: () => {
            dispatch(
                addNotification({
                    type: 'error',
                    title: 'Error',
                    message: 'Failed to record transaction',
                })
            )
        }
    })

    return {
        // Compatibility
        loadRevenues: (date: string) => queryClient.prefetchQuery({
            queryKey: ['revenues', date],
            queryFn: () => revenueApi.getByDate(date)
        }),

        // Hooks
        useRevenues: (date: string) => useRevenuesQuery(date),
        useRevenuesByMonth: (month: number, year: number) => useRevenuesByMonthQuery(month, year),

        // Commands
        createRevenue: createRevenueMutation.mutateAsync,
        createTransaction: createTransactionMutation.mutateAsync,

        // Legacy states
        revenues: [],
        loading: createRevenueMutation.isPending || createTransactionMutation.isPending,
    }
}
