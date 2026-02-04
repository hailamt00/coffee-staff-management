import axios from '@/shared/api/axios'
import {
  Employee,
  CreateEmployeeRequest,
  UpdateEmployeeRequest,
} from '@/shared/types/api'

export const employeeApi = {
  /* ================= QUERY ================= */

  async getAll(): Promise<Employee[]> {
    const res = await axios.get<Employee[]>('/employees')
    return res.data
  },

  async getById(id: number): Promise<Employee> {
    const res = await axios.get<Employee>(`/employees/${id}`)
    return res.data
  },

  /* ================= COMMAND ================= */

  async create(payload: CreateEmployeeRequest): Promise<Employee> {
    const res = await axios.post<Employee>('/employees', payload)
    return res.data
  },

  async update(
    id: number,
    payload: UpdateEmployeeRequest
  ): Promise<Employee> {
    const res = await axios.put<Employee>(`/employees/${id}`, payload)
    return res.data
  },

  async delete(id: number): Promise<void> {
    await axios.delete(`/employees/${id}`)
  },
}
