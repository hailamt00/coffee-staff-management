import { useEffect, useState, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { positionApi } from '../api/position.api'
import { addNotification } from '@/features/ui/slices/uiSlice'
import type {
  Position,
  CreatePositionRequest,
  UpdatePositionRequest,
} from '@/shared/types/api'

export function usePosition() {
  const dispatch = useDispatch()
  const [positions, setPositions] = useState<Position[]>([])
  const [loading, setLoading] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    try {
      setPositions(await positionApi.getAll())
    } catch {
      dispatch(
        addNotification({
          type: 'error',
          title: 'Load failed',
          message: 'Cannot load positions',
        })
      )
    } finally {
      setLoading(false)
    }
  }, [dispatch])

  const createPosition = async (payload: CreatePositionRequest) => {
    const created = await positionApi.create(payload)
    setPositions(p => [...p, created])
  }

  const updatePosition = async (
    id: number,
    payload: UpdatePositionRequest
  ) => {
    const updated = await positionApi.update(id, payload)
    setPositions(p => p.map(x => (x.id === id ? updated : x)))
  }

  const deletePosition = async (id: number) => {
    await positionApi.delete(id)
    setPositions(p => p.filter(x => x.id !== id))
  }

  useEffect(() => {
    load()
  }, [load])

  return {
    positions,
    loading,
    createPosition,
    updatePosition,
    deletePosition,
  }
}
