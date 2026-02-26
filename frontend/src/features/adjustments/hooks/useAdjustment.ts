import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from '@/shared/api/axios'
import type { RewardPenalty, RewardPenaltyType, ApplyRewardPenaltyRequest } from '@/shared/types/api'
import { useDispatch } from 'react-redux'
import { addNotification } from '@/features/ui/slices/uiSlice'

export function useAdjustment() {
    const queryClient = useQueryClient()
    const dispatch = useDispatch()

    /* ================= QUERIES ================= */

    const useAdjustments = (month: number, year: number) => useQuery({
        queryKey: ['adjustments', month, year],
        queryFn: async () => {
            const response = await axios.get<RewardPenalty[]>('/rewardspenalties/all', {
                params: { month, year }
            })
            return response.data
        },
        enabled: !!month && !!year,
        staleTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
    })

    const useRewardPenaltyTypes = () => useQuery({
        queryKey: ['rewardPenaltyTypes'],
        queryFn: async () => {
            const response = await axios.get<RewardPenaltyType[]>('/rewardspenalties/types')
            return response.data
        },
        staleTime: 30 * 60 * 1000,
    })

    /* ================= MUTATIONS ================= */

    const applyAdjustmentMutation = useMutation({
        mutationFn: async (payload: ApplyRewardPenaltyRequest) => {
            const response = await axios.post('/rewardspenalties/apply', payload)
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adjustments'] })
            dispatch(addNotification({
                type: 'success',
                title: 'Thành công',
                message: 'Đã áp dụng điều chỉnh thành công'
            }))
        },
        onError: () => {
            dispatch(addNotification({
                type: 'error',
                title: 'Lỗi',
                message: 'Có lỗi xảy ra khi áp dụng điều chỉnh'
            }))
        }
    })

    return {
        // Hooks
        useAdjustments,
        useRewardPenaltyTypes,

        // Mutations
        applyAdjustment: applyAdjustmentMutation.mutateAsync,
        loading: applyAdjustmentMutation.isPending
    }
}

