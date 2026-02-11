import { useState, useCallback } from 'react'
import { scheduleApi } from '../api/schedule.api'
import type {
    Schedule,
    ScheduleRequest,
    CreateShiftRequest,
    ApproveShiftRequest,
} from '@/shared/types/api'
import { useDispatch } from 'react-redux'
import { addNotification } from '@/features/ui/slices/uiSlice'

export function useSchedule() {
    const dispatch = useDispatch()
    const [schedules, setSchedules] = useState<Schedule[]>([])
    const [requests, setRequests] = useState<ScheduleRequest[]>([])
    const [loading, setLoading] = useState(false)

    const loadSchedule = useCallback(async (date: string) => {
        setLoading(true)
        try {
            const data = await scheduleApi.getSchedule(date)
            setSchedules(data)
        } catch {
            dispatch(
                addNotification({
                    type: 'error',
                    title: 'Load failed',
                    message: 'Cannot load schedule',
                })
            )
        } finally {
            setLoading(false)
        }
    }, [dispatch])

    const loadRequests = useCallback(async (date: string) => {
        setLoading(true)
        try {
            const data = await scheduleApi.getRequests(date)
            setRequests(data)
        } catch {
            dispatch(
                addNotification({
                    type: 'error',
                    title: 'Load failed',
                    message: 'Cannot load requests',
                })
            )
        } finally {
            setLoading(false)
        }
    }, [dispatch])

    const createRequest = async (payload: CreateShiftRequest) => {
        try {
            await scheduleApi.createRequest(payload)
            dispatch(
                addNotification({
                    type: 'success',
                    title: 'Success',
                    message: 'Request sent',
                })
            )
        } catch {
            dispatch(
                addNotification({
                    type: 'error',
                    title: 'Error',
                    message: 'Cannot create request',
                })
            )
            throw new Error('Failed')
        }
    }

    const approveRequest = async (payload: ApproveShiftRequest) => {
        try {
            await scheduleApi.approveRequest(payload)
            dispatch(
                addNotification({
                    type: 'success',
                    title: 'Success',
                    message: payload.isApproved ? 'Approved' : 'Rejected',
                })
            )
            // Optimistic update or reload
            setRequests(prev =>
                prev.map(r =>
                    r.requestId === payload.requestId
                        ? { ...r, status: payload.isApproved ? 'approved' : 'rejected' }
                        : r
                )
            )
        } catch {
            dispatch(
                addNotification({
                    type: 'error',
                    title: 'Error',
                    message: 'Action failed',
                })
            )
        }
    }

    return {
        schedules,
        requests,
        loading,
        loadSchedule,
        loadRequests,
        createRequest,
        approveRequest,
    }
}
