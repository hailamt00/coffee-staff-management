import axios from '@/shared/api/axios'
import {
  Position,
  CreatePositionRequest,
  UpdatePositionRequest,
} from '@/shared/types/api'

export const positionApi = {
  /* ================= QUERY ================= */

  async getAll(): Promise<Position[]> {
    const res = await axios.get<Position[]>('/positions')
    return res.data
  },

  async getById(id: number): Promise<Position> {
    const res = await axios.get<Position>(`/positions/${id}`)
    return res.data
  },

  /* ================= COMMAND ================= */

  async create(payload: CreatePositionRequest): Promise<Position> {
    const res = await axios.post<Position>('/positions', payload)
    return res.data
  },

  async update(
    id: number,
    payload: UpdatePositionRequest
  ): Promise<Position> {
    const res = await axios.put<Position>(
      `/positions/${id}`,
      payload
    )
    return res.data
  },

  async delete(id: number): Promise<void> {
    await axios.delete(`/positions/${id}`)
  },
}
