import axios from '@/shared/api/axios'
import type {
  Position,
  CreatePositionRequest,
  UpdatePositionRequest,
} from '@/shared/types/api'

export const positionApi = {
  getAll: async (): Promise<Position[]> => {
    const { data } = await axios.get('/positions')
    return data
  },

  create: async (payload: CreatePositionRequest): Promise<Position> => {
    const { data } = await axios.post('/positions', payload)
    return data
  },

  update: async (
    id: number,
    payload: UpdatePositionRequest
  ): Promise<Position> => {
    const { data } = await axios.put(`/positions/${id}`, payload)
    return data
  },

  delete: async (id: number) => {
    await axios.delete(`/positions/${id}`)
  },
}
