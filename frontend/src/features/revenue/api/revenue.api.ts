import axios from '@/shared/api/axios'
import type {
    Revenue,
    Transaction,
    CreateRevenueRequest,
    CreateTransactionRequest,
} from '@/shared/types/api'

export const revenueApi = {
    create: async (payload: CreateRevenueRequest): Promise<Revenue> => {
        const { data } = await axios.post('/revenues', payload)
        return data
    },

    getBySchedule: async (scheduleId: number): Promise<Revenue> => {
        const { data } = await axios.get(`/revenues/schedule/${scheduleId}`)
        return data
    },

    getByDate: async (date: string): Promise<Revenue[]> => {
        const { data } = await axios.get(`/revenues/date/${date}`)
        return data
    },

    createTransaction: async (
        payload: CreateTransactionRequest
    ): Promise<Transaction> => {
        const { data } = await axios.post('/transactions', payload)
        return data
    },
}
