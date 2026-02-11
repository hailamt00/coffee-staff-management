import { useState, useCallback } from 'react'
import { attendanceApi } from '../api/attendance.api'
import type {
    Attendance,
    CheckInRequest,
    CheckOutRequest,
} from '@/shared/types/api'
import { useDispatch } from 'react-redux'
import { addNotification } from '@/features/ui/slices/uiSlice'

export function useAttendance() {
    const dispatch = useDispatch()
    const [attendances, setAttendances] = useState<Attendance[]>([])
    const [loading, setLoading] = useState(false)

    const loadAttendance = useCallback(async (date: string) => {
        setLoading(true)
        try {
            const data = await attendanceApi.getByDate(date)
            setAttendances(data)
        } catch {
            dispatch(
                addNotification({
                    type: 'error',
                    title: 'Load failed',
                    message: 'Cannot load attendance list',
                })
            )
        } finally {
            setLoading(false)
        }
    }, [dispatch])

    const checkIn = async (payload: CheckInRequest) => {
        try {
            await attendanceApi.checkIn(payload)
            dispatch(
                addNotification({
                    type: 'success',
                    title: 'Success',
                    message: 'Checked in successfully',
                })
            )
        } catch {
            dispatch(
                addNotification({
                    type: 'error',
                    title: 'Error',
                    message: 'Check-in failed',
                })
            )
            throw new Error('Failed')
        }
    }

    const checkOut = async (payload: CheckOutRequest) => {
        try {
            await attendanceApi.checkOut(payload)
            dispatch(
                addNotification({
                    type: 'success',
                    title: 'Success',
                    message: 'Checked out successfully',
                })
            )
        } catch {
            dispatch(
                addNotification({
                    type: 'error',
                    title: 'Error',
                    message: 'Check-out failed',
                })
            )
            throw new Error('Failed')
        }
    }

    return {
        attendances,
        loading,
        loadAttendance,
        checkIn,
        checkOut,
    }
}
