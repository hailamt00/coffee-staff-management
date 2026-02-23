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
    })

    /* ================= COMMANDS ================= */

    const checkInMutation = useMutation({
        mutationFn: (payload: CheckInRequest) => attendanceApi.checkIn(payload),
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ['attendance', variables.workDate] })
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

    return {
        // Compatibility
        loadAttendance: (date: string) => queryClient.prefetchQuery({
            queryKey: ['attendance', date],
            queryFn: () => attendanceApi.getByDate(date)
        }),

        // Hooks
        useAttendance: (date: string) => useAttendanceQuery(date),

        // Commands
        checkIn: checkInMutation.mutateAsync,
        checkOut: checkOutMutation.mutateAsync,

        // Legacy states
        attendances: [],
        loading: checkInMutation.isPending || checkOutMutation.isPending,
    }
}
