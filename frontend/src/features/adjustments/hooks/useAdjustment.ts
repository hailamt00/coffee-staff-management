import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import axios from '@/shared/api/axios'
import type {
    RewardPenalty,
    RewardPenaltyType,
    ApplyRewardPenaltyRequest,
    UpdateRewardPenaltyRequest,
    CreateRewardPenaltyTypeRequest,
    UpdateRewardPenaltyTypeRequest,
} from '@/shared/types/api'
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
                title: 'Success',
                message: 'Adjustment applied successfully'
            }))
        },
        onError: () => {
            dispatch(addNotification({
                type: 'error',
                title: 'Error',
                message: 'Failed to apply adjustment'
            }))
        }
    })

    const updateAdjustmentMutation = useMutation({
        mutationFn: async ({ id, payload }: { id: number; payload: UpdateRewardPenaltyRequest }) => {
            await axios.put(`/rewardspenalties/${id}`, payload)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adjustments'] })
            dispatch(addNotification({
                type: 'success',
                title: 'Success',
                message: 'Adjustment updated successfully'
            }))
        },
        onError: () => {
            dispatch(addNotification({
                type: 'error',
                title: 'Error',
                message: 'Failed to update adjustment'
            }))
        }
    })

    const deleteAdjustmentMutation = useMutation({
        mutationFn: async (id: number) => {
            await axios.delete(`/rewardspenalties/${id}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adjustments'] })
            dispatch(addNotification({
                type: 'success',
                title: 'Success',
                message: 'Adjustment deleted'
            }))
        },
        onError: () => {
            dispatch(addNotification({
                type: 'error',
                title: 'Error',
                message: 'Failed to delete adjustment'
            }))
        }
    })

    const createRewardPenaltyTypeMutation = useMutation({
        mutationFn: async (payload: CreateRewardPenaltyTypeRequest) => {
            await axios.post('/rewardspenalties/types', payload)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['rewardPenaltyTypes'] })
            dispatch(addNotification({
                type: 'success',
                title: 'Thanh cong',
                message: 'Da tao loai thuong/phat'
            }))
        },
        onError: () => {
            dispatch(addNotification({
                type: 'error',
                title: 'Loi',
                message: 'Khong the tao loai thuong/phat'
            }))
        }
    })

    const updateRewardPenaltyTypeMutation = useMutation({
        mutationFn: async ({ id, payload }: { id: number; payload: UpdateRewardPenaltyTypeRequest }) => {
            await axios.put(`/rewardspenalties/types/${id}`, payload)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['rewardPenaltyTypes'] })
            dispatch(addNotification({
                type: 'success',
                title: 'Thanh cong',
                message: 'Da cap nhat loai thuong/phat'
            }))
        },
        onError: () => {
            dispatch(addNotification({
                type: 'error',
                title: 'Loi',
                message: 'Khong the cap nhat loai thuong/phat'
            }))
        }
    })

    const deleteRewardPenaltyTypeMutation = useMutation({
        mutationFn: async (id: number) => {
            await axios.delete(`/rewardspenalties/types/${id}`)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['rewardPenaltyTypes'] })
            dispatch(addNotification({
                type: 'success',
                title: 'Thanh cong',
                message: 'Da xoa loai thuong/phat'
            }))
        },
        onError: (error: any) => {
            const serverMessage =
                error?.response?.data?.Message ||
                error?.response?.data?.message ||
                (typeof error?.response?.data === 'string' ? error.response.data : undefined)
            dispatch(addNotification({
                type: 'error',
                title: 'Loi',
                message: serverMessage || 'Khong the xoa loai thuong/phat'
            }))
        }
    })

    return {
        // Hooks
        useAdjustments,
        useRewardPenaltyTypes,

        // Mutations
        applyAdjustment: applyAdjustmentMutation.mutateAsync,
        updateAdjustment: updateAdjustmentMutation.mutateAsync,
        deleteAdjustment: deleteAdjustmentMutation.mutateAsync,
        createRewardPenaltyType: createRewardPenaltyTypeMutation.mutateAsync,
        updateRewardPenaltyType: updateRewardPenaltyTypeMutation.mutateAsync,
        deleteRewardPenaltyType: deleteRewardPenaltyTypeMutation.mutateAsync,
        loading:
            applyAdjustmentMutation.isPending ||
            updateAdjustmentMutation.isPending ||
            deleteAdjustmentMutation.isPending ||
            createRewardPenaltyTypeMutation.isPending ||
            updateRewardPenaltyTypeMutation.isPending ||
            deleteRewardPenaltyTypeMutation.isPending
    }
}

