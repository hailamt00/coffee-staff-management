import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from '@/shared/api/axios'
import type { Adjustment } from '../types'

export function useAdjustment() {
    const queryClient = useQueryClient()

    /* ================= QUERIES ================= */

    const useAdjustmentsQuery = (month: number, year: number) => useQuery({
        queryKey: ['adjustments', month, year],
        queryFn: async () => {
            const response = await axios.get<Adjustment[]>('/rewardspenalties/all', {
                params: { month, year }
            })
            return response.data
        },
        enabled: !!month && !!year,
    })

    return {
        // Compatibility
        loadAdjustments: (month: number, year: number) => queryClient.prefetchQuery({
            queryKey: ['adjustments', month, year],
            queryFn: async () => {
                const response = await axios.get<Adjustment[]>('/rewardspenalties/all', {
                    params: { month, year }
                })
                return response.data
            }
        }),

        // Hooks
        useAdjustments: (month: number, year: number) => useAdjustmentsQuery(month, year),

        // Legacy states
        adjustments: [],
        loading: false,
    }
}
