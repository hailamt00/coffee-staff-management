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

    getByDateRange: async (startDate: string, endDate: string): Promise<Attendance[]> => {
        const { data } = await axios.get('/attendance/range', { params: { startDate, endDate } })
        return data
    },

    checkIn: async (payload: CheckInRequest) => {
        await axios.post('/attendance/check-in', payload)
    },

    checkOut: async (payload: CheckOutRequest) => {
        await axios.post('/attendance/check-out', payload)
    },

    create: async (payload: import('@/shared/types/api').CreateAttendancePayload) => {
        await axios.post('/attendance', payload)
    },

    update: async (payload: import('@/shared/types/api').UpdateAttendancePayload) => {
        await axios.put(`/attendance/${payload.attendanceId}`, payload)
    },

    delete: async (id: number) => {
        await axios.delete(`/attendance/${id}`)
    },
}
