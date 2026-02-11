import { useState, useCallback } from 'react'
import axios from '@/shared/api/axios'
import { useDispatch } from 'react-redux'
import { addNotification } from '@/features/ui/slices/uiSlice'
import type { Adjustment } from '../types'

export function useAdjustment() {
    const dispatch = useDispatch()
    const [adjustments, setAdjustments] = useState<Adjustment[]>([])
    const [loading, setLoading] = useState(false)

    const loadAdjustments = useCallback(async (month: number, year: number) => {
        setLoading(true)
        try {
            const response = await axios.get<Adjustment[]>('/rewardspenalties', {
                params: { month, year }
            })
            setAdjustments(response.data)
        } catch {
            dispatch(
                addNotification({
                    type: 'error',
                    title: 'Load failed',
                    message: 'Cannot load adjustments',
                })
            )
        } finally {
            setLoading(false)
        }
    }, [dispatch])

    return {
        adjustments,
        loading,
        loadAdjustments
    }
}
