import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { scheduleApi } from '../api/schedule.api'
import type {
    AddScheduleRequest,
    UpdateScheduleRequest,
    UpdateShiftRequestPayload,
    CreateShiftRequest,
    ApproveShiftRequest,
} from '@/shared/types/api'
import { useDispatch } from 'react-redux'
import { addNotification } from '@/features/ui/slices/uiSlice'

export function useSchedule() {
    const dispatch = useDispatch()
    const queryClient = useQueryClient()

    /* ================= QUERIES ================= */

    const useSchedulesQuery = (date: string) => useQuery({
        queryKey: ['schedules', date],
        queryFn: () => scheduleApi.getSchedule(date),
        enabled: !!date,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    })

    const useRequestsQuery = (date: string) => useQuery({
        queryKey: ['schedule-requests', date],
        queryFn: () => scheduleApi.getRequests(date),
        enabled: !!date,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    })

    const useWeeklySchedulesQuery = (fromDate: string, toDate: string) => useQuery({
        queryKey: ['schedules-weekly', fromDate, toDate],
        queryFn: () => scheduleApi.getWeeklySchedule(fromDate, toDate),
        enabled: !!fromDate && !!toDate,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    })

    const useMyRequestsQuery = (employeeId: number) => useQuery({
        queryKey: ['schedule-requests', 'my', employeeId],
        queryFn: () => scheduleApi.getMyRequests(employeeId),
        enabled: !!employeeId,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    })

    const useWeeklyRequestsQuery = (fromDate: string, toDate: string) => useQuery({
        queryKey: ['schedule-requests', 'weekly', fromDate, toDate],
        queryFn: () => scheduleApi.getWeeklyRequests(fromDate, toDate),
        enabled: !!fromDate && !!toDate,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    })

    /* ================= COMMANDS ================= */

    const createMutation = useMutation({
        mutationFn: (payload: CreateShiftRequest) => scheduleApi.createRequest(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['schedule-requests'] })
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

    const updateRequestMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateShiftRequestPayload }) => scheduleApi.updateRequest(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['schedule-requests'] })
            dispatch(addNotification({ type: 'success', title: 'Success', message: 'Request updated' }))
        },
        onError: () => {
            dispatch(addNotification({ type: 'error', title: 'Error', message: 'Cannot update request' }))
        }
    })

    const deleteRequestMutation = useMutation({
        mutationFn: (id: number) => scheduleApi.deleteRequest(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['schedule-requests'] })
            dispatch(addNotification({ type: 'success', title: 'Success', message: 'Request deleted' }))
        },
        onError: () => {
            dispatch(addNotification({ type: 'error', title: 'Error', message: 'Cannot delete request' }))
        }
    })

    const approveMutation = useMutation({
        mutationFn: (payload: ApproveShiftRequest) => scheduleApi.approveRequest(payload),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['schedule-requests'] })
            queryClient.invalidateQueries({ queryKey: ['schedules'] })
            queryClient.invalidateQueries({ queryKey: ['schedules-weekly'] })
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
        mutationFn: (payload: AddScheduleRequest) => scheduleApi.addSchedule(payload),
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

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateScheduleRequest }) => scheduleApi.updateSchedule(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['schedules'] })
            queryClient.invalidateQueries({ queryKey: ['schedules-weekly'] })
            dispatch(addNotification({ type: 'success', title: 'Success', message: 'Schedule updated' }))
        },
        onError: () => {
            dispatch(addNotification({ type: 'error', title: 'Error', message: 'Cannot update schedule' }))
        }
    })

    const deleteMutation = useMutation({
        mutationFn: (id: number) => scheduleApi.deleteSchedule(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['schedules'] })
            queryClient.invalidateQueries({ queryKey: ['schedules-weekly'] })
            dispatch(addNotification({ type: 'success', title: 'Success', message: 'Schedule deleted' }))
        },
        onError: () => {
            dispatch(addNotification({ type: 'error', title: 'Error', message: 'Cannot delete schedule' }))
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
        useSchedules: (date: string) => useSchedulesQuery(date),
        useWeeklySchedule: (fromDate: string, toDate: string) => useWeeklySchedulesQuery(fromDate, toDate),
        useRequests: (date: string) => useRequestsQuery(date),
        useWeeklyRequests: (fromDate: string, toDate: string) => useWeeklyRequestsQuery(fromDate, toDate),
        useMyRequests: (employeeId: number) => useMyRequestsQuery(employeeId),

        // Command methods
        createRequest: createMutation.mutateAsync,
        updateRequest: updateRequestMutation.mutateAsync,
        deleteRequest: deleteRequestMutation.mutateAsync,
        addSchedule: addScheduleMutation.mutateAsync,
        approveRequest: approveMutation.mutateAsync,
        updateSchedule: updateMutation.mutateAsync,
        deleteSchedule: deleteMutation.mutateAsync,

        // Legacy compatibility properties (will be empty/false unless using the new useSchedules/useRequests inside component)
        schedules: [],
        requests: [],
        loading:
            createMutation.isPending ||
            updateRequestMutation.isPending ||
            deleteRequestMutation.isPending ||
            approveMutation.isPending ||
            addScheduleMutation.isPending ||
            updateMutation.isPending ||
            deleteMutation.isPending,
    }
}
