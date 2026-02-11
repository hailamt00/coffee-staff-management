
import { useState, useCallback } from 'react'
import { revenueApi } from '../api/revenue.api'
import type {
    Revenue,
    CreateRevenueRequest,
    CreateTransactionRequest,
} from '@/shared/types/api'
import { useDispatch } from 'react-redux'
import { addNotification } from '@/features/ui/slices/uiSlice'

export function useRevenue() {
    const dispatch = useDispatch()
    const [revenues, setRevenues] = useState<Revenue[]>([])
    const [loading, setLoading] = useState(false)

    const loadRevenues = useCallback(async (date: string) => {
        setLoading(true)
        try {
            const data = await revenueApi.getByDate(date)
            setRevenues(data)
        } catch {
            dispatch(
                addNotification({
                    type: 'error',
                    title: 'Load failed',
                    message: 'Cannot load revenue reports',
                })
            )
            setRevenues([])
        } finally {
            setLoading(false)
        }
    }, [dispatch])

    const createRevenue = async (payload: CreateRevenueRequest) => {
        try {
            await revenueApi.create(payload)
            dispatch(
                addNotification({
                    type: 'success',
                    title: 'Success',
                    message: 'Revenue report created',
                })
            )
        } catch {
            dispatch(
                addNotification({
                    type: 'error',
                    title: 'Error',
                    message: 'Failed to create revenue report',
                })
            )
            throw new Error('Failed')
        }
    }

    const createTransaction = async (payload: CreateTransactionRequest) => {
        try {
            await revenueApi.createTransaction(payload)
            dispatch(
                addNotification({
                    type: 'success',
                    title: 'Success',
                    message: 'Transaction recorded',
                })
            )
        } catch {
            dispatch(
                addNotification({
                    type: 'error',
                    title: 'Error',
                    message: 'Failed to record transaction',
                })
            )
            throw new Error('Failed')
        }
    }

    return {
        revenues,
        loading,
        loadRevenues,
        createRevenue,
        createTransaction,
    }
}
