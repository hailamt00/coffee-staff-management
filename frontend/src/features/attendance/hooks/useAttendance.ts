import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { attendanceApi } from '../api/attendance.api'
import type {
    CheckInRequest,
    CheckOutRequest,
} from '@/shared/types/api'
import { useDispatch } from 'react-redux'
import { addNotification } from '@/features/ui/slices/uiSlice'

export function useAttendance() {
    const dispatch = useDispatch()
    const queryClient = useQueryClient()

    /* ================= QUERIES ================= */

    const useAttendanceQuery = (date: string) => useQuery({
        queryKey: ['attendance', date],
        queryFn: () => attendanceApi.getByDate(date),
        enabled: !!date,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    })

    const useAttendanceRangeQuery = (startDate: string, endDate: string) => useQuery({
        queryKey: ['attendance-range', startDate, endDate],
        queryFn: () => attendanceApi.getByDateRange(startDate, endDate),
        enabled: !!startDate && !!endDate,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    })

    /* ================= COMMANDS ================= */

    const checkInMutation = useMutation({
        mutationFn: (payload: CheckInRequest) => attendanceApi.checkIn(payload),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['attendance', variables.workDate] })
            queryClient.invalidateQueries({ queryKey: ['schedules', variables.workDate] })
            dispatch(
                addNotification({
                    type: 'success',
                    title: 'Success',
                    message: 'Checked in successfully',
                })
            )
        },
        onError: () => {
            dispatch(
                addNotification({
                    type: 'error',
                    title: 'Error',
                    message: 'Check-in failed',
                })
            )
        }
    })

    const checkOutMutation = useMutation({
        mutationFn: (payload: CheckOutRequest) => attendanceApi.checkOut(payload),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['attendance', variables.workDate] })
            queryClient.invalidateQueries({ queryKey: ['schedules', variables.workDate] })
            dispatch(
                addNotification({
                    type: 'success',
                    title: 'Success',
                    message: 'Checked out successfully',
                })
            )
        },
        onError: () => {
            dispatch(
                addNotification({
                    type: 'error',
                    title: 'Error',
                    message: 'Check-out failed',
                })
            )
        }
    })

    const createMutation = useMutation({
        mutationFn: (payload: import('@/shared/types/api').CreateAttendancePayload) => attendanceApi.create(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['attendance'] })
            queryClient.invalidateQueries({ queryKey: ['attendance-range'] })
            queryClient.invalidateQueries({ queryKey: ['schedules'] })
            dispatch(addNotification({ type: 'success', title: 'Success', message: 'Attendance record created' }))
        },
        onError: (err: any) => {
            const msg = err.response?.data?.message || (typeof err.response?.data === 'string' ? err.response?.data : 'Failed to create record')
            dispatch(addNotification({ type: 'error', title: 'Error', message: msg }))
        }
    })

    const updateMutation = useMutation({
        mutationFn: (payload: import('@/shared/types/api').UpdateAttendancePayload) => attendanceApi.update(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['attendance'] })
            queryClient.invalidateQueries({ queryKey: ['attendance-range'] })
            queryClient.invalidateQueries({ queryKey: ['schedules'] })
            dispatch(addNotification({ type: 'success', title: 'Success', message: 'Attendance record updated' }))
        },
        onError: (err: any) => {
            const msg = err.response?.data?.message || (typeof err.response?.data === 'string' ? err.response?.data : 'Failed to update record')
            dispatch(addNotification({ type: 'error', title: 'Error', message: msg }))
        }
    })

    const deleteMutation = useMutation({
        mutationFn: (id: number) => attendanceApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['attendance'] })
            queryClient.invalidateQueries({ queryKey: ['attendance-range'] })
            queryClient.invalidateQueries({ queryKey: ['schedules'] })
            dispatch(addNotification({ type: 'success', title: 'Success', message: 'Attendance record deleted' }))
        },
        onError: (err: any) => {
            const msg = err.response?.data?.message || (typeof err.response?.data === 'string' ? err.response?.data : 'Failed to delete record')
            dispatch(addNotification({ type: 'error', title: 'Error', message: msg }))
        }
    })

    return {
        // Compatibility
        loadAttendance: (date: string) => queryClient.prefetchQuery({
            queryKey: ['attendance', date],
            queryFn: () => attendanceApi.getByDate(date)
        }),

        // Hooks
        useAttendance: (date: string) => useAttendanceQuery(date),
        useAttendanceRange: (startDate: string, endDate: string) => useAttendanceRangeQuery(startDate, endDate),

        // Commands
        checkIn: checkInMutation.mutateAsync,
        checkOut: checkOutMutation.mutateAsync,
        createAttendance: createMutation.mutateAsync,
        updateAttendance: updateMutation.mutateAsync,
        deleteAttendance: deleteMutation.mutateAsync,

        // Legacy states
        attendances: [],
        loading: checkInMutation.isPending || checkOutMutation.isPending || createMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
    }
}
