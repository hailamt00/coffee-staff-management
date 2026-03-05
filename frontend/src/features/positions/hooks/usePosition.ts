import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useDispatch } from 'react-redux'
import { positionApi } from '../api/position.api'
import { addNotification } from '@/features/ui/slices/uiSlice'
import type {
  CreatePositionRequest,
  UpdatePositionRequest,
} from '@/shared/types/api'

export function usePosition() {
  const dispatch = useDispatch()
  const queryClient = useQueryClient()

  /* ================= QUERIES ================= */

  const positionsQuery = useQuery({
    queryKey: ['positions'],
    queryFn: () => positionApi.getAll(),
  })

  /* ================= COMMANDS ================= */

  const createMutation = useMutation({
    mutationFn: (payload: CreatePositionRequest) => positionApi.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['positions'] })
      dispatch(
        addNotification({
          type: 'success',
          title: 'Success',
          message: 'Position created',
        })
      )
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdatePositionRequest }) =>
      positionApi.update(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['positions'] })
      dispatch(
        addNotification({
          type: 'success',
          title: 'Success',
          message: 'Position updated',
        })
      )
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id: number) => positionApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['positions'] })
      dispatch(
        addNotification({
          type: 'success',
          title: 'Success',
          message: 'Position deleted',
        })
      )
    },
  })

  return {
    positions: positionsQuery.data || [],
    loading: positionsQuery.isLoading || createMutation.isPending || updateMutation.isPending || deleteMutation.isPending,

    createPosition: createMutation.mutateAsync,
    updatePosition: (id: number, payload: UpdatePositionRequest) => updateMutation.mutateAsync({ id, payload }),
    deletePosition: deleteMutation.mutateAsync,
  }
}
