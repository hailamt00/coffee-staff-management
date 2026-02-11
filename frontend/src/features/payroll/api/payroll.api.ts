import axios from '@/shared/api/axios'
import type { Payroll } from '@/shared/types/api'

export const payrollApi = {
    getByMonth: async (month: number, year: number): Promise<Payroll[]> => {
        const { data } = await axios.get('/payrolls', { params: { month, year } })
        return data
    },

    generate: async (employeeId: number, month: number, year: number) => {
        await axios.post('/payrolls/generate', null, {
            params: { employeeId, month, year },
        })
    },
}
