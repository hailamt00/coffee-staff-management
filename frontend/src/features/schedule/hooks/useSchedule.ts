import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { scheduleApi } from '../api/schedule.api'
import type {
    CreateShiftRequest,
    ApproveShiftRequest,
} from '@/shared/types/api'
import { useDispatch } from 'react-redux'
import { addNotification } from '@/features/ui/slices/uiSlice'

export function useSchedule() {
    const dispatch = useDispatch()
    const queryClient = useQueryClient()

    /* ================= QUERIES ================= */

    const schedulesQuery = (date: string) => useQuery({
        queryKey: ['schedules', date],
        queryFn: () => scheduleApi.getSchedule(date),
        enabled: !!date,
    })

    const requestsQuery = (date: string) => useQuery({
        queryKey: ['schedule-requests', date],
        queryFn: () => scheduleApi.getRequests(date),
        enabled: !!date,
    })

    const weeklySchedulesQuery = (fromDate: string, toDate: string) => useQuery({
        queryKey: ['schedules-weekly', fromDate, toDate],
        queryFn: () => scheduleApi.getWeeklySchedule(fromDate, toDate),
        enabled: !!fromDate && !!toDate,
    })

    /* ================= COMMANDS ================= */

    const createMutation = useMutation({
        mutationFn: (payload: CreateShiftRequest) => scheduleApi.createRequest(payload),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['schedule-requests', variables.workDate] })
            dispatch(
                addNotification({
                    type: 'success',
                    title: 'Success',
                    message: 'Request sent',
                })
            )
        },
        onError: () => {
            dispatch(
                addNotification({
                    type: 'error',
                    title: 'Error',
                    message: 'Cannot create request',
                })
            )
        }
    })

    const approveMutation = useMutation({
        mutationFn: (payload: ApproveShiftRequest) => scheduleApi.approveRequest(payload),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['schedule-requests'] })
            queryClient.invalidateQueries({ queryKey: ['schedules'] })
            dispatch(
                addNotification({
                    type: 'success',
                    title: 'Success',
                    message: variables.isApproved ? 'Approved' : 'Rejected',
                })
            )
        },
        onError: () => {
            dispatch(
                addNotification({
                    type: 'error',
                    title: 'Error',
                    message: 'Action failed',
                })
            )
        }
    })

    const addScheduleMutation = useMutation({
        mutationFn: (payload: any) => scheduleApi.addSchedule(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['schedules'] })
            queryClient.invalidateQueries({ queryKey: ['schedules-weekly'] })
            dispatch(
                addNotification({
                    type: 'success',
                    title: 'Success',
                    message: 'Schedules added successfully',
                })
            )
        },
        onError: () => {
            dispatch(
                addNotification({
                    type: 'error',
                    title: 'Error',
                    message: 'Cannot add schedules',
                })
            )
        }
    })

    return {
        // We'll provide methods to get query results to maintain hook-like usage
        // but it's cleaner to just return the results if we pass parameters to useSchedule
        // For now, to keep it compatible with existing pages:
        loadSchedule: (date: string) => queryClient.prefetchQuery({
            queryKey: ['schedules', date],
            queryFn: () => scheduleApi.getSchedule(date)
        }),
        loadRequests: (date: string) => queryClient.prefetchQuery({
            queryKey: ['schedule-requests', date],
            queryFn: () => scheduleApi.getRequests(date)
        }),

        // These are meant to be used in components
        useSchedules: (date: string) => schedulesQuery(date),
        useWeeklySchedule: (fromDate: string, toDate: string) => weeklySchedulesQuery(fromDate, toDate),
        useRequests: (date: string) => requestsQuery(date),

        // Command methods
        createRequest: createMutation.mutateAsync,
        addSchedule: addScheduleMutation.mutateAsync,
        approveRequest: approveMutation.mutateAsync,

        // Legacy compatibility properties (will be empty/false unless using the new useSchedules/useRequests inside component)
        schedules: [],
        requests: [],
        loading: createMutation.isPending || approveMutation.isPending || addScheduleMutation.isPending,
    }
}
