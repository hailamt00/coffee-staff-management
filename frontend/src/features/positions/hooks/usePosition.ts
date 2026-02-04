import { useCallback, useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import {
  Position,
  CreatePositionRequest,
  UpdatePositionRequest,
} from '@/shared/types/api'
import { positionApi } from '../api/position.api'
import { addNotification } from '@/features/ui/slices/uiSlice'

export function usePosition() {
  const dispatch = useDispatch()

  const [positions, setPositions] = useState<Position[]>([])
  const [selectedPosition, setSelectedPosition] =
    useState<Position | null>(null)
  const [loading, setLoading] = useState(false)

  /* ================= QUERY ================= */

  const fetchPositions = useCallback(async () => {
    setLoading(true)
    try {
      const data = await positionApi.getAll()
      setPositions(data)
    } catch {
      dispatch(
        addNotification({
          type: 'error',
          title: 'Load Failed',
          message: 'Failed to load positions',
        })
      )
    } finally {
      setLoading(false)
    }
  }, [dispatch])

  const fetchPositionById = useCallback(
    async (id: number) => {
      setLoading(true)
      try {
        const data = await positionApi.getById(id)
        setSelectedPosition(data)
        return data
      } catch {
        dispatch(
          addNotification({
            type: 'error',
            title: 'Not Found',
            message: 'Position not found',
          })
        )
        return null
      } finally {
        setLoading(false)
      }
    },
    [dispatch]
  )

  /* ================= COMMAND ================= */

  const createPosition = async (
    payload: CreatePositionRequest
  ) => {
    setLoading(true)
    try {
      const created = await positionApi.create(payload)
      setPositions(prev => [...prev, created])

      dispatch(
        addNotification({
          type: 'success',
          title: 'Created',
          message: 'Position created successfully',
        })
      )
    } catch {
      dispatch(
        addNotification({
          type: 'error',
          title: 'Create Failed',
          message: 'Failed to create position',
        })
      )
      throw new Error('Create position failed')
    } finally {
      setLoading(false)
    }
  }

  const updatePosition = async (
    id: number,
    payload: UpdatePositionRequest
  ) => {
    setLoading(true)
    try {
      const updated = await positionApi.update(id, payload)

      setPositions(prev =>
        prev.map(p => (p.id === id ? updated : p))
      )

      if (selectedPosition?.id === id) {
        setSelectedPosition(updated)
      }

      dispatch(
        addNotification({
          type: 'success',
          title: 'Updated',
          message: 'Position updated successfully',
        })
      )
    } catch {
      dispatch(
        addNotification({
          type: 'error',
          title: 'Update Failed',
          message: 'Failed to update position',
        })
      )
      throw new Error('Update position failed')
    } finally {
      setLoading(false)
    }
  }

  const deletePosition = async (id: number) => {
    setLoading(true)
    try {
      await positionApi.delete(id)

      setPositions(prev => prev.filter(p => p.id !== id))

      if (selectedPosition?.id === id) {
        setSelectedPosition(null)
      }

      dispatch(
        addNotification({
          type: 'success',
          title: 'Deleted',
          message: 'Position deleted successfully',
        })
      )
    } catch {
      dispatch(
        addNotification({
          type: 'error',
          title: 'Delete Failed',
          message: 'Failed to delete position',
        })
      )
      throw new Error('Delete position failed')
    } finally {
      setLoading(false)
    }
  }

  /* ================= INIT ================= */

  useEffect(() => {
    fetchPositions()
  }, [fetchPositions])

  return {
    positions,
    selectedPosition,
    loading,

    fetchPositions,
    fetchPositionById,

    createPosition,
    updatePosition,
    deletePosition,
  }
}
