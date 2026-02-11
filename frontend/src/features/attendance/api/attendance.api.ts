import axios from '@/shared/api/axios'
import type {
    Attendance,
    CheckInRequest,
    CheckOutRequest,
} from '@/shared/types/api'

export const attendanceApi = {
    getByDate: async (date: string): Promise<Attendance[]> => {
        const { data } = await axios.get('/attendance', { params: { date } })
        return data
    },

    checkIn: async (payload: CheckInRequest) => {
        await axios.post('/attendance/check-in', payload)
    },

    checkOut: async (payload: CheckOutRequest) => {
        await axios.post('/attendance/check-out', payload)
    },
}
